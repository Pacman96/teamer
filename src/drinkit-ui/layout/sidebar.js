
import classNames from 'classnames'
import { useHistory } from 'react-router'
import { useLayout } from '.'
import Block from '../../lib/block'
import { Button } from '../cta'

const Sidebar = ({
    visible,
    menu,
    top,
    bot
}) => {
    const { isSidebarOpen, closeSidebar } = useLayout()
    const his = useHistory()
    if (!visible) return null
    return (
        <Block className={classNames('sidebar', { open: isSidebarOpen })} theme='dark' style={{ borderRadius: 0 }}    >
            {top}
            <div className='sidebar-body '>
                {menu.map(({ id, label, path, children, isActive, visible = true, hidden = false }) => visible && !hidden ?
                    <div key={id} style={{ flex: 1 }}>
                        <Button children={label} isActive={isActive}
                            theme='light'
                            fill='ghost'
                            size='md'
                            style={{ fontWeight: 500, width: '-webkit-fill-available', marginBottom: 5, marginTop: 0}}
                            onClick={() => {
                                path && his.push(path)
                                closeSidebar()
                            }}
                        />
                        {(children && children.length) > 0 &&
                            children.map(child => child.visible && !child.hidden &&
                                <Button
                                    key={child.id} children={child.label} isActive={child.isActive}
                                    onClick={() => {
                                        child.path && his.push(child.path)
                                        closeSidebar()
                                    }}
                                />

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