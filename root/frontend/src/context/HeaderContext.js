import {createContext, useState, useEffect} from 'react';
const HeaderContext = createContext({});

export function HeaderProvider({children})
{
  return (
    
    <HeaderContext.Provider value={{

    }}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderContext;