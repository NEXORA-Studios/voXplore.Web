<script setup lang="ts">
    import { computed, nextTick, ref } from "vue";
    import LearnControl from "@/components/LearnControl.vue";
    import { B1Vocabs } from "@/modules/mock-db";

    const lc = ref<typeof LearnControl>();
    const learned_count = ref(0);
    const current_question_subid = ref(0);
    const current_question_id = ref(0);
    const showLc = ref<boolean>(true);

    const word_data = {
        word: ref(B1Vocabs),
        level: "B1",
    };
    const word_data_length = computed(() => word_data.word.value.length);

    const handleNext = () => {
        showLc.value = false;
        learned_count.value++;
        lc.value?.load(word_data.word.value[++current_question_id.value]);
        lc.value?.reset();
        current_question_subid.value = 0;
        setTimeout(() => {
            showLc.value = true;
        }, Math.random() * 10000 + 2233);
    };
    const handleIgnoreAndNext = () => {
        showLc.value = false;
        word_data.word.value = word_data.word.value.filter(
            (word) => word !== word_data.word.value[current_question_id.value]
        );
        lc.value?.load(word_data.word.value[current_question_id.value]);
        lc.value?.reset();
        setTimeout(() => {
            showLc.value = true;
        }, Math.random() * 10000 + 2233);
    };
</script>

<template>
    <div class="hero-content text-base-content w-4/5 max-w-4/5! flex flex-col">
        <h1 class="text-4xl">{{ $t("learning.main.title") }}</h1>
        <p class="-mt-4 opacity-50">{{ $t("learning.main.desp") }}</p>
        <br />
        <div class="w-full xl:h-128 grid grid-rows-1 grid-cols-1 lg:grid-rows-5 lg:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/25 xl:row-span-5 xl:col-span-3">
                <div class="card-body relative">
                    <section class="flex gap-2 items-center -mt-1 mb-4">
                        <i class="icon-[material-symbols--book-2-outline-rounded] size-7 text-secondary" />
                        <span class="text-xl">{{ $t("learning.maincard.title") }}</span>
                    </section>
                    <!-- @vue-ignore -->
                    <LearnControl
                        :init_data="word_data.word.value[current_question_id]"
                        :level="word_data.level"
                        @update-step="(e) => (current_question_subid = e - 1)"
                        @next="handleNext"
                        @ignore-and-next="handleIgnoreAndNext"
                        v-if="showLc"
                        ref="lc" />
                    <Transition name="fadeq" mode="out-in">
                        <div v-if="!showLc" class="w-full h-full absolute">
                            <div class="h-full flex flex-col items-center justify-center gap-12">
                                <span class="loading loading-ring scale-200"></span>
                                <span class="text-lg opacity-80">{{ $t("learning.maincard.aideciding") }}</span>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25 xl:row-span-3">
                <div class="card-body">
                    <section class="flex gap-2 items-center -mt-1 mb-4">
                        <i class="icon-[material-symbols--analytics-outline-rounded] size-6 text-primary" />
                        <span class="text-xl">{{ $t("learning.stats.title") }}</span>
                    </section>
                    <section class="flex">
                        <span class="opacity-65">{{ $t("learning.stats.wordlearned") }}</span>
                        <span class="text-lg -mt-1 ml-auto">{{ learned_count }}/{{ word_data_length }}</span>
                    </section>
                    <progress
                        class="progress progress-gradient from-primary to-secondary"
                        :value="learned_count == 0 ? word_data_length / 100 : learned_count"
                        :max="word_data_length" />
                    <div class="divider my-auto"></div>
                    <section class="flex">
                        <span class="opacity-65">{{ $t("learning.stats.level") }}</span>
                        <span class="text-lg text-primary -mt-1 ml-auto">{{ word_data.level }}</span>
                    </section>
                    <section class="flex">
                        <span class="opacity-65">{{ $t("learning.stats.questionid") }}</span>
                        <span class="text-lg text-error -mt-1 ml-auto">
                            {{ learned_count + 1 }}{{ ["a", "b", "c"][current_question_subid] }}
                        </span>
                    </section>
                    <section class="flex">
                        <span class="opacity-65">{{ $t("learning.stats.reviewafter") }}</span>
                        <span class="text-lg text-warning -mt-1 ml-auto">
                            {{
                                $t("learning.stats.reviewafter.data", {
                                    w:
                                        word_data_length < 10
                                            ? word_data_length - learned_count
                                            : word_data_length / (word_data_length / 10) - learned_count,
                                })
                            }}
                        </span>
                    </section>
                    <section class="flex">
                        <span class="opacity-65">{{ $t("learning.stats.masteryrate") }}</span>
                        <span class="text-lg text-success -mt-1 ml-auto">
                            {{ Math.round(((learned_count + current_question_subid) / (word_data_length * 3)) * 100) }}%
                        </span>
                    </section>
                </div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25 xl:row-span-2">
                <div class="card-body">
                    <section class="flex gap-2 items-center -mt-1 mb-auto">
                        <i class="icon-[material-symbols--action-key-outline-rounded] size-6 text-warning" />
                        <span class="text-xl">{{ $t("learning.quickactions.title") }}</span>
                    </section>
                    <section class="flex flex-col gap-2 my-auto">
                        <button class="btn bg-gradient-to-r from-primary to-secondary text-white">
                            <i class="icon-[material-symbols--reset-shutter-speed-outline-rounded] size-5" />
                            <span class="translate-y-0.25">{{ $t("learning.quickactions.button,1") }}</span>
                        </button>
                        <button class="btn">
                            <i class="icon-[material-symbols--bookmark-outline-rounded] size-5" />
                            <span class="translate-y-0.25">{{ $t("learning.quickactions.button,2") }}</span>
                        </button>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .fade-enter-active,
    .fadeq-enter-active {
        transition: all 0.25s;
    }

    .fade-leave-active,
    .fadeq-leave-active {
        transition: all 0.1s;
    }

    .fade-enter-from,
    .fade-leave-to,
    .fadeq-enter-from,
    .fadeq-leave-to {
        transform: translateY(var(--spacing));
        opacity: 0;
    }
</style>
