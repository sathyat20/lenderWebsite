import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import noresult from '../../img/noresults.png';
import Location from './location';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  display = () => {
    const start = () => {
      return (Array.isArray(this.props.searched));
    };

    let allPosts = null;
    if (start() && this.props.searched.length > 0) {
      allPosts = start() ? this.props.searched.map((post) => {
        return (
          <div className="listed-items-5">
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
            {/* <div role="option" aria-selected="false" tabIndex={0} onClick={this.handleClick}>
            {post.favorited ? <FavoriteOutlinedIcon sx={{ color: '#14AE5C' }} /> : <FavoriteBorderIcon /> }
          </div> */}
          </div>
        );
      })
        : <div />;
    } else {
      allPosts = (
        <div className="no">
          <p>Sorry we could not find items that match your search.</p>
          <p>Suggestions:</p>
          <ul>
            <li>Make sure all words are typed correctly.</li>
            <li>Try different keywords.</li>
            <li>Try more general keywords.</li>
          </ul>
          <img className="noresult" src={noresult} alt="nothing" />;
        </div>
      );
    }

    if (start() && this.props.searched.length > 0) {
      return (
        <div className="finalResult">
          <ul className="listed-items-3" key={this.props.searched}>
            {allPosts}
          </ul>
          <div className="map_listed">
            <Location />
          </div>

        </div>
      );
    } else {
      return (
        <div className="finalResult">
          {allPosts}
        </div>
      );
    }
  };

  render() {
    return (
      <div>{this.display()}</div>

    );
  }
}

const mapStateToProps = (reduxState) => ({
  searched: reduxState.posts.searched,
}
);

export default connect(mapStateToProps, null)(Results);
