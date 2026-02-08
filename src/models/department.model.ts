import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
    code: number;
    name: string;
    category: string;
}

const departmentSchema = new Schema<IDepartment>(
    {
        code: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false, // schema.json doesn't show createdAt/updatedAt for departments
    }
);

// Indexes
departmentSchema.index({ code: 1 }, { unique: true });
departmentSchema.index({ name: 1 });
departmentSchema.index({ category: 1 });

export const Department = mongoose.models.Department || mongoose.model<IDepartment>('Department', departmentSchema);
