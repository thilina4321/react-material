import React, { useEffect } from 'react'
import './Chatbar.css'
import Messages from './Messages/Messages'

import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import db from '../../firebase/Firebase'
import * as actionType from '../../store/actionType'

const Chatbar = () =>{


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

                <div className="chatbar__channel">
                <h2>  { channelName} </h2>  
            </div>

            <Divider />
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
