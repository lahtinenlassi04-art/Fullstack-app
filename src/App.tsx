import { useState } from "react";
import { LearningEntry } from "./components/LearningEntry";
import type { LearningEntryData } from "./types/LearningEntryData";

const firstEntry: LearningEntryData = {
  id: 1,
  topic: "React Props",
  date: "2026-10-26",
  learned: "Passing objects instead of separate props",
  confidence: 4,
  funLevel: 8,
};

const secondEntry: LearningEntryData = {
  id: 2,
  topic: "React Props",
  date: "2026-10-26",
  learned: "testing two entrys",
  confidence: 5,
  funLevel: 7,
};

const initialEntries: LearningEntryData[] = [firstEntry, secondEntry];

export default function App() {

  const [serverEntries, setServerEntries] = useState<LearningEntryData[]>([]);
  const [loadError, setLoadError] = useState("");

  async function loadServerEntries() {
    setLoadError("");
    try {
      const response = await fetch("http://localhost:3001/api/entries");
      if (!response.ok) throw new Error("Could not load entries");
      const data: LearningEntryData[] = await response.json();
      setServerEntries(data);
    } catch {
      setLoadError("Could not connect to the backend.");
    }
  }


  const studentName: string = "Lassi Lahtinen";

  const [entries, setEntries] = useState<LearningEntryData[]>(initialEntries);

  // Form State
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [funLevel, setFunLevel] = useState(5);

  function handleAddEntry() {
    // 1. Validate: check non-empty text and confidence between 1 and 5
    if (topic.trim() === "" || learned.trim() === "") {
      alert("Please fill in both Topic and What you learned.");
      return;
    }

    if (confidence < 1 || confidence > 5) {
      alert("Confidence must be between 1 and 5.");
      return;
    }

    // 2. Create the new entry object
    const newEntry: LearningEntryData = {
      id: Date.now(),
      topic: topic.trim(),
      date: date || new Date().toISOString().split("T")[0],
      learned: learned.trim(),
      confidence: confidence,
      funLevel: funLevel,
    };

    // 3. Add to state immutably
    setEntries((currentEntries) => [...currentEntries, newEntry]);

    // 4. Reset form fields
    setTopic("");
    setDate("");
    setLearned("");
    setConfidence(3);
    setFunLevel(5);
  }

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      {/* Render state array */}
      <section>
        {entries.map((entry) => (
          <LearningEntry key={entry.id} entry={entry} />
        ))}
      </section>

      <section>
        <h2>Entries from the backend</h2>
        <button type="button" onClick={loadServerEntries}>
          Load from backend
        </button>
        {loadError && <p>{loadError}</p>}
        <ul>
          {serverEntries.map((entry) => (
        <li key={entry.id}>{entry.topic}</li>
        ))}
        </ul>
      </section>

      {/* Form Fields */}
      <section>
        <div>
          <label htmlFor="topic">Topic </label>
          <input
            id="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date">Date </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="learned">What I Learned </label>
          <textarea
            id="learned"
            value={learned}
            onChange={(event) => setLearned(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="confidence">Confidence (1–5) </label>
          <input
            id="confidence"
            type="number"
            min={1}
            max={5}
            value={confidence}
            onChange={(event) => setConfidence(Number(event.target.value))}
          />
        </div>

        <div>
          <label htmlFor="funLevel">Fun Level </label>
          <input
            id="funLevel"
            type="number"
            value={funLevel}
            onChange={(event) => setFunLevel(Number(event.target.value))}
          />
        </div>

        <button type="button" onClick={handleAddEntry}>
          Add entry
        </button>
      </section>
    </main>
  );
}