import React from "react";
import TableView from "../components/tableView";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SnackBar from "../components/snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  textContainer: {
    margin: "10px 10%",
    display: "flex",
    height: 70,
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "60%"
  },
  button: {
    height: "50%",
    margin: "auto 10px"
  },

  selectEmpty: {
    marginTop: 30,
    marginBottom: 8,
    minWidth: "15%"
  }
}));
const urlDict = {
  TweetGetByUser: "tweet/tweet_by_user",
  TweetLikeAndSearch: "tweet/tweet_by_keyword",
  FavoriteList: "tweet/tweet_favorite_list"
};
const headers = {
  authorization: localStorage.getItem("jwt")
};
const TweetSearchTamplate = props => {
  const classes = useStyles();
  const inputEl = React.useRef(null);
  const [res, setRes] = React.useState([]);
  const [snackBar, setSnackBar] = React.useState({ res: false, open: false });
  const closeSnackBar = () => {
    setSnackBar({ res: snackBar.res, open: false });
  };
  const serach = (type, getMethod) => {
    setRes(undefined);

    const url = urlDict[type];
    if (getMethod) {
      axios
        .get(url, { headers })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          if (e.message === "Request failed with status code 401") {
            props.history.push({
              pathname: "/"
            });
          }
          console.log(e);
        });
    } else {
      axios
        .post(url, { serachInput: inputEl.current.value }, { headers })
        .then(res => setRes(res.data))
        .catch(e => {
          if (e.message === "Request failed with status code 401") {
            props.history.push({
              pathname: "/"
            });
          }
          console.error(e);
          //setRes([]);
        });
    }
  };
  const favoriteOpration = (bool, id, index) => {
    setRes(undefined);
    const url = `tweet/tweet_favorite`;

    axios
      .post(url, { id: id, nowStatus: bool }, { headers })
      .then(result => {
        if (!bool) {
          let temp = [...res];
          setSnackBar({ res: true, open: true });
          setRes(temp);
        } else {
          let temp = [...res];
          temp.splice(index, 1);
          setSnackBar({ res: true, open: true });
          setRes(temp);
        }
      })
      .catch(e => {
        setSnackBar({ res: false, open: true });
        setRes([...res]);
      });
  };
  React.useEffect(() => {
    setRes([]);
    props.preSending && urlDict[props.type] && didMountSend();
  }, [props.type]);
  const didMountSend = () => {
    setRes(undefined);
    axios
      .get(urlDict[props.type], { headers })
      .then(res => setRes(res.data))
      .catch(e => {
        setRes([]);
      });
  };
  //getKeys=(res)=>{Object.keys(res)}
  return (
    <React.Fragment>
      <div className={classes.textContainer}>
        {props.search && (
          <>
            <TextField
              id="standard-with-placeholder"
              label="Input"
              className={classes.textField}
              margin="normal"
              inputRef={inputEl}
            />
            <Button
              onClick={() => {
                serach(props.type, props.get);
              }}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Search
            </Button>
          </>
        )}
      </div>
      <div style={{ padding: "10px 30px" }}>
        {res ? (
          <TableView
            tableTitle={props.tableTitle}
            tableKey={res.length > 0 ? Object.keys(res[0]) : []}
            favoriteIcon={props.favoriteIcon}
            rows={res}
            favoriteOpration={favoriteOpration}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
      <SnackBar
        success={snackBar.res}
        open={snackBar.open}
        closeSnackBar={closeSnackBar}
      />
    </React.Fragment>
  );
};
export default withRouter(TweetSearchTamplate);
