import { AppProvider } from '@/contexts/AppContext';
import SettingsPanel from '../SettingsPanel';

export default function SettingsPanelExample() {
  return (
    <AppProvider>
      <div className="max-w-2xl mx-auto">
        <SettingsPanel />
      </div>
    </AppProvider>
  );
}
