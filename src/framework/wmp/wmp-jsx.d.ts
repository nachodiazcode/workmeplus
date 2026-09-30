import {
  WmpCardProps,
  WmpBadgeProps,
  WmpBoardProps,
  WmpColumnProps,
  WmpProgressProps,
  WmpButtonProps,
  WmpAvatarProps,
  WmpTagProps,
  WmpMetricProps,
  WmpHeaderProps,
} from './types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wmp-card': WmpCardProps;
      'wmp-badge': WmpBadgeProps;
      'wmp-board': WmpBoardProps;
      'wmp-column': WmpColumnProps;
      'wmp-progress': WmpProgressProps;
      'wmp-button': WmpButtonProps;
      'wmp-avatar': WmpAvatarProps;
      'wmp-tag': WmpTagProps;
      'wmp-metric': WmpMetricProps;
      'wmp-header': WmpHeaderProps;
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'wmp-card': WmpCardProps;
        'wmp-badge': WmpBadgeProps;
        'wmp-board': WmpBoardProps;
        'wmp-column': WmpColumnProps;
        'wmp-progress': WmpProgressProps;
        'wmp-button': WmpButtonProps;
        'wmp-avatar': WmpAvatarProps;
        'wmp-tag': WmpTagProps;
        'wmp-metric': WmpMetricProps;
        'wmp-header': WmpHeaderProps;
      }
    }
  }
}
