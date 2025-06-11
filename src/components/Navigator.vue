<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import { ref, computed } from "vue";
    import IconZh from "~icons/circle-flags/zh";
    import IconEnUs from "~icons/circle-flags/en-us";

    const { locale } = useI18n();
    const languages = ref([
        { code: "zh_CN", name: "中文", icon: IconZh },
        { code: "en_US", name: "English", icon: IconEnUs },
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
    <header class="fixed w-full h-12 md:h-3/50 px-2 md:px-4 bg-base-100 z-100 flex justify-end-safe items-center">
        <img src="/eXplore.svg" class="h-6 md:h-1/2" />
        <div class="ml-auto"></div>
        <button class="btn btn-square" popovertarget="popover-1" style="anchor-name: --anchor-dropdown-lang">
            <i class="icon-[material-symbols--language] size-6"></i>
        </button>
        <ul
            class="dropdown dropdown-end menu rounded-sm bg-base-200 border border-base-content/50 shadow-sm"
            popover
            id="popover-1"
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
