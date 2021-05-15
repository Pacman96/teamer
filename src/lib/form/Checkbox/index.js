import classNames from "classnames"

const Checkbox = ({
    label, checked, toggle,
    loading, disabled,
    bordered,
    size , variation = 'light',

}) => {
    return (
        <div className={classNames('checkbox loadable disablable activable hoverable',
            { checked },
            
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
            { active: checked },
            { bordered }
        )}  >
            <div className='loader'></div>
            {/* <div className='pfx' onClick={toggle}>{checked ? 'checked' : 'unchecked'}</div> */}
            <div className='label' onClick={toggle}>{label}</div>
        </div>
    )
}

export default Checkbox