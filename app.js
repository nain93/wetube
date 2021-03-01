//const express = require('express')
import express from "express"; //babel (최신의 js버젼 방식으로 변경해줌)and 서버 자동 재시작기능
import morgan from "morgan"; //morgan = logging에 도움을 주는 middleware
import helmet from "helmet"; //helmet = 기초보안담당
import bodyParser from "body-parser"; //form데이터를 서버로 받아와서 활용가능함.
import passport from "passport"; // 로그인 인증
import mongoose from "mongoose";
import session from "express-session"; //
import cookieParser from "cookie-parser"; //쿠키를 다룰 수 있음
import { localsMiddleware } from "./middlewareds";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

import "./passport";

const app = express();

const MongoStore = require("connect-mongo").default;

app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //주어진 directory에서 file을 전달하는 새로운 middleware fuction
app.use("/static", express.static("static"));
app.use(bodyParser.json()); //bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(morgan("dev")); //middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
