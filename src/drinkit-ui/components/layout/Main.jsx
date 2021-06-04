import styled from 'styled-components'

const MainStyled = styled.main`
    margin-top:  ${props => props.fixedHeader ? props.headerHeight : '0px'};
    min-height: calc(100vh - ${props => props.fixedHeader ? props.headerHeight : '0px'});
`
const Main = ({  headerHeight = '0px',   fixedHeader = false,  ...rest }) => {
    return <MainStyled headerHeight={headerHeight} fixedHeader={fixedHeader}  {...rest} />
}

export default Main