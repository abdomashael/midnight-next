import React, {useState, useEffect} from "react";

import styles from "./section_item.module.css";
import ActionComponent from "../action_buttons/action";
import {connect} from "react-redux";
import Link from "next/link";

const SectionItem = (props) => {
    const [isHover, setIsHove] = useState(false);
    const [genres, setGenres] = useState("");

    useEffect(() => {
        if (props.data) {
            let newGenres = props.genres.filter((genre) => {
                try {
                    return props.data.genre_ids.includes(genre.id);
                } catch (error) {
                    return false;
                }
            });
            setGenres(newGenres.map((genre) => genre.name).join(", "));
        }
    }, []);

    const onMouseLeaveHandler = () => {
        props.hoverChange(false);
        setIsHove(false);
    };

    const onMouseEnterHandler = () => {
        props.hoverChange(true);
        setIsHove(true);
    };

    return (
        <Link href={"/movie/" + props.data.id}>
            <div
                className={props.hideDetails ? styles.mainDiv : styles.hoveredDiv}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
                <img
                    alt={props.title}
                    className={styles.sectionImg}
                    src={process.env.REACT_APP_IMAGE_BASE_URL_W780+ props.data.backdrop_path}
                />

                <div
                    hidden={props.hideDetails ? !isHover : false}
                    className={styles.bakground}
                >
                    {/* hidden={!isHover} */}
                    <div>
                        <div className={styles.top}>
                            {/* <span hidden={props.vipHidden}>
                <img
                  className={styles.icon}
                  src="https://shahid.mbc.net/static/fonts/38cd5d569d798c28d57d0ff1480501fe.svg"
                  alt="vip"
                />
              </span> */}

                            <span
                                className={styles.badge + " " + styles.rate}
                                hidden={props.liveHidden}
                            >
                  {props.data.vote_average}
                </span>

                            <span
                                hidden={!props.data.adult}
                                className={styles.badge + " " + styles.adult}
                                // hidden={props.liveHidden}
                            >
                  +18
                </span>
                        </div>
                        <div className={styles.container}>

                            <div className={styles.body}>
                                <div className={styles.title}>{props.data.title}</div>
                                <div>
                                    <span className={styles.genres}>{genres}</span>
                                    <span>&nbsp;</span>
                                    <span className={styles.mainInfo}>{props.mainInfo}</span>
                                </div>
                            </div>

                            <div className={styles.footer}>
                                <ActionComponent type={2}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

SectionItem.defaultProps = {
    hideDetails: true,
};

const mapStateToProps = (state) => {
    return {
        genres: state.general.genres,
    };
};

export default connect(mapStateToProps)(SectionItem);
