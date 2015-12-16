/**
 * Created by i.martynova on 12/16/2015.
 */
var data = [
    {id:1, soung:"music/kolobok.mp3"},
    {id:2, soung:"music/kukla.mp3"}
];
var AudioBox = React.createClass({
    render: function () {
        var elem = this.props.data.map(function(audio){
            return (
             <audio id={audio.id}>
                    <source src={audio.soung}/>
             </audio>

            );
        })
        return (
        {elem}
        )
    }
});
ReactDOM.render(
    <AudioBox data={data}/>,
    document.getElementById('audio_div')
);