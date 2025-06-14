<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import { IconTick } from "@/components";

    const { t } = useI18n();

    const features = {
        standrad: [t("pricing.features.standrad,1")],
        premium: [t("pricing.features.premium,1"), t("pricing.features.premium,2")],
    };
</script>

<template>
    <div class="hero-content text-base-content">
        <div class="xl:flex gap-4">
            <div class="card w-96 bg-base-100 shadow-sm">
                <div class="card-body">
                    <span class="badge badge-xs badge-success badge-dash">Current Plan</span>
                    <div class="flex justify-between">
                        <h2 class="text-3xl font-bold">{{ $t("pricing.title.standrad") }}</h2>
                        <span class="text-xl">{{ $t("pricing.price.standrad") }}</span>
                    </div>
                    <ul class="mt-6 flex flex-col gap-2 text-xs mb-auto">
                        <li v-for="feature in features.standrad">
                            <IconTick class="inline-block text-success" />
                            <span>{{ feature }}</span>
                        </li>
                    </ul>
                    <div class="mt-6">
                        <button class="btn btn-block" disabled>{{ $t("pricing.button.current") }}</button>
                    </div>
                </div>
            </div>
            <div class="card w-96 bg-base-100 shadow-sm">
                <div class="card-body">
                    <span class="badge badge-xs badge-warning">Most Popular</span>
                    <div class="flex justify-between">
                        <h2 class="text-3xl font-bold">{{ $t("pricing.title.premium") }}</h2>
                        <span class="text-xl">{{ $t("pricing.price.premium") }}</span>
                    </div>
                    <ul class="mt-6 flex flex-col gap-2 text-xs">
                        <li v-for="feature in features.premium">
                            <IconTick class="inline-block text-success" />
                            <span>{{ feature }}</span>
                        </li>
                    </ul>
                    <div class="mt-6">
                        <button class="btn btn-primary btn-block">{{ $t("pricing.button.subscribe") }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
