import LearningEntry from "./components/LearningEntry";

function App() {
  const studentName: string = "Lassi Lahtinen";

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <LearningEntry
        topic="React Components"
        date="2026-10-19"
        learned="Components help divide the UI into reusable parts."
        confidence={3}
        funLevel={4}
      />

    <LearningEntry
        topic="Testin reusablity"
        date="2026-10-20"
        learned="Components can be reused"
        confidence={5}
        funLevel={7}
      />

    </main>
  );
}

export default App;