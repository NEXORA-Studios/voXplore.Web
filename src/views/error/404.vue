<template>
    <div class="hero-content flex flex-col">
        <h1 class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl font-bold">
            {{ $t("404.title") }}
        </h1>
        <p class="text-2xl">{{ $t("404.desp") }}</p>
        <div class="divider"></div>
        <section class="flex gap-2">
            <button class="btn bg-gradient-to-br from-primary to-secondary text-white" @click="$router.back()">
                {{ $t("404.button.back") }}
            </button>
            <button class="btn btn-outline text-white" @click="$router.push('/')">
                {{ $t("404.button.home") }}
            </button>
        </section>
    </div>
</template>
