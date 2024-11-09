import React from 'react';
import { Check, X } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export default function WorkspaceInvitations() {
  const { invitations, acceptInvitation, declineInvitation } = useWorkspace();
  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');

  if (pendingInvitations.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full space-y-4">
      {pendingInvitations.map((invitation) => (
        <div
          key={invitation.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Workspace Invitation</h3>
            <button
              onClick={() => declineInvitation(invitation.id)}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            You've been invited to join a workspace as {invitation.role}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => declineInvitation(invitation.id)}
              className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Decline
            </button>
            <button
              onClick={() => acceptInvitation(invitation.id)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}