import {createMockPolicyResource} from '../../__tests__/mockPolicyResource';
import {getResourceTags} from '../TagUtils';

describe('TagUtils', () => {
  const testCases = [
    {
      name: 'should correctly fetch tags from attribute "tags"',
      props: {
        tags: {
          env: 'prod',
        },
      },
      expectedTags: {env: 'prod'},
    },
    {
      name: 'should correctly fetch tags from attribute "labels"',
      props: {
        labels: {
          env: 'prod',
        },
      },
      expectedTags: {env: 'prod'},
    },
    {
      name: 'should return empty object if no tags',
      props: {},
      expectedTags: {},
    },
  ];

  testCases.forEach(({name, props, expectedTags}) => {
    it(name, () => {
      const mockPolicyResource = createMockPolicyResource({props});

      const actualTags = getResourceTags(mockPolicyResource);

      expect(actualTags).toEqual(expectedTags);
    });
  });
});
