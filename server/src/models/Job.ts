import { model, Schema, InferSchemaType } from 'mongoose';

const jobSchema = new Schema(
  {
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract'],
      required: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    requirements: {
      type: String,
      default: [],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create an index on recruiterId to make queries that filter jobs by recruiter faster
// (for example, when listing all jobs posted by one recruiter).
jobSchema.index({ recruiterId: 1 });

export type Job = InferSchemaType<typeof jobSchema>;
export const JobModel = model<Job>('Job', jobSchema);
