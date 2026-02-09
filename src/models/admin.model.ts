import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    name: string;
    email: string;
    phone?: string;
    passwordHash?: string;
    department: mongoose.Types.ObjectId | null;
    role: 'superadmin' | 'event_manager' | 'department_manager';
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
            enum: ['superadmin', 'event_manager', 'department_manager'],
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

// Middleware to migrate old role values
adminSchema.post(['find', 'findOne'], function (docs: any) {
    if (!docs) return;

    const migrate = (doc: any) => {
        if (doc && doc.role) {
            // Map old role values to new ones
            const roleMapping: Record<string, string> = {
                'department_admin': 'department_manager',
                'event_admin': 'event_manager',
            };

            if (roleMapping[doc.role]) {
                console.log(`[MIGRATION] Converting role ${doc.role} to ${roleMapping[doc.role]} for admin ${doc.email}`);
                doc.role = roleMapping[doc.role];
            }
        }
    };

    if (Array.isArray(docs)) {
        docs.forEach(migrate);
    } else {
        migrate(docs);
    }
});

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);
