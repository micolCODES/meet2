import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <div className="WelcomeScreen">
        <h1 className = "appTitle">Meet App</h1> 
        <h1 class="WelcomeHeading">Welcome to the Meet app</h1>
        <h4 class="loginText">
          Log in to see the upcoming tech events!
      </h4>
        <div className="button_cont" align="center">
          <div class="google-btn">
            <div class="google-icon-wrapper">
              <img
                class="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google sign-in"
              />
            </div>
            <button onClick={() => { props.getAccessToken() }}
              rel="nofollow noopener"
              class="btn-text"
            >
              <b>Sign in with google</b>
            </button>
            </div>
        </div>
        <a 
          href="https://micolCODES.github.io/meet/privacy.html"
          rel="nofollow noopener"
          class="privacyPolicy"
        >
          Privacy policy
        </a>
      </div> 
    ) : null 
  }
export default WelcomeScreen;