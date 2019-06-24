import React from "react";
import TableView from "../components/tableView";
import axios from "axios";

const FavoriteList = props => {
  const [refresh, setRefresh] = React.useState(false);
  const headers = {
    authorization: localStorage.getItem("jwt")
  };
  React.useEffect(() => {
    axios
      .get("tweet/tweet_favorite_list", { headers })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, [refresh]);
  return <div>favorite</div>;
};
export default FavoriteList;
