var React = require('react');
var ReactDom = require('react-dom');

var Sidebar = require('./components/sidebar');
var Posts = require('./components/posts');
var PostWidget = require('./components/post-widget');

var keys = require('./keys');

import {Window, Content, Pane} from "react-photonkit";

var App = React.createClass({

    getInitialState: function () {
        return {
            loaded: false,
            network: true,
            category: 'tech',
            days_ago: 0,
            loadingMore: false,
            access_token: undefined,
            posts: [],
            post: {},
            comments: [],
            media: []
        };
    },

    componentDidMount: function () {
        this.fetchData();
    },

    fetchData: function () {
        var requestObj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'api.producthunt.com'
            },
            body: JSON.stringify({
                "client_id": keys.key,
                "client_secret": keys.secret,
                "grant_type": 'client_credentials'
            })
        };
        fetch('https://api.producthunt.com/v1/oauth/token', requestObj)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    access_token: responseData.access_token,
                    network: true
                });
                this.getPosts();
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    network: false
                });
            });
    },

    getPosts: function () {
        var url = 'https://api.producthunt.com/v1/categories/' + this.state.category + '/posts?days_ago=' + this.state.days_ago;
        var requestObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.access_token,
                'Host': 'api.producthunt.com'
            }
        };
        fetch(url, requestObj)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.posts.length > 0) {
                    this.handleViewPost(responseData.posts[0].id);
                    this.setState({
                        posts: responseData.posts,
                        network: true
                    });
                } else {
                    this.setState({
                        network: true
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    network: false
                });
            });
    },

    handleCategory: function (index) {
        if (index == 1)
            this.setState({category: 'tech', posts: []}, () => this.getPosts());
        else if (index == 2)
            this.setState({category: 'games', posts: []}, () => this.getPosts());
        else if (index == 3)
            this.setState({category: 'podcasts', posts: []}, () => this.getPosts());
        else if (index == 4)
            this.setState({category: 'books', posts: []}, () => this.getPosts());
    },

    handleViewPost: function (id) {
        this.setState({loaded: false});
        var requestObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.access_token,
                'Host': 'api.producthunt.com'
            }
        };
        fetch('https://api.producthunt.com/v1/posts/' + id, requestObj)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    comments: responseData.post.comments,
                    media: responseData.post.media,
                    post: responseData.post,
                    loaded: true
                });
            });
    },

    loadMore: function () {
        if(this.state.loadingMore)
            return false;
        this.setState({days_ago: this.state.days_ago + 1, loadingMore: true}, function () {
            var url = 'https://api.producthunt.com/v1/categories/' + this.state.category + '/posts?days_ago=' + this.state.days_ago;
            var requestObj = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.access_token,
                    'Host': 'api.producthunt.com'
                }
            };
            fetch(url, requestObj)
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.posts.length > 0) {
                        this.handleViewPost(responseData.posts[0].id);
                        this.setState({
                            posts: this.state.posts.concat(responseData.posts),
                            loadingMore: false,
                            network: true
                        });
                    } else {
                        this.setState({
                            network: true
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        network: false
                    });
                });
        });
    },

    render: function () {
        return (
            <Window>
                <Content>
                    <Sidebar changeCategory={this.handleCategory}/>
                    <Posts posts={this.state.posts} post={this.state.post} viewPost={this.handleViewPost}
                           loadMore={this.loadMore} loadingMore={this.state.loadingMore} />
                    <PostWidget post={this.state.post} comments={this.state.comments} media={this.state.media}
                                load={this.state.loaded}/>
                </Content>
            </Window>
        );
    }
});

ReactDom.render(<App/>, document.getElementById('react-root'));