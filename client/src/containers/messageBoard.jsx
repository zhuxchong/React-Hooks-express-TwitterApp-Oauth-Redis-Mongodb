import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TableView from "../components/tableView";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router";
import SnackBar from "../components/snackbar";

import Context from "../store/context";
const headers = {
  authorization: localStorage.getItem("jwt")
};
const useStyles = makeStyles(theme => ({
  textContainer: {
    display: "flex"
  },
  textSubject: {
    width: "55%",
    marginLeft: "10%"
  }
}));
const TweetPost = props => {
  const classes = useStyles();
  const context = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState({ rows: [], count: 0 });
  const [snackBar, setSnackBar] = React.useState({ res: false, open: false });
  const [refresh, setRefresh] = React.useState(false);
  const [mainBody, serMainbody] = React.useState("");

  const subjectRef = React.useRef(null);
  const closeSnackBar = () => {
    setSnackBar({ res: snackBar.res, open: false });
  };
  const submit = () => {
    axios
      .post(
        "message/add_new_message",
        {
          user: localStorage.getItem("screen_name"),
          subject: subjectRef.current.value,
          content: mainBody
        },
        {
          headers: {
            authorization: localStorage.getItem("jwt")
          }
        }
      )
      .then(res => {
        setSnackBar({ res: true, open: true });
        setRefresh(!refresh);
      })
      .catch(e => {
        console.log(e);
        setSnackBar({ res: false, open: true });
        if (e.message === "Request failed with status code 401") {
          props.history.push({
            pathname: "/"
          });
        }
      });
  };
  const handleEditorChange = e => {
    serMainbody(e.target.getContent());
  };
  React.useEffect(() => {
    axios
      .post(
        "message/get_message",
        { limit: 5, skip: 0 },
        {
          headers: {
            authorization: localStorage.getItem("jwt")
          }
        }
      )
      .then(res => {
        console.log(res);
        setRows({ rows: res.data.result, count: res.data.count });
        setLoading(false);
      })
      .catch(e => {
        if (e.message === "Request failed with status code 401") {
          props.history.push({
            pathname: "/"
          });
        }
      });
  }, [refresh]);
  const changePage = n => {
    setLoading(true);
    axios
      .post(
        "message/get_message",
        { limit: 5, skip: n * 5 },
        {
          headers: {
            authorization: localStorage.getItem("jwt")
          }
        }
      )
      .then(res => {
        setRows({ rows: res.data.result, count: res.data.count });
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        if (e.message === "Request failed with status code 401") {
          props.history.push({
            pathname: "/"
          });
        }
      });
  };
  return (
    <React.Fragment>
      <div className={classes.textContainer}>
        <TextField
          disabled
          id="filled-uncontrolled"
          label="Name"
          value={localStorage.getItem("screen_name")}
          style={{ width: "35%" }}
          margin="normal"
          variant="filled"
        />
        <TextField
          id="filled-uncontrolled"
          label="Subject"
          defaultValue="Hi there"
          className={classes.textSubject}
          margin="normal"
          variant="filled"
          inputRef={subjectRef}
        />
      </div>
      <Editor
        apiKey="yf68j2xgn9bld4wmbxc81xm9ip1soe08jv4ta26o9qdr52qe"
        initialValue=""
        init={{
          plugins: "link code",
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright | code"
        }}
        onChange={handleEditorChange}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={submit}
        style={{ width: "15%" }}
      >
        Submit
      </Button>
      {
        <>
          <TableView
            message
            count={parseInt(rows.count.count)}
            rows={loading ? [] : rows.rows}
            changePage={changePage}
            tableTitle={["User", "Subject", "Message", "Date"]}
            tableKey={["user", "topic", "content", "date"]}
          />
        </>
      }
      <SnackBar
        success={snackBar.res}
        open={snackBar.open}
        closeSnackBar={closeSnackBar}
      />
    </React.Fragment>
  );
};
export default withRouter(TweetPost);
