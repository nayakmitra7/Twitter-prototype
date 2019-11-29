import React, { Component } from 'react';
import './PostTweet.css';
import { connect } from 'react-redux';
import { AiOutlinePicture } from 'react-icons/ai';
import { imageActions, tweetActions } from '../../js/actions/index';

class PostTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: '',
      pictures: [],
    };

    this.tweetTextHandler = this.tweetTextHandler.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.postTweet = this.postTweet.bind(this);
  }

  tweetTextHandler = e => {
    this.setState({
      tweetText: e.target.value,
    });
  };

  uploadImage = e => {
    const data = new FormData();
    if (this.upladTweetImage.files && this.upladTweetImage.files.length) {
      data.append('file', this.upladTweetImage.files[0] || '');
      this.props.upload(data);
    }
  };

  postTweet = () => {

    if (this.state.tweetText.length > 280) {
      console.log('max length exceeded');
    } else {
      const data = {
        userId: this.props.userId,
        tweetText: this.state.tweetText,
        imageUrl: this.props.imageUrl,
      };
      console.log(data);
      this.props.postTweet(data).then(() => {
        this.props.fetchFeed(data);
      });
    }
  };

  render() {
    var count = 280 - this.state.tweetText.length;

    return (
      <div className="cardContainer">
        <div className="cardWidth">
          <div className="paperHeight">Home</div>
          {/* <Paper className="paperHeight">Home</Paper> */}
          <div className="cardContent">
            <div className="flexImageTweet">
              <div>
                {/* Include user profile image if available */}
                <img
                  src="/images/default_profile_bigger.png"
                  className="profileImageTweet"
                  alt="User profile"
                />
              </div>

              <div className="autoExpandDiv">
                <textarea
                  className="textArea"
                  onChange={this.tweetTextHandler}
                  placeholder="What's happening?"
                  maxLength="280"
                ></textarea>
              </div>
            </div>
            {this.props.imageUrl ? (
              <img src={this.props.imageUrl} className="tweetImagePost" alt="Tweet" />
            ) : null}
            <div className="flexUploadTweet">
              <div className="flexIconCharsCount">
                <div className="iconUpload">
                  <input
                    className="inputStyle"
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={this.uploadImage}
                    ref={ref => {
                      this.upladTweetImage = ref;
                    }}
                  />
                  <label htmlFor="icon-button-file">
                    <AiOutlinePicture color="#1da1f2" size={20} />
                  </label>
                </div>
                <div className="countMessageStyle">{`${count} characters remaining`}</div>
              </div>
              <button className="postTweetBtn" onClick={this.postTweet}>
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="postTweetSeparator"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imageUrl: state.image.imageUrl,
  tweetPostedFlag: state.tweet.tweetPostedFlag,
  userId: state.user.currentUser._id,
});

const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(imageActions.upload(data)),
  postTweet: data => dispatch(tweetActions.postTweet(data)),
  fetchFeed: data => dispatch(tweetActions.fetchFeed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostTweet);
