import React, { FC, ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import { Toolbar, IconButton, List, buttonBaseClasses, svgIconClasses, listSubheaderClasses, 
  Fade, useScrollTrigger, Box} from '@mui/material';
import {ChevronLeftRounded, ChevronRightRounded} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'

interface SideBarProps{
  children?: ReactNode[],
  open: boolean,
  toggleDrawer: () => void
}
const SideBar: FC<SideBarProps> = ({children, open, toggleDrawer}) => {
  const theme = useTheme();
  const trigger = useScrollTrigger();
  return (<>
        <Fade in={trigger}>
          <Box>
            <Toolbar
              sx={{
                display: !open? 'relative':'none',
                zIndex: 1100,
                alignItems: 'center',
                justifyContent: 'center',
                height: 64,
                width: {xs: 50, sm: 70, md: 90 },
                boxShadow: theme.shadows[3],
                p:0,
                alignSelf: 'center',
                position: 'fixed',
                bottom: {xs: '20%', md:'50%'},
                top: {xs: '80%', md:'50%'},
                left: -20,
                transform: 'unset',
                ':hover': {
                    transform: 'translateX(-5px) scale(1.1)',  
                    backgroundColor: 'secondary.main',
                    left: 0,
                    transition: theme.transitions.create(['transform', 'left','background-color'], {duration: 500}),                 
                },
                border: '1px solid',
                borderColor:'primary.contrastText',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&::before': {
                  content: '""',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  opacity: 0.5,
                },
                '& > div':{
                  position: 'relative'
                }
              }}>
              <IconButton onClick={toggleDrawer} 
                  sx={{ border: open? '1px solid': 'none',
                    backgroundColor: open? 'primary.main': 'unset',
                    borderColor: 'primary.contrastText',
                    color: 'primary.contrastText',
                    ':hover': { backgroundColor: open? 'secondary.main': 'unset'}
                  }}>
                {!open? <ChevronLeftRounded /> : <ChevronRightRounded />}
              </IconButton>
            </Toolbar>
          </Box>
        </Fade>
        <Drawer variant='persistent' anchor='left' open={open} onClose={toggleDrawer} transitionDuration={1000} 
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: (theme)=>theme.palette.mode==='dark'? 'rgba(0,0,0,0.6)': 'rgba(255,255,255,0.6)',
              border: 'none',
              display: 'flex', 
              flexDirection:'row',
              justifyContent:'flex-end',
              width: {xs: '100%', sm: '50%', md: '40%', lg: '25%', xl: '20%'},
              boxSizing: 'border-box',
              '& > ul':{
                position: 'relative',
              }
            },
          }}
        >
          <Toolbar /> 
          <List component="nav" sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: 'initial',
            py: 10,
            textWrap: 'nowrap',
            [`.${buttonBaseClasses.root}`]:{ 
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
            [`.${buttonBaseClasses.root}:hover`]:{ 
              backgroundColor: 'primary.main',
            },
            [`.${svgIconClasses.root}`]:{ 
              color: 'primary.main',
            },
            [`.${listSubheaderClasses.root}`]:{ 
              backgroundColor: 'background.default',
              width: '100%', 
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }
            }}>             
              {children}
          </List>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'initial',
              p:0,
            }}>
            <IconButton onClick={toggleDrawer} 
            sx={{ border: '1px solid',
                  backgroundColor: 'primary.main',
                  borderColor: 'primary.contrastText',
                  color: 'primary.contrastText',
                  ':hover': { backgroundColor: 'secondary.main',
                  transition: theme.transitions.create(['transform'], {duration: 500}),
                  transform: 'translateX(-3px) scale(1.1)' 
                }
                }}>
              {open? <ChevronLeftRounded /> : <ChevronRightRounded />}
            </IconButton>
          </Toolbar>
        </Drawer>
        </>);
}

export default SideBar