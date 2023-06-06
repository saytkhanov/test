import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { GITHUB_API } from "./assets/constants";
import './App.css'
import {useTypedDispatch, useTypedSelector} from "./store";
import {fetchToken, fetchUserData, selectToken, selectUsername} from "./store/slices/user/reducer";
import {fetchRepositories, selectRepositories} from "./store/slices/repositories/reducer";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const token = useTypedSelector(selectToken);
  const username = useTypedSelector(selectUsername);
  const repos = useTypedSelector(selectRepositories);

  const dispatch = useTypedDispatch();

  const code = React.useMemo(() => {
    return searchParams.get("code")
  }, []);

  const handleLogin = async () => {
    window.location.assign(GITHUB_API.LOGIN);
  }

  const clearCodeQuery = () => {
    searchParams.delete("code");
    setSearchParams(searchParams);
  }

  React.useEffect(() => {
    if (code) {
      dispatch(fetchToken({ code }));
    }
  }, [code]);

  React.useEffect(() => {
    if (token) {
      clearCodeQuery();
      dispatch(fetchUserData());
    }
  }, [token]);

  React.useEffect(() => {
    if (username) {
      dispatch(fetchRepositories())
    }
  }, [username]);

  return (
    <div>
      {token ?
        <div>
          Login: {username} {" "}
          Repos count: {repos.length}
        </div> :
        <Button onClick={handleLogin}>Login with Github</Button>}
    </div>
  )
}

export default App
