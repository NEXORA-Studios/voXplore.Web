<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";

    const props = defineProps<{
        size: number;
        speed?: number;
    }>();

    const gridItems = computed(() => {
        const isMobile = window.innerWidth <= 768;
        const size = isMobile ? Math.min(props.size, 64) : props.size;
        const cols = Math.ceil(window.innerWidth / size) * 2;
        const rows = Math.ceil(window.innerHeight / size) * 2;
        return Array(cols * rows).fill(null);
    });
</script>

<template>
    <div class="relative w-full min-h-[360px] h-[calc(100dvh)] overflow-hidden bg-base-300">
        <div
            class="absolute grid size-3/1 md:size-2/1"
            :style="{
                'grid-template-columns': `repeat(auto-fill, ${$props.size}px)`,
                animation: `moveDiagonal ${($props.speed ?? 1) * 100}s linear infinite`,
            }">
            <div
                v-for="(_, index) in gridItems"
                :key="index"
                class="border border-base-content/35 hover:bg-warning"
                :style="{ width: `${$props.size}px`, height: `${$props.size}px` }"></div>
        </div>
    </div>
</template>

<style>
    @keyframes moveDiagonal {
        0% {
            transform: translate(-50%, -50%);
        }
        100% {
            transform: translate(0, 0);
        }
    }
</style>
