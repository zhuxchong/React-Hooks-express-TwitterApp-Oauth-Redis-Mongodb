import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import SnackBar from "../containers/snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const TweetPost = () => {
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState(false);
  const closeSnackBar = () => {
    setSnackBar(false);
  };
  const handleEditorChange = e => {
    setContent(e.target.value);
  };
  const postTweet = () => {
    setSending(true);
    const headers = {
      authorization: localStorage.getItem("jwt")
    };
    console.log(headers);
    axios
      .post("tweet/tweet_post_new", { content: content }, { headers })
      .then(res => {
        setSending(false);
        setResult(true);
        setSnackBar(true);
      })
      .catch(e => {
        console.log(e);
        setSending(false);
        setResult(false);
        setSnackBar(true);
      });
  };

  return (
    <React.Fragment>
      {/*<Editor
        apiKey=""
        initialValue="This is the initial content of the editor"
        init={{
          plugins: "link image code",
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright | code"
        }}
        onChange={handleEditorChange}
      />*/}
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
        success={result}
        open={snackBar}
        closeSnackBar={closeSnackBar}
      />
    </React.Fragment>
  );
};
export default TweetPost;
