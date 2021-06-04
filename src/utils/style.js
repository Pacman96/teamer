import { css } from "styled-components"

const isFullObj = value => (typeof value === 'object' && value !== null && Object.values(value).filter(value => !!value).length > 0) ? true : false
const isStr = value => typeof value === 'string' ? true : false
const isNum = value => typeof value === 'number' ? true : false
const isNumStr = value => (isStr(value) || isNum(value)) ? true : false

const px = (value) => {
    if (typeof value === 'number') return value + 'px'
    if (typeof value === 'string') return value
    return 'Couldnt format'
}
const color = (value, theme) => {
    if (Object.keys(theme.palette).includes(value)) return theme.palette[value]
    return value
}
const grad = (value, theme) => `linear-gradient(${value[2] || 'to right'}, ${color(value[0], theme)}, ${color(value[1], theme)})`
const trbl = (value) => `${px(value?.top || 0)} ${px(value?.right || 0)} ${px(value?.bot || 0)} ${px(value?.left || 0)}`
const wsc = (value, theme) => `${px(value?.width)} ${value?.style} ${color(value?.color, theme)}`

const radius = (value, theme) => {
    if (Object.keys(theme.borders).includes(value)) return theme.borders[value]
    return px(value)
}



export const attrsCss = {
    dimensions: (props) => css`
        ${isNumStr(props?.width) && `width: ${px(props?.width)};`}
        ${props?.width?.value && `min-width: ${px(props?.width?.value)};`}
        ${props?.width?.min && `min-width: ${px(props?.width?.min)};`}
        ${props?.width?.max && `max-width: ${px(props?.width?.max)};`}

        ${isNumStr(props?.height) && `height: ${px(props?.height)};`}
        ${props?.height?.value && `min-height: ${px(props?.height?.value)};`}
        ${props?.height?.min && `min-height: ${px(props?.height?.min)};`}
        ${props?.height?.max && `max-height: ${px(props?.height?.max)};`}

        ${isNumStr(props?.paddings) && `padding: ${px(props?.paddings)};`}
        ${isFullObj(props?.paddings) && `padding: ${trbl(props?.paddings)};`}

        ${isNumStr(props?.margins) && `margin: ${px(props?.margin)};`}
        ${isFullObj(props?.margins) && `margin: ${trbl(props?.margin)};`}

        &:hover {
            ${isNumStr(props?.hover?.width) && `width: ${px(props?.hover?.width)};`}
            ${props?.hover?.width?.value && `min-width: ${px(props?.hover?.width?.value)};`}
            ${props?.hover?.width?.min && `min-width: ${px(props?.hover?.width?.min)};`}
            ${props?.hover?.width?.max && `max-width: ${px(props?.hover?.width?.max)};`}
    
            ${isNumStr(props?.hover?.height) && `height: ${px(props?.hover?.height)};`}
            ${props?.hover?.height?.value && `min-height: ${px(props?.hover?.height?.value)};`}
            ${props?.hover?.height?.min && `min-height: ${px(props?.hover?.height?.min)};`}
            ${props?.hover?.height?.max && `max-height: ${px(props?.hover?.height?.max)};`}
    
            ${isNumStr(props?.hover?.paddings) && `padding: ${px(props?.hover?.paddings)};`}
            ${isFullObj(props?.hover?.paddings) && `padding: ${trbl(props?.hover?.paddings)};`}
    
            ${isNumStr(props?.hover?.margins) && `margin: ${px(props?.hover?.margin)};`}
            ${isFullObj(props?.hover?.margins) && `margin: ${trbl(props?.hover?.margin)};`}
        }
    `,
    coloring: (props) => css`
        ${props?.color && `color: ${color(props?.color, props?.theme)};`}
        ${isStr(props?.background) && `background: ${color(props?.background, props?.theme)};`}
        ${props?.background.image && `background-image: url("${props?.background.image}");`}
        ${props?.background?.gradient?.length > 1 && `background: ${grad(props?.background.gradient, props?.theme)};`}
        ${props?.background.color && `background-color: ${color(props?.background.color, props?.theme)};`}
        &:hover {
            ${props?.hover?.color && `color: ${color(props?.hover?.color, props?.theme)};`}
            ${isStr(props?.hover?.background) && `background: ${color(props?.hover?.background, props?.theme)};`}
            ${props?.hover?.background.image && `background-image: url("${props?.hover?.background.image}");`}
            ${props?.hover?.background?.gradient?.length > 1 && `background: ${grad(props?.hover?.background.gradient, props?.theme)};`}
            ${props?.hover?.background.color && `background-color: ${color(props?.hover?.background.color, props?.theme)};`}
        }
     `,
    direction: (props) => css`
        ${isStr(props?.display) && `display: ${props?.display};`}
        ${props?.display === true || ['h', 'v'].includes(props?.direction) && `display: flex;`}
        ${props?.display === false && `display: none;`}
        ${props?.direction === 'h' && `flex-direction: row;`}
        ${props?.direction === 'v' && `flex-direction: column;`}
        ${props?.align === 'center-v' && `align-items: center;`}
        ${props?.align === 'center-h' && `justify-content: center;`}
        ${props?.align === 'center' && `
            justify-content: center;
            align-items: center;
        `}
        ${props?.align === 'start' && `justify-content: flex-start;`}
        ${props?.align === 'end' && `justify-content: flex-end;`}
    `,
    borders: (props) => {
        const hasMain = isNumStr(props?.border) || isFullObj(props?.border)
        const hasTop = isNumStr(props?.borderTop) || isFullObj(props?.borderTop)
        const hasLeft = isNumStr(props?.borderLeft) || isFullObj(props?.borderLeft)
        const hasRight = isNumStr(props?.borderRight) || isFullObj(props?.borderRight)
        const hasBottom = isNumStr(props?.borderBot) || isFullObj(props?.borderBot)
        return css`
            ${hasMain && `border: ${wsc(props?.border, props?.theme)};`}
            ${hasTop && `border-top: ${wsc(props?.borderTop, props?.theme)};`}
            ${hasLeft && `border-left: ${wsc(props?.borderLeft, props?.theme)};`}
            ${hasRight && `border-right: ${wsc(props?.borderRight, props?.theme)};`}
            ${hasBottom && `border-bottom: ${wsc(props?.borderBot, props?.theme)};`}
        `
    },
    curviness: (props) => css`
        ${isNumStr(props?.curve) && `border-radius: ${radius(props?.curve, props?.theme)};`}
        ${isFullObj(props?.curve) && `border-radius: ${trbl(radius(props?.curve, props?.theme))};`}
    `,
    position: (props) => css`
        ${props?.position?.type && `position: ${props?.position?.type};`}
        ${props?.position?.top && `top: ${px(props?.position?.top)};`}
        ${props?.position?.left && `left: ${px(props?.position?.left)};`}
        ${props?.position?.right && `right: ${px(props?.position?.right)};`}
        ${props?.position?.bot && `bottom: ${px(props?.position?.bot)};`}
    `,
}
