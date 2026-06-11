import React, { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  fetchPriority?: "high" | "low" | "auto";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  srcSet?: string;
  sizes?: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

export default function LazyImage({
  wrapperClassName = "",
  className = "",
  fallbackSrc,
  onLoad,
  onError,
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && (
        <span
          className="absolute inset-0 z-10 flex items-center justify-center bg-purple-50/70 backdrop-blur-[1px]"
          aria-label="Loading image"
          role="status"
        >
          {/* Лёгкий CSS-спиннер «лапка» вместо тяжёлого lottie (-86KB gzip) */}
          <span className="lazy-paw-spinner" aria-hidden="true" />
        </span>
      )}
      <img
        {...props}
        src={currentSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setIsLoaded(false);
            setCurrentSrc(fallbackSrc);
          }
          onError?.(event);
        }}
      />
    </span>
  );
}
