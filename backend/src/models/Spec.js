import mongoose from 'mongoose';

const SpecSchema = new mongoose.Schema({
    goal: { type: String, required: true },
    targetUsers: { type: String, required: true },
    constraints: { type: String, required: true },
    platform: { type: String, required: true, enum: ['Web', 'Mobile', 'Internal Tool'] },
    risksUnknowns: { type: String },
    userStories: [{ type: String }],
    engineeringTasks: {
        frontend: [{ type: String }],
        backend: [{ type: String }],
        devops: [{ type: String }]
    },
    risks: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const Spec = mongoose.model('Spec', SpecSchema);

export default Spec;
