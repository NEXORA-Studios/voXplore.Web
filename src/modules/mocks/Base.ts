import type { MockRoute } from "./types";

const StatusResponse = {
    status: "ok",
    api_version: "0.1.0-dev+local",
} as const;

const BaseApiMocks: MockRoute[] = [
    {
        url: "/api",
        response: () => StatusResponse,
    },
    {
        url: "/api/status",
        response: () => StatusResponse,
    },
];

export default BaseApiMocks;
