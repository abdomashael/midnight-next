import Styles from "./movie_details.module.css";
import React, {useEffect, useState, useRef, useDebugValue} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";
import CarosalMain from "../carosal_main/carosal_main";
import {ADD_Carosal_DATA} from "../../redux/actions";
import {connect} from "react-redux";
import Loader from "../loader/loader";
import carosal_main from "../carosal_main/carosal_main";
import Footer from "../footer/footer";

const MovieDetails = (props) => {
    let id = props.id;
    const [extraData, setExtraData] = useState(null);
    const [isLoadind, setIsLoading] = useState(true);
    let [carosal, setCarosal] = useState();

    useEffect(() => {
        console.log("type",props.type)
        window.scrollTo(0, 0);
        const getDetails = async () => {
            const response = await Axios.get(
                process.env.REACT_APP_API_URL + "/"+props.type+"/" + id
            );
            console.log(response.data);
            setExtraData(response.data);
        };
        getDetails();
    }, [id]);

    useEffect(() => {
        if (extraData) {
            let youtube = extraData.videos.results.filter(
                (video) => video.site === "YouTube"
            )[0];

            setCarosal(prev=>
                <CarosalMain extraData={extraData}>
                    {youtube ? (
                        <iframe
                            name={youtube.name}
                            src={"https://www.youtube.com/embed/" + youtube.key}
                            className={Styles.iframe}
                            title={"name"}
                            allowFullScreen={true}
                            frameBorder="0"
                        />
                    ) : (
                        ""
                    )}
                    {props.children}
                </CarosalMain>
            );

            setIsLoading(false);
        }
    }, [extraData, props.children]);
    return (
        <div>
            {isLoadind ? (
                <div className="loader">
                    <Loader/>
                </div>
            ) : (
                carosal
            )}
        </div>
    );
};

MovieDetails.defaultProps={
    type:"movie"
}
const mapDispatchToProps = (dispatch) => {
    return {
        setSideInfoData: (data) =>
            dispatch({type: ADD_Carosal_DATA, payload: {data: data}}),
    };
};


export default connect(null, mapDispatchToProps)(MovieDetails);
