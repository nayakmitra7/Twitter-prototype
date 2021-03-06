import mongoose from 'mongoose';

const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, 'Tweet is mandatory'],
      minlength: 1,
      maxlength: 280,
    },
    image: {
      type: String,
      default: '',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweets',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweets',
      },
    ],
    hashtags: [
      {
        type: String,
      },
    ],
    views: {
      type: Number,
    },
    retweetUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tweets = mongoose.model('Tweets', tweetSchema);

export default Tweets;
