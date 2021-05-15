import classNames from "classnames"

export const Block = ({
    // state
    canLoading, canActive, canDisabled, canLocked,
    isLoading, isActive, isDisabled, isLocked,
    // styling
    pad = '', padLR = '', padTB = '', mar = '', marLR = '', marTB = '',
    theme, fill,
    elvation = '', curve = 'square',
    // main
    children, className, style,
    htmlTag,
    ...rest
}) => {
    const HtmlTag = htmlTag || 'div'
    const props = {
        className: classNames(
            className,
            // paddings 
            { 'pad-xs': pad === 'xs' },
            { 'pad-sm': pad === 'sm' },
            { 'pad-md': pad === 'md' },
            { 'pad-lg': pad === 'lg' },
            { 'pad-xl': pad === 'xl' },
            { 'pad-xxl': pad === 'xxl' },
            { 'padLR-xs': padLR === 'xs' },
            { 'padLR-sm': padLR === 'sm' },
            { 'padLR-md': padLR === 'md' },
            { 'padLR-lg': padLR === 'lg' },
            { 'padLR-xl': padLR === 'xl' },
            { 'padLR-xxl': padLR === 'xxl' },
            { 'padTB-xs': padTB === 'xs' },
            { 'padTB-sm': padTB === 'sm' },
            { 'padTB-md': padTB === 'md' },
            { 'padTB-lg': padTB === 'lg' },
            { 'padTB-xl': padTB === 'xl' },
            { 'padTB-xxl': padTB === 'xxl' },
            // margins 
            { 'mar-xs': mar === 'xs' },
            { 'mar-sm': mar === 'sm' },
            { 'mar-md': mar === 'md' },
            { 'mar-lg': mar === 'lg' },
            { 'mar-xl': mar === 'xl' },
            { 'mar-xxl': mar === 'xxl' },
            { 'marLR-xs': marLR === 'xs' },
            { 'marLR-sm': marLR === 'sm' },
            { 'marLR-md': marLR === 'md' },
            { 'marLR-lg': marLR === 'lg' },
            { 'marLR-xl': marLR === 'xl' },
            { 'marLR-xxl': marLR === 'xxl' },
            { 'marTB-xs': marTB === 'xs' },
            { 'marTB-sm': marTB === 'sm' },
            { 'marTB-md': marTB === 'md' },
            { 'marTB-lg': marTB === 'lg' },
            { 'marTB-xl': marTB === 'xl' },
            { 'marTB-xxl': marTB === 'xxl' },
            // Shadows
            { 'elvation-xs': elvation === 'xs' },
            { 'elvation-sm': elvation === 'sm' },
            { 'elvation-md': elvation === 'md' },
            { 'elvation-lg': elvation === 'lg' },
            { 'elvation-xl': elvation === 'xl' },
            { 'elvation-xxl': elvation === 'xxl' },
            // curviness
            { 'square': curve === 'square' },
            { 'curved': curve === 'curved' },
            { 'round': curve === 'round' },
            //  states
            { 'isLoading': isLoading && canLoading },
            { 'isActive': isActive && canActive },
            { 'isDisabled': isDisabled && canDisabled },
            { 'isLocked': isLocked && canLocked },
            // theme 
            { 'primary': theme === 'primary' },
            { 'secondary': theme === 'secondary' },
            { 'danger': theme === 'danger' },
            { 'warning': theme === 'warning' },
            { 'success': theme === 'success' },
            { 'infos': theme === 'infos' },
            { 'dark': theme === 'dark' },
            { 'light': theme === 'light' },
            // fill
            { 'filled': fill === 'filled' || fill === true },
            { 'outlined': fill === 'outlined' },
            { 'ghost': fill === 'ghost' },
        ),
        style: { ...style }
    }
    return <HtmlTag {...props} {...rest}>{children}</HtmlTag>

}

export const Text = ({
    className, style,
    variation = 'p', size = 'm',
    color, children,
    ...rest
}) => {
    const props = {
        style: style,
        className:
            classNames(
                className,
                { "col-primary": color === 'primary' },
                { "col-secondary": color === 'secondary' },
                { "col-warning": color === 'warning' },
                { "col-success": color === 'success' },
                { "col-danger": color === 'danger' },
                { "col-infos": color === 'infos' },
                { 'col-light': color === 'light' },
                { 'col-dark': color === 'dark' },
                { 'col-ghost': color === 'ghost' },
            )
    }
    switch (variation) {
        case 'h1':
            return <h1 {...props} {...rest}>{children} </h1>
        case 'h2':
            return <h2 {...props} {...rest}> {children}</h2>
        case 'h3':
            return <h3 {...props} {...rest}>{children} </h3>
        case 'h4':
            return <h4 {...props} {...rest}> {children}</h4>
        case 'h5':
            return <h5 {...props} {...rest}>{children} </h5>
        case 'h6':
            return <h6 {...props} {...rest}>{children} </h6>
        case 'p':
            return <p {...props} {...rest}> {children}</p>
        case 'label':
            return <label {...props} {...rest}> {children}</label>
        default:
            break;
    }
}
