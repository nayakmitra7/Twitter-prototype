/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { imageActions, userActions } from '../../js/actions/index';
import { AiOutlinePicture } from 'react-icons/ai';
import './EditProfileModal.css';
import { connect } from 'react-redux';

class EditProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        bio: '',
        location: '',
        website: '',
        // dob: '',
        profilePic: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    const { name, bio, location, website, dob, profilePic } = this.props.profile;
    this.setState({
      name,
      bio,
      location,
      website,
      // dob,
      profilePic,
    });
  }

  handleOnChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
  };

  updateProfile = () => {
    const payload = {
      _id: this.props.userId,
      name: this.state.name,
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
      // dob: this.state.dob,
      profilePic: this.state.profilePic,
    }
    this.props.updateProfile(payload);
    this.props.showProfileModal();
  }

  uploadImage = e => {
    const data = new FormData();
    if (this.uploadProfileImage.files && this.uploadProfileImage.files.length) {
      data.append('file', this.uploadProfileImage.files[0] || '');
      this.props.upload(data).then(() => {
        this.setState({
          profilePic: this.props.imageUrl
        })
      });
    }
  };

  componentWillReceiveProps(newProps) {
    const { profile } = newProps;
    this.setState({
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      // dob: profile.dob,
      profilePic: profile.profilePic,
    });
  }

  render() {
    const imgSrc = this.props.user.profilePic ? this.props.user.profilePic : '/images/default_profile_bigger.png';
    return (
      <div>
        <Modal
          dialogClassName="profileModal"
          show={this.props.showProfileModalState}
          onHide={this.props.showProfileModal}
          centered
        >
          <Modal.Header closeButton>
            <button className="saveBtn" type="button" onClick={this.updateProfile}>
                Save
              </button>
            <Modal.Title className="modalTitle">Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body className="editForm">
            <img src={this.state.profilePic ? this.state.profilePic : imgSrc} className="uploadProfileImage" alt="Profile"/>
            <div className="flexUploadImage">
              <div className="flexIconCharsCount">
                <div className="iconUpload">
                  <input
                    className="inputStyle"
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={this.uploadImage}
                    ref={ref => {
                      this.uploadProfileImage = ref;
                    }}
                  />
                  <label htmlFor="icon-button-file">
                    <AiOutlinePicture color="#1da1f2" size={25} />
                  </label>
                </div>
              </div>
            </div>
            <form>
              <div className="flexLabelInput">
              <label className="inputTitle">Name</label> 
              <input className="inputDetails" type="text" name="name" onChange={this.handleOnChange} value={this.state.name}/>  
              </div>
              <div className="flexLabelInput">
                <label className="inputTitle">Bio</label> 
                <input className="inputDetails" type="text" name="bio" onChange={this.handleOnChange} value={this.state.bio}/>  
                </div>
                <div className="flexLabelInput">
                <label className="inputTitle">Location</label> 
                <input className="inputDetails" type="text" name="location" onChange={this.handleOnChange} value={this.state.location}/>  
                </div>
                <div className="flexLabelInput">
                <label className="inputTitle">Website</label>
                <input className="inputDetails" type="text" name="website" onChange={this.handleOnChange} value={this.state.website}/> 
                </div>
                {/* <div className="flexLabelInput">
                <label className="inputTitle">Birth Date</label> 
                <input className="inputDetails" type="text" name="dob" onChange={this.handleOnChange} value={this.state.dob}/>  
                </div> */}
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  userId: state.user.currentUser._id,
  imageUrl: state.image.imageUrl,
  user: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(imageActions.upload(data)),
  updateProfile: data => dispatch(userActions.updateProfile(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileModal);
