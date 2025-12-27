'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Printer,
  Download,
  Mail,
  CheckCircle,
  Copy
} from 'lucide-react';
import Link from 'next/link';

// Mock ad data for invoice
const mockAdData: Record<string, {
  id: string;
  invoiceNumber: string;
  advertiserName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  adTitle: string;
  startDate: string;
  endDate: string;
  slotPosition: number;
  price: number;
  paymentStatus: string;
  paymentDate: string;
  createdAt: string;
}> = {
  'ad1': {
    id: 'ad1',
    invoiceNumber: 'INV-2024-001',
    advertiserName: 'The Ritz-Carlton Bahrain',
    companyName: 'Marriott International',
    contactEmail: 'marketing@ritzcarlton.bh',
    contactPhone: '+973 1758 0000',
    adTitle: 'NYE Gala Night 2025',
    startDate: '2024-12-15',
    endDate: '2025-01-15',
    slotPosition: 1,
    price: 500,
    paymentStatus: 'paid',
    paymentDate: '2024-12-01',
    createdAt: '2024-11-25',
  },
  'ad2': {
    id: 'ad2',
    invoiceNumber: 'INV-2024-002',
    advertiserName: 'Four Seasons Hotel',
    companyName: 'Four Seasons Hotels & Resorts',
    contactEmail: 'events@fourseasons.bh',
    contactPhone: '+973 1711 5000',
    adTitle: 'Friday Brunch Extravaganza',
    startDate: '2024-12-01',
    endDate: '2025-02-28',
    slotPosition: 2,
    price: 400,
    paymentStatus: 'paid',
    paymentDate: '2024-11-28',
    createdAt: '2024-11-20',
  },
};

