/**
 * Created by i.martynova on 12/17/2015.
 */
//var Alert = require('react-bootstrap/lib/Alert');


var AudioBox = React.createClass({

    loadCommentsServer: function () { // посылаю запрос
        $.ajax({

            url: this.props.url,

            dataType: 'json',
            cache: false,
            success: function (data) {
                //console.log(data);

                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        console.log(this.props.url);
    },

    getDefaultProps: function () {
        return {
            className: 'player',
        }
    },
    getInitialState: function () {
        return {
            src: '',
            pageSize: 10,
            data: []

        };
    },
    componentDidMount: function () {   //Вызывается один раз,только на клиенте сразу же после того, как происходит инициализация рендеринга.
        this.loadCommentsServer();
        //setInterval(this.loadCommentsServer, 2000);
    },


    handlePlay: function (i) {
        console.log('My play ' + i.soung);

        this.setState({src: i.soung});
        console.log(this.refs.audioEl);
        this.refs.audioEl.pause();
        this.refs.audioEl.load();


    },
    componentDidUpdate: function (prevProps, prevState) { //Вызывается сразу после возникновения обновление. Этот метод не вызывается для начала рендеринга.
        if (this.refs.audioEl) {
            this.refs.audioEl.load();
        }

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


                <ListBox data={this.state.data} handlePlay={this.handlePlay}/>

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
            pageSize: 10,// колличество на странице
            currentPage: 1 //  текущая страница

        }


    },
    handleClick1: function (i) { // по какой песне кликнули
       // console.log(i);
        console.log('You clicked: ' + i.soung);
        console.log(this.props.handlePlay(i));

    },

    sortSoung: function (e) {

        function sortTableSoung(a, b) {
            return a.soung > b.soung ? 1 : -1;
        }

        var sortArray = this.props.data.sort(sortTableSoung);
        if (e.target.tagName == 'SPAN') {
            this.setState({className: 'glyphicon glyphicon-sort-by-alphabet'});
        }


        this.setState({data: sortArray});

    },
    sortYear: function () {
        var array = this.props.data;

        function sortTableYear(a, b) {
            return a.year - b.year;
        }

        var sortArray = array.sort(sortTableYear);
        this.setState({data: sortArray});
    },
    sortId: function () {
        var array = this.props.data;


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

        var sortArray = this.props.data.sort(sortTableSoung);
        this.setState({
            data: sortArray

        });
        console.log(sortArray);
    },
    getPage: function (page) {
        var start = this.state.pageSize * (this.state.currentPage - 1);
        var end = start + this.state.pageSize;
        //console.log("My page in getPage: " + page);
        //var getPageThis = this;

        return {
            newDat: this.props.data ? this.props.data.slice(start, end) : [],
            numPages: this.getNumPages(),
            getClickPage: function (numberPage) { // получили по какой странице кликнули меняем в State currentPage
                console.log("My page in getClickPage: " + numberPage);
                //console.log("My this: " + this);

                //debugger;
                        if(numberPage == "<<"){
                            return this.setState({
                                currentPage: 1
                            })}
                         else if(numberPage == ">>"){
                                return this.setState({
                                    currentPage: this.getNumPages()

                                })
                            }
                            else
                            {
                                return this.setState({
                                    currentPage: numberPage
                                });
                            }



            }.bind(this)

        }

    },
    getNumPages: function () { // номер страницы;
//console.log(this.state.pageSize);
        var numPages = 0;
        if (this.props.data) {
            numPages = Math.floor(this.props.data.length / this.state.pageSize);
            console.log(this.props.data.length)


            if (this.props.data.length % this.state.pageSize > 0) {
                numPages++
            }
            // console.log(numPages);
        }
        return numPages;
    },

    render: function () {

        var page = this.getPage();
        // console.log(page.newDat);

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
                <PaginationBox pageSize={this.state.pageSize} data={this.props.data}
                               getClickPage={this.getPage().getClickPage}/>
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
                {numPage: "3"},
                {numPage: ">>"}
            ]

        }

    },
    handleClick2: function (page) { // кликнули по номеру страницы
        console.log("My page handleClick2: " + page.numPage);
        //console.log(page);


                this.props.getClickPage(page.numPage);// передаю мой page в ListBox d getClickPage, который находится getPage;



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
    <AudioBox url="/song"/>, // передаю url
    document.getElementById('audio_div')
);
