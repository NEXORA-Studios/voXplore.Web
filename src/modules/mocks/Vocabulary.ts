import type { MockRoute } from "./types";
import { A1Vocabs, A2Vocabs, B1Vocabs, B2Vocabs, C1Vocabs, C2Vocabs } from "../mock-db";
import type { MockjsRequestOptions } from "mockjs";

const VocabularyApiMocks: MockRoute[] = [
    {
        url: /\/api\/vocabulary\/get_by_level/,
        response: (options: MockjsRequestOptions) => {
            const queryStr = options.url.split("?")[1] || "";
            const level = new URLSearchParams(queryStr).get("level")?.toUpperCase();
            const random_index = Math.floor(50 * Math.random());
            if (level === "A1") {
                return A1Vocabs[random_index];
            }
            if (level === "A2") {
                return A2Vocabs[random_index];
            }
            if (level === "B1") {
                return B1Vocabs[random_index];
            }
            if (level === "B2") {
                return B2Vocabs[random_index];
            }
            if (level === "C1") {
                return C1Vocabs[random_index];
            }
            if (level === "C2") {
                return C2Vocabs[random_index];
            }
        },
    },
    {
        url: "/api/vocabulary/get_last",
        response: () => {
            const random_list = Math.floor(6 * Math.random());
            const random_index = Math.floor(50 * Math.random());
            const raw = [
                ["A1", A1Vocabs],
                ["A2", A2Vocabs],
                ["B1", B1Vocabs],
                ["B2", B2Vocabs],
                ["C1", C1Vocabs],
                ["C2", C2Vocabs],
            ];
            const [current_level, current_list] = raw[random_list];
            return {
                level: current_level,
                // @ts-ignore
                ...current_list[random_index],
            };
        },
    },
];

export default VocabularyApiMocks;
