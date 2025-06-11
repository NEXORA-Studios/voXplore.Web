import { createI18n } from "vue-i18n";
import * as Locales from "./locales";

const messages = {
    ...Locales,
};

const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: "zh_CN", // 默认语言
    fallbackLocale: "en_US", // 回退语言
    messages,
});

export default i18n;
