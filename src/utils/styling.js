import classNames from "classnames"

export const cs = (
    props,
    categories = ['all'],
    extraClassname
) => {
    const state = categories.includes('state') || categories.includes('all') ? [
        { err: props.isErr },
        { loading: props.loading },
        { selected: props.selected }
    ] : []
    const position = categories.includes('position') || categories.includes('all') ? [
        { vertical: props.vertical },
    ] : []
    const bg = categories.includes('bg') || categories.includes('all') ? [
        { 'bg-pri': props.bg === 'primary' },
        { 'bg-sec': props.bg === 'secondary' },
        { 'bg-dang': props.bg === 'danger' },
        { 'bg-warn': props.bg === 'warning' },
        { 'bg-succ': props.bg === 'success' },
        { 'bg-infos': props.bg === 'infos' },
        { 'bg-dark': props.bg === 'dark' },
        { 'bg-light': props.bg === 'light' },
    ] : []
    const global = [
        { block: props.block }
    ]
    return classNames(
        extraClassname,
        ...state,
        ...position,
        ...bg,
        ...global
    )
}
