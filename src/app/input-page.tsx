"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InputPage: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("あなたにはまだまだ伸び代があります 🌱");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleConvert = async () => {
    if (!input.trim()) return; // 入力ないときは何もしない

    setIsLoading(true);
    setShowResult(false);

    const res = await fetch("/api/open-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    const content =
      data.choices?.[0]?.message?.content || "うまく変換できませんでした。";

    setResult(content);
    setShowResult(true);
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4 bg-white md:w-150 w-[90vw] py-8 shadow-md p-4 rounded-lg">
        <h1 className="my-5 text-lg font-bold">
          辛かったことをここに書いてみよう
        </h1>
        <textarea
          placeholder="今日はなんか上手くいかない..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="textarea textarea-md md:w-100 w-[80vw] h-50 bg-white my-10 rounded-xl"
          style={{
            backgroundColor: "#fffdf9",
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.05)",
          }}
        ></textarea>
        <button
          className="btn btn-secondary shadow-md mb-10 hover:scale-110 transition-transform active:scale-90 font-normal w-60"
          onClick={handleConvert}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            "🦋 ポジティブ変換する"
          )}
        </button>
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="bg-green-50 border-l-4 border-green-400 p-4 rounded text-sm shadow"
            >
              💡 {result}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InputPage;
