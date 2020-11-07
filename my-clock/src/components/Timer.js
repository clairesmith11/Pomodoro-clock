import React, { Component } from 'react';

class Timer extends Component {

    convertTimeHandler = (time) => {
        let minutes = Math.floor(time / 60000);
        let seconds = ((time % 60000) / 1000).toFixed(0);
        return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        
    }

    render() {
        return (
            <div id="timer-container">
                <h2 id="timer-label">{this.props.isSession ? 'Session' : 'Break'}</h2>
                <div id="time-left-container" className={this.props.isSession ? 'session' : 'break'}>
                    <h3 id="time-left">{this.convertTimeHandler(this.props.time)}</h3>
                    <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
                            id="beep"></audio>
                </div>
                <div id="timer-buttons">
                    <button id="start_stop" className="btn btn-primary" onClick={this.props.isRunning ? this.props.stopped : this.props.started}>Start / Stop</button>
                    <button id="reset" className="btn btn-primary" onClick={this.props.reset}>Reset</button>
                </div>
                
            </div>
            
        )
    }
} 

export default Timer;