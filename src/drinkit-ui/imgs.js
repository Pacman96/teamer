import classNames from "classnames"
import { useEffect, useState } from "react"
import { Block } from "./base"

export const Picture = (props) => {

    const blank = 'https://thumbs.dreamstime.com/t/blank-product-box-xl-22376549.jpg'
    const {
        crop = 'cover',
        height,
        width,
        src,
        list,
        alt,
        className
    } = props


    return (
        <Block style={{ overflow: 'hidden', height, width }} className={className} {...props} >
            <Block htmlTag='img'
                style={{ width: '100%', height: '100%', objectFit: crop }}
                src={src || blank}
                alt={alt || src}
            />
        </Block>
    )
}


export const Avatar = ({ className, size = 'md', src, alt, ...rest }) => {
    return (
        <Block
            className={
                classNames(
                    'img-avatar',
                    { 'h-xs w-xs': size === 'xs' },
                    { 'h-sm w-sm': size === 'sm' },
                    { 'h-md w-sm': size === 'md' },
                    { 'h-lg w-lg': size === 'lg' },
                    { 'h-xl w-xl': size === 'xl' },
                    { 'h-xxl w-xxl': size === 'xxl' },
                    className
                )
            }
            size='md'
            src={src || 'https://www.rennes-sb.com/wp-content/uploads/2017/03/avatar_empty.png'}
            alt={alt || src}

            htmlTag='img'
            {...rest} />
    )
}



export const Gallery = ({
    images = [],
    style,
    width,
    height,
    className,
    thumbs = true
}) => {
    const [index, setIndex] = useState(0  || 1 || 2)
    useEffect(() => {
    }, [images])
    const onThumbHover = key => setIndex(key)
    return (
        <div style={{ ...style }} className={className}>
                        <Picture
                width='100%'
                src={images[index]}
                width={width}
                height={height}
            />
         {thumbs && <div style={{ display: 'flex', justifyContent: 'center' }} className='mb-xs' >
                {images.length > 0 && images.map((thumb, key) =>
                    <Avatar key={key} src={thumb} className='mr-md'
                        onMouseEnter={() => onThumbHover(key)}
                        onPointerEnter={() => onThumbHover(key)}
                    />
                )}
            </div>}   

        </div>
    )
}
