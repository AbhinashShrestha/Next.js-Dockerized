export {default} from "next-auth/middleware"

//this program is for protecting all the routes if not authenticated

export const config = {
    matcher : [
        "/trips",
        "/reservations",
        "/favorites",
        "/properties",
    ]
}