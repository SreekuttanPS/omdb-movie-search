import React, { useState, useCallback, useEffect } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { LoginSocialGoogle, LoginSocialTwitter } from 'reactjs-social-login';
import { GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons';
import { useDispatch } from 'react-redux';

import { setLoginInfo } from 'redux/slicers/movieSlicer';

export default function LoginPopup({
  modal,
  modalClickHandle,
}) {
  const [provider, setProvider] = useState('');
  const [googleResponse, setGoogleResponse] = useState(null);
  const [twitterResponse, setTwitterResponse] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const REDIRECT_URI = window.location.href;
  const dispatch = useDispatch();

  console.log('twitterResponse: ', twitterResponse);

  const onLogout = useCallback(() => {
    setGoogleResponse(null);
    setUserProfile(null);
    setProvider('');
    modalClickHandle();
    dispatch(setLoginInfo(
      {
        isLoggedIn: false,
        userId: '',
      },
    ));
  }, []);

  async function getGoogleUserData(token) {
    fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((user) => {
        setUserProfile(user);
        dispatch(setLoginInfo(
          {
            isLoggedIn: true,
            userId: user.email,
          },
        ));
      });
  }

  useEffect(() => {
    if (googleResponse && !userProfile) {
      getGoogleUserData(googleResponse.access_token);
    }
  }, [googleResponse]);

  return (
    <Modal isOpen={modal} backdrop="static" centered>
      <ModalHeader toggle={modalClickHandle}>Login</ModalHeader>
      <ModalBody>
        {provider || ''}
        {userProfile ? (
          <div>
            {`Welcome ${userProfile.name} (${userProfile.email})`}
          </div>
        ) : (
          <div>
            You have to login to add items to favourites, Please login.
            <LoginSocialGoogle
              isOnlyGetToken
              client_id={import.meta.env.VITE_GG_AUTH_CLIENT_ID || ''}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              fetch_basic_profile
              onResolve={({ provide, data }) => {
                setProvider(provide);
                setGoogleResponse(data);
              }}
              onReject={(err) => {
                setProvider(`Provider Error : ${err}`);
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>

            <LoginSocialTwitter
              isOnlyGetToken
              client_id={import.meta.env.VITE_TWITTER_AUTH_CLIENT_ID || ''}
              redirect_uri={REDIRECT_URI}
              // onLoginStart={onLoginStart}
              onResolve={({ provide, data }) => {
                setProvider(provide);
                setTwitterResponse(data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <TwitterLoginButton />
            </LoginSocialTwitter>

          </div>

        )}
      </ModalBody>
      <ModalFooter>
        {userProfile ? (
          <div>
            <Button className="btn btn-success mx-2" onClick={modalClickHandle}>
              Go Back
            </Button>
            <Button className="btn btn-danger mx-2" onClick={onLogout}>
              Logout
            </Button>
          </div>

        ) : ''}
      </ModalFooter>
    </Modal>
  );
}

LoginPopup.propTypes = {
  modalClickHandle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
};
