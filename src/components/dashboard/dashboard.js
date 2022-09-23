/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
// Default page
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { current, produce } from 'immer';
import { NavLink } from 'react-router-dom';
import { fetchPosts } from '../../actions';
import 'font-awesome/css/font-awesome.min.css';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const start = () => {
      return (Array.isArray(this.props.items));
    };

    const currentUserPosts = (start() || this.props.auth) ? this.props.items.filter((item) => item.email === this.props.current.email) : [];
    console.log(`items include ${this.props.items}`);
    console.log('current user posts', currentUserPosts);

    const allPosts = (currentUserPosts.length > 0) ? currentUserPosts.map((post) => {
      return (
        <div className="listed-items-1">
          <NavLink to={`/posts/${post.id}`} key={post.id}>
            <div className="card-and-description">
              <Card className="single-card" sx={{ borderRadius: 5 }}>
                <CardMedia
                  component="img"
                  alt="item"
                  image={post.imageArray[0]}
                />
              </Card>
            </div>
          </NavLink>
          <div className="item-and-fav">
            <p className="item-name"> {post.itemName} </p>
            <div className="cost">
              <p className="figure">${post.price}</p>
            </div>
          </div>

        </div>
      );
    })
      : <div> You have not listed any items! </div>;

    return (

      <ul className="listed-items-6">
        {allPosts}
      </ul>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  items: reduxState.posts.all,
  current: reduxState.auth.current,
  auth: reduxState.auth.authenticated,
});

export default connect(mapStateToProps, { fetchPosts })(DashBoard);
