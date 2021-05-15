import classNames from "classnames"
import { useHistory } from "react-router"
import { Button } from "./cta"


export const Page = ({
    children,
    centered,
    container,
    style = { root: { padding: 20 } },
    title = '',
    titleRight = '',
    back = true,
    next,
}) => {
    const his = useHistory()
    return (
        <div
            className={classNames('page', { centered })}
            style={style.root}
        >
            {
                (back || next)
                &&
                <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {back && <Button
                            children='< Back'
                            theme='dark'
                            fill='ghost'
                            size='md'
                            onClick={() => his.goBack()}
                        />}
                    </div>
                    {next}
                </div>
            }


            {
                (title || titleRight)
                &&
                <div className='head' style={{ marginBottom: 30 }}>
                    <div className='title'>{title}</div>
                    <div className='title-right'>{titleRight}</div>
                </div>
            }

            {container ? <div className='container'>{children} </div> : children}


        </div>
    )
}

export default Page