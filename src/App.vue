<script setup lang="ts">
    import { watch } from "vue";
    import { RouterView } from "vue-router";
    import { useI18n } from "vue-i18n";
    import { ThemeController, Navigator, HintController, Watermark, DemoNoMobile } from "@/components";

    // 一些监听器
    const { locale } = useI18n();
    watch(locale, (newLocale) => {
        localStorage.setItem("config.language", newLocale);
    });
</script>

<template>
    <DemoNoMobile />
    <ThemeController />
    <Navigator />
    <div class="hero min-h-screen overflow-hidden lg:overflow-auto">
        <!-- <InfiniteGrid :size="128" :speed="2" /> -->
        <div
            class="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-base-200 to-[color-mix(in_oklab,var(--color-secondary)_10%,_var(--color-base-200))]"></div>
        <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </div>
    <HintController />
    <Watermark />
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
