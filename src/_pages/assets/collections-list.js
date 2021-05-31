
import { useAssets } from "../../api/assets"
import { useState } from "react"
import { useTheme } from "../../drinkit-ui/apis/theme"
import { Button } from "../../drinkit-ui/components"
import { CollapsibleCard } from "../../drinkit-ui/components/CollapsibleCard"
import { Box, Icon } from "../../drinkit-ui/components/base"

export const ItemChild = ({
    initial,
    isLast
}) => {
    return (
        <Box
            fullWidth
            hoverable
            fill='filled'
            color='light2'
            paddings='5px 10px'
            style={{
                borderBottomLeftRadius: isLast && 'inherit',
                borderBottomRightRadius: isLast && 'inherit',
            }}
        >
            {initial.label}
        </Box>
    )
}





export const Item = ({
    initial,
    currentOpen,
    onAttributeOpen,

}) => {
    const { theme } = useTheme()
    const [editMode, setEditMode] = useState(false)
    const [edited, setEdited] = useState(false)



    return <CollapsibleCard
        openOnHover
        defaultOpen={currentOpen}
        onOpen={onAttributeOpen}
        style={{ marginBottom: 10 }}

        headColor='light'
        headHeight='50px'
        headPaddings='0 15px'
        hideHeadRightOnClosed

        midColor='light2'
        midPaddings='0'

        headLeft={
            <Button
                visible={editMode}
                icon='trash'
                style={{ marginRight: 10 }} size='s' curve='cercle' color='danger'
            />
        }
        headContent={initial.label}
        headRight={
            <>
                <Button
                    text='Edit mode'
                    style={{ marginLeft: 10 }} size='s' curve='round' color={editMode ? 'secondary' : 'teritary'}
                    onClick={() => setEditMode(!editMode)}
                />
                <Button
                    visible={editMode}
                    icon='plus'
                    style={{ marginLeft: 10 }} size='s' curve='round' color='success'
                />
            </>
        }

        midContent={initial.children.map((child, key) => <ItemChild
            initial={child}
            key={key}
            isLast={(key + 1) === initial.children.length}

        />)}
        midVertical
    />
}

export const AssetsCollectionsPage = () => {
    const { collections } = useAssets()
    const [selected, setSelected] = useState(0)

    return <div>
        <Box align='right' margins='0 0 10px'>

            <Button
                color='primary'
                text='New collection'
                curve='round'
                before={<Icon fa='plus' style={{ marginRight: 10 }} />}
            />
        </Box>


        {collections.list.map((item, index) => <Item
            initial={item}
            index={index}
            currentOpen={selected === index}
            onAttributeOpen={() => setSelected(index)}
        />)}
    </div>
    
}
