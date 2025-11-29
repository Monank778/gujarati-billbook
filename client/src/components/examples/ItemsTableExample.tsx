import { AppProvider } from '@/contexts/AppContext';
import ItemsTable from '../ItemsTable';

export default function ItemsTableExample() {
  return (
    <AppProvider>
      <div className="max-w-4xl mx-auto p-4">
        <ItemsTable />
      </div>
    </AppProvider>
  );
}
