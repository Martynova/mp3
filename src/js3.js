
/**
 * Created by i.martynova on 12/17/2015.
 */
//var Alert = require('react-bootstrap/lib/Alert');
var data = [
    {id:1, soung:"music/kolobok.mp3", year: "1983", singer:"детские песни"},
    {id:2, soung:"music/otulibki.mp3", year:"1955", singer:"детские песни"},
    {id:3, soung:"music/kukla.mp3", year:"1981", singer:"детс песня"}
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
        return {
            soung: 'soung',
            year: 'year',
            singer: 'singer',
            data: this.props.data,
            className: 'glyphicon glyphicon glyphicon-sort',
            }


    },
    handleClick: function(i){

        //console.log('You clicked: '+ i.soung);
        console.log(this.props.onClickPlay(i));

    },

    sortSoung:function(){


            function sortTableSoung(a, b){
                return a.soung > b.soung ? 1: -1;
            }

        var sortArray = this.state.data.sort(sortTableSoung);
        this.setState({data: sortArray, className: 'glyphicon glyphicon-sort-by-alphabet'});

    },
    sortYear: function(){
      var array = this.state.data;
          function sortTableYear(a,b) {
              return a.year-b.year;
            }
      var sortArray=array.sort(sortTableYear);
      this.setState({data: sortArray, className: 'glyphicon glyphicon-sort-by-alphabet'});
    },
    sortSinger: function(){

            function sortTableSoung(a, b){
                return a.singer > b.singer ? 1: -1;
            }

        var sortArray = this.state.data.sort(sortTableSoung);
        this.setState({data: sortArray, className: 'glyphicon glyphicon-sort-by-alphabet'});
    },

    render: function(){
        //var stat = this.state.data;
        //console.log(stat);


        var nameS = this.props.data.map(function(nameSoung){
           // console.log(nameS);
           // console.log(nameSoung);
            return(
                <tr className="listBox">
                    <td>
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
                <thead>
                <tr >
                    <th onClick = {this.sortSoung}><span className={this.state.className} aria-hidden="true">{this.state.soung}</span></th>
                    <th onClick = {this.sortYear}><span className={this.state.className} aria-hidden="true">{this.state.year}</span></th>
                    <th onClick = {this.sortSinger}><span className={this.state.className} aria-hidden="true">{this.state.singer}</span> </th>
                </tr>
                </thead>
                <tbody>
                {nameS}
                </tbody>
            </table>
        );
    }
});

ReactDOM.render(
    <AudioBox data={data}/>,
    document.getElementById('audio_div')
);