import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const OUT_DIR = process.env.SMOKE_OUT_DIR || path.join(process.cwd(), "smoke-artifacts");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function nowSlug() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function tryClickByText(page, candidates) {
  for (const c of candidates) {
    try {
      const locator =
        c.kind === "role"
          ? page.getByRole(c.role, { name: c.name, exact: c.exact ?? false })
          : page.getByText(c.text, { exact: c.exact ?? false });
      if ((await locator.count()) > 0) {
        await locator.first().click({ timeout: 3000 });
        return { ok: true, matched: c };
      }
    } catch {
      // try next candidate
    }
  }
  return { ok: false };
}

async function firstHrefMatch(page, regexes) {
  for (const re of regexes) {
    const a = page.locator("a[href]").filter({ has: page.locator(`:scope`) });
    const hrefs = await a.evaluateAll((els) => els.map((e) => e.getAttribute("href") || ""));
    const match = hrefs.find((h) => re.test(h));
    if (match) return match;
  }
  return null;
}

async function screenshot(page, outPath) {
  await page.screenshot({ path: outPath, fullPage: true });
}

async function getNextOverlayText(page) {
  try {
    const text = await page.evaluate(() => {
      function collectText(root) {
        if (!root) return null;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let out = "";
        let n;
        while ((n = walker.nextNode())) {
          const t = n.textContent || "";
          const trimmed = t.trim();
          if (trimmed) out += `${trimmed}\n`;
        }
        return out.trim() || null;
      }

      // Next.js dev overlay often lives in a portal with shadow DOM.
      const portal = document.querySelector("nextjs-portal");
      if (portal?.shadowRoot) {
        const hasErrorUi =
          portal.shadowRoot.querySelector("#nextjs__container_errors") ||
          portal.shadowRoot.querySelector("[data-nextjs-error-overlay]") ||
          portal.shadowRoot.querySelector("[data-nextjs-dialog-overlay]") ||
          portal.shadowRoot.querySelector("[data-nextjs-codeframe]");

        if (!hasErrorUi) {
          return null;
        }

        const t = collectText(portal.shadowRoot);
        if (t) return t;
      }

      // Fallback: try known container ids/attrs when present.
      const known =
        document.querySelector("#nextjs__container_errors") ||
        document.querySelector("[data-nextjs-error-overlay]") ||
        document.querySelector("[data-nextjs-error-overlay-header]");
      return collectText(known);
    });

    if (!text) return null;
    // Avoid writing megabytes into results.json.
    return text.length > 20000 ? `${text.slice(0, 20000)}\n…(truncated)…` : text;
  } catch {
    return null;
  }
}

