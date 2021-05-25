import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useAssets } from "../../api/assets"
import { Button } from "../../drinkit-ui/cta"
import { Page } from "../../drinkit-ui/sections"

const AttributeSingle = () => {
    const his = useHistory()
    const { attributes } = useAssets()
    const { attributeID } = useParams()
    const [ready, setReady] = useState(false)
    const [attribute, setAttribute] = useState()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setReady(false)
        attributes.get(attributeID).then(res => {
            setAttribute(res)
            setReady(true)
        })
    }, [])

    const reset = () => null
    const save = () => {
        setEditMode(false)
    }
    const remove = () => attributes.remove(attributeID).then(() => his.goBack())
    return (
        <Page
            loading={!ready}
            title={attribute ? attribute.label : 'Error getting attribute'}
            back={ready && attribute}
            nextProps={{ style: { display: 'flex' } }}
            next={
                ready && attribute &&
                <>
                    <Button fill theme='danger'
                        children='Remove'
                        onClick={remove}
                        className='mr-xs'
                    />
                    <Button fill theme='light'
                    visible={editMode}
                        children='Reset'
                        onClick={reset}
                        className='mr-xs'
                    />
                    <Button fill theme={editMode ? 'success' : 'primary'}
                        children={editMode ? 'Save changes' : 'Edit'}
                        onClick={() => editMode ? save() : setEditMode(true)}
                        before={<span className={editMode ? 'fas fa-save mr-sm' : 'fas fa-edit mr-sm'} />}
                    />
                </>
            }
        >

        </Page>
    )
}


export default AttributeSingle