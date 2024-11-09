import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, Users, Search } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import CreateWorkspaceModal from './CreateWorkspaceModal';

export default function WorkspaceList() {
  const navigate = useNavigate();
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(search.toLowerCase()) ||
    workspace.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Workspaces"
        description="Manage your workspaces and team collaboration"
        action={
          <Button
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
          >
            New Workspace
          </Button>
        }
      />

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search workspaces..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-colors cursor-pointer overflow-hidden
              ${currentWorkspace?.id === workspace.id 
                ? 'border-indigo-600 dark:border-indigo-500' 
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-900'
              }`}
            onClick={() => setCurrentWorkspace(workspace)}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {workspace.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {workspace.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>8 members</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/settings/workspace/${workspace.id}`);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredWorkspaces.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <Users className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No workspaces found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {search ? 'Try adjusting your search terms' : 'Create your first workspace to get started'}
            </p>
            <Button
              icon={Plus}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Workspace
            </Button>
          </div>
        )}
      </div>

      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}