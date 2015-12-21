
/**
 * Created by i.martynova on 12/17/2015.
 */
//var Alert = require('react-bootstrap/lib/Alert');
var data = [
    {id:1, soung:"music/kolobok.mp3", year: "1983", singer:"детские песни"},
    {id:2, soung:"music/otulibki.mp3", year:"1955", singer:"детские песни"},
    {id:3, soung:"music/kukla.mp3", year:"1984", singer:"детс песня"}
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
            singer: 'singer'}

    },
    handleClick: function(i){

        //console.log('You clicked: '+ i.soung);
        console.log(this.props.onClickPlay(i));

    },
    componentDidMount:function(e){

    },
    sortData:function(e){
      //var sortData = this.props.data;
      //  console.log(sortData);
        // sortData.sort()
        //// {
        ////    return td1.soung-td2.soung;
        ////});
        //for(var i=0; i < sortData.length; i++){
        //    console.log(sortData[i].soung);
        //}
       //this.refs.tableEl;
        var table=document.querySelector(".table-striped");
        console.log(e.target.getAttribute('data-type'));

        console.log(e.target.cellIndex);
        var colNum=e.target.cellIndex;
        var type =  e.target.getAttribute('date-type');

        sortTable(colNum,type);
        console.log(table);
        table.onclick = function(e){
            if(e.target.tagName != "TH")return;
        };



            function sortTable(colNum, type){
                var tbody = table.getElementsByTagName('tbody')[0];
                //console.log(tbody);
                var rowArray = [].slice.call(tbody.rows);
                console.log(rowArray);
                var compare;
                switch (type){
                    case 'number':
                        compare = function(rowA, rowB){
                            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
                        };
                        break;
                    case 'string':
                        compare = function(rowA, rowB){
                            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1: -1;
                        };
                        break;
                }
                console.log(rowArray.sort(compare));
                table.removeChild(tbody);
                for (var i=0; i<rowArray.length; i++){
                    tbody.appendChild(rowArray[i]);
                }
                table.appendChild(tbody);
            }

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
                <thead>
                <tr >
                    <th data-type="string"  onClick = {this.sortData}>{this.state.soung}</th>
                    <th data-type="number">{this.state.year}</th>
                    <th>{this.state.singer}</th>
                </tr>
                </thead>

                {nameS}

            </table>
        );
    }
});

ReactDOM.render(
    <AudioBox data={data}/>,
    document.getElementById('audio_div')
);