type LearningEntryProps = {
    topic: string;
    date: string;
    learned: string;
    confidence: number;
    funLevel: number;
};

function LearningEntry({ topic,date,learned,confidence, funLevel }: LearningEntryProps) {
    return (
    <article>
        <h2>{topic}</h2>
        <p>Date: {date}</p>
        <p>{learned}</p>
        <p>Confidence: {confidence} / 5</p>
        <p>Fun Level: {funLevel} / 10</p>
    </article>
    );
}

export default LearningEntry;