import {PolicyResource} from '@pulumi/policy';

interface MockResourceOptions {
  type?: string;
  name?: string;
  props?: Record<string, unknown>;
}

export const createMockPolicyResource = (
  options?: MockResourceOptions
): PolicyResource => {
  const defaultType = 'some-type';
  const defaultName = 'some-name';
  const defaultProps = {};

  const {
    type = defaultType,
    name = defaultName,
    props = defaultProps,
  } = options || {};

  return {
    type,
    props,
    urn: 'some:urn',
    name,
    opts: {
      protect: false,
      ignoreChanges: [],
      aliases: [],
      customTimeouts: {
        createSeconds: 1,
        updateSeconds: 1,
        deleteSeconds: 1,
      },
      additionalSecretOutputs: [],
    },
    parent: undefined,
    dependencies: [],
    propertyDependencies: {},
    isType: () => false,
    asType: () => undefined,
  };
};
