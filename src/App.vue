<script setup lang="ts">
    import { watch } from "vue";
    import { RouterView } from "vue-router";
    import { useI18n } from "vue-i18n";
    import Navigator from "@/components/Navigator.vue";

    // 一些监听器
    const { locale } = useI18n();
    watch(locale, (newLocale) => {
        localStorage.setItem("config.language", newLocale);
    });
</script>

<template>
    <Navigator />
    <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
            <component :is="Component" />
        </Transition>
    </RouterView>
    <div role="alert" class="alert alert-warning alert-dash fixed z-100 bottom-4 right-4 bg-base-300!">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{{ $t("app.devhint") }}</span>
    </div>
</template>

<style lang="css" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
