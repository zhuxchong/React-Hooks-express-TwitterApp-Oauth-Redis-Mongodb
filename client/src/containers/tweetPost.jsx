import React from "react";

import axios from "axios";
import Button from "@material-ui/core/Button";
import SnackBar from "../components/snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router";
const TweetPost = props => {
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const [snackBar, setSnackBar] = React.useState({ res: false, open: false });

  const closeSnackBar = () => {
    setSnackBar({ res: snackBar.res, open: false });
  };
  const handleEditorChange = e => {
    setContent(e.target.value);
  };
  const postTweet = () => {
    setSending(true);
    const headers = {
      authorization: localStorage.getItem("jwt")
    };

    axios
      .post("tweet/tweet_post_new", { content: content }, { headers })
      .then(res => {
        setSending(false);

        setSnackBar({ res: true, open: true });
      })
      .catch(e => {
        if (e.message === "Request failed with status code 401") {
          props.history.push({
            pathname: "/"
          });
        }
        console.log(e);
        setSending(false);

        setSnackBar({ res: false, open: true });
      });
  };

  return (
    <React.Fragment>
      {sending ? (
        <CircularProgress style={{ height: 80, margin: "3%" }} />
      ) : (
        <textarea
          onChange={handleEditorChange}
          style={{ height: 80, margin: "3%" }}
        />
      )}

      <Button onClick={postTweet} variant="contained" color="primary">
        Post
      </Button>
      <SnackBar
        success={snackBar.res}
        open={snackBar.open}
        closeSnackBar={closeSnackBar}
      />
    </React.Fragment>
  );
};
export default withRouter(TweetPost);
