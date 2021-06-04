import styled, { css } from 'styled-components'
import { useTheme } from '../../apis/theme'
import { attrsCss } from '../../../utils/style'




const isFullObj = value => (Object.values(value).filter(value => !!value).length > 0) ? true : false
const isNumStr = value => (typeof value === 'string' || typeof value === 'number') ? true : false

const formatPixel = (value) => {
    if (typeof value === 'number') return value + 'px'
    if (typeof value === 'string') return value
    return 'Couldnt format'
}
const getColor = (value, theme) => {
    if (Object.keys(theme.palette).includes(value)) return theme.palette[value]
    return value
}



const getStyleValue = (value) => {
    if (typeof value === 'number') return value + 'px'
    return value
}

const getRadiusValue = (value, theme) => {
    if (Object.keys(theme.borders).includes(value)) return theme.borders[value]
    switch (value) {
        case 'cercle': return '100%'
        case 'round': return '50px'
        case 'square': return 'unset'
        default: return getStyleValue(value)
    }
}
const getColorValue = (value, theme) => {
    // Theme pre defined labels
    if (Object.keys(theme.palette).includes(value)) return theme.palette[value]
    // Acceptable CSS value
    return getStyleValue(value)
}
const getFontValue = (value, theme) => {
    if (Object.keys(theme.sizes.font).includes(value)) return theme.sizes.font[value]
    getStyleValue(value)
    return value
}
const getHeightWidth = (value, field) => {
    if (Object.keys(value).length > 0)
        return getStyleValue(value[field])
    getStyleValue(value)
    return value
}


const cssCurve = css`
    border-radius: ${({ borders, theme }) => getRadiusValue(borders.curve, theme)};
    border-top-left-radius: ${({ borders, theme }) => getRadiusValue(borders.curveTopLeft, theme)};
    border-top-right-radius: ${({ borders, theme }) => getRadiusValue(borders.curveTopRight, theme)};
    border-bottom-right-radius: ${({ borders, theme }) => getRadiusValue(borders.curveBotRight, theme)};
    border-bottom-left-radius: ${({ borders, theme }) => getRadiusValue(borders.curveBotLeft, theme)};
    &:hover {
        border-radius: ${({ bordersHover, theme }) => getRadiusValue(bordersHover.curve, theme)};
        border-top-left-radius: ${({ bordersHover, theme }) => getRadiusValue(bordersHover.curveTopLeft, theme)};
        border-top-right-radius: ${({ bordersHover, theme }) => getRadiusValue(bordersHover.curveTopRight, theme)};
        border-bottom-right-radius: ${({ bordersHover, theme }) => getRadiusValue(bordersHover.curveBotRight, theme)};
        border-bottom-left-radius: ${({ bordersHover, theme }) => getRadiusValue(bordersHover.curveBotLeft, theme)}};
    }
`
const cssBorder = css`
    border-top-style: ${({ borders }) => borders.topStyle};
    border-right-style: ${({ borders }) => borders.rightStyle};
    border-bottom-style: ${({ borders }) => borders.botStyle};
    border-left-style: ${({ borders }) => borders.leftStyle};
    border-style: ${({ borders }) => {
        if (borders.style) return borders.style
        if (borders.color || borders.width) return 'solid'
        return
    }};
    border-top-width: ${({ borders, theme }) => getStyleValue(borders.topWidth, theme)};
    border-right-width: ${({ borders, theme }) => getStyleValue(borders.rightWidth, theme)};
    border-bottom-width: ${({ borders, theme }) => getStyleValue(borders.botWidth, theme)};
    border-left-width: ${({ borders, theme }) => getStyleValue(borders.leftWidth, theme)};
    border-width: ${({ borders }) => {
        if (borders.width) return borders.width
        if (borders.color || borders.style) return '1px'
        return
    }};
    border-top-color: ${({ borders, theme }) => getColorValue(borders.topColor, theme)};
    border-right-color: ${({ borders, theme }) => getColorValue(borders.rightColor, theme)};
    border-bottom-color: ${({ borders, theme }) => getColorValue(borders.botColor, theme)};
    border-left-color: ${({ borders, theme }) => getColorValue(borders.leftColor, theme)};
    border-color: ${({ borders }) => {
        if (borders.color) return borders.color
        if (borders.width || borders.style) return 'transparent'
        return
    }};
    &:hover{
        border-top-style: ${({ bordersHover }) => bordersHover.topStyle};
        border-right-style: ${({ bordersHover }) => bordersHover.rightStyle};
        border-bottom-style: ${({ bordersHover }) => bordersHover.botStyle};
        border-left-style: ${({ bordersHover }) => bordersHover.leftStyle};
        border-style: ${({ bordersHover }) => {
        if (bordersHover.style) return bordersHover.style
        if (bordersHover.color || bordersHover.width) return 'solid'
        return
    }};
        border-top-width: ${({ bordersHover, theme }) => getStyleValue(bordersHover.topWidth, theme)};
        border-right-width: ${({ bordersHover, theme }) => getStyleValue(bordersHover.rightWidth, theme)};
        border-bottom-width: ${({ bordersHover, theme }) => getStyleValue(bordersHover.botWidth, theme)};
        border-left-width: ${({ bordersHover, theme }) => getStyleValue(bordersHover.leftWidth, theme)};
        border-width: ${({ bordersHover }) => {
        if (bordersHover.width) return bordersHover.width
        if (bordersHover.color || bordersHover.style) return '1px'
        return
    }};
        border-top-color: ${({ bordersHover, theme }) => getColorValue(bordersHover.topColor, theme)};
        border-right-color: ${({ bordersHover, theme }) => getColorValue(bordersHover.rightColor, theme)};
        border-bottom-color: ${({ bordersHover, theme }) => getColorValue(bordersHover.botColor, theme)};
        border-left-color: ${({ bordersHover, theme }) => getColorValue(bordersHover.leftColor, theme)};
        border-color: ${({ bordersHover }) => {
        if (bordersHover.color) return bordersHover.color
        if (bordersHover.width || bordersHover.style) return 'transparent'
        return
    }};
    };
    
    `


