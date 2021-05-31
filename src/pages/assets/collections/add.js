import { useState } from "react"
import { useAssets } from "../../../api/assets"
import { Group } from "../../../drinkit-ui/base"
import { Button, IconButton } from "../../../drinkit-ui/clickers"
import { FormField, FormRow } from "../../../drinkit-ui/form"
import { Page } from "../../../drinkit-ui/sections"


const generateID = (ids) => {
    let id = 1
    for (let index = id; ids.includes(id); index++) {
        id = index
    }
    return id
}

const CollectionAdd = () => {
    const { collections } = useAssets()

    const [variations, setVariations] = useState([])
    const [label, setLabel] = useState('')

    const [loading, setLoading] = useState(false)

    const changeVariation = (key, value) => {
        let data = [...variations]
        data[key].label = value
        setVariations(data)
    }
    const removeVariation = key => setVariations(variations.filter(i => i.id !== key))
    const reset = () => {
        setLabel('')
        setVariations([])
    }
    const add = () => setVariations([...variations, { id: generateID(variations.map(({ id }) => id)), label: '' }])
    const submit = () => {
        setLoading(true)
        collections.add({ label, children: variations }).then(() => reset()).then(() => setLoading(false))
    }
    const props = {
        page: {
            back: true,
            title: 'Collection creator',
            next: <Group>
                <Button text='Reset' onClick={reset} />
                <Button text='Submit' onClick={submit} loading={loading} bg='success' />
            </Group>
        },
        field: {
            label: {   hook: [label, setLabel], loading: loading, }
        }
    }

    return (
        <Page  {...props.page}>
            <FormRow label='Name'>
                <FormField {...props.field.label} />
            </FormRow>
            <FormRow label='Variations'>
                {variations.map((variation, key) => <Group key={variation?.id} className='mb-xs'>
                    <FormField
                        beforeProps={{ style: { fontWeight: 600 } }}
                        hook={[variation?.label, value => changeVariation(key, value)]}
                        before={variation?.id}
                        loading={loading}
                    />
                    <IconButton
                        icon='minus'
                        bg='danger'
                        onClick={() => removeVariation(variation?.id)}
                        loading={loading}
                    />
                </Group>

                )}
            </FormRow>

            <Button onClick={add} size='lg' className='mt-xxl' fill theme='primary' block isLoading={loading}> New sub collection </Button>
        </Page>
    )
}

export default CollectionAdd