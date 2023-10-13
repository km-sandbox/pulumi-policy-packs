"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaggingPolicy = void 0;
const REQUIRED_TAGS = ['environment', 'appName'];
function checkTags(resource, requiredTags, reportViolation) {
    const tags = resource.props['tags'];
    for (const tag of requiredTags) {
        if (!tags || !tags[tag]) {
            reportViolation(`Resource ${resource.name} is missing required tag: ${tag}.`);
        }
    }
}
exports.TaggingPolicy = {
    name: 'tagging-policy',
    description: 'Ensure all resources have the required tags: environment, appName.',
    enforcementLevel: 'mandatory',
    validateStack: (args, reportViolation) => {
        for (const resource of args.resources) {
            checkTags(resource, REQUIRED_TAGS, reportViolation);
        }
    },
};
//# sourceMappingURL=TaggingPolicy.js.map