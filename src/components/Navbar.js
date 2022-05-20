// import React from 'react'
// import {Link} from 'react-router-dom';


function Navbar({setAddAlbumPopup}) {
  return (
    <div style={styles.navbar}>
        <div className="appName">&lt;CRUD Album&gt; </div>
        <div className="addAlbumBtn">
          <button style={styles.addAlbumBtn} onClick={() => setAddAlbumPopup(true)}>Add Album</button>
        </div>
      </div> 
  )
}

export default Navbar

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'coral',
    fontSize: '2.5rem',
    color: 'white',
    padding: 5,
    fontWeight: 'bold'
  },
  addAlbumBtn: {
    width: '150px',
    height: '45px',
    margin: '10px',
    border: 'none',
    backgroundColor: '#c54873',
    color: 'white',
    borderRadius: '8px',
    fontSize: '20px',
    cursor: 'pointer',
  },
}