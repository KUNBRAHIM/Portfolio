'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import { asset } from '@/utils';

/**
 * @typedef {Object} AppImageProps
 * @property {string} src
 * @property {string} alt
 * @property {number} [width]
 * @property {number} [height]
 * @property {string} [className]
 * @property {boolean} [priority]
 * @property {number} [quality]
 * @property {'blur' | 'empty'} [placeholder]
 * @property {string} [blurDataURL]
 * @property {boolean} [fill]
 * @property {string} [sizes]
 * @property {() => void} [onClick]
 * @property {string} [fallbackSrc]
 * @property {'lazy' | 'eager'} [loading]
 * @property {boolean} [unoptimized]
 */

const AppImage = memo(function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    quality = 85,
    placeholder = 'empty',
    blurDataURL,
    fill = false,
    sizes,
    onClick,
    fallbackSrc = asset('/assets/images/no_image.png'),
    loading = 'lazy',
    unoptimized = false,
}) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const isExternalUrl = useMemo(() => typeof imageSrc === 'string' && imageSrc.startsWith('http'), [imageSrc]);
    const resolvedUnoptimized = unoptimized || isExternalUrl;

    const handleError = useCallback(() => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    }, [hasError, imageSrc, fallbackSrc]);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    const imgClassName = useMemo(() => {
        const classes = [className];
        if (isLoading) classes.push('bg-gray-200');
        if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
        if (fill) classes.push('object-cover w-full h-full');
        return classes.filter(Boolean).join(' ');
    }, [className, isLoading, onClick, fill]);

    if (fill) {
        return (
            <div className="relative" style={{ width: '100%', height: '100%' }}>
                <img
                    src={imageSrc}
                    alt={alt}
                    className={imgClassName}
                    loading={priority ? 'eager' : loading}
                    onError={handleError}
                    onLoad={handleLoad}
                    onClick={onClick}
                />
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt={alt}
            width={width || 400}
            height={height || 300}
            className={imgClassName}
            loading={priority ? 'eager' : loading}
            onError={handleError}
            onLoad={handleLoad}
            onClick={onClick}
        />
    );
});

AppImage.displayName = 'AppImage';

export default AppImage;
