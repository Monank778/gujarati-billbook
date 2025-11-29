import { AppProvider } from '@/contexts/AppContext';
import ActionButtons from '../ActionButtons';

export default function ActionButtonsExample() {
  return (
    <AppProvider>
      <div className="h-40">
        <ActionButtons />
      </div>
    </AppProvider>
  );
}
