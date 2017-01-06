import React, { Component } from 'react';
import ReactSiema from './lib/ReactSiema';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        slides: [
            <img src="https://unsplash.it/600/350?image=10" alt="slide" />,
            <img src="https://unsplash.it/600/350?image=11" alt="slide" />,
            <img src="https://unsplash.it/600/350?image=12" alt="slide" />,
            <img src="https://unsplash.it/600/350?image=13" alt="slide" />,
            <img src="https://unsplash.it/600/350?image=14" alt="slide" />,
            <img src="https://unsplash.it/600/350?image=15" alt="slide" />,
            <img src="https://unsplash.it/600/350?image=16" alt="slide" />,
        ]
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>React Siema</h2>
                </div>
                <div className="App-intro">
                    <h4>
                        Lightweight and simple carousel wrapper for React based on awesome <a href="https://pawelgrzybek.com/siema/">Siema</a>.
                    </h4>
                    <div className="App-intro__slider">
                        <ReactSiema ref={(siema) => this.siema = siema}>
                            {this.state.slides.map((slide, index) => <div key={index}>{slide}</div>)}
                        </ReactSiema>
                        <button onClick={() => this.siema.prev()}>Prev</button>
                        <button onClick={() => this.siema.next()}>Next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
