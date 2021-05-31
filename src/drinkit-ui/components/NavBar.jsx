import { useState } from 'react'
import { useHistory } from 'react-router'
import styled, { css } from 'styled-components'
import { Button } from '.'
import { useTheme } from "../apis/theme"

const defaultHeight = '60px'

const Root = styled.header`
    position: ${props => props.fixed ? 'absolute' : 'relative'};
    background-color:${props => props.theme.palette[props.color]};
    color:${props => props.theme.palette.contrast[props.color]};
    z-index: 1;
    height: ${props => props.height || defaultHeight};
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.fixed &&
        css`
          top: 0;
          left:0;
          right: 0; 
        `};
`
const Logo = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: ${props => props.template === 2 ? 'flex-end' : 'flex-start'};
    padding: 15px;
    color: #fff;
    @media screen and (max-width: ${props => props.theme.bp.m}){
       flex : 1;
    }
`
const Items = styled.nav`
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: ${props => {
        if (props.template === 1) return 'center'
        if (props.template === 2) return 'flex-start'
        if (props.template === 3) return 'flex-end'
        return 'inherit'
    }};
    @media screen and (max-width: ${props => props.theme.bp.m}){
        display: ${props => props.collapsed && 'none'};
        justify-content: ${props => !props.collapsed && 'flex-start'};
        position : absolute;
        flex-direction: column;
        background-color: ${props => props.theme.palette[props.color] + 'e8'};
        left: 0;
        right: 0;
        top: ${props => props.height || defaultHeight};
        height: calc(100vh - ${props => props.height || defaultHeight});
    }

`
const Toggler = styled(Button)`
    @media screen and (min-width: ${props => props.theme.bp.m}){
        display: none;
    }
`
const Item = styled.li`
    cursor: pointer;
    padding: 0 10px;
    list-style: none;
  
`
const ItemIcon = styled.div`
    transition: all .2s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`
const ItemLabel = styled.div`
    transition: all .2s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`
const Actions = styled.div`
    display: flex;
`
export const NavBar = ({
    template = 1,
    color = 'secondary',
    fixed,

    visible = true,

    logo,
    actions,
    items = [],

    ...rest
}) => {
    const { theme } = useTheme()
    const his = useHistory()
    const [collapsed, setCollapsed] = useState(true)

    const globalProps = { theme, template, ...rest }

    const rootProps = { ...globalProps, color, fixed, collapsed }
    const togglerProps = {
        ...globalProps,
        onClick: () => setCollapsed(!collapsed),
        fullHeight: true,
        fill: 'text',
        size: 'l',
        icon: 'bars',
        color: 'light2'
    }
    const logoProps = { ...globalProps, children: logo, onClick: () => his.push('/') }
    const itemsProps = { ...globalProps, color, collapsed }
    const actionsProps = { ...globalProps, children: actions }

    const hamburger = <Toggler  {...togglerProps} />

    const navigation = <Items {...itemsProps}>
        {items.length > 0 && items.map((item, key) => {
            const onClick = () => {
                item.path && his.push(item.path)
                item.click && item.click()
                setCollapsed(true)
            }
            return <Item key={key} onClick={onClick} >
                <ItemIcon children={item.icon} />
                <ItemLabel children={item.label} />
            </Item>
        })}
    </Items>

    const $actions = <Actions {...actionsProps} />

    const $logo = <Logo {...logoProps} />

    if (template === 1)
        return <Root {...rootProps}>
            {hamburger}
            {$logo}
            {navigation}
            {$actions}
        </Root>

    if (template === 2)
        return <Root {...rootProps}>
            {hamburger}
            {navigation}
            {$actions}
            {$logo}
        </Root>

    if (template === 3)
        return <Root {...rootProps}>
            {hamburger}
            {$logo}
            {navigation}
            {$actions}
        </Root>

    return (
        <Root {...rootProps}>
            Please choose a template
        </Root>
    )
}

export default NavBar