import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebase.config";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { InfoContext } from "../../App";
import googleIcon from "../../img/google.svg";
import githubIcon from "../../img/github.svg";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedUser, setLoggedUser] = useContext(InfoContext);
  const [isNew, setIsNew] = useState(true);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { form: { pathName: "/" } };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, event) => {
    setMessage("");
    if (isNew) {
      if (data.email && data.password === data.confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            const newInfo = { ...data };
            newInfo.isLogged = true;
            event.target.reset();
            // setMessage("");
            updateInfo(data.name);
            setLoggedUser(newInfo);
            history.replace(from);
          })
          .catch((error) => {
            const errorMessage = error.message;
            setMessage(errorMessage);
          });
      } else {
        if (data.password !== data.confirmPassword) {
          const errorMessage = "Password and confirm password should be matched";
          setMessage(errorMessage);
        }
      }
    } else {
      if (data.email && data.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            const user = res.user;
            const newInfo = { ...data };
            handleLoggingInfo(user, newInfo);
            event.target.reset();
          })
          .catch((error) => {
            const errorMessage = error.message;
            setMessage(errorMessage);
          });
      }
    }
  };

  const handleLoggingInfo = (user, newInfo) => {
    newInfo.name = user.displayName;
    newInfo.email = user.email;
    newInfo.isLogged = true;
    // setMessage("");
    setLoggedUser(newInfo);
    history.replace(from);
  };

  const updateInfo = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        const newInfo = { ...loggedUser };
        handleLoggingInfo(user, newInfo);
      })
      .catch((error) => {
        var errorMessage = error.message;
        setMessage(errorMessage);
      });
  };

  const githubLogin = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log(user);
        const newInfo = { ...loggedUser };
        handleLoggingInfo(user, newInfo);
      })
      .catch((error) => {
        var errorMessage = error.message;
        setMessage(errorMessage);
      });
  };

  return (
    <section className="login-area">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {!loggedUser.isLogged ? (
              <>
                <div className="login-form-wrapper">
                  <h4 className="mb-4">Create Your Account</h4>
                  {message && <Alert variant="danger">{message}</Alert>}
                  <form className="log-reg-form" onSubmit={handleSubmit(onSubmit)}>
                    {isNew && (
                      <div className="mb-3">
                        <label>Name</label>
                        <input className="form-control" type="text" name="name" ref={register({ required: true, pattern: /^[a-zA-Z '.-]*$/ })} />
                        {errors.name && <span className="text-danger not-valid">Please enter your name</span>}
                      </div>
                    )}

                    <div className="mb-3">
                      <label>Email</label>
                      <input className="form-control" type="text" name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
                      {errors.email && <span className="text-danger not-valid">Please enter your email in right format</span>}
                    </div>

                    <div className="mb-3">
                      <label>Password</label>
                      <input className="form-control" type="password" name="password" ref={register({ required: true, pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,}$/ })} />
                      {errors.password && <span className="text-danger not-valid">Please enter your password (Minimum 6 character with letter and number)</span>}
                    </div>

                    {isNew && (
                      <div className="mb-3">
                        <label>Confirm Password</label>
                        <input className="form-control" type="password" name="confirmPassword" ref={register({ required: true })} />
                        {errors.confirmPassword && <span className="text-danger not-valid">Please confirm your password</span>}
                      </div>
                    )}

                    <button className="btn main-btn w-100">{isNew ? "Create Account" : "Login"}</button>
                  </form>
                  <div className="mt-3 text-center">
                    {isNew ? (
                      <p className="log-reg-switch">
                        Already Have An Account?
                        <span
                          onClick={() => {
                            setIsNew(false);
                            setMessage("");
                          }}
                        >
                          Login
                        </span>
                      </p>
                    ) : (
                      <p className="log-reg-switch">
                        New here?
                        <span
                          onClick={() => {
                            setIsNew(true);
                            setMessage("");
                          }}
                        >
                          Create An Account
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="login-divider">
                  <span>OR</span>
                </div>
                <div className="social-login">
                  <h6>Login with</h6>
                  <button className="btn" onClick={googleLogin}>
                    <img src={googleIcon} alt="" />
                  </button>
                  <button className="btn" onClick={githubLogin}>
                    <img src={githubIcon} alt="" />
                  </button>
                </div>
              </>
            ) : (
              <Card className="shadow-lg border-0 text-center">
                <Card.Body>
                  <Card.Title>Hello, {loggedUser.name || loggedUser.email}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">You are Logged In</Card.Subtitle>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
