import React, { useEffect, useState } from 'react'
import {Box, IconButton, Typography, useMediaQuery} from '@mui/material'
import Slider, { Settings } from 'react-slick'
import { useTheme } from '@mui/material/styles'
import {SliderArrow} from '../styled-buttons'
import { Error, Favorite } from '@mui/icons-material'
import { StyledSnackbar } from '../styled-banners'
import { CardItemSkeleton } from '../skeletons'
import { useSideBar } from '../sidebar/SideBarProvider';
import { listPhotosByTopic } from './gallery-api'
import GalleryCardItem from './gallery-card-item'
import { actionTypes } from '../sidebar'

const HomePopularGallery = () => {
  const [{ open, topic, photos }, dispatch] = useSideBar()
  const theme = useTheme()
  const xsMobileView = useMediaQuery(theme.breakpoints.down('sm'))
  const smMobileView = useMediaQuery(theme.breakpoints.down('md'))
  const mdMobileView = useMediaQuery(theme.breakpoints.down('lg'))
  const lgMobileView = useMediaQuery(theme.breakpoints.down('xl'))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const sliderConfig: Settings = {
    infinite: true,
    autoplay: !open,
    speed: 1000,
    slidesToShow:xsMobileView? 1: smMobileView?2: mdMobileView?3: lgMobileView?4: 5,
    slidesToScroll: 1,
    rows: 2,
    slidesPerRow: 1,
    arrows: !open,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: false,
    swipe: !open,
    focusOnSelect: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    centerMode: xsMobileView ? false: true,
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true)
    topic && topic.slug && listPhotosByTopic(signal, topic.slug).then((data) => {
      if (data && data.error) {
         setError(data.error)
         setLoading(false)
      } else {
        dispatch({type: actionTypes.SET_PHOTOS, photos: data})
        setLoading(false)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [topic])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true)
    topic && topic.slug && listPhotosByTopic(signal, topic.slug).then((data) => {
      if (data && data.error) {
         setError(data.error)
         setLoading(false)
      } else {
        dispatch({type: actionTypes.SET_PHOTOS, photos: data})
        setLoading(false)
      }
    })
    topic && topic.title && topic.title.includes('Searched:') && setLoading(false)
    return function cleanup(){
      abortController.abort()
    }
  }, [topic])

  const getAction = () =>(
        <IconButton aria-label={'photo'} color="primary" 
          sx={{
              zIndex: 10,
              transform: 'unset',
              color:"primary.main",
              '&:hover':{
                color: 'primary.contrastText',
                bgcolor: 'primary.main',
                boxShadow: 2,
                transform: 'translateY(-3px) scale(1.1)',
                transition: (theme) => theme.transitions.create(['transform'], {duration: 500})
          }}}>
          <Favorite />
        </IconButton>
        )

  if(loading){
    return(
      <Box sx={{width: '100%', ['& .slick-list']: { ml: 0}}}>
        <Slider {...sliderConfig}>
          {Array.from(new Array(20)).map((v,i)=>(<CardItemSkeleton key={i} />))}
        </Slider>
      </Box>)
  }
  return (<>
          <Box sx={{width: '100%', py: 1, textAlign: 'center'}}> 
            {topic && topic.title && <Typography sx={{ pb: 1, fontWeight: 500, fontSize: '1.2rem', color: 'text.primary'}}>Topic: {topic.title}</Typography>}
          </Box>
          {(photos.length < 5) ? 
          (<Box sx={{['& .slick-list']: { ml: 0}, ['& .slick-slider']: { width: '100%'}, ['& .slick-slide> div > div > div']: {transform: 'scale(0.9)', transition: theme.transitions.create(['box-shadow', 'transform', 'filter'], {duration: 2000})}, ['& .slick-slide.slick-active.slick-current > div > div > div']: {filter: 'blur(0px)', boxShadow: 4, transform: 'scale(1.03)', transition: theme.transitions.create(['box-shadow', 'transform', 'filter'], {duration: 2000})}, width: '100%', display: 'flex', flexDirection: {xs: 'column', sm: 'row'}}}>
            <Slider {...sliderConfig}>
            {[...photos, ...photos, ...photos].map((photo, index)=>(
              <GalleryCardItem key={String(photo.id)} photo={photo} action={getAction()}/>
            ))}
            </Slider>
          </Box>):
          (<Box sx={{['& .slick-list']: { ml: 0}, ['& .slick-slider']: { width: '100%'}, ['& .slick-slide> div > div > div']: {transform: 'scale(0.9)', transition: theme.transitions.create(['box-shadow', 'transform', 'filter'], {duration: 2000})}, ['& .slick-slide.slick-active.slick-current > div > div > div']: {filter: 'blur(0px)', boxShadow: 4, transform: 'scale(1.03)', transition: theme.transitions.create(['box-shadow', 'transform', 'filter'], {duration: 2000})}, width: '100%', display: 'flex', flexDirection: {xs: 'column', sm: 'row'}}}>
            <Slider {...sliderConfig}>
            {photos.map((photo) => (
              <GalleryCardItem key={String(photo.id)} photo={photo} action={getAction()} 
              wrapperStyle={{['& > div']: {bgcolor: theme.palette.mode ==='dark'? 'rgba(0,0,0,0.8) !important':'rgba(255,255,255,0.8) !important'} }}/>
            ))}
            </Slider>
          </Box>)}
          <StyledSnackbar
            open={error? true: false}
            duration={3000}
            handleClose={()=>setError('')}
            icon={<Error/>}
            heading={"Error"}
            body={error}
            variant='error'
            />
          </>)
}

export default HomePopularGallery
