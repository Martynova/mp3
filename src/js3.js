/**
 * Created by i.martynova on 12/17/2015.
 */
var data = [
    {id:1, soung:"music/kolobok.mp3"},
    {id:2, soung:"music/kukla.mp3"}
];
var AudioBox = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
    },
    getDefaultProps: function(){
        return{
            className: 'player',
        }
    },
    getInitialState: function(){
        return {
            player:false
        }
    },
    handlePlay: function(i){
        return i.soung;
       //return {src: this.props.onClickPlay(i.song)}
    },
    render: function() {
        return (
            <div className="audioBox">

                <audio controls className={this.props.className} >
                    <source  type="audio/mp3"/>
                </audio>

                <ListBox data={this.props.data}  onClickPlay={this.handlePlay}/>
            </div>
        );
    }
});
var ListBox = React.createClass({
    //getInitialState: function(){
    //    return {}
    //},
    handleClick: function(i){

        console.log('You clicked: '+ i.soung)
        return i.soung;
        console.log(this.props.onClickPlay({src: i.soung}));
        // console.log(arguments,i);
    },

    render: function(){


        return (
            <ol className="listBox">

                {this.props.data.map(function(nameSoung, i){
                    console.log(nameSoung);
                    return  (
                        <li key={nameSoung.id}>
                            <a  href="#" data-src={nameSoung.soung} onClick={this.handleClick.bind(this,nameSoung)} >
                                {nameSoung.soung}
                            </a>
                        </li>
                    );
                },this)}


            </ol>
        );

    }});

ReactDOM.render(
    <AudioBox data={data}/>,
    document.getElementById('audio_div')
);
