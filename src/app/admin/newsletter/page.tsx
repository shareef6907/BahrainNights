'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  Download, 
  Users, 
  Calendar, 
  Search, 
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2,
  FileText,
  Send,
  Eye,
  Sparkles,
  TrendingUp,
  AlertCircle,
  X
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  source: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

interface Stats {
  total: number;
  active: number;
  unsubscribed: number;
  thisMonth: number;
}

interface GeneratedNewsletter {
  html: string;
  text: string;
  subject: string;
  eventsCount: number;
  internationalCount: number;
}

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, unsubscribed: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'subscribed' | 'unsubscribed'>('all');
  
  // Newsletter state
  const [showGenerator, setShowGenerator] = useState(false);
  const [newsletter, setNewsletter] = useState<GeneratedNewsletter | null>(null);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    fetchSubscribers();
    checkTableExists();
  }, []);

  const checkTableExists = async () => {
    try {
      const response = await fetch('/api/admin/newsletter/init');
      const data = await response.json();
      if (!data.exists) {
        console.log('Newsletter table needs to be created');
      }
    } catch (error) {
      console.error('Error checking table:', error);
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/newsletter/subscribers');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
        setStats(data.stats || { total: 0, active: 0, unsubscribed: 0, thisMonth: 0 });
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
    setLoading(false);
  };

  const exportSubscribers = () => {
    const filtered = filteredSubscribers();
    const csv = [
      ['Email', 'Status', 'Source', 'Subscribed At', 'Unsubscribed At'].join(','),
      ...filtered.map(s => [
        s.email,
        s.status,
        s.source,
        s.subscribed_at,
        s.unsubscribed_at || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSubscribers = () => {
    return subscribers.filter(s => {
      const matchesSearch = s.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const generateNewsletter = async () => {
    setGenerating(true);
    setSendResult(null);
    try {
      const response = await fetch('/api/admin/newsletter/generate');
      if (response.ok) {
        const data = await response.json();
        setNewsletter(data);
        setShowGenerator(true);
      } else {
        const error = await response.json();
        setSendResult({ success: false, message: error.error || 'Failed to generate' });
      }
    } catch (error) {
      console.error('Error generating newsletter:', error);
      setSendResult({ success: false, message: 'Network error' });
    }
    setGenerating(false);
  };

  const sendNewsletter = async (isTest = false) => {
    if (!newsletter) return;
    
    setSending(true);
    setSendResult(null);
    
    try {
      const response = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newsletter.subject,
          html: newsletter.html,
          text: newsletter.text,
          testEmail: isTest ? testEmail : undefined,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSendResult({ 
          success: true, 
          message: isTest 
            ? `Test email sent to ${testEmail}` 
            : `Newsletter sent to ${data.count} subscribers!` 
        });
      } else {
        setSendResult({ 
          success: false, 
          message: data.error || 'Failed to send' 
        });
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      setSendResult({ success: false, message: 'Network error. Please try again.' });
    }
    
    setSending(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="w-8 h-8 text-yellow-400" />
            Newsletter Management
          </h1>
          <p className="text-gray-400 mt-1">Manage subscribers and create newsletters</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generateNewsletter}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg transition-all disabled:opacity-50 font-medium"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate Newsletter
          </button>
          <button
            onClick={fetchSubscribers}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-400">Total Subscribers</div>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.active}</div>
              <div className="text-sm text-gray-400">Active Subscribers</div>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.unsubscribed}</div>
              <div className="text-sm text-gray-400">Unsubscribed</div>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.thisMonth}</div>
              <div className="text-sm text-gray-400">This Month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Generator Modal */}
      {showGenerator && newsletter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Newsletter Preview
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {newsletter.eventsCount} events • {newsletter.internationalCount} international
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowGenerator(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subject Line */}
            <div className="p-4 border-b border-white/10 flex-shrink-0">
              <label className="text-sm text-gray-400 block mb-2">Subject Line</label>
              <input
                type="text"
                value={newsletter.subject}
                onChange={(e) => setNewsletter({ ...newsletter, subject: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Preview Toggle */}
            <div className="p-4 border-b border-white/10 flex-shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${!showPreview ? 'bg-yellow-500 text-black font-medium' : 'bg-white/10 text-white'}`}
                >
                  Edit HTML
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${showPreview ? 'bg-yellow-500 text-black font-medium' : 'bg-white/10 text-white'}`}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {showPreview ? (
                <div className="bg-white rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={newsletter.html}
                    className="w-full h-[600px] border-0"
                    title="Newsletter Preview"
                  />
                </div>
              ) : (
                <textarea
                  value={newsletter.html}
                  onChange={(e) => setNewsletter({ ...newsletter, html: e.target.value })}
                  className="w-full h-[500px] p-4 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm resize-none focus:outline-none focus:border-yellow-500"
                />
              )}
            </div>

            {/* Send Result */}
            {sendResult && (
              <div className={`mx-4 mb-4 p-4 rounded-lg flex items-center gap-3 ${sendResult.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                {sendResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                <span className={sendResult.success ? 'text-green-400' : 'text-red-400'}>
                  {sendResult.message}
                </span>
              </div>
            )}

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Test email address"
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-500 w-64"
                  />
                  <button
                    onClick={() => sendNewsletter(true)}
                    disabled={sending || !testEmail}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Send Test
                  </button>
                </div>
                <button
                  onClick={() => sendNewsletter(false)}
                  disabled={sending || stats.active === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  Send to All ({stats.active} subscribers)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by email..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'subscribed' | 'unsubscribed')}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500"
        >
          <option value="all">All Status</option>
          <option value="subscribed">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
        <button
          onClick={exportSubscribers}
          className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
          </div>
        ) : filteredSubscribers().length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No subscribers found</p>
            <p className="text-sm mt-2">Subscribers will appear here once people sign up</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Source</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers().map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {subscriber.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.status === 'subscribed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {subscriber.status === 'subscribed' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{subscriber.source || 'website'}</td>
                  <td className="p-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(subscriber.subscribed_at)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Setup Info */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Email Sending Setup (Resend.com)
        </h3>
        <div className="text-sm text-gray-300 space-y-2">
          <p>To send newsletters, configure Resend:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-400">
            <li>Go to <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">resend.com</a> and create a free account (3,000 emails/month)</li>
            <li>Get your API key from the dashboard</li>
            <li>Add <code className="bg-black/30 px-1 rounded">RESEND_API_KEY=re_xxxxx</code> to your environment variables</li>
            <li>Verify your domain by adding DNS records (see Resend dashboard)</li>
          </ol>
          <p className="mt-3 text-gray-500">
            DNS records needed for <code className="bg-black/30 px-1 rounded">bahrainnights.com</code>:
          </p>
          <ul className="list-disc list-inside text-gray-500">
            <li>SPF record (TXT)</li>
            <li>DKIM record (TXT)</li>
            <li>Optional: DMARC record (TXT)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
<!-- Force redeploy: 1769447963 -->
