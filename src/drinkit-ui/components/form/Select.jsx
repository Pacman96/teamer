import { useState } from 'react'
import { Box, Icon } from '..'
import { Dropdown } from '../base/Dropdown'



export const Select = ({ hook = [null, () => null, []], placeholder = 'Please select', multi = false }) => {
    const [dropOpen, setDropOpen] = useState(false)

    const select = id => {
        if (!multi && hook[0] === id) {
            hook[1]('')
            setDropOpen(false)
        }
        if (!multi && hook[0] !== id) {
            hook[1](id)
            setDropOpen(false)
        }
        if (multi && hook[0]?.includes(id)) {
            hook[1](hook[0]?.filter(i => i !== id) || [])
            if (hook[0].length === 1) setDropOpen(false)
        }
        if (multi && !hook[0]?.includes(id)) {
            hook[1]([...hook[0], id])
        }

    }

    const getLabel = () => {
        if (multi && hook[0]?.length > 0)
            return hook[0].map(id => hook[2].filter(i => i.id === id)[0].label).join(', ')
        if (!multi && hook[0])
            return hook[2].filter(i => i.id === hook[0])[0].label
        else return placeholder
    }
    
    return (
        <Dropdown
            defaultOpen={dropOpen}
            toggler={getLabel()}
            onOpen={() => setDropOpen(true)}
            onClose={() => setDropOpen(false)}
            togglerProps={{
                color: 'light',
                fill: 'filled',
                fullWidth: true,
                height: '40px',
                paddings: '0 10px',
                curve: 'curved',
                align: 'sb',
                post: <Icon fa={!dropOpen ? 'chevron-down' : 'chevron-up'} />
            }}
            top='40px'
            width='100%'
            maxHeight='250px'
            curve='curved'
            scrollable
        >
            {hook[2].length > 0 && hook[2].map((option, index) => {
                const isSelected = multi ? hook[0].includes(option?.id) : hook[0] === option?.id
                const isFirst = index === 0
                const isLast = index + 1 === hook[2].length
                return <Box
                    fullWidth
                    hoverable
                    minHeight='40px'
                    paddings='0 10px'
                    fill='filled'
                    color={isSelected ? 'light2' : 'light'}
                    key={index}
                    onClick={() => select(option?.id)}
                    style={{
                        borderBottomLeftRadius: isLast && 'inherit',
                        borderBottomRightRadius: isLast && 'inherit',
                        borderTopLeftRadius: isFirst && 'inherit',
                        borderTopRightRadius: isFirst && 'inherit',
                    }}
                >{option?.label}</Box>
            })}
        </Dropdown>
    )
}
