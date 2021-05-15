import { useEffect, useState } from 'react'
import Button from '../button'
import Group from '../layout/group'
import Block from '../block'



const Tabbed = ({
    variation,
    headVariation,
    bodyVariation,

    buttonVariation,
    buttonSize,

    disabled,
    tabs = [],
    title,
    loading,
    ...rest
}) => {
    const [id, setIndex] = useState(0)
    const Component = tabs[id].component

    useEffect(() => {

    }, [tabs])
    return (
        <Block vertical variation={variation} className='card-tabbed' >
            <Block variation={headVariation} size='s' jc={title ? 'space-between' : 'center'} ai='center' loading={loading}>
                {title ?
                    <>
                        <Block >
                            {title}
                        </Block>
                        <span></span>
                        <Group collapsed>
                            {tabs.map((tab, index) => <Button
                                key={index}
                                disabled={disabled}
                                label={tab.label}
                                size={buttonSize || 's'}
                                variation={buttonVariation}
                                active={id === index}
                                onClick={() => setIndex(index)}
                            />)}
                        </Group>
                    </>
                    :
                    <Group collapsed >
                        {tabs.map((tab, index) => <Button
                            key={index}
                            disabled={disabled}
                            label={tab.label}
                            size={buttonSize || 's'}
                            variation={buttonVariation}
                            active={id === index}
                            onClick={() => setIndex(index)}
                        />)}
                    </Group>

                }


            </Block>
            <Block variation={bodyVariation}  {...rest}>
                {<Component /> || tabs[id].content || ''}
            </Block>

        </Block>
    )
}

const Expandable = ({
    variation,
    headVariation,
    bodyVariation,
    expanderVariation,

    disabled,
    loading,
    size,
    children,
    title
}) => {
    const [open, setOpen] = useState(false)
    return (
        <Block vertical variation={variation} className='card-expandable' >
            <Block variation={headVariation} size='s' jc='center' ai='center' loading={loading}>
                <Block >
                    {title}
                </Block>
                <span></span>
                <Button
                    disabled={disabled}
                    icon='x'
                    size='s'
                    variation={expanderVariation}
                    active={open}
                    onClick={() => setOpen(!open)} />
            </Block>
            {open && <Block size={size} disabled={disabled} loading={loading} variation={bodyVariation}>
                {children}
            </Block>}

        </Block>
    )
}

const Card = {
    Expandable,
    Tabbed
}

export default Card