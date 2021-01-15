import axios from "axios";
import { BET_RESULT, CLEAR_PLAYERS, GET_ALL_PLAYER, LOADING, REMOVE_PLAYER, SELECT_PLAYER } from "../types.redux";

import keys from '../../config/keys.config';

let awsUri = keys.AWS_URI;

function sortByProperty(prop, asc) {
    return function (a, b) {
        if (asc) {
            return (parseInt(a[prop]) > parseInt(b[prop])) ? 1 : ((parseInt(a[prop]) < parseInt(b[prop])) ? -1 : 0);
        } else {
            return (parseInt(b[prop]) > parseInt(a[prop])) ? 1 : ((parseInt(b[prop]) < parseInt(a[prop])) ? -1 : 0);
        }
    }
}
// items.sort(sortByProperty("Price"));


export const getAllPlayer = (page, limit) => dispatch => {
    dispatch({ type: LOADING })
    // dispatch({ type: CLEAR_PLAYERS })
    axios.get(awsUri)
        .then(data => {
            // let result = data.data

            // result.sort(sortByProperty("Price", true))

            // const startIndex = (page - 1) * limit;
            // const endIndex = page * limit;
            // console.log(startIndex, endIndex);
            // let dataa = result.splice(startIndex, limit);
            // console.log(dataa);
            // let playerData;
            // console.log(data.data.splice(1, 5));
            dispatch({
                type: GET_ALL_PLAYER,
                payload: data.data
            })
        })
}

export const selectPlayer = (playerDetails) => dispatch => {
    // console.log(playerDetails);
    dispatch({
        type: SELECT_PLAYER,
        payload: playerDetails
    })
}
export const removePlayer = (playerDetails) => dispatch => {

    dispatch({
        type: REMOVE_PLAYER,
        payload: playerDetails
    })
}

export const spinResult = (data) => dispatch => {
    // console.log(data);
    // dispatch({ type: LOADING })
    data.map(player => {
        dispatch({
            type: BET_RESULT,
            payload: player
        })
        // console.log(player);
    })
}