const cssFont = css`
    font-size: ${({ font, theme }) => getFontValue(font.size, theme)};
`

const cssAlign = css`
    display: ${({ direction }) => direction === 'horizontal' || direction === 'vertical' ? 'flex' : ''};
`
const cssPosition = css`
    position: ${({ position }) => position.type};
    top: ${({ position }) => position.top};
    bottom: ${({ position }) => position.bot};
    left: ${({ position }) => position.left};
    right: ${({ position }) => position.right};
`
const get = {
    hidden: (value) => `
        opacity: ${value === true ? 0 : ''};
        display: ${value === true ? 'none' : ''};
    `,
}
const cssColor = css`
    ${({ s, m, l, theme, color, colorHover }) => `

        ${color && `
            color: ${getColorValue(color, theme)};
        `}
      
    `}
`




export const Styled = styled.div`
    transition: all .5s;
    ${props => props.cursor && css`cursor: ${props.cursor};`}
    ${props => attrsCss.dimensions(props)}
    ${props => attrsCss.coloring(props)}
    ${props => attrsCss.direction(props)}
    ${props => attrsCss.borders(props)}
    ${props => attrsCss.curviness(props)}
    ${props => attrsCss.position(props)}
   
`
// ${({ theme, l }) => `
// @media screen and (max-width: ${theme.bp.l}){
//     ${formatPaddings(l.paddings)}
//     ${formatMargins(l.margins)}
// }
// `}
// ${({ theme, m }) => `
// @media screen and (max-width: ${theme.bp.m}){
//     ${formatPaddings(m.paddings)}
//     ${formatMargins(m.margins)}
// }
// `}
// ${({ theme, s }) => `
// @media screen and (max-width: ${theme.bp.s}){
//     ${formatPaddings(s.paddings)}
//     ${formatMargins(s.margins)}
// }
// `}

// ${({ theme, paddingsHover, marginsHover, borderHover, borderRightHover, borderLeftHover, borderTopHover, borderBotHover }) => `
// &:hover {
//     ${formatPaddings(paddingsHover)}
//     ${formatMargins(marginsHover)}
//     ${formatBorder(theme, borderHover, borderTopHover, borderLeftHover, borderRightHover, borderBotHover)}
// }
// `}


const Component = ({
    paddings = { left: '', right: '', bot: '', top: '' } || '', margins = { left: '', right: '', bot: '', top: '' } || '',
    width = { min: '', max: '', value: '' } || '', height = { min: '', max: '', value: '' } || '',
    color = '', background = { color: '', gradient: [], image: '' } || '',
    direction, display, align, position = { type: '', top: '', left: '', right: '', bot: '' },
    border = { style: '', width: '', color: '' } || '', borderTop = { style: '', width: '', color: '' } || '', borderBot = { style: '', width: '', color: '' } || '', borderLeft = { style: '', width: '', color: '' } || '', borderRight = { style: '', width: '', color: '' } || '',
    curve = { left: '', right: '', bot: '', top: '' } || '',


    hover = {
        paddings: { left: '', right: '', bot: '', top: '' } || '', margins: { left: '', right: '', bot: '', top: '' } || '',
        width: { min: '', max: '', value: '' } || '', height: { min: '', max: '', value: '' } || '',
        color: '', background: { color: '', gradient: [], image: '' } || '',
        direction, display, align, position: { type: '', top: '', left: '', right: '', bot: '' },
        border: { style: '', width: '', color: '' } || '', borderTop: { style: '', width: '', color: '' } || '', borderBot: { style: '', width: '', color: '' } || '', borderLeft: { style: '', width: '', color: '' } || '', borderRight: { style: '', width: '', color: '' } || '',
        curve,
    },

    cursor,
    onClick,
    style,
    children,
}) => {
    const { theme } = useTheme()
    const componentProps = {
        theme,

        paddings, margins,
        width, height,
        color, background,
        direction, display, align, position,
        border, borderBot, borderLeft, borderRight, borderTop,
        curve,

        hover,

        onClick,
        cursor,
        style,
    }


    return <Styled {...componentProps}>
        {children}
    </Styled>
}


export default Component