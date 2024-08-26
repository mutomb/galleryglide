import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import {MUIProvider} from './config/theme/MUItheme-hooks'
import CssBaseline from '@mui/material/CssBaseline';
import { MainLayout } from './components/layout';
import { SideBarProvider } from './components/sidebar/SideBarProvider';
import reducer, { initialState } from './components/sidebar/reducer';

// CssBaseline initialize css properties with simple baseline to build upon. EnableColorScheme applyies color-scheme on <html> using theme.palette.mode value.
const App = () => {
  return (<MUIProvider>
            <SideBarProvider initialState={initialState} reducer={reducer}>
              <CssBaseline enableColorScheme={true} />
              <BrowserRouter> 
                <MainLayout>
                  <MainRouter/>
                </MainLayout>
              </BrowserRouter>
            </SideBarProvider> 
          </MUIProvider>)
}
export default App