# AronLabz Tech Pvt Ltd — ChatGPT Astra + AI Co-pilot in KiCad

An ultra-modern, high-converting landing page and registration platform for the **Intensive PCB Design Masterclass (November 1st – 6th)** organized by **AronLabz Tech Pvt Ltd**.

Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**, featuring a high-tech hardware-engineering aesthetic, interactive KiCad 8 workspace simulator, live countdown timer, and official **Razorpay** checkout integration.

---

## 🌟 Key Highlights

1. **Company Branding**: Exclusively branded for **AronLabz Tech Pvt Ltd** with official certificate credentials, verified company headers, and legal policies.
2. **Reimagined Interface**: A completely custom, dark-mode cyberpunk hardware aesthetic with PCB grid textures, neon copper & trace glow effects, and interactive SVG circuit diagrams.
3. **No "Hackathon" Terminology**: Replaced with a professional **"5-Day Intensive Masterclass & Hands-on Certification"**.
4. **Product Focus**: Centered on **ChatGPT Astra + AI Co-pilot in KiCad 8**, showing how AI accelerates schematic validation, footprint assignment, DRC error explanations, and DFM outputs.
5. **Exclusive Razorpay Integration**:
   - Direct integration with **Razorpay Standard Checkout** (`checkout.js`).
   - Supports **UPI (Google Pay, PhonePe, Paytm, BHIM)**, **Credit/Debit Cards**, and **NetBanking**.
   - Built-in sandbox mode when testing before entering your live API key.

---

## 💳 Razorpay Configuration

To connect your live or test Razorpay account:

1. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Paste your Razorpay Key ID from your [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys):
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_YourKeyHere
   ```
3. Restart the dev server:
   ```bash
   npm run dev
   ```

*Note: If `VITE_RAZORPAY_KEY_ID` is left empty, the checkout will run in verified test sandbox mode with mock Razorpay IDs (`pay_rzp_...`) so you can preview the full enrolment experience without live transactions.*

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Production build assets will be generated in the `dist/` directory.

---

## 📂 Project Structure

```
pcbcourseastra/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Glassmorphism header with status badge & CTA
│   │   ├── Hero.tsx               # High-tech hero with live countdown & KiCad preview
│   │   ├── PainPoints.tsx         # The 6 electronic learner pitfalls & solutions
│   │   ├── WorkflowJourney.tsx    # 12-Step idea-to-manufacturing pipeline
│   │   ├── AiMeetsPcb.tsx         # KiCad 8 + ChatGPT Astra AI Co-pilot framework
│   │   ├── Curriculum.tsx         # Interactive 5-day syllabus & AI prompts
│   │   ├── Audience.tsx           # Target profiles & zero-prerequisite guarantee
│   │   ├── CertificateShowcase.tsx# Official AronLabz Verified Certificate preview
│   │   ├── PricingSection.tsx     # ₹399 one-time pricing card & inclusions
│   │   ├── FaqSection.tsx         # Expandable accordion FAQs with category tabs
│   │   ├── CheckoutModal.tsx      # Registration form & dedicated Razorpay checkout
│   │   └── Footer.tsx             # AronLabz Tech Pvt Ltd company & legal links
│   ├── data/
│   │   └── courseData.ts          # Centralized course details, curriculum & FAQs
│   ├── services/
│   │   └── payment.ts             # Dedicated Razorpay payment service
│   ├── types/
│   │   └── index.ts               # TypeScript data models
│   ├── App.tsx                    # Main landing page view
│   ├── main.tsx                   # React root entrypoint
│   └── index.css                  # Custom Tailwind styles, glow & circuit animations
├── tailwind.config.js             # High-tech theme color palette & glow effects
├── vite.config.ts                 # Vite bundler configuration
└── package.json                   # Dependencies & scripts
```
