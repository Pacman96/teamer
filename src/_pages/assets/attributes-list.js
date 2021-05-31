import { useAssets } from "../../api/assets"
import { useState } from "react"
import { useTheme } from "../../drinkit-ui/apis/theme"
import { Button, Text } from "../../drinkit-ui/components"
import { CollapsibleCard } from "../../drinkit-ui/components/CollapsibleCard"
import { Box, Icon, InputText } from "../../drinkit-ui/components/base"

export const AttributeChild = ({
    initial,
    isLast,
    editMode,
}) => {
    const [label, setLabel] = useState(initial.label)

    return (
        <Box
            fullWidth
            hoverable
            fill='filled'
            color='light2'
            paddings='5px 10px'
            height='50px'
            style={{
                borderBottomLeftRadius: isLast && 'inherit',
                borderBottomRightRadius: isLast && 'inherit',
            }}
        >
            <Text style={{ width: 30 }} bold>{initial.id}</Text>
            <InputText style={{ flex: 1, cursor: !editMode && 'inherit' }} value={initial.label} readOnly={!editMode} />
            <Button visible={editMode} icon='trash' fill='text' color='danger' curve='cercle' style={{ marginLeft: 5 }} />
            <Button visible={editMode} icon='edit' fill='text' color='dark' curve='cercle' style={{ marginLeft: 5 }} />
        </Box>
    )
}





export const Item = ({
    initial,
    currentOpen,
    onOpen,
    remove
}) => {
    const { theme } = useTheme()
    const [editMode, setEditMode] = useState(false)
    const [edited, setEdited] = useState(false)



    return <CollapsibleCard
        openOnHover
        defaultOpen={currentOpen}
        onOpen={onOpen}
        onClose={() => setEditMode(false)}
        style={{ marginBottom: 20 }}

        headColor='light'
        headHeight='55px'
        headPaddings='0 20px'
        hideHeadRightOnClosed

        midColor='light2'
        midPaddings='0'

        headContent={
            <Box align='sb'>
                <Text bold>{initial.label}</Text>
                <Button
                    visible={!editMode}
                    icon="edit"
                    fill={'text'}
                    curve='round'
                    color="dark"
                    onClick={() => setEditMode(!editMode)}
                    style={{ padding: 0, height: 'unset', width: 'unset' }}
                />
            </Box>
        }
        headRight={
            <>
                <Button
                    icon='undo' visible={editMode}
                    fill='text' color='dark'
                    style={{ marginLeft: 5 }} curve='cercle'
                />
                <Button
                    icon='trash' visible={editMode} curve='cercle'
                    fill='text' color='danger'
                    style={{ marginLeft: 5 }}
                    onClick={() => remove(initial.id)}
                />
                <Button
                    icon='plus' visible={editMode} curve='round'
                    fill='text' color='success'
                    style={{ marginLeft: 5 }}
                />
            </>
        }

        midContent={initial.children.map((child, key) => <AttributeChild
            editMode={editMode}
            initial={child}
            key={key}
            isLast={(key + 1) === initial.children.length}

        />)}
        midVertical
    />
}



export const AssetsAttributesPage = () => {
    const { attributes } = useAssets()
    const [selected, setSelected] = useState(0)
    const remove = id => attributes.remove(id)

    return <div
        style={{
            width: '100%',
            maxWidth: 650,
            margin: '0 auto'
        }}
    >
        {attributes.list.map((item, index) => <Item
            initial={item}
            currentOpen={selected === item.id}
            onOpen={() => setSelected(item.id)}
            remove={remove}
        />)}
    </div>

}
