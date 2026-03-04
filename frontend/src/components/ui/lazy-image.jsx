import React from 'react';

// Simple wrapper around a normal <img> element that defaults to lazy loading.
// Drop-in replacement for existing <img> tags; accepts all standard img props.

const LazyImage = React.forwardRef(({ src, alt, className, loading = 'lazy', ...props }, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt}
    className={className}
    loading={loading}
    {...props}
  />
));

export default LazyImage;
