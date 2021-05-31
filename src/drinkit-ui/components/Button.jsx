import styled from 'styled-components'
import { useTheme } from "./../apis/theme"

import { Icon } from "./base"
import { Text } from "."
import { useHistory } from 'react-router'

const isString = (payload) => typeof payload === 'string'
const isNumber = (payload) => typeof payload === 'number'
const isBool = (payload) => typeof payload === 'boolean'


const heights = { s: '26px', m: '36px', l: '46px', xl: '56px' }
const minWidths = { s: '80px', m: '100px', l: '120px', xl: '140px' }
const horizontalPaddings = { s: '10px', m: '15px', l: '20px', xl: '25px' }

const Root = styled.button`
    transition: all .2s ease-in-out;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    font: inherit;
    :focus {
        outline: none;
    }

    display: ${props => props.hidden === true || props.visible === false ? 'none' : 'inline-flex'};
    flex-direction: ${props => props.vertical && 'column'};
    justify-content: space-between;
    align-items: center;

    min-width: ${props => {
        if (props.icon) return heights[props.size]
        if (!props.minWidth || props.fullWidth) return 'unset'
        if (isString(props.minWidth)) return props.minWidth
        return minWidths[props.size] || '120px'
    }};
    width: ${props => {
        if (props.fullWidth) return '100%'
        if (props.icon) return heights[props.size]
        return 'unset'
    }};
    line-height: ${props => props.theme.sizes.line[props.size]};
    font-size: ${props => props.theme.sizes.font[props.size]};

    height: ${props => {
        if (props.fullHeight) return "100%"
        // if (props.fill === 'text') return 'unset'
        return heights[props.size]
    }};
    padding: ${props => {
        if (props.fill === 'text' || props.icon) return 'unset'
        else return `0 ${horizontalPaddings[props.size]}`
    }};

    background-color: ${props => {
        if (props.disabled) return

        const color = props.theme.palette[props.color]
        switch (props.fill) {
            case 'filled': return color
            default: return 'unset'
        }
    }
    };
    color: ${props => {
        if (props.disabled) return
        const color = props.theme.palette[props.color]
        const contrast = props.theme.palette.contrast[props.color]
        switch (props.fill) {
            case 'filled': return contrast
            case 'outlined':
            case 'text':
                return color
            default: return
        }
    }
    };

    border: 1px solid transparent;
    border-color: ${props => {
        const color = !props.disabled ? props.theme.palette[props.color] : 'grey'
        switch (props.fill) {
            case 'outlined': return color
            default: return 'transparent'
        }
    }
    };
    border-radius: ${props => {
        switch (props.curve) {
            case 'square': return 'unset'
            case 'curved': return '8px'
            case 'round': return '40px'
            case 'cercle': return '100%'
            default: return 'unset'
        }
    }
    };

    &:hover{
        background-color: ${props => {
        const color = props.theme.palette.hover[props.color]
        if (props.disabled) return
        switch (props.fill) {
            case 'filled': return color
            default: return 'unset'
        }
    }
    };
        color: ${props => {
        if (props.disabled) return
        const color = props.theme.palette[props.color]
        const contrast = props.theme.palette.contrast[props.color]
        switch (props.fill) {
            case 'filled': return contrast
            case 'outlined':
            case 'text':
                return color
            default: return
        }
    }
    };
    }
`
// min-height: ${props => {
//     const fs = props.theme.sizes.font[props.size]
//     const spacing = `calc(${scale[props.size]} * ${paddingY})`
//     return `calc(${fs} + ${spacing})`
// }
// };
// max-height: ${props => {
//     const fs = props.theme.sizes.font[props.size]
//     const spacing = `calc(${scale[props.size]} * ${paddingY})`
//     return `calc(${fs} + ${spacing})`
// }
// };

const Component = ({
    text,
    textProps,

    icon,
    iconProps,

    before = null,
    beforeProps,

    after = null,
    afterProps,

    fill = 'filled',
    visible = true,

    color = 'light2',
    hoverColor,

    curve = 'curved',
    size = 'm',
    minWidth = false,
    fullWidth = false,
    fullHeight = false,

    loading,
    disabled,


    path,
    onClick,
    goBack,

    ...rest
}) => {
    const { theme } = useTheme()
    const his = useHistory()

    const click = () => {
        goBack && his.goBack()
        path && his.push(path)
        onClick && onClick()
    }

    const rootProps = {
        as: 'button', theme,
        visible,
        icon,

        fill,
        color,
        curve,
        size, minWidth, fullWidth, fullHeight,
        loading, disabled,
        ...rest,
    }

    // if(!visible) return null
    return <Root {...rootProps} onClick={click}>
        {before}
        {text && <Text children={text} theme={theme} {...textProps} style={{ flex: 1 }} />}
        {icon && <Icon fa={icon} theme={theme} {...iconProps} style={{ flex: 1 }} />}
        {after}
    </Root>
}
export default Component