import React, { useState, useEffect } from 'react';
import { AppProvider } from './services/store';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppLayout } from './components/layout/AppLayout';
import { OwnerLayout } from './components/layout/OwnerLayout';

// Public Views
import { LandingPage } from './features/public/LandingPage';
import { PricingPage } from './features/public/PricingPage';
import { ChannelsPage } from './features/public/ChannelsPage';
import { FeaturesPage, AboutPage, LegalPage } from './features/public/FeaturesPage';

// Auth Views
import { AuthPages } from './features/auth/AuthPages';
import { OnboardingPage } from './features/auth/OnboardingPage';

// Customer Application Views
import { DashboardView } from './features/dashboard/DashboardView';
import { PlannerView } from './features/planner/PlannerView';
import { ComposerView } from './features/publishing/ComposerView';
import { QueueView } from './features/publishing/QueueView';
import { AiStudioView } from './features/ai/AiStudioView';
import { LibraryView } from './features/library/LibraryView';
import { InboxView } from './features/inbox/InboxView';
import { AnalyticsView } from './features/analytics/AnalyticsView';
import { ReportsView } from './features/reports/ReportsView';
import { ChannelsView } from './features/channels/ChannelsView';
import { TeamView, WorkspacesView } from './features/team/TeamView';
import { ApprovalsView } from './features/approvals/ApprovalsView';
import { BillingView } from './features/billing/BillingView';
import { SettingsView } from './features/settings/SettingsView';

// Owner Views
import { OwnerDashboardView } from './features/owner/OwnerDashboardView';
import { OwnerPlansView } from './features/owner/OwnerPlansView';
import {
  OwnerCustomersView,
  OwnerCouponsView,
  OwnerPaymentsView,
  OwnerIntegrationsView,
  OwnerAuditView,
  OwnerSettingsView,
} from './features/owner/OwnerSecondaryViews';

export default function App() {
  // Support ?autostart=1 or initial path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') {
        return '/app/dashboard';
      }
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    // 1. Owner Portal Group
    if (currentPath.startsWith('/owner')) {
      let ownerComponent = <OwnerDashboardView navigate={navigate} />;
      if (currentPath === '/owner/customers') ownerComponent = <OwnerCustomersView navigate={navigate} />;
      else if (currentPath === '/owner/plans') ownerComponent = <OwnerPlansView navigate={navigate} />;
      else if (currentPath === '/owner/coupons') ownerComponent = <OwnerCouponsView navigate={navigate} />;
      else if (currentPath === '/owner/payments') ownerComponent = <OwnerPaymentsView navigate={navigate} />;
      else if (currentPath === '/owner/integrations') ownerComponent = <OwnerIntegrationsView navigate={navigate} />;
      else if (currentPath === '/owner/audit-log') ownerComponent = <OwnerAuditView navigate={navigate} />;
      else if (currentPath === '/owner/settings') ownerComponent = <OwnerSettingsView navigate={navigate} />;

      return (
        <OwnerLayout currentPath={currentPath} navigate={navigate}>
          {ownerComponent}
        </OwnerLayout>
      );
    }

    // 2. Customer Application Group
    if (currentPath.startsWith('/app')) {
      let appComponent = <DashboardView navigate={navigate} />;
      if (currentPath === '/app/planner') appComponent = <PlannerView navigate={navigate} />;
      else if (currentPath === '/app/compose') appComponent = <ComposerView navigate={navigate} />;
      else if (currentPath === '/app/queue') appComponent = <QueueView navigate={navigate} />;
      else if (currentPath === '/app/ai-studio') appComponent = <AiStudioView navigate={navigate} />;
      else if (currentPath === '/app/library') appComponent = <LibraryView navigate={navigate} />;
      else if (currentPath === '/app/inbox') appComponent = <InboxView navigate={navigate} />;
      else if (currentPath === '/app/analytics') appComponent = <AnalyticsView navigate={navigate} />;
      else if (currentPath === '/app/reports') appComponent = <ReportsView navigate={navigate} />;
      else if (currentPath === '/app/channels') appComponent = <ChannelsView navigate={navigate} />;
      else if (currentPath === '/app/team') appComponent = <TeamView navigate={navigate} />;
      else if (currentPath === '/app/workspaces') appComponent = <WorkspacesView navigate={navigate} />;
      else if (currentPath === '/app/approvals') appComponent = <ApprovalsView navigate={navigate} />;
      else if (currentPath.startsWith('/app/billing')) appComponent = <BillingView navigate={navigate} />;
      else if (currentPath === '/app/settings') appComponent = <SettingsView navigate={navigate} />;

      return (
        <AppLayout currentPath={currentPath} navigate={navigate}>
          {appComponent}
        </AppLayout>
      );
    }

    // 3. Auth & Onboarding
    if (currentPath === '/login') {
      return (
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar currentPath={currentPath} navigate={navigate} />
          <AuthPages mode="login" navigate={navigate} />
          <Footer navigate={navigate} />
        </div>
      );
    }
    if (currentPath === '/signup') {
      return (
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar currentPath={currentPath} navigate={navigate} />
          <AuthPages mode="signup" navigate={navigate} />
          <Footer navigate={navigate} />
        </div>
      );
    }
    if (currentPath === '/forgot-password') {
      return (
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar currentPath={currentPath} navigate={navigate} />
          <AuthPages mode="forgot" navigate={navigate} />
          <Footer navigate={navigate} />
        </div>
      );
    }
    if (currentPath === '/onboarding') {
      return (
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar currentPath={currentPath} navigate={navigate} />
          <OnboardingPage navigate={navigate} />
          <Footer navigate={navigate} />
        </div>
      );
    }

    // 4. Public Marketing Website
    let publicContent = <LandingPage navigate={navigate} />;
    if (currentPath === '/pricing') publicContent = <PricingPage navigate={navigate} />;
    else if (currentPath === '/channels') publicContent = <ChannelsPage navigate={navigate} />;
    else if (currentPath === '/features') publicContent = <FeaturesPage navigate={navigate} />;
    else if (currentPath === '/about') publicContent = <AboutPage navigate={navigate} />;
    else if (currentPath === '/faq') publicContent = <LegalPage type="faq" />;
    else if (currentPath === '/privacy') publicContent = <LegalPage type="privacy" />;
    else if (currentPath === '/terms') publicContent = <LegalPage type="terms" />;

    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar currentPath={currentPath} navigate={navigate} />
        <main className="flex-1">{publicContent}</main>
        <Footer navigate={navigate} />
      </div>
    );
  };

  return <AppProvider>{renderContent()}</AppProvider>;
}
