import { cs } from "../../utils/styling"

/// To handle many children please use row/col

export const Input = props => <input {...props} />
export const TextArea = props => <textarea {...props} />
export const InputNumber = props => <input type='number' {...props} />
export const Select = props => <input type='number' {...props} />
export const FileInput = props => <input type='file'{...props} placeholder={props.placeholder || 'Click here !'} />

export const FormField = props => {

    const {
        before = props.child === 'upload' ? <span className='fas fa-cloud' /> : '',
        beforeProps,
        after,
        afterProps,
        child = 'text',
        className,
        value,
        onChange,
        placeholder,
        block,
        ...rest
    } = props

    const childProps = {
        value,
        onChange: e => child === 'upload' ? onChange : onChange(e.target.value),
        placeholder,
        disabled: props.loading,
        ...rest
    }

    const content = child === 'text' ? <Input  {...childProps} />
        : child === 'longText' ? <TextArea  {...childProps} />
            : child === 'number' ? <InputNumber  {...childProps} />
                : child === 'upload' ? <FileInput  {...childProps} />
                    : null

    return (
        <div className={cs({ ...props, block: block || true }, ['all'], `field ${className || ' '}`)}>
            {before && <span {...beforeProps}>{before}</span>}
            {content}
            {after && <span {...afterProps}>{after}</span>}
        </div>
    )
}

export const FormRow = ({
    // deps 
    children,
    label = '', description = '',
    // error
    isErr = false, errMsg = '',
    resetable = false, onReset = () => null,
    loading = false,

    // style
    vertical = false,
    ...rest
}) => {




    const style = {
        root: {
            flexDirection: vertical ? 'row' : 'column',
            // alignItems: vertical && 'center'
        },
        section1: {
            flex: 2,
            marginBottom: !vertical && 5, paddingRight: vertical && 30
        },
        section2: { flex: !description ? 6 : 3 },
        row1: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 16,
        },
        labelText: { flex: 1, fontWeight: 600 }
    }

    const on = {
        reset: () => null
    }

    const render = {
        label: <label style={style.labelText}>{label}</label>,
        reset: <span className='fas fa-undo' onClick={onReset} />,
        icon_spinner: <span className='fas fa-spinner' style={{ marginRight: 5 }} />,
        icon_alert: <span className='fas fa-exclamation-circle' style={{ marginRight: 5 }} />,
        desc: <p>{description}</p>,
        errMsg: <span className='errMsg'>{errMsg}</span>

    }

    return (
        <div style={style.root} className='formrow'>
            <div style={style.section1}>
                <div style={style.row1}>
                    <div>
                        {isErr && render.icon_alert}
                        {loading && render.icon_spinner}
                    </div>
                    {label && render.label}
                    <div className='actions'>
                        {resetable && render.reset}
                    </div>
                </div>
                {isErr && render.errMsg}
                {description && render.desc}
            </div>
            <div style={style.section2} className='content' {...rest}>
                {children}
            </div>
        </div>
    )
}












// export const Line = ({
//     before, beforeProps,
//     after, afterProps,
//     size = 'md', curve = 'curved', fill = 'outlined', theme = 'grey',
//     rootClassname, children, style, ...rest
// }) => {
//     return (
//         <Block
//             fill={fill}
//             theme={theme}
//             curve={curve}
//             className={classNames(
//                 rootClassname,
//                 { 'h-xs': size === 'xs' },
//                 { 'h-sm': size === 'sm' },
//                 { 'h-md': size === 'md' },
//                 { 'h-lg': size === 'lg' },
//                 { 'h-xl': size === 'xl' },
//                 { 'h-xxl': size === 'xxl' }
//             )}
//             style={{ flex: 1, ...style }}
//             {...rest}
//         >
//             <Block visible={before || beforeProps} {...beforeProps}>{before}</Block>
//             {children}
//             <Block visible={after || afterProps} {...afterProps}>{after}</Block>
//         </Block>
//     )
// }

// export const PureInput = ({
//     value, placeholder, onChange, ...rest
// }) => {
//     return (
//         <Block
//             htmlTag='input'
//             style={{ flex: 1 }}
//             placeholder={placeholder}
//             value={value}
//             onChange={e => onChange(e.target.value)}
//             {...rest}
//         />
//     )
// }



// export const Input = ({
//     value, placeholder, onChange = () => null, props, className, ...rest
// }) => {
//     return (<Line rootClassname={`input ${className || ' '}`}  {...props}>
//         <Block
//             htmlTag='input'
//             placeholder={placeholder}
//             value={value}
//             onChange={e => onChange(e.target.value)}

//             {...rest}
//         />
//     </Line>
//     )
// }
// export const InputNumber = ({
//     value, placeholder, onChange, inputProps, className, ...rest
// }) => {
//     return (<Line rootClassname={`input ${className || ' '}`}  {...rest}>
//         <Block
//             type='number'
//             htmlTag='input'
//             placeholder={placeholder}
//             value={value}
//             onChange={e => onChange(e.target.value)}
//             {...inputProps}
//         />
//     </Line>
//     )
// }
// export const TextArea = ({
//     value, placeholder, onChange, textAreaProps, className, ...rest
// }) => {
//     return (<Line {...rest} rootClassname={`textarea ${className || ' '}`} size='' style={{ padding: 10 }}>
//         <Block
//             htmlTag='textarea'
//             placeholder={placeholder}
//             value={value}
//             onChange={e => onChange(e.target.value)}
//             {...textAreaProps}
//         />
//     </Line>
//     )
// }
// export const Select = ({
//     selected, onSelect, selectProps, options, className, placeholder, style, ...rest
// }) => {
//     return (<Line {...rest} rootClassname={`select ${className || ' '}`} style={style} >
//         <Block
//             htmlTag='select'
//             value={selected}
//             onClick={e => onSelect(e.target.value)}
//             placeholder={placeholder}
//             {...selectProps}
//         >
//             {options && options.map((i, key) => <option key={key} value={i.value} label={i.label} />)}
//         </Block>
//     </Line>
//     )
// }
