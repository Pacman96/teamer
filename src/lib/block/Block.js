import classNames from "classnames"


export const Block = ({
    children,
    vertical, centered,
    hoverable, activable, loading, disabled, active,
    bordered,
    size = '', variation ,
    onClick, className, style
}) => {
    return (
        <div
            onClick={onClick}
            className={classNames(
                'block loadable disablable',
                { hoverable },
                { activable },
                { sm: size === 's' },
                { md: size === 'm' },
                { lg: size === 'l' },
                { "primary-bg": variation === 'primary' },
                { "secondary-bg": variation === 'secondary' },
                { "warning-bg": variation === 'warning' },
                { "success-bg": variation === 'success' },
                { "danger-bg": variation === 'danger' },
                { "infos-bg": variation === 'infos' },
                { 'light-bg': variation === 'light' },
                { 'dark-bg': variation === 'dark' },
                { 'ghost-bg': variation === 'ghost'  },
                { loading },
                { disabled },
                { active },
                { bordered },
                className
            )}
            style={{
                flexDirection: vertical ? 'column' : 'row',
                alignItems: centered ? "center" : '',
                justifyContent: centered ? 'center' : '',
                ...style
            }}
        >
            <div className='loader'></div>
            {children}
        </div>
    )
}
