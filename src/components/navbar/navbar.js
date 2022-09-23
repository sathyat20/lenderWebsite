import React, { Component } from 'react';
import {
  Nav, Navbar, Container,
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import produce from 'immer';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { green } from '@mui/material/colors';
import { searchPosts, signoutUser } from '../../actions';
import withRouter from '../withRouter';

class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      searchText: '',
    };
  }

  expand = () => {
    if (this.state.expanded === false) {
      this.setState(
        produce((draftstate) => {
          // eslint-disable-next-line no-param-reassign
          draftstate.expanded = 'expanded';
        }),
      );
    }
  };

  saveText = (event) => {
    this.setState(
      produce((draftstate) => {
        // eslint-disable-next-line no-param-reassign
        draftstate.searchText = event.target.value;
      }),
    );
  };

  clicked = () => {
    this.props.searchPosts(this.state.searchText);
  };

  // eslint-disable-next-line class-methods-use-this
  handleKeypress = (e) => {
    console.log('here called');
    console.log(e.keyCode);
    if (e.key === 'Enter') {
      this.clicked();
      this.props.navigate('/results');
    }
  };

  render() {
    return (
      <Navbar expand="lg" expanded={this.state.expanded}>
        <Container className="nav-items">
          <Navbar.Brand as={NavLink}
            to="/"
            className="nav-title-font"
            onClick={() => setTimeout(() => {
              this.setState(
                produce((draftstate) => {
                  // eslint-disable-next-line no-param-reassign
                  draftstate.expanded = false;
                }),
              );
            }, 150)}
          >LENDER
          </Navbar.Brand>
          <div className="searchBar">
            <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" defaultValue="" onKeyPress={this.handleKeypress} onChange={this.saveText} />
            <NavLink
              to="/results"
            ><SearchIcon id="searchQuerySubmit" sx={{ fontSize: 'medium', color: green[600] }} onClick={this.clicked} />
            </NavLink>
          </div>

          <Navbar.Toggle onClick={this.expand} />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav>
              {(!this.props.authenticated)
                ? (
                  <div className="unauthenticated-links">
                    <Nav.Link as={NavLink}
                      to="/signin"
                      onClick={() => setTimeout(() => {
                        this.setState(
                          produce((draftstate) => {
                          // eslint-disable-next-line no-param-reassign
                            draftstate.expanded = false;
                          }),
                        );
                      }, 150)}
                      className="nav-texts"
                    >
                      Sign In
                    </Nav.Link>

                    <Nav.Link as={NavLink}
                      to="/signup"
                      onClick={() => setTimeout(() => {
                        this.setState(
                          produce((draftstate) => {
                            // eslint-disable-next-line no-param-reassign
                            draftstate.expanded = false;
                          }),
                        );
                      }, 150)}
                      className="nav-texts"
                    >
                      Sign Up
                    </Nav.Link>
                  </div>
                )
                : (
                  <div className="authenticated-links">
                    <Nav.Link as={NavLink}
                      to="/"
                      onClick={this.props.signoutUser}
                      className="nav-texts"
                    >
                      Sign Out
                    </Nav.Link>
                    <Nav.Link as={NavLink}
                      to="/dashboard"
                      onClick={() => setTimeout(() => {
                        this.setState(
                          produce((draftstate) => {
                            // eslint-disable-next-line no-param-reassign
                            draftstate.expanded = false;
                          }),
                        );
                      }, 150)}
                      className="nav-texts"
                    >
                      DashBoard
                    </Nav.Link>
                    {/* <Nav.Link as={NavLink}
                      to="/favorites"
                      onClick={() => setTimeout(() => {
                        this.setState(
                          produce((draftstate) => {
                            // eslint-disable-next-line no-param-reassign
                            draftstate.expanded = false;
                          }),
                        );
                      }, 150)}
                      className="nav-texts"
                    >
                      Favorites
                    </Nav.Link> */}
                    <Link to="/lenditem" className="lend-button">
                      <Button
                        variant="contained"
                        size="medium"
                        className="borrow-button"
                        sx={{ boxShadow: 'none' }}
                      >
                        Lend item
                      </Button>
                    </Link>
                  </div>
                )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
}
);

export default withRouter(connect(mapStateToProps, { searchPosts, signoutUser })(Navigationbar));
