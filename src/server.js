import express from "express";
import WebSocket from "ws";
import http from "http";
import { redirect } from 'express/lib/response';

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname+"/views");
app.use("/public", express.static(__dirname+"/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listeneing on http://localhost:3000`);

// 3000번 포트에서 http, ws protocol이 한번에 구동되도록 하기
// 실제로는 둘 다 필요한 건 아니고 각자 구동도 가능

// 서버에서 http서버 구동시키기
const server = http.createServer(app); //내가 만든 http서버를 server에 저장

// 서버에서 ws 서버 구동시키기
const wss = new WebSocket.Server({server}); // server를 ws 서버에 담기


// websocket event listener 등록
// connection -> 새로운 연결
// socket을 이용해 메시지 전달을 하므로 어딘가에 저장해야 함
wss.on("connection", (socket) => {
    // connection이 생기면 socket을 받음
    // socket은 연결된 브라우저

    console.log("Connected to Browser ✔");
    
    // socket에 있는 메소드 사용
    socket.on("close", () => console.log("Disconnected from the Browser❌"));
    // 브라우저가 서버로 메시지를 보냈을 때 출력
    socket.on("message", (message) => {
        const translatedMessageData = message.toString('utf8');
    console.log(translatedMessageData);
    });
    // 브라우저로 메시지 전송
    socket.send("hello!");
});
server.listen(3000, handleListen);