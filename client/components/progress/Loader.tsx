import React, {useState, FC, CSSProperties} from "react"
import {Box, Grow} from "@mui/material"
import PropagateLoader from "react-spinners/PropagateLoader"
import { useTheme } from '@mui/material/styles'

interface Props{
  style?: CSSProperties | undefined,
  size?: number,
  speedMultiplier?: number
}
const Loader: FC<Props>= ({size=15, speedMultiplier=1.5, style}) => {
  let [loading, setLoading] = useState();
  return (
    <Grow timeout={2000} id="zoom-loader" appear={true} in={true} color='inherit' unmountOnExit={true}>
      <Box>
        <PropagateLoader
          id="hashloader"
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={speedMultiplier}
          size={size}
          cssOverride={{...style}}
        />
      </Box>
    </Grow>
  );
}
export default Loader