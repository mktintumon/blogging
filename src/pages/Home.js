import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { FaTrashAlt } from "react-icons/fa";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };


  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <div className="homePage">
      {
      postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {
                isAuth && post.author.id === auth.currentUser.uid && (
                  <button onClick={() => {deletePost(post.id);}}><FaTrashAlt/></button>
                )
                }
              </div>
              
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h5>Posted on : {date} &nbsp;&nbsp;&nbsp;  Author : {post.author.name}</h5>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
