import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Settings, FileText, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'invoice' | 'settings';
  onTabChange: (tab: 'invoice' | 'settings') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { t, language, setLanguage, settings, updateSettings } = useApp();

  const toggleTheme = () => {
    updateSettings({
      appearance: {
        ...settings.appearance,
        theme: settings.appearance.theme === 'light' ? 'dark' : 'light'
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <h1 className="text-lg font-semibold truncate" data-testid="text-app-title">
          {t.appName}
        </h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
            className="text-sm font-medium"
            data-testid="button-language-toggle"
          >
            {language === 'en' ? 'ગુજરાતી' : 'EN'}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {settings.appearance.theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="flex border-t">
        <button
          onClick={() => onTabChange('invoice')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeTab === 'invoice'
              ? 'bg-accent text-accent-foreground border-b-2 border-foreground'
              : 'text-muted-foreground'
          }`}
          data-testid="tab-invoice"
        >
          <FileText className="h-4 w-4" />
          {t.createInvoice}
        </button>
        <button
          onClick={() => onTabChange('settings')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeTab === 'settings'
              ? 'bg-accent text-accent-foreground border-b-2 border-foreground'
              : 'text-muted-foreground'
          }`}
          data-testid="tab-settings"
        >
          <Settings className="h-4 w-4" />
          {t.settings}
        </button>
      </div>
    </header>
  );
}
