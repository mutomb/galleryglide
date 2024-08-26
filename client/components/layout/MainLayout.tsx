import React, { FC, ReactNode, useEffect} from 'react'
import Box from '@mui/material/Box'
import { Footer } from '../footer'
import { Header } from '../header'
import { useColorMode } from '../../config/theme/MUItheme-hooks'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
 
  const {toggleColorMode, getColorMode} = useColorMode()

  // useEffect(()=>{
  //   let toDark: any; 
  //   /** Trick to force non-lazy-loaded components (including header) background color to update in light-mode SSR*/
  //   if(getColorMode()==='light'){ 
  //     toggleColorMode('dark', ()=>{})
  //     toDark = setTimeout(()=>toggleColorMode('light', ()=>{}), 500)
  //   }
  //   if(getColorMode()==='dark'){ 
  //     toggleColorMode('light', ()=>{})
  //     toDark = setTimeout(()=>toggleColorMode('dark', ()=>{}), 500)
  //   }
  //   return function cleanup(){ toDark && clearTimeout(toDark)}
  // }, [])

  return (
    <Box sx={{backgroundColor: 'background.paper'}}>
      <Header />
        <Box component="main" sx={{display:'flex', flexDirection:'column', minHeight:'88vh', backgroundColor: 'inherit'}}> {/*Ensures both atleast 88% viewport given to main (even on empty contain) and sticky footer (including on page load)*/}
        {children}
        </Box>
      <Footer />
    </Box>)
}

export default MainLayout
