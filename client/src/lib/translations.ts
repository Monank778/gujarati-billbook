export type Language = 'en' | 'gu';

export const translations = {
  en: {
    appName: 'Gujarati BillBook',
    taxInvoice: 'Tax Invoice',
    settings: 'Settings',
    createInvoice: 'Create Invoice',
    sellerDetails: 'Seller Details',
    businessName: 'Business Name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    gstin: 'GSTIN',
    authorizedSignatory: 'Authorized Signatory',
    termsAndConditions: 'Terms & Conditions',
    currency: 'Currency',
    taxPercent: 'Tax %',
    invoiceSettings: 'Invoice Settings',
    invoicePrefix: 'Invoice Prefix',
    invoiceNumber: 'Invoice No',
    dateFormat: 'Date Format',
    enableGST: 'Enable GST',
    enableDiscount: 'Enable Discount',
    enablePaymentTracking: 'Enable Payment Tracking',
    appearance: 'Appearance',
    logo: 'Logo',
    uploadLogo: 'Upload Logo',
    fontSize: 'Font Size',
    theme: 'Theme',
    saveSettings: 'Save Settings',
    billTo: 'Bill To',
    customerName: 'Customer Name',
    companyAddress: 'Company / Address',
    customerPhone: 'Phone',
    customerEmail: 'Email',
    customerGSTIN: 'GSTIN',
    invoiceDetails: 'Invoice Details',
    date: 'Date',
    itemTable: 'Items',
    srNo: '#',
    itemName: 'Item Name',
    hsnSac: 'HSN/SAC',
    quantity: 'Quantity',
    pricePerUnit: 'Price/Unit',
    amount: 'Amount',
    addItem: 'Add Item',
    total: 'Total',
    subTotal: 'Sub Total',
    discount: 'Discount',
    gst: 'GST',
    grandTotal: 'Grand Total',
    amountInWords: 'Invoice Amount In Words',
    received: 'Received',
    balance: 'Balance',
    generatePDF: 'Generate PDF',
    downloadPDF: 'Download PDF',
    shareWhatsApp: 'Share WhatsApp',
    print: 'Print',
    sendEmail: 'Send Email',
    forText: 'For',
    thankYou: 'Thank you for doing business with us.',
    light: 'Light',
    dark: 'Dark',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    clearForm: 'Clear Form',
    preview: 'Preview',
  },
  gu: {
    appName: 'ગુજરાતી બિલબુક',
    taxInvoice: 'ટેક્સ ઇન્વોઇસ',
    settings: 'સેટિંગ્સ',
    createInvoice: 'ઇન્વોઇસ બનાવો',
    sellerDetails: 'વેચાણકર્તાની વિગતો',
    businessName: 'વ્યવસાયનું નામ',
    phone: 'ફોન',
    email: 'ઇમેઇલ',
    address: 'સરનામું',
    gstin: 'જીએસટીઆઈએન',
    authorizedSignatory: 'અધિકૃત હસ્તાક્ષરકર્તા',
    termsAndConditions: 'નિયમો અને શરતો',
    currency: 'ચલણ',
    taxPercent: 'કર %',
    invoiceSettings: 'ઇન્વોઇસ સેટિંગ્સ',
    invoicePrefix: 'ઇન્વોઇસ ઉપસર્ગ',
    invoiceNumber: 'ઇન્વોઇસ નં',
    dateFormat: 'તારીખ ફોર્મેટ',
    enableGST: 'GST સક્ષમ કરો',
    enableDiscount: 'ડિસ્કાઉન્ટ સક્ષમ કરો',
    enablePaymentTracking: 'ચુકવણી ટ્રેકિંગ સક્ષમ કરો',
    appearance: 'દેખાવ',
    logo: 'લોગો',
    uploadLogo: 'લોગો અપલોડ કરો',
    fontSize: 'ફોન્ટ સાઇઝ',
    theme: 'થીમ',
    saveSettings: 'સેટિંગ્સ સાચવો',
    billTo: 'બિલ પ્રાપ્તકર્તા',
    customerName: 'ગ્રાહકનું નામ',
    companyAddress: 'કંપની / સરનામું',
    customerPhone: 'ફોન',
    customerEmail: 'ઇમેઇલ',
    customerGSTIN: 'જીએસટીઆઈએન',
    invoiceDetails: 'ઇન્વોઇસ વિગતો',
    date: 'તારીખ',
    itemTable: 'વસ્તુઓ',
    srNo: '#',
    itemName: 'વસ્તુનું નામ',
    hsnSac: 'HSN/SAC',
    quantity: 'જથ્થો',
    pricePerUnit: 'ભાવ/એકમ',
    amount: 'રકમ',
    addItem: 'વસ્તુ ઉમેરો',
    total: 'કુલ',
    subTotal: 'પેટા કુલ',
    discount: 'ડિસ્કાઉન્ટ',
    gst: 'જીએસટી',
    grandTotal: 'મહાકુલ',
    amountInWords: 'ઇન્વોઇસ રકમ શબ્દોમાં',
    received: 'પ્રાપ્ત',
    balance: 'બાકી',
    generatePDF: 'PDF બનાવો',
    downloadPDF: 'PDF ડાઉનલોડ',
    shareWhatsApp: 'વોટ્સએપ શેર',
    print: 'પ્રિન્ટ',
    sendEmail: 'ઇમેઇલ મોકલો',
    forText: 'માટે',
    thankYou: 'અમારી સાથે વ્યવસાય કરવા બદલ આભાર.',
    light: 'લાઇટ',
    dark: 'ડાર્ક',
    small: 'નાનું',
    medium: 'મધ્યમ',
    large: 'મોટું',
    clearForm: 'ફોર્મ સાફ કરો',
    preview: 'પ્રીવ્યૂ',
  }
};

