import { AppProvider } from '@/contexts/AppContext';
import InvoiceTotals from '../InvoiceTotals';

export default function InvoiceTotalsExample() {
  return (
    <AppProvider>
      <div className="max-w-md mx-auto p-4">
        <InvoiceTotals />
      </div>
    </AppProvider>
  );
}
