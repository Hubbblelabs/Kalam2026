import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    name: string;
    email: string;
    phone?: string;
    passwordHash?: string;
    department: mongoose.Types.ObjectId | null;
    role: 'superadmin' | 'department_admin' | 'event_admin';
    assignedEvents?: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const adminSchema = new Schema<IAdmin>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
        },
        passwordHash: {
            type: String,
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: function (this: IAdmin) {
                return this.role !== 'superadmin';
            },
            default: null,
        },
        role: {
            type: String,
            enum: ['superadmin', 'department_admin', 'event_admin'],
            required: true,
        },
        assignedEvents: [{
            type: Schema.Types.ObjectId,
            ref: 'Event',
        }],
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Indexes
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ role: 1 });
adminSchema.index({ department: 1 });

// Prevent duplicate admins per department + role (except superadmin)
adminSchema.index(
    { department: 1, role: 1 },
    {
        unique: true,
        partialFilterExpression: { department: { $ne: null } },
    }
);

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);
