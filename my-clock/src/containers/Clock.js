import React, { Component } from 'react';
import Timer from '../components/Timer';
import Session from '../components/Session';
import Break from '../components/Break';

class Clock extends Component {
    state = {
        session: 25,
        break: 5,
        timer: 25 * 60000,
        activeSession: true,
        interval: null,
        stopped: true
    }

    countDown = () => {
        if (this.state.timer > 0) {
            this.setState({
                timer: this.state.timer - 1000,
                stopped: false
            })
        } else {
           this.stopTimer();
           document.getElementById('beep').play();
           this.setState({timer: this.state.activeSession ? this.state.break * 60000 : this.state.session * 60000,
                        activeSession: !this.state.activeSession,
                        stopped: true})
           this.startTimer();
        }
        
    }

    startTimer = () => {
            this.setState({interval: setInterval(this.countDown, 1000),
                            stopped: false})
    }

    stopTimer = () => {
        clearInterval(this.state.interval)
        this.setState({stopped: true})
    }

    resetTimer = () => {
        clearInterval(this.state.interval);
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0; 
        this.setState({ timer: 25 * 60000,
                        session: 25,
                        break: 5,
                        stopped: true,
                        interval: null,
                        activeSession: true })
    }

    increaseSessionHandler = () => {
        if (this.state.session < 60) {
            this.setState({session: this.state.session + 1})
            
        }
        if (this.state.activeSession && this.state.stopped) {
            this.setState({timer: this.state.session * 60000 + 60000})
        }
    }

    increaseBreakHandler = () => {
        if (this.state.break < 60) {
            this.setState({break: this.state.break + 1})
        }
        if (!this.state.activeSession && this.state.stopped) {
            this.setState({timer: this.state.break * 60000 + 60000})
        }
    }

    decreaseSessionHandler = () => {
        if (this.state.session > 1) {
            this.setState({session: this.state.session - 1})
        }
        if (this.state.activeSession && this.state.stopped && this.state.timer > 60000) {
            this.setState({timer: this.state.session * 60000 - 60000})
        }
    }

    decreaseBreakHandler = () => {
        if (this.state.break > 1) {
            this.setState({break: this.state.break - 1})
        }
        if (!this.state.activeSession && this.state.stopped && this.state.timer > 60000) {
            this.setState({timer: this.state.break * 60000 - 60000})
        }
    }

    

    render () {

        return (
            <div>
                <Timer time={this.state.timer}
                            started={this.startTimer}
                            stopped={this.stopTimer}
                            reset={this.resetTimer}
                            isRunning={!this.state.stopped}
                            isSession={this.state.activeSession} />
                <div className="changetime-container">
                    <Session   
                        length={this.state.session}
                        increase={this.increaseSessionHandler}
                        decrease={this.decreaseSessionHandler}/>
                
                
                    <Break 
                        length={this.state.break}
                        increase={this.increaseBreakHandler}
                        decrease={this.decreaseBreakHandler} /> 
                </div>
                
            </div>
        )
    }
}

export default Clock;