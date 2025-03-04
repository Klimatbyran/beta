import { useAuth } from "@/contexts/AuthContext";
import { Middleware } from "openapi-fetch";

const authMiddleware: Middleware = {
    async onRequest(req, options) {
        const {isAuthenticated, token} = useAuth();
        if(isAuthenticated()) {
            req.headers.append("authorization", "Bearer " + token);
        }
        return req;
    },
    async onResponse(res, options, req) {
        const {updateToken} = useAuth();
        if(res.headers.has("x-auth-token")) {
            updateToken(res.headers.get("x-auth-token"));
        }
        return res;
    },
}