import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout/layout";
import {useEffect, useState} from "react";
import CarosalMain from "../components/carosal_main/carosal_main";
import Section from "../components/section/section";
import CarosalSlider from "../components/carousel_slider/carousel_slider";
import {
    ADD_HOME_SECTIONS,
    ADD_THUMBNAILS,
    ADD_TRENDS,
    ADD_Carosal_DATA, ADD_GENRES,
} from "../redux/actions";
import {connect} from "react-redux";
import Footer from "../components/footer/footer";
import Loader from "../components/loader/loader";
import {fetchGenres as FetchGenres, getCarousal, getHome} from "../utils/API";


const cacheIt = async (arr) => {
    const cacheImages = await arr.map(src => {
        return new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = src;
            img.onload = resolve
            img.onerror = reject
        })
    })

    await Promise.all(cacheImages)
}


function Home(props) {
    const [sections, setSections] = useState(null);
    const [isLoading, serIsLoading] = useState(true);
    let fetchCarousal = async () => {
        props.setTrends(props.data.trends);
        props.setSideInfoData(props.data.trends[0]);
        props.setThumbnails(props.data.thumbnails);

        // await cacheIt(thumbnails)
        // cacheIt(trends.reduce(
        //     (total, current) => [
        //       ...total,
        //       process.env.REACT_APP_IMAGE_BASE_URL + current.backdrop_path,
        //     ],
        //     []
        // ))

    };

    let fetchHome = async () => {
        props.setGenres(props.data.genres)

        window.scrollTo(0, 0);
        fetchCarousal();

        props.setSections(props.data.sections);
        let ids = props.data.sections.map((_, idx) => idx);
        setSections(<div className="section">
            {ids.length > 0
                ? ids.map((idx) => <Section key={idx} sectionIdx={idx}/>)
                : ""}
        </div>);
    };
    useEffect(() => {
        if (props.trends && props.trends.length === 0) {
            fetchHome().then(_ => serIsLoading(false));
        } else {
            let ids = props.sections.map((_, idx) => idx);
            setSections(
                <div className="section">
                    {ids.length > 0
                        ? ids.map((idx) => <Section key={idx} sectionIdx={idx}/>)
                        : ""}
                </div>
            );
            serIsLoading(false)
        }
    }, []);


    return (
        <div className={styles.container}>
            <Head>
                <title>MidNight</title>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Layout>
                <div className="App">
                    <div className="blockDiv">
                        {isLoading ? (
                            <div className="loader">
                                <Loader/>
                            </div>
                        ) : (
                            <CarosalMain type={1}>
                                <CarosalSlider/>
                                {sections}
                                <Footer/>
                            </CarosalMain>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        trends: state.home.trends,
        sections: state.home.sections,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSections: (sections) =>
            dispatch({type: ADD_HOME_SECTIONS, payload: {sections: sections}}),
        setThumbnails: (thumbnails) =>
            dispatch({type: ADD_THUMBNAILS, payload: {thumbnails: thumbnails}}),
        setTrends: (trends) =>
            dispatch({type: ADD_TRENDS, payload: {trends: trends}}),
        setSideInfoData: (data) =>
            dispatch({type: ADD_Carosal_DATA, payload: {data: data}}),
        setGenres: (genres) =>
            dispatch({type: ADD_GENRES, payload: {genres: genres}}),
    };
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    let response = await getCarousal();
    let trends = response.data.results;
    let thumbnails = trends.reduce(
        (total, current) => [
            ...total,
            process.env.REACT_APP_IMAGE_BASE_URL_W300 + current.poster_path,
        ],
        []
    );
    const genres = await FetchGenres();




    response = await getHome()
    let sections = response.data.sections;
    let data = {
        trends, thumbnails, sections,genres
    }
    // Pass data to the page via props
    return {props: {data}}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
