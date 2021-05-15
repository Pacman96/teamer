
import classNames from 'classnames'
import { useHistory } from 'react-router'
import { useLayout } from '.'
import Block from '../../lib/block'
import { Button } from '../cta'

const Sidebar = ({
    visible,
    menu,
    top,
    bot,
    theme 
}) => {
    const { isSidebarOpen, closeSidebar } = useLayout()
    const his = useHistory()
    if (!visible) return null
    return (
        <Block className={classNames('sidebar', { open: isSidebarOpen })} theme='dark' style={{ borderRadius: 0 }}    >
            {top}
            <div className='sidebar-body '>
                {menu.map(({ id, label, path, children = [], isActive, visible = true, hidden = false }) => visible && !hidden ?
                    <div key={id} style={{ flex: 1 }}>
                        {
                            children.length > 0 ?
                                <div style={{ fontWeight: 500, width: '-webkit-fill-available', marginBottom: 10, marginTop: 20, textAlign: 'center', color: 'wheat' }}>{label}</div>
                                : <Button children={label} isActive={isActive}
                                    theme='light'
                                    fill='ghost'
                                    size='md'
                                    style={{ fontWeight: 500, width: '-webkit-fill-available', marginBottom: 5, marginTop: 0 }}
                                    onClick={() => {
                                        path && his.push(path)
                                        children.length < 1 && closeSidebar()
                                    }}
                                />
                        }

                        {children.length > 0 &&
                            children.map(({ id, label, path, children = [], isActive, visible = true, hidden = false }) => {
                                if (!visible || hidden) {
                                    return <div > hidden </div>
                                }
                                else return <Button
                                theme='light'
                                    fill='ghost'
                                    key={id} children={label} isActive={isActive}
                                    style={{ fontWeight: 500, width: '-webkit-fill-available', marginBottom: 5, marginTop: 0 }}
                                    onClick={() => {
                                        path && his.push(path)
                                        closeSidebar()
                                    }}
                                />
                            }


                            )
                        }
                    </div>
                    : <>
                    </>
                )
                }
            </div>
            {bot}

        </Block>
    )
}


export default Sidebar