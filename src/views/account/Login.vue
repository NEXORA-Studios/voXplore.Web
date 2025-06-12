<script setup lang="ts">
    import { ref } from "vue";
    import { useI18n } from "vue-i18n";
    import InfiniteGrid from "@/components/InfiniteGrid.vue";
    import { ApiRequester } from "@/modules/requester";
    import { EventBus } from "@/modules/eventbus";

    const input_username = ref<HTMLInputElement>();
    const input_password = ref<HTMLInputElement>();
    const username_regexp = /^[a-zA-Z0-9_]{3,16}$/;
    const password_regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,}$/;
    const { t } = useI18n();

    async function handleLogin() {
        if (!input_username.value || !input_password.value) {
            console.warn("input_username or input_password is undefined");
            return;
        }
        const username = input_username.value.value;
        const password = input_password.value.value;
        if (!username || !password) {
            EventBus.emit("hint:create", {
                type: "error",
                content: t("login.error.empty"),
            });
            return;
        }
        if (username_regexp.test(username) === false || password_regexp.test(password) === false) {
            EventBus.emit("hint:create", {
                type: "error",
                content: t("login.error.regexp.invaild"),
            });
            return;
        }
        ApiRequester.post("/auth/login", { username, password })
            .then((_response) => {
                EventBus.emit("hint:create", {
                    type: "success",
                    content: t("login.success"),
                });
            })
            .catch((ex) => {
                switch (ex.response?.status) {
                    case 404:
                        EventBus.emit("hint:create", {
                            type: "info",
                            content: t("login.error.invaild.tip"),
                        });
                    // ! NO BREAK HERE !
                    // Fall-through for main error hint.
                    case 401:
                        EventBus.emit("hint:create", {
                            type: "error",
                            content: t("login.error.invaild"),
                        });
                        break;
                    default:
                        console.error(ex);
                        EventBus.emit("hint:create", {
                            type: "error",
                            content: ex.message,
                        });
                }
            });
    }
</script>

<template>
    <main>
        <div class="hero min-h-screen">
            <InfiniteGrid :size="128" :speed="2" />
            <div class="hero-overlay"></div>
            <div class="hero-content text-base-content text-left">
                <div class="card w-96 bg-base-100 card-md shadow-sm">
                    <div class="card-body">
                        <h2 class="text-2xl text-center">{{ $t("account.legend.login") }}</h2>
                        <fieldset class="fieldset mt-2">
                            <label class="label">{{ $t("account.username") }}</label>
                            <input
                                ref="input_username"
                                type="text"
                                class="input input-md w-full"
                                :placeholder="$t(`account.username`)" />
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
                                <span>{{ $t("account.goto.register") }}</span>
                                <span class="link" @click="$router.push(`/account/register`)">
                                    {{ $t("account.button.goto.register") }}
                                </span>
                            </p>
                        </fieldset>
                        <!-- TODO: 需要在后端有接口之后启用找回密码页面 -->
                        <!-- <fieldset class="fieldset -mt-3">
                            <p class="label">
                                <span>{{ $t("account.goto.forgot") }}</span>
                                <span class="link" @click="$router.push(`/account/forgot`)">
                                    {{ $t("account.button.goto.forgot") }}
                                </span>
                            </p>
                        </fieldset> -->
                        <button class="btn mt-4" @click="handleLogin">{{ $t("account.button.login") }}</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
