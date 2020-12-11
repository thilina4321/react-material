import React from 'react'
import { useDispatch } from 'react-redux'
import './SidebarChannels.css'
import * as actionType from '../../../store/actionType'

const SidebarChannels = (props)=> {

    const dispatch = useDispatch()

    const onAddChaneel = (chId, name)=>{
        dispatch({
            type:actionType.CHANNELID,
            channelId:chId,
            channelName:name
        })
    }
    return (
        <div onClick={()=>onAddChaneel(props.id, props.name)}
        className="sidebar_ch_names_name">
            <h4 className="ch_name"> # {props.name} </h4>
        </div>
    )
}

export default SidebarChannels
