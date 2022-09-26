import React, { useState } from 'react';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function Posts({
  posts,
}) {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  };

  const createMarkup = () => {
    const markup = posts.map((el) => {
      const created = new Intl.DateTimeFormat('en-PL', dateOptions).format(
        new Date(el.created_at)
      );

      return (
        <div className="post" key={el.id}>
          <div className="post-wrapper">
            <div className="post-top">
              <div className="post-date">{created}</div>
              <div className="post-top-left">
                <img className="post-profile-img" src={el.user.avatar_url} alt="avatar" />
                <div className="post-username">{el.user.username}</div>
              </div>
              <div className="post-top-right">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
            <div className="post-center">
              <span className="post-text">{el.content}</span>
            </div>
            <div className="post-bottom">
              <FontAwesomeIcon icon={faThumbsUp} className="like-icon" />
              <FontAwesomeIcon icon={faThumbsDown} className="dislike-icon" />
              <span className="post-like-counter">1 like</span>
            </div>
          </div>
        </div>
      )
    })
    return markup;
  };



  return <ul className="posts-cont">{posts && createMarkup()}</ul>;
}

export default Posts;
