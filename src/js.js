
var AudioBox = React.createClass({
    getInitialState: function(){
        return {
            player:false
        }
    },
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