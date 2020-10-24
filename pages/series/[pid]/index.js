import React, {useEffect, useState} from "react";

import {useRouter} from "next/router";
import Layout from "../../../components/layout/layout";
import MovieDetails from "../../../components/movie_details/movie_details";
import Footer from "../../../components/footer/footer";

const MovieDetailsPage = () => {
    const router = useRouter()
    const {pid} = router.query
    useEffect(()=>{
        console.log(router.pathname)
    },[])
    return (
        <Layout>
            <div>
                <MovieDetails id={pid} type={"series"}>
                    <Footer/>
                </MovieDetails>
            </div>
        </Layout>
    );
};

export default MovieDetailsPage;
