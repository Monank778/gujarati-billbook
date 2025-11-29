import { AppProvider } from '@/contexts/AppContext';
import InvoiceDetails from '../InvoiceDetails';

export default function InvoiceDetailsExample() {
  return (
    <AppProvider>
      <div className="max-w-xs mx-auto p-4">
        <InvoiceDetails />
      </div>
    </AppProvider>
  );
}
