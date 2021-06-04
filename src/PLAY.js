
import { Box, Button } from "./drinkit-ui/components"

export const Playground = () => {

    return (
        <Box style={{ padding: 20 }}>
            <br />

            <Box
                s={{
                    color: 'red',
                    colorHover: 'green'
                }}
                color='primary'
            >
                Responsive color
            </Box>


            <Button filled size='s' curve='curved'>
                Filled Button S
            </Button>
            <Button filled size='m'>
                Filled Button
            </Button>
            <Button filled size='l'>
                Filled Button L
            </Button>
            <br />  <br />
            <Button outlined size='s' curve='curved'>
                Filled Button S
            </Button>
            <Button outlined size='m'>
                Filled Button
            </Button>
            <Button outlined size='l'>
                Filled Button L
            </Button>
            <br />  <br />




        </Box>
    )
}
