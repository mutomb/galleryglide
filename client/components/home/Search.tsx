import React, {ChangeEvent, useEffect, useState} from 'react'
import {InputBase, Box, FormControl, IconButton, useMediaQuery} from '@mui/material'
import {Error, Search as SearchIcon} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { ClearAdornment } from '../styled-buttons'
import { StyledSnackbar } from '../styled-banners'
import { searchPhotos } from './gallery-api'
import { actionTypes, useSideBar } from '../sidebar'

export default function Search() {
  const { breakpoints } = useTheme()
  const [values, setValues] = useState({
      category: '',
      search: '',
      results: {},
      searched: false,
      error: ''
  })
  const [{}, dispatch] = useSideBar()
 
  const handleChange = (name: string) => (event) => {
    setValues({
      ...values, [name]: event.target.value,
    })
  }

  const handleClear = () => {
    setValues({...values, search: ''})
  }

  
  const search = (page?: number) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    if(values.search){
      searchPhotos(signal, values.search, page, 20).then((data) => {
        if (data && data.error) {
          setValues({...values, error: data.error})
        } else {
          dispatch({type: actionTypes.SET_TOPIC, topic: {title: `Searched: ${values.search}`}})
          dispatch({type: actionTypes.SET_PHOTOS, photos: data.results})
        }
      })
    }
  }
  const enterKey = (event) => {
    if(event.keyCode == 13){
      event.preventDefault()
      search()
    }
  }
  const handleClose = () =>{
    setValues({...values, error: ''})
  }
  useEffect(() => {
    const abortController = new AbortController()
    return function cleanup(){
        abortController.abort()
    }
  }, [])
    return (
      <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', width: '100%'}}>
        <Box id='search-inputs'
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            width: {xs: '100%', md: '60%'},
            py: 4,
          }}>
          <Box sx={{flex:1, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}> 
            <FormControl fullWidth
            sx={{flex:1, backgroundColor: 'background.paper', mr:0, my:0}}>
              <InputBase
                value={values.search}
                id="search"
                onKeyDown={enterKey}
                onChange={handleChange('search')}
                placeholder="Seach photos and illlustrations"
                endAdornment={<ClearAdornment position='end'  value={values.search} handleClick={handleClear}/>}
                sx={{width: '100%', height: {xs: 48, sm: 56, md: 62}, px: 2, borderLeftStyle: 'solid', borderLeftColor: 'primary.main', borderLeftWidth: {xs: 1, sm: 2, md: 4}}}
              />
            </FormControl>
            <IconButton disableRipple onClick={()=>search} type="button" sx={{ p: '10px', backgroundColor: 'background.paper', borderTopRightRadius: '50%', borderBottomRightRadius: '50%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: {xs: 48, sm: 56, md: 62}, ':hover':{backgroundColor: 'background.paper'} }} aria-label="search">
              <SearchIcon  sx={{ ':hover':{color: 'primary.main'}}}/>
            </IconButton>
          </Box>
        </Box> 
        <StyledSnackbar
        open={values.error? true: false}
        duration={3000}
        handleClose={handleClose}
        icon={<Error/>}
        heading={"Error"}
        body={values.error}
        variant='error'
        />
      </Box>  
    )
}