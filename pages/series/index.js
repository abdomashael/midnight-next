import React, {useEffect, useState, Fragment} from "react";
import Axios from "axios";
import styles from "../../styles/movies.module.css";
import Pagnetion from "../../components/pagenation/pagenation";
import {fetchGenres as FetchGenres, getCarousal, getHome, getPage} from "../../utils/API";
import Poster from "../../components/poster_item/poster";
import Layout from "../../components/layout/layout";
import Footer from "../../components/footer/footer";
import {TOGGLE_LOADER} from "../../redux/actions";

import {connect} from "react-redux";
import Sort, {SORT, TYPE} from "../../components/sort/sort";
const Index = (props) => {
    const [currentPage, setCurrentPage] = useState([...props.data.page]);
    const [moviesList, setMoviesList] = useState();
    const [sorting, setSorting] = useState(`${SORT[0]}.${TYPE[0]}`);
    const [pagesCount, setPagesCount] = useState(0);
    const [pageNo, setPageNo] = useState(2);

    const getMoviePage = async (sorting, pageNo) => {
        props.setLoader(true);
        const response = await getPage('tv', sorting, pageNo)
        props.setLoader(false);

        setCurrentPage(response.data.results);
        if (pagesCount === 0) setPagesCount(response.data.total_pages);
    };
    useEffect(() => {
        console.log("pageNo: ",pageNo)
        getMoviePage(sorting, pageNo);
    }, [pageNo]);

    useEffect(() => {
        if (currentPage) {
            console.log(currentPage)
            const list = currentPage.map((movie, idx) => (
                <span key={movie.id}>
        {/* <div>{movie.id}</div> */}
                    <Poster
                        type={'series'}
                        key={idx}
                        data={movie}
                    />
      </span>
            ));

            moviesList && moviesList.length > 0 ? setMoviesList(moviesList.concat(list)) : setMoviesList(list);
        }
    }, [currentPage]);

    const sortChangeHandler = (sort, type) => {
        const newSorting = `${sort.value}.${type.value}`
        console.log(sort);
        if (newSorting !== sorting) {
            setMoviesList([])
            getMoviePage(newSorting, 1)
            setSorting(newSorting)
            setPageNo(2)
        }
    }

    return (
        <div className={styles.container}>
            <Layout>
                <div className={styles.page}>
                    {moviesList ? <Sort onSortChange={sortChangeHandler}/> : ""}
                    <div className={styles.container}>
                        {moviesList ? moviesList : ""}
                    </div>
                    <Pagnetion pages={pagesCount} setPageNo={setPageNo}/>
                    <Footer/>
                </div>
            </Layout>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (loader) =>
            dispatch({type: TOGGLE_LOADER, payload: {loader: loader}}),
    };
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    let response = await getPage('tv',`${SORT[0]}.${TYPE[0]}`,1);
    const  page  = response.data.results;
    let data = {
        page
    }
    // Pass data to the page via props
    return {props: {data}}
}
export default connect(null, mapDispatchToProps)(Index);
