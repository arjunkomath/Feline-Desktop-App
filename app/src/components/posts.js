var React = require('react');
import {Pane, ListGroup, ListItem, Icon, Button} from "react-photonkit";
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
                <div key={post.id} onClick={() => {_this.props.viewPost(post.id); _this.props.post.id = post.id }}
                     style={styles.post}>
                    <ListItem
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

                    <div style={{marginTop: 10, marginBottom: 10, textAlign: 'center'}}>
                        <Button ptSize="large" ptStyle="default" text={this.props.loadingMore ? 'LOADING...' : 'LOAD MORE'} onClick={this.props.loadMore}/>
                    </div>

                </Loader>
            </Pane>
        );
    }

});