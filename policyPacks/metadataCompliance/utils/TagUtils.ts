import {PolicyResource} from '@pulumi/policy';

export const tagKeyNames = ['tags', 'labels'];

export function getResourceTags(resource: PolicyResource): {
  [key: string]: string;
} {
  for (const key of tagKeyNames) {
    if (resource.props[key]) {
      return resource.props[key];
    }
  }
  return {};
}
