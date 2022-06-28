import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <div className="content-container not-found-wrapper">
      <div className="not-found">
        <h2 className="not-found__title">Sorry...</h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt=""
          className="not-found__image"
        />
        <p>The page you were looking for does not exist.</p>
        <div className="not-found__link">
          <Link to="/">Back to home page</Link>
        </div>
      </div>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
