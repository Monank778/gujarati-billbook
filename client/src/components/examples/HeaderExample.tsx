import { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import Header from '../Header';

export default function HeaderExample() {
  const [activeTab, setActiveTab] = useState<'invoice' | 'settings'>('invoice');
  
  return (
    <AppProvider>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
    </AppProvider>
  );
}
