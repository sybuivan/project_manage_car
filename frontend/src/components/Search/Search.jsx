import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './search.scss';

import { BsSearch } from 'react-icons/bs';

function Search({ onChangeSearch }) {
  const [isValue, setIsValue] = useState(false);
  const handleChangeSearch = (event) => {
    const input = event.currentTarget.value;
    if (/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/.test(input) || input === ' ') {
      setIsValue(false);
      onChangeSearch(input.trim());
    } else {
      setIsValue(true);
    }
  };

  return (
    <div className="search">
      <div className="search-box">
        <span className="search-icon">
          <BsSearch />
        </span>
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          onChange={handleChangeSearch}
        />
      </div>
      {isValue && (
        <div
          style={{ color: '#F61C04', padding: '1rem 0', fontSize: '1.4rem' }}
        >
          Không được nhập ký tự đặc biệt
        </div>
      )}
    </div>
  );
}

Search.propTypes = {
  onChangeSearch: PropTypes.func,
};

export default Search;
