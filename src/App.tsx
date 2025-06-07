import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Moon, 
  Brain, 
  AlertTriangle, 
  Apple, 
  Home, 
  MessageCircle,
  BarChart3,
  Settings,
  Github,
  ExternalLink
} from 'lucide-react';
import { WellnessDashboard } from '@/components/WellnessDashboard';
import { WellnessChat } from '@/components/WellnessChat';
import { SleepAssessment } from '@/components/SleepAssessment';
import { ModalStatus } from '@/components/ModalStatus';
import { WellnessConsultation } from '@/components/WellnessConsultation';
import VideoCall from '@/components/VideoCall';
import './App.css';

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { path: '/sleep', icon: Moon, label: 'Sleep Coach' },
    { path: '/consultation', icon: BarChart3, label: 'Live Consultation' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-xl font-bold text-gray-900">LifeGuide AI</h1>
              <Badge variant="secondary" className="text-xs">
                MiniMax Powered
              </Badge>
            </div>
            
            <div className="flex items-center space-x-1 ml-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ModalStatus className="hidden lg:block" />
            <a
              href="https://github.com/yethikrishna/lifeguide-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-500" />
            <h1 className="text-lg font-bold text-gray-900">LifeGuide AI</h1>
          </div>
          <Badge variant="secondary" className="text-xs">
            MiniMax
          </Badge>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <div className={`flex flex-col items-center py-2 px-1 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Your AI-Powered
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block sm:inline">
                {" "}Wellness Companion
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Revolutionary AI wellness companion powered by MiniMax and Modal.com GPU infrastructure.
              Enhanced with $280 AI credits for superior analysis, crisis detection, and personalized coaching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Wellness Journey
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Chat with AI Experts
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16 px-4">
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">5</div>
                  <div className="text-sm md:text-base text-gray-600">AI Agents</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1 md:mb-2">$280</div>
                  <div className="text-sm md:text-base text-gray-600">AI Credits</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">24/7</div>
                  <div className="text-sm md:text-base text-gray-600">Support</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1 md:mb-2">100%</div>
                  <div className="text-sm md:text-base text-gray-600">Clinical AI</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Your AI Wellness Experts
            </h2>
            <p className="text-xl text-gray-600">
              Five specialized AI agents working together for your health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Moon className="w-8 h-8 text-purple-500 mr-3" />
                  <h3 className="text-xl font-semibold">AI Sleep Coach</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Personalized sleep optimization with AI-generated meditation audio and circadian rhythm guidance.
                </p>
                <Badge variant="secondary">$15B+ Market Gap</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-red-500 mr-3" />
                  <h3 className="text-xl font-semibold">Health Assistant</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Clinical-grade health assessments, symptom analysis, and preventive care recommendations.
                </p>
                <Badge variant="secondary">Clinical Grade</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold">Mental Wellness</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Stress management, anxiety support, and crisis detection with professional intervention protocols.
                </p>
                <Badge variant="secondary">Crisis Detection</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold">Emergency Helper</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  First aid guidance, emergency protocols, and life-saving decision support.
                </p>
                <Badge variant="secondary">Life Saving</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Apple className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold">Nutrition Coach</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Personalized nutrition guidance, meal planning, and dietary optimization.
                </p>
                <Badge variant="secondary">Personalized</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-8 h-8 text-indigo-500 mr-3" />
                  <h3 className="text-xl font-semibold">MCP Innovation</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  First-ever wellness app using Model Context Protocol for healthcare data connectivity.
                </p>
                <Badge className="bg-blue-100 text-blue-800">World First</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the revolution in AI-powered personalized healthcare
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChatPage() {
  const [selectedAgent, setSelectedAgent] = useState('sleep');
  
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            AI Wellness Chat
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Chat with specialized AI health experts powered by MiniMax
          </p>
        </div>
        <WellnessChat 
          selectedAgent={selectedAgent}
          onAgentChange={setSelectedAgent}
        />
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <WellnessDashboard />
    </div>
  );
}

function SleepPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            AI Sleep Coach
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Personalized sleep optimization and coaching
          </p>
        </div>
        <SleepAssessment />
      </div>
    </div>
  );
}

function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Live Wellness Consultations
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Connect with certified wellness specialists via video, voice, or chat
          </p>
        </div>
        <WellnessConsultation />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/sleep" element={<SleepPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/video-call/:callId" element={<VideoCall />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg font-semibold">LifeGuide AI</span>
              </div>
              <p className="text-gray-600 mb-4">
                Revolutionary AI wellness companion for the MiniMax Hackathon 2025
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>🏆 Built for MiniMax Hackathon</span>
                <span>•</span>
                <span>🤖 Powered by MiniMax AI</span>
                <span>•</span>
                <span>❤️ Made with care for global health</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
