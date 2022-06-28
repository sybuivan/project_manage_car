import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCaretDown } from 'react-icons/ai';
import './dropdown.scss';

const Dropdown = ({
  title,
  option,
  onClickProductType,
  onClickCategory,
  activeProductType,
  activeCategory,
}) => {
  const [activeDrop, setActiveDrop] = useState(true);

  const handleClick = () => {
    setActiveDrop((pre) => !pre);
  };

  const handleClickItem = (id) => {
    if (onClickProductType) {
      onClickProductType(id);
    }
    if (onClickCategory) {
      onClickCategory(id);
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown__title">
        <span>{title}</span>

        <div
          onClick={handleClick}
          className="dropdown__name"
          aria-hidden="true"
        >
          <AiOutlineCaretDown />
        </div>
      </div>
      <div
        className={activeDrop ? 'dropdown__option active' : 'dropdown__option'}
      >
        <ul className="dropdown__list">
          <li
            aria-hidden="true"
            className={
              activeProductType === undefined && activeCategory === undefined
                ? 'dropdown__list-item active'
                : 'dropdown__list-item'
            }
            onClick={() => handleClickItem()}
          >
            Tất cả
          </li>
          {option?.map((item) => (
            <li
              aria-hidden="true"
              className={
                activeCategory === item._id || activeProductType === item._id
                  ? 'dropdown__list-item active'
                  : 'dropdown__list-item'
              }
              key={item.name}
              onClick={() => handleClickItem(item._id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string,
  option: PropTypes.array,
};

export default Dropdown;
