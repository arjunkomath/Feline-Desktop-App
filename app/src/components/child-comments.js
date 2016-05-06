var React = require('react');
import {Icon} from "react-photonkit";

var styles = {
    avatar: {
        marginRight: 10,
        borderRadius: '50%',
        verticalAlign: 'middle'
    }
}

module.exports = React.createClass({

    renderComment: function () {
        var c = [];
        var _this = this;
        this.props.comments.map(function (comment) {
            c.push(
                <div key={comment.id}>
                    <p>
                        <img src={comment.user.image_url['32px']} style={styles.avatar}/>
                        <b>{comment.user.name}</b> <Icon glyph="up-open-big" title="up-open-big"/> {comment.votes}
                    </p>
                    <p>
                        {comment.body}
                    </p>
                </div>
            )
        })
        return c;
    },

    render: function () {
        return (
            <div>
                {this.renderComment()}
            </div>
        );
    }

});