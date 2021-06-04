import styled from 'styled-components'
import { useTheme } from '../apis/theme'




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

