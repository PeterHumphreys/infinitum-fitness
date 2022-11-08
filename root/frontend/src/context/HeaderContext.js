import {createContext} from 'react';
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