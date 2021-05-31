import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useAssets } from "../../../api/assets"
import { Button } from "../../../drinkit-ui/cta"
import { Page } from "../../../drinkit-ui/sections"

const CollectionSingle = () => {
    const his = useHistory()
    const { collections } = useAssets()
    const {collectionID } = useParams()
    const [ready, setReady] = useState(false)
    const [collection, setCollection] = useState()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setReady(false)
        collections.get(collectionID).then(res => {
            setCollection(res)
            setReady(true)
        })
    }, [])

    const reset = () => null
    const save = () => {
        setEditMode(false)
    }
    const remove = () => collections.remove(collectionID).then(() => his.goBack())
    return (
        <Page
            loading={!ready}
            title={collection ? collection.label : 'Error getting collection'}
            back={ready && collection}
            nextProps={{ style: { display: 'flex' } }}
            next={
                ready && collection &&
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


export default CollectionSingle