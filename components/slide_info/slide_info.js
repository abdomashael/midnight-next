import React, {useState, useEffect, useContext, useDebugValue} from "react";

import {connect} from "react-redux";

import styles from "./slide_info.module.css";
import ActionComponent from "../action_buttons/action";
import {ADD_GENRES} from "../../redux/actions";
import {DataContext} from "../carosal_main/carosal_main";

const subInfoData = (key, value) => {
    return {
        key, value
    }
}
const SlideInfo = (props) => {
    const [genres, setGenres] = useState([]);
    const movie = useContext(DataContext);
    const [subInfos, setSubInfos] = useState([])
    useEffect(() => {
        if (movie.data && movie.data.genres) {
            setGenres(movie.data.genres.map((genre) => genre.name).join(", "));
        }

        if (movie.data) {
            let infos = []
            if (movie.data.vote_average) infos = [...infos, subInfoData("Vote AVG:", movie.data.vote_average)]
            if (movie.data.status) infos = [...infos, subInfoData("Status :", movie.data.status)]
            if (movie.data.first_air_date) infos = [...infos, subInfoData("First Air:", movie.data.first_air_date)]
            if (movie.data.release_date) infos = [...infos, subInfoData("Release Date:", movie.data.release_date)]
            if (movie.data.revenue > 0) infos = [...infos, subInfoData("revenue:", movie.data.revenue > 1.0e+9
                ? `${(movie.data.revenue / 1.0e+9).toFixed(2)} B`
                : `${(movie.data.revenue / 1.0e+6).toFixed(2)} M`)]

            setSubInfos(prevState => [...infos])
        }


    }, [movie]);

    return (
        <div className=" mt-0 mr-auto ml-3 mb-auto">
            <div className={styles.subContainer}>
                <img
                    className={styles.thumbnail}
                    alt="thum"
                    src={
                        movie.data
                            ? process.env.REACT_APP_IMAGE_BASE_URL_W300+ movie.data.poster_path
                            : ""
                    }
                />
            </div>
            <div className="mt-3">
        <span className={styles.subContainer}>
          <span className={styles.title}>
            {movie.data
                ? movie.data.title
                    ? movie.data.title
                    : movie.data.original_name
                : ""}
          </span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </span>
            </div>
            <div className={styles.subContainer}>
                <p
                    className={
                        movie.type === 1
                            ? styles.para + " " + styles.paraExtra
                            : styles.para
                    }
                >
                    {movie.data ? movie.data.overview : ""}
                </p>
            </div>

            {genres.length > 0 ? (
                <span className={styles.subInfo}>
                    <span className={styles.part}/>
                    <span className={styles.green}>{genres}</span>
                </span>
            ) : (
                ""
            )}

            {
                subInfos.map((info,id) =>
                    <div key={id}>
                    <span className={styles.subInfo}>
                        <span className={styles.part}/>
                        <span className={styles.green}>{info.key}</span>
                        <span className={styles.gold}>{info.value}</span>
                    </span>
                    </div>
                )
            }

            <div className={styles.actionDiv}>
                <ActionComponent
                    wide={true}
                    type={movie.type === 1 ? 1 : 2}
                    movie={movie.data}
                />
            </div>
            {props.childern}
        </div>
    );
};

SlideInfo.defaultProps = {
    sessionNo: "",
    mainInfo: "",
    description: "",
};

const mapStateToProps = (state) => {
    return {
        genres: state.general.genres,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGenres: (genres) =>
            dispatch({type: ADD_GENRES, payload: {genres: genres}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideInfo);
