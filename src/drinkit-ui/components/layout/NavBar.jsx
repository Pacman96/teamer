import { useState } from 'react'
import { useHistory } from 'react-router'
import styled, { css } from 'styled-components'
import { Box, Button } from '../'
import { useTheme } from "../../apis/theme"

const defaultHeight = '60px'


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
    align-items: center;

`
export const NavBar = ({
    template = 1,
    backgroundColor = 'dark',
    togglerColor = '',
    fixed,
    height = defaultHeight,

    visible = true,

    logo,
    actions,
    items = [],

    ...rest
}) => {
    const his = useHistory()
    const [collapsed, setCollapsed] = useState(true)

    const Root = ({ children }) => <Box
        as='header'
        height={height}
        background={{ color: backgroundColor }}
        direction='h'
        position={{ type: fixed ? 'absolute' : 'relative', top: '0', left: '0', right: '0' }}
    >
        {children}
    </Box>
    const hamburger = <Button
        iconOnly={collapsed ? 'bars' : 'cross'}
        height={height}
        width={height}
        filled size='l'
        color={togglerColor}
        curve='square'
        onClick={() => setCollapsed(!collapsed)}
        l={{
            hidden: true
        }}
    />
    const navigation = <Box
        direction='h'
        align='center'
        style={{ flex: 1 }}
        children='Menu'
    />
    const $actions = <Box
        direction='h'
        children={actions}
    />
    const $logo = <Box
        onClick={() => his.push('/')}
        align='center'
        direction='h'
        children={logo}
    />

    // const navigation = <Items {...itemsProps}>
    //     {items.length > 0 && items.map((item, key) => {
    //         const onClick = () => {
    //             item.path && his.push(item.path)
    //             item.click && item.click()
    //             setCollapsed(true)
    //         }
    //         return <Item key={key} onClick={onClick} >
    //             <ItemIcon children={item.icon} />
    //             <ItemLabel children={item.label} />
    //         </Item>
    //     })}
    // </Items>



    if (template === 1)
        return <Root >
            {hamburger}
            {$logo}
            {navigation}
            {$actions}
        </Root>

    if (template === 2)
        return <Root >
            {hamburger}
            {navigation}
            {$actions}
            {$logo}
        </Root>

    if (template === 3)
        return <Root >
            {hamburger}
            {$logo}
            {navigation}
            {$actions}
        </Root>

    return (
        <Root >
            Please choose a template
        </Root>
    )
}

export default NavBar