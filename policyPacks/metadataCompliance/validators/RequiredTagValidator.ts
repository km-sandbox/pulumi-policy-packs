import {ReportViolation} from '@pulumi/policy';

export class RequiredTagValidator {
  constructor(private requiredTags: string[]) {}

  validate(
    resourceName: string,
    resourceTagKeys: string[],
    reportViolation: ReportViolation
  ) {
    for (const tag of this.requiredTags) {
      if (!resourceTagKeys.includes(tag)) {
        reportViolation(
          `Resource ${resourceName} is missing required tag: ${tag}.`
        );
      }
    }
  }
}
