const Footer = ({ visible = false, content }) => {
    if (!visible) return null
    return (
        <footer>
            {content}
        </footer>
    )
}
export default Footer