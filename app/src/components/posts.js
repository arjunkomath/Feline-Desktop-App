var React = require('react');
import {Pane, ListGroup, ListItem} from "react-photonkit";
var Loader = require('react-loader');

module.exports = React.createClass({

    renderPost: function () {
        var posts = [];
        this.props.posts.map(function (post) {
            posts.push(
                <ListItem
                    key={post.id}
                    image={post.thumbnail.image_url}
                    title={post.name + ' | ' + post.votes_count + ' Upvotes'}
                    subtitle={post.tagline}/>
            )
        })
        return posts;
    },

    render: function () {
        return (
            <Pane>
                <Loader loaded={this.props.posts.length}>
                    <ListGroup>
                        {this.renderPost()}
                    </ListGroup>
                </Loader>
            </Pane>
        );
    }

});