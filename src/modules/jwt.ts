export class Jwt {
    static decodeJwt(token: string): any {
        try {
            const payload = token.split(".")[1];
            const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    }

    static encodeJwt(payload: any): string {
        try {
            const header = { alg: "HS256", typ: "JWT" };
            const encodedHeader = btoa(JSON.stringify(header))
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
            const encodedPayload = btoa(JSON.stringify(payload))
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
            return `${encodedHeader}.${encodedPayload}`;
        } catch (e) {
            return "";
        }
    }
}
