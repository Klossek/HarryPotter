import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const Lobby = () => {
  const [user] = useUser();
  const navigate = useNavigate();


  return <div>Lobby
    <div> {user.name}</div>
    <button onClick={() => {
      socket.emit("getusers", {
        data: "testdata"
      });
    }}>
      User event
    </button>
  </div>;
};

export default Lobby;
