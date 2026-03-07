import Stripe from 'stripe'

// Use a placeholder key for build time that won't be called
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_for_build_only'

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-02-25.clover',
})

// Check if Stripe is properly configured
export const isStripeConfigured = () => {
  return (
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder_key_for_build_only'
  )
}
