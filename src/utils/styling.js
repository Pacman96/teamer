import classNames from "classnames"

export const cs = (
    props,
    categories = ['all'],
    extraClassname
) => {
    const state = categories.includes('state') || (categories.includes('all') || categories === 'al') ? [
        { err: props?.isErr },
        { loading: props?.loading },
        { selected: props?.selected }
    ] : []
    const position = categories.includes('position') || (categories.includes('all') || categories === 'al') ? [
        { vertical: props?.vertical },
    ] : []
    const bg = categories.includes('bg') || (categories.includes('all') || categories === 'al') ? [
        { 'bg-pri': props?.bg === 'primary' },
        { 'bg-sec': props?.bg === 'secondary' },
        { 'bg-dang': props?.bg === 'danger' },
        { 'bg-warn': props?.bg === 'warning' },
        { 'bg-succ': props?.bg === 'success' },
        { 'bg-infos': props?.bg === 'infos' },
        { 'bg-dark': props?.bg === 'dark' },
        { 'bg-light': props?.bg === 'light' },
    ] : []
    const c = categories.includes('c') || (categories.includes('all') || categories === 'al') ? [
        { 'c-pri': props?.c === 'primary' },
        { 'c-sec': props?.c === 'secondary' },
        { 'c-dang': props?.c === 'danger' },
        { 'c-warn': props?.c === 'warning' },
        { 'c-succ': props?.c === 'success' },
        { 'c-infos': props?.c === 'infos' },
        { 'c-dark': props?.c === 'dark' },
        { 'c-light': props?.c === 'light' },
    ] : []
    const sizes = categories.includes('sizes') || (categories.includes('all') || categories === 'al') ? [
        { 's': props?.size === 's' },
        { 'm': props?.size === 'm' },
        { 'l': props?.c === 'l' },
    ] : []
    const global = [
        { block: props?.block }
    ]
    return classNames(
        extraClassname,
        ...state,
        ...position,
        ...bg,
        ...c,
        ...sizes,
        ...global
    )
}
