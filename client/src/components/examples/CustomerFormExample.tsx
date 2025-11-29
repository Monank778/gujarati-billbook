import { AppProvider } from '@/contexts/AppContext';
import CustomerForm from '../CustomerForm';

export default function CustomerFormExample() {
  return (
    <AppProvider>
      <div className="max-w-md mx-auto p-4">
        <CustomerForm />
      </div>
    </AppProvider>
  );
}
