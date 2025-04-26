"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InputPage: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("あなたにはまだまだ伸び代があります 🌱");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    setIsLoading(true);
    setShowResult(false);
    // 本当はここでAPIを呼ぶ
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒待機
    setResult("あなたにはまだまだ伸び代があります 🌱");
    setIsLoading(false);
    setShowResult(true);
  };
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4 bg-white w-150 py-8 shadow-md p-4 rounded-lg">
        <h1 className="my-5 text-lg font-bold">
          辛かったことをここに書いてみよう
        </h1>
        <textarea
          placeholder="今日はなんか上手くいかない..."
          className="textarea textarea-md w-100 h-50 bg-white my-10 rounded-xl"
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
