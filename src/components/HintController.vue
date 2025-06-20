<script setup lang="ts">
    import { ref } from "vue";
    import { EventBus } from "@/modules/Eventbus";
    import type { HintConfig } from "@/types/Hint";
    import Hint from "@/components/Hint.vue";

    const hint_list = ref<HintConfig[]>([]);

    EventBus.on("hint:create", (payload: HintConfig) => {
        hint_list.value?.push(payload);
    });
</script>

<template>
    <section class="fixed z-101 right-4 bottom-4 flex flex-col-reverse items-end gap-4">
        <Hint
            v-for="el in hint_list"
            :key="el.content"
            :content="el.content"
            :translate="el.translate"
            :type="el.type"
            :infinite="el.infinite"
            :time="el.time" />
    </section>
</template>
