import {
  StackValidationArgs,
  StackValidationPolicy,
  ReportViolation,
} from '@pulumi/policy';

import * as utils from '../utils';
import * as validators from '../validators';

const REQUIRED_TAGS = ['env', 'app'];

export const TaggingPolicy: StackValidationPolicy = {
  name: 'tagging-policy',
  description:
    'Ensure all resources have the required tags: environment, appName.',
  enforcementLevel: 'mandatory',
  validateStack: (
    args: StackValidationArgs,
    reportViolation: ReportViolation
  ) => {
    const tagValidator = new validators.TagValidator(REQUIRED_TAGS);

    for (const resource of args.resources) {
      if (
        utils.providers.resourceIsFromAllowedProviders(resource, [
          utils.providers.GCPProvider,
        ])
      ) {
        const resourceTags = utils.tags.getResourceTags(resource);
        tagValidator.validate(
          resource.name,
          Object.keys(resourceTags),
          reportViolation
        );
      }
    }
  },
};
