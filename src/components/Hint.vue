<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import type { HintConfig } from "@/types/Hint";

    const props = defineProps<HintConfig>();
    const hint = ref<HTMLElement>();

    onMounted(() => {
        if (props.infinite) return;
        setTimeout(() => {
            hint.value?.classList.add("opacity-0");
            setTimeout(() => {
                const parent = hint.value?.parentElement;
                if (parent) {
                    parent.removeChild(hint.value!);
                }
            }, 150);
        }, (props.time ?? 3) * 1000);
    });
</script>

<template>
    <div
        ref="hint"
        class="alert transition-opacity duration-150 ease-in-out w-fit"
        :class="[
            {
                'alert-info': $props.type === `info`,
                'alert-success': $props.type === `success`,
                'alert-warning': $props.type === `warning`,
                'alert-error': $props.type === `error`,
            },
        ]">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current"
            v-if="$props.type === `info`">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            v-if="$props.type === `success`">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            v-if="$props.type === `warning`">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            v-if="$props.type === `error`">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-normal">
            {{ $props.translate ? $t($props.content) : $props.content }}
        </span>
    </div>
</template>
