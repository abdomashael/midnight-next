import SectionItem from "../section_item/section_item";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./section.module.css";

import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import Carousel from "@brainhubeu/react-carousel";

const indicatorsCalc = (currentIndicator, numOfIndicators, setIndicatorsHandler) => {
    for (let index = 0; index < numOfIndicators; index++) {
        let indicatorColor =
            currentIndicator === index
                ? styles.indicatorActive
                : styles.indicatorInactive;
        let indicatorStyle = `${styles.indicator} ${indicatorColor}`;
        setIndicatorsHandler((old) => [
            ...old,
            <div className={indicatorStyle} key={index}/>,
        ]);
    }
};

const SectionIndicators = ({
                               numOfIndicators,
                               currentIndicatorChange,
                               isHover,
                               setReachMaxIndicator,
                           }) => {
    const [currentIndicator, setCurrentIndicator] = useState(0);
    const [indicators, setIndicators] = useState([]);

    useEffect(() => {
        setCurrentIndicator(currentIndicatorChange);
    }, [currentIndicatorChange]);

    useEffect(() => {
        setIndicators([]);
        indicatorsCalc(currentIndicator, numOfIndicators, setIndicators);
        setReachMaxIndicator(indicators.length - 1 === currentIndicator);
    }, [currentIndicator, indicators.length, numOfIndicators, setReachMaxIndicator]);


    return <div hidden={!isHover}>{indicators}</div>;
};

const Section = (props) => {
    const [section, setSection] = useState({});
    const [items, setItems] = useState();
    const [transformX, setTrasformX] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isHover, setIsHover] = useState(false);

    const [currentIndicator, setCurrentIndicator] = useState(0);
    const [reachMaxIndicator, setReachMaxIndicator] = useState(false);
    const [numOfIndicators, setNumOfIndicators] = useState(0);

    // let conatinerRef = useRef(<div />);

    useEffect(() => {
        setTrasformX(0);
        setCurrentIndicator(0);
    }, [windowWidth]);

    useEffect(() => {
        if (props.sections.length > 0) {
            setSection(props.sections[props.sectionIdx]);
            setItems(
                props.sections[props.sectionIdx].results.map((item) => (
                    <SectionItem
                        key={item.id}
                        hoverChange={setIsHover}
                        hideDetails={windowWidth >= 600}
                        data={item}
                    />
                ))
            );

            let numOfItems = props.sections[props.sectionIdx].results.length;
            let numOfItemsPerScreen = Math.floor(windowWidth / 300);
            setNumOfIndicators(Math.ceil(numOfItems / numOfItemsPerScreen));
        }
    }, [props.sectionIdx, props.sections, windowWidth]);

    const leftOnClickHandler = () => {
        const oldX = transformX;
        setTrasformX(oldX + windowWidth);
        setCurrentIndicator(currentIndicator - 1);
    };

    const rightOnClickHandler = () => {
        const oldX = transformX;
        setTrasformX(oldX - windowWidth);
        setCurrentIndicator(currentIndicator + 1);
    };

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.sectionTop}>
                <label className={styles.sectionName}>
                    {section.section_name ? section.section_name : ""}
                </label>
                <SectionIndicators
                    numOfIndicators={numOfIndicators}
                    currentIndicatorChange={currentIndicator}
                    isHover={isHover}
                    setReachMaxIndicator={setReachMaxIndicator}
                />
            </div>
            <div>
                {windowWidth < 600 ? (
                    <Carousel
                        centered
                        // className={styles.slider}
                        slidesPerPage={1}
                        clickToChange
                        fastSwipe
                        // draggable
                        arrowLeft={
                            <FontAwesomeIcon
                                className={styles.miniFlag}
                                size="lg"
                                icon={faChevronLeft}
                                inverse
                                color="#ffff"
                            />
                        }
                        arrowLeftDisabled={
                            <FontAwesomeIcon
                                className={styles.miniFlag}
                                size="lg"
                                icon={faChevronLeft}
                                // hidden={true}
                            />
                        }
                        arrowRight={
                            <FontAwesomeIcon
                                className={styles.miniFlag}
                                size="lg"
                                icon={faChevronRight}
                                color="#ffff"
                            />
                        }
                        arrowRightDisabled={
                            <FontAwesomeIcon
                                className={styles.miniFlag}
                                size="lg"
                                // hidden={true}
                                icon={faChevronRight}
                            />
                        }
                        addArrowClickHandler
                    >
                        {items}
                    </Carousel>
                ) : (
                    <div>
            <span
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                hidden={!isHover || currentIndicator === 0}
                className={styles.flagLeft}
                onClick={leftOnClickHandler}
            >
              <FontAwesomeIcon
                  size="2x"
                  icon={faChevronLeft}
                  color="#ffff"
                  className={styles.icon}
              />
            </span>
                        <span
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            hidden={!isHover || reachMaxIndicator}
                            className={styles.flagRight}
                            onClick={rightOnClickHandler}
                        >
              <FontAwesomeIcon
                  size="2x"
                  icon={faChevronRight}
                  color="#ffff"
                  className={styles.icon}
              />
            </span>

                        <div
                            className={isHover ? styles.sectionHover : styles.section}
                            style={{transform: ` translate3d(${transformX}px, 0px, 0px) `}}
                        >
                            {items}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        sections: state.home.sections,
    };
};

export default connect(mapStateToProps)(Section);
