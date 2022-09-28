
import Nav from './Nav/Nav';
import Header from './Header/Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout({options}) {
  return (
    <>
      <Nav/>
      <Header imgPath = {options.imgPath} title= {options.title} canEdit = {options.canEdit}/>
      <Outlet/>
      <Sidebar/>
      <Footer/>
    </>
  )
}

export default Layout