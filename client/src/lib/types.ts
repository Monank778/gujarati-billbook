import { Language } from './translations';

export interface SellerSettings {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  gstin: string;
  authorizedSignatory: string;
  termsAndConditions: string;
  currency: string;
  taxPercent: number;
  logo: string | null;
}

export interface InvoiceSettings {
  prefix: string;
  currentNumber: number;
  dateFormat: string;
  enableGST: boolean;
  enableDiscount: boolean;
  enablePaymentTracking: boolean;
}

export interface AppearanceSettings {
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark';
}

export interface AppSettings {
  seller: SellerSettings;
  invoice: InvoiceSettings;
  appearance: AppearanceSettings;
  language: Language;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  hsnSac: string;
  quantity: number;
  pricePerUnit: number;
  amount: number;
}

export interface Invoice {
  invoiceNumber: string;
  date: Date;
  customer: Customer;
  items: InvoiceItem[];
  subTotal: number;
  discountPercent: number;
  discountAmount: number;
  gstPercent: number;
  gstAmount: number;
  grandTotal: number;
  receivedAmount: number;
  balanceAmount: number;
}

export const defaultSettings: AppSettings = {
  seller: {
    businessName: '',
    phone: '',
    email: '',
    address: '',
    gstin: '',
    authorizedSignatory: '',
    termsAndConditions: 'Thank you for doing business with us.',
    currency: '₹',
    taxPercent: 0,
    logo: null,
  },
  invoice: {
    prefix: '',
    currentNumber: 1,
    dateFormat: 'DD-MM-YYYY',
    enableGST: false,
    enableDiscount: false,
    enablePaymentTracking: true,
  },
  appearance: {
    fontSize: 'medium',
    theme: 'light',
  },
  language: 'en',
};

export const defaultCustomer: Customer = {
  name: '',
  address: '',
  phone: '',
  email: '',
  gstin: '',
};

export const createEmptyItem = (): InvoiceItem => ({
  id: crypto.randomUUID(),
  description: '',
  hsnSac: '',
  quantity: 0,
  pricePerUnit: 0,
  amount: 0,
});
