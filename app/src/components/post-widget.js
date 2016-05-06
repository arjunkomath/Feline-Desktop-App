var React = require('react');
import {Pane, Icon, Button} from "react-photonkit";
var Loader = require('react-loader');

var Comments = require('./comments');

var styles = {
    post: {
        marginLeft: 20,
        marginRight: 20
    }
}

module.exports = React.createClass({

    openUrl: function (url) {
        console.log(url);
        window.open(url);
    },

    render: function () {
        return (
            <Pane>
                <Loader loaded={this.props.load}>
                    <div style={styles.post}>
                        <h3>{this.props.post.name}</h3>
                        <p>{this.props.post.tagline}</p>

                        <p>
                            <Icon glyph="up-open-big" title="up-open-big"/> {this.props.post.votes_count}
                            <Icon style={{marginLeft: 10}} glyph="comment" title="comment"/> {this.props.comments.length}
                            <Button style={{marginLeft: 10}} ptStyle="primary" text="GET IT" onClick={() => this.openUrl(this.props.post.redirect_url)} />
                        </p>

                        <Comments comments={this.props.comments} />

                    </div>
                </Loader>
            </Pane>
        );
    }

});