//const express = require('express')
import express from "express"; //babel (최신의 js버젼 방식으로 변경해줌)and 서버 자동 재시작기능
import morgan from "morgan"; //morgan = logging에 도움을 주는 middleware
import helmet from "helmet"; //helmet = 기초보안담당
import cookieParser from "cookie-parser"; //쿠키를 다룰 수 있음
import bodyParser from "body-parser"; //form데이터를 서버로 받아와서 활용가능함.
import { localsMiddleware } from "./middlewareds";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();
/*function handleHome(req, res){
    res.send("Hello from home");
}*/
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //주어진 directory에서 file을 전달하는 새로운 middleware fuction
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json()); //bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev")); //middleware

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
