import { useEffect, useState } from "react";
import { getAlbums, addAlbum, updateAlbum, deleteAlbum } from "../api";
import AddModal from "./AddModal";
import Album from "./Album";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

function App() {
  // to store all the albums which we fetched from the the api we used albums, setAlbums
  const [albums, setAlbums] = useState([]);
  // if user clicked add album then to show popup modal we used this hook
  const [addAlbumPopup, setAddAlbumPopup] = useState(false);
  // whenever system is fetching info from api we display loader, this indacator helps in displaying loader
  const [isloading, setIsloading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  useEffect(() => {
    // whenever page loaded, this fn is very first implemented
    // here we will fetch all albums data from api
    const getData = async() => {
      const data = await getAlbums();
      // setting data into albums
      setAlbums(data.data);
      // stops loading
      setIsloading(false);
    }
    getData();
    
  },[]);

  // when user submits add album form
  const handleAddAlbum = async(userid, title) =>{
    // starts loading
    setIsloading(true);
    // sending request to add new album
    const data = await addAlbum(userid, title);
    // console.log(data);
    // adding album into current albums list
    setAlbums([
      ...albums,
      data.data
    ])
    // stops loading
    setIsloading(false);
  }

  // when user submits update album form
  const handleUpdateAlbum = async(ID, UserId, Title) => {
    // console.log(UserId, Title);
    // starts loading
    setIsloading(true);
    // sending request to update current album data
    const data =  (await updateAlbum(ID, UserId, Title)).data;
    // console.log(data);
    // when album is updated, we update that particular album from the list
    const updatedAlbum = albums.map(obj => {
      if(obj.id === ID){
        return {...obj, title: data.title, userId: data.userId}
      }
      return obj;
    })
    // updating albums list
    setAlbums(updatedAlbum);
    // stops loading
    setIsloading(false);
  }

  // when user clicks delete button
  const handleDeleteAlbum = async(ID) => {
    // console.log(ID);
    // starts loading
    setIsloading(true);
    // sending request to delete album
    const data = (await deleteAlbum(ID)).data;
    console.log(data);
    // once the album is deleted we remove that album from the list
    const filteredAlbum = albums.filter(alb => {
      return alb.id !== ID ;
    })
    // console.log(filteredAlbum);
    // updating albums list
    setAlbums(filteredAlbum);
    // stops loading
    setIsloading(false);
  }

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage ;
  const indexOfFirstPost = indexOfLastPost - postsPerPage ;
  const currentPosts = albums.slice(indexOfFirstPost, indexOfLastPost);

  // change page 
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div style={{fontFamily: 'Inter, sansSerif' }}>
      {/* Navbar component */}
      <Navbar setAddAlbumPopup={setAddAlbumPopup}/>
      {addAlbumPopup && (
        // if user clicks add album btn, show popup modal  AddModal component
        <AddModal setCloseModal={setAddAlbumPopup} handleAddAlbum={handleAddAlbum} />
      )}
      <br /><br />
      {/* if page is loading show loader otherwise show albums  */}
      {isloading ? <Loader /> : 
      <>
      {/* passing each album data to album component and rendering all albums on home page */}
      <div style={styles.albCont}>
        {/* passing album data using map */}
        {currentPosts.map((album, index) => {
          return (
            <Album userId={album.userId}  id={album.id} title={album.title} key={index} handleClick={handleUpdateAlbum} handleDelete={handleDeleteAlbum} />
          )
        })}
      </div> 
      <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={albums.length}
          paginate={paginate}
      />
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
