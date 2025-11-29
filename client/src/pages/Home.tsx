import { useState } from 'react';
import Header from '@/components/Header';
import SettingsPanel from '@/components/SettingsPanel';
import CustomerForm from '@/components/CustomerForm';
import InvoiceDetails from '@/components/InvoiceDetails';
import ItemsTable from '@/components/ItemsTable';
import InvoiceTotals from '@/components/InvoiceTotals';
import ActionButtons from '@/components/ActionButtons';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'invoice' | 'settings'>('invoice');

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'settings' ? (
        <SettingsPanel />
      ) : (
        <div className="p-4 pb-48 space-y-4 max-w-4xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2">
            <CustomerForm />
            <InvoiceDetails />
          </div>
          <ItemsTable />
          <InvoiceTotals />
          <ActionButtons />
        </div>
      )}
    </div>
  );
}
