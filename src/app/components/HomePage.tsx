import { Link } from 'react-router-dom';
import { Brain, Upload, LineChart, Shield, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function HomePage() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced CNN Model',
      description: 'State-of-the-art deep learning model trained on extensive MRI datasets',
    },
    {
      icon: Shield,
      title: 'High Accuracy',
      description: 'Precise classification with confidence scores for reliable predictions',
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Get instant results within seconds of uploading your MRI scan',
    },
    {
      icon: LineChart,
      title: 'Detailed Analytics',
      description: 'Comprehensive analysis with severity level classification',
    },
  ];

  const severityLevels = [
    { name: 'No Disease', color: 'bg-green-100 text-green-700', description: 'No Alzheimer\'s detected', icon: '✓' },
    { name: 'Very Mild', color: 'bg-yellow-100 text-yellow-700', description: 'Very mild cognitive decline', icon: '!' },
    { name: 'Mild', color: 'bg-orange-100 text-orange-700', description: 'Mild disease progression', icon: '!!' },
    { name: 'Moderate', color: 'bg-red-100 text-red-700', description: 'Moderate disease severity', icon: '!!!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl mb-6 shadow-lg">
            <Brain className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Alzheimer's Disease
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              AI Detection System
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Leverage cutting-edge deep learning technology for early detection and classification 
            of Alzheimer's disease through MRI brain scan analysis
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                <Upload className="w-5 h-5 mr-2" />
                Upload MRI Scan
              </Button>
            </Link>
            <Link to="/model-registry">
              <Button size="lg" variant="outline">
                <LineChart className="w-5 h-5 mr-2" />
                View Model Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Classification Levels */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Classification Levels
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {severityLevels.map((level, index) => (
              <div
                key={level.name}
                className="relative overflow-hidden rounded-lg border-2 border-gray-100 p-6 hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${level.color}`}>
                    Level {index}
                  </span>
                  <CheckCircle className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{level.name}</h3>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload MRI Scan</h3>
              <p className="text-sm text-gray-600">
                Upload your brain MRI scan in standard format (JPEG, PNG, DICOM)
              </p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">
                Our CNN model processes the scan and analyzes patterns
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-sm text-gray-600">
                Receive detailed classification with confidence scores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}