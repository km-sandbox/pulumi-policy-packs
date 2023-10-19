import {TaggingPolicy} from '../TaggingPolicy';
import {createMockPolicyResource} from '../../__tests__/mockPolicyResource';
import {runStackPolicy} from '../../__tests__/utils';

describe('TaggingPolicy', () => {
  const resourceName = 'some-name';
  const getConfig = <T>() => <T>{};

  const testCases = [
    {
      name: 'should have all the required tags',
      tags: {app: 'foobar', env: 'prod'},
      expectedViolations: [],
    },
    {
      name: 'should miss the required "app" tag',
      tags: {env: 'prod'},
      expectedViolations: [
        {message: `Resource ${resourceName} is missing required tag: app.`},
      ],
    },
    {
      name: 'should miss the required "env" tag',
      tags: {app: 'foobar'},
      expectedViolations: [
        {message: `Resource ${resourceName} is missing required tag: env.`},
      ],
    },
    {
      name: 'should miss all the required tags',
      tags: {},
      expectedViolations: [
        {
          message: `Resource ${resourceName} is missing required tag: env.`,
        },
        {
          message: `Resource ${resourceName} is missing required tag: app.`,
        },
      ],
    },
  ];

  testCases.forEach(({name, tags, expectedViolations}) => {
    it(name, async () => {
      const mockPolicyResources = [
        createMockPolicyResource({
          name: resourceName,
          type: 'gcp:some-resource-type',
          props: {tags},
        }),
      ];

      const args = {
        getConfig,
        resources: mockPolicyResources,
      };

      const violations = await runStackPolicy(TaggingPolicy, args);
      expect(violations).toStrictEqual(expectedViolations);
    });
  });
});
