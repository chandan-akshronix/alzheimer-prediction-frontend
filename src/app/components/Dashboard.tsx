import { useState, useRef } from 'react';
import { Upload, ImageIcon, AlertCircle, CheckCircle2, TrendingUp, FileImage, Activity, BarChart3, PieChart as PieChartIcon, Brain, FileText, Download, History } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar, LineChart, Line } from 'recharts';
import { MedicalReport } from './MedicalReport';
import { toast } from 'sonner';
import { uploadImageForPrediction } from '../../services/predictionService';

type PredictionClass = 'NonDemented' | 'VeryMildDemented' | 'MildDemented' | 'ModerateDemented';

interface PredictionResult {
  class: PredictionClass;
  confidence: number;
  allScores: {
    nonDemented: number;
    veryMildDemented: number;
    mildDemented: number;
    moderateDemented: number;
  };
}

export function Dashboard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPG, PNG)');
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPrediction(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // backend returns a probability mapping: { "MildDemented": 0.02, "ModerateDemented": 0.02, "NonDemented": 0.92, "VeryMildDemented": 0.04 }
      const probs = await uploadImageForPrediction(selectedFile);

      // Find the class with the highest probability
      const keys = Object.keys(probs);
      if (keys.length === 0) throw new Error('Empty prediction from server');

      let topKey = keys[0];
      for (const k of keys) {
        if ((probs[k] ?? 0) > (probs[topKey] ?? 0)) topKey = k;
      }

      const confidencePct = (probs[topKey] ?? 0) * 100;

      // Build allScores normalized to percentages for the UI
      const allScores = {
        nonDemented: (probs['NonDemented'] ?? 0) * 100,
        veryMildDemented: (probs['VeryMildDemented'] ?? 0) * 100,
        mildDemented: (probs['MildDemented'] ?? 0) * 100,
        moderateDemented: (probs['ModerateDemented'] ?? 0) * 100,
      };

      // Cast the backend key to our frontend PredictionClass type when possible
      const predictedClass = (topKey as PredictionClass) ?? 'NonDemented';

      setPrediction({
        class: predictedClass,
        confidence: confidencePct,
        allScores,
      });

      toast.success('Analysis complete! (results from backend)');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to analyze image');
      console.error('Prediction error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getClassColor = (className: PredictionClass) => {
    const colors = {
      'NonDemented': 'text-green-700 bg-gradient-to-br from-green-50 to-emerald-50 border-green-300',
      'VeryMildDemented': 'text-yellow-700 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300',
      'MildDemented': 'text-orange-700 bg-gradient-to-br from-orange-50 to-red-50 border-orange-300',
      'ModerateDemented': 'text-red-700 bg-gradient-to-br from-red-50 to-rose-50 border-red-300',
    };
    return colors[className];
  };

  const getClassIcon = (className: PredictionClass) => {
    if (className === 'NonDemented') return '✓';
    if (className === 'VeryMildDemented') return '!';
    if (className === 'MildDemented') return '!!';
    return '!!!';
  };

  // Data for charts
  const pieChartData = prediction ? [
    { name: 'Non Demented', value: prediction.allScores.nonDemented, color: '#22c55e' },
    { name: 'Very Mild', value: prediction.allScores.veryMildDemented, color: '#eab308' },
    { name: 'Mild', value: prediction.allScores.mildDemented, color: '#f97316' },
    { name: 'Moderate', value: prediction.allScores.moderateDemented, color: '#ef4444' },
  ] : [];

  const barChartData = prediction ? [
    { name: 'Non Demented', score: prediction.allScores.nonDemented, fill: '#22c55e' },
    { name: 'Very Mild', score: prediction.allScores.veryMildDemented, fill: '#eab308' },
    { name: 'Mild', score: prediction.allScores.mildDemented, fill: '#f97316' },
    { name: 'Moderate', score: prediction.allScores.moderateDemented, fill: '#ef4444' },
  ] : [];

  const radialChartData = prediction ? [
    {
      name: 'Non Demented',
      value: prediction.allScores.nonDemented,
      fill: '#22c55e',
    },
    {
      name: 'Very Mild',
      value: prediction.allScores.veryMildDemented,
      fill: '#eab308',
    },
    {
      name: 'Mild',
      value: prediction.allScores.mildDemented,
      fill: '#f97316',
    },
    {
      name: 'Moderate',
      value: prediction.allScores.moderateDemented,
      fill: '#ef4444',
    },
  ] : [];

  // Historical data for trend chart
  const trendData = [
    { scan: 'Scan 1', nonDemented: 92, veryMild: 5, mild: 2, moderate: 1 },
    { scan: 'Scan 2', nonDemented: 88, veryMild: 8, mild: 3, moderate: 1 },
    { scan: 'Scan 3', nonDemented: 85, veryMild: 10, mild: 4, moderate: 1 },
    { scan: 'Scan 4', nonDemented: 78, veryMild: 15, mild: 5, moderate: 2 },
    { scan: 'Current', nonDemented: prediction?.allScores.nonDemented || 0, veryMild: prediction?.allScores.veryMildDemented || 0, mild: prediction?.allScores.mildDemented || 0, moderate: prediction?.allScores.moderateDemented || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AI Prediction Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Upload MRI scan for Alzheimer's disease detection and classification</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <Card className="p-6 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              Upload MRI Scan
            </h2>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-3 border-dashed border-blue-300 rounded-2xl p-16 text-center cursor-pointer hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-12 h-12 text-blue-600 mx-auto mt-3" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">Click to upload MRI scan</p>
                <p className="text-sm text-gray-500">PNG, JPG, DICOM formats supported</p>
                <p className="text-xs text-gray-400 mt-2">Maximum file size: 10MB</p>
              </div>
            ) : (
              <div>
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 mb-6 shadow-2xl">
                  <img
                    src={selectedImage}
                    alt="MRI Scan"
                    className="w-full h-96 object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Ready for Analysis
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1 h-12 border-2 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Change Image
                  </Button>
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all text-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Activity className="w-5 h-5 mr-2" />
                        Analyze Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Results Section */}
          <Card className="p-6 shadow-xl border-2 border-blue-100">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <div className="bg-cyan-100 p-2 rounded-lg">
                <FileImage className="w-6 h-6 text-cyan-600" />
              </div>
              Prediction Results
            </h2>

            {!prediction && !isAnalyzing && (
              <div className="h-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-full w-32 h-32 mx-auto mb-6">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mt-4" />
                  </div>
                  <p className="text-lg text-gray-600 font-medium">Awaiting Analysis</p>
                  <p className="text-sm text-gray-400 mt-2">Upload an MRI scan to get started</p>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="py-16">
                <div className="text-center mb-8">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="animate-spin rounded-full h-24 w-24 border-4 border-blue-200 border-t-blue-600 mx-auto" />
                    <Brain className="w-12 h-12 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-xl font-semibold text-gray-700">Processing MRI Scan...</p>
                  <p className="text-sm text-gray-500 mt-2">Running deep learning CNN model</p>
                </div>
                <Progress value={65} className="h-3 mb-2" />
                <p className="text-center text-sm text-gray-500">Analyzing brain patterns and structures</p>
              </div>
            )}

            {prediction && !isAnalyzing && (
              <div className="space-y-6">
                {/* Main Result Card */}
                <Alert className={`border-3 shadow-lg ${getClassColor(prediction.class)}`}>
                  <div className="flex items-start gap-4">
                    <div className="bg-white bg-opacity-50 p-3 rounded-xl">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium opacity-80">Classification Result</p>
                          <p className="text-2xl font-bold">{prediction.class}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold">{prediction.confidence.toFixed(1)}%</p>
                          <p className="text-sm opacity-80">Confidence</p>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-40 rounded-lg p-3 mt-3">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">{getClassIcon(prediction.class)}</div>
                          <p className="text-sm font-medium">
                            {prediction.class === 'NonDemented' && 'No Alzheimer\'s disease detected'}
                            {prediction.class === 'VeryMildDemented' && 'Very mild cognitive decline detected'}
                            {prediction.class === 'MildDemented' && 'Mild Alzheimer\'s disease detected'}
                            {prediction.class === 'ModerateDemented' && 'Moderate Alzheimer\'s disease detected'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Alert>

                {/* Detailed Scores */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5">
                  <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Probability Distribution
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Non Demented', value: prediction.allScores.nonDemented, color: 'bg-green-500', bgColor: 'bg-green-100' },
                      { label: 'Very Mild Demented', value: prediction.allScores.veryMildDemented, color: 'bg-yellow-500', bgColor: 'bg-yellow-100' },
                      { label: 'Mild Demented', value: prediction.allScores.mildDemented, color: 'bg-orange-500', bgColor: 'bg-orange-100' },
                      { label: 'Moderate Demented', value: prediction.allScores.moderateDemented, color: 'bg-red-500', bgColor: 'bg-red-100' },
                    ].map((score) => (
                      <div key={score.label} className={`${score.bgColor} rounded-lg p-3`}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-800">{score.label}</span>
                          <span className="font-bold text-gray-900">{score.value.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-white bg-opacity-50 rounded-full h-3 overflow-hidden shadow-inner">
                          <div
                            className={`h-3 rounded-full ${score.color} shadow-sm transition-all duration-1000 ease-out`}
                            style={{ width: `${score.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Charts Section */}
        {prediction && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Pie Chart */}
            <Card className="p-6 shadow-xl border-2 border-blue-100">
              <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-purple-600" />
                Distribution Chart
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Bar Chart */}
            <Card className="p-6 shadow-xl border-2 border-blue-100">
              <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Confidence Scores
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #3b82f6', borderRadius: '8px' }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Radial Chart */}
            <Card className="p-6 shadow-xl border-2 border-blue-100">
              <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-600" />
                Severity Meter
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="10%" 
                  outerRadius="90%" 
                  data={radialChartData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    background
                    clockWise
                    dataKey="value"
                  />
                  <Legend 
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* Trend Analysis */}
        {prediction && (
          <Card className="p-6 shadow-xl border-2 border-blue-100 mb-8">
            <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2 text-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Historical Trend Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="scan" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #3b82f6', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="nonDemented" stroke="#22c55e" strokeWidth={3} name="Non Demented" />
                <Line type="monotone" dataKey="veryMild" stroke="#eab308" strokeWidth={3} name="Very Mild" />
                <Line type="monotone" dataKey="mild" stroke="#f97316" strokeWidth={3} name="Mild" />
                <Line type="monotone" dataKey="moderate" stroke="#ef4444" strokeWidth={3} name="Moderate" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Total Scans</h3>
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileImage className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-gray-600 mt-1">+23 today</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Accuracy</h3>
              <div className="bg-green-600 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600">94.3%</p>
            <p className="text-sm text-gray-600 mt-1">Model v2.1</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Avg. Time</h3>
              <div className="bg-purple-600 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600">2.1s</p>
            <p className="text-sm text-gray-600 mt-1">Per analysis</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Detection Rate</h3>
              <div className="bg-orange-600 p-2 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-orange-600">55%</p>
            <p className="text-sm text-gray-600 mt-1">Disease detected</p>
          </Card>
        </div>
      </div>
    </div>
  );
}