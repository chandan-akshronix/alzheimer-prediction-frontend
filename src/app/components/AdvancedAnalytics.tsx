import { useEffect, useState } from 'react';
import { TrendingUp, Users, Calendar, Brain, Activity, BarChart3, Target, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line, Bar, ScatterChart, Scatter, ZAxis } from 'recharts';
import { getAnalytics, AnalyticsResponse } from '../../services/analyticsService';

export function AdvancedAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  useEffect(() => {
    async function load() {
      setLoadingAnalytics(true);
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to load analytics', err);
      } finally {
        setLoadingAnalytics(false);
      }
    }
    load();
  }, []);
  // Monthly trend data
  const monthlyData = [
    { month: 'Jan', scans: 145, noDisease: 68, veryMild: 42, mild: 25, moderate: 10, accuracy: 93.2 },
    { month: 'Feb', scans: 167, noDisease: 75, veryMild: 48, mild: 30, moderate: 14, accuracy: 93.8 },
    { month: 'Mar', scans: 189, noDisease: 82, veryMild: 55, mild: 35, moderate: 17, accuracy: 94.1 },
    { month: 'Apr', scans: 203, noDisease: 89, veryMild: 60, mild: 38, moderate: 16, accuracy: 94.5 },
    { month: 'May', scans: 221, noDisease: 95, veryMild: 68, mild: 42, moderate: 16, accuracy: 94.3 },
    { month: 'Jun', scans: 245, noDisease: 108, veryMild: 72, mild: 48, moderate: 17, accuracy: 94.8 },
    { month: 'Jul', scans: 268, noDisease: 115, veryMild: 80, mild: 52, moderate: 21, accuracy: 95.1 },
  ];

  // Age distribution data
  const ageDistribution = [
    { age: '40-50', noDisease: 85, veryMild: 12, mild: 3, moderate: 0 },
    { age: '50-60', noDisease: 72, veryMild: 20, mild: 6, moderate: 2 },
    { age: '60-70', noDisease: 55, veryMild: 30, mild: 12, moderate: 3 },
    { age: '70-80', noDisease: 35, veryMild: 38, mild: 20, moderate: 7 },
    { age: '80+', noDisease: 20, veryMild: 35, mild: 30, moderate: 15 },
  ];

  // Performance metrics over time
  const performanceData = [
    { date: 'Week 1', accuracy: 92.5, precision: 91.2, recall: 93.1, f1Score: 92.1 },
    { date: 'Week 2', accuracy: 93.2, precision: 92.1, recall: 93.8, f1Score: 92.9 },
    { date: 'Week 3', accuracy: 93.8, precision: 92.8, recall: 94.2, f1Score: 93.5 },
    { date: 'Week 4', accuracy: 94.3, precision: 93.5, recall: 94.8, f1Score: 94.1 },
  ];

  // Processing time vs accuracy scatter
  const processingData = [
    { time: 1.8, accuracy: 92.5, scans: 120 },
    { time: 2.0, accuracy: 93.2, scans: 180 },
    { time: 2.1, accuracy: 94.3, scans: 250 },
    { time: 2.3, accuracy: 93.8, scans: 200 },
    { time: 2.5, accuracy: 92.8, scans: 150 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-3 rounded-xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Advanced Analytics
              </h1>
              <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Brain className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Predictions</p>
            <p className="text-4xl font-bold">{analytics ? analytics.total_predictions : '—'}</p>
            <p className="text-xs opacity-80 mt-2">{analytics ? 'Real-time data' : 'Loading...'}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-8 h-8 opacity-80" />
              <Activity className="w-6 h-6" />
            </div>
            <p className="text-sm opacity-90 mb-1">Avg. Accuracy</p>
            <p className="text-4xl font-bold">{analytics && analytics.avg_confidence !== null ? `${analytics.avg_confidence.toFixed(1)}%` : '—'}</p>
            <p className="text-xs opacity-80 mt-2">{analytics ? 'Computed from predictions' : 'Loading...'}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 opacity-80" />
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-sm opacity-90 mb-1">Active Users</p>
            <p className="text-4xl font-bold">{analytics && analytics.active_users !== null ? analytics.active_users : '—'}</p>
            <p className="text-xs opacity-80 mt-2">{analytics ? 'Active users (from predictions)' : 'Loading...'}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-600 to-red-500 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 opacity-80" />
              <BarChart3 className="w-6 h-6" />
            </div>
            <p className="text-sm opacity-90 mb-1">Avg. Process Time</p>
            <p className="text-4xl font-bold">{analytics && analytics.avg_processing_ms !== null ? `${(analytics.avg_processing_ms/1000).toFixed(2)}s` : '—'}</p>
            <p className="text-xs opacity-80 mt-2">{analytics ? 'Average from recent predictions' : 'Loading...'}</p>
          </Card>
        </div>

        {/* Monthly Trends */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-xl border-2 border-blue-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Monthly Scan Volume & Accuracy
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #3b82f6', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="scans" fill="#3b82f6" name="Total Scans" radius={[8, 8, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} name="Accuracy %" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-xl border-2 border-purple-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-600" />
              Detection Distribution Trends
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #8b5cf6', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="noDisease" stackId="1" stroke="#22c55e" fill="#22c55e" name="No Disease" />
                <Area type="monotone" dataKey="veryMild" stackId="1" stroke="#eab308" fill="#eab308" name="Very Mild" />
                <Area type="monotone" dataKey="mild" stackId="1" stroke="#f97316" fill="#f97316" name="Mild" />
                <Area type="monotone" dataKey="moderate" stackId="1" stroke="#ef4444" fill="#ef4444" name="Moderate" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Age Distribution & Performance */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-xl border-2 border-green-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-green-600" />
              Age Group Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #10b981', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="noDisease" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} name="No Disease" />
                <Area type="monotone" dataKey="veryMild" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.8} name="Very Mild" />
                <Area type="monotone" dataKey="mild" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.8} name="Mild" />
                <Area type="monotone" dataKey="moderate" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} name="Moderate" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-xl border-2 border-orange-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-600" />
              Model Performance Metrics
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis domain={[90, 96]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #f97316', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} name="Accuracy" />
                <Line type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={3} name="Precision" />
                <Line type="monotone" dataKey="recall" stroke="#f59e0b" strokeWidth={3} name="Recall" />
                <Line type="monotone" dataKey="f1Score" stroke="#8b5cf6" strokeWidth={3} name="F1 Score" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Processing Performance */}
        <Card className="p-6 shadow-xl border-2 border-cyan-100">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-cyan-600" />
            Processing Time vs Accuracy Analysis
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number" 
                dataKey="time" 
                name="Processing Time" 
                unit="s"
                label={{ value: 'Processing Time (seconds)', position: 'bottom' }}
              />
              <YAxis 
                type="number" 
                dataKey="accuracy" 
                name="Accuracy" 
                unit="%"
                label={{ value: 'Accuracy (%)', angle: -90, position: 'left' }}
              />
              <ZAxis type="number" dataKey="scans" range={[100, 1000]} name="Scans" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#fff', border: '2px solid #06b6d4', borderRadius: '8px' }}
              />
              <Legend />
              <Scatter name="Performance" data={processingData} fill="#06b6d4" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        {/* Insights */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Key Insights</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Detection rate increased by 12% this month</li>
              <li>• Accuracy improved to 94.8% average</li>
              <li>• Processing time optimized by 9%</li>
              <li>• User adoption up 15% quarter-over-quarter</li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Performance Highlights</h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• 95.1% accuracy achieved in July</li>
              <li>• Fastest processing time: 1.8s</li>
              <li>• Zero critical errors this month</li>
              <li>• 99.7% uptime maintained</li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Recommendations</h4>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>• Continue model training optimization</li>
              <li>• Expand dataset for 80+ age group</li>
              <li>• Implement batch processing feature</li>
              <li>• Enhanced DICOM support planned</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
