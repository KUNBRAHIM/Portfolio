'use client';

import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

/**
 * @typedef {'outline' | 'solid'} IconVariant
 */

/**
 * @typedef {Object} IconProps
 * @property {string} name
 * @property {IconVariant} [variant='outline']
 * @property {number} [size=24]
 * @property {string} [className='']
 * @property {() => void} [onClick]
 * @property {boolean} [disabled=false]
 * @property {any} [key]
 */

function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
}) {
    const iconSet = variant === 'solid' ? HeroIconsSolid : HeroIcons;
    const IconComponent = iconSet[name];

    if (!IconComponent) {
        return (
            <QuestionMarkCircleIcon
                width={size}
                height={size}
                className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                onClick={disabled ? undefined : onClick}
            />
        );
    }

    return (
        <IconComponent
            width={size}
            height={size}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
        />
    );
}

export default Icon;
