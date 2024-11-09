import { Journey as JourneyType } from '../../types/journey';

export interface JourneyFormData {
  name: string;
  description: string;
  coverImage: string | null;
  personaIds: string[];
  stages: Array<{
    name: string;
    touchpoints: Array<{
      name: string;
      description: string;
      customerAction: string;
      emotion: 'positive' | 'neutral' | 'negative';
      image?: string;
    }>;
  }>;
}

export interface TouchpointFormProps {
  touchpoint: {
    name: string;
    description: string;
    customerAction: string;
    emotion: 'positive' | 'neutral' | 'negative';
    image?: string;
  };
  onChange: (updates: Partial<TouchpointFormProps['touchpoint']>) => void;
}

export interface JourneyPreviewProps {
  journey: JourneyType;
}

export interface ProgressStepsProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
  currentStep: number;
  onChange: (step: number) => void;
}