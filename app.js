// Point d'entrée du serveur PetBuddy

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/db');
const router = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Sécurité ──────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
    : ['http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error('Non autorisé par CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

// ── Rate limiting sur l'auth uniquement ───────────────────
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // 10 tentatives max par IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        statusCode: 429,
        message: 'Trop de tentatives, réessayez dans 15 minutes.'
    }
});

// ⚠️ Le limiter AVANT le router général — ordre critique
app.use('/api/auth', authLimiter);

// ── Parsing JSON ──────────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────────
app.use('/api', router);

// ── Démarrage ─────────────────────────────────────────────
const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 PetBuddy API démarrée sur le port ${PORT}`);
    });
};

start();