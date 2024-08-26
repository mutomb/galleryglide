import React, { FC, useEffect, useState } from 'react'
import {Box, Grid, Container} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import { WallPaperYGW } from '../wallpapers/wallpapers'
import { HomePopularGallery } from '.'
import { listTopics } from './gallery-api'
import { StyledSnackbar } from '../styled-banners'
import { Error } from '@mui/icons-material'
import { Loader } from '../progress'
import { actionTypes, useSideBar } from '../sidebar'

const HomeHero: FC = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [{topic}, dispatch] = useSideBar()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true)
    listTopics(signal).then((data) => {
      if (data && data.error) {
         setError(data.error)
         setLoading(false)
      } else {
        dispatch({type: actionTypes.SET_TOPICS, topics: data})
        dispatch({type: actionTypes.SET_TOPIC, topic: data[0]})
        setLoading(false)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  if(loading){
    return(
      <Box sx={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Loader size={30}/>
      </Box>)
  }
  return (
    <WallPaperYGW variant='linear' primaryColor={theme.palette.background.paper} secondaryColor={theme.palette.background.default} //secondaryColor={theme.palette.mode==='light'? theme.palette.secondary.light: theme.palette.secondary.dark}
    style={{
      '& > div':{
        position: 'relative'
      }
    }}>
    <Box id="hero" sx={{ position: 'relative', pt: 4, pb: { xs: 2, md: 4 } }}>
      <Container maxWidth={false} sx={{px: {xs: 0, sm: 1, md: 2}}}>
        <HomePopularGallery/>
      </Container>
    </Box>
    <StyledSnackbar
      open={error? true: false}
      duration={3000}
      handleClose={()=>setError('')}
      icon={<Error/>}
      heading={"Error"}
      body={error}
      variant='error'
      />
    </WallPaperYGW>
  )
}

export default HomeHero
