## Add Privacy Policy & Terms

Abby's current site has a single combined page at `/privacy-policy` covering both Privacy Policy and Terms & Conditions (focused on SMS consent). I scraped it via Firecrawl — content is short and will port over verbatim, lightly cleaned for typos and formatting.

### What to build

**New route:** `src/routes/privacy.tsx` → `/privacy`
- Single page with two sections: "Privacy Policy" and "Terms & Conditions" (matches her current structure)
- Uses existing site layout (SiteHeader / SiteFooter), prose styling consistent with About/Delivery
- `head()` metadata: title "Privacy Policy & Terms — Buy The Yard Materials", matching description, og:title/og:description

**Content (cleaned, faithful to source):**

> **Privacy Policy**
> Personal information such as phone number and address provided in the "Let's Chat" section are used for business communication purposes only — quotes, answers to questions, and material delivery. Due to the nature of our services, address and phone number are necessary to provide delivery. We will not share your information for any reason; it can only be accessed by Buy The Yard personnel. SMS consent is not shared with third parties or affiliates for marketing purposes.
>
> **Terms & Conditions (SMS)**
> - Messaging frequency may vary
> - Message and data rates may apply
> - To opt out at any time, text STOP
> - For assistance, text HELP or visit btymaterial.com
> - By opting into SMS from a web form or other medium, you agree to receive SMS messages from Buy The Yard, LLC. This includes messages for delivery scheduling, messages pertaining to existing orders, and responses to inquiries.

**Footer link update:** `src/components/site/SiteFooter.tsx` — add a "Privacy & Terms" link pointing to `/privacy` in the existing footer link group.

**Quote form note:** Add a single line under the quote form submit ("By submitting, you agree to our [Privacy & Terms](/privacy).") in `src/routes/quote.tsx` since the form collects phone/address — mirrors her policy intent.

### Out of scope
- No separate `/terms` route (her site doesn't split them; one page is faithful to source and easier for her to maintain mentally)
- No new legal copy beyond what's on her current site
- No header nav link (footer-only, standard for legal pages)
