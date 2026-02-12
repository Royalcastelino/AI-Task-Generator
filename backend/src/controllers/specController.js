import Spec from '../models/Spec.js';
import { generateSpecFromAI, checkLLMHealth } from '../services/openaiService.js';
import mongoose from 'mongoose';

export const generateSpec = async (req, res) => {
    try {
        const { goal, targetUsers, constraints, platform, risksUnknowns } = req.body;

        if (!goal || !targetUsers || !constraints || !platform) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const aiResult = await generateSpecFromAI(req.body);

        const newSpec = new Spec({
            goal,
            targetUsers,
            constraints,
            platform,
            risksUnknowns,
            userStories: aiResult.user_stories,
            engineeringTasks: aiResult.engineering_tasks,
            risks: aiResult.risks
        });

        await newSpec.save();

        // Keep only last 5
        const specs = await Spec.find().sort({ createdAt: -1 });
        if (specs.length > 5) {
            const idsToDelete = specs.slice(5).map(s => s._id);
            await Spec.deleteMany({ _id: { $in: idsToDelete } });
        }

        res.status(201).json(newSpec);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating specification' });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await Spec.find().sort({ createdAt: -1 }).limit(5);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history' });
    }
};

export const getStatus = async (req, res) => {
    const status = {
        backend: "ok",
        database: mongoose.connection.readyState === 1 ? "ok" : "error",
        llm: await checkLLMHealth()
    };
    res.json(status);
};
