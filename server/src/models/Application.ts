import { model, Schema, InferSchemaType } from 'mongoose';

const applicationSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'reviewing', 'accepted', 'rejected', 'shortlisted'],
      default: 'applied',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

export type Application = InferSchemaType<typeof applicationSchema>;
export const ApplicationModel = model<Application>(
  'Application',
  applicationSchema,
);
