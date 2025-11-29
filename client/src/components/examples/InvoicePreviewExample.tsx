import { AppProvider } from '@/contexts/AppContext';
import InvoicePreview from '../InvoicePreview';

export default function InvoicePreviewExample() {
  return (
    <AppProvider>
      <div className="p-4 bg-gray-200">
        <InvoicePreview />
      </div>
    </AppProvider>
  );
}
