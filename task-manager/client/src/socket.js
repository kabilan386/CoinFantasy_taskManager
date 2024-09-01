import { io } from 'socket.io-client';

const SOCKET_URL =  process.env.REACT_APP_API_URL ; // Replace with your server URL if different

const socket = io(SOCKET_URL, {
  autoConnect: false, // Start with the socket disconnected, connect it manually if needed
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;