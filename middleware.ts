import NextAuth from "next-auth";
import authConfig from "./auth.config";



const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth;

})    


export const config = {
    // copid form clerk
    
    matcher: [ "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}