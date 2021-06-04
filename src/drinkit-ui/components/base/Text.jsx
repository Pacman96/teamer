import styled from 'styled-components'
import { useTheme } from '../../apis/theme'

const TextProps = styled.span`
    color : ${props => props.theme.palette[props.color] || 'inherit'};
    font-size: ${props => props.theme.sizes.font[props.size] || 'inherit'};
    line-height: ${props => props.theme.sizes.line[props.size] || 'inherit'};
    font-weight: ${props => props.bold && '600'};
    font-style: ${props => props.italic && 'oblique'};
    text-decoration: ${props => props.underlined ? 'underline' : props.deleted && 'line-through'};

`

const Text = ({color, size, bold, italic, underlined, deleted, ...rest }) => {
    const { theme } = useTheme()
    return <TextProps
        theme={theme}
        size={size}
        bold={bold}
        underlined={underlined}
        deleted={deleted}
        color={color}
        {...rest}
    />
}

export default Text