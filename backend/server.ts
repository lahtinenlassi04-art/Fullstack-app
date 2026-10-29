import express from "express";
import cors from "cors";

type LearningEntryData = {
    id: number;
    topic: string;
    date: string;
    learned: string;
    confidence: number;
    funLevel: number;
};

const app = express();
app.use(cors());
const PORT = 3001;

const entries: LearningEntryData[] = [
    {
        id: 1,
        topic: "React Components",
        date: "2026-10-22",
        learned: "Components help us reuse UI code.",
        confidence: 3,
        funLevel: 4,
    },
    {
        id: 2,
        topic: "React State",
        date: "2026-10-27",
        learned: "State lets the interface react to changes.",
        confidence: 2,
        funLevel: 5,
    },
    {
        id: 3,
        topic: "React State",
        date: "2026-10-29",
        learned: "Testing changes updating",
        confidence: 5,
        funLevel: 5,
    }
];

app.get("/api/entries", (req, res) => {
    res.json(entries);
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
