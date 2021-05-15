import classNames from "classnames"

const LongTextInput = ({
    size , variation,
    loading, disabled,
    onChange, value,
    ...rest
}) => {
    const change = e => onChange(e.target.value)

    return (
        <textarea
            className={classNames('longTextInput loadable disablable',
                { loading },
                { disabled },
                { sm: size === 's' },
                { md: size === 'm' || size === ''},
                { lg: size === 'l' },
                { "primary-bg": variation === 'primary' },
                { "secondary-bg": variation === 'secondary' },
                { "warning-bg": variation === 'warning' },
                { "success-bg": variation === 'success' },
                { "danger-bg": variation === 'danger' },
                { "infos-bg": variation === 'infos' },
                { 'light-bg': variation === 'light' || variation === ''},
                { 'dark-bg': variation === 'dark' },
                { 'ghost-bg': variation === 'ghost'  },
            )}
            value={value}
            onChange={change}
            disabled={loading || disabled}
            {...rest} />

    )
}

export default LongTextInput