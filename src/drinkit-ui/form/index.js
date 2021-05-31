import { cs } from "../../utils/styling"
import { SketchPicker } from 'react-color';
import { Button, IconButton } from "../clickers";
import { Picture } from "../imgs";
import { useEffect, useState } from "react";
import { Group } from "../base";

/// To handle many children please use row/col

export const Input = props => <input {...props} />
export const TextArea = props => <textarea {...props} />
export const InputNumber = props => <input type='number' {...props} />
export const Select = props => {
    const options = props.options || [];
    return (
        <select value={props.value} {...props}>
            <option value={"" || null || undefined} label={props.placeholder} />
            {options.map((option) => (
                <option key={option.id} value={option.id} label={option.label} />
            ))}
        </select>
    );
};
export const FileInput = props => <input type='file'{...props} placeholder={props.placeholder || 'Click here !'} />
export const ColorPicker = props => <SketchPicker {...props} width='100%' />
export const GalleyUploader = props => <input type='file' {...props} />


export const FormLabel = ({ title, bold, text }) => title ?
    <label style={{ flex: 1, fontWeight: 600, marginBottom: 5 }}>{title}</label> :
    bold ? <b style={{ flex: 1, marginBottom: 5 }}>{bold}</b> :
        <span style={{ flex: 1, marginBottom: 5 }}>{text}</span>


export const FormField = ({
    before, beforeProps,
    after, afterProps,
    child = 'text', children,
    className, style,
    block, vertical,
    hook = [null, () => null],
    placeholder,
    mode = 'create',
    ...otheParentProps
}) => {

    let childExtraProps = {
        placeholder,
        disabled: otheParentProps.loading,
        readOnly: mode === 'view'
    }

    switch (child) {
        case 'text':
        case 'number':
        case 'longText':
            childExtraProps = {
                ...childExtraProps,
                onChange: e => hook[1](e.target.value),
                value: hook[0] || ''
            }
            break;
        case 'color':
            childExtraProps = {
                ...childExtraProps,
                onChange: color => hook[1](color.hex),
                color: hook[0],
            }
            break;
        case 'select':
            // options as third hook item, else []
            // option is id/label object // type : 'title' for titles
            childExtraProps = {
                ...childExtraProps,
                onChange: e => hook[1](e.target.value),
                value: hook[0] || '',
                options: hook[2] || []
            }
            break;
        default:
            break;
    }


    let Comp, bef = before, aft = after

    switch (child) {
        case 'text':
            Comp = Input
            break;
        case 'longText':
            Comp = TextArea
            break;
        case 'number':
            Comp = InputNumber
            break;
        case 'select':
            Comp = Select
            break;
        case 'color':
            Comp = ColorPicker
            break;
        default:
            break;
    }

    useEffect(() => {
    }, [hook])

    const classes = cs({ ...otheParentProps, vertical, block: block ? block : true }, 'all', `field ${className || ' '}`)
    const styles = {
        // background: mode === 'view' ? 'transparent' : 'initial',
        // boxShadow: mode === 'view' ? 'unset' : 'initial',
        ...style
    }

    return (
        <div   {...otheParentProps}  style={styles} className={classes}>
            { bef && <span  {...beforeProps} className={cs(beforeProps, 'all', beforeProps?.className)}> {bef}</span>}
            {children || <Comp {...childExtraProps} />}
            {after && <span {...afterProps}>{after}</span>}
        </div>
    )
}

export const Uploader = ({
    hook = [[], () => null],
    urlsHook = [[], () => null],
    multi = true, actions, onRemove,
    className, block = false,
    ...otheParentProps
}) => {
    const files = hook[0] || []
    const setFiles = hook[1]

    const [displayFiles, setDisplayFiles] = useState([])

    useEffect(() => {
        if (files.length > 0) {
            const filesArray = Array.from(files).map(file => URL.createObjectURL(file))
            setDisplayFiles(filesArray)
            Array.from(files).map(file => URL.revokeObjectURL(file))
        }
        if (files.length < 1) {
            setDisplayFiles([])
        }
    }, [])

    const remove = (src, key) => {
        if (displayFiles.includes(src)) {
            setDisplayFiles(displayFiles.filter(i => i !== src))
            setFiles(Array.from(files).filter((i, index) => index !== key))
        } else {
            onRemove()
        }
    }

    return (
        <div className={className}>
            <FormField {...otheParentProps}
                after={files.length > 0 && files.length + ' files'}
            >
                <input value={'Click here to upload'} readOnly />
                <input
                    type='file'
                    multiple={multi}
                    onChange={e => {
                        const target = e.target.files
                        console.log(target)
                        setFiles(target)
                    }} />

            </FormField>
            <br />
            <div style={{ display: 'flex' }}>
                {urlsHook[0].length > 0 && urlsHook[0].map((src, key) => <Picture

                    height={200}
                    src={src}
                    key={key}
                />)}
                {displayFiles && displayFiles.map((src, key) =>
                    <FormField
                        vertical
                        after={
                            <Group className='mt-sm' block>
                                {
                                    actions ?
                                        <IconButton size='s' icon='minus' bg='danger' onClick={() => remove(src, key)} />
                                        :
                                        <Button size='s' iconLeft='minus' bg='danger' text='Remove' onClick={() => remove(src, key)} />
                                }
                                {actions}
                            </Group>
                        }
                        key={key} style={{ padding: 10, maxWidth: 200 }} className='mr-xxl' block={false}>
                        <Picture width={180} height={180} src={src} />
                    </FormField>)}
            </div >
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
    savable, onSave = () => null,
    loading = false,
    labelProps = {

    },
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
        section2: { flex: !description ? 6 : 3, marginTop: !vertical && 10 },
        row1: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            // fontSize: 17,
        },
    }

    const render = {
        label: <FormLabel title={label} {...labelProps} />,
        reset: <IconButton size='s' icon='undo' bg='light' onClick={onReset} style={{ marginLeft: 5 }} />,
        save: <IconButton size='s' icon='save' onClick={onSave} bg='success' style={{ marginLeft: 5 }} />,
        icon_spinner: <span className='fas fa-spinner' style={{ marginRight: 5 }} />,
        icon_alert: <span className='fas fa-exclamation-circle' style={{ marginRight: 5 }} />,
        desc: <p>{description}</p>,
        errMsg: <span className='errMsg'>{errMsg}</span>

    }

    return (
        <div style={style.root} className='formrow'>
            <div style={style.section1}>
                <div style={style.row1}>
                    {isErr && render.icon_alert}
                    {loading && render.icon_spinner}
                    {label && render.label}
                    {resetable && render.reset}
                    {savable && render.save}
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
