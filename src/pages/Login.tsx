import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {fetchToken, selectUsername} from "../store/slices/user/reducer";
import {GITHUB_API} from "../assets/constants";
import {useTypedDispatch, useTypedSelector} from "../store/index";
import {Button} from "@mui/material";

const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const username = useTypedSelector(selectUsername);

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
            dispatch(fetchToken({code}));
        }
    }, [code]);

    React.useEffect(() => {
        if (username) {
            clearCodeQuery();
            navigate("/repositories");
        }
    }, [username]);

    return (
        <Button onClick={handleLogin}>Login with Github</Button>
    );
};

export default Login;
