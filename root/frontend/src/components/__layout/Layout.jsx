
import Nav from './Nav/Nav';
import Header from './Header/Header';
import Heading from './Header/Heading';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { LayoutProvider } from '../../context/LayoutContext';
import { DataProvider } from '../../context/DataContext';
import ParentGrid from './ParentGrid';

function Layout({options}) {
  return (
  <DataProvider>
    <LayoutProvider>
      <ParentGrid>
        <Nav/>
        <Header />
        <Heading options = {options} />
        <Outlet/>
        <Sidebar/>
        <Footer/>
      </ParentGrid>
    </LayoutProvider>
  </DataProvider>
  )
}

export default Layout