import classNames from "classnames"

const NumericInput = ({
    sfx, pfx,
    size , variation,
    loading, disabled,
    onChange, value,
    ...rest
}) => {
    const change = e => onChange(e.target.value)

    return (
        <div className={classNames('numericInput loadable disablable',
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
        )}>
            <div className='loader'></div>
            {pfx && <div className='pfx'>{pfx}</div>}
            <input
            type='number'
                value={value}
                onChange={change}
                {...rest} />

            {sfx && <div className='sfx'>{sfx}</div>}
        </div>
    )
}

export default NumericInput