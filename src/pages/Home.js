import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

import { API } from '../data/Api';
import Post from '../components/Post';
import Followers from '../components/Followers';

function Home() {


  const { jwtToken } = useLocation().state;
  const [profileData, setProfileData] = useState('');
  const [posts, setPosts] = useState('');
  const [users, setUsers] = useState('');
  const [likes, setLikes] = useState([]);



  const profileAPI = new API('profile', jwtToken);
  const choosePostsType = {
    last: new API('last'),
    olderThen: new API('olderThen', jwtToken),
    newerThen: new API('newerThen', jwtToken),
  };


  const [postsAPI, setpostsAPI] = useState(choosePostsType.last);
  const allFollowsAPI = new API('allfollows', jwtToken);


  useEffect(() => {
    profileAPI.getData((res) => {
      if (res.status === 200) setProfileData(res.data);
    });
  }, []);

  useEffect(() => {
    postsAPI.getData(displayPosts);
    allFollowsAPI.getData(displayUsersList);
  }, [profileData]);


  const displayPosts = (res) => {
    const email = profileData.email || '';

    const likesArr = [];
    res.data.forEach((post) => {
      post.likes.forEach((el) => {
        if (el.email === email) {
          likesArr.push(post.id.toString());
        }
      });
    });

    setLikes(likesArr);
    setPosts(res.data);
  };

  const displayUsersList = (res) => {
    setUsers(res.data);
  };

  return (
    <div className="home-page">
      <Post
        posts={posts}
      />
      
      <Followers
        users={users}
      />
    </div>
  );
}

export default Home;
