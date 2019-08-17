import axios from "axios";

export const Logout = props =>
{
    axios.get("/logout").then(() =>
    {
        props.handleAppAuth();
        props.history.push(`/login`);
    });
    return null;
};