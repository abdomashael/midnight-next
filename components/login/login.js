import React, { Fragment, useEffect, useState } from "react";
import Logo from "../logo/logo";
import styles from "./login.module.css";
import PropTypes from "prop-types";
import classnames from "classnames";
import {  useHistory } from "react-router-dom";
import useQuery from "../../utils/use_query_hook";
export const LOGIN_TYPE = {
  login: 1,
  signup: 2,
};

const Login = ({ type }) => {
  let history = useHistory();
  let query = useQuery();

  useEffect(()=>{
    console.log(query.get("type"));
    if(query.get("type")==null) history.replace("/auth?type=login")
  },[])
  
  let handler = () => {
    query.get("type") === "signup"
      ? history.replace("/auth?type=login")
      : history.replace("/auth?type=signup");
  };

  return (
    <div>
      <form>
        <div
          className={
            type === LOGIN_TYPE.signup
              ? classnames(styles.conatiner, styles.upConatiner)
              : styles.conatiner
          }
        >
          <span className={styles.logo}>
            <Logo />
          </span>{" "}
          <div>
            {type === LOGIN_TYPE.signup ? (
              <Fragment>
                <p className={styles.para}>Username</p>
                <input
                  className={styles.email}
                  placeholder="Enter your name"
                  type="text"
                />
              </Fragment>
            ) : (
              ""
            )}
            <p className={styles.para}>Email</p>
            <input
              className={styles.email}
              placeholder="Enter email address"
              type="email"
            />
            <p className={styles.para}>Password</p>
            <input
              className={styles.email}
              placeholder="Enter password"
              type="password"
            />
            {type === LOGIN_TYPE.signup ? (
              <Fragment>
                <p className={styles.para}>Confirm password</p>
                <input
                  className={styles.email}
                  placeholder="Confirm password"
                  type="password"
                />
              </Fragment>
            ) : (
              ""
            )}
            <input
              type="submit"
              value={type === LOGIN_TYPE.signup ? "Sign up" : "Login"}
              className={styles.login}
            />
            <p className={classnames(styles.or, styles.para)}>
              <span>or</span>
            </p>
            <span
              onClick={handler}
              className={classnames(styles.para, styles.signup, "nav-link")}
            >
              {type === LOGIN_TYPE.signup ? "login" : "sign up"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

Login.defaultProps = {
  type: LOGIN_TYPE.login,
};

Login.prototype = {
  type: PropTypes.oneOf([LOGIN_TYPE.login, LOGIN_TYPE.signup]),
};

export default Login;
