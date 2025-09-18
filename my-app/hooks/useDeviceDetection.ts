"use client";

import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isTouchDevice: boolean;
  userAgent: string;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isDesktop: true, // Default to desktop for SSR
    isMobile: false,
    isTablet: false,
    isTouchDevice: false,
    userAgent: '',
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Mobile device detection
      const mobileRegex = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
      const isMobile = mobileRegex.test(userAgent);

      // Tablet detection (including iPad)
      const tabletRegex = /ipad|android(?!.*mobile)|tablet|kindle|silk|playbook/i;
      const isTablet = tabletRegex.test(userAgent) || (isTouchDevice && window.innerWidth >= 768);

      // Desktop detection: not mobile, not tablet, or has no touch capabilities
      const isDesktop = !isMobile && !isTablet && (!isTouchDevice || window.innerWidth >= 1024);

      setDeviceInfo({
        isDesktop,
        isMobile,
        isTablet,
        isTouchDevice,
        userAgent,
      });
    };

    // Initial detection
    detectDevice();

    // Re-detect on window resize (for cases where orientation changes)
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceInfo;
};