
import {Fragment, useEffect, useState } from "react";
import Sidebar from "./components/SideBar/Sidebar";
import './App.css'
import Chatbar from "./components/Chatbar/Chatbar";

import Hidden from '@material-ui/core/Hidden';

import {auth} from './firebase/Firebase'
import Auth from './Auth/Auth'

import { useDispatch } from 'react-redux';
import * as actionType from './store/actionType'

const App = ()=> {

  
  const [isAuth, setIsAuth] = useState(false)
  
const dispatch = useDispatch()

  

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

        

          <Hidden only={['xs']}>
            <Sidebar />
          </Hidden>
          <Chatbar/>
        </div>

      }

        
      </Fragment>
        
    )
  }


export default App;
