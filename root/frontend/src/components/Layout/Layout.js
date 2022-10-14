
import Nav from './Nav/Nav';
import Header from './Header/Header';
import Heading from './Header/Heading';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { LayoutProvider } from '../../context/LayoutContext';
import { DataProvider } from '../../context/DataContext';

function Layout({options}) {
  return (
    <>
      <DataProvider>
        <LayoutProvider>
          <Nav/>
          <Header />
          <Heading options = {options} />
        </LayoutProvider>
        <Outlet/>
        <Sidebar/>
      </DataProvider>
      <Footer/>
    </>
  )
}

export default Layout