import React, {ChangeEvent, useEffect, useState} from 'react'
import {Divider, InputBase, Box, FormControl, inputBaseClasses, selectClasses, IconButton, useMediaQuery} from '@mui/material'
import {Error, Search as SearchIcon} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
// import {list} from './api-gallery'
import { ClearAdornment, Pagination, SelectButton } from '../styled-buttons'
import { StyledSnackbar } from '../styled-banners'
import { WallPaperYGW } from '../wallpapers/wallpapers'

export default function Search() {
  const { transitions, breakpoints, palette } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'), {defaultMatches: true})
  const [values, setValues] = useState({
      category: '',
      search: '',
      results: {},
      searched: false,
      error: ''
  })
  const [enrollments, setEnrollments] = useState([])
 
  const handleChange = (name: string) => (event) => {
    setValues({
      ...values, [name]: event.target.value,
    })
  }

  const handleClear = () => {
    setValues({...values, search: ''})
  }

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    search(page)
  }
  
  const search = (page?: number) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    if(values.search){
      // list({search: values.search, category: values.category, page}, signal).then((data) => {
      //   if (data && data.error) {
      //     setValues({...values, error: data.error})
      //   } else {
      //     setValues({...values, results: data, searched:true})
      //   }
      // })
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
    const signal = abortController.signal
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
        <WallPaperYGW id='search-results' variant='linear' primaryColor={palette.background.paper} secondaryColor={palette.background.default}
          style={{
            '& > div':{
              position: 'relative'
            }
          }}>
          {/* {values.results && values.results.gallery &&  enrollments && 
          (<Gallery gallery={values.results.gallery} searched={values.searched} enrollments={enrollments}/>)
          } */}
          {/* {values.results && values.results.count && values.results.page && 
          (<Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4}}>
            <Pagination size={matchMobileView? 'small': 'medium'} shape='circular' variant='outlined' onChange={handlePageChange} page={Number(values.results.page)} count={Number(values.results.count)} siblingCount={1}/>
          </Box>)} */}
        </WallPaperYGW>  
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