import classNames from "classnames"


const Group = ({ children, collapsed, jc = 'center', size = 'm', vertical }) => {
    return (
        <div className={
            classNames(
                'group',
                { collapsed },
                { vertical },
                { sm: size === 's' },
                { md: size === 'm' },
                { lg: size === 'l' },
            )}
            style={{
                justifyContent: jc,
            }}>
            {children}
        </div>
    )
}


export default Group