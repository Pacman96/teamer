import { useHistory } from "react-router"
import { Page } from "../../../drinkit-ui/sections"
import { FormRow, FormField, FormLabel, Uploader } from "../../../drinkit-ui/form"
import { useAssets } from "../../../api/assets"
import { Group } from "../../../drinkit-ui/base"
import { useEffect, useState } from "react"

const ShopPrefs = () => {
    const { prefs } = useAssets()
    const { branding, updateBranding } = prefs

    const [loadingBrandingUpdate, setLoadingBrandingUpdate] = useState(false)

    const [brandName, setBrandName] = useState(branding.brandName)
    const [brandColor, setBrandColor] = useState(branding.brandColor)
    const [brandColorContrast, setBrandColorContrast] = useState(branding.brandColorContrast)
    const [brandLogoURL, setBrandLogoURL] = useState(branding.brandLogoURL)
    const [files, setFiles] = useState([])

    const reset = () => {
        setBrandName(branding.brandName)
        setBrandColor(branding.brandColor)
        setBrandColorContrast(branding.brandColorContrast)
        setFiles([])
        setBrandLogoURL(branding.brandLogoURL)
    }


    const state = {
        branding: {
            isChanged: brandColor !== branding.brandColor || brandColorContrast !== branding.brandColorContrast ||
                brandName !== branding.brandName || files.length > 0 || brandLogoURL !== branding.brandLogoURL
        },
    }

    useEffect(() => {
        reset()
    }, [branding])

    const props = {
        page: {
            title: 'Shop Preferences',
            titleProps: {
                style: { textAlign: 'center' }
            }
            // next: <IconButton icon='plus' onClick={() => his.push('/assets/collections/add')} />
        },
        row: {
            branding: {
                vertical: false,
                label: 'Branding',
                resetable: state.branding.isChanged,
                onReset: reset,
                savable: state.branding.isChanged,
                onSave: () => {
                    setLoadingBrandingUpdate(true)
                    updateBranding({ brandName, brandColor, brandColorContrast, brandLogoURL }, files)
                        .then((res) => console.log("Updated", res))
                        .then(() => setLoadingBrandingUpdate(false))

                },
                loading: loadingBrandingUpdate
            }
        },
        field: {
            brandColor: {
                before: 'Primary color',
                vertical: true,
                child: 'color',
                hook: [brandColor, hex => setBrandColor(hex)]
            },
            brandColorContrast: {
                before: 'Primary color contrast',
                vertical: true,
                child: 'color',
                hook: [brandColorContrast, hex => setBrandColorContrast(hex)]
            },
            brandName: {
                before: 'Logo text',
                child: 'text',
                className: 'mb-sm',
                hook: [brandName, setBrandName]
            },
            brandLogo: {
                hook: [files, setFiles],
                urlsHook: [[brandLogoURL]],
                multi: false
            },
        }
    }

    return (
        <Page {...props.page} >

            <FormRow {...props.row.branding}>
                <Group vertical>
                    <FormField {...props.field.brandName} />
                    <br />
                    <Group>
                        <FormField {...props.field.brandColor} />
                        <FormField {...props.field.brandColorContrast} />
                    </Group>
                    <br />
                    <Uploader {...props.field.brandLogo} />
                </Group>
            </FormRow>
        </Page>
    )
}

export default ShopPrefs