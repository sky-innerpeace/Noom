const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

// socket이 open되었다면
socket.addEventListener("open", () => {
    console.log("Connected to Server ✔");
});

socket.addEventListener("message", (message)=> {
    console.log("New message: ", message.data);
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
    socket.send(input.value);
    input.value = '';
});