import {useEffect, useState} from "react";

import {CURRENT_THUMBNAIL, ADD_Carosal_DATA} from "../../redux/actions";
import {connect} from "react-redux";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./carousel_slider.module.css";

const CarouselSlider = (props) => {
    const [current, setCurrent] = useState(0);

    const [numOfSlides, setNoOfSlides] = useState(6);

    useEffect(() => {
        props.setSideInfoData(props.trends[0]);
        numberOfSlidesChange(window.innerWidth);
        window.addEventListener("resize", () => {
            numberOfSlidesChange(window.innerWidth);
        });
    }, []);

    const numberOfSlidesChange = (windowSize) => {
        if (windowSize < 500) {
            setNoOfSlides(2);
        } else if (windowSize < 750) {
            setNoOfSlides(3);
        } else if (windowSize < 1000) {
            setNoOfSlides(4);
        } else if (windowSize < 1250) {
            setNoOfSlides(5);
        } else {
            setNoOfSlides(6);
        }
    };

    const onChangeHandler = (slide) => {
        slide = slide < 0 ? props.trends.length + slide : slide;
        props.setSideInfoData(props.trends[slide % props.trends.length]);

        setCurrent(slide % props.trends.length);

    };

    return (
        <div className={styles.container}>
            <Carousel
                infinite
                centered
                autoPlay={5000}
                animationSpeed={1000}
                className={styles.slider}
                slidesPerPage={numOfSlides}
                clickToChange
                arrowLeft={
                    <FontAwesomeIcon
                        className={styles.flag}
                        size="lg"
                        icon={faChevronLeft}
                        inverse
                        color="#ffff"
                    />
                }
                arrowLeftDisabled={
                    <FontAwesomeIcon size="lg" icon={faChevronLeft} hidden={true}/>
                }
                arrowRight={
                    <FontAwesomeIcon
                        className={styles.flag}
                        size="lg"
                        icon={faChevronRight}
                        color="#ffff"
                    />
                }
                arrowRightDisabled={
                    <FontAwesomeIcon size="lg" hidden={true} icon={faChevronRight}/>
                }
                addArrowClickHandler
                onChange={onChangeHandler}
            >
                {props.thumbnails.map((elementSrc, idx) =>
                    <div key={idx}>
                        <img className={styles.sliderItem} alt="thum" src={elementSrc}/>
                        <div
                            className={
                                current === idx ? styles.activeline : styles.inactiveLine
                            }
                        />
                    </div>
                )}
            </Carousel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        thumbnails: state.home.allThumbnails,
        idx: state.home.currentThumbnailIdx,
        trends: state.home.trends,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentIdx: (idx) =>
            dispatch({type: CURRENT_THUMBNAIL, payload: {thumbnailIdx: idx}}),
        setSideInfoData: (data) =>
            dispatch({type: ADD_Carosal_DATA, payload: {data: data}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselSlider);
