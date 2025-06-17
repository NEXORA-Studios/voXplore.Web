import type { MockRoute } from "./types";
import { Jwt } from "@/modules/Jwt";

const USER_PAYLOAD = {
    user_id: 1,
    role: 1,
};
const LOGIN_DATA = {
    msg: "Successful",
    username: "TestUser",
    ...USER_PAYLOAD,
    token: Jwt.encodeJwt(USER_PAYLOAD),
};

const AccountApiMocks: MockRoute[] = [
    {
        url: "/api/auth/login",
        method: "post",
        response: () => LOGIN_DATA,
    },
];

export default AccountApiMocks;
