# Square Payment Setup Guide
## For Dirty — drinkingdirtysoda.com

When the client is ready to activate payments, follow these steps:

---

## Step 1: Create a Square Developer Account

1. Go to https://developer.squareup.com
2. Sign in with the same Square account used at events
3. Click **Create an Application**
4. Name it "Dirty Website"

---

## Step 2: Get Your Credentials

In the Square Developer Dashboard, go to your app → **Credentials** tab:

| Key | Where to find it |
|-----|-----------------|
| `SQUARE_ACCESS_TOKEN` | Production Access Token |
| `SQUARE_LOCATION_ID` | Locations → Your location ID |
| `NEXT_PUBLIC_SQUARE_APP_ID` | Application ID |
| `NEXT_PUBLIC_SQUARE_LOCATION_ID` | Same as SQUARE_LOCATION_ID |

---

## Step 3: Add to Vercel

1. Go to vercel.com → dirty-website → Settings → Environment Variables
2. Add all four keys above
3. Redeploy

---

## Step 4: Switch from Sandbox to Production

In `src/components/find/PreOrderPaymentForm.tsx`, line ~60:

Change:
```
script.src = 'https://sandbox.web.squarecdn.com/v1/square.js'
```

To:
```
script.src = 'https://web.squarecdn.com/v1/square.js'
```

Then redeploy.

---

## Step 5: Test

Use Square's test card numbers in sandbox mode before going live:
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

---

## What happens when a customer pays:

1. Customer selects drinks + pickup time
2. Customer enters name, email, phone
3. Customer sees order summary + tip selector
4. Customer enters card via Square's secure form
5. Payment is processed via Square
6. Customer receives confirmation email with order details
7. Owner (sghopping@gmail.com) receives notification with payment ID
8. Payment appears in Square dashboard immediately

---

## Files added:

- `src/app/api/create-payment/route.ts` — creates Square order
- `src/app/api/complete-payment/route.ts` — processes payment + sends emails
- `src/components/find/PreOrderPaymentForm.tsx` — payment UI with tip selector
- `.env.example` — updated with Square keys
