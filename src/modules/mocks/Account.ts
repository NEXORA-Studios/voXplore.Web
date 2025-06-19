import type { MockRoute } from "./types";
import { Jwt } from "@/modules/Jwt";

const USER_PAYLOAD = {
    user_id: 1,
    role: 1,
};

const LOGIN_DATA = {
    msg: "Successful",
    username: "Jim-Lin",
    ...USER_PAYLOAD,
    token: Jwt.encodeJwt(USER_PAYLOAD),
};
const REGISTER_DATA = { msg: "Successful", user_id: USER_PAYLOAD.user_id };

const AccountApiMocks: MockRoute[] = [
    {
        url: "/api/auth/login",
        method: "post",
        response: () => LOGIN_DATA,
    },
    {
        url: "/api/auth/register",
        method: "post",
        response: () => REGISTER_DATA,
    },
];

export default AccountApiMocks;
