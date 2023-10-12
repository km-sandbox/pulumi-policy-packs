import {PolicyPack} from '@pulumi/policy';
import {TaggingPolicy} from './policies/TaggingPolicy';

const metadataCompliancePack = new PolicyPack('MetadataCompliance', {
  policies: [TaggingPolicy],
});

export {metadataCompliancePack};
