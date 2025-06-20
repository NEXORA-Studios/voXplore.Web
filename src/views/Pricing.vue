<script setup lang="ts">
    import { IconTick } from "@/components";

    const features = {
        standrad: ["pricing.features.standrad,1"],
        premium: ["pricing.features.premium,1", "pricing.features.premium,2"],
    };
</script>

<template>
    <div class="hero-content text-base-content">
        <div class="xl:flex gap-4">
            <div class="card w-96 bg-base-100 shadow-sm">
                <div class="card-body">
                    <span class="badge badge-xs badge-success badge-dash">
                        <span class="translate-y-0.5">{{ $t("pricing.tag.current") }}</span>
                    </span>
                    <div class="flex justify-between">
                        <h2 class="text-3xl font-bold">{{ $t("pricing.title.standrad") }}</h2>
                        <span class="text-xl">{{ $t("pricing.price.standrad") }}</span>
                    </div>
                    <ul class="mt-6 flex flex-col gap-2 text-xs mb-auto">
                        <li v-for="feature in features.standrad">
                            <IconTick class="inline-block text-success" />
                            <span>{{ $t(feature) }}</span>
                        </li>
                    </ul>
                    <div class="mt-6">
                        <button class="btn btn-block" disabled>{{ $t("pricing.button.current") }}</button>
                    </div>
                </div>
            </div>
            <div class="card w-96 bg-base-100 shadow-sm">
                <div class="card-body">
                    <span class="badge badge-xs badge-warning">
                        <span class="translate-y-0.5">{{ $t("pricing.tag.mostpopular") }}</span>
                    </span>
                    <div class="flex justify-between">
                        <h2 class="text-3xl font-bold">{{ $t("pricing.title.premium") }}</h2>
                        <span class="text-xl">{{ $t("pricing.price.premium") }}</span>
                    </div>
                    <ul class="mt-6 flex flex-col gap-2 text-xs">
                        <li v-for="feature in features.premium">
                            <IconTick class="inline-block text-success" />
                            <span>{{ $t(feature) }}</span>
                        </li>
                    </ul>
                    <div class="mt-6">
                        <button class="btn bg-gradient-to-br from-primary to-secondary text-base-100 btn-block">
                            {{ $t("pricing.button.subscribe") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
