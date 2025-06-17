<template>
    <div class="hero-content text-base-content text-left">
        <div class="max-w-md xl:fixed xl:left-1/5">
            <h1 class="mb-3 md:mb-5 text-2xl md:text-3xl font-bold">{{ $t("homeview.title") }}</h1>
            <p class="mb-3 md:mb-5 text-5xl md:text-7xl font-bold">{{ $t("homeview.desp.1") }}</p>
            <p class="mb-3 md:mb-5 text-lg md:text-xl font-bold">{{ $t("homeview.desp.3") }}</p>
            <button class="btn bg-gradient-to-br from-primary to-secondary text-base-100 text-sm md:text-base" @click="$router.push(`/account`)">
                {{ $t("homeview.button.enter") }}
            </button>
        </div>
    </div>
</template>
