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

    handlePlay: function(i){
       console.log('My play '+i.soung);
       this.setState({src: i.soung});
       //this.audioEl.onerror = function () {console.log(arguments)}
       //this.audioEl.pause();
       //this.refs.audioEl.pause();
       //this.refs.audioEl.load();
       /*this.audioEl.oncanplaythrough = function () {
         this.audioEl.play();
       }*/
       return i.soung;
    },
    componentDidUpdate: function (prevProps, prevState) {
      if (this.refs.audioEl) {
        this.refs.audioEl.load();
      }
    },
    render: function() {
        var music = this.state.src;
        var arrayMusic = music.split();
        //if(music == "")
        //{
        //    return;
        //}
        //else{
        //    var audio = new Audio();
        //
        //}
        // ***** это просто код, думала если динамически создам все покатит, но нет
        //<audio controls className={this.props.className} >
        //    <source src={music} type="audio/mp3"/>
        //</audio>
        console.log(music);
        var self = this;
        return (
            <div className="audioBox">
                {arrayMusic.map(function(item){
                   return(
                       <audio controls ref="audioEl" autoPlay>
                           <source src={item} type="audio/mp3"/>
                        </audio>)
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
