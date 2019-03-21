import React from 'react';

const EditUser = (props) => {
  return (
    <div>
      <h6>Edit User</h6>
      <form onSubmit={props.closeModalAndUpdate}>

          <input classNamp="editInput" type='text' name="username" placeholder="New username" onChange={props.handleEditFormInput} value={props.userToEdit.username}/>

          <input classNamp="editInput" type='text' name="password" placeholder="New password" onChange={props.handleEditFormInput} value={props.userToEdit.password}/>
        
        <input type='Submit'/>
      </form>
    </div>
    )

}


export default EditUser;