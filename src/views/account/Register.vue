<script setup lang="ts">
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { ApiRequester } from "@/modules/Requester";
    import { EventBus } from "@/modules/Eventbus";

    const input_username = ref<HTMLInputElement>();
    const input_email = ref<HTMLInputElement>();
    const input_password = ref<HTMLInputElement>();
    const email_regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,}$/;
    const router = useRouter();

    async function handleRegister() {
        if (!input_username.value || !input_email.value || !input_password.value) {
            console.warn("input fields are undefined");
            return;
        }
        const username = input_username.value.value;
        const email = input_email.value.value;
        const password = input_password.value.value;
        if (!username || !email || !password) {
            EventBus.emit("hint:create", {
                type: "error",
                content: "Username, Email or Password cannot be empty.",
            });
            return;
        }
        if (email_regexp.test(email) === false || password_regexp.test(password) === false) {
            EventBus.emit("hint:create", {
                type: "error",
                content: "Email or Password is invalid.",
            });
            return;
        }
        ApiRequester.post("/api/auth/register", { username, email, password })
            .then((_response) => {
                EventBus.emit("hint:create", {
                    type: "success",
                    content: "Register successful! Now you can login with your account.",
                });
                router.push("/account/login");
            })
            .catch((ex) => {
                if (ex.response?.status === 409) {
                    EventBus.emit("hint:create", {
                        type: "error",
                        content: "The account with these credentials is already registed!",
                    });
                }
                console.error(ex);
                EventBus.emit("hint:create", {
                    type: "error",
                    content: ex.message,
                });
            });
    }
</script>

<template>
    <div class="hero-content text-base-content text-left">
        <div class="card w-96 bg-base-100 card-md shadow-sm">
            <div class="card-body">
                <h2 class="text-2xl text-center">{{ $t("account.legend.register") }}</h2>
                <fieldset class="fieldset mt-2">
                    <label class="label">{{ $t("account.username") }}</label>
                    <input
                        ref="input_username"
                        type="text"
                        class="input input-md w-full"
                        :placeholder="$t(`account.username`)" />
                </fieldset>
                <fieldset class="fieldset">
                    <label class="label">{{ $t("account.email") }}</label>
                    <input
                        ref="input_email"
                        type="email"
                        class="input input-md w-full"
                        :placeholder="$t(`account.email`)" />
                </fieldset>
                <fieldset class="fieldset">
                    <label class="label">{{ $t("account.password") }}</label>
                    <input
                        ref="input_password"
                        type="password"
                        class="input input-md w-full"
                        :placeholder="$t(`account.password`)" />
                </fieldset>
                <fieldset class="fieldset">
                    <p class="label">
                        <span>{{ $t("account.goto.login") }}</span>
                        <span class="link" @click="$router.push(`/account/login`)">
                            {{ $t("account.button.goto.login") }}
                        </span>
                    </p>
                </fieldset>
                <button class="btn mt-4" @click="handleRegister">{{ $t("account.button.register") }}</button>
            </div>
        </div>
    </div>
</template>
