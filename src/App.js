import { useEffect, useState } from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faRightToBracket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleLogin } from 'react-google-login';

function App() {
  const [isSign, setSign] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('profile'));

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
    if(user)
      setSign(true);
  }, []);
  
  const googleSuccess = (response) => {
    const person = response?.profileObj;
    const token = response?.tokenId;

    const profile = { person, token };

    localStorage.setItem('profile', JSON.stringify(profile));
    
    setUser(JSON.parse(localStorage.getItem('profile')));
    setSign(true);
  }

  const googleFailure = (error) => {
    console.log("Google sign in was unsuccessful");
    console.log(error);
  }

  const logout = () => {
    localStorage.clear();
    setSign(false);
    setUser(null);
  }
  return (
    <div className="container">
      {
        isSign ? (
            <div className="user-box">
              <div className="avatar"><img src={user.person.imageUrl} alt="user image"/></div> 
              <div className="details">Welcome, {user.person.givenName}</div> 
              <button className="button" onClick={logout}><FontAwesomeIcon icon={faArrowRightToBracket} className="icon icon--light" />Signout</button>
            </div>
        ) : (
          <div className="login-box">
            <h1 className="login-box__heading">Welcome to Google OAuth</h1>
            <div className="login-box__form">
              <div className="login-box__form__heading">
                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                Signin
              </div>
              <div className="login-box__form__input">
                <GoogleLogin
                  clientId="277891862173-e6tbovu2teuql0942kh3nq9rtr4gavga.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button className="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Sign in with <FontAwesomeIcon icon={faGoogle} className="google-icon icon--light"/>
                    </button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  );
}

export default App;
