<script setup lang="ts">
    import { computed, h, onMounted, ref } from "vue";
    import { useI18n } from "vue-i18n";
    import { IconMedal, IconSlope, IconStreak, IconTarget } from "@/components";
    import { useUserStore } from "@/modules/stores/user";
    import { ApiRequester } from "@/modules/Requester";
    import { CATG_MAPPER, LEVEL_MAPPER } from "@/modules/Consts";

    const loaded = ref<boolean>(false);

    const userStore = useUserStore();
    const { locale } = useI18n();

    const streak = ref(0);
    const points = ref(0);
    const level = ref(1);
    const usage = ref(0);
    const weekly_goal = ref(0);

    const stats = computed(() => [
        {
            title: "dashboard.stats.1.title",
            title_class: "text-white/75",
            value: streak.value,
            value_class: "text-white",
            desc: { text: "dashboard.stats.1.desc" },
            desc_class: "text-white/75",
            icon: h(IconStreak, { class: "text-warning size-12" }),
            gradient_bg: true,
        },
        {
            title: "dashboard.stats.2.title",
            value: points.value,
            desc: { text: "dashboard.stats.2.desc" },
            icon: h(IconMedal, { class: "text-error size-12" }),
        },
        {
            title: "dashboard.stats.3.title",
            value_t: `dashboard.stats.3.value,${level.value}`,
            desc: { text: "dashboard.stats.3.desc", data: { d: usage.value } },
            icon: h(IconSlope, { class: "text-success size-12" }),
        },
        {
            title: "dashboard.stats.4.title",
            value: "68%",
            desc_pro: h("progress", { class: "progress progress-info w-3/5", value: weekly_goal.value, max: "100" }),
            icon: h(IconTarget, { class: "text-info size-12" }),
        },
    ]);

    const daily_word = ref("");
    const daily_word_english_def = ref<string[]>([]);
    const daily_word_chinese_def = ref<string[]>([]);
    const daily_word_def = computed(() =>
        locale.value === "zh_CN" ? daily_word_chinese_def.value : daily_word_english_def.value
    );
    function map1to9to1to6(n: number): number {
        return Math.ceil((n / 9) * 6);
    }

    const continue_word = ref<{ [key: string]: any }>({});
    const continue_word_def_d = computed<string>(() =>
        locale.value === "zh_CN" ? continue_word.value["translation"] : continue_word.value["definition"]
    );
    const continue_word_def = computed<string[]>(() => {
        if (continue_word_def_d.value) return continue_word_def_d.value.split("\n");
        return locale.value === "zh_CN" ? ["未知"] : ["Unknown"];
    });
    const continue_word_pos = computed<[string, string | null, number, number, Array<number>][]>(() => {
        if (continue_word.value["pos"]) return continue_word.value["pos"];
        return ["", "", "", "", []];
    });

    onMounted(async () => {
        // Load Usage Data
        let res = await ApiRequester.get("/api/analysis/get");
        streak.value = res.data["streak"];
        points.value = res.data["points"];
        level.value = res.data["level"];
        usage.value = res.data["usage"];
        weekly_goal.value = res.data["weekly_goal"];
        // Load Daily Vocabulary Data
        res = await ApiRequester.get("/api/vocabulary/get_by_level", {
            params: {
                level: LEVEL_MAPPER[map1to9to1to6(level.value)],
            },
        });
        daily_word.value = res.data["word"];
        daily_word_english_def.value = (res.data["definition"] as string).split("\n");
        daily_word_chinese_def.value = (res.data["translation"] as string).split("\n");
        // Load Last Vocabulary Data
        res = await ApiRequester.get("/api/vocabulary/get_last");
        continue_word.value = res.data;
        loaded.value = true;
    });
</script>

