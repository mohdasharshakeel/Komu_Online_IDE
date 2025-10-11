import NextAuth from "next-auth";
import authConfig from "./auth.config";



const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth;
    return isLoggedIn ? nextUrl : '/login'
})