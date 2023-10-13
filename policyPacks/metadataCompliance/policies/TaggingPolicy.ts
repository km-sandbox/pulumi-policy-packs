import {
  PolicyResource,
  ReportViolation,
  StackValidationArgs,
  StackValidationPolicy,
} from '@pulumi/policy';

import {GCPProvider, resourceIsFromAllowedProviders} from '../utils';

const REQUIRED_TAGS = ['environment', 'appName'];

function checkTags(
  resource: PolicyResource,
  requiredTags: string[],
  reportViolation: ReportViolation
) {
  const tags = resource.props['tags'];
  for (const tag of requiredTags) {
    if (!tags || !tags[tag]) {
      reportViolation(
        `Resource ${resource.name} is missing required tag: ${tag}.`
      );
    }
  }
}

export const TaggingPolicy: StackValidationPolicy = {
  name: 'tagging-policy',
  description:
    'Ensure all resources have the required tags: environment, appName.',
  enforcementLevel: 'mandatory',
  validateStack: (
    args: StackValidationArgs,
    reportViolation: ReportViolation
  ) => {
    for (const resource of args.resources) {
      if (resourceIsFromAllowedProviders(resource, [GCPProvider])) {
        checkTags(resource, REQUIRED_TAGS, reportViolation);
      }
    }
  },
};
