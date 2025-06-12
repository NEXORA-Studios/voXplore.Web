export interface HintConfig {
    type: "info" | "success" | "warning" | "error";
    content: any;
    infinite?: boolean;
    time?: number;
}
