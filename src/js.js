
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
    handleClick: function(){
        this.setState({player: true});
    },
    render: function() {
        return (
            <div className="audioBox">

                <audio controls className={this.props.className} onClick={this.handleClick}>
                    <source  type="audio/mp3"/>
                </audio>

                <ListBox data={this.props.data} />
            </div>
        );
    }
    });
var ListBox = React.createClass({
        getInitialState: function(){
        return {}
},
        handleClick: function(i){

           console.log('You clicked: '+ this.props.data.soung[i])
        },
    //render: function () {
    //    var li = this.props.data.map(function(nameSoung){
    //        return(
    //
    //                <li key={nameSoung.id}><a href="#" data-src={nameSoung.soung}>{nameSoung.soung}</a></li>
    //
    //        );
    //    });
    //    return (
    //        <ol className="listBox">
    //
    //                {li}
    //
    //        </ol>
    //    )
    //}
    render: function(){


        return (
                <ol className="listBox">

            {this.props.data.map(function(nameSoung, i){
                    console.log(nameSoung);
                    return  (
                        <li key={nameSoung.id}>
                            <a  href="#" data-src={nameSoung.soung} onClick={this.handleClick.bind(this,nameSoung.soung)} >{nameSoung.soung}</a>
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


