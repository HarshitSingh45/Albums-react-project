import '../styles/AddModal.css';
import React, { useState } from 'react'
//  this component is used when user wnats to add album 
function AddModal({setCloseModal, handleAddAlbum}) {
    const [id, setId] = useState('');
    // title is used to change the name 
    const [title, setTitle] = useState('');
    const handleSubmit =(e) => {
        e.preventDefault();
        // when user clicks the submit btn we send the request to the api to add album
        handleAddAlbum(id, title);
        // close modal
        setCloseModal(false);
    }
  return (
    <div className='modalBackGround'>
      <div className="modalContainer">
        {/* btton to click modal */}
          <div className="close">
              <button onClick={() => setCloseModal(false)}>X</button>
          </div>
          {/* heading */}
          <div className="title"> <h1>Complete below form to add album !!</h1></div>
          <div className="body">
              <label> User ID</label> 
              {/* enter user id */}
              <input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder='Enter user id' /> <br />
              <label >Title</label>
              {/* enter title */}
              <input className='input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title of your album" /> <br />
          </div>
          <div className="foot">
            {/* cancel button to close modal  */}
              <button id='cancelBtn' onClick={() => setCloseModal(false)}>Cancel</button>
              {/* continue button to submit form */}
              <button onClick={handleSubmit}>Continue</button>
          </div>
      </div>
    </div>
  )
}

export default AddModal
