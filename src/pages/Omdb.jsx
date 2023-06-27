import React, { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Omdb() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const searchText = useRef();
  const navigate = useNavigate();

  const onSearch = () => {
    if (searchText.current.value != "") {
      setErrorMessage(false);
      navigate(`/search/${searchText.current.value}`);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <div id="searchbar">
        {/* <h1>React Router Contacts</h1> */}
        <div className="search-spinner" aria-hidden hidden={true} />
        <div>
          <div className="grouping">
            <div>
              <input
                ref={searchText}
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="search"
              />

              <div className="sr-only" aria-live="polite"></div>
              <button className="mx-2" onClick={onSearch}>
                Search
              </button>
            </div>
            {errorMessage && (
              <div className="errorMsg">Invalid Search text</div>
            )}
          </div>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
