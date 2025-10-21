import React, { useState, useEffect } from 'react';
import { 
  getUTMAnalytics, 
  getCampaignPerformance, 
  getSignupsByUTMSource,
  getSignupsByUTMCampaign 
} from '../lib/supabase';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

interface UTMAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UTMAnalytics({ isOpen, onClose }: UTMAnalyticsProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [campaignPerformance, setCampaignPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadAnalytics();
    }
  }, [isOpen]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [analyticsResult, campaignResult] = await Promise.all([
        getUTMAnalytics(),
        getCampaignPerformance()
      ]);

      if (analyticsResult.success) {
        setAnalytics(analyticsResult.data);
      }
      if (campaignResult.success) {
        setCampaignPerformance(campaignResult.data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSourceClick = async (source: string) => {
    setSelectedSource(source);
    setSelectedCampaign('');
  };

  const handleCampaignClick = async (campaign: string) => {
    setSelectedCampaign(campaign);
    setSelectedSource('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">UTM Analytics Dashboard</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading analytics...</span>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Campaign Performance Summary */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Campaign Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaignPerformance?.map((campaign: any, index: number) => (
                    <div 
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-pink-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleCampaignClick(campaign.utm_campaign)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">{campaign.utm_source}</span>
                        <span className="text-lg font-bold text-blue-600">{campaign.count}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-1">{campaign.utm_medium}</div>
                      <div className="text-sm font-medium text-gray-900">{campaign.utm_campaign}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Latest: {new Date(campaign.latest_signup).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UTM Sources */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Traffic Sources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analytics && Object.entries(
                    analytics.reduce((acc: any, item: any) => {
                      if (item.utm_source) {
                        acc[item.utm_source] = (acc[item.utm_source] || 0) + 1;
                      }
                      return acc;
                    }, {})
                  ).map(([source, count]: [string, any]) => (
                    <div 
                      key={source}
                      className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleSourceClick(source)}
                    >
                      <div className="text-sm font-medium text-gray-600 mb-1">Source</div>
                      <div className="text-lg font-bold text-gray-900 mb-1">{source}</div>
                      <div className="text-sm text-blue-600">{count} signups</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UTM Mediums */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Traffic Mediums
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analytics && Object.entries(
                    analytics.reduce((acc: any, item: any) => {
                      if (item.utm_medium) {
                        acc[item.utm_medium] = (acc[item.utm_medium] || 0) + 1;
                      }
                      return acc;
                    }, {})
                  ).map(([medium, count]: [string, any]) => (
                    <div key={medium} className="bg-white border border-gray-200 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 mb-1">Medium</div>
                      <div className="text-lg font-bold text-gray-900 mb-1">{medium}</div>
                      <div className="text-sm text-green-600">{count} signups</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Signups with UTM Data */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Signups</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  {analytics?.slice(0, 10).map((signup: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {signup.utm_source} → {signup.utm_medium} → {signup.utm_campaign}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(signup.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {signup.utm_term && `Term: ${signup.utm_term}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
