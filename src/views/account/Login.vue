<script setup lang="ts">
    import { ref } from "vue";
    import InfiniteGrid from "@/components/InfiniteGrid.vue";
    import { ApiRequester } from "@/modules/requester";

    const input_email = ref<HTMLInputElement>();
    const input_password = ref<HTMLInputElement>();
    const email_regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,}$/;

    async function handleLogin() {
        if (!input_email.value || !input_password.value) {
            console.warn("input_email or input_password is undefined");
            return;
        }
        const email = input_email.value.value;
        const password = input_password.value.value;
        if (!email || !password) {
            /* TODO 展示错误信息 */
            console.warn("email or password is empty");
            return;
        }
        if (email_regexp.test(email) === false || password_regexp.test(password) === false) {
            /* TODO 展示错误信息 */
            console.warn("email or password is invalid", email_regexp.test(email) === false, password_regexp.test(password) === false);
            return;
        }
        ApiRequester.post("/auth/login", { email, password }).then((response) => {
            console.log(response);
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
                                <span>{{ $t("account.goto.register") }}</span>
                                <span class="link" @click="$router.push(`/account/register`)">
                                    {{ $t("account.button.goto.register") }}
                                </span>
                            </p>
                        </fieldset>
                        <fieldset class="fieldset -mt-3">
                            <p class="label">
                                <span>{{ $t("account.goto.forgot") }}</span>
                                <span class="link" @click="$router.push(`/account/forgot`)">
                                    {{ $t("account.button.goto.forgot") }}
                                </span>
                            </p>
                        </fieldset>
                        <button class="btn mt-4" @click="handleLogin">{{ $t("account.button.login") }}</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
