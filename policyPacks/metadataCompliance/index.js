"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataCompliancePack = void 0;
const policy_1 = require("@pulumi/policy");
const TaggingPolicy_1 = require("./policies/TaggingPolicy");
const metadataCompliancePack = new policy_1.PolicyPack('MetadataCompliance', {
    policies: [TaggingPolicy_1.TaggingPolicy],
});
exports.metadataCompliancePack = metadataCompliancePack;
//# sourceMappingURL=index.js.map