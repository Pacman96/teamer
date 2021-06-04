import { useEffect, useState } from "react"
import { useAssets } from "../../api/assets"
import { Button , Box} from "../../drinkit-ui/components"
import { FormField, FormRow } from "../../drinkit-ui/form"
import { generateID } from "../../utils/helpers"

export const Page_AttributeAdd = () => {
    const { attributes } = useAssets()
    const [variations, setVariations] = useState([])
    const [label, setLabel] = useState('')
    const [type, setType] = useState('')
    const [id, setId] = useState(generateID(attributes.list.map(({ id }) => id)))

    useEffect(() => {
        const ID = generateID(attributes.list.map(({ id }) => id))
        setId(ID)
    }, [attributes])


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
        attributes.add(String(id), { label, type, children: variations }).then(() => reset()).then(() => setLoading(false))
    }


    return (
        <>
            <FormRow label='ID' >
                <FormField child='number' hook={[id, () => null]} viewOnly />
            </FormRow>
            <FormRow label='Name'  >
                <FormField hook={[label, setLabel]} />
            </FormRow>
            {loading.toString()}

            <FormRow label='Variations' >
                <Button
                    curve='square'
                    onClick={add}
                    color='dark'
                    text='Add variation'
                    fullWidth
                    fill='outlined'
                    style={{ marginBottom: 10 }}
                />
                {variations.map((variation, key) => <Box key={variation?.id} className='mb-xs'>
                    <FormField
                        beforeProps={{ style: { fontWeight: 600 } }}
                        before={variation?.id}
                        hook={[variation?.label, value => changeVariation(key, value, 'label')]}
                        loading={loading}
                    />
                    <FormField
                        hook={[variation?.payload, value => changeVariation(key, value, 'payload')]}
                        hidden={!type}
                        loading={loading}
                    />
                    <Button
                        icon='minus'
                        color='danger'
                        onClick={() => removeVariation(variation?.id)}
                        style={{ marginLeft: 10 }}
                        curve='cercle'
                    />
                </Box>
                )}

            </FormRow>


            <Box align='sb'>
                <Button text='reset' />
                <Button text='Submit' color='primary' onClick={submit} />
            </Box>
        </>
    )
}
