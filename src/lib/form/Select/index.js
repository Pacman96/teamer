import classNames from "classnames"


const Select = ({
    options = [], onSelect,
    size, variation,
    loading, disabled,
}) => {
    return (
        <select className={classNames('select loadable disablable',
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
        onChange={e => onSelect(e.target.value)}
        >
            <div className='loader'></div>

            {options.length > 0 && options.map(i => <option value={i.value} >{i.label}</option>)}
        </select>
    )
}

export default Select