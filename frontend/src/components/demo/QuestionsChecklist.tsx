import React, { useState } from "react";
import { CheckSquare, Square, Copy, Check, MessageSquare } from "lucide-react";

interface QuestionsChecklistProps {
  questions: string[];
  questionsHi?: string[];
  language: string;
}

export const QuestionsChecklist: React.FC<QuestionsChecklistProps> = ({
  questions,
  questionsHi,
  language
}) => {
  const [checkedIndices, setCheckedIndices] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const activeQuestions = language === "hi" && questionsHi ? questionsHi : questions;

  const toggleCheck = (idx: number) => {
    setCheckedIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const copyToClipboard = () => {
    const text = activeQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded border border-rule bg-[#FAF7F0] p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-rule pb-2 mb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-vermilion" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
            QUESTIONS TO ASK YOUR DOCTOR OR PHARMACIST
          </h4>
        </div>

        <button
          onClick={copyToClipboard}
          data-cursor="link"
          className="inline-flex items-center gap-1 rounded border border-rule bg-paper px-2 py-0.5 font-mono text-[10px] text-ink/70 hover:text-ink hover:border-ink transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-sage" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Copied" : "Copy checklist"}</span>
        </button>
      </div>

      <p className="font-sans text-xs text-ink/70 mb-3">
        Take these suggested questions to your next appointment or pharmacy visit:
      </p>

      <ul className="space-y-2 font-sans text-xs">
        {activeQuestions.map((question, idx) => {
          const isChecked = !!checkedIndices[idx];
          return (
            <li
              key={idx}
              onClick={() => toggleCheck(idx)}
              data-cursor="link"
              className={`flex items-start gap-2.5 rounded p-2 transition-colors cursor-pointer ${
                isChecked ? "bg-rule/20 text-ink/50" : "hover:bg-paper text-ink"
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-ink/60 focus:outline-none"
                aria-label={`Toggle check for question ${idx + 1}`}
              >
                {isChecked ? (
                  <CheckSquare className="h-4 w-4 text-sage" />
                ) : (
                  <Square className="h-4 w-4 text-ink/40" />
                )}
              </button>
              <span className={`leading-relaxed ${isChecked ? "line-through" : ""}`}>
                {question}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
