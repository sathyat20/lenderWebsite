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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { produce } from 'immer';
import { NavLink } from 'react-router-dom';
import { fetchPosts } from '../../actions';
import withRouter from '../withRouter';
import 'font-awesome/css/font-awesome.min.css';

class MainPage extends Component {
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

    const allPosts = start() ? this.props.items.map((post) => {
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
      : <div />;

    return (

      <ul className="listed-items">
        {allPosts}
      </ul>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  items: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(MainPage));
