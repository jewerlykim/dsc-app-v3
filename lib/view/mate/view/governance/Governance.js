"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const ProposalList_1 = __importDefault(require("../../component/governance/ProposalList"));
const Alert_1 = __importDefault(require("../../component//dialogue/Alert"));
const Layout_1 = __importDefault(require("../Layout"));
class Governance {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("GOVERNANCE_TITLE1");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("GOVERNANCE_TITLE1")), (0, skynode_1.el)("h2", (0, msg_js_1.default)("GOVERNANCE_DESC1")), (0, skynode_1.el)(".button-wrap", (0, skynode_1.el)("button", (0, msg_js_1.default)("GOVERNANCE_BUTTON"), {
            click: () => {
                new Alert_1.default("이메이트 클레이튼 체인 마이그레이션 이후 해당 기능이 열립니다.", (0, msg_js_1.default)("CONFIRM_BUTTON"));
            }
        }))), (0, skynode_1.el)("section", (0, skynode_1.el)("hr"), (0, skynode_1.el)("h2", (0, msg_js_1.default)("GOVERNANCE_TITLE2")), (0, skynode_1.el)("table", (0, skynode_1.el)("thead", (0, skynode_1.el)("tr", (0, skynode_1.el)("td.dogesound", "DOGESOUND"), (0, skynode_1.el)("td.proposal", "PROPOSAL"))), new ProposalList_1.default()))));
    }
    changeParams(params, uri) {
    }
    close() {
        this.container.delete();
    }
}
exports.default = Governance;
//# sourceMappingURL=Governance.js.map