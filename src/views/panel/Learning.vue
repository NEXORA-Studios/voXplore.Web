<template>
    <div class="hero-content text-base-content w-4/5 max-w-4/5! flex flex-col mt-12" v-if="true">
        <div class="w-full xl:h-128 grid grid-rows-1 grid-cols-1 lg:grid-rows-5 lg:grid-cols-4 gap-4">
            <div class="card card-hover bg-base-100 border border-base-content/25 xl:row-span-5 xl:col-span-3">
                <div class="card-body">
                    <section class="flex gap-2 items-center -mt-1 mb-auto">
                        <i class="icon-[material-symbols--book-2-outline-rounded] size-7 text-secondary" />
                        <span class="text-xl">Practice</span>
                    </section>
                </div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25 xl:row-span-3">
                <div class="card-body">
                    <section class="flex gap-2 items-center -mt-1 mb-auto">
                        <i class="icon-[material-symbols--analytics-outline-rounded] size-6 text-primary" />
                        <span class="text-xl">Progress Stats</span>
                    </section>
                </div>
            </div>
            <div class="card card-hover bg-base-100 border border-base-content/25  xl:row-span-2">
                <div class="card-body">
                    <section class="flex gap-2 items-center -mt-1 mb-auto">
                        <i class="icon-[material-symbols--action-key-outline-rounded] size-6 text-primary" />
                        <span class="text-xl">Quick Actions</span>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
