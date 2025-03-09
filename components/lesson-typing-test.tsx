"use client";

import { useState, useEffect } from "react";
import TypingTest from "@/components/typing-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

// Lesson-specific texts and instructions
const lessonTexts = {
  fundamentals: {
    "f1": {
      text: "Sit up straight. Keep wrists elevated. Position fingers on home row. Use thumbs for space bar.",
      instructions: "Focus on maintaining proper posture and hand position while typing. Don't worry about speed yet."
    },
    "f2": {
      text: "asdf jkl; asdf jkl; fjdk sl;a fjdk sl;a asdf jkl; fjdk sl;a asdf ;lkj fdsa",
      instructions: "Keep your fingers on the home row keys. Each finger should be responsible for specific keys."
    },
    "f3": {
      text: "qwert asdfg poiuy ;lkjh qwert asdfg poiuy ;lkjh qwert asdfg poiuy ;lkjh",
      instructions: "Practice reaching from the home row to the top row. Return your fingers to the home row after each keystroke."
    }
  },
  intermediate: {
    "i1": {
      text: "zxcvb nm,. zxcvb nm,. zxcvb nm,. asdfg hjkl; qwert yuiop zxcvb nm,.",
      instructions: "Practice reaching from the home row to the bottom row. Focus on accuracy rather than speed."
    },
    "i2": {
      text: "1234567890 !@#$%^&*() 1234567890 !@#$%^&*() 1234 !@#$ 5678 %^&* 90 ()",
      instructions: "Practice typing numbers and symbols. Pay attention to which finger is used for each key."
    },
    "i3": {
      text: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
      instructions: "Focus on maintaining a steady rhythm while typing. Try to increase your speed gradually."
    }
  },
  advanced: {
    "a1": {
      text: "The five boxing wizards jump quickly. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow.",
      instructions: "Focus on accuracy with these challenging pangrams. Aim for 100% accuracy even if you need to type slowly."
    },
    "a2": {
      text: "function main() {\n  console.log('Hello, World!');\n  return 0;\n}\n\nconst result = main();",
      instructions: "Practice typing code with proper indentation and special characters. Pay attention to syntax details."
    },
    "a3": {
      text: "The exploration of space has captivated humanity's imagination for centuries. From the early astronomers who mapped the stars to modern missions to Mars, our quest to understand the cosmos continues to evolve.",
      instructions: "Build typing stamina with longer passages. Focus on maintaining speed and accuracy throughout."
    }
  }
};

interface LessonTypingTestProps {
  lessonId: string;
  stepIndex: number;
  onComplete?: (stats: { wpm: number; accuracy: number; errors: number }) => void;
}

const LessonTypingTest = ({ lessonId, stepIndex, onComplete }: LessonTypingTestProps) => {
  const [lessonText, setLessonText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ wpm: 0, accuracy: 0, errors: 0 });
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "warning" | "info">("info");

  useEffect(() => {
    // Determine the lesson level and set the appropriate text
    let text = "";
    let lessonInstructions = "";
    
    if (lessonId.startsWith("f")) {
      const lessonData = lessonTexts.fundamentals[lessonId as keyof typeof lessonTexts.fundamentals];
      if (lessonData) {
        text = lessonData.text;
        lessonInstructions = lessonData.instructions;
      }
    } else if (lessonId.startsWith("i")) {
      const lessonData = lessonTexts.intermediate[lessonId as keyof typeof lessonTexts.intermediate];
      if (lessonData) {
        text = lessonData.text;
        lessonInstructions = lessonData.instructions;
      }
    } else if (lessonId.startsWith("a")) {
      const lessonData = lessonTexts.advanced[lessonId as keyof typeof lessonTexts.advanced];
      if (lessonData) {
        text = lessonData.text;
        lessonInstructions = lessonData.instructions;
      }
    }
    
    // Modify text based on step index for progressive lessons
    if (stepIndex > 0 && text) {
      // For simplicity, we'll just use the same text for all steps
      // In a real application, you might have different text for each step
      setLessonText(text);
    } else {
      setLessonText(text);
    }
    
    setInstructions(lessonInstructions);
  }, [lessonId, stepIndex]);

  const handleTestComplete = (stats: { wpm: number; accuracy: number; errors: number }) => {
    setResults(stats);
    setShowResults(true);
    
    // Determine feedback based on results
    if (stats.accuracy < 80) {
      setFeedback("Focus on accuracy before speed. Take your time and make sure each keystroke is correct.");
      setFeedbackType("warning");
    } else if (stats.wpm < 20) {
      setFeedback("Good accuracy! Now try to increase your speed gradually while maintaining accuracy.");
      setFeedbackType("info");
    } else {
      setFeedback("Excellent work! You're making great progress with both speed and accuracy.");
      setFeedbackType("success");
    }
    
    if (onComplete) {
      onComplete(stats);
    }
  };

  const handleRetry = () => {
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {/* Instructions Card */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Lesson Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{instructions}</p>
        </CardContent>
      </Card>
      
      {showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>Lesson Results</CardTitle>
            <CardDescription>
              Here's how you performed in this lesson step
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
            
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              feedbackType === "success" ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300" :
              feedbackType === "warning" ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300" :
              "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
            }`}>
              {feedbackType === "success" ? (
                <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              ) : feedbackType === "warning" ? (
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              ) : (
                <HelpCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="font-medium">Instructor Feedback</p>
                <p className="mt-1">{feedback}</p>
              </div>
            </div>
            
            <Button onClick={handleRetry} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <TypingTest 
          customText={lessonText} 
          mode="lesson" 
          onComplete={handleTestComplete}
        />
      )}
    </div>
  );
};

export default LessonTypingTest;