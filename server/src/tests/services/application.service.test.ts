import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ApplicationModel } from '../../models/Application.js';
import { JobModel } from '../../models/Job.js';

import {
  createApplication,
  getApplicationById,
  getApplications,
} from '../../services/application.service.js';

// "vi" object call mock() to replace an imported modules with a mocked version.
vi.mock('../../models/Application.js', () => ({
  ApplicationModel: {
    create: vi.fn(), // "vi" call fn() to create a fake function.
    find: vi.fn(),
    findOne: vi.fn(),
  },
}));
// this means, when this test imports "ApplicationModel", don't give me the real one. Give me this fake one instead.

vi.mock('../../models/Job.js', () => ({
  JobModel: {
    findOne: vi.fn(),
  },
}));

// describe is the container/group of related tests.
// These tests are about "createApplication".
// it doesn't perform the test itself. It organizes them.
describe('createApplication', () => {
  // this means, before every test, clear the history of our mocks.
  // this is important to reset the recorder call history.
  beforeEach(() => {
    //_ importantly "clearAllMocks()" clears mock history without removing the mock implementations.
    vi.clearAllMocks();
  });

  // "it()" defines one test case.
  it('should create an application for an open job', async () => {
    const candidateId = 'candidate-123';
    const jobId = 'job-123';

    const mockJob = {
      _id: jobId,
      status: 'open',
    };

    const mockApplication = {
      _id: 'application-123',
      candidateId,
      jobId,
      status: 'applied',
    };

    vi.mocked(JobModel.findOne).mockResolvedValue(mockJob as never);

    // [1] vi.mocked() means this function is going to be mocked and ended up with returning {this object values (mockJob and mockApplication)}.
    // When ApplicationModel.create() is called, pretend MongoDB successfully create the application and return "mockApplication".
    vi.mocked(ApplicationModel.create).mockResolvedValue(
      mockApplication as never,
    );

    const result = await createApplication(candidateId, jobId);

    // [First Assertion]
    // expect "JobMode.findOne" is called with these values {_id: jobId, status: 'open'}.
    expect(JobModel.findOne).toHaveBeenCalledWith({
      _id: jobId,
      status: 'open',
    });

    // [Second Assertion]
    // expects "Application.create" is called with these values {candidateId, jobId, status: 'applied'}.
    expect(ApplicationModel.create).toHaveBeenCalledWith({
      candidateId,
      jobId,
      status: 'applied',
    });

    // [Third Assertion]
    // expecting that the return object value is equal to the "mockApplication" object.
    // toEqual() checks the structural quality of the object.
    // [1] And then, return object value is checked here.
    expect(result).toEqual(mockApplication);
  });

  it('should throw an error when the job does not exist or is not open', async () => {
    const candidateId = 'candidate-123';
    const jobId = 'job-123';

    vi.mocked(JobModel.findOne).mockResolvedValue(null);

    // I expect createApplication() to reject withe an error containing message "Job not found or not open for apply".
    await expect(createApplication(candidateId, jobId)).rejects.toThrow(
      'Job not found or not open for apply',
    );
    // Vitest supports .rejects for assertions against rejected promises, which is especially useful for async functions.

    // [Final Assertion]
    expect(ApplicationModel.create).not.toHaveBeenCalled();
    // this means, because there was no valid job, the application should never been cerated.
  });
});

describe('getApplications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return applications for a candidate sorted by newest first', async () => {
    const candidateId = 'candidate-123';

    const mockApplication = [
      {
        _id: 'application-123',
        candidateId,
        jobId: 'job-123',
        status: 'applied',
      },
      {
        _id: 'application-123',
        candidateId,
        jobId: 'job-123',
        status: 'reviewing',
      },
    ];

    const sortMock = vi.fn().mockResolvedValue(mockApplication);

    vi.mocked(ApplicationModel.find).mockReturnValue({
      sort: sortMock,
    } as never);

    const result = await getApplications(candidateId);

    expect(ApplicationModel.find).toHaveBeenCalledWith({ candidateId });

    expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });

    expect(result).toEqual(mockApplication);
  });

  it('should return an empty array when the candidate has no application', async () => {
    const candidateId = 'candidate-123';

    const sortMock = vi.fn().mockResolvedValue([]);

    vi.mocked(ApplicationModel.find).mockReturnValue({
      sort: sortMock,
    } as never);

    const result = await getApplications(candidateId);

    expect(result).toEqual([]);

    expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
  });
});

describe('getApplicationById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return an application belonging to the candidate', async () => {
    const candidateId = 'candidate-123';
    const applicationId = 'application-123';

    const mockApplication = {
      _id: applicationId,
      candidateId,
      jobId: 'job-123',
      status: 'applied',
    };

    const leanMock = vi.fn().mockResolvedValue(mockApplication);

    vi.mocked(ApplicationModel.findOne).mockReturnValue({lean: leanMock} as never);

    const result = await getApplicationById(candidateId, applicationId);

    expect(ApplicationModel.findOne).toHaveBeenCalledWith({
      _id: applicationId,
      candidateId,
    });

    expect(leanMock).toHaveBeenCalled();

    expect(result).toEqual(mockApplication);
  });

  it('should throw an error when application does not exist or does not belong to the candidate', async () => {
    const candidateId = 'candidate-123';
    const applicationId = 'application-123';

    const leanMock = vi.fn().mockResolvedValue(null);

    vi.mocked(ApplicationModel.findOne).mockReturnValue({lean: leanMock} as never);

    await expect(
      getApplicationById(candidateId, applicationId)
    ).rejects.toThrow('Application not Found');

    expect(ApplicationModel.findOne).toHaveBeenCalledWith({
      _id: applicationId,
      candidateId,
    });
    
    expect(leanMock).toHaveBeenCalledWith();
  });
});