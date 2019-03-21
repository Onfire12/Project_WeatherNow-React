import React from 'react';
import { Button} from 'react-bootstrap';


const Users = (props) => {

  return (

    <div>
      <h3 className="username">{props.user.username}</h3>
      <Button className="delete" size="lg" onClick={props.deleteUser.bind(null, props.user._id)} >Delete</Button>
      <Button className="edit" size="lg" onClick={props.showModal.bind(null, props.user)} >Edit</Button>
    </div>
    )
}


export default Users;