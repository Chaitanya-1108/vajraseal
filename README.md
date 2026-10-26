# वज्र SEAL Quotation Generator

A mobile-first web application designed for **वज्र SEAL Waterproofing Solutions** (Yavatmal, Maharashtra) to generate, customize, manage, and download professional A4 waterproofing quotations.

Recreates the exact visual specification of the original quotation template, including branding, typography, tables, banners, borders, and footer statements.

---

## 🛠️ Technology Stack

- **React 19 & Vite**: Ultra-fast mobile web performance
- **TypeScript**: Strict type safety across all documents and models
- **Tailwind CSS v4**: Mobile-first responsive styling
- **@react-pdf/renderer**: Client-side fixed-layout A4 portrait PDF generation
- **Noto Sans Devanagari (TTF)**: Native offline Devanagari typography support for **वज्र**
- **Lucide React**: Clean icons for mobile actions
- **HTML5 Web Share API**: Direct sharing of PDFs via WhatsApp and Android share sheet
- **Local Storage API**: 100% offline persistence with JSON backup and restore

---

## 📱 Application Modules & Pages

### 1. Dashboard (`/`)
- **Executive Overview**: Total quotes, drafts, issued, and approved count
- **Search & Filter**: Search by quotation number, client name, or city; filter by status pills
- **Actions**: View A4 document, Edit form, Duplicate quotation, Delete with confirmation, and 1-click PDF download
- **Auto-Seed**: Pre-loaded with the reference quotation (`VS-2026-101`) for **Shri. Manish Bogawat Sir**

### 2. Create & Edit Quotation Form
- **Thumb-friendly Mobile Accordions**:
  1. *Client & Quotation Details*: Quotation number (auto-incrementing `VS-2026-XXX`), date (`DD-MM-YYYY`), client name, city, phone, address, and status
  2. *Subject & Services*: Customizable greeting, proposal paragraphs, and toggleable service bullet points
  3. *Treatments & Pricing Table*: Reorder items (move up/down), add treatment items, add category headers (e.g. *Waterproofing Treatment for Floor & Wall*), quick-add from presets
  4. *Inclusions & Exclusions*: Add/remove bullet items, reset to default standard terms
  5. *Material Conditions & Payment Terms*: Material condition banner, staggered payment stages, and product-brand statement
  6. *Signatory & Footer*: Signatory name, phone, and Ultratech authorized vendor statement
- **Sticky Actions Bar**: Save Draft (instant alert), Live A4 Preview, and Download PDF

### 3. Document Preview (A4 Portrait Layout)
- **High-Precision Layout**: Exactly reproduces `reference/VAJRASEAL-quotation.jpg`
  - House outline with water droplet logo + **वज्र** in orange and **SEAL** in navy
  - Light cyan banner divided into *QUOTATION DETAILS* and *PREPARED FOR*
  - Orange section headings (*SUBJECT : -*, *WATERPROOFING QUOTATION*, *INCLUDES*, *EXCLUSION*, *PAYMENT TERMS*)
  - Pricing table with navy blue header row and crisp black cell borders
  - Highlighted cyan banners for material condition and brand statements
  - Signatory block at bottom right (*Rajendra Deshpande*)
  - Full-width dark navy banner footer (*Authorized Waterproofing Vendor of Ultratech Cement*)
- **Interactive Zoom**: Pinch-to-zoom, Zoom In (+), Zoom Out (-), Fit to Mobile Screen, and 100% actual size buttons
- **Mobile Share**: Direct PDF share button for WhatsApp and mobile messaging

### 4. Company Settings & Data Management
- Customize company name, Devanagari name, address, phone, and tagline
- Upload custom business logo (with instant preview and reset option)
- Manage default treatment items and default pricing rates
- Quotation numbering configuration (prefix and next sequence number)
- **Local Data Backup**: Export all quotations and settings to a JSON file
- **Data Recovery**: Import JSON backup with overwrite safety confirmation
- **Reset Template**: Restore reference sample data anytime

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# or
npx vite --port 5173 --host
```
Open **`http://localhost:5173/`** on your browser or mobile phone connected to the same local network.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 Quotation Numbering Rules
- Format: `VS-YYYY-XXX` (e.g., `VS-2026-101`)
- Automatic incrementing counter stored persistently in localStorage
- Duplicate detection and warning banner in the editor
- When duplicating an existing quotation, a new sequence number and today's date are assigned automatically while keeping all treatments and notes intact.
