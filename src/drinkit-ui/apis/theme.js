import { createContext, useContext, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

const Context = createContext();
export function useTheme() { return useContext(Context) }

const defaultTheme = {
    label: 'Drinko - Light',
    bp: {
        s: '767px',
        m: '992px',
        l: '1200px',
    },
    types: {
        pri: "'Cairo', sans-serif",
        sec: '',
    },
    borders: {
        curved: '8px',
        curved2: '14px',
        square: '0px',
        round: '50px',
        cercle: '100%',
    },
    palette: {
        primary: '#185adb',
        secondary: '#ffc947',
        teritary: '#feddbe',
        light: '#ffffff',
        light2: '#f7f7f7',
        light3: '#ececec',
        dark: '#121f29',
        dark2: '#28323a',
        dark3: '#373a3c',
        success: '#1eae98',
        infos: '#2EC4B6',
        danger: '#e21a48',
        warning: '#FF9F1C',
        contrast: {
            primary: '#fff',
            secondary: '#0a1931',
            light: '#000',
            light2: '#000',
            light3: '#000',
            dark: '#fff',
            dark2: '#fff',
            dark3: '#fff',
            success: '#fff',
            infos: '#fff',
            danger: '#fff',
            warning: '#fff',
        },
        hover: {
            primary: '#185adbd9',
            secondary: '#ffc947d9',
            teritary: '#feddbed9',
            light: '#ffffffd9',
            light2: '#f7f7f7d9',
            light3: '#ecececd9',
            dark: '#121f29d9',
            dark2: '#28323ad9',
            dark3: '#373a3cd9',
            success: '#1eae98d9',
            infos: '#2EC4B6d9',
            danger: '#E71D36d9',
            warning: '#FF9F1Cd9',
        }
    },
    sizes: {
        font: {
            s: '11px',
            m: '15px',
            l: '18px',
            xl: '21px',
        },
        line: {
            s: '15px',
            m: '18px',
            l: '21px',
            xl: '24px',
        },
    },
}

const config = {
    themes: [],
    default: 'Drinko - Light',
    ls: 'theme'
}

const getCurrentTheme = (themes = [], ls = 'theme') => {
    const currentName = localStorage.getItem(ls) || defaultTheme.label
    return themes.filter(({ label }) => label === currentName)[0] || themes[0]
}
const selectTheme = (themeLabel = '', ls = 'theme') => localStorage.setItem(ls, themeLabel)




export const ThemeProvider = ({
    loading,
    children,
    // config,
}) => {
    const [ready, setReady] = useState(false)
    const [theme, setTheme] = useState(defaultTheme)

    const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900 &display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    :root {
        font-size: 16px;
        font-family: 'Tajawal', sans-serif;
        background-color: ${theme.palette.light3} ;
        overflow-y: auto;
    }
    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    input,
    textarea,
    select,
    button {
        color: inherit;
        background-color: inherit;
        font: unset;
        outline: unset;
        padding: 0;
        border: unset;
        width: unset;
        flex: 1;
    }
    textarea {
        min-height: 80px;
    }
    input[type="file"]::-webkit-file-upload-button {
        visibility: hidden;
        display: none;
    }
    input[type="file"] {
        opacity: 0;
        position: absolute;
    }
    input[type="file"] {
        opacity: 0;
        position: absolute;
    }
    
    ::-webkit-scrollbar { 
        width: 0.5rem;
     }
     ::-webkit-scrollbar-track {
        background: ${theme.palette.teritary};
    }
    ::-webkit-scrollbar-thumb {
        background: ${theme.palette.secondary};
    }
`
    useEffect(() => {
        const current = getCurrentTheme([defaultTheme, ...config?.themes], config?.ls)
        setTheme(current)
    }, [config])

    return <Context.Provider
        value={{
            theme,
            select: (name) => selectTheme(name, config?.ls)
        }}
    >
        <GlobalStyle />
        {(loading && !ready) ? (loading || 'Loading') : children}
    </Context.Provider>

}
