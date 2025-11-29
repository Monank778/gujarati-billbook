import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Building2, FileText, Palette, Upload, Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRef, useState } from 'react';

export default function SettingsPanel() {
  const { t, settings, updateSettings } = useApp();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ seller: { ...settings.seller, logo: reader.result as string } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaved(true);
    toast({
      title: t.saveSettings,
      description: 'Settings saved successfully',
    });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      <Accordion type="multiple" defaultValue={['seller', 'invoice', 'appearance']} className="space-y-4">
        <AccordionItem value="seller" className="border rounded-md">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{t.sellerDetails}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">{t.businessName}</Label>
                <Input
                  id="businessName"
                  value={settings.seller.businessName}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, businessName: e.target.value } })}
                  data-testid="input-business-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  value={settings.seller.phone}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, phone: e.target.value } })}
                  data-testid="input-phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.seller.email}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, email: e.target.value } })}
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstin">{t.gstin}</Label>
                <Input
                  id="gstin"
                  value={settings.seller.gstin}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, gstin: e.target.value } })}
                  data-testid="input-gstin"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">{t.address}</Label>
                <Textarea
                  id="address"
                  value={settings.seller.address}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, address: e.target.value } })}
                  rows={2}
                  data-testid="input-address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signatory">{t.authorizedSignatory}</Label>
                <Input
                  id="signatory"
                  value={settings.seller.authorizedSignatory}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, authorizedSignatory: e.target.value } })}
                  data-testid="input-signatory"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">{t.currency}</Label>
                <Select
                  value={settings.seller.currency}
                  onValueChange={(value) => updateSettings({ seller: { ...settings.seller, currency: value } })}
                >
                  <SelectTrigger id="currency" data-testid="select-currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="₹">₹ (INR)</SelectItem>
                    <SelectItem value="$">$ (USD)</SelectItem>
                    <SelectItem value="€">€ (EUR)</SelectItem>
                    <SelectItem value="£">£ (GBP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxPercent">{t.taxPercent}</Label>
                <Input
                  id="taxPercent"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.seller.taxPercent}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, taxPercent: Number(e.target.value) } })}
                  data-testid="input-tax-percent"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="terms">{t.termsAndConditions}</Label>
                <Textarea
                  id="terms"
                  value={settings.seller.termsAndConditions}
                  onChange={(e) => updateSettings({ seller: { ...settings.seller, termsAndConditions: e.target.value } })}
                  rows={2}
                  data-testid="input-terms"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="invoice" className="border rounded-md">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{t.invoiceSettings}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prefix">{t.invoicePrefix}</Label>
                <Input
                  id="prefix"
                  value={settings.invoice.prefix}
                  onChange={(e) => updateSettings({ invoice: { ...settings.invoice, prefix: e.target.value } })}
                  placeholder="INV-"
                  data-testid="input-prefix"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentNumber">{t.invoiceNumber}</Label>
                <Input
                  id="currentNumber"
                  type="number"
                  min="1"
                  value={settings.invoice.currentNumber}
                  onChange={(e) => updateSettings({ invoice: { ...settings.invoice, currentNumber: Number(e.target.value) } })}
                  data-testid="input-invoice-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">{t.dateFormat}</Label>
                <Select
                  value={settings.invoice.dateFormat}
                  onValueChange={(value) => updateSettings({ invoice: { ...settings.invoice, dateFormat: value } })}
                >
                  <SelectTrigger id="dateFormat" data-testid="select-date-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                    <SelectItem value="MM-DD-YYYY">MM-DD-YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="enableGST">{t.enableGST}</Label>
                <Switch
                  id="enableGST"
                  checked={settings.invoice.enableGST}
                  onCheckedChange={(checked) => updateSettings({ invoice: { ...settings.invoice, enableGST: checked } })}
                  data-testid="switch-enable-gst"
                />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="enableDiscount">{t.enableDiscount}</Label>
                <Switch
                  id="enableDiscount"
                  checked={settings.invoice.enableDiscount}
                  onCheckedChange={(checked) => updateSettings({ invoice: { ...settings.invoice, enableDiscount: checked } })}
                  data-testid="switch-enable-discount"
                />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="enablePayment">{t.enablePaymentTracking}</Label>
                <Switch
                  id="enablePayment"
                  checked={settings.invoice.enablePaymentTracking}
                  onCheckedChange={(checked) => updateSettings({ invoice: { ...settings.invoice, enablePaymentTracking: checked } })}
                  data-testid="switch-enable-payment"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="appearance" className="border rounded-md">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="font-medium">{t.appearance}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{t.logo}</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  {settings.seller.logo ? (
                    <img
                      src={settings.seller.logo}
                      alt="Logo"
                      className="h-16 w-16 object-contain border rounded-md"
                      data-testid="img-logo-preview"
                    />
                  ) : (
                    <div className="h-16 w-16 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground">
                      <Upload className="h-6 w-6" />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="button-upload-logo"
                  >
                    {t.uploadLogo}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">{t.fontSize}</Label>
                <Select
                  value={settings.appearance.fontSize}
                  onValueChange={(value: 'small' | 'medium' | 'large') => updateSettings({ appearance: { ...settings.appearance, fontSize: value } })}
                >
                  <SelectTrigger id="fontSize" data-testid="select-font-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">{t.small}</SelectItem>
                    <SelectItem value="medium">{t.medium}</SelectItem>
                    <SelectItem value="large">{t.large}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <Button
          onClick={handleSave}
          className="w-full"
          size="lg"
          data-testid="button-save-settings"
        >
          {saved ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {t.saveSettings}
        </Button>
      </div>
    </div>
  );
}
