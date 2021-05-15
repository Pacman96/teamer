import classNames from 'classnames'

 const Button = ({
    label, pfx, sfx, icon,
    size, variation , block,
    loading, disabled, active,
    extraClass = {
        root: '',
        label: '',
        pfx: '',
        sfx: '',
    },
    extraStyle = {
        root: {},
        label: {},
        pfx: {},
        sfx: {},
    },
    onClick,
    ...rest
}) => {
    return (
        <button className={
            classNames('btn  loadable disablable hoverable activable',
                extraClass.root,

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
                { loading },
                { disabled },
                { active },

                { iconOnly: icon },
                { block },
            )}
            style={extraStyle.root}
            onClick={onClick}
            {...rest}

        >
            <div className='loader'>loading</div>

            <div className='btn-wrapper'>
                {pfx &&
                    <div
                        className={`pfx ${extraClass.pfx || ''}`}
                        style={extraStyle.pfx}
                    >{pfx}  </div>
                }

                <div
                    className={`label ${extraClass.label || ''}`}
                    style={extraStyle.label}
                >{label}</div>

                {sfx && <div
                    className={`sfx ${extraClass.sfx || ''}`}
                    style={extraStyle.sfx}
                >{sfx}</div>}

            </div>
            <div className='icon-wrapper'>
                <div>{icon}</div>
            </div>
        </button>
    )
}

export default Button