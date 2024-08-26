import React, { FC } from 'react'
import {useTheme} from '@mui/material/styles'
import {Box, Grid, Container, Typography, Typography, Divider} from '@mui/material'
import { WallPaperYGW } from '../wallpapers/wallpapers'

const Footer: FC = () => {
  const theme = useTheme()
  return (
    <WallPaperYGW primaryColor={theme.palette.primary.dark} secondaryColor={theme.palette.mode ==='dark'? 'rgba(0,0,0,0.3)': 'rgba(0,0,0,1)'} 
    overlayStyle={{bgcolor: 'rgba(0, 0, 0, 0)'}}>
      <Box component="footer" sx={{ boxShadow: 4, p:1, color: 'primary.contrastText', py:{xs:2, md:5}, mb:0, mt:'auto' }}>
        <Container sx={{px: {xs: 0, sm: 'unset'}}}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ width: { xs: '100%', md: 360 }, mb: { xs: 3, md: 0 } }}>
                <Typography sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Gallery Glide {new Date().getFullYear()}
                </Typography>
                <Divider sx={{mb: {xs: 0.5, sm: 1, md: 2, lg: 3, xl: 4}, mt: {xs: 0.5, sm: 1, md: 2, lg: 3, xl: 4}}}/>
                <Typography sx={{ color: 'primary.contrastText'}}>
                Discover the Extraordinary in Every Image!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </WallPaperYGW>
  )
}

export default Footer
