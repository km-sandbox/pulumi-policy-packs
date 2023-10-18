import {PolicyResource} from '@pulumi/policy';

export const GCPProvider: string[] = ['gcp', 'google-native'];

export type Provider = typeof GCPProvider;

export function resourceIsFromAllowedProviders(
  resource: PolicyResource,
  allowedProviders: Provider[]
): boolean {
  const resourceProvider = resource.type.split(':')[0];
  return allowedProviders.some(allowedProvider =>
    allowedProvider.includes(resourceProvider)
  );
}
