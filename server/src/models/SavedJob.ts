import { model, Schema, InferSchemaType } from "mongoose";

const savedJobSchema = new Schema(
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
    },
    {
        timestamps: true,
    },
);


// Create a compound index on candidateId and jobId so the same user cannot save the same job more than once.
// This also makes lookups by candidate and job faster.
savedJobSchema.index(
    {candidateId: 1, jobId: 1},
    {unique: true},
);

export type SavedJob = InferSchemaType<typeof savedJobSchema>;
export const SavedJobModel = model<SavedJob>('SavedJob', savedJobSchema);