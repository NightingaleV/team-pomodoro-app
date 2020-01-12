// External imports
import React, { useEffect, useState } from 'react';
// Internal imports

export function Preloader(props) {
  const { isLoading, children } = props;
  const [loadingShow, setLoadingShow] = useState(true);
  let preloader =
    isLoading || loadingShow ? (
      <>
        <div className="flexbox">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-yellow-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      children
    );
  function delayLoading() {
    setTimeout(() => {
      setLoadingShow(false);
    }, 350);
  }
  useEffect(() => {
    delayLoading();
  }, []);

  return preloader;
}
