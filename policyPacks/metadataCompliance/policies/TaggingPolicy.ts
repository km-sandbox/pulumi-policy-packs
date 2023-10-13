import {
  ReportViolation,
  StackValidationArgs,
  StackValidationPolicy,
} from '@pulumi/policy';

import {
  GCPProvider,
  resourceIsFromAllowedProviders,
  getResourceTags,
} from '../utils';

const REQUIRED_TAGS = ['environment', 'appName'];

function reportTagsIfNotExists(
  resourceName: string,
  tagKeys: string[],
  requiredTags: string[],
  reportViolation: ReportViolation
) {
  for (const tag of requiredTags) {
    if (!tagKeys.includes(tag)) {
      reportViolation(
        `Resource ${resourceName} is missing required tag: ${tag}.`
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
        const resourceTags = getResourceTags(resource);

        reportTagsIfNotExists(
          resource.name,
          Object.keys(resourceTags),
          REQUIRED_TAGS,
          reportViolation
        );
      }
    }
  },
};
