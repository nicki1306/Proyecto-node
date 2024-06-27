import { Server } from "socket.io";

const initSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', async (socket) => {
        console.log(`Socket ${socket.id} connected`);
    });
}   

export default initSocket