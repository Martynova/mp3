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
    //getInitialState: function(){
    //    return {}
    //},
    handleClick: function(i){

        //console.log('You clicked: '+ i.soung);
        console.log(this.props.onClickPlay(i));

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
