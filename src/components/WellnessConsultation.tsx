import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, MessageCircle, Phone, Users, Clock, Star } from 'lucide-react';
import { cometChatService } from '@/services/cometchat';

export function WellnessConsultation() {
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState<any[]>([]);
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSpecialists();
    initializeChatSystem();
  }, []);

  const loadSpecialists = async () => {
    try {
      const availableSpecialists = await cometChatService.getAvailableSpecialists();
      setSpecialists(availableSpecialists);
    } catch (error) {
      console.error('Failed to load specialists:', error);
    }
  };

  const initializeChatSystem = async () => {
    await cometChatService.initializeChatSystem();
  };

  const startVideoConsultation = async (specialistId: string, specialistType: string) => {
    setIsLoading(true);
    try {
      const consultation = await cometChatService.createWellnessConsultation(
        'user-' + Date.now(), 
        specialistType
      );
      
      const videoCall = await cometChatService.startVideoConsultation(consultation.roomId);
      
      if (videoCall.success) {
        setActiveCall(videoCall.callId);
        // Navigate to our internal video call interface
        navigate(videoCall.consultationUrl);
      }
    } catch (error) {
      console.error('Failed to start consultation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmergencyMessage = async () => {
    await cometChatService.sendWellnessMessage(
      'Emergency consultation needed - immediate wellness support required',
      'emergency'
    );
    alert('Emergency message sent! A wellness specialist will contact you immediately.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-6 h-6 text-blue-600" />
            Live Wellness Consultations
          </CardTitle>
          <p className="text-gray-600">
            Connect with certified wellness specialists via video, voice, or chat
          </p>
        </CardHeader>
        <CardContent>
          {/* Emergency Button */}
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-red-900">Emergency Consultation</h3>
                <p className="text-red-700 text-sm">Need immediate wellness support?</p>
              </div>
              <Button 
                onClick={sendEmergencyMessage}
                className="bg-red-600 hover:bg-red-700"
              >
                🚨 Emergency Help
              </Button>
            </div>
          </div>

          {/* Available Specialists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialists.map((specialist) => (
              <Card key={specialist.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{specialist.name}</h3>
                    <Badge 
                      variant={specialist.status === 'online' ? 'default' : 'secondary'}
                      className={specialist.status === 'online' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {specialist.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{specialist.specialty}</p>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{specialist.rating}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => startVideoConsultation(specialist.id, specialist.specialty)}
                      disabled={specialist.status !== 'online' || isLoading}
                      className="flex-1"
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Video
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startVideoConsultation(specialist.id, specialist.specialty)}
                      disabled={specialist.status !== 'online'}
                      className="flex-1"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Active Call Indicator */}
          {activeCall && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <div>
                  <h3 className="font-semibold text-blue-900">Active Consultation</h3>
                  <p className="text-blue-700 text-sm">Call ID: {activeCall}</p>
                </div>
              </div>
            </div>
          )}

          {/* Consultation Features */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium">HD Video Calls</h4>
              <p className="text-sm text-gray-600">Crystal clear video consultations</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium">Secure Messaging</h4>
              <p className="text-sm text-gray-600">HIPAA-compliant chat system</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium">24/7 Availability</h4>
              <p className="text-sm text-gray-600">Round-the-clock wellness support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}