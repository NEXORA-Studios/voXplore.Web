<script setup lang="ts">
    import { h } from "vue";
    import { useI18n } from "vue-i18n";
    import { IconMedal, IconSlope, IconStreak, IconTarget } from "@/components";
    import { useUserStore } from "@/modules/stores/user";

    const userStore = useUserStore();
    const { t } = useI18n();

    const stats = [
        {
            title: "dashboard.stats.1.title",
            title_class: "text-white/75",
            value: "16",
            value_class: "text-white",
            desc: { text: "dashboard.stats.1.desc" },
            desc_class: "text-white/75",
            icon: h(IconStreak, { class: "text-warning size-12" }),
            gradient_bg: true,
        },
        {
            title: "dashboard.stats.2.title",
            value: "2,450",
            desc: { text: "dashboard.stats.2.desc" },
            icon: h(IconMedal, { class: "text-error size-12" }),
        },
        {
            title: "dashboard.stats.3.title",
            value_t: "dashboard.stats.3.value,1",
            desc: { text: "dashboard.stats.3.desc", data: { d: 34 } },
            icon: h(IconSlope, { class: "text-success size-12" }),
        },
        {
            title: "dashboard.stats.4.title",
            value: "68%",
            desc_pro: h("progress", { class: "progress progress-info w-3/5", value: "68", max: "100" }),
            icon: h(IconTarget, { class: "text-info size-12" }),
        },
    ];
</script>

<template>
    <div class="hero-content text-base-content w-4/5 max-w-4/5! flex flex-col mt-12">
        <!-- Stat Grid -->
        <div class="w-full grid grid-rows-1 grid-cols-1 lg:grid-cols-4 gap-4">
            <div
                v-for="stat in stats"
                :key="stat.title"
                class="card card-hover shadow-xl"
                :class="{
                    'bg-gradient-to-br from-primary to-secondary': stat.gradient_bg,
                    'bg-base-100 border border-base-content/25': !stat.gradient_bg,
                }">
                <div class="stats">
                    <div class="stat">
                        <div class="stat-figure">
                            <component :is="stat.icon" />
                        </div>
                        <div class="stat-title" :class="stat.title_class">{{ $t(stat.title) }}</div>
                        <div class="stat-value" :class="stat.value_class">
                            <span v-if="stat.value_t">{{ $t(stat.value_t!) }}</span>
                            <span v-else>{{ stat.value }}</span>
                        </div>
                        <div class="stat-desc" :class="stat.desc_class">
                            <component :is="stat.desc_pro" v-if="stat.desc_pro" />
                            <span v-else-if="stat.desc">
                                {{ $t(stat.desc.text!, stat.desc.data ?? {}) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main Grid -->
        <div class="w-full h-144 grid grid-rows-2 grid-cols-4 gap-4">
            <div class="card card-hover bg-base-100 border border-base-content/25 col-span-3 row-span-2">
                <div class="card-body"></div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25">
                <div class="card-body"></div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25">
                <div class="card-body"></div>
            </div>
        </div>
    </div>
</template>
