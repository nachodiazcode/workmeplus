import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const MOBILE_MAX = 768;
const TABLET_MAX = 1024;

export type WmpDeviceType = 'mobile' | 'tablet' | 'desktop';

export interface WmpResponsive {
  deviceType: WmpDeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  boardLayout: 'vertical' | 'horizontal';
  columnWidth: number | '100%';
  metricsColumns: number;
}

function getDeviceType(width: number): WmpDeviceType {
  if (width <= MOBILE_MAX) return 'mobile';
  if (width <= TABLET_MAX) return 'tablet';
  return 'desktop';
}

function buildResponsive(width: number, height: number): WmpResponsive {
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  let columnWidth: number | '100%';
  if (isMobile) {
    columnWidth = '100%';
  } else if (isTablet) {
    columnWidth = 290;
  } else {
    columnWidth = 320;
  }

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    screenWidth: width,
    screenHeight: height,
    boardLayout: isMobile ? 'vertical' : 'horizontal',
    columnWidth,
    metricsColumns: isMobile ? 1 : 3,
  };
}

export function useResponsive(): WmpResponsive {
  const [responsive, setResponsive] = useState<WmpResponsive>(() => {
    const { width, height } = Dimensions.get('window');
    return buildResponsive(width, height);
  });

  useEffect(() => {
    const handleChange = ({ window }: { window: ScaledSize }) => {
      setResponsive(buildResponsive(window.width, window.height));
    };

    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return responsive;
}
