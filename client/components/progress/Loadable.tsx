import React from 'react';
import {LinearProgress, Box, Grow } from '@mui/material';
import loadable from '@loadable/component'
import { Loader } from '.';

function Loading() {
  return ( 
    <Box sx={{ width: '100%', position:'relative', color: 'secondary.main'}}>
      <LinearProgress  variant='indeterminate' sx={{height: '7px'}}/>
      <Box sx={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Loader size={20}/>
      </Box>
    </Box>
  );
}

const Loadable = (component) => (props) => { 
    const Component = loadable(()=>component, {fallback:<Loading />})
  return(<Component {...props}/>);
}
export default Loadable;