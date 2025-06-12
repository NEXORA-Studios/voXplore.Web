<script setup lang="ts">
    import { watch } from "vue";
    import { RouterView } from "vue-router";
    import { useI18n } from "vue-i18n";
    import Navigator from "@/components/Navigator.vue";
    import HintControler from "./components/HintControler.vue";

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
    <HintControler />
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
