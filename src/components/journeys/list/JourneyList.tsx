import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Plus, Search } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { JourneyCard } from '../shared/JourneyCard';
import { EmptyState } from '../shared/EmptyState';

export default function JourneyList() {
  const navigate = useNavigate();
  const { journeys } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJourneys = journeys.filter(journey =>
    journey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journey.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Journey Maps</h1>
          <p className="text-gray-600 dark:text-gray-300">Create and manage your customer journey maps</p>
        </div>
        <Button
          onClick={() => navigate('/journeys/new')}
          icon={Plus}
        >
          New Journey
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search journeys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredJourneys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJourneys.map((journey) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              onEdit={() => navigate(`/journeys/${journey.id}`)}
              onDelete={() => {/* Implement delete */}}
              onDuplicate={() => {/* Implement duplicate */}}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Map}
          title="No journeys found"
          description={searchTerm ? "Try adjusting your search terms" : "Start by creating your first journey map"}
          action={
            <Button
              onClick={() => navigate('/journeys/new')}
              icon={Plus}
            >
              Create Journey
            </Button>
          }
        />
      )}
    </div>
  );
}