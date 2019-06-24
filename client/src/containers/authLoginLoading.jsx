import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Context from "../store/context";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const Loading = props => {
  const context = React.useContext(Context);
  const classes = useStyles();
  const getToken = async (verifier, oauthToken) => {
    await axios
      .post("auth/login/get_token", {
        verifier: verifier,
        oauthToken: oauthToken
      })
      .then(res => {
        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("screen_name", res.data.screen_name);
        context.changeComponent(res.data.screen_name);
        props.history.push("./home");
      })
      .catch(e => console.log(e));
  };
  React.useEffect(() => {
    let verifier = props.location.search.split("oauth_verifier=")[1];
    let oauthToken = props.location.search
      .split("oauth_token=")[1]
      .split("&")[0];
    getToken(verifier, oauthToken);
  }, []);
  return (
    <div>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
};
export default withRouter(Loading);
