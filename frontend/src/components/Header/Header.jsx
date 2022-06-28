import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { images, router } from '../../constants';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header-box">
        <div className="header-logo">
          <Link to="/" className="header-logo__link">
            <div className="header-logo__box">
              <img
                src={images.Images.LOGO}
                alt=""
                className="header-logo__image"
              />
              <h1 className="header-logo__name">NCC</h1>
            </div>
          </Link>
        </div>
        <nav className="header-nav">
          <ul className="header-nav__list">
            <li className="header-nav__item">
              <NavLink to={router.DANH_SACH_SAN_PHAM}>Sản phẩm</NavLink>
            </li>
            <li className="header-nav__item">
              <NavLink to={router.QUAN_LY_SAN_PHAM}>Quản lý sản phẩm</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
