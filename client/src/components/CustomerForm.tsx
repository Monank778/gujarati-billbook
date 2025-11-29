import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

export default function CustomerForm() {
  const { t, customer, setCustomer } = useApp();

  const updateField = (field: keyof typeof customer, value: string) => {
    setCustomer({ ...customer, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="h-4 w-4" />
          {t.billTo}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="customerName">{t.customerName}</Label>
          <Input
            id="customerName"
            value={customer.name}
            onChange={(e) => updateField('name', e.target.value)}
            data-testid="input-customer-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerAddress">{t.companyAddress}</Label>
          <Textarea
            id="customerAddress"
            value={customer.address}
            onChange={(e) => updateField('address', e.target.value)}
            rows={2}
            data-testid="input-customer-address"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="customerPhone">{t.customerPhone}</Label>
            <Input
              id="customerPhone"
              value={customer.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              data-testid="input-customer-phone"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail">{t.customerEmail}</Label>
            <Input
              id="customerEmail"
              type="email"
              value={customer.email}
              onChange={(e) => updateField('email', e.target.value)}
              data-testid="input-customer-email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerGstin">{t.customerGSTIN}</Label>
          <Input
            id="customerGstin"
            value={customer.gstin}
            onChange={(e) => updateField('gstin', e.target.value)}
            data-testid="input-customer-gstin"
          />
        </div>
      </CardContent>
    </Card>
  );
}
