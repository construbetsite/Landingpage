import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackIcon?: React.ReactNode;
  aspectRatio?: string;
  containerClassName?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackSrc,
  fallbackIcon,
  aspectRatio,
  containerClassName = '',
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  if (!src || hasError) {
    if (fallbackSrc && !hasError) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          loading={loading}
          {...props}
        />
      );
    }

    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-zinc-800 text-gray-400 ${containerClassName} ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {fallbackIcon || <ShoppingBag size={32} className="opacity-40" />}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200/50 dark:bg-zinc-800/50 animate-pulse" />
      )}
    </div>
  );
};

export default Image;
