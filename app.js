require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/db');
const router = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// ────────── Sécurité ──────────
app.use(helmet());

// ────────── CORS ──────────
const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:5173').split(',');

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error('Non autorisé par CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

// ────────── Limitation de débit ──────────
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 10, // 10 tentatives max par IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        statusCode: 429,
        message: 'Trop de tentatives, réessayez dans 15 minutes.'
    }
});

// -- Le limiter  (avant les routes d'auth) --
app.use('/api/auth', authLimiter);

// ── Parsing JSON ──
app.use(express.json());

// ── Routes ──
app.use('/api', router);

// -- handler d'erreurs global (en dernier) --
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).json({
        statusCode: err.status ?? 500,
        message: err.message ?? 'Erreur serveur'
    });
});

// ── Démarrage ──
const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 PetBuddy API démarrée sur le port ${PORT}`);
    });
};

start();