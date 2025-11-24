import React from 'react';
import logoImage from 'figma:asset/dba9adbbc2d7d351b47cd150827f39d4e6c84a9e.png';

interface LogoProps {
  variant?: 'icon' | 'full' | 'mono' | 'dark';
  size?: number;
}

export function Logo({ variant = 'icon', size = 48 }: LogoProps) {
  return (
    <img 
      src={logoImage} 
      alt="Opina+" 
      width={size} 
      height={size}
      style={{ 
        width: size, 
        height: size,
        objectFit: 'contain',
        // Otimizações avançadas para qualidade máxima e efeito 3D
        imageRendering: '-webkit-optimize-contrast',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        transform: 'translateZ(0) perspective(1000px)',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransform: 'translateZ(0) scale(1.0, 1.0)',
        MozTransform: 'translateZ(0) scale(1.0, 1.0)',
        willChange: 'transform',
        filter: 'contrast(1.08) saturate(1.12) brightness(1.02) drop-shadow(0 2px 8px rgba(45, 91, 255, 0.15))',
      } as React.CSSProperties}
      loading="eager"
      decoding="sync"
      fetchpriority="high"
    />
  );
}