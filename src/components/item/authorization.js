import Block from "../../lib/block"
import Button from "../../lib/button"

export const AuthorizationItem = ({
    label,
    type,

    canEdit,
    canRevoke,
    onRevoke,
    canAdd,
    onAdd,

    loading
}) => {

    if (type === 'title') return <Block centered size='m' style={{ fontWeight: 600 }}>{label}</Block>
    return <Block
        variation='light' size='s' jc='space-between' ai='center'
        style={{ marginTop: 5, width: '100%' }}
        loading={loading} >
        <span >{label}</span>
        {canEdit && <>
            {canRevoke && <Button
                variation='danger'
                size='s'
                label='Revoke'
                onClick={onRevoke}
                loading={loading}
            />}
            {canAdd && <Button
                variation='success'
                size='s'
                label='Append'
                onClick={onAdd}
                loading={loading}
            />}
        </>}

    </Block>
}

