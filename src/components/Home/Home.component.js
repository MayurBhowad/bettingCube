import React, { Component } from 'react'
import AllPlayers from './AllPlayers.component'
import SelectedPlayer from './SelectedPlayer.component'

export class Home extends Component {

    componentDidMount() {
        document.title = 'Home';
    }

    render() {
        return (
            <div className="home">
                <div className="selected-player">
                    <SelectedPlayer />
                </div>
                <div className="main">
                    <AllPlayers />
                </div>
            </div>
        )
    }
}

export default Home
