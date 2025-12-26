import { useEffect, useState } from 'react';
import { Network, Activity, CheckCircle, Clock, Database, Cpu } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { fetchModels, ModelInfo } from '../../services/modelsService';

export function ModelRegistry() {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const list = await fetchModels();
        setModels(list);
      } catch (err) {
        console.error('Failed to load models', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-600" />
            Model Registry
          </h1>
          <p className="text-gray-600 mt-2">Available model files for prediction</p>
        </div>

        <div className="space-y-6">
          {models.map((m) => {
            const name = m.filename.replace(/\.(h5|hdf5)$/i, '');
            return (
              <Card key={m.filename} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
                      <Badge className={m.active ? 'bg-green-500' : ''}>{m.active ? 'Active' : 'Available'}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">File: {m.filename}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{m.size_bytes ? `${(m.size_bytes/1024/1024).toFixed(2)} MB` : '-'}</div>
                    <p className="text-sm text-gray-500">Last modified: {m.modified_at ? new Date(m.modified_at).toLocaleString() : '-'}</p>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Path</p>
                      <p className="font-medium text-gray-900">{m.path || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium text-gray-900">{m.active ? 'Deployed' : 'Available'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Model Type</p>
                      <p className="font-medium text-gray-900">TensorFlow (.h5)</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Total Models</h3>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{models.length}</p>
            <p className="text-sm text-gray-600 mt-1">{models.filter(m=>m.active).length} Active</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Largest Model</h3>
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{models.length ? `${(Math.max(...models.map(m=>m.size_bytes||0))/1024/1024).toFixed(2)} MB` : '-'}</p>
            <p className="text-sm text-gray-600 mt-1">File size</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Model Format</h3>
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">TensorFlow (.h5)</p>
            <p className="text-sm text-gray-600 mt-1">Currently supported</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
