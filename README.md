# Scorville landing page

Public landing page and beta/brand waitlist for Scorville.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Brevo waitlist setup

Create two contact lists in Brevo:

1. Scorville Beta Testers
2. Scorville Brands

Create a Brevo API key, copy `.env.example` to `.env.local`, and set:

```text
BREVO_API_KEY=your_real_api_key
BREVO_BETA_LIST_ID=the_numeric_beta_list_id
BREVO_BRAND_LIST_ID=the_numeric_brand_list_id
```

The API key is server-only. Never expose it through a variable beginning with
`NEXT_PUBLIC_` or commit `.env.local`.

Signup routing:

- Beta tester → beta list
- Hot sauce brand → brand list
- Both → both lists

Existing contacts are updated so repeat submissions do not fail.

## Validation

```bash
npm run build
```
