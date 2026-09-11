import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ApplicationModel } from '../models/Application.js';
import { JobModel } from '../models/Job.js';

import { createApplication } from '../services/application.service.js';

// "vi" object call mock() to replace an imported modules with a mocked version.
vi.mock('../models/Application.js', () => ({
  ApplicationModel: {
    create: vi.fn(), // "vi" call fn() to create a fake function.
  },
}));
// this means, when this test imports "ApplicationModel", don't give me the real one. Give me this fake one instead.

vi.mock('../models/Job.js', () => ({
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
    await expect(
        createApplication(candidateId, jobId)
    ).rejects.toThrow(
      'Job not found or not open for apply',
    );
    // Vitest supports .rejects for assertions against rejected promises, which is especially useful for async functions. 

    // [Final Assertion]
    expect(ApplicationModel.create).not.toHaveBeenCalled();
    // this means, because there was no valid job, the application should never been cerated. 
  });
});
