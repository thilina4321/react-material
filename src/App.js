
import {Fragment, useEffect, useState } from "react";
import Sidebar from "./components/SideBar/Sidebar";
import './App.css'
import Chatbar from "./components/Chatbar/Chatbar";

import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';

import {auth} from './firebase/Firebase'
import Auth from './Auth/Auth'

import { useDispatch } from 'react-redux';
import * as actionType from './store/actionType'

const App = ()=> {

  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false)
  
const dispatch = useDispatch()

  const toggleDrawer = (value) =>{
    setOpen(value)
  }

  useEffect(()=>{
    auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        setIsAuth(true)
        dispatch({type:actionType.USER,
          user:{
          name:userAuth.displayName,
          image:userAuth.photoURL,
          id:userAuth.uid
        }})
      }else{
        setIsAuth(false)
      }
      
    })
  }, [dispatch])


    return (
      <Fragment>

      {!isAuth ? <Auth /> : 
        <div className="app">

        <Hidden only={['lg', 'md', 'sm']}>
        <Button color="inherit" onClick={()=>toggleDrawer(true)}> <Menu/> </Button>
          <Drawer 
          anchor="left" open={open} onClose={()=>toggleDrawer(false)}>
            <Sidebar />
          </Drawer>
        </Hidden>

          <Hidden xsDown>
            <Sidebar />
          </Hidden>
          <Chatbar/>
        </div>

      }

        
      </Fragment>
        
    )
  }


export default App;
