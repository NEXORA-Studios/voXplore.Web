<script setup lang="ts">
    import type { WordStrucute } from "@/modules/mock-db/types";
    import { CATG_MAPPER } from "@/modules/Consts";
    import { computed, ref, watch } from "vue";
    import { useI18n } from "vue-i18n";
    import { EventBus } from "@/modules/Eventbus";

    const props = defineProps<{ init_data: WordStrucute; level: string }>();
    defineExpose({
        load(payload: WordStrucute) {
            PROP_WORD.value = payload;
        },
        reset() {
            current_step.value = 1;
        },
    });
    const emit = defineEmits(["updateStep", "next", "ignore-and-next"]);

    const PROP_WORD = ref<WordStrucute>(props.init_data);
    const PROP_LEVEL = ref<string>(props.level);

    const _word = PROP_WORD.value!.word;
    const step2_input = ref<HTMLInputElement>();

    const first_letter = computed(() => _word[0]);
    const last_letter = computed(() => _word[_word.length - 1]);
    const word_letter_list = ref([first_letter]);
    for (let i = 1; i < _word.length - 1; i++) {
        word_letter_list.value.push(computed(() => "_"));
    }
    word_letter_list.value.push(last_letter);

    const current_step = ref<number>(1);

    let watcher: any = null;
    watch(current_step, (newValue, _) => {
        if (newValue == 2) {
            watcher = document.addEventListener("keydown", () => {
                if (step2_input.value) step2_input.value.focus();
            });
        } else {
            if (watcher) {
                document.removeEventListener("keydown", watcher);
                watcher = null;
            }
        }
        emit("updateStep", current_step.value);
    });

    const onInput = (el: Event) => {
        const letters = (el.target as HTMLInputElement).value.replace(/[^a-zA-Z]/g, "");
        (el.target as HTMLInputElement).value = letters;
        const letter_list = letters.split("");
        if (letter_list.length > _word.length - 2) {
            letter_list.splice(_word.length - 2, letter_list.length - _word.length + 2);
            (el.target as HTMLInputElement).value = letter_list.join("");
        }
        for (let i = 1; i < _word.length - 1; i++) {
            word_letter_list.value[i] = computed(() => (letter_list[i - 1] ?? "_").toLocaleLowerCase());
        }
    };

    const { t, locale } = useI18n();
    const word_mean = computed(() =>
        locale.value === "zh_CN" ? PROP_WORD.value!["translation"] : PROP_WORD.value!["definition"]
    );

    const handleStep2Check = () => {
        const _all = computed(
            () => first_letter.value + step2_input.value!.value.toLocaleLowerCase() + last_letter.value
        );
        if (_all.value == _word) {
            EventBus.emit("hint:create", {
                type: "success",
                content: "learning.control.hint.correct",
                translate: true,
            });
        } else {
            EventBus.emit("hint:create", {
                type: "error",
                content: t("learning.control.hint.incorrect") + _word,
            });
        }
        current_step.value = 3;
    };

    const handleNext = () => {
        emit("next");
    };
    const handleIgnoreAndNext = () => {
        emit("ignore-and-next");
    };
</script>

<template>
    <!-- Step 1 Card -->
    <section
        v-if="current_step == 1"
        class="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md my-auto py-8 lg:py-0">
        <h1 class="text-center text-4xl">{{ PROP_WORD!["word"] }}</h1>
        <h3 class="text-center text-xl opacity-75">/{{ PROP_WORD!["ipa"] }}/</h3>
        <br />
        <section class="flex gap-2">
            <div class="badge bg-gradient-to-br from-primary to-secondary border-0 rounded-full text-white">
                <span class="translate-y-0.25">{{ PROP_LEVEL }}</span>
            </div>
            <section v-for="pos in PROP_WORD!.pos.filter((i) => i[4].length > 0)">
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
    <!-- Step 1 Action -->
    <section v-if="current_step == 1">
        <div class="w-full flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 mt-4">
            <button class="btn btn-soft btn-error" @click="current_step = 2">
                <kbd class="kbd kbd-sm">Q</kbd>
                <span class="translate-y-0.25">{{ t("learning.control.button.hard") }}</span>
            </button>
            <button class="btn btn-soft btn-warning" @click="current_step = 2">
                <kbd class="kbd kbd-sm">W</kbd>
                <span class="translate-y-0.25">{{ t("learning.control.button.medium") }}</span>
            </button>
            <button class="btn btn-soft btn-success" @click="current_step = 2">
                <kbd class="kbd kbd-sm">E</kbd>
                <span class="translate-y-0.25">{{ t("learning.control.button.easy") }}</span>
            </button>
        </div>
        <p class="text-center opacity-50 mt-2">{{ t("learning.control.ignore,1") }}</p>
        <p class="text-center opacity-50 -mb-2">
            <button class="underline cursor-pointer" @click="handleIgnoreAndNext">
                {{ $t("learning.control.button.clickhere") }}
            </button>
            {{ $t("learning.control.ignore,2") }}
            <kbd class="kbd kbd-xs">X</kbd>
        </p>
    </section>
    <!-- Step 2 Card -->
    <section
        v-if="current_step == 2"
        class="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md my-auto py-8 lg:py-0">
        <h1 class="text-center text-2xl opacity-75">{{ $t("learning.control.step2.title") }}</h1>
        <span class="opacity-25">
            {{ $t("learning.control.step2.desp,1") }}
            <button class="underline cursor-pointer">{{ $t("learning.control.button.clickhere") }}</button>
            {{ $t("learning.control.step2.desp,2") }}
        </span>
        <br />
        <br />
        <div class="flex gap-2">
            <span v-for="letter in word_letter_list" class="text-4xl">
                {{ letter.value }}
            </span>
        </div>
        <br />
        <div class="truncate text-ellipsis overflow-hidden whitespace-nowrap w-1/2 text-center">
            {{ word_mean.split("\n")[0] }}{{ word_mean.split("\n").length > 1 ? "..." : "" }}
        </div>
        <input class="opacity-0 fixed top-0 left-0" ref="step2_input" @input="onInput" />
    </section>
    <!-- Step 2 Action -->
    <section class="flex justify-end mt-4" v-if="current_step == 2">
        <button class="btn btn-outline" @click="handleStep2Check">
            <span class="translate-y-0.25">{{ $t("learning.control.button.check") }}</span>
            <i class="icon-[material-symbols--chevron-right-rounded] size-4 -translate-y-0.25"></i>
        </button>
    </section>
    <section
        v-if="current_step == 3"
        class="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md my-auto py-8 lg:py-0">
        <h1 class="text-center text-2xl opacity-75">{{ $t("learning.control.step3.title") }}</h1>
        <span class="opacity-25">{{ $t("learning.control.step3.desp") }}</span>
        <br />
        <br />
        <span class="text-4xl">{{ _word }}</span>
        <br />
        <div class="join w-2/3">
            <input class="join-item input w-full" />
            <button class="join-item btn btn-success" @click="handleNext">
                <span class="translate-y-0.25">{{ $t("learning.control.step3.button") }}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path
                        d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                    <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
            </button>
        </div>
    </section>
</template>
