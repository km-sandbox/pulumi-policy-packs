import { PolicyPack } from '@pulumi/policy';
import { TaggingPolicy } from './policies/TaggingPolicy.ts';

const metadataCompliancePack = new PolicyPack('MetadataCompliance', {
    policies: [TaggingPolicy],
});

export { metadataCompliancePack };