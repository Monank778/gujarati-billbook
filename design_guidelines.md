# Gujarati BillBook - Design Guidelines

## Design Approach
**Utility-Focused Business Application** - This is a productivity tool for invoice generation requiring clarity, efficiency, and professional presentation. Drawing inspiration from modern accounting software like QuickBooks and Zoho Invoice, prioritizing data entry speed and error prevention.

## Typography System

**Primary Font:** Noto Sans (supports Gujarati Unicode)
- Headings: 24px (2xl), 20px (xl), 18px (lg) - Semibold (600)
- Body text: 16px (base) - Regular (400)
- Labels/captions: 14px (sm) - Medium (500)
- Gujarati text: Same sizes with Noto Sans Gujarati fallback

**Reading Optimization:** max-w-prose for text blocks, max-w-7xl for app container

## Layout & Spacing

**Spacing Scale:** Consistent use of 4, 6, 8, 12, 16, 24 (Tailwind units)
- Form fields: p-3, gap-4
- Sections: py-8, px-6
- Cards: p-6
- Mobile: Reduce by 25% (p-4 becomes p-3)

**Grid System:**
- Settings panel: Single column on mobile, 2-column on tablet (md:grid-cols-2)
- Item entry table: Horizontal scroll on mobile, full table on desktop
- Form layouts: Stack vertically on mobile, side-by-side on desktop (lg:grid-cols-2)

## Component Library

**Navigation:**
- Top app bar with language toggle (EN | ગુજરાતી), settings icon
- Bottom action bar on mobile with primary actions
- Tabbed interface for Settings vs Invoice Creation

**Forms:**
- Labeled input fields with floating labels for active state
- Bordered inputs (border-2) with focus ring
- Input groups for related fields (Invoice No. + Date)
- Dropdown selects for currency, date format, tax options
- File upload area for logo with preview thumbnail

**Item Entry Table:**
- Responsive table with sticky header
- Add/Delete row buttons (icon-only on mobile, text+icon on desktop)
- Inline editing with instant calculation feedback
- Calculated fields show in subtle background to indicate read-only
- Mobile: Card-based layout for each item instead of table

**Buttons:**
- Primary: Generate PDF, Save Settings (larger, prominent)
- Secondary: Add Item, Share (medium prominence)
- Destructive: Delete Row (red accent)
- Icon buttons for: WhatsApp share, Email, Print, Download

**Cards & Panels:**
- Settings sections in bordered cards with clear headings
- Customer details in outlined card
- Totals summary in highlighted card (subtle background)
- PDF preview area with border

**Data Display:**
- Amount summaries right-aligned with bold totals
- Amount in words displayed in italics below grand total
- Real-time calculation indicators (smooth number transitions)

## Invoice PDF Layout (Match Uploaded Sample)
The generated PDF must replicate the uploaded tax invoice exactly:
- Header: "TAX INVOICE" centered, seller details left-aligned
- Two-column layout: Bill To (left) and Invoice details (right)
- Item table with columns: Description, HSN/SAC, Qty, Price, Amount
- Subtotals and tax calculations right-aligned
- Amount in words section with both English and Gujarati
- Signature area at bottom right
- Footer with terms and authorized signatory
- Exact spacing, borders, and alignment as sample

## Mobile Responsiveness

**Breakpoints:**
- Mobile: 320px-768px (single column, stacked forms)
- Tablet: 768px-1024px (2-column forms, compact table)
- Desktop: 1024px+ (full layout with sidebar settings)

**Mobile-Specific:**
- Larger touch targets (min 44px height)
- Bottom-anchored primary actions
- Collapsible sections for settings
- Number pad optimization for quantity/price inputs

## Settings Panel Structure

**Organized Sections:**
1. Seller Information (business name, contact, GSTIN)
2. Invoice Configuration (prefix, numbering, date format)
3. Tax & Discount Settings (toggle switches)
4. Appearance (logo, font size, theme)
5. Default Values (terms, tax %, currency)

Each section in expandable accordion or tabbed interface

## Accessibility
- High contrast text (WCAG AA minimum)
- Form labels programmatically associated
- Keyboard navigation for all inputs
- Focus indicators on interactive elements
- Error messages in context below fields
- RTL support consideration for Gujarati text

## Visual Hierarchy
- Primary action (Generate PDF) most prominent
- Critical data entry fields emphasized
- Calculated fields visually distinct from editable
- Settings organized by frequency of use
- Progressive disclosure for advanced options

## Animations
Minimal, functional only:
- Smooth number updates in totals (transition-all duration-300)
- Table row add/delete slide animations
- Loading spinner during PDF generation
- Success checkmark on save

## Professional Tone
Clean, trustworthy, business-appropriate aesthetic suitable for tax invoices and formal documentation. Avoid playful elements - this is a serious business tool for financial record-keeping.