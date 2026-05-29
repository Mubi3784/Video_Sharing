import dotenv from "dotenv";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import User from "../model/userSchema";
import { Request, RequestHandler } from "express"; // this is for interface AuthenticationRequest
import { Types } from "mongoose"; // this is for interface AuthenticationRequest
dotenv.config();

export interface AuthenticatedRequest extends Request {
    user: {
        _id: Types.ObjectId;
    }
}

// making request handler  coming from expres
// This is for AuthenticatedRequest
export type AuthenticatedRequestHandler = RequestHandler<
    any, any, any, any, AuthenticatedRequest
>;
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_Secret_Key as string,
}
if (!process.env.JWT_Secret_Key) {
    throw new Error("secret key is not defined ");
}
passport.use(new Strategy(opts, async (payload: any, done) => {
    try {
        const user = await User.findById(payload.id).select("-password");
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false)
    }
}))

export default passport;