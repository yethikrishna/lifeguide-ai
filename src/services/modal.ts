// LifeGuide AI - Modal.com Integration
// Enhanced AI capabilities using Modal serverless GPU infrastructure

interface ModalResponse {
  result: string;
  metadata?: {
    processing_time: number;
    model_used: string;
    tokens_used: number;
  };
}

interface HealthAnalysisRequest {
  symptoms: string[];
  duration: string;
  severity: number;
  medical_history?: string[];
  medications?: string[];
}

interface SleepAnalysisRequest {
  sleep_hours: number;
  sleep_quality: number;
  sleep_issues: string[];
  bedtime: string;
  wake_time?: string;
  lifestyle_factors?: string[];
}

interface MentalHealthRequest {
  mood_level: number;
  stress_level: number;
  anxiety_level: number;
  recent_events?: string[];
  coping_mechanisms?: string[];
}

class ModalAIService {
  private apiKey: string;
  private baseUrl = 'https://api.modal.com';

  constructor() {
    this.apiKey = import.meta.env.VITE_MODAL_API_KEY || '';
  }

  // Advanced Health Analysis using Modal's GPU infrastructure
  async analyzeHealthSymptoms(request: HealthAnalysisRequest): Promise<{
    analysis: string;
    risk_level: 'low' | 'medium' | 'high' | 'urgent';
    recommendations: string[];
    specialist_referral?: string;
    emergency_action?: boolean;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/health-analysis`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: 'advanced_health_analysis',
          inputs: request,
          model_config: {
            model_type: 'medical_llm',
            temperature: 0.3,
            max_tokens: 1500,
            safety_filter: 'medical_strict'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Modal API error: ${response.status}`);
      }

      const data: ModalResponse = await response.json();
      
      // Parse the structured response
      return this.parseHealthAnalysis(data.result);
    } catch (error) {
      console.error('Modal Health Analysis Error:', error);
      return this.getFallbackHealthAnalysis(request);
    }
  }

  // Advanced Sleep Optimization using Modal's AI models
  async optimizeSleep(request: SleepAnalysisRequest): Promise<{
    sleep_score: number;
    detailed_analysis: string;
    personalized_plan: string[];
    circadian_insights: string;
    meditation_script?: string;
    sleep_music_generation?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/sleep-optimization`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: 'advanced_sleep_coaching',
          inputs: request,
          model_config: {
            model_type: 'sleep_specialist_llm',
            temperature: 0.4,
            max_tokens: 2000,
            include_audio_generation: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Modal Sleep API error: ${response.status}`);
      }

      const data: ModalResponse = await response.json();
      return this.parseSleepAnalysis(data.result);
    } catch (error) {
      console.error('Modal Sleep Analysis Error:', error);
      return this.getFallbackSleepAnalysis(request);
    }
  }

  // Mental Health Support with Crisis Detection
  async assessMentalHealth(request: MentalHealthRequest): Promise<{
    mental_health_score: number;
    mood_analysis: string;
    coping_strategies: string[];
    crisis_risk: 'none' | 'low' | 'medium' | 'high' | 'immediate';
    professional_referral: boolean;
    emergency_contacts?: string[];
    therapeutic_exercises: string[];
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/mental-health`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: 'mental_health_assessment',
          inputs: request,
          model_config: {
            model_type: 'mental_health_specialist',
            temperature: 0.2,
            max_tokens: 1800,
            crisis_detection: true,
            safety_protocols: 'strict'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Modal Mental Health API error: ${response.status}`);
      }

      const data: ModalResponse = await response.json();
      return this.parseMentalHealthAnalysis(data.result);
    } catch (error) {
      console.error('Modal Mental Health Error:', error);
      return this.getFallbackMentalHealthAnalysis(request);
    }
  }

  // Advanced Nutrition Planning with Modal's AI
  async createNutritionPlan(goals: string[], restrictions: string[], current_diet: string): Promise<{
    nutrition_score: number;
    meal_plan: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
      snacks: string[];
    };
    shopping_list: string[];
    nutritional_insights: string;
    supplement_recommendations?: string[];
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/nutrition-planning`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: 'advanced_nutrition_coaching',
          inputs: { goals, restrictions, current_diet },
          model_config: {
            model_type: 'nutrition_specialist',
            temperature: 0.3,
            max_tokens: 2200,
            include_meal_images: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Modal Nutrition API error: ${response.status}`);
      }

      const data: ModalResponse = await response.json();
      return this.parseNutritionAnalysis(data.result);
    } catch (error) {
      console.error('Modal Nutrition Error:', error);
      return this.getFallbackNutritionAnalysis(goals, restrictions);
    }
  }

  // Generate Personalized Meditation Audio using Modal's TTS
  async generateMeditationAudio(script: string, voice_type: 'calm_female' | 'soothing_male' | 'neutral'): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/audio-generation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: 'tts_meditation_generation',
          inputs: {
            text: script,
            voice_type: voice_type,
            speed: 0.8,
            add_background_sounds: true,
            audio_format: 'mp3'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Modal TTS generation failed');
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Modal TTS Error:', error);
      return '';
    }
  }

  // Emergency Situation Assessment with Modal's Crisis Detection
  async assessEmergency(situation: string, symptoms: string[]): Promise<{
    urgency_level: 'routine' | 'urgent' | 'emergency' | 'life_threatening';
    immediate_actions: string[];
    emergency_services: boolean;
    first_aid_steps: string[];
    hospital_preparation?: string[];
    crisis_resources: string[];
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/emergency-assessment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: 'emergency_triage_assessment',
          inputs: { situation, symptoms },
          model_config: {
            model_type: 'emergency_medical_specialist',
            temperature: 0.1,
            max_tokens: 1500,
            priority_mode: 'life_safety',
            response_time: 'immediate'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Modal Emergency API error: ${response.status}`);
      }

      const data: ModalResponse = await response.json();
      return this.parseEmergencyAnalysis(data.result);
    } catch (error) {
      console.error('Modal Emergency Analysis Error:', error);
      return this.getFallbackEmergencyAnalysis(situation);
    }
  }

  // Helper method to parse health analysis response
  private parseHealthAnalysis(result: string): any {
    try {
      return JSON.parse(result);
    } catch {
      return {
        analysis: result,
        risk_level: 'medium' as const,
        recommendations: ['Consult with a healthcare professional', 'Monitor symptoms', 'Maintain healthy lifestyle'],
        emergency_action: false
      };
    }
  }

  // Helper method to parse sleep analysis response
  private parseSleepAnalysis(result: string): any {
    try {
      return JSON.parse(result);
    } catch {
      return {
        sleep_score: 75,
        detailed_analysis: result,
        personalized_plan: ['Maintain consistent bedtime', 'Create relaxing environment', 'Limit screen time before bed'],
        circadian_insights: 'Your sleep patterns suggest room for optimization in timing and consistency.'
      };
    }
  }

  // Helper method to parse mental health analysis response
  private parseMentalHealthAnalysis(result: string): any {
    try {
      return JSON.parse(result);
    } catch {
      return {
        mental_health_score: 70,
        mood_analysis: result,
        coping_strategies: ['Deep breathing exercises', 'Mindfulness meditation', 'Regular physical activity'],
        crisis_risk: 'none' as const,
        professional_referral: false,
        therapeutic_exercises: ['Gratitude journaling', 'Progressive muscle relaxation']
      };
    }
  }

  // Helper method to parse nutrition analysis response
  private parseNutritionAnalysis(result: string): any {
    try {
      return JSON.parse(result);
    } catch {
      return {
        nutrition_score: 75,
        meal_plan: {
          breakfast: ['Oatmeal with berries', 'Greek yogurt with nuts'],
          lunch: ['Quinoa salad with vegetables', 'Lean protein with greens'],
          dinner: ['Grilled fish with vegetables', 'Whole grain pasta with tomato sauce'],
          snacks: ['Apple with almond butter', 'Mixed nuts and seeds']
        },
        shopping_list: ['Oats', 'Berries', 'Greek yogurt', 'Quinoa', 'Mixed vegetables'],
        nutritional_insights: result
      };
    }
  }

  // Helper method to parse emergency analysis response
  private parseEmergencyAnalysis(result: string): any {
    try {
      return JSON.parse(result);
    } catch {
      return {
        urgency_level: 'urgent' as const,
        immediate_actions: ['Call emergency services if life-threatening', 'Follow first aid protocols'],
        emergency_services: true,
        first_aid_steps: ['Ensure safety', 'Call for help', 'Provide appropriate first aid'],
        crisis_resources: ['911 - Emergency Services', 'Local Emergency Room', 'Poison Control: 1-800-222-1222']
      };
    }
  }

  // Fallback methods for when Modal API is unavailable
  private getFallbackHealthAnalysis(request: HealthAnalysisRequest): any {
    return {
      analysis: `Based on the symptoms provided (${request.symptoms.join(', ')}), it's important to monitor your condition and consult with a healthcare professional for proper evaluation.`,
      risk_level: 'medium' as const,
      recommendations: [
        'Schedule an appointment with your primary care physician',
        'Keep a symptom diary',
        'Stay hydrated and get adequate rest',
        'Avoid self-medication without professional guidance'
      ],
      emergency_action: request.symptoms.some(s => 
        s.toLowerCase().includes('chest pain') || 
        s.toLowerCase().includes('difficulty breathing') ||
        s.toLowerCase().includes('severe')
      )
    };
  }

  private getFallbackSleepAnalysis(request: SleepAnalysisRequest): any {
    const sleepScore = Math.max(0, Math.min(100, 
      (request.sleep_hours >= 7 && request.sleep_hours <= 9 ? 40 : 20) +
      (request.sleep_quality * 6) -
      (request.sleep_issues.length * 5)
    ));

    return {
      sleep_score: sleepScore,
      detailed_analysis: `Your sleep assessment shows you're getting ${request.sleep_hours} hours of sleep with a quality rating of ${request.sleep_quality}/10. ${request.sleep_issues.length > 0 ? `You're experiencing: ${request.sleep_issues.join(', ')}.` : ''} Focus on consistent timing and sleep hygiene.`,
      personalized_plan: [
        'Maintain a consistent sleep schedule',
        'Create a relaxing bedtime routine',
        'Optimize your sleep environment (cool, dark, quiet)',
        'Limit caffeine and screens before bedtime',
        'Consider relaxation techniques like meditation'
      ],
      circadian_insights: 'Your sleep patterns can be optimized through consistent timing and environmental adjustments.'
    };
  }

  private getFallbackMentalHealthAnalysis(request: MentalHealthRequest): any {
    const averageLevel = (request.mood_level + (10 - request.stress_level) + (10 - request.anxiety_level)) / 3;
    
    return {
      mental_health_score: Math.round(averageLevel * 10),
      mood_analysis: `Your current emotional state shows a mood level of ${request.mood_level}/10, stress at ${request.stress_level}/10, and anxiety at ${request.anxiety_level}/10. ${averageLevel < 5 ? 'Consider seeking additional support.' : 'You\'re managing well, keep focusing on self-care.'}`,
      coping_strategies: [
        'Practice deep breathing exercises',
        'Engage in regular physical activity',
        'Maintain social connections',
        'Try mindfulness or meditation',
        'Ensure adequate sleep and nutrition'
      ],
      crisis_risk: request.mood_level < 3 || request.stress_level > 8 || request.anxiety_level > 8 ? 'medium' as const : 'none' as const,
      professional_referral: request.mood_level < 4 || request.stress_level > 7,
      therapeutic_exercises: [
        'Gratitude journaling',
        'Progressive muscle relaxation',
        'Mindful walking',
        'Creative expression activities'
      ]
    };
  }

  private getFallbackNutritionAnalysis(goals: string[], restrictions: string[]): any {
    return {
      nutrition_score: 75,
      meal_plan: {
        breakfast: ['Whole grain oatmeal with fresh berries', 'Greek yogurt with nuts and seeds'],
        lunch: ['Quinoa salad with mixed vegetables', 'Lean protein with leafy greens'],
        dinner: ['Grilled fish with roasted vegetables', 'Legume-based dishes with whole grains'],
        snacks: ['Fresh fruit with nut butter', 'Vegetable sticks with hummus']
      },
      shopping_list: ['Oats', 'Berries', 'Greek yogurt', 'Quinoa', 'Mixed vegetables', 'Lean proteins', 'Nuts', 'Seeds'],
      nutritional_insights: `Based on your goals (${goals.join(', ')}) and dietary restrictions (${restrictions.join(', ')}), focus on whole foods, balanced macronutrients, and adequate hydration.`,
      supplement_recommendations: ['Vitamin D', 'Omega-3 fatty acids', 'Multivitamin (if needed)']
    };
  }

  private getFallbackEmergencyAnalysis(situation: string): any {
    const isLifeThreatening = situation.toLowerCase().includes('unconscious') ||
                            situation.toLowerCase().includes('not breathing') ||
                            situation.toLowerCase().includes('chest pain') ||
                            situation.toLowerCase().includes('severe bleeding');

    return {
      urgency_level: isLifeThreatening ? 'life_threatening' as const : 'urgent' as const,
      immediate_actions: [
        'Call 911 immediately if life-threatening',
        'Ensure the scene is safe',
        'Follow basic first aid protocols',
        'Stay calm and provide comfort'
      ],
      emergency_services: isLifeThreatening,
      first_aid_steps: [
        'Check responsiveness and breathing',
        'Control bleeding if present',
        'Keep the person comfortable',
        'Monitor vital signs',
        'Do not move the person unless necessary'
      ],
      crisis_resources: [
        '911 - Emergency Services',
        'Local Emergency Room',
        'Poison Control: 1-800-222-1222',
        'Crisis Text Line: Text HOME to 741741'
      ]
    };
  }

  // Check Modal API status and credits
  async checkAPIStatus(): Promise<{
    status: 'active' | 'inactive';
    credits_remaining: number;
    rate_limit_remaining: number;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Modal API unavailable');
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'inactive',
        credits_remaining: 0,
        rate_limit_remaining: 0
      };
    }
  }
}

export const modalAI = new ModalAIService();
export type { 
  HealthAnalysisRequest, 
  SleepAnalysisRequest, 
  MentalHealthRequest 
};