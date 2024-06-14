const users = [];

// 유저하나를 추가시키는것

export const addUser = (user) => {
    users.push(user)
}

export const removeUser = (socketId) => {

    const index = users.findIndex((user) => user.socketId === socketId);

    if(index !== -1){
        return users.splice(index,1)[0];
    }
    
}


// 유저 조회 get 과 set은 항상 같이
export const getUser = () => {
    return users;

}

