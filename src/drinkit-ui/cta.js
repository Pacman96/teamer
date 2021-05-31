import classNames from 'classnames'
import { Block } from './base'

export const Button = ({
    isLoading, isActive, isDisabled, isLocked,
    elvation, curve = 'curved', style, block,
    width, size = 'md',
    children, before, after, icon,
    fill = 'outlined', theme = 'dark',
    contentProps, beforeHtmlTag, beforeProps, afterProps, className,
    ...rest
}) => {
    const BeforeHtmlTag = beforeHtmlTag || 'span'
    const minWidths = { xs: 60, sm: 70, md: 80, lg: 90, xl: 100, xxl: 110 }
    return (
        <Block
            {...rest}
            fill={fill}
            theme={theme}
            block={block}
            htmlTag='button'
            className={
                classNames(
                    'button',
                    { 'h-xs': size === 'xs' },
                    { 'h-sm': size === 'sm' },
                    { 'h-md': size === 'md' },
                    { 'h-lg': size === 'lg' },
                    { 'h-xl': size === 'xl' },
                    { 'h-xxl': size === 'xxl' },
                    className
                )
            }
            elvation={elvation} curve={curve}
            canLoading={!isLocked && !isDisabled}
            canActive={!isLocked && !isDisabled}
            canDisabled={!isLocked}
            canLocked
            canHover
            isLoading={isLoading} isActive={isActive} isDisabled={isDisabled} isLocked={isLocked}
            style={{
                ...style,
                minWidth: width && minWidths[width],
            }}
        >

            <div className='content' {...contentProps}>
                {(before || beforeProps) && <BeforeHtmlTag {...beforeProps}>{before}</BeforeHtmlTag>}
                {icon ? <span className={`fas fa-${icon}`}></span> : children}
                {(after || afterProps) && <span {...afterProps}>{after}</span>}

            </div>
        </Block>
    )
}
