import * as policy from '@pulumi/policy';

/** @internal */
export interface PolicyViolation {
  message: string;
  urn?: string;
}

/** @internal */
export async function runResourcePolicy(
  resPolicy: policy.ResourceValidationPolicy,
  args: policy.ResourceValidationArgs
): Promise<PolicyViolation[]> {
  const violations: PolicyViolation[] = [];
  const report = (message: string, urn?: string) => {
    violations.push({message: message, ...(urn && {urn})});
  };
  const validations = Array.isArray(resPolicy.validateResource)
    ? resPolicy.validateResource
    : [resPolicy.validateResource];
  for (const validation of validations) {
    if (validation) {
      await Promise.resolve(validation(args, report));
    }
  }
  return violations;
}

/** @internal */
export async function runStackPolicy(
  stackPolicy: policy.StackValidationPolicy,
  args: policy.StackValidationArgs
): Promise<PolicyViolation[]> {
  const violations: PolicyViolation[] = [];
  const report = (message: string, urn?: string) => {
    violations.push({message: message, ...(urn && {urn})});
  };
  await Promise.resolve(stackPolicy.validateStack(args, report));
  return violations;
}
