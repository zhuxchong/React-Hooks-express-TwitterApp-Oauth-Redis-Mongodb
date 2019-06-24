import React from "react";
import TableView from "../containers/tableView";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

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
          console.log(e);
        });
    } else {
      axios
        .post(url, { serachInput: inputEl.current.value }, { headers })
        .then(res => setRes(res.data))
        .catch(e => {
          setRes([]);
        });
    }
  };
  const favoriteOpration = (bool, id) => {
    setRes(undefined);
    const url = `tweet/tweet_favorite`;
    axios
      .post(url, { id: id, nowStatus: bool }, { headers })
      .then(res => setRes(res.data))
      .catch(e => {
        setRes([]);
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

  return (
    <React.Fragment>
      <div className={classes.textContainer}>
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
      </div>
      <div style={{ padding: "10px 30px" }}>
        {res ? (
          <TableView
            favoriteIcon={props.favoriteIcon}
            rows={res}
            favoriteOpration={favoriteOpration}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </React.Fragment>
  );
};
export default TweetSearchTamplate;
