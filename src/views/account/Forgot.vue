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
                        <h2 class="text-2xl text-center">{{ $t("account.legend.forgot") }}</h2>
                        <fieldset class="fieldset mt-2">
                            <label class="label">{{ $t("account.email") }}</label>
                            <input type="email" class="input input-md w-full" :placeholder="$t(`account.email`)" />
                        </fieldset>
                        <button class="btn mt-4">{{ $t("account.button.forgot") }}</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
