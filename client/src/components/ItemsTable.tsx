import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';

export default function ItemsTable() {
  const { t, settings, items, addItem, removeItem, updateItem } = useApp();
  const currency = settings.seller.currency;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-base">
            <ShoppingCart className="h-4 w-4" />
            {t.itemTable}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={addItem}
            data-testid="button-add-item"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t.addItem}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-2 py-2 text-left w-10">{t.srNo}</th>
                <th className="px-2 py-2 text-left">{t.itemName}</th>
                <th className="px-2 py-2 text-left w-24">{t.hsnSac}</th>
                <th className="px-2 py-2 text-right w-20">{t.quantity}</th>
                <th className="px-2 py-2 text-right w-28">{t.pricePerUnit} ({currency})</th>
                <th className="px-2 py-2 text-right w-28">{t.amount} ({currency})</th>
                <th className="px-2 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-1">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="h-8"
                      data-testid={`input-item-description-${index}`}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <Input
                      value={item.hsnSac}
                      onChange={(e) => updateItem(item.id, 'hsnSac', e.target.value)}
                      className="h-8"
                      data-testid={`input-item-hsn-${index}`}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <Input
                      type="number"
                      step="0.001"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      className="h-8 text-right"
                      data-testid={`input-item-qty-${index}`}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.pricePerUnit || ''}
                      onChange={(e) => updateItem(item.id, 'pricePerUnit', Number(e.target.value))}
                      className="h-8 text-right"
                      data-testid={`input-item-price-${index}`}
                    />
                  </td>
                  <td className="px-2 py-2 text-right font-medium" data-testid={`text-item-amount-${index}`}>
                    {currency} {item.amount.toFixed(2)}
                  </td>
                  <td className="px-2 py-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="h-8 w-8 text-destructive"
                      data-testid={`button-remove-item-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="border rounded-md p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t.srNo} {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="h-8 w-8 text-destructive"
                  data-testid={`button-remove-item-mobile-${index}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder={t.itemName}
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                data-testid={`input-item-description-mobile-${index}`}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder={t.hsnSac}
                  value={item.hsnSac}
                  onChange={(e) => updateItem(item.id, 'hsnSac', e.target.value)}
                  data-testid={`input-item-hsn-mobile-${index}`}
                />
                <Input
                  type="number"
                  placeholder={t.quantity}
                  step="0.001"
                  min="0"
                  value={item.quantity || ''}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  inputMode="decimal"
                  data-testid={`input-item-qty-mobile-${index}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder={t.pricePerUnit}
                  step="0.01"
                  min="0"
                  value={item.pricePerUnit || ''}
                  onChange={(e) => updateItem(item.id, 'pricePerUnit', Number(e.target.value))}
                  inputMode="decimal"
                  data-testid={`input-item-price-mobile-${index}`}
                />
                <div className="flex items-center justify-end font-medium text-sm" data-testid={`text-item-amount-mobile-${index}`}>
                  {t.amount}: {currency} {item.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addItem}
            className="w-full"
            data-testid="button-add-item-mobile"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t.addItem}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
