import { LOADING, GET_ALL_PLAYER, CLEAR_PLAYERS, SELECT_PLAYER, REMOVE_PLAYER, BET_RESULT } from "../types.redux";

const initialState = {
    loading: false,
    players: null,
    total_player: 0,
    selected_player: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_PLAYERS:
            return {
                ...state,
                players: [],
            }

        case GET_ALL_PLAYER:
            return {
                ...state,
                players: action.payload,
                total_player: action.payload.length,
                loading: false
            }
        case SELECT_PLAYER:
            return {
                ...state,
                selected_player: [...state.selected_player, action.payload],
                loading: false
            }
        case REMOVE_PLAYER:
            return {
                ...state,
                selected_player: state.selected_player.filter(el => el.Name !== action.payload.Name),
                loading: false
            }

        case BET_RESULT:
            return {
                ...state,
                players: state.players.map(el => (
                    // el.Name === action.payload.Name ?
                    //     action.payload.winS ?
                    //         { ...el, win: el.win + 1 } :
                    //         { ...el, lost: el.lost + 1 } :
                    //     el
                    el.Name === action.payload.Name ?
                        action.payload.winner ?
                            { ...el, win: (el.win ? el.win + 1 : 1), level: (el.level ? el.level + 1 : 1) } :
                            { ...el, lost: (el.lost ? el.lost + 1 : 1), level: (el.level ? el.level + 1 : 1) } :
                        el
                )),
                selected_player: state.selected_player.map(el => (
                    // el.Name === action.payload.Name ?
                    //     action.payload.winS ?
                    //         { ...el, win: el.win + 1 } :
                    //         { ...el, lost: el.lost + 1 } :
                    //     el
                    el.Name === action.payload.Name ?
                        action.payload.winner ?
                            { ...el, win: (el.win ? el.win + 1 : 1), level: (el.level ? el.level + 1 : 1) } :
                            { ...el, lost: (el.lost ? el.lost + 1 : 1), level: (el.level ? el.level + 1 : 1) } :
                        el
                )),
                loading: false
            }


        default:
            return state;
    }
}