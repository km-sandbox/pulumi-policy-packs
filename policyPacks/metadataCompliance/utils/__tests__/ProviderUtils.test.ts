import {describe, test, expect} from 'vitest';

import {createMockPolicyResource} from '../../__tests__/mockPolicyResource';
import {resourceIsFromAllowedProviders, GCPProvider} from '../ProviderUtils';

describe('ProviderUtils', () => {
  const testCases = [
    {
      name: 'should correctly identify allowed "gcp" provider',
      resourceType: 'gcp:type1',
      allowedProviders: [GCPProvider],
      expectedResult: true,
    },
    {
      name: 'should correctly identify allowed "google-native" provider',
      resourceType: 'google-native:type1',
      allowedProviders: [GCPProvider],
      expectedResult: true,
    },
    {
      name: 'should correctly identify disallowed providers',
      resourceType: 'disallowed-provider:type1',
      allowedProviders: [GCPProvider],
      expectedResult: false,
    },
  ];

  testCases.forEach(
    ({name, resourceType, allowedProviders, expectedResult}) => {
      test.concurrent(name, () => {
        const mockPolicyResource = createMockPolicyResource({
          type: resourceType,
        });

        const result = resourceIsFromAllowedProviders(
          mockPolicyResource,
          allowedProviders
        );

        expect(result).toBe(expectedResult);
      });
    }
  );
});
