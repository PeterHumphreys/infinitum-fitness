
import Nav from './Nav/Nav';
import Header from './Header/Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout({isLoading, options, accountBoxData}) {
  return (
    <>
      <Nav/>
      <Header 
        options = {options}
        accountBoxData = {accountBoxData}
        />
      <Outlet
        isLoading = {isLoading}/>
      <Sidebar/>
      <Footer/>
    </>
  )
}

export default Layout