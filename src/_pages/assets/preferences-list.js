import { Text } from "../../drinkit-ui/components"
import { CollapsibleCard } from "../../drinkit-ui/components"

export const Page_Preferences = () => {
    return (
        <CollapsibleCard
            openOnClick
            defaultOpen
            toggleOnHeadClick
            headContent={<Text bold children='Branding' />}
            midContent={
                <>
                  

                </>
            }
       />
    )
}
