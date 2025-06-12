<script setup lang="ts">
    import { ref } from "vue";
    import { useI18n } from "vue-i18n";
    import { EventBus } from "@/modules/eventbus";
    import type { HintConfig } from "@/types/Hint";
    import Hint from "@/components/Hint.vue";

    const { t } = useI18n();
    const hint_list = ref<HintConfig[]>([
        {
            type: "warning",
            content: t("app.devhint"),
            infinite: true,
        },
    ]);

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
            :type="el.type"
            :infinite="el.infinite"
            :time="el.time" />
    </section>
</template>
