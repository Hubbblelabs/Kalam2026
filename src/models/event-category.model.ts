import mongoose, { Schema, Document } from 'mongoose';

export interface IEventCategory extends Document {
    name: string;
    slug: string;
}

const eventCategorySchema = new Schema<IEventCategory>(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: false, // schema.json doesn't show createdAt/updatedAt
    }
);

// Indexes
eventCategorySchema.index({ slug: 1 }, { unique: true });
eventCategorySchema.index({ name: 1 });

export const EventCategory = mongoose.models.EventCategory || mongoose.model<IEventCategory>('EventCategory', eventCategorySchema);
