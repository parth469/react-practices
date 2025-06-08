import { useState } from "react";

interface FAQ {
    question: string;
    answer: string;
    id: number;
}

const FAQ_DATA: FAQ[] = [
    {
        question: "How many bones does a cat have?",
        answer: "A cat has 230 bones - 6 more than a human",
        id: 1,
    },
    {
        question: "How much do cats sleep?",
        answer: "The average cat sleeps 12-16 hours per day",
        id: 2,
    },
    {
        question: "How long do cats live",
        answer: "Outdoor cats live 5 years on average. Indoor cats live 15 years on average.",
        id: 3,
    },
];

const QuestionComponent = ({
    FAQ_RECORD,
    isAnswerOpen,
    toggleAnswer,
}: {
    FAQ_RECORD: FAQ;
    isAnswerOpen: boolean;
    toggleAnswer: (id: number) => void;
}) => {
    const { question, answer, id } = FAQ_RECORD;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => toggleAnswer(id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleAnswer(id)}
            className={`cursor-pointer p-2 rounded ${isAnswerOpen ? "bg-gray-100" : ""}`}
        >
            <div className="flex items-center">
                <span>{!isAnswerOpen ? "➡️" : "⬇️"}</span>
                <span className="ml-2 font-bold">{question}</span>
            </div>
            {isAnswerOpen && (
                <div className="ml-5 mt-1 font-thin transition-all duration-300 ease-in-out">
                    {answer}
                </div>
            )}
        </div>
    );
};

export const FAQComponent = ({
    isMulti,
    faqData = FAQ_DATA,
}: {
    isMulti: boolean;
    faqData?: FAQ[];
}) => {
    const [isOpen, setIsOpen] = useState<number[]>([0]);

    const toggleAnswer = (id: number) => {
        if (isMulti) {
            setIsOpen((prev) =>
                prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
            );
        } else {
            setIsOpen((prev) => (prev.includes(id) ? [] : [id]));
        }
    };

    return (
        <div>
            {faqData.map((question) => (
                <QuestionComponent
                    FAQ_RECORD={question}
                    key={question.id}
                    isAnswerOpen={isOpen.includes(question.id)}
                    toggleAnswer={toggleAnswer}
                />
            ))}
        </div>
    );
};
