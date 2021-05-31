import styled from 'styled-components'
import { useTheme } from '../apis/theme'

export const BoxProps = styled.div`
    cursor: ${({ hoverable }) => hoverable && 'pointer'};

    display: ${({ hidden, visible }) => hidden || !visible ? 'none' : 'flex'};

    flex-direction: ${({ vertical }) => vertical && 'column'};
    justify-content: ${({ vertical, align }) => {
        if (align === 'right') return 'flex-end'
        if (align === 'center') return 'center'
        if (align === 'left') return 'flex-start'
        if (align === 'sb') return 'space-between'
        return 'inherit'
    }};
    align-items: center;

    padding: ${({ paddings }) => paddings};
    margin: ${({ margins }) => margins};

    width: ${({ fullWidth, width }) => fullWidth ? '100%' : width};
    min-width: ${({ minWidth }) => minWidth};

    height: ${({ fullHeight, height }) => fullHeight ? '100%' : height};
    min-height: ${({ minHeight }) => minHeight};

    background-color: ${({ fill, theme, color }) => {
        switch (fill) {
            case 'filled':
                return theme.palette[color]
            case 'outlined':
                return theme.palette[color]

            case 'text':
            default:
                return 'inherit'
        }
    }
    };
    color: ${({ fill, theme, color }) => {
        switch (fill) {
            case 'filled':
                return theme.palette.contrast[color]
            case 'outlined':
                return theme.palette[color]
            case 'text':
                return theme.palette[color]
            default:
                return 'inherit'
        }
    }
    };

    border-style : solid;
    border-width: ${({ borderWidth }) => borderWidth};
    border-color: ${({ fill, theme, color, borderColor }) => {
        if (borderColor) return theme.palette[borderColor]
        switch (fill) {
            case 'outlined':
                return theme.palette[color]
            default:
                return 'transparent'
        }
    }};


    &:hover {
        background-color: ${({ fill, theme, color, hoverable }) => {
        if (!hoverable) return
        switch (fill) {
            case 'filled':
                return theme.palette.hover[color]
            case 'outlined':
                return theme.palette.hover[color]
            case 'text':
            default:
                return 'inherit'
        }
    }
    };
        color: ${({ fill, theme, color, hoverable }) => {
        if (!hoverable) return

        switch (fill) {
            case 'filled':
                return theme.palette.contrast[color]
            case 'outlined':
                return theme.palette[color]
            case 'text':
                return theme.palette.hover[color]
            default:
                return 'inherit'
        }
    }
    };
    }
`


export const Box = ({
    hidden = false,
    visible = true,
    vertical,

    paddings,
    margins,

    width,
    minWidth,
    fullWidth,

    height,
    minHeight,
    fullHeight,

    curve,
    color,
    fill,

    borderWidth,
    borderColor,

    hoverable,
    ...rest
}) => {
    const { theme } = useTheme()
    const props = {
        theme,

        hidden,
        visible,
        vertical,

        paddings,
        margins,

        width,
        minWidth,
        fullWidth,

        height,
        minHeight,
        fullHeight,

        curve,
        color,
        fill,

        borderWidth,
        borderColor,

        hoverable,
        ...rest
    }
    return <BoxProps {...props} />
}
export const TextProps = styled.span`
    color : ${props => props.theme.palette[props.color] || 'inherit'};
    font-size: ${props => props.theme.sizes.font[props.size] || 'inherit'};
    line-height: ${props => props.theme.sizes.line[props.size] || 'inherit'};
`
const StyledBefore = styled(BoxProps)`
    > * {
        margin-right: 5px
    }
`
const StyledAfter = styled(BoxProps)`
    > * {
        margin-left: 5px
    }
`

export const Text = ({ size, ...rest }) => {
    const { theme } = useTheme()
    return <TextProps
        theme={theme}
        size={size}
        {...rest}
    />
}

export const Before = (props) => <StyledBefore {...props} />
export const After = (props) => <StyledAfter {...props} />
export const Icon = ({ visible = true, fa, ...rest }) => visible ? <span className={`fas fa-${fa}`} {...rest} /> : null



export const InputText = ({
    long,
    ...rest
}) => {
    const Tag = long ? 'textarea' : 'input'
    const props = {
        ...rest
    }
    return <Tag {...props}  />
}

export const InputNumber = ({
    className,
    style,
    ...rest
}) => {
    const Tag = 'input'
    const props = {
        type: 'number',
        ...rest
    }
    const styles = {
        ...style
    }
    const classes = ''
    return <Tag {...props} className={classes} style={styles} />
}


const StyledButton = styled(BoxProps)`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 0;
    background: unset;
    color: inherit;
    font: inherit;
    cursor: inherit;
    :focus {
        outline: none;
    }
`
export const BaseButton = () => <StyledButton visible={true} />
