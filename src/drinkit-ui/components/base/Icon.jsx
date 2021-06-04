const Icon = ({
    visible = true,
    fa,
    ...rest
}) =>
    visible ?
        <span className={`fas fa-${fa}`} {...rest} />
        : null

export default Icon