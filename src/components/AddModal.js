import '../styles/AddModal.css';
import React, { useState } from 'react'

function AddModal({setCloseModal, handleAddAlbum}) {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const handleSubmit =(e) => {
        e.preventDefault();
        handleAddAlbum(id, title);
        setCloseModal(false);
    }
  return (
    <div className='modalBackGround'>
      <div className="modalContainer">
          <div className="close">
              <button onClick={() => setCloseModal(false)}>X</button>
          </div>
          <div className="title"> <h1>Complete below form to add album !!</h1></div>
          <div className="body">
              <label> User ID</label> 
              <input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder='Enter user id' /> <br />
              <label >Title</label>
              <input className='input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title of your album" /> <br />
          </div>
          <div className="foot">
              <button id='cancelBtn' onClick={() => setCloseModal(false)}>Cancel</button>
              <button onClick={handleSubmit}>Continue</button>
          </div>
      </div>
    </div>
  )
}

export default AddModal
