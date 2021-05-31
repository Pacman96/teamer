import styled from 'styled-components'
import { useTheme } from '../apis/theme'

// const bg = ${props => props.theme.palette[props.color]}
const MainStyled = styled.main`
    margin-top:  ${props => props.fixedHeader ? props.headerHeight : '0px'};
    min-height: calc(100vh - ${props => props.fixedHeader ? props.headerHeight : '0px'});
    background-color: ${props => props.theme.palette[props.color]} ;
    overflow-y: auto;

    ::-webkit-scrollbar { 
        width: ${props => props.scrollbarWidth};
     }
     ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.palette[props.scrollbarBackground]};
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.palette[props.scrollbarColor]};
    }
`

const Main = ({
    headerHeight = '0px',
    fixedHeader = false,
    color,
    scrollbarColor = 'primary',
    scrollbarBackground = '',
    scrollbarWidth = '0.5rem',
    ...rest
}) => {
    const { theme } = useTheme()
    return <MainStyled
        theme={theme}

        color={color}

        headerHeight={headerHeight}
        fixedHeader={fixedHeader}

        scrollbarColor={scrollbarColor}
        scrollbarBackground={scrollbarBackground}
        scrollbarWidth={scrollbarWidth}

        {...rest}
    />
}

export default Main