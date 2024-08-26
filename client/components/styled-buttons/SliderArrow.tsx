import React, { FC } from 'react'
import {ChevronLeftRounded, ChevronRightRounded} from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

interface SliderArrowProps {
    onClick?: () => void
    type: 'next' | 'prev'
    className?: 'string',
    style?: any
  }
  const SliderArrow: FC<SliderArrowProps> = (props) => {
    const { onClick, type, className, style } = props
    return (
        <Box
          className={className}
          onClick={onClick}
          sx={{
            ...style,
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            bottom: '0 !important',
            top: 'unset !important',
            width: {xs: 0, sm: 50, md: 90 },
            boxShadow: (theme)=> theme.shadows[3],
            p:0,
            alignSelf: 'center',
            left: type === 'prev' ? -20: 'unset',
            right: type !== 'prev' ? -20: 'unset',
            border: '1px solid',
            borderColor:'primary.contrastText',
            borderTopRightRadius: type === 'prev' ? 10: 0,
            borderBottomRightRadius: type === 'prev' ? 10: 0,
            borderTopLeftRadius: type !== 'prev' ? 10: 0,
            borderBottomLeftRadius: type !== 'prev' ? 10: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            '&> svg':{ height: {sm: 40, md: 50}, width: {sm: 40, md: 50}, color: 'primary.main'},
            ':hover': { 
              backgroundColor: 'rgba(18, 124, 113, 0.3)', transition: (theme)=>theme.transitions.create(['background-color', 'color'], {duration: 500}),
              '&> svg':{ height: {sm: 40, md: 50}, width: {sm: 40, md: 50}, color: 'primary.contrastText', transition: (theme)=>theme.transitions.create(['color'], {duration: 500}),}
            },
          }}>
            {type === 'prev' ? <ChevronLeftRounded /> : <ChevronRightRounded />}
        </Box>
    )
  }
  export default SliderArrow