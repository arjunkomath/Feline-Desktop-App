var React = require('react');
var ReactDom = require('react-dom');
var { Pane, NavGroup, NavTitle, NavGroupItem } = require("react-photonkit");

module.exports = React.createClass({

    onSelect: function(index) {
        this.props.changeCategory(index);
    },

    render: function() {
        return (
            <Pane ptSize="sm" sidebar>
                <NavGroup activeKey={1} onSelect={this.onSelect}>
                    <br/>
                    <NavTitle><b>Category</b></NavTitle>
                    <NavGroupItem eventKey={1} glyph="monitor" text="Tech" />
                    <NavGroupItem eventKey={2} glyph="rocket" text="Games" />
                    <NavGroupItem eventKey={3} glyph="note" text="Podcasts" />
                    <NavGroupItem eventKey={4} glyph="book" text="Books" />
                </NavGroup>
            </Pane>
        );
    }

});