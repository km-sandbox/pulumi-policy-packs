import {ReportViolation} from '@pulumi/policy';

export class TagValidator {
  constructor(private requiredTags: string[]) {}

  validate(
    resourceName: string,
    tagKeys: string[],
    reportViolation: ReportViolation
  ) {
    for (const tag of this.requiredTags) {
      if (!tagKeys.includes(tag)) {
        reportViolation(
          `Resource ${resourceName} is missing required tag: ${tag}.`
        );
      }
    }
  }
}