async function main() {
  ensureDir(OUT_DIR);
  const runId = nowSlug();
  const runDir = path.join(OUT_DIR, runId);
  ensureDir(runDir);

  const results = {
    baseUrl: BASE_URL,
    runId,
    startedAt: new Date().toISOString(),
    steps: [],
    console: [],
    pageErrors: [],
    overlay: [],
  };

  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  page.on("console", (msg) => {
    results.console.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
    });
  });
  page.on("pageerror", (err) => {
    results.pageErrors.push({ message: String(err?.message || err), stack: String(err?.stack || "") });
  });

  async function step(name, fn) {
    const entry = { name, ok: false, notes: [], screenshot: null, url: null, overlayText: null };
    results.steps.push(entry);
    try {
      await fn(entry);
      entry.ok = true;
    } catch (e) {
      entry.ok = false;
      entry.notes.push(`Error: ${String(e?.message || e)}`);
    } finally {
      entry.url = page.url();
      entry.overlayText = await getNextOverlayText(page);
      if (entry.overlayText) {
        results.overlay.push({
          step: entry.name,
          url: entry.url,
          capturedAt: new Date().toISOString(),
          text: entry.overlayText,
        });
      }
      const shot = `${String(results.steps.length).padStart(2, "0")}-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`;
      entry.screenshot = path.join(runDir, shot);
      try {
        await screenshot(page, entry.screenshot);
      } catch (e) {
        entry.notes.push(`Screenshot failed: ${String(e?.message || e)}`);
      }
    }
  }

  await step("home-loads", async (entry) => {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    // User request: refresh / a few times to reproduce flaky overlay errors.
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(250);
      await page.reload({ waitUntil: "networkidle" });
    }
    const promoCandidates = [
      { kind: "text", text: "promo", exact: false },
      { kind: "text", text: "free shipping", exact: false },
      { kind: "text", text: "limited", exact: false },
    ];
    let foundPromo = false;
    for (const c of promoCandidates) {
      if ((await page.getByText(c.text, { exact: c.exact }).count()) > 0) {
        foundPromo = true;
        break;
      }
    }
    if (!foundPromo) entry.notes.push("Promo bar text not detected (informational).");

    const explore = page.getByRole("link", { name: /explore now/i });
    if ((await explore.count()) === 0) entry.notes.push('"Explore Now" link not found (informational).');
  });

  await step("home-explore-now", async (entry) => {
    const clicked = await tryClickByText(page, [{ kind: "role", role: "link", name: /explore now/i }]);
    if (!clicked.ok) {
      entry.notes.push('Could not click "Explore Now" (informational).');
      return;
    }
    await page.waitForLoadState("networkidle");
  });

  await step("catalog-collections", async (entry) => {
    const clicked = await tryClickByText(page, [
      { kind: "role", role: "link", name: /catalog/i },
      { kind: "role", role: "link", name: /collections/i },
      { kind: "role", role: "link", name: /shop/i },
    ]);
    if (!clicked.ok) {
      await page.goto(`${BASE_URL}/collections`, { waitUntil: "networkidle" });
      entry.notes.push("Nav link not found; navigated directly to `/collections`.");
    } else {
      await page.waitForLoadState("networkidle");
    }

    const collectionHref = await firstHrefMatch(page, [/^\/collections\/[^/]+$/]);
    if (!collectionHref) {
      entry.notes.push("No collection links found on `/collections` (catalog may be empty).");
      return;
    }
    await page.goto(`${BASE_URL}${collectionHref}`, { waitUntil: "networkidle" });
  });

  await step("open-product-page", async (entry) => {
    const productHref = await firstHrefMatch(page, [/^\/products\/[^/]+$/]);
    if (!productHref) {
      entry.notes.push("No product links found (catalog may be empty).");
      return;
    }
    await page.goto(`${BASE_URL}${productHref}`, { waitUntil: "networkidle" });
  });

  await step("add-to-cart-open-cart", async (entry) => {
    const addBtn = page.getByRole("button", { name: /add to cart/i });
    if ((await addBtn.count()) === 0) {
      entry.notes.push('"Add to cart" button not found (catalog may be empty).');
      return;
    }
    await addBtn.first().click();
    await page.waitForTimeout(500);

    const cartCandidates = [
      { kind: "role", role: "link", name: /cart/i },
      { kind: "role", role: "button", name: /cart/i },
      { kind: "role", role: "link", name: /bag/i },
      { kind: "role", role: "button", name: /bag/i },
    ];
    const clicked = await tryClickByText(page, cartCandidates);
    if (!clicked.ok) {
      await page.goto(`${BASE_URL}/cart`, { waitUntil: "networkidle" });
      entry.notes.push("Cart trigger not found; navigated directly to `/cart`.");
    } else {
      await page.waitForLoadState("networkidle");
    }
  });

  await step("navigate-to-checkout", async (entry) => {
    const clicked = await tryClickByText(page, [
      { kind: "role", role: "link", name: /checkout/i },
      { kind: "role", role: "button", name: /checkout/i },
      { kind: "role", role: "link", name: /proceed/i },
      { kind: "role", role: "button", name: /proceed/i },
    ]);
    if (!clicked.ok) {
      await page.goto(`${BASE_URL}/checkout`, { waitUntil: "networkidle" });
      entry.notes.push("Checkout CTA not found; navigated directly to `/checkout`.");
    } else {
      await page.waitForLoadState("networkidle");
    }
  });

  results.finishedAt = new Date().toISOString();
  const outJson = path.join(runDir, "results.json");
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
  await browser.close();

  // Print a minimal human-readable summary for terminal output.
  const failed = results.steps.filter((s) => !s.ok);
  console.log(`Smoke run ${runId} -> ${runDir}`);
  for (const s of results.steps) {
    console.log(`- ${s.ok ? "OK" : "FAIL"}: ${s.name}${s.notes.length ? ` | ${s.notes.join(" ; ")}` : ""}`);
  }
  if (failed.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

