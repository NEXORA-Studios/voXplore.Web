import type { MockRoute } from "./types";

const AnalysisApiMocks: MockRoute[] = [
    {
        url: "/api/analysis/get",
        response: () => ({
            streak: 16,
            points: 120,
            level: 1,
            usage: 34,
            weekly_goal: 68,
        }),
    },
    {
        url: "/api/analysis/update",
        method: "post",
        response: () => ({
            message: "Successful",
        }),
    },
];

export default AnalysisApiMocks;
