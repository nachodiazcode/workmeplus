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

export * from './types';
export * from './theme';
export * from './theme/colors';

// Individual Component exports
export {
  WmpCard,
  WmpBadge,
  WmpBoard,
  WmpColumn,
  WmpProgress,
  WmpButton,
  WmpAvatar,
  WmpTag,
  WmpMetric,
  WmpHeader,
};

// Namespace export for <Wmp.Card>, <Wmp.Column>, etc.
export const Wmp = {
  Card: WmpCard,
  Badge: WmpBadge,
  Board: WmpBoard,
  Column: WmpColumn,
  Progress: WmpProgress,
  Button: WmpButton,
  Avatar: WmpAvatar,
  Tag: WmpTag,
  Metric: WmpMetric,
  Header: WmpHeader,
};

export default Wmp;
