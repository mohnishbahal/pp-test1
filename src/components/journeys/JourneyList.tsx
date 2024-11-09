import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Plus, Trash2, Edit2, Copy, Users, Eye, Search, Filter, SortAsc, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { PageHeader } from '../ui/PageHeader';
import JourneyPreview from './JourneyPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { Journey } from '../../types/journey';

export default function JourneyList() {
  const navigate = useNavigate();
  const { journeys, personas, removeJourney, duplicateJourney } = useApp();
  const [previewJourney, setPreviewJourney] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredJourneys = journeys
    .filter(journey => {
      const matchesSearch = journey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journey.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || journey.status === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const getPersonaAvatars = (personaIds: string[]) => {
    return personaIds.map(id => personas.find(p => p.id === id)).filter(Boolean);
  };

  const handleDelete = (journeyId: string) => {
    removeJourney(journeyId);
    setDeleteConfirm(null);
  };

  const handleDuplicate = async (journey: Journey) => {
    await duplicateJourney(journey.id);
    // Show success toast or notification
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Journey Maps"
        description="Create and manage your customer journey maps"
        action={
          <Button
            icon={Plus}
            onClick={() => navigate('/journeys/create')}
            variant="primary"
          >
            New Journey
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search journeys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <AnimatePresence>
        {previewJourney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-xl"
            >
              <button
                onClick={() => setPreviewJourney(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6">
                <JourneyPreview journey={journeys.find(j => j.id === previewJourney)!} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Delete Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to delete this journey? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredJourneys.map((journey, index) => (
            <motion.div
              key={journey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video relative bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {journey.coverImage ? (
                  <img
                    src={journey.coverImage}
                    alt={journey.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Map className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{journey.name}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{journey.description}</p>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconButton
                    icon={Eye}
                    onClick={() => setPreviewJourney(journey.id)}
                    tooltip="Preview journey"
                    variant="secondary"
                  />
                  <IconButton
                    icon={Copy}
                    onClick={() => handleDuplicate(journey)}
                    tooltip="Duplicate journey"
                    variant="secondary"
                  />
                  <IconButton
                    icon={Edit2}
                    onClick={() => navigate(`/journeys/edit/${journey.id}`)}
                    tooltip="Edit journey"
                    variant="secondary"
                  />
                  <IconButton
                    icon={Trash2}
                    onClick={() => setDeleteConfirm(journey.id)}
                    tooltip="Delete journey"
                    variant="danger"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(journey.status)}`}>
                    {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(journey.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {getPersonaAvatars(journey.personaIds).map((persona, index) => (
                      <img
                        key={index}
                        src={persona?.avatar}
                        alt={persona?.name}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                        title={persona?.name}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {journey.stages.length} stages
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredJourneys.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <Map className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No journeys found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Start by creating your first journey map'}
          </p>
          <Button
            icon={Plus}
            onClick={() => navigate('/journeys/create')}
            variant="primary"
          >
            Create Journey
          </Button>
        </motion.div>
      )}
    </div>
  );
}