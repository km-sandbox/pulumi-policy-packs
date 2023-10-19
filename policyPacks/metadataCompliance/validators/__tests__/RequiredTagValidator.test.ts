import {RequiredTagValidator} from '../RequiredTagValidator';

describe('RequiredTagValidator', () => {
  let reportViolation: jest.Mock;
  let requiredTagValidator: RequiredTagValidator;

  beforeEach(() => {
    reportViolation = jest.fn();
    requiredTagValidator = new RequiredTagValidator(['env', 'app']);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    {
      name: 'should not report when all tags are present',
      tags: ['env', 'app'],
      expectedReport: '',
      expectedReportCalled: false,
    },
    {
      name: 'should report missing "env" tag',
      tags: ['env'],
      expectedReport: 'Resource Resource1 is missing required tag: app.',
      expectedReportCalled: true,
    },
    {
      name: 'should report missing all tag',
      tags: [],
      expectedReport: 'Resource Resource1 is missing required tag: app.',
      expectedReportCalled: true,
    },
  ];

  testCases.forEach(({name, tags, expectedReport, expectedReportCalled}) => {
    it(name, () => {
      requiredTagValidator.validate('Resource1', tags, reportViolation);

      if (expectedReportCalled) {
        expect(reportViolation).toHaveBeenCalledWith(expectedReport);
      } else {
        expect(reportViolation).not.toHaveBeenCalled();
      }
    });
  });
});
