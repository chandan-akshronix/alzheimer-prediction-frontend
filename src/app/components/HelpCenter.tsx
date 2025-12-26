import { HelpCircle, BookOpen, FileQuestion, Settings, Mail, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function HelpCenter() {
  const faqItems = [
    {
      question: 'What file formats are supported for MRI uploads?',
      answer: 'Our system supports PNG, JPG/JPEG, and DICOM formats. For best results, we recommend using high-resolution images with a minimum size of 512x512 pixels. DICOM files provide the most detailed information and are preferred for clinical use.',
    },
    {
      question: 'How accurate is the AI prediction model?',
      answer: 'Our CNN model v2.1 achieves 94.3% accuracy on test datasets, with a precision of 93.7% and recall of 95.1%. The model has been trained on over 145,000 MRI scans from diverse patient populations. However, this is a screening tool and should not replace professional medical diagnosis.',
    },
    {
      question: 'What do the different classification levels mean?',
      answer: 'The system classifies into 4 categories: (1) No Disease - no signs of Alzheimer\'s detected; (2) Very Mild - early cognitive decline indicators; (3) Mild - clear signs of mild disease progression; (4) Moderate - moderate severity requiring immediate medical attention. Each prediction includes a confidence score.',
    },
    {
      question: 'How long does the analysis take?',
      answer: 'The average processing time is approximately 2.1 seconds per scan. This includes image preprocessing, CNN model inference, and result generation. Processing time may vary slightly depending on image size and system load.',
    },
    {
      question: 'Can I download or print the analysis reports?',
      answer: 'Yes! After analysis, you can generate a comprehensive medical report that includes all diagnostic information, confidence scores, and clinical recommendations. Reports can be downloaded as PDF, printed directly, or shared via email.',
    },
    {
      question: 'Is my patient data secure and private?',
      answer: 'Absolutely. All data is encrypted in transit and at rest. We comply with HIPAA regulations and maintain strict data privacy standards. Patient information is anonymized for model training, and you have full control over data retention and deletion.',
    },
    {
      question: 'What should I do if I get an unexpected result?',
      answer: 'AI predictions should always be validated by qualified medical professionals. If you receive an unexpected result, we recommend: (1) Verify image quality and upload; (2) Re-run the analysis; (3) Consult with a neurologist; (4) Consider additional diagnostic tests. Contact our support team if technical issues persist.',
    },
    {
      question: 'Can I compare multiple scans for the same patient?',
      answer: 'Yes, the Data Registry allows you to view all scans for a specific patient ID. You can track disease progression over time using our Historical Trend Analysis feature in the dashboard. This helps in monitoring treatment effectiveness and disease trajectory.',
    },
    {
      question: 'How often is the AI model updated?',
      answer: 'We continuously improve our models with new training data. Major updates are released quarterly, with minor improvements and bug fixes deployed monthly. The Model Registry page shows version history and performance metrics for all deployed models.',
    },
    {
      question: 'What browsers are supported?',
      answer: 'The application works best on modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. For optimal performance, we recommend using the latest version of Chrome or Firefox with JavaScript enabled.',
    },
  ];

  const quickGuides = [
    {
      title: 'Getting Started',
      description: 'Learn how to upload your first MRI scan and get predictions',
      steps: ['Navigate to Dashboard', 'Click upload area', 'Select MRI file', 'Click Analyze', 'View results'],
    },
    {
      title: 'Understanding Results',
      description: 'Learn to interpret AI predictions and confidence scores',
      steps: ['Check classification', 'Review confidence %', 'Examine distribution', 'Read recommendations', 'Consult physician'],
    },
    {
      title: 'Generating Reports',
      description: 'Create professional medical reports for clinical use',
      steps: ['Complete analysis', 'Click Generate Report', 'Review details', 'Download PDF', 'Share if needed'],
    },
    {
      title: 'Advanced Analytics',
      description: 'Explore trends, statistics, and model performance',
      steps: ['Open Analytics', 'View metrics', 'Analyze trends', 'Compare models', 'Export data'],
    },
  ];

  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@alzheimers-ai.com',
      color: 'blue',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team (Mon-Fri, 9AM-6PM EST)',
      contact: '+1 (555) 123-4567',
      color: 'green',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with support agents in real-time',
      contact: 'Available 24/7',
      color: 'purple',
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API docs',
      contact: 'docs.alzheimers-ai.com',
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Help Center
              </h1>
              <p className="text-gray-600 mt-1">Get answers and support for using the AI Detection System</p>
            </div>
          </div>
        </div>

        {/* Quick Guides */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Quick Start Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickGuides.map((guide, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all border-2 border-blue-100">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                <ol className="space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="text-blue-600 font-medium">{stepIndex + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileQuestion className="w-6 h-6 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <Card className="p-6 shadow-xl border-2 border-blue-100">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-blue-600">
                    <span className="font-semibold">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>

        {/* Support Channels */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Contact Support
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <Card key={index} className={`p-6 hover:shadow-xl transition-all border-2 border-${channel.color}-100 bg-gradient-to-br from-${channel.color}-50 to-white`}>
                  <div className={`bg-${channel.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${channel.color}-600`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{channel.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`font-medium text-${channel.color}-600`}>{channel.contact}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">System Status</h3>
              <Badge className="bg-green-500 text-white">Operational</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">All systems running normally</p>
            <p className="text-xs text-gray-500">Last checked: 2 minutes ago</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Model Version</h3>
              <Badge className="bg-blue-500 text-white">v2.1</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">Latest stable release</p>
            <p className="text-xs text-gray-500">Updated: Dec 15, 2024</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Uptime</h3>
              <Badge className="bg-purple-500 text-white">99.9%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">Last 30 days average</p>
            <p className="text-xs text-gray-500">Next maintenance: Jan 1, 2025</p>
          </Card>
        </div>

        {/* Video Tutorials */}
        <Card className="p-8 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3">Need More Help?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Watch our comprehensive video tutorials or schedule a one-on-one training session with our support team
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <BookOpen className="w-4 h-4 mr-2" />
                Watch Tutorials
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                <Settings className="w-4 h-4 mr-2" />
                Schedule Training
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Resources */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Can't find what you're looking for?</p>
          <p className="mt-2">
            Visit our <a href="#" className="text-blue-600 hover:underline">Knowledge Base</a> or{' '}
            <a href="#" className="text-blue-600 hover:underline">Community Forum</a>
          </p>
        </div>
      </div>
    </div>
  );
}
