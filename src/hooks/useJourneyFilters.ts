import { useState } from 'react';

export interface JourneyFilters {
  search: string;
  sortBy: 'name' | 'date' | 'status';
  status: 'all' | 'draft' | 'active' | 'completed';
}

export function useJourneyFilters() {
  const [filters, setFilters] = useState<JourneyFilters>({
    search: '',
    sortBy: 'date',
    status: 'all'
  });

  return {
    filters,
    setFilters
  };
}