import { useState } from "react"
import { useAssets } from "../../api/assets"
import { Group } from "../../drinkit-ui/base"
import { Button, IconButton } from "../../drinkit-ui/clickers"
import { FormField, FormRow, Input, Select } from "../../drinkit-ui/form"
import { Page } from "../../drinkit-ui/sections"


const generateID = (ids) => {
    let id = 1
    for (let index = id; ids.includes(id); index++) {
        id = index
    }
    return id
}

const AttributesAdd = () => {
    const { attributes } = useAssets()

    const [variations, setVariations] = useState([])
    const [label, setLabel] = useState('')
    const [type, setType] = useState('')

    const [loading, setLoading] = useState(false)

    const changeVariation = (key, value, field) => {
        let data = [...variations]
        data[key][field] = value
        setVariations(data)
    }
    const removeVariation = key => setVariations(variations.filter(i => i.id !== key))
    const reset = () => {
        setType('')
        setLabel('')
        setVariations([])
    }
    const add = () => setVariations([...variations, { id: generateID(variations.map(({ id }) => id)), label: '', payload: '' }])
    const submit = () => {
        setLoading(true)
        attributes.add({ label, type, variations }).then(() => reset()).then(() => setLoading(false))
    }


    const props = {
        page: {
            back: true,
            title: 'Attribute creator',
            next: <Group>
                <Button text='Reset' onClick={reset} />
                <Button text='Submit' onClick={submit} loading={loading} bg='success' />
            </Group>
        },
        field: {
            label: {
                value: label,
                onChange: value => setLabel(value),
                loading: loading,
            }
        }
    }
    return (
        <Page {...props.page}>
            <FormRow label='Name'>
                <FormField {...props.field.label} />
            </FormRow>

            <FormRow label='Variations'>
                {variations.map((variation, key) => <Group key={variation?.id} className='mb-xs'>
                    <FormField
                        beforeProps={{ style: { fontWeight: 600 } }}
                        before={variation?.id}
                        value={variation?.label}
                        onChange={value => changeVariation(key, value, 'label')}
                        loading={loading}
                    />
                    <FormField
                        value={variation?.payload}
                        onChange={value => changeVariation(key, value, 'payload')}
                        hidden={!type}
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
            <Button onClick={add} className='mt-xxl' fill theme='primary' block isLoading={loading}> New variation </Button>
        </Page>
    )
}

export default AttributesAdd