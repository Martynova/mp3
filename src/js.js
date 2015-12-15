
var AudioBox = React.createClass({
    render: function() {
        return (
            <audio controls className="player">
            <source/>
            </audio>
        );
    }
});
ReactDOM.render(
<AudioBox />,
    document.getElementById('audio_div')
);