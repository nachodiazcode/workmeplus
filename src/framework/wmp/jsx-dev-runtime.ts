import * as ReactJsxDev from 'react/jsx-dev-runtime';
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

export function jsxDEV(
  type: any,
  props: any,
  key: any,
  isStatic: boolean,
  source: any,
  self: any
) {
  const Component = typeof type === 'string' && TAG_MAP[type] ? TAG_MAP[type] : type;
  return (ReactJsxDev as any).jsxDEV(Component, props, key, isStatic, source, self);
}

export const Fragment = ReactJsxDev.Fragment;
