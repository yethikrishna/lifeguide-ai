import { useState, useEffect } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button'; // Button was unused
// import { Zap, Cpu, DollarSign, TrendingUp } from 'lucide-react';
// import { enhancedAPI } from '@/services/enhancedAPI';

interface ModalStatusProps {
  className?: string;
}

export function ModalStatus({ className = '' }: ModalStatusProps) {
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkModalStatus();
  }, []);

  const checkModalStatus = async () => {
    // try {
    //   const apiStatus = await enhancedAPI.checkAPIStatus();
    //   setStatus(apiStatus);
    // } catch (error) {
    //   console.error('Failed to check Modal status:', error);
    // } finally {
    //   setIsLoading(false);
    // }
    setIsLoading(false); // Simulate loading finished
    setStatus({ modal_status: 'mock_standby', modal_credits_remaining: 0 }); // Provide mock status
  };

  if (isLoading) {
    return (
      // <Card className={`border-purple-200 bg-purple-50 ${className}`}>
      //   <CardContent className="p-4">
      //     <div className="flex items-center gap-2">
      //       <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
      //       <span className="text-purple-800 text-sm">Checking AI status...</span>
      //     </div>
      //   </CardContent>
      // </Card>
      <div className={`border-purple-200 bg-purple-50 p-4 ${className}`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-purple-800 text-sm">Checking AI status... (UI elements commented)</span>
        </div>
      </div>
    );
  }

  const isModalActive = status?.modal_status === 'active';
  const creditsRemaining = status?.modal_credits_remaining || 280;

  return (
    // <Card className={`border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 ${className}`}>
    //   <CardContent className="p-4">
    //     <div className="flex items-center justify-between">
    //       <div className="flex items-center gap-3">
    //         <div className="flex items-center gap-2">
    //           <Zap className="w-5 h-5 text-purple-600" />
    //           <span className="font-semibold text-purple-900">Modal.com AI</span>
    //         </div>
            
    //         <Badge
    //           variant={isModalActive ? "default" : "secondary"}
    //           className={isModalActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
    //         >
    //           {isModalActive ? "✓ Active" : "Standby"}
    //         </Badge>
    //       </div>

    //       <div className="flex items-center gap-4 text-sm">
    //         {isModalActive && (
    //           <>
    //             <div className="flex items-center gap-1 text-green-600">
    //               <DollarSign className="w-4 h-4" />
    //               <span className="font-medium">${creditsRemaining}</span>
    //               <span className="text-gray-500">credits</span>
    //             </div>
    //             <div className="flex items-center gap-1 text-blue-600">
    //               <Cpu className="w-4 h-4" />
    //               <span className="font-medium">GPU</span>
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     </div>

    //     {isModalActive && (
    //       <div className="mt-3 flex items-center gap-2 text-xs text-purple-700">
    //         <TrendingUp className="w-3 h-3" />
    //         <span>Enhanced AI analysis with GPU acceleration active</span>
    //       </div>
    //     )}

    //     {!isModalActive && (
    //       <div className="mt-3 text-xs text-gray-600">
    //         <span>Using MiniMax API • Modal.com integration ready</span>
    //       </div>
    //     )}
    //   </CardContent>
    // </Card>
    <div className={`border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4 ${className}`}>
      ModalStatus Component (UI elements commented out)
      <div>Status: {isModalActive ? "Active" : "Standby"}</div>
      <div>Credits: ${creditsRemaining}</div>
    </div>
  );
}

// Hook for checking Modal.com enhanced features
export function useModalEnhanced() {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkEnhancement = async () => {
      // try {
      //   const status = await enhancedAPI.checkAPIStatus();
      //   setIsEnhanced(status.modal_status === 'active');
      // } catch (error) {
      //   setIsEnhanced(false);
      // } finally {
      //   setIsLoading(false);
      // }
      setIsLoading(false); // Simulate loading finished
      setIsEnhanced(false); // Provide mock status
    };

    checkEnhancement();
  }, []);

  return { isEnhanced, isLoading };
}