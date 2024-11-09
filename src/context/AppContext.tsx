import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Journey, Stage, Touchpoint } from '../types/journey';

interface Persona {
  id: string;
  name: string;
  age: string;
  occupation: string;
  goals: string[];
  painPoints: string[];
  customSections?: {
    title: string;
    items: string[];
  }[];
  avatar: string;
}

interface AppContextType {
  personas: Persona[];
  journeys: Journey[];
  addPersona: (persona: Persona) => void;
  updatePersona: (persona: Persona) => void;
  removePersona: (id: string) => void;
  duplicatePersona: (id: string) => void;
  addJourney: (journey: Journey) => void;
  updateJourney: (journey: Journey) => void;
  removeJourney: (id: string) => void;
  duplicateJourney: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [journeys, setJourneys] = useState<Journey[]>([]);

  const addPersona = (persona: Persona) => {
    setPersonas(prev => [...prev, persona]);
  };

  const updatePersona = (persona: Persona) => {
    setPersonas(prev => prev.map(p => p.id === persona.id ? persona : p));
  };

  const removePersona = (id: string) => {
    setPersonas(prev => prev.filter(p => p.id !== id));
  };

  const duplicatePersona = (id: string) => {
    const persona = personas.find(p => p.id === id);
    if (persona) {
      const duplicate = {
        ...persona,
        id: crypto.randomUUID(),
        name: `${persona.name} (Copy)`,
        avatar: `${persona.avatar.split('?')[0]}?${Math.random()}`
      };
      setPersonas(prev => [...prev, duplicate]);
    }
  };

  const addJourney = (journey: Journey) => {
    setJourneys(prev => [...prev, journey]);
  };

  const updateJourney = (journey: Journey) => {
    setJourneys(prev => prev.map(j => j.id === journey.id ? journey : j));
  };

  const removeJourney = (id: string) => {
    setJourneys(prev => prev.filter(j => j.id !== id));
  };

  const duplicateJourney = (id: string) => {
    const journey = journeys.find(j => j.id === id);
    if (journey) {
      const duplicate = {
        ...journey,
        id: crypto.randomUUID(),
        name: `${journey.name} (Copy)`,
        status: 'draft' as const,
        stages: journey.stages.map(stage => ({
          ...stage,
          id: crypto.randomUUID(),
          touchpoints: stage.touchpoints.map(touchpoint => ({
            ...touchpoint,
            id: crypto.randomUUID()
          }))
        }))
      };
      setJourneys(prev => [...prev, duplicate]);
    }
  };

  return (
    <AppContext.Provider value={{
      personas,
      journeys,
      addPersona,
      updatePersona,
      removePersona,
      duplicatePersona,
      addJourney,
      updateJourney,
      removeJourney,
      duplicateJourney
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}