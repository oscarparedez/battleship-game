let global_socket = null

export const createConnection = (socket, setter) => {
    global_socket = socket
    socket.on("connect", () => {
        socket.on("room_message", (data) => {
            // console.log("oka", data)
            setter(data)
        });
      
        socket.on("close", (reason) => {
          // called when the underlying connection is closed
        });
      });
}

export const joinRoom = (room_id, grid) => {
    global_socket.emit("join_room", room_id, grid, (data) => {
        console.log("data", data)
    })
}

export const userId = () => {
    return(global_socket)
}

export const attack = (room_id, position_x, position_y, playerAttacked) => {
    global_socket.emit("attack", room_id, position_x, position_y, playerAttacked, (data) => {
        console.log("data", data)
    })
}