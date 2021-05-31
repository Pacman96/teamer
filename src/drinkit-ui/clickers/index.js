
import { cs } from "../../utils/styling"

export const SwitchClicker = props => {

    const {
        onText, offText, text,  hook = [null, () => null], ...rest
    } = props


    const value = hook[0]
    const setValue = hook[1]
    const toggle = () => setValue(!value)
    const content = text || (value ? onText : offText)


    return (
        <div onClick={toggle} className={cs({ ...props, selected: value }, ['all'], 'btn SwitchClicker')}>
            <button {...rest}>{content}</button>
        </div>
    )
}
const Icon = ({ fa = 'glass-cheers' }) => <span className={`fas fa-${fa}`} />
const Avatar = ({ src = 'https://th.bing.com/th/id/R425d092e064c91c68135361386f97560?rik=rX7vsVA3vLpCiA&pid=ImgRaw' }) => <img src={src} alt={src} />

export const Chip = props => {
    const {
        text, avatar, iconLeft, iconRight, hook = [null, () => null],
        className, bg, size,
        ...rest
    } = props

    const value = hook[0]
    const toggle = hook[1]

    return (
        <div className={cs({
            ...props,
            selected: value,
            bg: bg || 'light',
            size: size || 's'

        }, ['all'], `btn Chip ${className}`)} onClick={toggle} {...rest}>
            {avatar && <Avatar />}
            {iconLeft && <Icon fa={iconLeft} />}
            {text && <button>{text}</button>}
            {iconRight && <Icon />}

        </div>
    )
}

export const Button = (props) => {
    const {
        children, text, iconLeft, iconRight, icon,
        before, after, beforeProps, afterProps,
        className, bg, size,
        ...rest
    } = props


    return (
        <div className={cs(
            { 
                ...props, 
                bg: bg || 'primary',
                size: size || 'm'
            }
            , 'all',
            `btn Button ${className}`)
        }
            {...rest}
        >
            {iconLeft && <Icon fa={iconLeft} />}
            {text ? <button>{text}</button> : icon ? <Icon /> : children}
            {iconRight && <Icon />}
        </div>
    )
}

export const IconButton = (props) => {
    const {
        icon, className, bg, size,
        ...rest
    } = props


    return (
        <div className={cs(
            {
                ...props,
                size: size || 'm'
            }
            , 'all',
            `btn IconButton ${className || ''}`)
        }
            {...rest}
        >
            <Icon fa={icon} />
        </div>
    )
}