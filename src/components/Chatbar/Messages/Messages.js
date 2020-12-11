import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Messages.css'

function Messages(props) {
    return (
        <div className="messages">
            <div className="messages__user">
                <Avatar src={props.image}/>
                <h3> {props.name} </h3>
            </div>
            <div className="messages__msg">
                <p> {props.msg} </p>
            </div>
        </div>
    )
}

export default Messages
