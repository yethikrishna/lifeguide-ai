import { useState, useEffect } from 'react'; // React removed
import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// Phone and Users removed from this import
import { Video, MessageCircle, Clock, Star } from 'lucide-react';
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

  const startVideoConsultation = async (_specialistId: string, specialistType: string) => {
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
      {/* <Card> */}
      <div className="border rounded-lg">
        {/* <CardHeader> */}
        <div className="p-4 border-b">
          {/* <CardTitle className="flex items-center gap-2"> */}
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Video className="w-6 h-6 text-blue-600" />
            Live Wellness Consultations (UI Commented)
          </h2>
          {/* </CardTitle> */}
          <p className="text-gray-600">
            Connect with certified wellness specialists via video, voice, or chat
          </p>
        </div>
        {/* </CardHeader> */}
        {/* <CardContent> */}
        <div className="p-4">
          {/* Emergency Button */}
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-red-900">Emergency Consultation</h3>
                <p className="text-red-700 text-sm">Need immediate wellness support?</p>
              </div>
              {/* <Button
                onClick={sendEmergencyMessage}
                className="bg-red-600 hover:bg-red-700"
              > */}
              <button
                onClick={sendEmergencyMessage}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                🚨 Emergency Help
              {/* </Button> */}
              </button>
            </div>
          </div>

          {/* Available Specialists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialists.map((specialist) => (
              // <Card key={specialist.id} className="hover:shadow-lg transition-shadow">
              <div key={specialist.id} className="border rounded-lg hover:shadow-lg transition-shadow">
                {/* <CardContent className="p-4"> */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{specialist.name}</h3>
                    {/* <Badge
                      variant={specialist.status === 'online' ? 'default' : 'secondary'}
                      className={specialist.status === 'online' ? 'bg-green-100 text-green-800' : ''}
                    > */}
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${specialist.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {specialist.status}
                    </span>
                    {/* </Badge> */}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{specialist.specialty}</p>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{specialist.rating}</span>
                  </div>

                  <div className="flex gap-2">
                    {/* <Button
                      size="sm"
                      onClick={() => startVideoConsultation(specialist.id, specialist.specialty)}
                      disabled={specialist.status !== 'online' || isLoading}
                      className="flex-1"
                    > */}
                    <button
                      onClick={() => startVideoConsultation(specialist.id, specialist.specialty)}
                      disabled={specialist.status !== 'online' || isLoading}
                      className="flex-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 flex items-center justify-center"
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Video
                    {/* </Button> */}
                    </button>
                    
                    {/* <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startVideoConsultation(specialist.id, specialist.specialty)}
                      disabled={specialist.status !== 'online'}
                      className="flex-1"
                    > */}
                    <button
                      onClick={() => startVideoConsultation(specialist.id, specialist.specialty)}
                      disabled={specialist.status !== 'online'}
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:bg-gray-100 flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    {/* </Button> */}
                    </button>
                  </div>
                </div>
                {/* </CardContent> */}
              </div>
              // </Card>
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
        </div>
        {/* </CardContent> */}
      </div>
      {/* </Card> */}
    </div>
  );
}