export function numberToWordsEnglish(num: number): string {
  if (num === 0) return 'Zero';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const numToWords = (n: number): string => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + numToWords(n % 100) : '');
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
    return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
  };
  
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  
  let result = numToWords(rupees) + ' Rupees';
  if (paise > 0) {
    result += ' and ' + numToWords(paise) + ' Paisa';
  }
  return result + ' only';
}

export function numberToWordsGujarati(num: number): string {
  if (num === 0) return 'શૂન્ય';
  
  const ones = ['', 'એક', 'બે', 'ત્રણ', 'ચાર', 'પાંચ', 'છ', 'સાત', 'આઠ', 'નવ',
    'દસ', 'અગિયાર', 'બાર', 'તેર', 'ચૌદ', 'પંદર', 'સોળ', 'સત્તર', 'અઢાર', 'ઓગણીસ'];
  const tens = ['', '', 'વીસ', 'ત્રીસ', 'ચાલીસ', 'પચાસ', 'સાઠ', 'સિત્તેર', 'એંસી', 'નેવું'];
  
  const numToWords = (n: number): string => {
    if (n < 20) return ones[n];
    if (n < 100) {
      const ten = Math.floor(n / 10);
      const one = n % 10;
      if (one === 0) return tens[ten];
      return ones[one] + (ten > 0 ? tens[ten].slice(0, -1) + 'ી' : '');
    }
    if (n < 1000) return ones[Math.floor(n / 100)] + 'સો' + (n % 100 ? ' ' + numToWords(n % 100) : '');
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' હજાર' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' લાખ' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
    return numToWords(Math.floor(n / 10000000)) + ' કરોડ' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
  };
  
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  
  let result = numToWords(rupees) + ' રૂપિયા';
  if (paise > 0) {
    result += ' અને ' + numToWords(paise) + ' પૈસા';
  }
  return result + ' માત્ર';
}

export function formatDate(date: Date, format: string): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  switch (format) {
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    case 'MM-DD-YYYY':
      return `${month}-${day}-${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    default:
      return `${day}-${month}-${year}`;
  }
}
