import {Component} from 'react';

const url ="https://api.themoviedb.org/3";
const baseURLImg = "https://image.tmdb.org/t/p/w200";
const urlPopularMovies='/movie/popular';
const apiKey = '?api_key=3ee89ab4d0bd9aa2c092a0f77bf2419a';

export const getPopularMovies = async function(){
    //Parametros de conexion
    const endpoint = `${url}${urlPopularMovies}${apiKey}`;
    let resultado = await fetch(endpoint);
    let rtaApi = await resultado.json();         
    const popular = rtaApi.results;
    console.log("Resultados",popular);
    //Dar formato a los datos para mostrar en la grilla
    let popularAMostrar=[];
    for (let i = 0; i < popular.length; i++) {
        let popularEdit =  popular[i];
        popularEdit.imagen = `${baseURLImg}${popularEdit.poster_path}`;
        popularAMostrar.push(popularEdit);
    }
    return (estrenosAMostrar);
}
