import {PolicyResource} from '@pulumi/policy';

export const GCPProvider: string[] = ['gcp', 'google-native'];
export const AWSProvider: string[] = ['aws', 'aws-native'];
export const AzureProvider: string[] = ['azure', 'azure-native'];

export type Provider =
  | typeof GCPProvider
  | typeof AWSProvider
  | typeof AzureProvider;

export function resourceIsFromAllowedProviders(
  resource: PolicyResource,
  allowedProviders: Provider[]
): boolean {
  const resourceProvider = resource.type.split(':')[0];
  return allowedProviders.some(allowedProvider =>
    allowedProvider.includes(resourceProvider)
  );
}

const tagKeyNames = ['tags', 'labels'];

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