<template>
    <div class="hero-content text-base-content w-4/5 max-w-4/5! flex flex-col mt-12" v-if="loaded">
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
        <div class="w-full grid grid-rows-1 grid-cols-1 xl:grid-rows-2 xl:grid-cols-4 gap-4">
            <div class="card card-hover bg-base-100 border border-base-content/25 xl:col-span-3 xl:row-span-2">
                <div class="card-body">
                    <section class="flex gap-2 items-center -mt-1 mb-auto">
                        <i class="icon-[material-symbols--bookmarks-outline-rounded] size-8 text-secondary" />
                        <span class="text-xl">{{ $t("dashboard.main.title") }}</span>
                    </section>
                    <section
                        class="w-full flex flex-col gap-2 bg-gradient-to-br from-primary/10 to-secondary/10 text-center rounded-md px-12 py-8 xl:-mt-4">
                        <h1 class="text-5xl text-secondary">{{ continue_word["word"] }}</h1>
                        <br />
                        <section>
                            <p
                                v-for="line in continue_word_def.slice(0, 3)"
                                class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
                                {{ line }}
                            </p>
                            <p v-if="continue_word_def.length > 3">...</p>
                        </section>
                        <br />
                        <section class="flex gap-2 self-center">
                            <div
                                class="badge bg-gradient-to-br from-primary to-secondary border-0 rounded-full text-white">
                                <span class="translate-y-0.25">{{ continue_word["level"] }}</span>
                            </div>
                            <section v-for="pos in continue_word_pos.filter((i) => i[4].length > 0)">
                                <section v-for="p in pos[4]">
                                    <span class="badge rounded-full">
                                        <span class="translate-y-0.25">{{ CATG_MAPPER[p] }}</span>
                                    </span>
                                </section>
                            </section>
                            <span class="badge rounded-full">
                                <span class="translate-y-0.25">{{ $t("dashboard.main.tag.general") }}</span>
                            </span>
                        </section>
                    </section>
                    <button
                        class="btn bg-gradient-to-br from-primary to-secondary text-white mt-auto"
                        @click="$router.push('/panel/learning')">
                        <i class="icon-[material-symbols--play-arrow-outline-rounded] size-6 -ml-2"></i>
                        {{ $t("dashboard.main.button") }}
                    </button>
                </div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25">
                <div class="card-body overflow-y-hidden">
                    <section class="flex gap-2 -mt-1">
                        <i class="icon-[material-symbols--event-outline-rounded] size-6 text-primary" />
                        <h1 class="text-xl">{{ $t("dashboard.daily.title") }}</h1>
                    </section>
                    <section class="w-full flex flex-col gap-1 text-center bg-primary/10 rounded-md px-4 py-3 my-auto">
                        <span class="text-xl">{{ daily_word }}</span>
                        <section class="text-sm">
                            <p
                                v-for="line in daily_word_def.slice(0, 3)"
                                class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
                                {{ line }}
                            </p>
                            <p v-if="daily_word_def.length > 3">...</p>
                        </section>
                    </section>
                    <button
                        class="btn bg-gradient-to-br from-primary to-secondary text-white"
                        @click="$router.push('/panel/learndaily')">
                        <i class="icon-[material-symbols--play-arrow-outline-rounded] size-6 -ml-2"></i>
                        {{ $t("dashboard.daily.button") }}
                    </button>
                </div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25">
                <div class="card-body">
                    <section class="flex gap-2">
                        <i class="icon-[material-symbols--grid-view-outline-rounded] size-6 text-warning" />
                        <h1 class="text-xl">{{ $t("dashboard.moreopt.title") }}</h1>
                    </section>
                    <section class="flex flex-col gap-2 my-auto">
                        <button class="btn" @click="$router.push('/personal/archivements')">
                            {{ $t("dashboard.moreopt.button,1") }}
                        </button>
                        <button class="btn" @click="$router.push('/personal/goals')">
                            {{ $t("dashboard.moreopt.button,2") }}
                        </button>
                        <button class="btn" @click="$router.push('/settings')">
                            {{ $t("dashboard.moreopt.button,3") }}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
