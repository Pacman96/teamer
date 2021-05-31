
import styled from 'styled-components'

const Root = styled.div`
    display: flex;
    width: 80%;
    margin 40px auto 0;
`
const Children = styled.div`
    flex:1;
    display: flex;
    flex-direction : column;
`

const Content = styled.div`
    flex:1;
    display: flex;
    flex-direction : column;

`

const Page = ({
    children,

    vertical,

    left,
    right,
    top,
    bot,
}) => {
    return <Root>
        {left}

        <Content>
        {top}

            <Children vertical={vertical}>
                {children}
            </Children>
            {right}
        </Content>
        {bot}
    </Root>

}


export default Page