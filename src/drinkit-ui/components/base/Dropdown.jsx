import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../apis/theme'
import { Box } from '../'
import styled from 'styled-components'

const Root = styled(Box)`
    position : relative;
`
export const Dropdown = ({
    defaultOpen = false,
    onOpen,
    onClose,
    onToggle,
    toggler,

    togglerProps,
    rootProps,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)


    const node = useRef();

    const open = () => {
        setIsOpen(true)
        onOpen && onOpen()
    }
    const close = () => {
        setIsOpen(false)
        onClose && onClose()
    }
    const toggle = () => {
        if (isOpen) close()
        if (!isOpen) open()
        onToggle && onToggle()
    }


    useEffect(() => {
        if (defaultOpen === true) open()
        if (defaultOpen === false) close()
    }, [defaultOpen])


    const handleClick = e => {
        if (node.current?.contains(e.target)) {
          return;
        }
        // outside click 
        if (isOpen) {
return            close()
            
        }
      };
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
      }, []);

    return (
        <Box
            position='relative'
            {...rootProps}
        >
            <Box
                onClick={toggle}
                children={toggler}
                {...togglerProps}
            />
            <Box
                ref={node}
                position='absolute'
                visible={isOpen}
                vertical
                {...props}
            />
        </Box>
    )
}
