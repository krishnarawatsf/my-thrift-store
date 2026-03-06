# Quick Commands

## Frontend
```bash
cd frontend
python3 -m http.server 3000
```
Visit: http://localhost:3000

## Backend
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```
API: http://localhost:8000
Docs: http://localhost:8000/docs

## Full Stack Quick Start (one command)
```bash
# Terminal 1
cd frontend && python3 -m http.server 3000

# Terminal 2
cd backend && source venv/bin/activate && pip install -r requirements.txt && python3 main.py
```

## Pages to Test
- Home: http://localhost:3000
- Collections: http://localhost:3000/collections.html
- Product: http://localhost:3000/product.html?id=1
- Checkout: http://localhost:3000/checkout.html
- Admin: http://localhost:3000/admin.html

## Admin API Testing
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

## Adding Mock Products
Edit `backend/database.py` → `MOCK_PRODUCTS` array

## Stopping Servers
- Frontend: Ctrl+C in terminal
- Backend: Ctrl+C in terminal
