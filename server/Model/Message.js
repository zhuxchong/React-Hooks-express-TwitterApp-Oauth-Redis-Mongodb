const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const MessageSchema = new Scheme({
  user: {
    type: String
  },

  topic: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("4mationDiscussboard", MessageSchema);
module.exports = Message;
