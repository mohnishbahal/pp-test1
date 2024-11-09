import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Trash2, AlertCircle } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';

export default function WorkspaceSettings() {
  const navigate = useNavigate();
  const { currentWorkspace, updateWorkspace, deleteWorkspace } = useWorkspace();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState({
    name: currentWorkspace?.name || '',
    description: currentWorkspace?.description || ''
  });

  if (!currentWorkspace) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No workspace selected</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Please select a workspace to manage its settings</p>
        <Button onClick={() => navigate('/workspaces')}>View Workspaces</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await updateWorkspace(currentWorkspace.id, form);
      // Show success message or redirect
    } catch (err) {
      setError('Failed to update workspace settings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setError('');
      setLoading(true);
      await deleteWorkspace(currentWorkspace.id);
      navigate('/workspaces');
    } catch (err) {
      setError('Failed to delete workspace');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Workspace Settings"
        description="Manage your workspace preferences and members"
      />

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Workspace Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                icon={Save}
                disabled={loading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
          
          <div className="space-y-4">
            {!showDeleteConfirm ? (
              <Button
                variant="danger"
                icon={Trash2}
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Workspace
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete this workspace? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    Yes, Delete Workspace
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}