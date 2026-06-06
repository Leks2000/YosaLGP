import React, { useState } from "react";
import Lottie from "lottie-react";
import loaderCat from "../assets/loader_cat.json";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
  loading?: "eager" | "lazy";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
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
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && (
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-purple-50/70 backdrop-blur-[1px]">
          <Lottie
            animationData={loaderCat}
            loop
            autoplay
            className="h-16 w-16 opacity-90"
            aria-label="Loading image"
          />
        </span>
      )}
      <img
        {...props}
        src={currentSrc}
        alt={alt}
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
