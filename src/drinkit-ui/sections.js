import classNames from "classnames"
import { useHistory } from "react-router"
import {  IconButton } from "./clickers"


export const Page = ({
    htmlTag,
    centered,
    container,
    

    children,
    back = false,
    title = '',
    next,

    rootProps,
    titleProps,
    backProps,
    nextProps,
    contentProps,

    loading
}) => {
    const his = useHistory()
    const HtmlTag = htmlTag || 'div'
    if (loading) return <div className='page centered'>
        Loading
    </div>
    return (
        <HtmlTag
            className={classNames('page mt-xxl', { centered })}
            {...rootProps}
        >


            {
                (title || next || back)
                &&
                <div className='head mb-xxl' >
                    {(back || backProps) && <IconButton bg='light' className='mr-md' icon='angle-double-left' onClick={() => his.goBack()} />}
                    {(title || titleProps) && <div className='title'>{title}</div>}
                    {(next || nextProps) && <div {...nextProps}>{next}</div>}
                </div>
            }

          <div className='container' {...contentProps}>{children} </div>


        </HtmlTag>
    )
}

export default Page