import React, { useState } from 'react'
import '../styles/Album.css'

function Album(props) {
    // extracting all info from props
    const {userId, id, title, handleClick, handleDelete} = props;
    // different useStae hooks to store info
    const [UserId, setUserId] = useState(userId);
    const [Title, setTitle] = useState(title);
    const [update, setUpdate] = useState(false);
    // const [popup, setPopup] = useState(false);

    // when user submits the update form 
    const updateClick =() => {
      // to close the modal
      setUpdate(false);
      // sending request to api to update data
      handleClick(id, UserId, Title);
    }
    // if user clicks delete button send request to api to delete album 
    const deleteClick =() => {
      handleDelete(id);
    }
  return (
    <>
    <div className='AlbumContainer'>
      <div className="details">
        {/* user id and title of album  */}
        <div style={{display: 'inlineBlock'}}><span>{id}</span></div>
        <div style={{display: 'inlineBlock'}}><span>{title}</span></div>
      </div>
      <div className='actions'>
        {/* button to update and delete */}
        {!update && (<button onClick={() => setUpdate(true)}>Update</button>)}
        <button id='cancelBtn' onClick={deleteClick}>Delete</button>
      </div>
    </div>
    {/* when user clicks the delete button we display modal, where user can change data */}
    {update && (
    <div className='updatePopup'>
      <div className='updateContainer'>
        {/* button to delete modal */}
        <div className="cross">
          <button onClick={() => setUpdate(false)}>X</button>
          </div>
        <div className="heading">
          {/* headings */}
          <h1>Want to update album name ?</h1>
          <h3>Fill below form to update !!</h3>
        </div>
        <div className="body">
          {/*  form for taking updated data from user */}
          <form onSubmit={updateClick} className='form'>
            <label >New Album Title</label> <br />
            {/* title name */}
            <input type="text" id='input' value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' /> <br /> <br />
            {/* update button to send req to update data */}
            <button className='formBtn'>UPDATE</button>
          </form>
          {/* cancel button to abort form and close modal */}
          <button onClick={()=>setUpdate(false)} className='formBtn' id='cancelBtn'>Cancel</button>
        </div>
        <div className='footer'></div>
      </div>
    </div>
    )}
    </>
  )
}

export default Album;
