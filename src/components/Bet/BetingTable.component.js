import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { spinResult } from '../../redux/actions/players.action'
import Spinner from '../common/Spinner.common';

export class BetingTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            randnumber: ''
        }
    }

    componentDidMount() {
        document.title = 'Betting Table';
    }

    spinTheWheel = () => {
        let randomNumber = (Math.floor(Math.random() * 9) + 1);
        this.setState({ randnumber: randomNumber }, () => {
            let betResult = [];
            // let spinPromise = new Promise((resolve, reject) => {
            this.props.selected_player.map((player, index) => {
                // console.log(player);
                if (player.Bet == this.state.randnumber) {
                    player.winner = true;
                    betResult.push(player);
                    // if (this.props.selected_player.length >= 9) { resolve() }
                } else {
                    player.winner = false;
                    betResult.push(player);
                }
            })
            // })
            // spinPromise.then(() => {
            this.props.spinResult(betResult);
            // })
        });
    }

    render() {

        const { selected_player, loading } = this.props;

        let cardRow;
        if (selected_player === null || loading) {
            cardRow = <Spinner />
        } else {
            if (selected_player.length > 0) {
                cardRow = selected_player.map(player => (
                    <BettingPlayerCard player={player} randnumber={this.state.randnumber} />
                ))
            } else {
                cardRow = <h4>Not found!</h4>
            }
        }

        return (
            <div className="betting">
                <div className="separator">
                    <div className="line line-left"></div>
                    <div className="asterisk" onClick={this.spinTheWheel}><span className="dot" ><h4>{this.state.randnumber === '' ? 0 : this.state.randnumber}</h4></span></div>
                    <div className="line line-right"></div>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 row-cols-lg-5">
                    {cardRow}
                </div>
                <div className="nav-buttons">
                    <Link to="/"><button className="btn btn-primary">Back</button></Link>
                    <button className="btn btn-success" onClick={this.spinTheWheel}>Spin</button>
                </div>
            </div >
        )
    }
}

function BettingPlayerCard(props) {
    const { player, randnumber } = props;

    return (
        <div className="col">
            <div className={`card ${player.Bet == randnumber ? "winner-card" : ""}`}>
                <div className="top">
                    <div className="avatar">
                        <img src={player["Profile Image"]} className="card-img-top" alt="..." />
                    </div>
                    <div className="name">
                        <h1>{player.Name}</h1>
                        <p className="text-muted">Level 5</p>
                    </div>
                </div>
                <div className="bet-details">
                    <div className="bet">
                        <i className="fas fa-rupee-sign"></i>
                        <p>{player.Price}</p>
                    </div>
                    <div className="bet">
                        <i className="fas fa-dot-circle"></i>
                        <p>{player.Bet}</p>
                    </div>
                </div>
                <div className="bet">
                    <div className="win">
                        <i className="fas fa-trophy"></i>
                        <p>{player.win ? player.win : 0}</p>
                    </div>
                </div>
                <div className="win-stats">
                    {player.Bet == randnumber ?
                        (<p className="winner" >WINNER</p>) :
                        (<p className="looser">LOSE</p>)
                    }
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    selected_player: state.players.selected_player,
    loading: state.players.loading,

})

export default connect(mapStateToProps, { spinResult })(BetingTable);
