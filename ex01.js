var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Name(props) {
    return React.createElement(
        "p",
        null,
        props.value
    );
}

function Image(props) {
    return React.createElement("img", { src: props.url });
}

function Searchcard(props) {
    var items = [];
    var searchValue = props.value;
    var getInputValue = function getInputValue(e) {
        searchValue = e.target.value;
    };
    items.push(React.createElement(
        "div",
        { className: props.className },
        React.createElement("input", { type: "text", placeholder: "search", onChange: getInputValue }),
        React.createElement(
            "button",
            { onClick: function onClick() {
                    return props.onClick(searchValue);
                } },
            "search"
        )
    ));
    return items;
}

var Card = function (_React$Component) {
    _inherits(Card, _React$Component);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

        _this.state = { id: null };
        return _this;
    }

    _createClass(Card, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Image, { url: this.props.url }),
                React.createElement(Name, { value: this.props.value })
            );
        }
    }]);

    return Card;
}(React.Component);

var Board = function (_React$Component2) {
    _inherits(Board, _React$Component2);

    function Board(props) {
        _classCallCheck(this, Board);

        var _this2 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

        _this2.state = {
            data: Array(151).fill("")
        };

        return _this2;
    }

    _createClass(Board, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getData();
        }
    }, {
        key: "render",
        value: function render() {
            return this.showData();
        }
    }, {
        key: "getData",
        value: function getData() {
            var _this3 = this;

            var URL = "https://pokeapi.co/api/v2/pokemon-form/";

            var _loop = function _loop(i) {
                fetch(URL + (i + 1)).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    _this3.dataReady(i, data);
                });
            };

            for (var i = 0; i < this.state.data.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: "dataReady",
        value: function dataReady(i, data) {
            var test = this.state.data.slice();
            test[i] = data;
            this.setState({ data: test });
        }
    }, {
        key: "showData",
        value: function showData() {
            var _this4 = this;

            var items = [];
            items.push(React.createElement(Searchcard, { key: 3000, className: "searchBar", value: "", onClick: function onClick(e) {
                    return _this4.handleSearch(e);
                } }));

            for (var i = 0; i < this.state.data.length; i++) {
                items.push(React.createElement(Card, { key: i,
                    url: _typeof(this.state.data[i]) === "object" ? this.state.data[i].sprites.front_default : null,
                    value: _typeof(this.state.data[i]) === "object" ? this.state.data[i].pokemon.name : null
                }));
            }

            return items;
        }
    }, {
        key: "handleSearch",
        value: function handleSearch(e) {
            var result = [];

            // result.forEach(([key,value])=>{
            //     if(value.pokemon.name != e){
            //         result.slice(key,1);
            //     }
            // })
            if (e == "") {
                this.getData();
            } else {

                for (var i = 0; i < this.state.data.length; i++) {
                    if (this.state.data[i].pokemon.name == e) {
                        result.push(this.state.data[i]);
                    }
                    //console.log(i);
                }
                //console.log(result.length)
                if (result.length == 0) {
                    this.getDataFromSearch(e);
                }
                this.setState({ data: result });
            }
        }
    }, {
        key: "getDataFromSearch",
        value: function getDataFromSearch(searchtext) {
            var _this5 = this;

            var URL = "https://pokeapi.co/api/v2/pokemon-form/";

            fetch(URL + searchtext).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log();
                var items = [];
                items.push(data);
                _this5.setState({ data: items });
            });
        }
    }]);

    return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.getElementById("root"));