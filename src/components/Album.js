import React, { useState } from 'react'
import '../styles/Album.css'
import Navbar from './Navbar';

function Album(props) {
    const {userId, id, title, handleClick, handleDelete} = props;
    const [UserId, setUserId] = useState(userId);
    const [Title, setTitle] = useState(title);
    const [update, setUpdate] = useState(false);
    const [popup, setPopup] = useState(false);
    // const handleUpdate = () => {
    //   setUpdate(true);
    // }
    const updateClick =() => {
      setUpdate(false);
      handleClick(id, UserId, Title);
    }
    const deleteClick =() => {
      handleDelete(id);
    }
  return (
    <>
    <div className='AlbumContainer'>
      <div className="details">
        <div style={{display: 'inlineBlock'}}><span>{id}</span></div>
        <div style={{display: 'inlineBlock'}}><span>{title}</span></div>
      </div>
      <div className='actions'>
        {!update && (<button onClick={() => setUpdate(true)}>Update</button>)}
        <button id='cancelBtn' onClick={deleteClick}>Delete</button>
      </div>
    </div>
    {update && (
    <div className='updatePopup'>
      <div className='updateContainer'>
        <div className="cross">
          <button onClick={() => setUpdate(false)}>X</button>
          </div>
        <div className="heading">
          <h1>Want to update album name ?</h1>
          <h3>Fill below form to update !!</h3>
        </div>
        <div className="body">
          <form onSubmit={updateClick} className='form'>
            <label >New Album Title</label> <br />
            <input type="text" id='input' value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' /> <br /> <br />
            <button className='formBtn'>UPDATE</button>
          </form>
          <button onClick={()=>setUpdate(false)} className='formBtn' id='cancelBtn'>Cancel</button>
        </div>
        <div className='footer'></div>
        
        
      </div>
    </div>
    )}
    </>
    
    // <div>
    //   <p>.........................................</p>
    //   <p>USER-ID = {userId} ID = {id}</p>
    //   <p>{title}</p>
    //   {/* {!update && ( <button onClick={handleUpdate()}>UPDATE</button> )} */}
    //   <button onClick={() => setUpdate(true)}>UPDATE</button>
    //   {update && 
    //     <>
    //       <input type="number" value={UserId} onChange={(e) => setUserId(e.target.value)} />
    //       <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} />
    //       <button onClick={updateClick}>UPDATE</button>
    //     </>
    //   }
    //   <br />
    //   <button onClick={deleteClick}>DELETE</button>
    // </div>
  )
}

export default Album;
