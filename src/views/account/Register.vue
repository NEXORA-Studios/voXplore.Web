<script setup lang="ts">
    import InfiniteGrid from "@/components/InfiniteGrid.vue";
</script>

<template>
    <main>
        <div class="hero min-h-screen">
            <InfiniteGrid :size="128" :speed="2" />
            <div class="hero-overlay"></div>
            <div class="hero-content text-base-content text-left">
                <div class="card w-96 bg-base-100 card-md shadow-sm">
                    <div class="card-body">
                        <h2 class="text-2xl text-center">{{ $t("account.legend.register") }}</h2>
                        <fieldset class="fieldset mt-2">
                            <label class="label">{{ $t("account.username") }}</label>
                            <input type="text" class="input input-md w-full" :placeholder="$t(`account.username`)" />
                        </fieldset>
                        <fieldset class="fieldset">
                            <label class="label">{{ $t("account.email") }}</label>
                            <input type="email" class="input input-md w-full" :placeholder="$t(`account.email`)" />
                        </fieldset>
                        <fieldset class="fieldset">
                            <label class="label">{{ $t("account.password") }}</label>
                            <input type="password" class="input input-md w-full" :placeholder="$t(`account.password`)" />
                        </fieldset>
                        <fieldset class="fieldset">
                            <p class="label">
                                <span>{{ $t("account.goto.login") }}</span>
                                <span class="link" @click="$router.push(`/account/login`)">
                                    {{ $t("account.button.goto.login") }}
                                </span>
                            </p>
                        </fieldset>
                        <button class="btn mt-4">{{ $t("account.button.register") }}</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
