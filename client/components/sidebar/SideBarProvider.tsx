import React, { createContext, FC, ReactNode, useState, useContext, useReducer } from 'react'
/**SideBar context instance initialized*/
export const SideBarContext = createContext({}) 

export const useSideBar = () => useContext(SideBarContext) /**Hook encapsulating all sideBar state and functionalities*/

interface Props {
  initialState: any,
  children: ReactNode,
  reducer: any 
}
/** Pass sideBar and sideBar functionalites to children without explicitly passing props */
export const SideBarProvider: FC<Props> = ({ reducer, initialState, children }) => { 
  return (
  <SideBarContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </SideBarContext.Provider>
  )
}
