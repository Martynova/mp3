(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var data = [{ id: 1, soung: "music/kolobok.mp3" }, { id: 2, soung: "music/kukla.mp3" }];
var AudioBox = React.createClass({
    displayName: "AudioBox",

    propTypes: {
        className: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            className: 'player'
        };
    },
    getInitialState: function () {
        return {
            player: false
        };
    },
    handleClick: function () {
        this.setState({ player: true });
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "audioBox" },
            React.createElement(
                "audio",
                { controls: true, className: this.props.className, onClick: this.handleClick },
                React.createElement("source", { type: "audio/mp3" })
            ),
            React.createElement(ListBox, { data: this.props.data })
        );
    }
});
var ListBox = React.createClass({
    displayName: "ListBox",

    getInitialState: function () {
        return {};
    },
    handleClick: function (i) {

        console.log('You clicked: ' + this.props.data[i]);
    },
    //render: function () {
    //    var li = this.props.data.map(function(nameSoung){
    //        return(
    //
    //                <li key={nameSoung.id}><a href="#" data-src={nameSoung.soung}>{nameSoung.soung}</a></li>
    //
    //        );
    //    });
    //    return (
    //        <ol className="listBox">
    //
    //                {li}
    //
    //        </ol>
    //    )
    //}
    render: function () {
        //var soungs=this.props.data;
        //console.log(soungs)

        return React.createElement(
            "ol",
            { className: "listBox" },
            this.props.data.map(function (nameSoung, i) {
                console.log(nameSoung);
                return React.createElement(
                    "li",
                    { key: nameSoung.id },
                    " ",
                    React.createElement(
                        "a",
                        { onClick: this.handleClick.bind(this), href: "#", "data-src": nameSoung.soung },
                        nameSoung.soung
                    )
                );
            })
        );
    } });

ReactDOM.render(React.createElement(AudioBox, { data: data }), document.getElementById('audio_div'));

},{}]},{},[1]);
