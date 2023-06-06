import React from 'react';
import {useTypedDispatch, useTypedSelector} from "../store/index";
import {
    fetchRepositories,
    selectRepositories,
    selectRepositoriesError,
    selectRepositoriesLoader
} from "../store/slices/repositories/reducer";

const Repositories = () => {
    const dispatch = useTypedDispatch();

    const dataList = useTypedSelector(selectRepositories);
    const error = useTypedSelector(selectRepositoriesError);
    const loadingStatus = useTypedSelector(selectRepositoriesLoader);

    const [isLoading, hasError] = React.useMemo(() => [
        loadingStatus === "loading",
        loadingStatus === "failed"
    ], [loadingStatus]);

    React.useEffect(() => {
        dispatch(fetchRepositories());
    }, []);

    if (hasError)
        return <div>{error}</div>

    return (
        <div>
            {isLoading ? "loading..." : null}
            <ul>
                {dataList.map(repo => (
                    <div key={repo.id}>
                        {repo.name}
                        * {repo.stars}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Repositories;
