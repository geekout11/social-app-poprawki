import React from 'react';
import './Followers.css';

function Followers({
  users,
}) {

  const createMarkup = () => {
    const markup = users.map((el) => {
      return (
        <div className="followers" key={el.id}>
          <div className="sidebar-user">
            <img className="sidebar-profile-img" src={el.avatar_url} alt="img" />
            <p className="sidebar-username">{el.username}</p>
            <p className="sidebar-email">{el.email}</p>
            <button className="follow-btn">Follow</button>
          </div>
          <hr/>
        </div>
      );
    });
    return markup;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-users-to-follow">
          <h3>Who to follow</h3>
        </div>
        <ul className="users-list">{users && createMarkup()}</ul>
      </div>
    </div>
  );
}

export default Followers;
