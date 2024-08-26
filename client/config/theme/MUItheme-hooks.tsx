import React, { FC, ReactNode, useState, useMemo, createContext, useContext, useEffect, useTransition } from 'react'
import { ThemeProvider, responsiveFontSizes} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import {createTheme} from '.'

export const ColorModeContext = createContext({
  mode: '',
  toggleColorMode: (value, cb) => {},
  getColorMode: () => {},
  clearPreference: () => {},
  theme:{}
}) 
export const useColorMode = () => useContext(ColorModeContext)

interface Props {
  children: ReactNode,
  setting?: any
}
/** pass colorMode and functionalities deep down components tree without explicitly passing props */
export const MUIProvider: FC<Props> = ({ children, setting}) => {
  const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {defaultMatches: true});
  const [mode=setting && setting.colorMode? setting.colorMode: 'system', setMode] = useState<'dark'|'light'|'system'>();
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    let sessionColorMode = JSON.parse(sessionStorage.getItem('jwt')!) && JSON.parse(sessionStorage.getItem('jwt')!).setting && JSON.parse(sessionStorage.getItem('jwt')!).setting.colorMode 
    let localColorMode = JSON.parse(localStorage.getItem('jwt')!) && JSON.parse(localStorage.getItem('jwt')!).setting && JSON.parse(localStorage.getItem('jwt')!).setting.colorMode 
    startTransition(()=>{
      if(sessionColorMode && ['dark', 'light', 'system'].includes(sessionColorMode)) {
        return toggleColorMode(sessionColorMode, ()=>{}) 
      }     
      if(localColorMode && ['dark', 'light', 'system'].includes(localColorMode)) {
        return toggleColorMode(localColorMode, ()=>{}) 
      }
    });
  }, []);

  const toggleColorMode = (value:'dark' | 'light' | 'system', cb) => {
    setMode(value)    
    cb()
  }
  
  const getColorMode = () => {
    /** During SSR find in context*/      
    if (typeof window === "undefined"){
      if (mode && ['dark', 'light'].includes(mode)) return mode
      if (mode && mode === 'system') return isSystemDarkMode? 'dark': 'light'
    }
    /** if authenticated during CSR*/   
    if(typeof window !== 'undefined'){
      /**find in sessionStorage */
      let sessionColorMode = JSON.parse(sessionStorage.getItem('jwt')!) && JSON.parse(sessionStorage.getItem('jwt')!).setting && JSON.parse(sessionStorage.getItem('jwt')!).setting.colorMode
      if (sessionColorMode && ['dark', 'light'].includes(sessionColorMode)) return sessionColorMode
      if (sessionColorMode && sessionColorMode === 'system') return isSystemDarkMode? 'dark': 'light'
      /**find in context */
      if (mode && ['dark', 'light'].includes(mode)) return mode
      if (mode && mode === 'system') return isSystemDarkMode? 'dark': 'light'
    }
    return isSystemDarkMode? 'dark': 'light'
  }

  const clearPreference = () => {
    setMode('system')
  }

  const theme = useMemo(() =>createTheme(getColorMode()),[mode]); /**create theme */
  const responsiveTheme = responsiveFontSizes(theme);
  return (
    <ColorModeContext.Provider value={{mode, toggleColorMode, getColorMode, theme, clearPreference}}>
      <ThemeProvider theme={responsiveTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>)
}
