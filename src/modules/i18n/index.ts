import { createI18n } from "vue-i18n";
import * as Locales from "./locales";

const MESSAGES = {
    ...Locales,
};
const FALLBACK_LOCALE = "zh_CN";

const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: localStorage.getItem("config.language") /* 从用户配置中获取 */ ?? FALLBACK_LOCALE, // 目前语言
    fallbackLocale: FALLBACK_LOCALE, // 回退语言
    messages: MESSAGES,
});

export default i18n;
