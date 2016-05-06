var React = require('react');
import {Pane, ListGroup, ListItem, Icon} from "react-photonkit";
var Loader = require('react-loader');

var styles = {
    post: {
        borderBottom: 'solid 0.1em #e3e3e3'
    }
}

module.exports = React.createClass({

    renderPost: function () {
        var posts = [];
        var _this = this;
        this.props.posts.map(function (post) {
            posts.push(
                <div key={post.id} onClick={() => {_this.props.viewPost(post.id); _this.props.post.id = post.id }} style={styles.post}>
                    <ListItem
                        key={post.id}
                        image={post.thumbnail.image_url}
                        title={post.name + ' | ' + post.votes_count + ' votes'}
                        subtitle={post.tagline}
                        active={ post.id == _this.props.post.id }
                    />
                </div>
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