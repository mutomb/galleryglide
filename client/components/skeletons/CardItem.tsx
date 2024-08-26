import React, { FC } from 'react';
import {Box, iconButtonClasses, Rating, Skeleton, Typography, Zoom} from '@mui/material';
import {SxProps, Theme} from '@mui/material/styles'

interface Props {
  wrapperStyle?: SxProps<Theme>
}

const CardItem: FC<Props> = ({ wrapperStyle }) => {
  return (
    <Zoom timeout={1000} id="zoom-card" appear={true} in={true} color='inherit' unmountOnExit={true}>
      <Box
        sx={{
          py: {xs: 1, md: 2},
          mx:{xs: 0, sm: 0.5, md: 1},
          maxWidth: 400,
          ...wrapperStyle
        }}>
        <Box
          sx={{
            width: '100%', pb: 0.5, backgroundColor: 'background.paper', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftStyle: 'solid', 
            borderLeftColor: 'background.paper', borderLeftWidth: {xs: 1, sm: 4, md: 6},
            transition: (theme) => theme.transitions.create(['box-shadow', 'border-left-color'], {duration: 500}),
            '&:hover': {
              boxShadow: 2, borderLeftColor: 'primary.main',
              [`& .${iconButtonClasses.root}`]: {
                backgroundColor: 'primary.main',
                color: '#fbfbfb',
                boxShadow: 2,
              },
            },
          }}>
          <Box
          id='image'
            sx={{lineHeight: 0, overflow: 'hidden', borderTopRightRadius: 10, borderBottomRightRadius: 10, height: 200, width: '100%', mb: 0.5, 
            }}>
            <Skeleton  width={'100%'} height={200} sx={{boxShadow: 4, borderRadius: 1, gbcolor:(theme)=> theme.palette.mode==='dark'? `linear-gradient(rgba(0,0,0, 0.5) 0%, rgba(18, 124, 113, 0.5) 97%, ${theme.palette.primary.main} 100%)`: `linear-gradient(rgba(255,255,255, 0.5) 0%, rgba(18, 124, 113, 0.5) 97%, ${theme.palette.primary.main} 100%)`}} variant="rectangular"/>
          </Box>
          <Box sx={{ mb: 2, width: '100%' }}>
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Typography
                id='title'
                component="h2" variant="h5"
                sx={{
                  textAlign: 'start', fontSize: {xs: '1.1rem', sm: '1.2rem', md: '1.3rem'},
                  pt: 2,
                  lineHeight: 1,
                  fontWeight: 'bold',
                  width: '100%',
                }}>
                <Skeleton width={'100%'} sx={{boxShadow: 4, background: 'background.default', borderRadius: 1}}/>
              </Typography>
            </Box>
          </Box>
          <Box sx={{width: '100%',  display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Box sx={{width: '70%',  display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{width: '1000%', color: 'primary.main'}}>
                  <Skeleton width={'100%'} sx={{boxShadow: 4, background: 'primary.main', borderRadius: 1}}/>
              </Typography>
            </Box>
            <Box id='button' sx={{width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Skeleton  width={20} height={20} sx={{boxShadow: 4, borderRadius: '50%', bgcolor: 'primary.main'}} variant="rounded"/>            
            </Box>
          </Box>
        </Box>
      </Box>
    </Zoom>
  )
}
export default CardItem
