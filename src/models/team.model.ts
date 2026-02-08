import mongoose, { Schema, Document } from 'mongoose';

interface ITeamMember {
    user: mongoose.Types.ObjectId;
    joinedAt: Date;
}

interface ITeamSubmission {
    title?: string;
    problemStatement?: string;
    projectFileUrl?: string;
}

export interface ITeam extends Document {
    event: mongoose.Types.ObjectId;
    name: string;
    leader: mongoose.Types.ObjectId;
    members: ITeamMember[];
    submission?: ITeamSubmission;
    createdAt: Date;
}

const teamSchema = new Schema<ITeam>(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        members: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        submission: {
            title: String,
            problemStatement: String,
            projectFileUrl: String,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Indexes
teamSchema.index({ event: 1, leader: 1 }, { unique: true });
teamSchema.index({ event: 1 });

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
