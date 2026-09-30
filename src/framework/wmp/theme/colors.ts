export const WmpColors = {
  // Brand
  primary: '#2563EB',        // Jira Blue / Royal
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  primarySubtle: '#EFF6FF',

  accent: '#7C3AED',         // Purple accent
  accentSubtle: '#F5F3FF',

  // Neutrals / Surfaces
  background: '#0B0F19',     // Modern Dark Slate
  surface: '#151C2C',        // Card Surface
  surfaceLight: '#1E293B',   // Hover / Secondary Surface
  surfaceElevated: '#243048', // Modals / Popovers
  border: '#243048',
  borderSubtle: '#1E293B',

  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0F172A',

  // Statuses (Jira-inspired)
  status: {
    backlog: '#64748B',      // Slate
    todo: '#38BDF8',         // Sky Blue
    doing: '#3B82F6',        // Work in progress
    in_progress: '#3B82F6',  // Deep Blue
    in_review: '#F59E0B',    // Amber
    done: '#10B981',         // Emerald Green
    blocked: '#EF4444',      // Red
  },

  // Status Backgrounds (translucent)
  statusBg: {
    backlog: 'rgba(100, 116, 139, 0.15)',
    todo: 'rgba(56, 189, 248, 0.15)',
    doing: 'rgba(59, 130, 246, 0.15)',
    in_progress: 'rgba(59, 130, 246, 0.15)',
    in_review: 'rgba(245, 158, 11, 0.15)',
    done: 'rgba(16, 185, 129, 0.15)',
    blocked: 'rgba(239, 68, 68, 0.15)',
  },

  // Priority
  priority: {
    urgent: '#EF4444',       // Red
    high: '#F97316',         // Orange
    medium: '#F59E0B',       // Amber
    low: '#3B82F6',          // Blue
    lowest: '#94A3B8',       // Gray
  },

  // Priority Backgrounds
  priorityBg: {
    urgent: 'rgba(239, 68, 68, 0.15)',
    high: 'rgba(249, 115, 22, 0.15)',
    medium: 'rgba(245, 158, 11, 0.15)',
    low: 'rgba(59, 130, 246, 0.15)',
    lowest: 'rgba(148, 163, 184, 0.15)',
  },
};
