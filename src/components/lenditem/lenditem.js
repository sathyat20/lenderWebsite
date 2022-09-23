/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import withRouter from '../withRouter';
import { createPost } from '../../actions';
import uploadImage from '../../s3';

const Input = styled('input')({
  display: 'none',
});

function LendItem(props) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState(0);
  const [price, setPrice] = useState(0);
  const [image1Preview, setImage1Preview] = useState();
  const [image1, setImage1] = useState('');
  const [image2Preview, setImage2Preview] = useState();
  const [image2, setImage2] = useState('');
  const [image3Preview, setImage3Preview] = useState();
  const [image3, setImage3] = useState('');
  const [image4Preview, setImage4Preview] = useState();
  const [image4, setImage4] = useState('');

  const onImage1Upload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage1Preview(window.URL.createObjectURL(file));
      setImage1(file);
    }
  };
  const onImage2Upload = (event) => {
    const file2 = event.target.files[0];
    if (file2) {
      setImage2Preview(window.URL.createObjectURL(file2));
      setImage2(file2);
    }
  };
  const onImage3Upload = (event) => {
    const file3 = event.target.files[0];
    if (file3) {
      setImage3Preview(window.URL.createObjectURL(file3));
      setImage3(file3);
    }
  };
  const onImage4Upload = (event) => {
    const file4 = event.target.files[0];
    if (file4) {
      setImage4Preview(window.URL.createObjectURL(file4));
      setImage4(file4);
    }
  };

  const navigate = useNavigate();

  const navigateToPosts = () => {
    navigate('/posts');
  };

  // set states after edit
  const onItemNameChange = (event) => {
    setItemName(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onStreetChange = (event) => {
    setStreet(event.target.value);
  };
  const onCityChange = (event) => {
    setCity(event.target.value);
  };
  const onStateChange = (event) => {
    setState(event.target.value);
  };
  const onZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };
  const onPriceChange = (event) => {
    setPrice(event.target.value);
  };
  const onConditionClick = (event) => {
    console.log(event.target.value);
    setCondition(event.target.value);
  };

  const checkBlankFields = () => {
    if (
      itemName.trim().length > 0
        && description.trim().length > 0
        && condition.length > 0
        && street.trim().length > 0
        && city.trim().length > 0
        && state.trim().length > 0
        && zipcode > 0
        && price > 0
        && image1Preview
        && image1
    ) {
      return true;
    }
    return false;
  };

  const create = async (event) => {
    const imageArray = [];
    if (checkBlankFields() === true) {
      await uploadImage(image1).then((url) => {
        imageArray.push(url);
      });
      if (image2) {
        await uploadImage(image2).then((url) => {
          imageArray.push(url);
        });
      }
      if (image3) {
        await uploadImage(image3).then((url) => {
          imageArray.push(url);
        });
      }
      if (image4) {
        await uploadImage(image4).then((url) => {
          imageArray.push(url);
        });
      }

      const newPost = {
        itemName,
        description,
        condition,
        street,
        city,
        state,
        zipcode,
        price,
        imageArray,
        email: props.current.email,
      };
      console.log(`the user email is: ${newPost.email}`);
      await props.createPost(newPost, props.navigate);
    }
  };
  const stateDropdown = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Choose State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state}
            label="State"
            onChange={onStateChange}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="AL">AL</MenuItem>
            <MenuItem value="AK">AK</MenuItem>
            <MenuItem value="AR">AR</MenuItem>
            <MenuItem value="AZ">AZ</MenuItem>
            <MenuItem value="CA">CA</MenuItem>
            <MenuItem value="CO">CO</MenuItem>
            <MenuItem value="CT">CT</MenuItem>
            <MenuItem value="DC">DC</MenuItem>
            <MenuItem value="DE">DE</MenuItem>
            <MenuItem value="FL">FL</MenuItem>
            <MenuItem value="GA">GA</MenuItem>
            <MenuItem value="HI">HI</MenuItem>
            <MenuItem value="IA">IA</MenuItem>
            <MenuItem value="ID">ID</MenuItem>
            <MenuItem value="IL">IL</MenuItem>
            <MenuItem value="IN">IN</MenuItem>
            <MenuItem value="KS">KS</MenuItem>
            <MenuItem value="KY">KY</MenuItem>
            <MenuItem value="LA">LA</MenuItem>
            <MenuItem value="MA">MA</MenuItem>
            <MenuItem value="MD">MD</MenuItem>
            <MenuItem value="ME">ME</MenuItem>
            <MenuItem value="MI">MI</MenuItem>
            <MenuItem value="MN">MN</MenuItem>
            <MenuItem value="MO">MO</MenuItem>
            <MenuItem value="MS">MS</MenuItem>
            <MenuItem value="MT">MT</MenuItem>
            <MenuItem value="NC">NC</MenuItem>
            <MenuItem value="NE">NE</MenuItem>
            <MenuItem value="NH">NH</MenuItem>
            <MenuItem value="NJ">NJ</MenuItem>
            <MenuItem value="NM">NM</MenuItem>
            <MenuItem value="NV">NV</MenuItem>
            <MenuItem value="NY">NY</MenuItem>
            <MenuItem value="ND">ND</MenuItem>
            <MenuItem value="OH">OH</MenuItem>
            <MenuItem value="OK">OK</MenuItem>
            <MenuItem value="OR">OR</MenuItem>
            <MenuItem value="PA">PA</MenuItem>
            <MenuItem value="RI">RI</MenuItem>
            <MenuItem value="SC">SC</MenuItem>
            <MenuItem value="SD">SD</MenuItem>
            <MenuItem value="TN">TN</MenuItem>
            <MenuItem value="TX">TX</MenuItem>
            <MenuItem value="UT">UT</MenuItem>
            <MenuItem value="VT">VT</MenuItem>
            <MenuItem value="VA">VA</MenuItem>
            <MenuItem value="WA">WA</MenuItem>
            <MenuItem value="WI">WI</MenuItem>
            <MenuItem value="WV">WV</MenuItem>
            <MenuItem value="WY">WY</MenuItem>

          </Select>
        </FormControl>
      </Box>

    );
  };

  return (
    <div className="footer-allowance">
      <Form className="account-form">
        <h1 className="form-header">List Item</h1>

        <div className="form-interval">
          <label htmlFor="exampleFormControlInput1" className="form-label em-w">
            Item Name
            <input type="text"
              className="form-control input-field"
              id="exampleFormControlInput1"
              onChange={onItemNameChange}
              autoComplete="off"
              value={itemName}
              placeholder="Enter item name"
              name="itemname"
            />
          </label>
        </div>

        <div className="form-interval">
          <label htmlFor="exampleFormControlInput1" className="form-label em-w">
            Item Description
            <input type="text"
              className="form-control input-field"
              id="exampleFormControlInput1"
              onChange={onDescriptionChange}
              autoComplete="off"
              value={description}
              placeholder="Enter item description"
              name="itemname"
            />
          </label>
        </div>

        <div className="form-interval">
          <label htmlFor="exampleFormControlInput1" className="form-label em-w">
            Condition
          </label>

          <div className="lending-options">
            <label className="radio-container form-label">Like New
              <input type="radio" id="like_new" name="condition" value="like_new" onClick={onConditionClick} />
              <span className="checkmark" />
            </label>

            <label className="radio-container form-label">Very Good
              <input type="radio" id="very_good" name="condition" value="very_good" onClick={onConditionClick} />
              <span className="checkmark" />
            </label>

            <label className="radio-container form-label">Good
              <input type="radio" id="good" name="condition" value="good" onClick={onConditionClick} />
              <span className="checkmark" />
            </label>

            <label className="radio-container form-label">Acceptable
              <input type="radio" id="acceptable" name="condition" value="acceptable" onClick={onConditionClick} />
              <span className="checkmark" />
            </label>
          </div>

        </div>

        <div className="form-interval">
          <label htmlFor="exampleFormControlInput1" className="form-label em-w">
            Pickup Address
            <input type="text"
              className="form-control input-field"
              id="exampleFormControlInput1"
              onChange={onStreetChange}
              autoComplete="off"
              placeholder="Enter street"
              name="itemname"
            />
            <input type="text"
              className="form-control input-field"
              id="exampleFormControlInput1"
              onChange={onCityChange}
              autoComplete="off"
              placeholder="Enter city"
              name="itemname"
            />

            <div className="form-interval">
              <div>{stateDropdown()}</div>
            </div>

            <input type="number"
              min="0"
              max="99999"
              step="1"
              className="form-control input-field"
              id="exampleFormControlInput1"
              onChange={onZipcodeChange}
              autoComplete="off"
              placeholder="Enter zip code"
              name="zipcode"
            />
          </label>
        </div>

        <div className="form-interval">
          <label htmlFor="exampleFormControlInput1" className="form-label em-w">
            Price
            <input type="text"
              className="form-control input-field"
              id="exampleFormControlInput1"
              onChange={onPriceChange}
              autoComplete="off"
              value={price}
              placeholder="Enter price"
              name="price"
            />
          </label>
        </div>

        <div className="form-interval">
          <label htmlFor="exampleFormControlInput1" className="form-label em-w">
            Images
          </label>
          <div className="upload-boxes">
            <label className="image-upload">
              <img className="picture" src={image1Preview} />
              <Input accept="image/*" id="contained-button-file" multiple type="file" onInput={onImage1Upload} />
              <FileUploadOutlinedIcon className="upload-icon" />
            </label>
            <label className="image-upload">
              <img className="picture" src={image2Preview} />
              <Input accept="image/*" id="contained-button-file" multiple type="file" onInput={onImage2Upload} />
              <FileUploadOutlinedIcon className="upload-icon" />
            </label>
            <label className="image-upload">
              <img className="picture" src={image3Preview} />
              <Input accept="image/*" id="contained-button-file" multiple type="file" onInput={onImage3Upload} />
              <FileUploadOutlinedIcon className="upload-icon" />
            </label>
            <label className="image-upload">
              <img className="picture" src={image4Preview} />
              <Input accept="image/*" id="contained-button-file" multiple type="file" onInput={onImage4Upload} />
              <FileUploadOutlinedIcon className="upload-icon" />
            </label>
          </div>
          <div className="display-uploads" />
        </div>

        <button type="button" className="sign-but" onClick={create}>Create</button>
        <button type="button" className="cancel" onClick={navigateToPosts}>Cancel</button>

      </Form>
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.auth.current,
});

export default withRouter(connect(mapStateToProps, { createPost })(LendItem));
