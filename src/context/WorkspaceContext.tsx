import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

interface Workspace {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'pending' | 'accepted' | 'declined';
  invitedBy: string;
  createdAt: Date;
}

interface WorkspaceMember {
  userId: string;
  workspaceId: string;
  role: 'admin' | 'editor' | 'viewer';
  joinedAt: Date;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  invitations: WorkspaceInvitation[];
  members: WorkspaceMember[];
  createWorkspace: (name: string, description: string) => Promise<void>;
  updateWorkspace: (id: string, data: Partial<Workspace>) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  inviteMember: (workspaceId: string, email: string, role: WorkspaceMember['role']) => Promise<void>;
  revokeInvitation: (invitationId: string) => Promise<void>;
  acceptInvitation: (invitationId: string) => Promise<void>;
  declineInvitation: (invitationId: string) => Promise<void>;
  updateMemberRole: (workspaceId: string, userId: string, role: WorkspaceMember['role']) => Promise<void>;
  removeMember: (workspaceId: string, userId: string) => Promise<void>;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [invitations, setInvitations] = useState<WorkspaceInvitation[]>([]);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    // Load user's workspaces
    const loadWorkspaces = async () => {
      const q = query(
        collection(db, 'workspaces'),
        where('ownerId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const workspaceData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workspace[];
      setWorkspaces(workspaceData);
    };

    // Load invitations
    const loadInvitations = async () => {
      const q = query(
        collection(db, 'workspace_invitations'),
        where('email', '==', currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      const invitationData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WorkspaceInvitation[];
      setInvitations(invitationData);
    };

    loadWorkspaces();
    loadInvitations();
  }, [currentUser]);

  const createWorkspace = async (name: string, description: string) => {
    if (!currentUser) throw new Error('No user logged in');

    const workspaceData = {
      name,
      description,
      ownerId: currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'workspaces'), workspaceData);
    const newWorkspace = {
      id: docRef.id,
      ...workspaceData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setWorkspaces([...workspaces, newWorkspace]);
    return newWorkspace;
  };

  const updateWorkspace = async (id: string, data: Partial<Workspace>) => {
    const workspaceRef = doc(db, 'workspaces', id);
    await updateDoc(workspaceRef, {
      ...data,
      updatedAt: serverTimestamp()
    });

    setWorkspaces(workspaces.map(w => 
      w.id === id ? { ...w, ...data, updatedAt: new Date() } : w
    ));
  };

  const deleteWorkspace = async (id: string) => {
    await deleteDoc(doc(db, 'workspaces', id));
    setWorkspaces(workspaces.filter(w => w.id !== id));
    if (currentWorkspace?.id === id) {
      setCurrentWorkspace(null);
    }
  };

  const inviteMember = async (workspaceId: string, email: string, role: WorkspaceMember['role']) => {
    if (!currentUser) throw new Error('No user logged in');

    const invitationData = {
      workspaceId,
      email,
      role,
      status: 'pending',
      invitedBy: currentUser.uid,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, 'workspace_invitations'), invitationData);
  };

  const revokeInvitation = async (invitationId: string) => {
    await deleteDoc(doc(db, 'workspace_invitations', invitationId));
    setInvitations(invitations.filter(i => i.id !== invitationId));
  };

  const acceptInvitation = async (invitationId: string) => {
    if (!currentUser) throw new Error('No user logged in');

    const invitationRef = doc(db, 'workspace_invitations', invitationId);
    const invitation = invitations.find(i => i.id === invitationId);

    if (!invitation) throw new Error('Invitation not found');

    await updateDoc(invitationRef, {
      status: 'accepted',
      updatedAt: serverTimestamp()
    });

    const memberData = {
      userId: currentUser.uid,
      workspaceId: invitation.workspaceId,
      role: invitation.role,
      joinedAt: serverTimestamp()
    };

    await addDoc(collection(db, 'workspace_members'), memberData);
    setInvitations(invitations.map(i => 
      i.id === invitationId ? { ...i, status: 'accepted' } : i
    ));
  };

  const declineInvitation = async (invitationId: string) => {
    const invitationRef = doc(db, 'workspace_invitations', invitationId);
    await updateDoc(invitationRef, {
      status: 'declined',
      updatedAt: serverTimestamp()
    });

    setInvitations(invitations.map(i => 
      i.id === invitationId ? { ...i, status: 'declined' } : i
    ));
  };

  const updateMemberRole = async (workspaceId: string, userId: string, role: WorkspaceMember['role']) => {
    const q = query(
      collection(db, 'workspace_members'),
      where('workspaceId', '==', workspaceId),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const memberDoc = querySnapshot.docs[0];

    await updateDoc(doc(db, 'workspace_members', memberDoc.id), {
      role,
      updatedAt: serverTimestamp()
    });

    setMembers(members.map(m => 
      m.userId === userId && m.workspaceId === workspaceId ? { ...m, role } : m
    ));
  };

  const removeMember = async (workspaceId: string, userId: string) => {
    const q = query(
      collection(db, 'workspace_members'),
      where('workspaceId', '==', workspaceId),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const memberDoc = querySnapshot.docs[0];

    await deleteDoc(doc(db, 'workspace_members', memberDoc.id));
    setMembers(members.filter(m => !(m.userId === userId && m.workspaceId === workspaceId)));
  };

  const value = {
    workspaces,
    currentWorkspace,
    invitations,
    members,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    inviteMember,
    revokeInvitation,
    acceptInvitation,
    declineInvitation,
    updateMemberRole,
    removeMember,
    setCurrentWorkspace
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}