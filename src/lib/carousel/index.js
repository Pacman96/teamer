import classNames from "classnames"


const Carousel = ({ children, spacing, pad, }) => {
    return (
        <div className={classNames(
            'carousel',
            { "spc-s": spacing === "s" },
            { "spc-m": spacing === "m" },
            { "spc-l": spacing === "l" },
            { "pad-s": pad === "s" },
            { "pad-m": pad === "m" },
            { "pad-l": pad === "l" },
        )}>
            {children}
        </div>
    )
}

export default Carousel
