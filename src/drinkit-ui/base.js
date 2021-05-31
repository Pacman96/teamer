import classNames from "classnames"
import { cs } from "../utils/styling"


export const Group = props => {
    const { children, align, className } = props
    return (
        <div
            className={cs(props, ['all'], `group ${className || ' '}`)}
            {...props}
        >
            {children}
        </div>
    )
}


export const Block = ({
    // state
    canLoading, canActive, canDisabled, canLocked, canHover,
    isLoading, isActive, isDisabled, isLocked,
    // styling
    theme, fill, elvation = '', curve,
    // position & display
    align,
    // main 
    children, className, style, visible = true, hidden = false,
    htmlTag, block,
    ...rest
}) => {
    if (!visible || hidden) return null
    const HtmlTag = htmlTag || 'div'
    const props = {
        className: classNames(
            className,
            // theme 
            { 'primary': theme === 'primary' },
            { 'secondary': theme === 'secondary' },
            { 'danger': theme === 'danger' },
            { 'warning': theme === 'warning' },
            { 'success': theme === 'success' },
            { 'infos': theme === 'infos' },
            { 'dark': theme === 'dark' },
            { 'light': theme === 'light' },
            { 'grey': theme === 'grey' },
            // fill
            { 'filled': fill === 'filled' || fill === true },
            { 'outlined': fill === 'outlined' },
            { 'ghost': fill === 'ghost' },
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
            { 'cercled': curve === 'cercled' },
            //  states
            { 'isLoading': isLoading && canLoading },
            { 'isActive': isActive && canActive },
            { 'isDisabled': isDisabled && canDisabled },
            { 'isLocked': isLocked && canLocked },
            // reguls
            { canHover: canHover },
            { block: block }
        ),
        style: {
            display: align && 'flex',
            justifyContent: align === 'sb' ? 'space-between' : align,
            alignItems: 'center',
            ...style
        }
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
