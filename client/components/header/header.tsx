import React, { FC, useState } from 'react'
import { Logo } from '../logo'
import { Menu, Close } from '@mui/icons-material'
import { ColorModeButton } from '../styled-buttons'
import { Link as MuiLink, AppBar, Toolbar, Box, Slide, Container, IconButton,useMediaQuery, useScrollTrigger, boxClasses, ListSubheader, buttonBaseClasses, typographyClasses, ListItemButton, ListItem, ListItemText} from '@mui/material'
import { useTheme} from '@mui/material/styles'
import { SideBar } from '../sidebar'
import { actionTypes } from '../sidebar/reducer'
import { useSideBar } from '../sidebar/SideBarProvider'

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
  const [{topics}, dispatch] = useSideBar()
  const { breakpoints } = useTheme()
  const xsMobileView = useMediaQuery(breakpoints.down('sm'), {defaultMatches: true}) /**enables SSR defaultMatches */
  const trigger = useScrollTrigger();

  const toggleVisibleMenu = () => {
    setVisibleMenu(()=>{
      dispatch({type: actionTypes.SET_OPEN, open: !visibleMenu})
      return !visibleMenu
    })
  }
  const showTopicPhotos = (topic) =>{
    dispatch({type: actionTypes.SET_TOPIC, topic: topic})
  }
  return (<>
    <Slide id="app-bar" color='inherit' appear={true} direction="down" in={!trigger}>
      <AppBar position={'absolute'} enableColorOnDark={true} sx={{boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none'}}>
        <Toolbar sx={{ width:'100%', px: {xs: 0, sm: 'unset'} }}>
          <Box sx={{ width:'100%', mx:0}}>
            <Container maxWidth={false} sx={{ py: { xs: 2, md: 2 }, px: {xs: 0, sm: 'unset'}}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Logo />
                <Box sx={{display: { xs: 'inline-flex', sm: 'none' }}} /> {/* Magic space */}
              </Box>
            </Container>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
    <SideBar open={visibleMenu} toggleDrawer={toggleVisibleMenu}>
      <ListSubheader component="div" inset>
        Find By Topics
      </ListSubheader>
      <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1, 
      [`.${buttonBaseClasses.root}`]:{ borderRadius: '50% !important'}, [`.${buttonBaseClasses.root}:hover`]:{ backgroundColor: 'transparent !important'},}}>
        <ColorModeButton />
      </Box>
      {xsMobileView &&
      (<>
      </>)}
      {topics.map((topic)=>(
        <MuiLink
            key={topic.id}
            component='span'
            onClick={()=>showTopicPhotos(topic)}
            sx={{
              display: 'block',
              mb: 1,
              textDecoration: 'none',
              fontSize: { xs: '1rem', md: 'inherit' },
              [`& .${typographyClasses.root}`]:{fontWeight: 600},
              color: 'text.disabled',
              cursor:'pointer',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'none'
              }
        }}>
          <ListItemButton>
            <ListItemText sx={{color: 'text.secondary'}} primary={topic.title} />
          </ListItemButton>
        </MuiLink>
      ))}  
    </SideBar>
    </>)
}

export default Header
