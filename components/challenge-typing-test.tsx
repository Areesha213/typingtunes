"use client";

import { useState, useEffect } from "react";
import TypingTest from "@/components/typing-test";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";

// Challenge-specific texts
const challengeTexts = {
  beginner: {
    "b1": "asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;",
    "b2": "the and that have with this from they will some what about when there which their said them could into more then these would other time than look only some",
    "b3": "The sun is shining. Birds are singing. I love to read books. She plays the piano. They went to the store. We are having dinner. He runs every morning. The cat sleeps all day."
  },
  intermediate: {
    "i1": "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Bright vixens jump; dozy fowl quack. Sphinx of black quartz, judge my vow.",
    "i2": "Accuracy is more important than speed. Focus on making each keystroke deliberate and precise. Maintain a steady rhythm and don't rush. Keep your eyes on the text, not your fingers. Breathe and stay relaxed.",
    "i3": "Type these numbers: 12345 67890. Now some symbols: !@#$% ^&*(). Mix them together: a1b2c3 !d4e5? 67%8*9. Practice makes perfect when typing special characters and numbers on your keyboard."
  },
  advanced: {
    "a1": "function calculateFactorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  }\n  return n * calculateFactorial(n - 1);\n}\n\nconst result = calculateFactorial(5);\nconsole.log(`The factorial of 5 is ${result}`);",
    "a2": "The exploration of space has captivated humanity's imagination for centuries. From the early astronomers who mapped the stars to modern missions to Mars, our quest to understand the cosmos continues to evolve. The challenges of interplanetary travel are immense, requiring innovations in propulsion, life support, and radiation protection. Despite these obstacles, the potential rewards—scientific discovery, resource utilization, and perhaps even finding extraterrestrial life—drive us forward into the final frontier.",
    "a3": "The implementation of quantum computing algorithms represents a paradigm shift in computational methodology. Unlike classical bits, quantum bits (qubits) can exist in superpositions of states, enabling parallel processing capabilities that exponentially increase with each additional qubit. This characteristic makes quantum computers particularly adept at solving complex problems in cryptography, molecular modeling, and optimization theory that would be intractable for traditional computing architectures."
  }
};

// Challenge durations in seconds
const challengeDurations = {
  "b1": 60, // 1 minute
  "b2": 120, // 2 minutes
  "b3": 300, // 5 minutes
  "i1": 120, // 2 minutes
  "i2": 300, // 5 minutes
  "i3": 180, // 3 minutes
  "a1": 300, // 5 minutes
  "a2": 900, // 15 minutes
  "a3": 600  // 10 minutes
};

interface ChallengeTypingTestProps {
  challengeId: string;
  onComplete?: () => void;
}

const ChallengeTypingTest = ({ challengeId, onComplete }: ChallengeTypingTestProps) => {
  const [challengeText, setChallengeText] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ wpm: 0, accuracy: 0, errors: 0 });
  const [achievement, setAchievement] = useState("");

  useEffect(() => {
    // Determine the challenge level and set the appropriate text
    let text = "";
    let duration = 60;
    
    if (challengeId.startsWith("b")) {
      text = challengeTexts.beginner[challengeId as keyof typeof challengeTexts.beginner] || "";
    } else if (challengeId.startsWith("i")) {
      text = challengeTexts.intermediate[challengeId as keyof typeof challengeTexts.intermediate] || "";
    } else if (challengeId.startsWith("a")) {
      text = challengeTexts.advanced[challengeId as keyof typeof challengeTexts.advanced] || "";
    }
    
    // Set the time limit based on the challenge
    duration = challengeDurations[challengeId as keyof typeof challengeDurations] || 60;
    
    setChallengeText(text);
    setTimeLimit(duration);
  }, [challengeId]);

  const handleTestComplete = (stats: { wpm: number; accuracy: number; errors: number }) => {
    setResults(stats);
    setShowResults(true);
    
    // Determine achievement based on results
    if (stats.wpm > 80 && stats.accuracy > 95) {
      setAchievement("Typing Master");
    } else if (stats.wpm > 60 && stats.accuracy > 90) {
      setAchievement("Speed Demon");
    } else if (stats.wpm > 40 && stats.accuracy > 85) {
      setAchievement("Steady Typist");
    } else {
      setAchievement("Practice Makes Perfect");
    }
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {showResults ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Challenge Results
            </CardTitle>
            <CardDescription>
              Here's how you performed in this challenge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 text-center border">
                <p className="text-sm text-muted-foreground">WPM</p>
                <p className="text-3xl font-bold">{results.wpm}</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center border">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-3xl font-bold">{results.accuracy}%</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center border">
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-3xl font-bold">{results.errors}</p>
              </div>
            </div>
            
            <div className="bg-primary/10 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-2">
                <div className="flex">
                  {[...Array(Math.min(5, Math.ceil(results.wpm / 20)))].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                  ))}
                  {[...Array(Math.max(0, 5 - Math.ceil(results.wpm / 20)))].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-muted-foreground" />
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{achievement}</h3>
              <p className="text-muted-foreground">
                {results.wpm < 30 
                  ? "Keep practicing to improve your speed and accuracy!" 
                  : results.wpm < 60 
                    ? "Good job! You're making progress." 
                    : "Excellent work! You're becoming a typing master."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <TypingTest 
          customText={challengeText} 
          mode="challenge" 
          timeLimit={timeLimit}
          onComplete={handleTestComplete}
        />
      )}
    </div>
  );
};

export default ChallengeTypingTest;