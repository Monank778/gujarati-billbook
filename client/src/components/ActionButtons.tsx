import { useState, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, Share2, Printer, Mail, FileText, RotateCcw, Loader2, Eye } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import InvoicePreview from './InvoicePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ActionButtons() {
  const { t, clearForm, incrementInvoiceNumber, customer, calculations, settings } = useApp();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const generatePDF = async (): Promise<jsPDF | null> => {
    if (!previewRef.current) return null;

    setGenerating(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));

      return pdf;
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    setShowPreview(true);
    setTimeout(async () => {
      const pdf = await generatePDF();
      if (pdf) {
        pdf.save(`invoice-${customer.name || 'unnamed'}.pdf`);
        incrementInvoiceNumber();
        toast({
          title: t.downloadPDF,
          description: 'Invoice downloaded successfully',
        });
      }
      setShowPreview(false);
    }, 500);
  };

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => {
      window.print();
      setShowPreview(false);
    }, 500);
  };

  const handleWhatsAppShare = async () => {
    const currency = settings.seller.currency;
    const text = `Invoice for ${customer.name || 'Customer'}\nTotal: ${currency}${calculations.grandTotal.toFixed(2)}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    toast({
      title: t.shareWhatsApp,
      description: 'Opening WhatsApp...',
    });
  };

  const handleEmailShare = () => {
    const subject = `Invoice for ${customer.name || 'Customer'}`;
    const body = `Please find attached the invoice.\n\nThank you for your business.`;
    const url = `mailto:${customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  const handleClear = () => {
    clearForm();
    toast({
      title: t.clearForm,
      description: 'Form cleared successfully',
    });
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-40">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              className="flex items-center gap-2"
              data-testid="button-preview"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">{t.preview}</span>
            </Button>
            <Button
              onClick={handleDownloadPDF}
              disabled={generating}
              className="flex items-center gap-2"
              data-testid="button-download-pdf"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{t.downloadPDF}</span>
            </Button>
            <Button
              onClick={handleWhatsAppShare}
              variant="outline"
              className="flex items-center gap-2 text-green-600"
              data-testid="button-whatsapp"
            >
              <SiWhatsapp className="h-4 w-4" />
              <span className="hidden sm:inline">{t.shareWhatsApp}</span>
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex items-center gap-2"
              data-testid="button-print"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">{t.print}</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              onClick={handleEmailShare}
              variant="outline"
              className="flex items-center gap-2"
              data-testid="button-email"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">{t.sendEmail}</span>
            </Button>
            <Button
              onClick={handleClear}
              variant="ghost"
              className="flex items-center gap-2"
              data-testid="button-clear"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">{t.clearForm}</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t.preview}
            </DialogTitle>
            <DialogDescription>
              Preview your invoice before downloading or sharing
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <InvoicePreview ref={previewRef} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
