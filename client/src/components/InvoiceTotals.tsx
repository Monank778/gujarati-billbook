import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import { numberToWordsEnglish, numberToWordsGujarati } from '@/lib/translations';

export default function InvoiceTotals() {
  const {
    t,
    language,
    settings,
    calculations,
    discountPercent,
    setDiscountPercent,
    receivedAmount,
    setReceivedAmount,
  } = useApp();

  const currency = settings.seller.currency;
  const amountInWords = language === 'en'
    ? numberToWordsEnglish(calculations.grandTotal)
    : numberToWordsGujarati(calculations.grandTotal);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Calculator className="h-4 w-4" />
          {t.total}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center py-1">
          <span className="text-muted-foreground">{t.subTotal}</span>
          <span className="font-medium" data-testid="text-subtotal">
            {currency} {calculations.subTotal.toFixed(2)}
          </span>
        </div>

        {settings.invoice.enableDiscount && (
          <div className="flex justify-between items-center py-1 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{t.discount}</span>
              <Input
                type="number"
                min="0"
                max="100"
                value={discountPercent || ''}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-16 h-8 text-center"
                data-testid="input-discount"
              />
              <span className="text-muted-foreground">%</span>
            </div>
            <span className="font-medium" data-testid="text-discount-amount">
              - {currency} {calculations.discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        {settings.invoice.enableGST && settings.seller.taxPercent > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground">{t.gst} ({settings.seller.taxPercent}%)</span>
            <span className="font-medium" data-testid="text-gst-amount">
              + {currency} {calculations.gstAmount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center py-2 border-t border-b font-semibold text-lg">
          <span>{t.grandTotal}</span>
          <span data-testid="text-grand-total">
            {currency} {calculations.grandTotal.toFixed(2)}
          </span>
        </div>

        <div className="bg-muted/50 p-3 rounded-md">
          <div className="text-sm font-medium mb-1">{t.amountInWords}:</div>
          <div className="text-sm italic" data-testid="text-amount-words">
            {amountInWords}
          </div>
        </div>

        {settings.invoice.enablePaymentTracking && (
          <>
            <div className="flex justify-between items-center py-1 gap-4">
              <Label htmlFor="received" className="text-muted-foreground">{t.received}</Label>
              <div className="flex items-center gap-2">
                <span>{currency}</span>
                <Input
                  id="received"
                  type="number"
                  min="0"
                  value={receivedAmount || ''}
                  onChange={(e) => setReceivedAmount(Number(e.target.value))}
                  className="w-28 h-8 text-right"
                  data-testid="input-received"
                />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-t font-semibold">
              <span>{t.balance}</span>
              <span data-testid="text-balance">
                {currency} {calculations.balanceAmount.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
