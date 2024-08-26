import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
interface WallpaperProps{
 children?: ReactNode,
 variant?: 'linear' | 'radial'
 primaryColor: string,
 secondaryColor: string,
 style?: any
 overlayStyle?: any,
 id?: string,
 ref?: any,
}
const WallPaperYGW: FC<WallpaperProps> = ({children, variant, primaryColor, secondaryColor, style, id,ref, overlayStyle}) =>{
  return (
      <Box 
      id={id} ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden',
        background: `${variant? variant: 'linear'}-gradient(${primaryColor} 0%, ${secondaryColor} 100%)`,
        transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
        ...style
      }}>
      <Box sx={{m:0, p:0, width: '100%', height: '100%', bgcolor: (theme) => theme.palette.mode ==='dark'?`rgba(0,0,0,0.7)`:`rgba(255,255,255,0.7)`, boxShadow: 4, zIndex: 4, ...overlayStyle}}>
      {children}
      </Box>
      </Box>
  )
}

export {WallPaperYGW}