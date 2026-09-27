import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';

import { LandingPage } from './pages/Landing/LandingPage';
import { RoleSelectionPage } from './pages/RoleSelection/RoleSelectionPage';
import { LoginPage } from './pages/Login/LoginPage';
import { CommandCenterPage } from './pages/CommandCenter/CommandCenterPage';
import { OperatorDashboardPage } from './pages/Operator/OperatorDashboardPage';
import { ResearcherDashboardPage } from './pages/Researcher/ResearcherDashboardPage';
import { DisasterDashboardPage } from './pages/Disaster/DisasterDashboardPage';
import { EnvironmentDashboardPage } from './pages/Environment/EnvironmentDashboardPage';
import { AskORCAPage } from './pages/AskORCA/AskORCAPage';
import { MarineMapPage } from './pages/MarineMap/MarineMapPage';
import { MissionPage } from './pages/Mission/MissionPage';
import { AlertsPage } from './pages/Alerts/AlertsPage';
import { DecisionPage } from './pages/Decision/DecisionPage';
import { HistoryPage } from './pages/History/HistoryPage';
import { ProfilePage } from './pages/Profile/ProfilePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          {/* Public & Role Auth routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/roles" element={<RoleSelectionPage />} />
          <Route path="/login/:role" element={<LoginPage />} />

          {/* Fisher Role Routes */}
          <Route path="/fisher" element={<Navigate to="/fisher/dashboard" replace />} />
          <Route path="/fisher/dashboard" element={<CommandCenterPage />} />
          <Route path="/fisher/map" element={<MarineMapPage />} />
          <Route path="/fisher/ask" element={<AskORCAPage />} />
          <Route path="/fisher/mission" element={<MissionPage />} />
          <Route path="/fisher/alerts" element={<AlertsPage />} />
          <Route path="/fisher/profile" element={<ProfilePage />} />

          {/* Maritime Operator Role Routes */}
          <Route path="/operator" element={<Navigate to="/operator/dashboard" replace />} />
          <Route path="/operator/dashboard" element={<OperatorDashboardPage />} />
          <Route path="/operator/map" element={<MarineMapPage />} />
          <Route path="/operator/ask" element={<AskORCAPage />} />
          <Route path="/operator/missions" element={<MissionPage />} />
          <Route path="/operator/alerts" element={<AlertsPage />} />
          <Route path="/operator/profile" element={<ProfilePage />} />

          {/* Marine Researcher Role Routes */}
          <Route path="/researcher" element={<Navigate to="/researcher/dashboard" replace />} />
          <Route path="/researcher/dashboard" element={<ResearcherDashboardPage />} />
          <Route path="/researcher/map" element={<MarineMapPage />} />
          <Route path="/researcher/ask" element={<AskORCAPage />} />
          <Route path="/researcher/analysis" element={<DecisionPage />} />
          <Route path="/researcher/evidence" element={<HistoryPage />} />
          <Route path="/researcher/profile" element={<ProfilePage />} />

          {/* Disaster Management Role Routes */}
          <Route path="/disaster" element={<Navigate to="/disaster/dashboard" replace />} />
          <Route path="/disaster/dashboard" element={<DisasterDashboardPage />} />
          <Route path="/disaster/map" element={<MarineMapPage />} />
          <Route path="/disaster/ask" element={<AskORCAPage />} />
          <Route path="/disaster/hazards" element={<AlertsPage />} />
          <Route path="/disaster/alerts" element={<AlertsPage />} />
          <Route path="/disaster/profile" element={<ProfilePage />} />

          {/* Environmental Analyst Role Routes */}
          <Route path="/environment" element={<Navigate to="/environment/dashboard" replace />} />
          <Route path="/environment/dashboard" element={<EnvironmentDashboardPage />} />
          <Route path="/environment/map" element={<MarineMapPage />} />
          <Route path="/environment/ask" element={<AskORCAPage />} />
          <Route path="/environment/analysis" element={<DecisionPage />} />
          <Route path="/environment/evidence" element={<HistoryPage />} />
          <Route path="/environment/profile" element={<ProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default App;
