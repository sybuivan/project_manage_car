/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { Loading, Spinner } from './styles';

export const OverLayContext = React.createContext({});

function OverLayProvider(props) {
  const [loading, setLoading] = useState(false);
  return (
    <OverLayContext.Provider
      value={{
        setLoading,
      }}
    >
      {loading && (
        <Loading>
          <Spinner>
            <BounceLoader color="#fff" loading={loading} size={50} />
          </Spinner>
        </Loading>
      )}
      {props.children}
    </OverLayContext.Provider>
  );
}

export default OverLayProvider;
