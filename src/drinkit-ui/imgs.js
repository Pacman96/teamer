import classNames from "classnames"
import { useEffect, useState } from "react"
import { Block } from "./base"

export const Picture = (props) => {

    const blank = 'https://thumbs.dreamstime.com/t/blank-product-box-xl-22376549.jpg'
    const {
        crop = 'cover',
        height,
        width,
        // ratio,
        src,
        list,
        fav = 0,
        alt,
        className
    } = props

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [source, setSource] = useState('')

    const reload = (props) => {
        setSource(null)
        setIsError(false)
        setIsLoading(true)

        const image = new Image()

        image.src = props.list[fav] || props.src

        image.onload = (e) => {
            setIsLoading(false)
            setIsError(false)
            setSource(props.list[fav] || props.src || blank)
            console.log(e)
        }

        image.onerror = (e) => {
            setIsLoading(false)
            setIsError(true)
            setSource( blank)

            console.log(e)
        }
    }


    useEffect(() => {
        reload(props)
    }, [props])

    return (
        <Block style={{ overflow: 'hidden', height, width }} className={className} >

            <Block htmlTag='img'
                style={{ width: '100%', height: '100%', objectFill: crop }}
                src={source}
                alt={alt || source} />


        </Block>
    )
}

export const Gallery = ({
    mini,
}) => {
    return (
        <Block>
            <Block >

            </Block>
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


            size='md' src={src || 'https://www.rennes-sb.com/wp-content/uploads/2017/03/avatar_empty.png'} alt={alt || src} {...rest} htmlTag='img' />
    )
}

