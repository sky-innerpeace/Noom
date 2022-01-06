const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload}
    return JSON.stringify(msg);
}
// socket이 open되었다면
socket.addEventListener("open", () => {
    console.log("Connected to Server ✔");
});

socket.addEventListener("message", (message)=> {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server ❌");
});

// 10초 뒤 작동
// send message (frontend to backend)
// setTimeout(() => {
//     socket.send("hello from browser!");
// }, 10000);

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    //object형식 그대로 전달하는 게 아니라 
    socket.send(makeMessage("new_message", input.value)); 
    input.value = '';
});

nickForm.addEventListener("submit", (event=> {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
})