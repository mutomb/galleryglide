import React, { FC, ReactNode } from 'react'
import {Box, Rating, Typography, Zoom} from '@mui/material'
import {SxProps, Theme} from '@mui/material/styles'
import { iconButtonClasses } from '@mui/material/IconButton'
import { Link } from 'react-router-dom'

interface Props {
  photo: any,
  action?: ReactNode,
  wrapperStyle?: SxProps<Theme>
}

const GalleryCardItem: FC<Props> = ({ photo, action, wrapperStyle }) => {
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
              boxShadow: 2, 
              [`& .${iconButtonClasses.root}`]: {
                backgroundColor: 'primary.main',
                color: '#fbfbfb',
                boxShadow: 2,
              },
            },
          }}
        >
          <Box
            sx={{lineHeight: 0, overflow: 'hidden', borderTopRightRadius: 10, borderBottomRightRadius: 10, height: 200, width: '100%', mb: 0.5, 
            }}>
            <Box component='img' src={photo.urls.small}  sx={{width:'100%', height:'100%'}} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h2" variant="h5" sx={{ mb: 1, width: '100%', textAlign: 'start', fontSize: {xs: '1.1rem', sm: '1.2rem', md: '1.3rem'}, color: 'text.primary' }}>
              {photo.title && photo.title.substring(0,50)}{photo.title && photo.title.substring(50).length>0 && '...'}
              </Typography>
              <Typography sx={{width: '100%', textAlign: 'start', mb: 1, color: 'text.secondary' }} variant="subtitle1">
                {photo.description && photo.description.substring(0,150)}{photo.description && photo.description.substring(150).length>0 && '...'}
              </Typography>
              {photo.owners && photo.owners[0] && photo.owners[0].unsplash &&  (<Typography variant='subtitle1' sx={{width: '100%', textOverflow: 'ellipsis', textAlign: 'start', color: 'text.secondary'}} noWrap> By { photo.owners[0].unsplash}</Typography>)}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {action}
          </Box>
        </Box>
      </Box>
    </Zoom>
  )
}

export default GalleryCardItem
