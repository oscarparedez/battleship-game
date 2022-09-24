let global_socket = null

export const createConnection = (socket, setter) => {
    global_socket = socket
    socket.on("connect", () => {
        socket.on("room_message", (data) => {
            console.log("oka", data)
            setter(data)
        });
      
        socket.on("close", (reason) => {
          // called when the underlying connection is closed
        });
      });
}

export const joinRoom = (room_id) => {
    global_socket.emit("join_room", room_id, (data) => {
        console.log("data", data)
    })
}