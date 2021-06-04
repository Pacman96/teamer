import styled from 'styled-components'
import { useTheme } from "../../apis/theme"
import { Box, Icon, Text } from "../"
import { useHistory } from 'react-router'

// const isString = (payload) => typeof payload === 'string'
// const isNumber = (payload) => typeof payload === 'number'
// const isBool = (payload) => typeof payload === 'boolean'


// const heights = { s: '26px', m: '36px', l: '46px', xl: '56px' }
// const minWidths = { s: '80px', m: '100px', l: '120px', xl: '140px' }
// const horizontalPaddings = { s: '10px', m: '15px', l: '20px', xl: '25px' }

// const Root = styled.button`
//     transition: all .2s ease-in-out;

//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
//     cursor: pointer;
//     font: inherit;
//     :focus {
//         outline: none;
//     }

//     display: ${props => props.hidden === true || props.visible === false ? 'none' : 'inline-flex'};
//     flex-direction: ${props => props.vertical && 'column'};
//     justify-content: space-between;
//     align-items: center;

//     min-width: ${props => {
//         if (props.icon) return heights[props.size]
//         if (!props.minWidth || props.fullWidth) return 'unset'
//         if (isString(props.minWidth)) return props.minWidth
//         return minWidths[props.size] || '120px'
//     }};
//     width: ${props => {
//         if (props.fullWidth) return '100%'
//         if (props.icon) return heights[props.size]
//         return 'unset'
//     }};
//     line-height: ${props => props.theme.sizes.line[props.size]};
//     font-size: ${props => props.theme.sizes.font[props.size]};

//     height: ${props => {
//         if (props.fullHeight) return "100%"
//         // if (props.fill === 'text') return 'unset'
//         return heights[props.size]
//     }};
//     padding: ${props => {
//         if (props.fill === 'text' || props.icon) return 'unset'
//         else return `0 ${horizontalPaddings[props.size]}`
//     }};

//     background-color: ${props => {
//         if (props.disabled) return

//         const color = props.theme.palette[props.color]
//         switch (props.fill) {
//             case 'filled': return color
//             default: return 'unset'
//         }
//     }
//     };
//     color: ${props => {
//         if (props.disabled) return
//         const color = props.theme.palette[props.color]
//         const contrast = props.theme.palette.contrast[props.color]
//         switch (props.fill) {
//             case 'filled': return contrast
//             case 'outlined':
//             case 'text':
//                 return color
//             default: return
//         }
//     }
//     };

//     border: 1px solid transparent;
//     border-color: ${props => {
//         const color = !props.disabled ? props.theme.palette[props.color] : 'grey'
//         switch (props.fill) {
//             case 'outlined': return color
//             default: return 'transparent'
//         }
//     }
//     };
//     border-radius: ${props => {
//         switch (props.curve) {
//             case 'square': return 'unset'
//             case 'curved': return '8px'
//             case 'round': return '40px'
//             case 'cercle': return '100%'
//             default: return 'unset'
//         }
//     }
//     };

//     &:hover{
//         background-color: ${props => {
//         const color = props.theme.palette.hover[props.color]
//         if (props.disabled) return
//         switch (props.fill) {
//             case 'filled': return color
//             default: return 'unset'
//         }
//     }
//     };
//         color: ${props => {
//         if (props.disabled) return
//         const color = props.theme.palette[props.color]
//         const contrast = props.theme.palette.contrast[props.color]
//         switch (props.fill) {
//             case 'filled': return contrast
//             case 'outlined':
//             case 'text':
//                 return color
//             default: return
//         }
//     }
//     };
//     }
// `
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
    filled,
    outlined,

    fullHeight,
    height,
    fullWidth,
    width,

    margins,
    visible,
    hidden,
    onClick,
    s, m, l,
    color = 'dark',
    size = 'm',


    curve = 'curved',

    children,
    iconOnly,
}) => {
    const { theme } = useTheme()

    const colorContrast = (value) => {
        if (Object.keys(theme.palette.contrast).includes(value)) return theme.palette.contrast[value]
        return value
    }
    const colorHover = (value) => {
        if (Object.keys(theme.palette.hover).includes(value)) return theme.palette.hover[value]
        return value
    }
    const sizesPadding = !fullHeight && {
        s: '6px 14px',
        m: '8px 20px',
        l: '10px 24px',
    }
    const sizesFont = {
        s: '12px',
        m: '18px',
        l: '22px',
    }
    return <Box
        as='button'
        align='center'
        direction='h'

        color={filled ? colorContrast(color) : outlined ? color : ''}
        background={filled ? color : ''}
        paddings={sizesPadding[size]}
        margins={margins}

        border={{
            color: outlined ? color : 'transparent',
            width: '1px',
            style: 'solid',
        }}
        curve={curve}
        children={iconOnly ? <Icon fa={iconOnly} /> : children}
        hover={{
            background: filled ? colorHover(color) : '',
            border: {
                color: outlined ? colorHover(color) : 'transparent',
            },
        }}

        height={fullHeight && '100%' || height || ''}
        width={fullWidth && '100%' || width || 'fit-content'}
        font={{
            size: sizesFont[size]
        }}
        cursor='pointer'
        visible={visible} hidden={hidden}
        onClick={onClick}
    />

}
export default Component