import React, {useState} from 'react'
import {Box, Typography} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {Search} from '.'
import {ReactTyped}  from "react-typed"
import { Parallax } from 'react-parallax'
import image from '../../public/images/home/home-search.jpg' 
import { WallPaperYGW } from '../wallpapers/wallpapers'
import { StyledSnackbar } from '../styled-banners'
import { Error } from '@mui/icons-material'

const SearchedGallery = () =>{
  
    const [categories, setCategories] = useState([])
    const theme = useTheme()
    const [error, setError] = useState('')
    
    return (
    <Parallax bgImage={image}  strength={50}
      renderLayer={percentage=>(
      <WallPaperYGW variant='linear' primaryColor={theme.palette.primary.main} secondaryColor={theme.palette.background.paper} 
      style={{
        opacity: 0.4, position: 'absolute', width: '100%', height: '100%',
        '& > div':{
          position: 'relative'
        }
      }} overlayStyle={{bgcolor: (theme)=> theme.palette.mode ==='dark'?`rgba(0,0,0,0.7)`:`rgba(255,255,255,0.7)`}}
      />
      )}>
      <Box id="search" sx={{ pt: { xs: 8, md: 10 }, pb:0, width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            py: { xs: 2, md: 4 },
            textAlign: 'center',
            '& > span': {position: 'relative', py: 4},
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3.5rem' },
            '& > span>span>p': {display: 'inline', color: 'primary.main'},
            '& > span>span>span': {color: 'secondary.main'},
            '& > span>span>img': { position: 'absolute', bottom: 0, left:{xs: 10, md: 35}, width: {xs: 33, sm: 44, md: 66}, height: 'auto' },
          }}> 
            <ReactTyped
              startWhenVisible
              fadeOut
              strings={['<span>Gallery</span> <p>Glide</p>.', '<span>Explore</span> <p>Unplash</p> Photos.']}
              typeSpeed={100}
              loop
              smartBackspace={true}
              backDelay={3000}
              backSpeed={100}
            />
        </Box>
        <Box sx={{width: '100%', py: { xs: 1, md: 2 }, textAlign: 'center'}}> 
          <Typography sx={{ pb: 1, fontWeight: 500, fontSize: '1.2rem', color: 'text.primary'}}>The internet’s source of freely-usable visuals.</Typography>
          <Typography sx={{ pb: 1, fontWeight: 500, fontSize: '1.2rem', color: 'text.primary'}}>Powered by Unsplash creators.</Typography>
        </Box>
        <Search />
        <StyledSnackbar
          open={error? true: false}
          duration={3000}
          handleClose={()=>setError('')}
          icon={<Error/>}
          heading={"Error"}
          body={error}
          variant='error'
          />
      </Box>
    </Parallax>)
}
export default SearchedGallery