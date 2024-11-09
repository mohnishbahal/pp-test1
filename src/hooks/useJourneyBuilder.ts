import { useState, useEffect } from 'react';
import { Journey } from '../types/journey';
import { useApp } from '../context/AppContext';

export function useJourneyBuilder(journeyId?: string) {
  const { journeys } = useApp();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!journeyId) {
      setJourney(null);
      setLoading(false);
      return;
    }

    const foundJourney = journeys.find(j => j.id === journeyId);
    if (foundJourney) {
      setJourney(foundJourney);
      setError(null);
    } else {
      setError('Journey not found');
    }
    setLoading(false);
  }, [journeyId, journeys]);

  return {
    journey,
    loading,
    error
  };
}