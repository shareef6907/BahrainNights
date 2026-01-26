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
  TrendingUp
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

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, unsubscribed: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'subscribed' | 'unsubscribed'>('all');
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

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
    try {
      const response = await fetch('/api/admin/newsletter/generate');
      if (response.ok) {
        const data = await response.json();
        setGeneratedContent(data.content || '');
        setShowGenerator(true);
      }
    } catch (error) {
      console.error('Error generating newsletter:', error);
    }
    setGenerating(false);
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
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors disabled:opacity-50"
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
      {showGenerator && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Generated Newsletter
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowGenerator(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors">
                  <Send className="w-4 h-4" />
                  Send to All
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="w-full h-96 p-4 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm resize-none focus:outline-none focus:border-yellow-500"
                placeholder="Newsletter content will appear here..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Edit the content above before sending. The newsletter will be sent to {stats.active} active subscribers.
              </p>
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

      {/* Info Box */}
      <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
        <h3 className="font-bold text-yellow-400 mb-2">📧 Newsletter Status</h3>
        <p className="text-sm text-gray-300">
          Bi-weekly newsletter is scheduled to send automatically. Emails will be sent from <code className="bg-black/30 px-1 rounded">noreply@bahrainnights.com</code>.
          Use the &quot;Generate Newsletter&quot; button to create content based on upcoming events.
        </p>
      </div>
    </div>
  );
}
