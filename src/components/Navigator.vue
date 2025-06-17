<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import { ref, computed } from "vue";
    import IconZh from "~icons/circle-flags/zh";
    import IconEnUs from "~icons/circle-flags/en-us";
    import { EventBus } from "@/modules/Eventbus";

    const { locale, t } = useI18n();

    const themes = ref([
        {
            code: "volight",
            name: "navigator.theme.light",
        },
        {
            code: "vodark",
            name: "navigator.theme.dark",
        },
        {
            code: "__auto__",
            name: "navigator.theme.system",
        },
    ]);
    const theme = ref(localStorage.getItem("config.theme") ?? "__auto__");
    const changeTheme = (newTheme: string) => {
        localStorage.setItem("config.theme", newTheme);
        theme.value = newTheme;
        EventBus.emit("theme:change", newTheme);
    };

    const languages = ref([
        { code: "zh_CN", name: "简体中文（中国大陆）", icon: IconZh },
        { code: "en_US", name: "English (Incomplete)", icon: IconEnUs },
    ]);
    const sortedLanguages = computed(() => {
        return [...languages.value].sort((a, b) => {
            return a.code === locale.value ? -1 : b.code === locale.value ? 1 : 0;
        });
    });
    const changeLocale = (newLocale: string) => {
        locale.value = newLocale;
    };
</script>

<template>
    <header
        class="fixed w-full h-12 md:h-3/50 px-2 md:px-32 bg-base-100 z-100 flex justify-end-safe items-center border-b border-b-base-content/25">
        <button
            class="btn btn-square bg-gradient-to-br from-primary to-secondary size-10 rounded-lg"
            @click="$router.push('/')">
            <i class="icon-[material-symbols--school-outline-rounded] text-white size-6"></i>
        </button>
        <div class="flex flex-col ml-2 -mt-0.5">
            <h1 class="font-bold text-lg">voXplore</h1>
            <p class="text-xs -mt-1 opacity-75">{{ $t("app.desp") }}</p>
        </div>
        <div class="ml-auto"></div>
        <button class="btn btn-square mr-2" popovertarget="popover-1" style="anchor-name: --anchor-dropdown-theme">
            <i class="icon-[material-symbols--invert-colors] size-6"></i>
        </button>
        <ul
            class="dropdown dropdown-end menu rounded-sm bg-base-200 border border-base-content/50 shadow-sm"
            popover
            id="popover-1"
            style="position-anchor: --anchor-dropdown-theme">
            <li v-for="themeItem in themes" :key="themeItem.code">
                <button
                    @click="changeTheme(themeItem.code)"
                    class="flex"
                    :class="{ 'btn-disabled': themeItem.code === theme }">
                    {{ $t(themeItem.name) }}
                </button>
            </li>
        </ul>
        <button class="btn btn-square" popovertarget="popover-2" style="anchor-name: --anchor-dropdown-lang">
            <i class="icon-[material-symbols--language] size-6"></i>
        </button>
        <ul
            class="dropdown dropdown-end menu rounded-sm bg-base-200 border border-base-content/50 shadow-sm"
            popover
            id="popover-2"
            style="position-anchor: --anchor-dropdown-lang">
            <li v-for="lang in sortedLanguages" :key="lang.code">
                <button @click="changeLocale(lang.code)" class="flex" :class="{ 'btn-disabled': lang.code === locale }">
                    <component :is="lang.icon" />
                    {{ lang.name }}
                </button>
            </li>
        </ul>
    </header>
</template>

<style lang="css" scoped>
    .btn-disabled {
        background-color: color-mix(in oklab, var(--color-base-content) 10%, transparent);
        box-shadow: none;
        pointer-events: none;
        border-color: #0000;
        --noise: none;
        color: color-mix(in oklch, var(--color-base-content) 20%, #0000);
        @media (hover: hover) {
            &:hover {
                pointer-events: none;
                background-color: color-mix(in oklab, var(--color-neutral) 20%, transparent);
                border-color: #0000;
                color: color-mix(in oklch, var(--color-base-content) 20%, #0000);
            }
        }
    }
</style>
