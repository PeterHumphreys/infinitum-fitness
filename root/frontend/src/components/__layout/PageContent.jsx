import {Outlet} from 'react-router-dom';

function PageContent({myComponent, isLoading}) {
  return (
    <Outlet
      element = {myComponent}
      isLoading = {isLoading}
    />
  )
}

export default PageContent