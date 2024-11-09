import { lazy } from 'react';

// Lazy load main journey components
export const JourneyList = lazy(() => import('./list/JourneyList'));
export const JourneyBuilder = lazy(() => import('./builder/JourneyBuilder'));
export const JourneyPreview = lazy(() => import('./preview/JourneyPreview'));

// Export types
export * from './types';