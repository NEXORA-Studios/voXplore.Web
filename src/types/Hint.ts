export interface HintConfig {
    type: "info" | "success" | "warning" | "error";
    content: any;
    translate?: boolean;
    infinite?: boolean;
    time?: number;
}
