import { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import styled from 'styled-components'
import { Icon } from '..'
import { useTheme } from '../../apis/theme'

const Root = styled.div`
    min-width : ${props => {
        if (props.collapsible && props.collapsed) return 'unset'
        return props.width
    }};
    height: fit-content;
    margin: ${props => props.margins};
    @media screen and (max-width: ${props => props.theme.bp.m}){
        min-width : ${props => (props.collapsible && props.collapsed) && 'unset'};
    };
`
const Toggler = styled.div`
    cursor: pointer;
    display:${props => props.collapsible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.palette[props.headColor]};
    color: ${props => props.theme.palette.contrast[props.headColor]};
    padding: 10px;
    margin-bottom : 10px;
    @media screen and (max-width: ${props => props.theme.bp.m}){
        display: none;
    }
    border-radius: ${props => {
        switch (props.curve) {
            case 'square': return 'unset'
            case 'curved': return '8px'
            case 'round': return '40px'
            case 'cercle': return '100%'
            default: return 'unset'
        }
    }
    };
`

const Content = styled.div`
    & > :first-child {
        border-top-right-radius: ${props => {
        switch (props.curve) {
            case 'square': return 'unset'
            case 'curved': return '8px'
            case 'round': return '40px'
            case 'cercle': return '100%'
            default: return 'unset'
        }
    }
    }; 
    border-top-left-radius: ${props => {
        switch (props.curve) {
            case 'square': return 'unset'
            case 'curved': return '8px'
            case 'round': return '40px'
            case 'cercle': return '100%'
            default: return 'unset'
        }
    }
    }; 
    }
    & > :last-child {
        border-bottom-right-radius: ${props => {
        switch (props.curve) {
            case 'square': return 'unset'
            case 'curved': return '8px'
            case 'round': return '40px'
            case 'cercle': return '100%'
            default: return 'unset'
        }
    }
    }; 
    border-bottom-left-radius: ${props => {
        switch (props.curve) {
            case 'square': return 'unset'
            case 'curved': return '8px'
            case 'round': return '40px'
            case 'cercle': return '100%'
            default: return 'unset'
        }
    }
    }; 
    }
`
const Item = styled.div`
    cursor: pointer;
    display:flex;
    height: ${props => props.itemHeight};
    background-color:${props => {
        if (props.active) return props.theme.palette[props.itemActiveColor]
        return props.theme.palette[props.itemColor]
    }};
    color:${props => {
        if (props.active) return props.theme.palette.contrast[props.itemActiveColor]
        return props.theme.palette.contrast[props.itemColor]
    }};
    &:hover{
        background-color:${props => {
        if (props.active) return props.theme.palette.hover[props.itemActiveColor]
        return props.theme.palette.hover[props.itemColor]
    }};
    }
`
const ItemIcon = styled.div`
    height :${props => props.itemHeight};
    min-width:${props => props.itemHeight};
    max-width:${props => props.itemHeight};
    display:flex;
    justify-content: center;
    align-items: center;
`
const ItemLabel = styled.div`
    height :${props => props.itemHeight};
    display:${props => (props.collapsible && props.collapsed) ? 'none' : 'flex'};
    padding: ${props => props.noIcon && '0 calc(' + props.itemHeight + ' / 2)'};
    padding-right: ${props => !props.noIcon && 'calc(' + props.itemHeight + ' / 2)'};
    align-items: center;
    @media screen and (max-width: ${props => props.theme.bp.m}){
        display: ${props => props.collapsible && props.collapsed && 'none'};
    }
`

const Sidebar = ({
    defaultCollaped = true,
    collapsible = true,

    navigation = [],
    width = '220px',

    headColor = 'primary',

    itemHeight = '40px',
    itemColor = 'light',
    itemActiveColor = 'secondary',

    curve,
    margins,

    ...rest
}) => {
    const his = useHistory()
    const { pathname } = useLocation()
    const { theme } = useTheme()
    const [collapsed, setCollapsed] = useState(defaultCollaped)


    const rootProps = {
        ...rest, theme,
        curve,
        collapsed, collapsible,
        width, itemHeight,
        margins,
    }
    const togglerProps = {
        theme, headColor, curve,
        children: <Icon fa={!collapsed ? 'plus' : 'minus'} />,
        onClick: () => collapsible && setCollapsed(!collapsed),
        collapsible
    }
    const itemProps = {
        theme, headColor, itemColor, itemActiveColor, itemHeight
    }
    const itemLabelProps = {
        theme, collapsed, collapsible, itemHeight
    }
    const itemIconProps = {
        theme, itemHeight
    }
    return <Root {...rootProps}>
        <Toggler {...togglerProps} />

        <Content curve={curve}>
            {navigation && navigation.map((item, key) => {
                const paths = item.activePaths || []
                const icon = item?.icon || collapsible && 'user'
                const label = item?.label || ''
                const active = item?.active || paths?.includes(pathname)

                const click = () => {
                    item?.path && his.push(item?.path)
                    item?.click && item?.click()
                }
                return <Item key={key} onClick={click} active={active} {...itemProps} >
                    {icon && <ItemIcon {...itemIconProps}>
                        <Icon fa={icon} />
                    </ItemIcon>}
                    {label && <ItemLabel {...itemLabelProps} noIcon={!icon}>{label} </ItemLabel>}
                </Item>
            })}
        </Content>


    </Root>
}

export default Sidebar