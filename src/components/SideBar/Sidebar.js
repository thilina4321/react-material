import React, { useEffect } from 'react'
import './Sidebar.css'
import * as actionType from '../../store/actionType'
import Add from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import SidebarChannels from './SidebarChannels/SidebarChannels';
import { useDispatch, useSelector } from 'react-redux';
import db from '../../firebase/Firebase'

const Sidebar = ()=> {
    const user = useSelector(state => state.user.user)
    const channels = useSelector(state => state.channels.channels)
    const dispatch = useDispatch()


    useEffect(()=>{
       db.collection('channels').onSnapshot(snapShot=>{
            if(snapShot.docs.length > 0){
                const channels = snapShot.docs.map(doc=>{
                    console.log(doc.data().channelName);
                    return {
                        id:doc.id,
                        name:doc.data().channelName,
                        user:doc.data().user

                    }
                })
                dispatch({
                    type:actionType.CHANNELS,
                    channels:channels
                })
            }
        })
    }, [dispatch])

    const onAddChannel = ()=>{
        const channel = prompt('Enter Channel name')
        if(channel){
            db.collection('channels').add({
                channelName:channel,
                user:user.name
            })
        }

    }

    return (
        <div className="sidebar">

            <div className="sidebar__channel">
                <h3> Text Channels </h3>
                <p onClick={onAddChannel} > <Add /> </p> 
            </div>

            <div className="sidebar__channel__names">
                
                {channels.map(ch=>{
                    return <SidebarChannels
                    name={ch.name}
                    id={ch.id}
                     key={ch.id}/>

                })}
            </div>

            <div className="sidebar__channel__avatar">
                
                <Avatar src={user.image}/>
                <h3> {user.name} </h3>
            </div>

        </div>
    )
}

export default Sidebar
