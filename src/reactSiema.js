import React, { Component, PropTypes } from 'react';
import Siema from 'siema';

export default class ReactSiema extends Component {
    componentDidMount() {
        this.siema = new Siema(Object.assign({}, this.props.options, {
            selector: this.container
        }));
    }

    render() {
        return (
            <div
                className="siema"
                ref={(container) => {
                    this.container = container;
                }}
            >
                {this.props.children}
            </div>
        );
    }

    next() {
        this.siema.next();
    }

    prev() {
        this.siema.prev();
    }

    goTo(index) {
        this.siema.goTo(index);
    }

    getCurrentSlide() {
        return this.siema.currentSlide;
    }
};

ReactSiema.propTypes = {
    duration: PropTypes.number,
    easing: PropTypes.string,
    perPage: PropTypes.number,
    startIndex: PropTypes.number,
    draggable: PropTypes.bool,
    threshold: PropTypes.number,
    loop: PropTypes.bool,
    children: PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
    ]).isRequired
};
