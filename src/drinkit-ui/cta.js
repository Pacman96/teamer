import classNames from 'classnames'
import React from 'react'
import { Block } from './base'

export const Button = ({
    isLoading, isActive, isDisabled, isLocked,
    bg, pad, padLR, padTB, mar, marLR, marTB, elvation, curve = 'curved', style,
    width, size = 'md',
    children, before, after,
    fill = 'outlined', theme = 'dark',
    contentProps, beforeProps, afterProps,
    ...rest
}) => {
    const minWidths = { xs: 60, sm: 70, md: 80, lg: 90, xl: 100, xxl: 110 }
    return (
        <Block
            {...rest}
            fill={fill}
            theme={theme}
            htmlTag='button'
            className={
                classNames(
                    'button',
                    { 'h-xs': size === 'xs' },
                    { 'h-sm': size === 'sm' },
                    { 'h-md': size === 'md' },
                    { 'h-lg': size === 'lg' },
                    { 'h-xl': size === 'xl' },
                    { 'h-xxl': size === 'xxl' }
                )
            }
            bg={bg} pad={pad} padLR={padLR} padTB={padTB} mar={mar} marLR={marLR} marTB={marTB} elvation={elvation} curve={curve}
            canLoading={!isLocked && !isDisabled}
            canActive={!isLocked && !isDisabled}
            canDisabled={!isLocked}
            canLocked
            isLoading={isLoading} isActive={isActive} isDisabled={isDisabled} isLocked={isLocked}
            style={{
                ...style,
                minWidth: width && minWidths[width],
            }}
        >
            <div className='content' {...contentProps}>
                {before && <span {...beforeProps}>{before}</span>}
                {children}
                {after && <span {...afterProps}>{after}</span>}

            </div>
        </Block>
    )
}
