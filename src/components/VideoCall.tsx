import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  MessageCircle,
  Settings,
  Users,
  Clock
} from 'lucide-react';

const VideoCall: React.FC = () => {
  const { callId } = useParams();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [specialist] = useState({
    name: 'Dr. Sarah Johnson',
    specialty: 'Sleep Medicine Specialist',
    rating: 4.9,
    status: 'online'
  });

  useEffect(() => {
    // Simulate connection process
    const timer = setTimeout(() => setIsConnected(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Call duration timer
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/consultation');
  };

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Wellness Consultation</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Duration: {formatTime(callDuration)}</span>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Connecting..."}
            </Badge>
          </div>
        </div>

        {/* Video Interface */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Specialist Video */}
                <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isConnected ? (
                      <div className="text-center">
                        <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
                            <span className="text-4xl font-bold">SJ</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold">{specialist.name}</h3>
                        <p className="text-blue-100">{specialist.specialty}</p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <span className="text-yellow-300">★</span>
                          <span>{specialist.rating}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
                        <p className="text-lg">Connecting to specialist...</p>
                      </div>
                    )}
                  </div>

                  {/* User Video (Picture-in-Picture) */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white/50 overflow-hidden">
                    {isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white">
                        <span className="text-xl font-bold">You</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <VideoOff className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Connection Status */}
                  <div className="absolute top-4 left-4">
                    <Badge variant={isConnected ? "default" : "secondary"}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                      {isConnected ? 'Live' : 'Connecting'}
                    </Badge>
                  </div>
                </div>

                {/* Call Controls */}
                <div className="p-6 bg-white border-t">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant={isAudioOn ? "default" : "destructive"}
                      size="lg"
                      onClick={toggleAudio}
                      className="rounded-full w-14 h-14"
                    >
                      {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                    </Button>

                    <Button
                      variant={isVideoOn ? "default" : "destructive"}
                      size="lg"
                      onClick={toggleVideo}
                      className="rounded-full w-14 h-14"
                    >
                      {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                    </Button>

                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={handleEndCall}
                      className="rounded-full w-14 h-14"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full w-14 h-14"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full w-14 h-14"
                    >
                      <Settings className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Specialist Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Consultation Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Specialist</p>
                    <p className="font-medium">{specialist.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Specialty</p>
                    <p className="font-medium">{specialist.specialty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Session Type</p>
                    <p className="font-medium">Video Consultation</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call ID</p>
                    <p className="font-mono text-sm">{callId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Notes */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Session Notes</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Welcome to your wellness consultation!</p>
                    <p className="text-blue-700 mt-1">Your specialist will join shortly.</p>
                  </div>
                  {isConnected && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900">Connected successfully!</p>
                      <p className="text-green-700 mt-1">Feel free to discuss your wellness concerns.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Button */}
            <Card className="border-red-200">
              <CardContent className="p-6">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => navigate('/consultation')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Help
                </Button>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  For immediate medical emergencies, call 911
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🔒 This consultation is encrypted and HIPAA compliant</p>
          <p>💡 LifeGuide AI - Your trusted wellness companion</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;