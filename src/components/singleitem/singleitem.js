/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { ToastContainer, toast } from 'react-toastify';
import withRouter from '../withRouter';
import { fetchPost, deletePost } from '../../actions';
import 'react-toastify/dist/ReactToastify.css';

class SingleItem extends Component {
  // change stuff in here
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.fetchPostWrap();
  }

  fetchPostWrap = async () => {
    await this.props.fetchPost(this.props.params.postID);
  };

  handleDelete = (listingID) => {
    this.props.deletePost(listingID, this.props.navigate);
  };

  // eslint-disable-next-line class-methods-use-this
  showNotification = () => {
    toast.success('Item has been flagged!');
  };

  render() {
    if (this.props.singleItem != null) {
      return (
        <div className="footer-allowance-1">
          <Form className="account-form-1">
            <h1 className="form-header-1" id="indiv-title">{this.props.singleItem.itemName} </h1>

            <div className="image-and-description">

              <div className="">
                <Card className="single-card-1" sx={{ borderRadius: 5 }}>
                  <CardMedia
                    component="img"
                    alt="item"
                    image={this.props.singleItem.imageArray[0]}
                  />
                </Card>
                <div className="v-divider" />
              </div>

              <div className="listing-description">
                <div className="">
                  <p className="item-name-single">{this.props.singleItem.itemName}<br /></p>
                </div>
                <div className="">
                  <p className="figure-1">Street: {this.props.singleItem.street}</p>
                </div>
                <div className="">
                  <p className="figure-1">City: {this.props.singleItem.city}</p>
                </div>
                <div className="">
                  <p className="figure-1">State: {this.props.singleItem.state}</p>
                </div>
                <div className="">
                  <p className="figure-1">Zip Code: {this.props.singleItem.zipcode}</p>
                </div>
                <div className="">
                  <p className="figure-2">Description: {this.props.singleItem.description}</p>
                </div>
                <div className="">
                  <p className="figure-1">Condition: {this.props.singleItem.condition}</p>
                </div>
                <div className="">
                  <p className="figure-1">Price: ${this.props.singleItem.price}</p>
                </div>
                <div className="" />
                <div className="">
                  {(!this.props.authenticated)
                    ? (
                      <Button
                        variant="contained"
                        size="medium"
                        className="borrow-button-1"
                        sx={{ boxShadow: 'none' }}
                        onClick={() => this.props.navigate('../accountcheck', { price: this.props.singleItem.price, foo: 'bar' })}
                      >
                        Borrow item
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="medium"
                        className="borrow-button-1"
                        sx={{ boxShadow: 'none' }}
                        onClick={() => this.props.navigate('../checkout', { price: this.props.singleItem.price, foo: 'bar' })}
                      >
                        Borrow item
                      </Button>
                    )}

                </div>

              </div>

              <div className="dropdown">
                <MoreVertOutlinedIcon className="option-dots" />
                <div className="dropdown-content">
                  {(this.props.authenticated && this.props.singleItem.email === this.props.current.email)
                    ? (
                      <div className="drop-options">
                        <NavLink to={`/editlisting/${this.props.params.postID}`} className="drop-edit"> Edit </NavLink>
                        <p className="drop-delete" onClick={() => this.handleDelete(this.props.params.postID)}>Delete</p>
                      </div>
                    )
                    : (
                      <div>
                        <p className="flag-listing"
                          onClick={() => this.showNotification()}
                        >Flag Listing
                        </p>
                        <ToastContainer className="toast-message" />
                      </div>
                    )}

                </div>
              </div>
            </div>

            <div className="image-and-name">
              <img className="rounded-circle z-depth-2" alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg" />
              <h1 className="lender-name" id="indiv-title">{this.props.singleItem.userName}</h1>
            </div>
          </Form>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    singleItem: reduxState.posts.current,
    authenticated: reduxState.auth.authenticated,
    current: reduxState.auth.current,
  };
}

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost })(SingleItem));
