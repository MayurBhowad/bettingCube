import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner.common';

export class SelectedPlayer extends Component {
    render() {

        const { selected_player, loading } = this.props;

        let rowData;
        if (selected_player === null || loading) {
            rowData = <Spinner />
        } else {
            if (selected_player.length > 0) {
                rowData = selected_player.map((player) => (
                    <SelectedPlayerRow player={player} />
                ))
            }
        }

        return (
            <div className="left-player">
                <div className="logo">
                    <img src="/dice-icon.png" alt="" />
                </div>
                <div className="title-secondary">
                    <p className="text-muted">playing 9</p>
                </div>
                {rowData}
                <div className="start">
                    <Link id="betting-table" className={selected_player.length < 9 ? "disabled-link" : ""} style={{ 'textDecoration': 'none', 'color': 'white' }} to="/betting_table">
                        <button className="btn btn-primary" for="betting-table" disabled={selected_player.length < 9}>
                            Start
                    </button>
                    </Link>
                </div>
            </div>
        )
    }
}


function SelectedPlayerRow(props) {
    const { player } = props;

    return (
        <div>
            <div className="player-tag">
                <div className="avatar">
                    <img src={player["Profile Image"]} alt="" />
                </div>
                <div className="name" style={{ 'marginLeft': '10px' }}>
                    <p>{player.Name}</p>
                    <div className="info">
                        <div className="win">
                            <i className="fas fa-trophy"></i>
                            <p className="text-muted" >{player.win ? player.win : 0}</p>
                        </div>
                        <div className="bet">
                            <i className="fas fa-dot-circle"></i>
                            <p className="text-muted" >{player.Bet}</p>
                        </div>
                    </div>
                </div>
                <div className="price">
                    <i className="fas fa-rupee-sign"></i>
                    <p>{player.Price}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}




SelectedPlayer.propTypes = {
    selected_player: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    selected_player: state.players.selected_player,
    loading: state.players.loading
})

export default connect(mapStateToProps, {})(SelectedPlayer)
