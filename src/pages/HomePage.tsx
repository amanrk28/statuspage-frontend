import { useEffect, useState } from 'react';
import { CheckCircle, Users, BarChart3, Shield, Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { OrganizationModal } from '@/components/home/organization-modal';

export const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50/50">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </Card>
);

const features = [
  {
    icon: CheckCircle,
    title: "Real-time Monitoring",
    description: "Monitor your services 24/7 with instant notifications when issues arise"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Keep your entire team informed with role-based access and notifications"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track uptime, response times, and identify patterns in your infrastructure"
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security with SSL encryption and SOC 2 compliance"
  }
];


export const HomePage = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/services');
    }
  }, [isAuthenticated]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openModal = (mode: 'login' | 'signup' | 'create-org') => {
    if (mode === 'login') {
      loginWithPopup();
      return;
    }
    setIsModalOpen(true);
    setMobileMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StatusPage
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => openModal('login')}>
                Sign In
              </Button>
              <Button onClick={() => openModal('signup')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => openModal('login')}>
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => openModal('signup')}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Keep Your Users{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Informed
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create beautiful status pages that keep your customers updated during outages and maintenance windows
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => openModal('create-org')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Organization
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => openModal('login')}
                className="text-lg px-8 py-3 border-2 hover:border-blue-300 transition-all duration-300"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay transparent
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for teams who care about their users and want to maintain trust through transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who trust StatusPage to keep their users informed
          </p>
          <Button
            size="lg"
            onClick={() => openModal('create-org')}
            className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create Your Status Page
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">StatusPage</span>
          </div>
          <p className="text-gray-400">
            © 2025 StatusPage
          </p>
        </div>
      </footer>

      <OrganizationModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
