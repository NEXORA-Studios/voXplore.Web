import { defineStore } from "pinia";
import { decodeJwt } from "@/modules/jwt";
import { ApiRequester } from "@/modules/requester";
import { EventBus } from "@/modules/eventbus";

export const useUserStore = defineStore("user", {
    state: () => ({
        id: -1,
        username: "",
        token: "",
        role: -1,
    }),
    getters: {
        getUsername: (state) => state.username,
        getJwt: (state) => state.token,
    },
    actions: {
        login(params: { user_id: number; username: string; token: string; role: number }) {
            const jwtContent = decodeJwt(params.token);
            if (jwtContent["user_id"] !== params.user_id) {
                throw new Error("JWT does not match user.id");
            }
            this.id = params.user_id;
            this.token = params.token;
            this.username = params.username;
            this.role = params.role;
        },
        setJwt(token: string) {
            const jwtContent = decodeJwt(token);
            if (jwtContent["user_id"] !== this.id) {
                throw new Error("JWT does not match user.id");
            }
            this.token = token;
        },
        clear() {
            this.id = -1;
            this.username = "";
            this.token = "";
            this.role = -1;
        },
    },
    persist: true,
});
