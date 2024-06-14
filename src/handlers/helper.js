import { createStage } from "../../models/stage.model.js";
import { getUser, removeUser } from "../../models/user.model.js"
import { CLIENT_VERSION } from "../constants.js";
import { getGameAssets } from "../init/assets.js";
import handlerMappings from "./handlerMapping.js";

export const handleDisconnect = (socket , uuid) => {
    removeUser(socket.id)
    console.log(`user disconnected: ${socket.id}`);
    console.log('current users: ',getUser());
}


export const handleConnection = (socket,uuid) =>{

console.log(`New user connected!: ${uuid} with socket ID ${socket.id}`);
console.log('Current users', getUser());

createStage(uuid);

// stages 배열에서 0번째 = 첫번째 스테이지

socket.emit('connection', {uuid});
};

export const handlerEvent = (io,socket,data) => {
    
    if(!CLIENT_VERSION.includes(data.clientVersion)) {

        socket.emit('response', {status:'fail', message:"Client version mismatch "})
        return;
    }

    const handler = handlerMappings[data.handlerId];
    if(!handler){
        socket.emit('response', {status:'fail', message: "Handler not found"});
        return;
    }

    const response = handler(data.userId, data.payload);

    if(response.broadcast){
        io.emit('response','broadcast');
        return;
    }

    socket.emit('response', response);

}



//스테이지에 따라서 더 높은 점수 획득 
// 1스테이지에서는 ,0점 -> 1점씩
// 2스테이지에서는, 1000점 -> 2점씩
