import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'octofit-tracker-api', apiUrl });
});
app.get('/api/users/', async (_request, response) => {
    response.json(await User.find().populate('team').lean());
});
app.get('/api/teams/', async (_request, response) => {
    response.json(await Team.find().populate('members').lean());
});
app.get('/api/activities/', async (_request, response) => {
    response.json(await Activity.find().populate('user').sort({ completedAt: -1 }).lean());
});
app.get('/api/leaderboard/', async (_request, response) => {
    response.json(await LeaderboardEntry.find().populate('user team').sort({ rank: 1 }).lean());
});
app.get('/api/workouts/', async (_request, response) => {
    response.json(await Workout.find().sort({ createdAt: -1 }).lean());
});
app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: 'Unable to retrieve data' });
});
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
});
