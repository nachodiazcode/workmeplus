import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type WmpStatus = 'backlog' | 'todo' | 'doing' | 'in_progress' | 'in_review' | 'done' | 'blocked';
export type WmpPriority = 'urgent' | 'high' | 'medium' | 'low' | 'lowest';
export type WmpButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface WmpCardProps {
  key?: React.Key;
  id?: string;
  code?: string;                 // e.g. "WMP-101"
  title?: string;
  description?: string;
  status?: WmpStatus;
  priority?: WmpPriority;
  progress?: number;             // 0 to 100
  assignee?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  dueDate?: string;
  selected?: boolean;
  onPress?: () => void;
  onStatusChange?: (newStatus: WmpStatus) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export interface WmpBadgeProps {
  label?: string;
  variant?: 'status' | 'priority' | 'type' | 'custom';
  value?: string;
  color?: string;
  bgColor?: string;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export interface WmpBoardProps {
  title?: string;
  subtitle?: string;
  projectCode?: string;
  activeFilter?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface WmpColumnProps {
  key?: React.Key;
  id: WmpStatus | string;
  title: string;
  status: WmpStatus;
  count?: number;
  color?: string;
  onAddCard?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface WmpProgressProps {
  value: number;                  // 0 to 100
  height?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface WmpButtonProps {
  title?: string;
  variant?: WmpButtonVariant;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export interface WmpAvatarProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export interface WmpTagProps {
  label: string;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface WmpMetricProps {
  title: string;
  value: string | number;
  change?: string;
  iconName?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export interface WmpHeaderProps {
  projectName: string;
  projectKey: string;
  version?: string;
  onOpenProjects?: () => void;
  onNewTask?: () => void;
  onSearchPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
