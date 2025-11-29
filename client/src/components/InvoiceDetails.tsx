import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { formatDate } from '@/lib/translations';

export default function InvoiceDetails() {
  const { t, invoiceNumber, invoiceDate, setInvoiceDate, settings } = useApp();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          {t.invoiceDetails}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="invoiceNo">{t.invoiceNumber}</Label>
          <Input
            id="invoiceNo"
            value={invoiceNumber}
            readOnly
            className="bg-muted"
            data-testid="input-invoice-no"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoiceDate">{t.date}</Label>
          <Input
            id="invoiceDate"
            type="date"
            value={invoiceDate.toISOString().split('T')[0]}
            onChange={(e) => setInvoiceDate(new Date(e.target.value))}
            data-testid="input-invoice-date"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(invoiceDate, settings.invoice.dateFormat)}
        </div>
      </CardContent>
    </Card>
  );
}
