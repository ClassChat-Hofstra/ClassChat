import io from "socket.io-client";

const socket = io();

const SocketReducer = (state = socket, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default SocketReducer;