export default function InvoicePage() {
  const params = useParams();
  const adId = params?.id as string;
  const printRef = useRef<HTMLDivElement>(null);

  const [adData, setAdData] = useState<typeof mockAdData['ad1'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = mockAdData[adId];
    if (data) {
      setAdData(data);
    }
    setIsLoading(false);
  }, [adId]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyInvoice = () => {
    if (adData) {
      navigator.clipboard.writeText(adData.invoiceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateDays = () => {
    if (!adData) return 0;
    const start = new Date(adData.startDate);
    const end = new Date(adData.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!adData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Invoice Not Found</h1>
          <Link href="/admin/ads" className="text-cyan-400 hover:underline">
            Back to Ads Manager
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header - Hidden on Print */}
      <div className="print:hidden bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/admin/ads/${adId}/edit`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ad
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyInvoice}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Invoice #'}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <motion.div
          ref={printRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Invoice Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-8 text-white print:bg-cyan-600">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
                <p className="text-cyan-100 text-lg">{adData.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold mb-1">BahrainNights.com</h2>
                <p className="text-cyan-100">Your Nightlife. Our Spotlight.</p>
              </div>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="p-8">
            {/* Status Banner */}
            <div className={`mb-8 p-4 rounded-lg ${
              adData.paymentStatus === 'paid'
                ? 'bg-green-50 border border-green-200'
                : adData.paymentStatus === 'overdue'
                ? 'bg-red-50 border border-red-200'
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    adData.paymentStatus === 'paid'
                      ? 'bg-green-500'
                      : adData.paymentStatus === 'overdue'
                      ? 'bg-red-500'
                      : 'bg-amber-500'
                  }`} />
                  <span className={`font-semibold ${
                    adData.paymentStatus === 'paid'
                      ? 'text-green-700'
                      : adData.paymentStatus === 'overdue'
                      ? 'text-red-700'
                      : 'text-amber-700'
                  }`}>
                    {adData.paymentStatus === 'paid' ? 'Payment Received' :
                     adData.paymentStatus === 'overdue' ? 'Payment Overdue' : 'Payment Pending'}
                  </span>
                </div>
                {adData.paymentDate && adData.paymentStatus === 'paid' && (
                  <span className="text-green-600 text-sm">
                    Paid on {formatDate(adData.paymentDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Billing Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-gray-500 text-sm font-medium uppercase mb-3">Bill To</h3>
                <p className="text-gray-900 font-semibold text-lg">{adData.advertiserName}</p>
                {adData.companyName && (
                  <p className="text-gray-600">{adData.companyName}</p>
                )}
                <p className="text-gray-600">{adData.contactEmail}</p>
                <p className="text-gray-600">{adData.contactPhone}</p>
              </div>
              <div className="text-right">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Invoice Date:</span>
                    <span className="text-gray-900 font-medium">{formatDate(adData.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Due Date:</span>
                    <span className="text-gray-900 font-medium">{formatDate(adData.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Invoice Number:</span>
                    <span className="text-gray-900 font-medium">{adData.invoiceNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 text-gray-500 font-medium uppercase text-sm">Description</th>
                    <th className="text-center py-3 text-gray-500 font-medium uppercase text-sm">Duration</th>
                    <th className="text-center py-3 text-gray-500 font-medium uppercase text-sm">Slot</th>
                    <th className="text-right py-3 text-gray-500 font-medium uppercase text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4">
                      <p className="text-gray-900 font-medium">Homepage Slider Advertisement</p>
                      <p className="text-gray-500 text-sm">&quot;{adData.adTitle}&quot;</p>
                      <p className="text-gray-400 text-sm">
                        {formatDate(adData.startDate)} - {formatDate(adData.endDate)}
                      </p>
                    </td>
                    <td className="text-center py-4 text-gray-600">
                      {calculateDays()} days
                    </td>
                    <td className="text-center py-4 text-gray-600">
                      Position {adData.slotPosition}
                    </td>
                    <td className="text-right py-4 text-gray-900 font-medium">
                      BD {adData.price.toFixed(3)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="text-gray-900">BD {adData.price.toFixed(3)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">VAT (10%):</span>
                  <span className="text-gray-900">BD {(adData.price * 0.1).toFixed(3)}</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-gray-200 mt-2">
                  <span className="text-gray-900 font-bold text-lg">Total:</span>
                  <span className="text-gray-900 font-bold text-lg">BD {(adData.price * 1.1).toFixed(3)}</span>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-gray-900 font-semibold mb-4">Payment Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Bank Name</p>
                  <p className="text-gray-900 font-medium">National Bank of Bahrain</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Account Name</p>
                  <p className="text-gray-900 font-medium">BahrainNights LLC</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Account Number</p>
                  <p className="text-gray-900 font-medium">0123-4567-8901-2345</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">IBAN</p>
                  <p className="text-gray-900 font-medium">BH00NBOB0001234567890123</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Please include invoice number <span className="font-medium text-gray-700">{adData.invoiceNumber}</span> as payment reference.
              </p>
            </div>

            {/* Terms */}
            <div className="text-sm text-gray-500 space-y-2">
              <h4 className="font-medium text-gray-700">Terms & Conditions</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Payment is due before the advertisement start date.</li>
                <li>Late payments may result in advertisement suspension.</li>
                <li>No refunds for active or completed advertisement periods.</li>
                <li>Contact billing@bahrainnights.com for any queries.</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <div>
                <p className="font-medium text-gray-700">BahrainNights.com</p>
                <p>Manama, Kingdom of Bahrain</p>
              </div>
              <div className="text-center">
                <p>Email: billing@bahrainnights.com</p>
                <p>Phone: +973 1700 0000</p>
              </div>
              <div className="text-right">
                <p>CR: 12345-67</p>
                <p>VAT: 100012345678</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Print Styles Note */}
        <p className="text-center text-gray-500 text-sm mt-6 print:hidden">
          This invoice will print in a clean, professional format.
        </p>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:bg-cyan-600 {
            background-color: #0891b2 !important;
          }
        }
      `}</style>
    </div>
  );
}
