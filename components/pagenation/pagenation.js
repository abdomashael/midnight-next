import React, { Fragment, useState, useEffect } from "react";
import styles from "./pagenation.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Loader from "../loader/loader"

const PageNo = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.pageNo === props.active);
  }, [props.pageNo]);

  return (
    <Link
      to={`/movie/${props.pageNo}`}
      className={active ? styles.active : styles.inactive}
    >
      {props.pageNo}
    </Link>
  );
};

const Pagnetion = (props) => {
  const [currentPage, setCurrentPage] = useState(2);
  const [loaderHidden, setLoaderHidden] = useState(true);

  const showMoreOnClickHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    props.setPageNo(currentPage);
  }, [currentPage]);

  // const [pages, setPages] = useState([]);

  //   useEffect(() => {
  //     const newPages = [];
  //     for (let index = 0; index < props.pages; index++) {
  //       const page = <PageNo pageNo={index + 1} active={1} />;
  //       newPages.push(page);
  //     }
  //     setPages([...pages, newPages]);
  //   }, [props.pages]);

  return (
    <div>
      <div hidden={!props.loading} >
        <Loader/>
      </div>
      <span hidden={props.loading} className={styles.pagenation} onClick={showMoreOnClickHandler}>
        Show More
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.general.isLoadingData,
  };
};

export default connect(mapStateToProps)(Pagnetion);
