# Security Policy — surgicals.lk

## Reporting a vulnerability

If you find a security issue on https://surgicals.lk, please email
**hello@surgicals.lk** with the details. We aim to acknowledge reports within
2 business days. Please do not open public GitHub issues for security reports.

See also: https://surgicals.lk/.well-known/security.txt

## Architecture & threat model

surgicals.lk is a fully static site served by GitHub Pages. There is no
backend, no database, and no user accounts. Orders are quote requests handed
off to WhatsApp. The main risks are therefore:

- client-side script injection (DOM XSS),
- third-party script supply-chain compromise,
- brand abuse (spoofed emails, cloned pages, forged quotations),
- repository/deployment pipeline compromise.

## Hardening applied in this repository

- **DOM XSS fixed**: user-controlled input (the `?q=` search parameter) is
  HTML-escaped before rendering; quote-cart lines are re-derived from the
  trusted product catalog instead of trusting `localStorage`.
- **Content-Security-Policy** (via `<meta http-equiv>`, the only mechanism
  GitHub Pages allows): scripts restricted to same-origin plus Google
  Analytics; objects/frames disallowed; `base-uri` and `form-action` locked to
  self. Inline scripts were externalized to make this possible.
- **Clickjacking defense**: frame-busting in `early.js` (GitHub Pages cannot
  send `frame-ancestors`/`X-Frame-Options` headers).
- **Referrer-Policy**: `strict-origin-when-cross-origin` on all pages.
- **Supply chain**: the internal quotation tool's libraries (jsPDF,
  jspdf-autotable, docx, signature_pad) are vendored into the repository at
  pinned versions instead of being loaded from third-party CDNs.
- **Admin gate**: the internal tool's access password is stored as a SHA-256
  hash only. Note that a client-side gate on a static host is a *deterrent*,
  not real authentication — do not store customer data or credentials in that
  tool, and rotate the password if it is ever shared.
- **Links**: all `target="_blank"` links carry `rel="noopener"`.
- **CI**: the deploy workflow uses least-privilege permissions and does not
  persist git credentials; Dependabot keeps GitHub Actions updated.

## Recommended settings outside this repository

These cannot be configured from code and should be set by the site owner:

1. **GitHub Pages**: keep "Enforce HTTPS" enabled in repository settings.
2. **Branch protection** on `main`: require pull requests and disallow force
   pushes, so the deployed site cannot be changed by a single compromised
   account without review.
3. **DNS (domain registrar)** — protects the surgicals.lk trade name:
   - `CAA` record: `0 issue "letsencrypt.org"` (GitHub Pages uses Let's
     Encrypt) so no other CA can issue certificates for the domain.
   - **SPF**: `v=spf1 -all` if the domain sends no email, or include your
     mail provider if it does (e.g. `v=spf1 include:_spf.google.com -all`).
   - **DMARC**: `_dmarc.surgicals.lk TXT "v=DMARC1; p=reject; rua=mailto:hello@surgicals.lk"`
     to stop attackers spoofing @surgicals.lk email addresses.
   - **DKIM** via your email provider.
   - Enable **DNSSEC** and registrar lock if available.
4. **Two-factor authentication** on the GitHub org/account and the domain
   registrar account.
5. If the internal quotation tool ever needs to hold sensitive data, move it
   behind real authentication (e.g. Cloudflare Access) instead of the
   client-side gate.
