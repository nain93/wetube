import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      redirect_url: `http://localhost:4000/${routes.gitHubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      redirect_url: `http://localhost:4000/${routes.facebookCallback}`,
    },
    facebookLoginCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
