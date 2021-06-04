import { useAssets } from "../../api/assets"
import { useState } from "react"
import { Button, Text, CollapsibleCard, Box, Icon } from "../../drinkit-ui/components"
import { InputText } from "../../drinkit-ui/components/base"

const ItemChild = ({
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



const Item = ({ initial, currentOpen, onOpen, onRemove }) => {
    const [editMode, setEditMode] = useState(false)
    const [item, setItem] = useState(initial)

    const changed =
        item.label !== initial.label ||
        item.type !== initial.type ||
        item.children?.length !== initial.children?.length

    const undo = () => {
        setItem(initial)
        setEditMode(false)
    }

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
                <Text bold color={changed && 'warning'}>{item.label}</Text>
                <Button
                    visible={!editMode}
                    before={<Icon style={{ marginRight: 5 }} fa='edit' />}
                    text='Edit'
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
                    onClick={undo}
                />
                <Button
                    icon='trash' visible={editMode} curve='cercle'
                    fill='text' color='danger'
                    style={{ marginLeft: 5 }}
                    onClick={() => onRemove(initial.id)}
                />
                <Button
                    icon='plus' visible={editMode} curve='round'
                    fill='text' color='success'
                    style={{ marginLeft: 5 }}
                />
            </>
        }
        midContent={item?.children?.length > 0 && item?.children?.map((child, key) =>
            <ItemChild
                editMode={editMode}
                initial={child}
                key={key}
                isLast={(key + 1) === item.children.length}

            />)}
        midVertical
    />
}



export const Page_AttributesList = () => {
    const { attributes } = useAssets()
    const [selected, setSelected] = useState(0)


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
            onRemove={id => attributes.remove(id)}
        />)}
    </div>

}
