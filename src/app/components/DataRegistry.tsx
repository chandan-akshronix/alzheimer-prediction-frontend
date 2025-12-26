import { useState, useEffect } from 'react';
import { Database, Calendar, FileImage, Filter, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type ScanClass = 'Normal' | 'Very Mild' | 'Mild' | 'Moderate';

interface ScanRecord {
  id: string;
  filename?: string;
  scanDate?: string;
  prediction?: string;
  confidence?: number | null;
  modelVersion?: string | null;
  processingTime?: string | null;
  status?: 'Completed' | 'Processing' | 'Failed';
  image_data?: string | null;
}

import { fetchPredictions, PredictionRecord } from '../../services/predictionsService';

export function DataRegistry() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [scanRecords, setScanRecords] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const preds = await fetchPredictions(200);
        const mapped: ScanRecord[] = preds.map((p) => ({
          id: p.prediction_id,
          filename: p.filename,
          scanDate: p.created_at ? new Date(p.created_at).toLocaleString() : undefined,
          prediction: p.predicted_class,
          confidence: p.confidence ?? null,
          modelVersion: undefined,
          processingTime: p.processing_ms ? `${(p.processing_ms/1000).toFixed(2)}s` : null,
          status: 'Completed',
          image_data: p.image_data ?? null,
        }));
        setScanRecords(mapped);
      } catch (err) {
        console.error('Failed to load predictions', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredRecords = scanRecords.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.filename || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterClass === 'all' || record.prediction === filterClass;
    return matchesSearch && matchesFilter;
  });

  const getClassColor = (className: ScanClass) => {
    const colors = {
      'Normal': 'bg-green-100 text-green-700 border-green-200',
      'Very Mild': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Mild': 'bg-orange-100 text-orange-700 border-orange-200',
      'Moderate': 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[className];
  };

  const stats = {
    total: scanRecords.length,
    normal: scanRecords.filter((r) => r.prediction === 'NonDemented' || r.prediction === 'Normal').length,
    veryMild: scanRecords.filter((r) => r.prediction === 'VeryMildDemented' || r.prediction === 'Very Mild').length,
    mild: scanRecords.filter((r) => r.prediction === 'MildDemented' || r.prediction === 'Mild').length,
    moderate: scanRecords.filter((r) => r.prediction === 'ModerateDemented' || r.prediction === 'Moderate').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            Data Registry
          </h1>
          <p className="text-gray-600 mt-2">View and manage all MRI scan records and predictions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Scans</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="p-4 bg-green-50">
            <p className="text-sm text-gray-600 mb-1">Normal</p>
            <p className="text-2xl font-bold text-green-600">{stats.normal}</p>
          </Card>
          <Card className="p-4 bg-yellow-50">
            <p className="text-sm text-gray-600 mb-1">Very Mild</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.veryMild}</p>
          </Card>
          <Card className="p-4 bg-orange-50">
            <p className="text-sm text-gray-600 mb-1">Mild</p>
            <p className="text-2xl font-bold text-orange-600">{stats.mild}</p>
          </Card>
          <Card className="p-4 bg-red-50">
            <p className="text-sm text-gray-600 mb-1">Moderate</p>
            <p className="text-2xl font-bold text-red-600">{stats.moderate}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by Scan ID or Patient ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Very Mild">Very Mild</SelectItem>
                  <SelectItem value="Mild">Mild</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Records Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scan ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prediction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                          {record.image_data ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={record.image_data} alt={record.filename} className="w-full h-full object-cover" />
                          ) : (
                            <FileImage className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{record.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.filename || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {record.scanDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getClassColor((record.prediction || '') as any)}>{record.prediction}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${record.confidence ?? 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{record.confidence !== null && record.confidence !== undefined ? `${record.confidence}%` : '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.modelVersion || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.processingTime || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {record.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No records found matching your search criteria</p>
            </div>
          )}
        </Card>

        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing {filteredRecords.length} of {scanRecords.length} records
        </div>
      </div>
    </div>
  );
}