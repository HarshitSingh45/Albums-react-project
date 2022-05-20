import { useEffect, useState } from "react";
import { getAlbums, addAlbum, updateAlbum, deleteAlbum } from "../api";
import AddModal from "./AddModal";
import Album from "./Album";
import Loader from "./Loader";
import Navbar from "./Navbar";

function App() {
  const [albums, setAlbums] = useState([]);
  const [userid, setUserid] = useState('');
  const [addAlbumPopup, setAddAlbumPopup] = useState(false);
  const [isloading, setIsloading] = useState(true);
  // const [id, setId] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/albums')
    // .then(response => response.json())
    // .then(data => setAlbums(data));
    const getData = async() => {
      const data = await getAlbums();
      console.log(data.data);
      setAlbums(data.data);
      setIsloading(false);
    }
    getData();
    
  },[]);

  const handleAddAlbum = async(userid, title) =>{
    // e.preventDefault();
    
    // const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     userid,
    //     title
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    // const data = await response.json();
    // console.log(data);
    // const addData = async() => {
    setIsloading(true);
    const data = await addAlbum(userid, title);
    console.log(data);
    setAlbums([
      ...albums,
      data.data
    ])
    setIsloading(false);
    // }
    // addData();
    // setAlbums([
    //   ...albums,
    //   data
    // ])
  }

  const handleUpdateAlbum = async(ID, UserId, Title) => {
    console.log(UserId, Title);
    setIsloading(true);
    // const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${ID}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     id: ID,
    //     title: Title,
    //     userId: UserId,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    // const data = await response.json();
    // console.log(data);

    const data =  (await updateAlbum(ID, UserId, Title)).data;
    console.log(data);
    const updatedAlbum = albums.map(obj => {
      if(obj.id === ID){
        return {...obj, title: data.title, userId: data.userId}
      }
      return obj;
    })
    setAlbums(updatedAlbum);
    setIsloading(false);
  }
  const handleDeleteAlbum = async(ID) => {
    console.log(ID);
    setIsloading(true);
    // const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${ID}`, {
    //   method: 'DELETE'
    // })
    // const data = await response.json();
    const data = (await deleteAlbum(ID)).data;
    console.log(data);

    const filteredAlbum = albums.filter(alb => {
      return alb.id !== ID ;
    })
    console.log(filteredAlbum);
    setAlbums(filteredAlbum);
    setIsloading(false);
  }
  return (
    <div style={{fontFamily: 'Inter, sansSerif' }}>
      <Navbar setAddAlbumPopup={setAddAlbumPopup}/>
      {addAlbumPopup && (
        <AddModal setCloseModal={setAddAlbumPopup} handleAddAlbum={handleAddAlbum} />
      )}
      <br /><br />
      {isloading ? <Loader /> : 
      <>
      <div style={styles.albCont}>
        {albums.map((album, index) => {
          return (
            <Album userId={album.userId}  id={album.id} title={album.title} key={index} handleClick={handleUpdateAlbum} handleDelete={handleDeleteAlbum} />
          )
        })}
      </div> 
      </>}
      
    </div>
  );
}

export default App;

const styles = {
  albCont : {
    display: 'flex',
    flexDirection: 'column',
    justifyContentent: 'center',
    alignItems: 'center',
    gap: '1.5rem',

  }
}
