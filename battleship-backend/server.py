from aiohttp import web
import socketio

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

rooms = {}

@sio.event
def connect(sid, environ):
    print("connect ", sid)

@sio.event
async def join_room(sid, group):
    if group not in rooms:
        rooms[group] = {}
        rooms[group]["users"] = []
    room_len = len(rooms[group]["users"])
    if room_len < 2:
        rooms[group]["users"].append(sid)
        sio.enter_room(sid, group)
    elif room_len == 2:
        rooms[group]["users"].append(sid)
        sio.enter_room(sid, group)
        await sio.emit('room_message', {"data": {"action":"room_ready", "body":"All Players Ready"}}, room=group)
    elif room_len == 3:
        await sio.emit('room_message', {"data": {"action":"room_error", "body":"Room alredy full"}}, room=sid)
    print(rooms)
    return {"data": "ok"}
@sio.event
async def exit_room(sid, group):
    rooms[group]["users"].remove(sid)
    await sio.leave_room(sid, group)

@sio.event
async def room_message(sid, data, group):
    await sio.emit('room_message', data, room=group, skip_sid=sid)

@sio.event
async def attack(sid, group, positionX, positionY, playerAttacked):
    await sio.emit('room_message', group, room=group, skip_sid=sid)

@sio.event
async def chat_message(sid, data):
    print("message ", data)
    await sio.emit("my_message", "hello", room=sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    web.run_app(app)