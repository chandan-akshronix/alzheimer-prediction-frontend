import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { ModelRegistry } from './components/ModelRegistry';
import { DataRegistry } from './components/DataRegistry';
import { AdvancedAnalytics } from './components/AdvancedAnalytics';
import { HelpCenter } from './components/HelpCenter';
import { UserManagement } from './components/UserManagement';
import { Toaster } from './components/Toaster';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AdvancedAnalytics />} />
          <Route path="/model-registry" element={<ModelRegistry />} />
          <Route path="/data-registry" element={<DataRegistry />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/help" element={<HelpCenter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}