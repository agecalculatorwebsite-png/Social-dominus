import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { Users, UserPlus, Shield, Trash2, Mail, CheckCircle2, Building2 } from 'lucide-react';
import { Role } from '../../types';

export const TeamView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { team, inviteTeamMember, removeTeamMember, currentWorkspace } = useAppStore();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('editor');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      inviteTeamMember(name.trim(), email.trim(), role, [currentWorkspace.id]);
      setName('');
      setEmail('');
      setInviteModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-violet-500" />
            Team Members & Role Access Control
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage collaborators, assign workspace permissions, and configure approval hierarchies.
          </p>
        </div>

        <button
          onClick={() => setInviteModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Role explanation bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs flex flex-wrap gap-4 text-slate-600 dark:text-slate-300">
        <div><strong className="text-violet-500">Owner:</strong> Full workspace & billing authority</div>
        <div><strong className="text-sky-500">Admin:</strong> User & channel management</div>
        <div><strong className="text-emerald-500">Editor:</strong> Create, approve, & schedule</div>
        <div><strong className="text-amber-500">Contributor:</strong> Draft content (requires approval)</div>
        <div><strong className="text-slate-400">Analyst:</strong> Read-only reports & insights</div>
      </div>

      {/* Member Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Member</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Assigned Workspaces</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
            {team.map((mem) => (
              <tr key={mem.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={mem.avatarUrl} alt={mem.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
                  <div>
                    <span className="font-bold block">{mem.name}</span>
                    <span className="text-xs text-slate-400">{mem.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-500">
                    {mem.role}
                  </span>
                </td>
                <td className="p-4">
                  {mem.status === 'active' ? (
                    <span className="text-emerald-500 font-bold flex items-center gap-1 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : (
                    <span className="text-amber-500 font-bold flex items-center gap-1 text-xs">
                      <Mail className="w-3.5 h-3.5" /> Invited
                    </span>
                  )}
                </td>
                <td className="p-4 text-xs text-slate-500">
                  {mem.assignedWorkspaces.length} workspace(s)
                </td>
                <td className="p-4 text-right">
                  {mem.role !== 'owner' && (
                    <button
                      onClick={() => removeTeamMember(mem.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Invite Team Collaborator</h3>
            <form onSubmit={handleInvite} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Bell"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="editor">Editor (Can create & schedule)</option>
                  <option value="contributor">Contributor (Requires approval)</option>
                  <option value="manager">Manager (Can approve & publish)</option>
                  <option value="analyst">Analyst (Read-only analytics)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const WorkspacesView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { workspaces, currentWorkspace, setCurrentWorkspaceId, createWorkspace } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [isClient, setIsClient] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createWorkspace(name.trim(), 'America/New_York (EST)', isClient);
      setName('');
      setIsClient(false);
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Workspaces & Brand Portfolios
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tenant isolation for agencies managing distinct customer brands and social assets.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>New Workspace</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workspaces.map((ws) => {
          const isCurrent = ws.id === currentWorkspace.id;
          return (
            <div
              key={ws.id}
              className={`p-6 rounded-2xl border space-y-4 transition-all ${
                isCurrent
                  ? 'border-violet-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-violet-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {ws.isClientWorkspace ? 'Client Workspace' : 'Core Workspace'}
                </span>
                {isCurrent && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-bold">
                    Active
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{ws.name}</h3>
                <span className="text-xs text-slate-400">{ws.timezone}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs flex justify-between text-slate-500">
                <span>{ws.memberCount} Members</span>
                <span>{ws.channelsCount} Channels</span>
              </div>

              <button
                onClick={() => setCurrentWorkspaceId(ws.id)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-default'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-xs'
                }`}
              >
                {isCurrent ? 'Currently Active' : 'Switch into Workspace'}
              </button>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Create New Workspace</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Media Corp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="clientCheck2"
                  checked={isClient}
                  onChange={(e) => setIsClient(e.target.checked)}
                  className="rounded text-violet-600"
                />
                <label htmlFor="clientCheck2" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  Tag as Client Workspace (Agency feature)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
