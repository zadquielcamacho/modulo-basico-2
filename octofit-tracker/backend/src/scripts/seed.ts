import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ana Torres', email: 'ana.torres@example.com', goal: 'Improve endurance' },
      { name: 'Luis Mendoza', email: 'luis.mendoza@example.com', goal: 'Build strength' },
      { name: 'Sofia Rios', email: 'sofia.rios@example.com', goal: 'Run a 10K' },
    ]);

    const teams = await Team.create([
      { name: 'Morning Pulse', sport: 'Running', members: [users[0]._id, users[2]._id] },
      { name: 'Strength Lab', sport: 'Functional training', members: [users[1]._id] },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[1]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[0]._id } } },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Interval run', durationMinutes: 38, calories: 360, completedAt: new Date('2026-09-08') },
      { user: users[1]._id, type: 'Strength circuit', durationMinutes: 45, calories: 410, completedAt: new Date('2026-09-09') },
      { user: users[2]._id, type: 'Long run', durationMinutes: 62, calories: 580, completedAt: new Date('2026-09-10') },
    ]);

    await LeaderboardEntry.create([
      { user: users[2]._id, team: teams[0]._id, points: 940, rank: 1 },
      { user: users[0]._id, team: teams[0]._id, points: 820, rank: 2 },
      { user: users[1]._id, team: teams[1]._id, points: 760, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Full-body foundation',
        focus: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        title: 'Tempo run builder',
        focus: 'Endurance',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
