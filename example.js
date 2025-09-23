"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@/core");
const query_1 = require("@/core/query");
const config_1 = require("@/utils/config");
const yocto_spinner_1 = __importDefault(require("yocto-spinner"));
async function main() {
    const config = (0, config_1.getConfig)();
    (0, config_1.initializeSettings)(config);
    const index = await (0, core_1.loadAndIndexData)(config, { shouldIndex: false });
    let query = "What is the first verse of al-fatiha?";
    console.log("Question: " + query);
    let spinner = (0, yocto_spinner_1.default)({ text: "Answer: " }).start();
    let answer = await (0, query_1.queryData)(index, query);
    spinner.success(answer);
    query = "Which path do we seek according to al-fatiha?";
    console.log("Question: " + query);
    spinner = (0, yocto_spinner_1.default)({ text: "Answer: " }).start();
    answer = await (0, query_1.queryData)(index, query);
    spinner.success(answer);
}
main().catch(console.error);
//# sourceMappingURL=example.js.map