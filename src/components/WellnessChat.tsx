import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Moon, Heart, Brain, AlertTriangle, Apple } from 'lucide-react';
import { enhancedAPI } from '@/services/enhancedAPI';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  agent?: string;
}

interface WellnessChatProps {
  selectedAgent: string;
  onAgentChange: (agent: string) => void;
}

const agents = [
  { id: 'sleep', name: 'Sleep Coach', icon: Moon, color: 'bg-purple-100 text-purple-800' },
  { id: 'health', name: 'Health Assistant', icon: Heart, color: 'bg-red-100 text-red-800' },
  { id: 'mental', name: 'Mental Wellness', icon: Brain, color: 'bg-blue-100 text-blue-800' },
  { id: 'emergency', name: 'Emergency Helper', icon: AlertTriangle, color: 'bg-orange-100 text-orange-800' },
  { id: 'nutrition', name: 'Nutrition Coach', icon: Apple, color: 'bg-green-100 text-green-800' },
];

export function WellnessChat({ selectedAgent, onAgentChange }: WellnessChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message when agent changes
    const agent = agents.find(a => a.id === selectedAgent);
    if (agent) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: getWelcomeMessage(selectedAgent),
        role: 'assistant',
        timestamp: new Date(),
        agent: selectedAgent
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedAgent]);

  const getWelcomeMessage = (agentId: string): string => {
    const welcomeMessages = {
      sleep: "🌙 Hello! I'm your AI Sleep Coach. I can help you optimize your sleep quality, create better bedtime routines, and address sleep challenges. What would you like to know about improving your sleep?",
      health: "❤️ Hi there! I'm your Health Assistant. I can provide general wellness guidance, help you understand symptoms, and suggest when to consult healthcare professionals. How can I support your health today?",
      mental: "🧠 Welcome! I'm your Mental Wellness companion. I'm here to support your emotional well-being with stress management techniques, mindfulness practices, and coping strategies. What's on your mind?",
      emergency: "🚨 I'm your Emergency Assistant. I can provide first aid guidance and help assess urgent situations. Remember: For life-threatening emergencies, always call 911 first! How can I help you stay safe?",
      nutrition: "🍎 Hello! I'm your Nutrition Coach. I can help you make healthier food choices, plan balanced meals, and understand nutrition for your wellness goals. What nutritional guidance can I provide?"
    };
    return welcomeMessages[agentId as keyof typeof welcomeMessages] || "Hello! How can I help you today?";
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response: string;
      
      // Route to enhanced AI functions with Modal.com integration
      const chatResult = await enhancedAPI.chatWithAI(input, selectedAgent);
      response = chatResult.response;
      
      // Add enhanced features indicator
      if (chatResult.source === 'modal') {
        response += "\n\n✨ Enhanced with Modal.com AI ($280 credits)";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
        agent: selectedAgent
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment, or contact a healthcare professional if this is urgent.",
        role: 'assistant',
        timestamp: new Date(),
        agent: selectedAgent
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectedAgentInfo = agents.find(a => a.id === selectedAgent);

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Agent Selector */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Choose Your Wellness Expert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <Badge
                  key={agent.id}
                  variant={selectedAgent === agent.id ? "default" : "outline"}
                  className={`cursor-pointer p-2 ${selectedAgent === agent.id ? agent.color : 'hover:bg-gray-100'}`}
                  onClick={() => onAgentChange(agent.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {agent.name}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            {selectedAgentInfo && (
              <>
                <selectedAgentInfo.icon className="w-5 h-5" />
                <CardTitle>{selectedAgentInfo.name}</CardTitle>
              </>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask your ${selectedAgentInfo?.name || 'wellness expert'}...`}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              💡 This is for educational purposes only. Always consult healthcare professionals for medical advice.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}