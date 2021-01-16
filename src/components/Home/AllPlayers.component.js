import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getAllPlayer, selectPlayer, removePlayer } from '../../redux/actions/players.action';
import Spinner from '../common/Spinner.common';

export class AllPlayers extends Component {


    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            total_page: '',
            ascending: true,
            property: '',
            searchName: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this)
    }


    componentDidMount() {
        if (this.props.players.players === null) {
            this.props.getAllPlayer(this.state.page, this.state.limit);
        }

    }

    handleOnChange(e) {
        this.setState({ searchName: e.target.value });
    }

    afterData = () => {
        let totalPage = new Promise((resolve, reject) => {
            if (this.props.players.players !== null && !this.props.players.loading) {
                resolve();
            }
        })
        totalPage.then(() => {
            this.setState({ total_page: (this.props.players.total_player / this.state.limit) })
        })
    }

    prevPage = () => {
        if (this.state.page > 1) {
            this.setState({ page: this.state.page - 1 })
        }
        this.afterData()
    }

    nextPage = () => {
        if (this.state.page < this.state.total_page) {
            this.setState({ page: this.state.page + 1 })
        }
        this.afterData()
    }

    sortByProperty = (prop, asc) => {
        return function (a, b) {
            if (asc) {
                return (parseInt(a[prop]) > parseInt(b[prop])) ? 1 : ((parseInt(a[prop]) < parseInt(b[prop])) ? -1 : 0);
            } else {
                return (parseInt(b[prop]) > parseInt(a[prop])) ? 1 : ((parseInt(b[prop]) < parseInt(a[prop])) ? -1 : 0);
            }
        }
    }


    ascending_de = (e, property) => {
        this.setState({ ascending: !this.state.ascending, property: property })
    }

    render() {

        const { players, loading, selected_player } = this.props.players
        let startIndex = (this.state.page - 1) * this.state.limit;
        let endIndex = this.state.page * this.state.limit;

        let playersRow;
        if (players === null || loading) {
            playersRow = <Spinner />
        } else {
            if (players) {
                if (players.length > 0) {
                    let playerArr = [];
                    players.map(player => {
                        let name = player.Name;
                        if (name.includes(this.state.searchName)) {
                            playerArr.push(player)
                        }
                    })
                    playerArr.sort(this.sortByProperty(this.state.property, this.state.ascending))
                    let sortedPlayer = playerArr.slice(startIndex, endIndex)
                    playersRow = sortedPlayer.map((player) => (
                        <AllPlayerRow player={player} selectPlayer={this.props.selectPlayer} selected_player={selected_player} removePlayer={this.props.removePlayer} />
                    ))
                }
            }
            else {
                playersRow = <h4>No players found...</h4>
            }
        }




        return (
            <div className="all-player containerCustom">
                <div className="title">Select Playing 9</div>
                <div className="search">
                    <div className="input-group flex-nowrap">
                        <i className="fas fa-search" aria-hidden="true"></i>
                        <input type="text" className="form-control" placeholder="Player Name" aria-label="player_name" aria-describedby="addon-wrapping" onChange={this.handleOnChange} />
                    </div>
                </div>
                <div className="table-responsive-md">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        <p>SELECT</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <p>PLAYER NAME</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <p>LEVEL</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <p>AVATAR</p>
                                    </div>
                                </th>
                                <th onClick={e => this.ascending_de(e, 'Bet')}>
                                    <div>
                                        <i className="fas fa-dot-circle"></i>
                                        <p>BET</p>
                                        <div className="arrow">
                                            <i className="fa fa-arrow-down" hidden={this.state.property !== 'Bet' || this.state.ascending} aria-hidden="true"></i>
                                            <i className="fa fa-arrow-up" hidden={this.state.property !== 'Bet' || !this.state.ascending} aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <i className="fas fa-trophy"></i>
                                        <p>WINS</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <p>LOST</p>
                                    </div>
                                </th>
                                <th onClick={e => this.ascending_de(e, 'Price')}>
                                    <div>
                                        <i className="fas fa-rupee-sign"></i>
                                        <p>PRICE</p>
                                        <div className="arrow">
                                            <i className="fa fa-arrow-down" hidden={this.state.property !== 'Price' || this.state.ascending} aria-hidden="true"></i>
                                            <i className="fa fa-arrow-up" hidden={this.state.property !== 'Price' || !this.state.ascending} aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersRow}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className="page-item" onClick={this.prevPage} >
                                <a className="page-link" href="#" >
                                    <i className="fas fa-chevron-left" ></i>
                                </a>
                            </li>
                            <div className="page text-muted">
                                <p>{this.state.limit} of {this.props.players.total_player}</p>
                            </div>
                            <li className="page-item" onClick={this.nextPage}>
                                <a className="page-link" href="#" >
                                    <i className="fas fa-chevron-right" ></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}


function AllPlayerRow(props) {
    const { player, selected_player } = props;
    let profilePic = player["Profile Image"]
    let checked = false;
    selected_player.map(a => {
        if (a.Name === player.Name) {
            checked = true
        }
    })
    function setCheckboxChange(e) {
        if (checked) {
            let playerDetails = JSON.parse(e.target.value);
            props.removePlayer(playerDetails)
        } else {

            if (selected_player.length < 9) {
                let playerDetails = JSON.parse(e.target.value);
                props.selectPlayer(playerDetails)
            }
        }
    }
    return (
        <tr>
            <td>
                <div>
                    <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                        value={JSON.stringify(player)}
                        onChange={e => setCheckboxChange(e)}
                        checked={checked}
                    />
                </div>
            </td>
            <td>{player.Name}</td>
            <td>{player.level ? player.level : 0}</td>
            <td>
                <div className="avatar">
                    <img src={profilePic} alt="" />
                </div>
            </td>
            <td>{player.Bet}</td>
            <td>{player.win ? player.win : 0}</td>
            <td>{player.lost ? player.lost : 0}</td>
            <td>{player.Price}</td>
        </tr>
    )
}


const mapStateToProps = state => ({
    players: state.players
})

export default connect(mapStateToProps, { getAllPlayer, selectPlayer, removePlayer })(AllPlayers);
