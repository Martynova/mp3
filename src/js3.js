/**
 * Created by i.martynova on 12/17/2015.
 */
//var Alert = require('react-bootstrap/lib/Alert');
var data = [
    {id: "1", soung: "music/kolobok.mp3", year: "1983", singer: "детские песни"},
    {id: "2", soung: "music/otulibki.mp3", year: "1955", singer: "детские песни"},
    {id: "3", soung: "music/kukla.mp3", year: "1981", singer: "детс песня"},
    {id: "4", soung: "music/ja_svoboden.mp3", year: "1997", singer: "кипелов"},
    {id: "5", soung: "music/shtil.mp3", year: "2001", singer: "кипелов"},
    {id: "6", soung: "music/svoboda.mp3", year: "2002", singer: "кипелов"},
    {id: "7", soung: "music/poterjannij_raj.mp3", year: "1999", singer: "кипелов"},
    {id: "8", soung: "music/angelskaja_pil.mp3", year: "1995", singer: "ночь короче дня, кипелов"},
    {id: "9", soung: "music/begi_za_solncem.mp3", year: "1998", singer: "генератор зла, кипелов"},
    {id: "10", soung: "music/prorok.mp3", year: "2001", singer: "кипелов"},
    {id: "11", soung: "music/ne_ver_mne.mp3", year: "1991", singer: "кровь за кровь, кипелов"}


];

var AudioBox = React.createClass({

    getDefaultProps: function () {
        return {
            className: 'player',
        }
    },
    getInitialState: function () {
        return {
            src: '',
            pageSize: 10
        };
    },
    //componentWillMount: function(){
    //    this.setState({src: i.soung})
    //},

    handlePlay: function (i) {
        console.log('My play ' + i.soung);

        this.setState({src: i.soung});
        console.log(this.refs.audioEl);
        this.refs.audioEl.pause();
        this.refs.audioEl.load();


    },
    componentDidMount: function (prevProps, prevState) { //вызывается сразу после монтирования. Инициализация этого требует, чтобы DOM узлы шли сюда
        this.refs.audioEl.load();
    },
    render: function () {
        var music = this.state.src;
        var arrayMusic = music.split();


        return (
            <div className="audioBox">
                {arrayMusic.map(function (item) {
                    return (

                        <audio controls ref="audioEl">
                            <source src={item} type="audio/mp3"/>
                        </audio>

                    )
                })}


                <ListBox data={this.props.data} handlePlay={this.handlePlay}/>

            </div>
        );
    }
});


var ListBox = React.createClass({
    getInitialState: function () {
        return {
            soung: 'soung',
            year: 'year',
            singer: 'singer',
            number: '№',
            data: this.props.data,
            className: 'glyphicon glyphicon glyphicon-sort',
            pageSize: 10,
            currentPage: 1,

        }


    },
    handleClick1: function (i) {
        console.log(i);
        console.log('You clicked: ' + i.soung);
        console.log(this.props.handlePlay(i));

    },

    sortSoung: function (e) {

        function sortTableSoung(a, b) {
            return a.soung > b.soung ? 1 : -1;
        }

        var sortArray = this.state.data.sort(sortTableSoung);
        if (e.target.tagName == 'SPAN') {
            this.setState({className: 'glyphicon glyphicon-sort-by-alphabet'});
        }


        this.setState({data: sortArray});

    },
    sortYear: function () {
        var array = this.state.data;

        function sortTableYear(a, b) {
            return a.year - b.year;
        }

        var sortArray = array.sort(sortTableYear);
        this.setState({data: sortArray});
    },
    sortId: function () {
        var array = this.state.data;


        function sortTableId(a, b) {
            return a.id - b.id;
        }

        var sortArray = array.sort(sortTableId);
        this.setState({data: sortArray});
    },
    sortSinger: function () {

        function sortTableSoung(a, b) {
            return a.singer > b.singer ? 1 : -1;
        }

        var sortArray = this.state.data.sort(sortTableSoung);
        this.setState({
            data: sortArray

        });
        console.log(sortArray);
    },
    getPage: function (page) {
        var start = this.state.pageSize * (this.state.currentPage - 1);
        var end = start + this.state.pageSize;
        console.log("My page in getPage: "+ page);
        //var getPageThis = this;
        //
        return {
            newDat: this.state.data.slice(start, end),
            numPages: this.getNumPages(),
            getClickPage: function (page) {
                console.log("My page in getClickPage: "+ page.numPage);
                console.log("My this: "+ this);

                debugger;
                
                return this.setState({
                        currentPage: page.numPage
                    });


            }.bind(this)

        }

    },
    getNumPages: function () {
//console.log(this.state.pageSize);

        var numPages = Math.floor(this.props.data.length / this.state.pageSize);


        if (this.props.data.length % this.state.pageSize > 0) {
            numPages++
        }
        // console.log(numPages);
        return numPages;
    },

    render: function () {

        var page = this.getPage();
        console.log(page.newDat);

        var nameS = page.newDat.map(function (nameSoung) {

            return (
                <tr className="listBox">
                    <td>
                        {nameSoung.id}
                    </td>
                    <td>
                        <a href="#" data-src={nameSoung.soung} onClick={this.handleClick1.bind(this,nameSoung)}>
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
        }, this);
        return (
            <div>
                <table className="table-striped">
                    <thead>
                    <tr >
                        <th onClick={this.sortId}><span className={this.state.className}
                                                        aria-hidden="true">{this.state.number}</span></th>
                        <th onClick={this.sortSoung}><span className={this.state.className}
                                                           aria-hidden="true">{this.state.soung}</span></th>
                        <th onClick={this.sortYear}><span className={this.state.className}
                                                          aria-hidden="true">{this.state.year}</span></th>
                        <th onClick={this.sortSinger}><span className={this.state.className}
                                                            aria-hidden="true">{this.state.singer}</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {nameS}
                    </tbody>
                </table>
                <PaginationBox pageSize={this.state.pageSize} data={this.props.data} getClickPage={this.getPage().getClickPage}/>
            </div>
        );
    }
});


var PaginationBox = React.createClass({
    getInitialState: function () {
        return {

            data: this.props.data,
            pages: [
                {numPage: "<<"},
                {numPage: "1"},
                {numPage: "2"},
                {numPage: ">>"}
            ]

        }

    },
    handleClick2: function (page) {
        console.log("My page handleClick2: " + page.numPage);
        this.props.getClickPage(page);// передаю мой page в ListBox d getClickPage, который находится getPage;
    },
    render: function () {
//console.log();
        var pagePag = this.state.pages.map(function (page) {

            return (
                <li>
                    <a href="#" onClick={this.handleClick2.bind(this, page)}>
                        {page.numPage}
                    </a>
                </li>
            )
        }, this);
        return (

            <nav>
                <ul className="pagination pagination-sm">
                    {pagePag}
                </ul>
            </nav>
        )
    }
})

ReactDOM.render(
    <AudioBox data={data}/>,
    document.getElementById('audio_div')
);
//<li><a onClick={this.handleClick2}>1</a></li>
//<li><a href="#">2</a></li>
//<li>
//    <a href="#" aria-label="Next">
//        <span aria-hidden="true"></span>
//    </a>
//</li>