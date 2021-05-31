import styled from "styled-components"
import { useAssets } from "../../api/assets"
import { useHistory } from "react-router"
import { useEffect, useState } from "react"
import { useTheme } from "../../drinkit-ui/apis/theme"
import { Icon } from "../../drinkit-ui/components/base"
import { Button } from "../../drinkit-ui/components"


const ItemRoot = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-start;

    max-height: ${({ isOpen, headHeight, midHeight }) => {
        if (!isOpen) return headHeight
        return '100%'
    }} ;
    transition: all .5s;
    border-radius: 8px;
`
const Head = styled.div`
    display: ${({ hidden }) => !hidden && 'flex'};
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: ${({ height }) => height};
    max-height: ${({ height }) => height};
    padding: ${({ paddings }) => paddings};

    background: ${({ theme, color }) => theme.palette[color]};
    color: ${({ theme, color }) => theme.palette.contrast[color]};

    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom-left-radius: ${({ isOpen }) => isOpen ? '0' : 'inherit'};
    border-bottom-right-radius:${({ isOpen }) => isOpen ? '0' : 'inherit'};
`
const Mid = styled.div`
    width: 100%;
    height: ${({ isOpen, height }) => isOpen ? height : '0'};
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    flex-direction : ${({ vertical }) => vertical && 'column'} ;
    background: ${({ theme, color }) => theme.palette[color]};
    color: ${({ theme, color }) => theme.palette.contrast[color]};
    padding: ${({ paddings }) => paddings};
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
`
const HeadLeft = styled.div`
    display: ${({ hidden }) => !hidden && 'flex'};
    align-items: center;
`
const HeadContent = styled.div`
    flex: 1;
`
const HeadRight = styled.div`
    display: ${({ hidden }) => !hidden && 'flex'};
    align-items: center;
`
export const CollapsibleCard = ({
    hideHeadRightOnClosed,
    hideHeadLeftOnClosed,


    defaultOpen = false,
    openOnHover = true,
    onOpen,
    onClose,
    style,


    headHeight = '50px',
    headPaddings = '0 20px',
    headColor = 'primary',
    headContent = null,
    headRight = null,
    headLeft = null,

    midHeight = '100%',
    midPaddings = '20px',
    midColor = 'light2',
    midContent = null,
    midVertical = true,

}) => {
    const { theme } = useTheme()
    const [isOpen, setIsOpen] = useState(!midContent ? false : defaultOpen)

    const open = () => {
        if (!midContent) return null
        setIsOpen(true)
        onOpen && onOpen()
    }
    const close = () => {
        setIsOpen(false)
        onClose && onClose()
    }

    const rootProps = {
        onMouseEnter: () => openOnHover && open(),
        headHeight, midHeight,
        theme, isOpen,
        style,
    }
    const headProps = {
        theme, isOpen,
        color: headColor,
        height: headHeight,
        paddings: headPaddings,
    }
    const midProps = {
        theme, isOpen,
        color: midColor,
        height: midHeight,
        paddings: midPaddings,
        vertical: midVertical,
    }
    useEffect(() => {
        setIsOpen(!midContent ? false : defaultOpen)
    }, [defaultOpen])

    useEffect(() => {
        if (isOpen === false) {
            onClose && onClose()
        }
    }, [isOpen])
    return (
        <ItemRoot {...rootProps}  >
            <Head {...headProps} >
                <HeadLeft
                    hidden={!headLeft || (hideHeadLeftOnClosed && !isOpen)}
                    children={headLeft}
                />
                <HeadContent
                    children={headContent}
                />
                <HeadRight
                    hidden={!headRight || (hideHeadRightOnClosed && !isOpen)}
                    children={headRight}
                />
            </Head>
            <Mid  {...midProps}>
                {midContent}
            </Mid>
        </ItemRoot>
    )
}
