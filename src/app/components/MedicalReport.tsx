import { Download, Printer, Share2, FileText, Calendar, User, Activity, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

interface ReportData {
  patientId: string;
  scanId: string;
  scanDate: string;
  prediction: string;
  confidence: number;
  modelVersion: string;
  processingTime: string;
  scores: {
    noDisease: number;
    veryMild: number;
    mild: number;
    moderate: number;
  };
}

interface MedicalReportProps {
  data: ReportData;
  onClose: () => void;
}

export function MedicalReport({ data, onClose }: MedicalReportProps) {
  const handleDownloadPDF = () => {
    toast.success('Report downloaded successfully', {
      description: 'The medical report has been saved to your downloads folder',
    });
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard', {
      description: 'You can now share this report with colleagues',
    });
  };

  const getSeverityLevel = (prediction: string) => {
    if (prediction === 'No Disease') return { level: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (prediction === 'Very Mild') return { level: 'Medium Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (prediction === 'Mild') return { level: 'High Risk', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { level: 'Critical Risk', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const severity = getSeverityLevel(data.prediction);

  const recommendations = {
    'No Disease': [
      'Continue regular health monitoring',
      'Maintain healthy lifestyle and cognitive activities',
      'Schedule follow-up scan in 12 months',
    ],
    'Very Mild': [
      'Consult with neurologist for detailed assessment',
      'Consider cognitive training programs',
      'Schedule follow-up scan in 6 months',
      'Monitor for any cognitive changes',
    ],
    'Mild': [
      'Immediate consultation with neurologist recommended',
      'Comprehensive neuropsychological testing advised',
      'Consider treatment options with healthcare provider',
      'Schedule follow-up scan in 3 months',
    ],
    'Moderate': [
      'Urgent neurologist consultation required',
      'Comprehensive treatment plan needed',
      'Family counseling and support services recommended',
      'Schedule follow-up scan in 1-2 months',
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Medical Analysis Report</h2>
                <p className="text-blue-100 mt-1">Alzheimer's Disease Detection - AI Analysis</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white hover:bg-opacity-20"
              onClick={onClose}
            >
              ✕
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0"
              onClick={handleDownloadPDF}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              variant="secondary" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0"
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button 
              variant="secondary" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="p-8">
          {/* Patient Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Patient Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient ID:</span>
                  <span className="font-medium text-gray-900">{data.patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scan ID:</span>
                  <span className="font-medium text-gray-900">{data.scanId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scan Date:</span>
                  <span className="font-medium text-gray-900">{data.scanDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Report Generated:</span>
                  <span className="font-medium text-gray-900">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Analysis Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Model Version:</span>
                  <span className="font-medium text-gray-900">{data.modelVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-medium text-gray-900">{data.processingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Analysis Type:</span>
                  <span className="font-medium text-gray-900">CNN Deep Learning</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence Level:</span>
                  <span className="font-medium text-gray-900">{data.confidence.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Diagnosis Results */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              Diagnosis Results
            </h3>
            
            <div className={`${severity.bgColor} border-2 border-${severity.color.replace('text-', '')} rounded-xl p-6 mb-6`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Primary Classification</p>
                  <p className="text-3xl font-bold text-gray-900">{data.prediction}</p>
                </div>
                <div className="text-right">
                  <Badge className={severity.bgColor + ' ' + severity.color + ' text-lg px-4 py-2'}>
                    {severity.level}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                    style={{ width: `${data.confidence}%` }}
                  />
                </div>
                <span className={`font-bold ${severity.color}`}>{data.confidence.toFixed(1)}%</span>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'No Disease', value: data.scores.noDisease, color: 'green' },
                { label: 'Very Mild', value: data.scores.veryMild, color: 'yellow' },
                { label: 'Mild', value: data.scores.mild, color: 'orange' },
                { label: 'Moderate', value: data.scores.moderate, color: 'red' },
              ].map((score) => (
                <div key={score.label} className={`bg-${score.color}-50 border border-${score.color}-200 rounded-lg p-4`}>
                  <p className="text-xs text-gray-600 mb-1">{score.label}</p>
                  <p className={`text-2xl font-bold text-${score.color}-600`}>{score.value.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Clinical Recommendations */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Recommendations</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <ul className="space-y-3">
                {recommendations[data.prediction as keyof typeof recommendations].map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Medical Disclaimer
            </h4>
            <p className="text-sm text-amber-800">
              This AI-generated analysis is intended as a screening tool and should not be considered a definitive 
              diagnosis. All results must be reviewed and confirmed by qualified medical professionals. This report 
              should be used in conjunction with comprehensive clinical evaluation, patient history, and additional 
              diagnostic tests. Please consult with a neurologist or qualified healthcare provider for proper 
              interpretation and treatment recommendations.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>Generated by Alzheimer's AI Detection System v2.1</p>
            <p className="mt-1">For medical professional use only • Confidential Patient Information</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
