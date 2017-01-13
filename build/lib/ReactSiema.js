'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('./utils/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _transformProperty = require('./utils/transformProperty');

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSiema = function (_Component) {
    _inherits(ReactSiema, _Component);

    function ReactSiema(props) {
        _classCallCheck(this, ReactSiema);

        var _this = _possibleConstructorReturn(this, (ReactSiema.__proto__ || Object.getPrototypeOf(ReactSiema)).call(this));

        _this.events = ['onTouchStart', 'onTouchEnd', 'onTouchMove', 'onMouseDown', 'onMouseUp', 'onMouseLeave', 'onMouseMove'];

        _this.config = Object.assign({}, {
            resizeDebounce: 250,
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false
        }, props);

        _this.events.forEach(function (handler) {
            _this[handler] = _this[handler].bind(_this);
        });
        return _this;
    }

    _createClass(ReactSiema, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.config.selector = this.selector;
            this.currentSlide = this.config.startIndex;

            this.init();

            this.onResize = (0, _debounce2.default)(function () {
                _this2.resize();
                _this2.slideToCurrent();
            }, this.config.resizeDebounce);

            window.addEventListener('resize', this.onResize);

            if (this.config.draggable) {
                this.pointerDown = false;
                this.drag = {
                    start: 0,
                    end: 0
                };
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.init();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener(this.onResize);
        }
    }, {
        key: 'init',
        value: function init() {
            this.setSelectorWidth();
            this.setInnerElements();
            this.resolveSlidesNumber();

            this.setStyle(this.sliderFrame, {
                width: this.selectorWidth / this.perPage * this.innerElements.length + 'px',
                webkitTransition: 'all ' + this.config.duration + 'ms ' + this.config.easing,
                transition: 'all ' + this.config.duration + 'ms ' + this.config.easing
            });

            for (var i = 0; i < this.innerElements.length; i++) {
                this.setStyle(this.innerElements[i], {
                    width: 100 / this.innerElements.length + '%'
                });
            }

            this.slideToCurrent();
        }
    }, {
        key: 'setSelectorWidth',
        value: function setSelectorWidth() {
            this.selectorWidth = this.selector.getBoundingClientRect().width;
        }
    }, {
        key: 'setInnerElements',
        value: function setInnerElements() {
            this.innerElements = [].slice.call(this.sliderFrame.children);
        }
    }, {
        key: 'resolveSlidesNumber',
        value: function resolveSlidesNumber() {
            if (typeof this.config.perPage === 'number') {
                this.perPage = this.config.perPage;
            } else if (_typeof(this.config.perPage) === 'object') {
                this.perPage = 1;
                for (var viewport in this.config.perPage) {
                    if (window.innerWidth > viewport) {
                        this.perPage = this.config.perPage[viewport];
                    }
                }
            }
        }
    }, {
        key: 'prev',
        value: function prev() {
            if (this.currentSlide === 0 && this.config.loop) {
                this.currentSlide = this.innerElements.length - this.perPage;
            } else {
                this.currentSlide = Math.max(this.currentSlide - 1, 0);
            }
            this.slideToCurrent();
        }
    }, {
        key: 'next',
        value: function next() {
            if (this.currentSlide === this.innerElements.length - this.perPage && this.config.loop) {
                this.currentSlide = 0;
            } else {
                this.currentSlide = Math.min(this.currentSlide + 1, this.innerElements.length - this.perPage);
            }
            this.slideToCurrent();
        }
    }, {
        key: 'goTo',
        value: function goTo(index) {
            this.currentSlide = Math.min(Math.max(index, 0), this.innerElements.length - 1);
            this.slideToCurrent();
        }
    }, {
        key: 'slideToCurrent',
        value: function slideToCurrent() {
            this.sliderFrame.style[_transformProperty2.default] = 'translate3d(-' + this.currentSlide * (this.selectorWidth / this.perPage) + 'px, 0, 0)';
        }
    }, {
        key: 'updateAfterDrag',
        value: function updateAfterDrag() {
            var movement = this.drag.end - this.drag.start;
            if (movement > 0 && Math.abs(movement) > this.config.threshold) {
                this.prev();
            } else if (movement < 0 && Math.abs(movement) > this.config.threshold) {
                this.next();
            }
            this.slideToCurrent();
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.resolveSlidesNumber();

            this.selectorWidth = this.selector.getBoundingClientRect().width;
            this.setStyle(this.sliderFrame, {
                width: this.selectorWidth / this.perPage * this.innerElements.length + 'px'
            });
        }
    }, {
        key: 'clearDrag',
        value: function clearDrag() {
            this.drag = {
                start: 0,
                end: 0
            };
        }
    }, {
        key: 'setStyle',
        value: function setStyle(target, styles) {
            Object.keys(styles).forEach(function (attribute) {
                target.style[attribute] = styles[attribute];
            });
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart(e) {
            e.stopPropagation();
            this.pointerDown = true;
            this.drag.start = e.touches[0].pageX;
        }
    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd(e) {
            e.stopPropagation();
            this.pointerDown = false;
            this.setStyle(this.sliderFrame, {
                webkitTransition: 'all ' + this.config.duration + 'ms ' + this.config.easing,
                transition: 'all ' + this.config.duration + 'ms ' + this.config.easing
            });
            if (this.drag.end) {
                this.updateAfterDrag();
            }
            this.clearDrag();
        }
    }, {
        key: 'onTouchMove',
        value: function onTouchMove(e) {
            e.stopPropagation();
            if (this.pointerDown) {
                this.drag.end = e.touches[0].pageX;

                this.setStyle(this.sliderFrame, _defineProperty({
                    webkitTransition: 'all 0ms ' + this.config.easing,
                    transition: 'all 0ms ' + this.config.easing
                }, _transformProperty2.default, 'translate3d(' + (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.start - this.drag.end)) * -1 + 'px, 0, 0)'));
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            this.pointerDown = true;
            this.drag.start = e.pageX;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            e.stopPropagation();
            this.pointerDown = false;
            this.setStyle(this.sliderFrame, {
                cursor: '-webkit-grab',
                webkitTransition: 'all ' + this.config.duration + 'ms ' + this.config.easing,
                transition: 'all ' + this.config.duration + 'ms ' + this.config.easing
            });
            if (this.drag.end) {
                this.updateAfterDrag();
            }
            this.clearDrag();
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            e.preventDefault();
            if (this.pointerDown) {
                this.drag.end = e.pageX;
                this.setStyle(this.sliderFrame, _defineProperty({
                    cursor: '-webkit-grabbing',
                    webkitTransition: 'all 0ms ' + this.config.easing,
                    transition: 'all 0ms ' + this.config.easing
                }, _transformProperty2.default, 'translate3d(' + (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.start - this.drag.end)) * -1 + 'px, 0, 0)'));
            }
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(e) {
            if (this.pointerDown) {
                this.pointerDown = false;
                this.drag.end = e.pageX;
                this.setStyle(this.sliderFrame, {
                    cursor: '-webkit-grab',
                    webkitTransition: 'all ' + this.config.duration + 'ms ' + this.config.easing,
                    transition: 'all ' + this.config.duration + 'ms ' + this.config.easing
                });
                this.updateAfterDrag();
                this.clearDrag();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                Object.assign({
                    ref: function ref(selector) {
                        return _this3.selector = selector;
                    },
                    style: { overflow: 'hidden' }
                }, this.events.reduce(function (props, event) {
                    return Object.assign({}, props, _defineProperty({}, event, _this3[event]));
                }, {})),
                _react2.default.createElement(
                    'div',
                    { ref: function ref(sliderFrame) {
                            return _this3.sliderFrame = sliderFrame;
                        } },
                    _react2.default.Children.map(this.props.children, function (children, index) {
                        return _react2.default.cloneElement(children, {
                            key: index,
                            style: { float: 'left' }
                        });
                    })
                )
            );
        }
    }]);

    return ReactSiema;
}(_react.Component);

ReactSiema.propTypes = {
    resizeDebounce: _react.PropTypes.number,
    duration: _react.PropTypes.number,
    easing: _react.PropTypes.string,
    perPage: _react.PropTypes.number,
    startIndex: _react.PropTypes.number,
    draggable: _react.PropTypes.bool,
    threshold: _react.PropTypes.number,
    loop: _react.PropTypes.bool,
    children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)])
};
exports.default = ReactSiema;