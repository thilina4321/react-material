import React, { useEffect, useState } from 'react'
import './Chatbar.css'
import Messages from './Messages/Messages'

import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import db from '../../firebase/Firebase'
import * as actionType from '../../store/actionType'


import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import Sidebar from '../SideBar/Sidebar';

const Chatbar = () =>{

    const [open, setOpen] = useState(false);
  const toggleDrawer = (value) =>{
    setOpen(value)
  }


    const user = useSelector(state => state.user.user)
    const channelId = useSelector(state => state.channels.channelId)
    const channelName = useSelector(state => state.channels.channelName)
    const messages = useSelector(state => state.channels.messages.filter(msg=>msg.channelId === channelId))
    const dispatch = useDispatch()


    useEffect(()=>{
        if(channelId){
        db.collection('channels').doc(channelId).collection('messages')
        .onSnapshot(snapshot=>{
            const messages = snapshot.docs.map(doc=>{
                return {
                    id:doc.id,
                    channelId:doc.data().channelId,
                    message:doc.data().message,
                    
                }
            })
            dispatch({
                type:actionType.MESSAGES,
                messages:messages
            })
        
        })}
    },[channelId,dispatch])

    const onAddMessage = (e)=>{
        e.preventDefault()
        db.collection('channels').doc(channelId).collection('messages')
        .add({
            channelId:channelId,
            message:e.target.elements.message.value
        })

        e.target.elements.message.value = ''

    }

    return (
        <div className="chatbar">

        <div className="chatbar__drawer">
        <Hidden only={['lg', 'md', 'sm']}>
        <Button color="inherit" onClick={()=>toggleDrawer(true)}> <Menu/> </Button>
          <Drawer 
          anchor="left" open={open} onClose={()=>toggleDrawer(false)}>
            <Sidebar clickChannel={()=>toggleDrawer(false)}/>
          </Drawer>
        </Hidden>
        </div>
        

                <div className="chatbar__channel">
                { channelName && <h2> # { channelName} </h2>  }
            </div>

            <Divider/>
            <div className="chatbar__messages">
            {messages.map(msg=>{
                return <Messages key={msg.id}
                 name={user.name} image={user.image} msg={msg.message}/>

            })}
            </div>
            <div className="chatbar__input">
            {channelId ?
                <form onSubmit={(e)=>onAddMessage(e)}>
                <input name="message"
                /> 
                </form>
                : <input disabled /> } 
                </div>
                
                </div>

            
                )
}

export default Chatbar
