import Axios from "axios";
export const getPage =async (type, sorting, pageNo)=>{
    return await Axios.get(
        process.env.REACT_APP_API_URL +
        `/discover/${type}/?sorted_by=${sorting}&page=${pageNo}`
    )
}

export const getHome = async ()=>{
   return  await Axios.get(
        process.env.REACT_APP_API_URL + "/page/home"
    );
}

export const getCarousal = async ()=>{
    return await Axios.get(
        process.env.REACT_APP_API_URL + "/trending/all/week"
    );
}


export const fetchGenres = async (props) => {

    let response = await Axios.get(
        process.env.REACT_APP_API_URL + "/genre/movie/list"
    );
    // let trends = response.data.results;
    return response.data.genres;
};



