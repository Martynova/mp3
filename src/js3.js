/**
 * Created by i.martynova on 12/17/2015.
 */
//var Alert = require('react-bootstrap/lib/Alert');
var data = [
    {id:1, soung:"music/kolobok.mp3", year: "1983", singer:"детские песни"},
    {id:2, soung:"music/kukla.mp3", year:"1955", singer:"детские песни"}
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
        return {src: ''};
    },
    //componentWillMount: function(){
    //    this.setState({src: i.soung})
    //},

    handlePlay: function(i){
       console.log('My play '+i.soung);

       this.setState({src: i.soung});
        console.log(this.refs.audioEl);
       this.refs.audioEl.pause();
        this.refs.audioEl.load();



    },
    componentDidMount: function(prevProps, prevState){ //вызывается сразу после монтирования. Инициализация этого требует, чтобы DOM узлы шли сюда
        this.refs.audioEl.load();
    },
    render: function() {
        var music = this.state.src;
        var arrayMusic = music.split();

        console.log(music);

        return (
            <div className="audioBox">
                {arrayMusic.map(function(item){
                   return(

                       <audio controls ref="audioEl">
                           <source src={item}  type="audio/mp3"/>
                        </audio>

                   )
                })}



                <ListBox data={this.props.data}  onClickPlay={this.handlePlay}/>
            </div>
        );
    }
});
var ListBox = React.createClass({
    getInitialState: function(){
        return (
            {soung: 'soung'},
            {year: 'year'},
            {singer: 'singer'}
        );
    },
    handleClick: function(i){

        //console.log('You clicked: '+ i.soung);
        console.log(this.props.onClickPlay(i));

    },

    render: function(){

        var nameS = this.props.data.map(function(nameSoung){
            console.log(nameS);
            console.log(nameSoung);
        return(
            <tr className="listBox">
            <td key={nameSoung.id}>
                <a  href="#" data-src={nameSoung.soung} onClick={this.handleClick.bind(this,nameSoung)} >
                            {nameSoung.soung}
                </a>
            </td>
            <td>
                {nameSoung.year}
            </td>
                <td>
                    {nameSoung.singer}
                </td>
            </tr>
        );
        },this);
        return (
            <table className="table-striped" >
                <tr>
                    <th>{this.state.soung}</th>
                    <th>{this.state.year}</th>
                    <th>{this.state.singer}</th>
                </tr>

                    {nameS}

            </table>
        );
       }
    });

ReactDOM.render(
    <AudioBox data={data}/>,
    document.getElementById('audio_div')
);
