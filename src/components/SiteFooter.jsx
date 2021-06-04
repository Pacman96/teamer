import { useTheme } from "../drinkit-ui/apis/theme"
import { Footer } from "../drinkit-ui/components"
import { navigation } from "../utils/navigation"

export const SiteFooter = () => {
    const { theme } = useTheme()
    
    const footerProps = {
        color: 'dark',
        logo: <h1 style={{ color: theme.palette.light2 }}>Teame'r</h1>,
        social: {
            facebook: ' ',
            instagram: ' ',
            whatsapp: ' ',
            youtube: ' '
        },
        description: 'Lorem ipsum a zebi here orem ipsum a zebi here orem ipsum a zebi here orem ipsum a zebi here',
        copyright: '(c) Pacman all right reserved',
        sections: [
            { label: 'Section1', navigation: navigation.footer_4 },
            { label: 'Section2', navigation: navigation.footer_4 },
            { label: 'Section3', navigation: navigation.footer_4 },
            { label: 'Section4', navigation: navigation.footer_4 },
        ]
    }

    return <Footer {...footerProps}/>
}
