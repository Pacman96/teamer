import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Button } from '../index'
import { useTheme } from '../../apis/theme'

const Root = styled.footer`
    background-color: ${props => props.theme.palette[props.color]} ;
    color:${props => props.theme.palette.contrast[props.color]};
    
`

const Content = styled.div`
    display: flex;
  
    @media screen and (max-width: ${props => props.theme.bp.l}){
        flex-direction: column;
    }
`
const Meta = styled.div`
    display: flex;
    flex-direction : column;
    align-items: center;

    flex:1;
    padding: 50px;
`
const Logo = styled.div`
    margin-bottom: 15px;
`
const Description = styled.div`
    margin-bottom: 10px;
`
const Socials = styled.div`
    display: flex;
    
`
const Social = styled(Button).attrs({ color: 'secondary' })`
    margin-right: 5px;
`
const Sections = styled.div`
    flex:2;
    display: flex;
    justify-content: space-around;
    padding: 20px;
`
const SectionLabel = styled.div`
    font-weight: 600;
`
const SectionContent = styled.div`

`
const Section = styled.div`

`
const Copyright = styled.div`
    text-align : center;
    padding: 20px;
`
const Footer = ({
    template = 1,
    color,
    logo,
    social,
    description,
    copyright,
    sections,
    ...rest
}) => {
    const his = useHistory()
    const { theme } = useTheme()

    const rootProps = {
        theme,
        color,
        logo,
        social,
        description,
        copyright,
        sections,
        ...rest
    }
    const contentProps = {
        theme,
    }
    const logoProps = {
        children: logo,
        theme,
    }
    const descriptionProps = {
        children: description,
        theme,
    }
    const socialProps = {
        theme,
    }
    const copyrightProps = {
        children: copyright,
        theme,
    }
    return <Root {...rootProps} >
        <Content {...contentProps}>
            <Meta>
                <Logo {...logoProps} />
                <Description {...descriptionProps} />
                <Socials>
                    <Social> s 1</Social>
                    <Social> s 2</Social>
                    <Social> s 3</Social>
                </Socials>
            </Meta>
            <Sections>
                {sections.map((section, key) => <Section key={key}>
                    <SectionLabel children={section.label} />
                    <SectionContent>
                        {section.navigation.map((item, index) =>
                            <div
                                key={index}
                                onClick={() => {
                                    item.path && his.push(item.path)
                                    item.click && item.click()
                                }}
                            >
                                {item.label}
                            </div>)}
                    </SectionContent>
                </Section>)}
            </Sections>
        </Content>
        <Copyright {...copyrightProps} />
    </Root>
}

export default Footer