import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut()
        history.push("/");
    };

    const getMyNuweets = async() => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            // .orderBy("createAt")
            .get();
        console.log(nweets.map(doc => doc.data()));
    }
    useEffect(() => {
        getMyNuweets();
    }, []) 

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};