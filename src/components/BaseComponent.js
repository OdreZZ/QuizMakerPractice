import React from "react";
import { useSelector } from "react-redux";
import { selectError, selectIsLoading } from "../redux/reducers/quizReducer";

const BaseComponent = (Component) => {
    const HOCBaseComponent = (props) => {
        const isLoading = useSelector(selectIsLoading);
        const error = useSelector(selectError);

        return (
            <Component {...props}
                isLoading={isLoading}
                error={error}
            />
        );
    }

    return HOCBaseComponent;
}

export default BaseComponent;
