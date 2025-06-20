<template>
    <div class="fixed top-0 left-0 w-screen h-screen z-999 lg:hidden bg-base-100/50 backdrop-blur-xl">
        <div class="h-full flex flex-col justify-center text-center px-12">
            <p class="fade-up-ani text-4xl md:text-6xl font-bold">
                {{ $t("app.demonomobile.title") }}
            </p>
            <br />
            <p class="fade-up-ani text-2xl md:text-4xl" style="animation-delay: 250ms">
                {{ $t("app.demonomobile.desp") }}
            </p>
            <div class="divider"></div>
            <p class="fade-up-ani text-[3vw] hidden md:block" style="animation-delay: 300ms">
                {{ $t("app.demonomobile.hint.tablet") }}
            </p>
            <p class="fade-up-ani text-[3vw] md:hidden" style="animation-delay: 300ms">
                {{ $t("app.demonomobile.hint.mobile") }}
            </p>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .fade-up-ani {
        opacity: 0;
        transform: translateY(10px);
        animation: fade-up 0.25s ease-in-out forwards;
    }
    @keyframes fade-up {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
