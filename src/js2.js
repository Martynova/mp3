/**
 * Created by i.martynova on 12/16/2015.
 */
var GroceryList = React.createClass({
    handleClick: function(i) {
        console.log('You clicked: ' + this.props.items[i]);
    },

    render: function() {
        return (
            <div>
            {this.props.items.map(function(item, i) {
                return (
                    <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
        );
    }, this)}
</div>
);
}
});

ReactDOM.render(
<GroceryList items={['Apple', 'Banana', 'Cranberry']} />,
document.getElementById('audio_div')
);