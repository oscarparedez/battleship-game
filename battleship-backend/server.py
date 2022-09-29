from aiohttp import web
import socketio
import time
import os

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

async def index(request):
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

rooms = {}

@sio.event
def connect(sid, environ):
    print("connect ", sid)

@sio.event
async def join_room(sid, group, grid, username):
    if group not in rooms:
        rooms[group] = {}
        rooms[group]["users"] = {}
        rooms[group]["turn"] = 0
        rooms[group]["count"] = 1
        rooms[group]["change"] = False
    room_len = len(rooms[group]["users"])
    if room_len < 2:
        rooms[group]["users"][sid] = {"id":sid, "grid": grid, "lose": False, "hits":0, "username": username}
        sio.enter_room(sid, group)
    elif room_len == 2:
        rooms[group]["users"][sid] = {"id":sid, "grid": grid, "lose": False, "hits":0, "username": username}
        sio.enter_room(sid, group)
        await sio.emit('room_message', {"data": {"action":"room_ready", "body": {"users":[{"id": user["id"], "username": user["username"]} for user in rooms[group]["users"].values()]}}}, room=group)
        time.sleep(2)
        await sio.emit('room_message', {"data": {"action":"turn", "body": {"id": list(rooms[group]["users"].values())[0]["id"]}}}, room=group)
    elif room_len == 3:
        await sio.emit('room_message', {"data": {"action":"room_error", "body":"Room already full"}}, room=sid)
    return {"data": "ok"}
@sio.event
async def exit_room(sid, group):
    rooms[group]["users"].remove(sid)
    sio.leave_room(sid, group)

@sio.event
async def room_message(sid, data, group):
    await sio.emit('room_message', data, room=group, skip_sid=sid)

@sio.event
async def attack(sid, group, positionX, positionY, playerAttacked):
    response = None
    positionX, positionY = positionY, positionX
    if rooms[group]["users"][playerAttacked]["grid"][positionX][positionY] == 1:
        rooms[group]["users"][playerAttacked]["grid"][positionX][positionY] = 2
        response = {"data": {"action":"attack", "body": {"userid": playerAttacked, "position_x": positionX, "position_y": positionY, "hit": True}}}
        rooms[group]["users"][playerAttacked]["hits"] = rooms[group]["users"][playerAttacked]["hits"] + 1
    else:
        rooms[group]["users"][playerAttacked]["grid"][positionX][positionY] = 3
        response = {"data": {"action":"attack", "body": {"userid": playerAttacked, "position_x": positionX, "position_y": positionY, "hit": False}}}
    time.sleep(1)
    await sio.emit('room_message', response, room=group)
    if rooms[group]["users"][playerAttacked]["hits"] == 1:
        rooms[group]["users"][playerAttacked]["lose"] = True
        rooms[group]["change"] = True
        response = {"data": {"action":"lose", "body": {"id": playerAttacked}}}
        time.sleep(1)
        await sio.emit('room_message', response, room=group)
    nextUsers = [user["id"] for user in rooms[group]["users"].values() if user["lose"] == False]

    print("AQUI1", rooms[group]["count"], rooms[group]["change"])

    if (len(nextUsers) == 1):
        response = {"data": {"action":"win", "body": {"id": sid}}}
        time.sleep(2)
        await sio.emit('room_message', response, room=group)
        for user in rooms[group]["users"].values():
            sio.leave_room(user["id"], group)
        del rooms[group]
        return 1

    if rooms[group]["count"] == 2 and rooms[group]["change"]:
        nextUsers.remove(sid)
        if len(nextUsers) == 0:
            response = {"data": {"action":"win", "body": {"id": sid}}}
            time.sleep(2)
            await sio.emit('room_message', response, room=group)
        else:
            nextUser = nextUsers[0]
            print("AQUI", nextUser)
            response = {"data": {"action":"turn", "body": {"id": nextUser}}}
            time.sleep(2)
            await sio.emit('room_message', response, room=group)
    else: 
        if rooms[group]["count"] == 1 and rooms[group]["change"]:
            rooms[group]["count"] = rooms[group]["count"] + 1
            return 1
        else :
            rooms[group]["count"] = rooms[group]["count"] + 1
            if rooms[group]["count"] % len(nextUsers) == 0:
                rooms[group]["count"] = 1
                rooms[group]["turn"] = rooms[group]["turn"] + 1
                if rooms[group]["turn"] % len(nextUsers) == 0:
                    rooms[group]["turn"] = 0
                response = {"data": {"action":"turn", "body": {"id": nextUsers[rooms[group]["turn"]]}}}
                time.sleep(2)
                await sio.emit('room_message', response, room=group)

            

@sio.event
async def chat_message(sid, data):
    print("message ", data)
    await sio.emit("my_message", "hello", room=sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app, host='0.0.0.0', port=os.environ.get('PORT', '5000'))
