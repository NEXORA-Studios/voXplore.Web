import Mock from "mockjs";
import type { MockRoute } from "./types";

import BaseApiMocks from "./Base";
import AccountApiMocks from "./Account";
import VocabularyApiMocks from "./Vocabulary";
import AnalysisApiMocks from "./Analysis";

const mockList: MockRoute[] = [
    ...BaseApiMocks, // Base API
    ...AccountApiMocks, // Account APIs
    ...VocabularyApiMocks, // Vocabulary APIs
    ...AnalysisApiMocks, // Analysis APIs
];

mockList.forEach(({ url, method = "get", response }) => {
    console.debug("⚡ Mocking API:", method.toUpperCase(), url);
    Mock.mock(url, method, response);
});
