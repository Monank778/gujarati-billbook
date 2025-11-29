import { forwardRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { formatDate, numberToWordsEnglish } from '@/lib/translations';

const InvoicePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { settings, customer, items, invoiceNumber, invoiceDate, calculations, receivedAmount, language } = useApp();
  const currency = settings.seller.currency;

  const fontSize = settings.appearance.fontSize === 'small' ? 11 : settings.appearance.fontSize === 'large' ? 14 : 12;

  return (
    <div
      ref={ref}
      className="bg-white text-black p-6 max-w-[210mm] mx-auto"
      style={{ fontFamily: "'Noto Sans', 'Noto Sans Gujarati', sans-serif", fontSize: `${fontSize}px` }}
      data-testid="invoice-preview"
    >
      <h1 className="text-center text-xl font-bold mb-4" style={{ fontSize: `${fontSize + 6}px` }}>
        Tax Invoice
      </h1>

      <div className="border border-black">
        <div className="flex border-b border-black">
          <div className="flex-1 p-3">
            <div className="flex items-start gap-3">
              {settings.seller.logo && (
                <img src={settings.seller.logo} alt="Logo" className="w-14 h-14 object-contain" />
              )}
              <div>
                <div className="font-bold text-lg" style={{ fontSize: `${fontSize + 4}px` }}>
                  {settings.seller.businessName || 'Business Name'}
                </div>
                <div className="mt-1">
                  {settings.seller.phone && <span>Phone: {settings.seller.phone}</span>}
                </div>
                <div>
                  {settings.seller.email && <span>Email: {settings.seller.email}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-b border-black">
          <div className="flex-1 border-r border-black p-2">
            <div className="font-semibold bg-gray-100 px-1 py-0.5 mb-1">Bill To:</div>
            <div className="font-medium">{customer.name || '-'}</div>
            {customer.address && <div className="text-sm mt-1">{customer.address}</div>}
          </div>
          <div className="w-40 p-2">
            <div className="font-semibold bg-gray-100 px-1 py-0.5 mb-1">Invoice Details:</div>
            <div className="flex justify-between">
              <span>No:</span>
              <span className="font-medium">{invoiceNumber || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{formatDate(invoiceDate, settings.invoice.dateFormat)}</span>
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-black bg-gray-100">
              <th className="border-r border-black px-2 py-1 text-left w-8">#</th>
              <th className="border-r border-black px-2 py-1 text-left">Item Name</th>
              <th className="border-r border-black px-2 py-1 text-center w-20">HSN/SAC</th>
              <th className="border-r border-black px-2 py-1 text-center w-16">Quantity</th>
              <th className="border-r border-black px-2 py-1 text-right w-24">Price/Unit ({currency})</th>
              <th className="px-2 py-1 text-right w-24">Amount({currency})</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-black">
                <td className="border-r border-black px-2 py-1">{index + 1}</td>
                <td className="border-r border-black px-2 py-1">{item.description || '-'}</td>
                <td className="border-r border-black px-2 py-1 text-center">{item.hsnSac || '-'}</td>
                <td className="border-r border-black px-2 py-1 text-center">{item.quantity || '-'}</td>
                <td className="border-r border-black px-2 py-1 text-right">
                  {item.pricePerUnit ? `${currency} ${item.pricePerUnit.toFixed(2)}` : '-'}
                </td>
                <td className="px-2 py-1 text-right">
                  {item.amount ? `${currency} ${item.amount.toFixed(2)}` : '-'}
                </td>
              </tr>
            ))}
            <tr className="font-semibold border-b border-black">
              <td className="border-r border-black px-2 py-1"></td>
              <td className="border-r border-black px-2 py-1">Total</td>
              <td className="border-r border-black px-2 py-1"></td>
              <td className="border-r border-black px-2 py-1 text-center">
                {items.reduce((sum, item) => sum + (item.quantity || 0), 0).toFixed(3)}
              </td>
              <td className="border-r border-black px-2 py-1"></td>
              <td className="px-2 py-1 text-right font-bold">
                {currency} {calculations.subTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex">
          <div className="flex-1"></div>
          <div className="w-64 border-l border-black">
            <div className="flex justify-between border-b border-black px-2 py-1">
              <span>Sub Total</span>
              <span>:</span>
              <span className="font-medium">{currency} {calculations.subTotal.toFixed(2)}</span>
            </div>
            {settings.invoice.enableDiscount && calculations.discountAmount > 0 && (
              <div className="flex justify-between border-b border-black px-2 py-1">
                <span>Discount</span>
                <span>:</span>
                <span className="font-medium">- {currency} {calculations.discountAmount.toFixed(2)}</span>
              </div>
            )}
            {settings.invoice.enableGST && calculations.gstAmount > 0 && (
              <div className="flex justify-between border-b border-black px-2 py-1">
                <span>GST ({settings.seller.taxPercent}%)</span>
                <span>:</span>
                <span className="font-medium">+ {currency} {calculations.gstAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-black px-2 py-1 font-bold bg-gray-100">
              <span>Total</span>
              <span>:</span>
              <span>{currency} {calculations.grandTotal.toFixed(2)}</span>
            </div>
            <div className="border-b border-black px-2 py-1">
              <div className="font-semibold bg-gray-100 px-1 py-0.5 mb-1">Invoice Amount In Words :</div>
              <div className="text-sm">
                {numberToWordsEnglish(calculations.grandTotal)}
              </div>
            </div>
            {settings.invoice.enablePaymentTracking && (
              <>
                <div className="flex justify-between border-b border-black px-2 py-1">
                  <span>Received</span>
                  <span>:</span>
                  <span className="font-medium">{currency} {receivedAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-2 py-1 font-bold">
                  <span>Balance</span>
                  <span>:</span>
                  <span>{currency} {calculations.balanceAmount.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-black">
          <div className="p-2">
            <div className="font-semibold">Terms And Conditions:</div>
            <div className="text-sm mt-1">{settings.seller.termsAndConditions || 'Thank you for doing business with us.'}</div>
          </div>
        </div>

        <div className="flex border-t border-black">
          <div className="flex-1"></div>
          <div className="w-64 border-l border-black p-3 text-center">
            <div className="font-semibold mb-6">
              For {settings.seller.businessName || 'Business Name'}:
            </div>
            <div className="border-b border-black mb-1 h-12"></div>
            <div className="text-sm italic">
              {settings.seller.authorizedSignatory || 'Authorized Signatory'}
            </div>
            <div className="text-xs text-gray-600">Authorized Signatory</div>
          </div>
        </div>
      </div>
    </div>
  );
});

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;
