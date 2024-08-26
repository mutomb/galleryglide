import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary',
  style?: any
}

const Logo: FC<Props> = ({ onClick, variant='primary', style }) => {

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 0, md: 3 },
        mb: 0,
        fontSize: { xs: '1.2rem', md: 'inherit' },
        '& > span': { display: 'block' },
        ...style
    }}>
    <Box
      sx={{ 
        display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'row',
        fontWeight: 700, 
        '& h1#gallery': { color: variant === 'primary' ? 'primary.main' : 'unset' },
        '& h1#glide': { color: variant === 'primary' ? 'secondary.main' : 'unset' }, 
      }}>
      <Typography component='h1' variant="h4" id="gallery">Gallery</Typography><Typography component='h1' variant="h4" id='glide'>Glide</Typography>
    </Box>
  </Box>
  )
}

export default Logo
