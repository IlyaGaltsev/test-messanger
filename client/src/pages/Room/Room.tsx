import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { io, Manager } from "socket.io-client";
import "./Room.css";

// const manager = new Manager("http://localhost:5000");
const socket = io("http://localhost:5000");

const Room = () => {
  const { search } = useLocation();
  console.log(search);
  const [params, setParams] = useState<any>(null);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));

    setParams(searchParams);
    socket.emit("join", searchParams);

    socket.on("message", ({ data }) => {
      console.log(data);
    });
  }, [search]);

  return <div>Room</div>;
};

export default Room;
