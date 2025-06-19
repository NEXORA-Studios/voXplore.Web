import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/views/Home.vue"),
        },
        {
            path: "/panel",
            name: "Panel",
            redirect: "/panel/dashboard",
            children: [
                {
                    path: "dashboard",
                    name: "Dashboard Panel",
                    component: () => import("@/views/panel/Dashboard.vue"),
                },
                {
                    path: "learning",
                    name: "Learning Panel",
                    component: () => import("@/views/panel/Learning.vue"),
                },
            ],
        },
        {
            path: "/account",
            name: "Account",
            redirect: "/account/login",
            children: [
                {
                    path: "login",
                    name: "Login Account",
                    component: () => import("@/views/account/Login.vue"),
                },
                {
                    path: "register",
                    name: "Register Account",
                    component: () => import("@/views/account/Register.vue"),
                },
                {
                    path: "forgot",
                    name: "Forgot Password",
                    component: () => import("@/views/account/Forgot.vue"),
                },
            ],
        },
        {
            path: "/pricing",
            name: "Pricing",
            component: () => import("@/views/Pricing.vue"),
        },
        {
            path: "/debug",
            name: "Debugging Components",
            children: [
                {
                    path: "learn-control",
                    name: "Learn Control",
                    component: () => import("@/components/LearnControl.vue"),
                },
            ],
        },
    ],
});

export default router;
