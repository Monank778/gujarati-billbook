import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, defaultSettings, Customer, defaultCustomer, InvoiceItem, createEmptyItem, Invoice } from '@/lib/types';
import { translations, Language } from '@/lib/translations';

interface AppContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  t: typeof translations['en'];
  language: Language;
  setLanguage: (lang: Language) => void;
  customer: Customer;
  setCustomer: (customer: Customer) => void;
  items: InvoiceItem[];
  setItems: (items: InvoiceItem[]) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  invoiceNumber: string;
  invoiceDate: Date;
  setInvoiceDate: (date: Date) => void;
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;
  receivedAmount: number;
  setReceivedAmount: (amount: number) => void;
  calculations: {
    subTotal: number;
    discountAmount: number;
    gstAmount: number;
    grandTotal: number;
    balanceAmount: number;
  };
  clearForm: () => void;
  incrementInvoiceNumber: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'gujarati-billbook-settings';

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const [customer, setCustomer] = useState<Customer>(defaultCustomer);
  const [items, setItems] = useState<InvoiceItem[]>([createEmptyItem()]);
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [discountPercent, setDiscountPercent] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);

  const language = settings.language;
  const t = translations[language];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    if (settings.appearance.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev };
      if (newSettings.seller) updated.seller = { ...prev.seller, ...newSettings.seller };
      if (newSettings.invoice) updated.invoice = { ...prev.invoice, ...newSettings.invoice };
      if (newSettings.appearance) updated.appearance = { ...prev.appearance, ...newSettings.appearance };
      if (newSettings.language) updated.language = newSettings.language;
      return updated;
    });
  };

  const setLanguage = (lang: Language) => {
    updateSettings({ language: lang });
  };

  const addItem = () => {
    setItems(prev => [...prev, createEmptyItem()]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.length > 1 ? prev.filter(item => item.id !== id) : prev);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === 'quantity' || field === 'pricePerUnit') {
        updated.amount = Number(updated.quantity) * Number(updated.pricePerUnit);
      }
      return updated;
    }));
  };

  const invoiceNumber = `${settings.invoice.prefix}${settings.invoice.currentNumber}`;

  const calculations = (() => {
    const subTotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const discountAmount = settings.invoice.enableDiscount ? (subTotal * discountPercent) / 100 : 0;
    const afterDiscount = subTotal - discountAmount;
    const gstAmount = settings.invoice.enableGST ? (afterDiscount * settings.seller.taxPercent) / 100 : 0;
    const grandTotal = afterDiscount + gstAmount;
    const balanceAmount = grandTotal - receivedAmount;
    return { subTotal, discountAmount, gstAmount, grandTotal, balanceAmount };
  })();

  const clearForm = () => {
    setCustomer(defaultCustomer);
    setItems([createEmptyItem()]);
    setDiscountPercent(0);
    setReceivedAmount(0);
    setInvoiceDate(new Date());
  };

  const incrementInvoiceNumber = () => {
    updateSettings({
      invoice: { ...settings.invoice, currentNumber: settings.invoice.currentNumber + 1 }
    });
  };

  return (
    <AppContext.Provider value={{
      settings,
      updateSettings,
      t,
      language,
      setLanguage,
      customer,
      setCustomer,
      items,
      setItems,
      addItem,
      removeItem,
      updateItem,
      invoiceNumber,
      invoiceDate,
      setInvoiceDate,
      discountPercent,
      setDiscountPercent,
      receivedAmount,
      setReceivedAmount,
      calculations,
      clearForm,
      incrementInvoiceNumber,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
