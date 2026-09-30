import * as ReactJsx from 'react/jsx-runtime';
import { WmpCard } from './components/WmpCard';
import { WmpBadge } from './components/WmpBadge';
import { WmpBoard } from './components/WmpBoard';
import { WmpColumn } from './components/WmpColumn';
import { WmpProgress } from './components/WmpProgress';
import { WmpButton } from './components/WmpButton';
import { WmpAvatar } from './components/WmpAvatar';
import { WmpTag } from './components/WmpTag';
import { WmpMetric } from './components/WmpMetric';
import { WmpHeader } from './components/WmpHeader';

const TAG_MAP: Record<string, any> = {
  'wmp-card': WmpCard,
  'wmp-badge': WmpBadge,
  'wmp-board': WmpBoard,
  'wmp-column': WmpColumn,
  'wmp-progress': WmpProgress,
  'wmp-button': WmpButton,
  'wmp-avatar': WmpAvatar,
  'wmp-tag': WmpTag,
  'wmp-metric': WmpMetric,
  'wmp-header': WmpHeader,
};

export function jsx(type: any, props: any, key: any) {
  const Component = typeof type === 'string' && TAG_MAP[type] ? TAG_MAP[type] : type;
  return (ReactJsx as any).jsx(Component, props, key);
}

export function jsxs(type: any, props: any, key: any) {
  const Component = typeof type === 'string' && TAG_MAP[type] ? TAG_MAP[type] : type;
  return (ReactJsx as any).jsxs(Component, props, key);
}

export const Fragment = ReactJsx.Fragment;
