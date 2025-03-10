"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample texts for different durations 
const sampleTexts = {
  short: [ // 1-2 minute texts
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Practice makes perfect when learning to type efficiently.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Good programmers write code that humans can understand.",
    "Typing practice is essential for improving your speed and accuracy on the keyboard. Regular practice helps you become more efficient in your daily tasks."
  ],
  medium: [ // 5 minute texts
    "The development of touch typing skills has become increasingly important in our digital age. As we spend more time interacting with computers, tablets, and smartphones, the ability to type quickly and accurately without looking at the keyboard has become a valuable skill. Learning to touch type involves proper finger placement, maintaining good posture, and consistent practice. The standard keyboard layout, known as QWERTY, was actually designed to prevent typewriter jams by placing frequently used letters apart from each other. Despite this historical quirk, it remains the dominant keyboard layout worldwide.",
    "Computer programming is both an art and a science. It requires logical thinking, problem-solving skills, and creativity. A good programmer must be able to break down complex problems into smaller, manageable pieces, then solve each piece systematically. This process, known as decomposition, is fundamental to software development. Additionally, programmers must consider factors such as code efficiency, maintainability, and scalability. Writing clean, well-documented code that other developers can understand and modify is just as important as making it work correctly.",
    "The history of computing spans centuries, from ancient calculating devices to modern quantum computers. Early mechanical computers, like Charles Babbage's Difference Engine, paved the way for electronic computing. The first electronic computer, ENIAC, filled an entire room and could perform thousands of calculations per second. Today's smartphones are millions of times more powerful, demonstrating the incredible pace of technological advancement. This progress continues with developments in artificial intelligence, machine learning, and quantum computing."
  ],
  long: [ // 15 minute texts
    "The evolution of human communication has been marked by several revolutionary developments throughout history. From the development of spoken language to the invention of writing systems, each advancement has fundamentally changed how humans interact and share information. The invention of the printing press by Johannes Gutenberg in the 15th century democratized access to knowledge and sparked a revolution in mass communication. The 19th century brought us the telegraph and telephone, enabling near-instantaneous communication across vast distances. The 20th century saw the rise of radio, television, and eventually the internet, which has transformed nearly every aspect of modern life. Today, we live in an interconnected world where information can be shared globally in seconds, social networks connect billions of people, and artificial intelligence is beginning to understand and generate human language. This digital revolution has not only changed how we communicate but has also impacted education, business, entertainment, and social relationships. As we look to the future, emerging technologies like augmented reality, brain-computer interfaces, and quantum communication promise to further revolutionize human interaction and information exchange. Understanding and adapting to these changes while maintaining meaningful human connections remains one of the key challenges of our time. The pace of technological advancement shows no signs of slowing, and our ability to effectively use these tools while preserving the essence of human communication will be crucial for future generations.",
    "The field of computer science has evolved dramatically since its inception in the mid-20th century. What began as a highly specialized discipline focused on complex calculations and data processing has grown into a diverse field that touches virtually every aspect of modern life. The fundamental principles of computing, such as algorithms, data structures, and programming languages, provide the foundation for everything from smartphone applications to artificial intelligence systems. Modern software development emphasizes not only technical excellence but also user experience, security, and ethical considerations. The rise of agile methodologies has transformed how software is developed, promoting iterative development, continuous feedback, and adaptation to change. Cloud computing has revolutionized how applications are deployed and scaled, enabling unprecedented access to computing resources. Machine learning and artificial intelligence represent the cutting edge of computer science, with applications in areas like natural language processing, computer vision, and autonomous systems. As technology continues to advance, new challenges emerge in areas such as quantum computing, cybersecurity, and ethical AI development. The integration of computer science with other fields, from biology to psychology, is creating new interdisciplinary areas of study and innovation. Understanding these developments and their implications is crucial for anyone working in technology or affected by its rapid advancement.",
    "The concept of sustainability has become increasingly central to discussions about the future of human civilization. As we face unprecedented environmental challenges, including climate change, biodiversity loss, and resource depletion, the need for sustainable practices across all sectors of society has never been more urgent. Sustainable development aims to meet the needs of the present without compromising the ability of future generations to meet their own needs. This involves balancing economic growth with environmental protection and social equity. The transition to renewable energy sources, such as solar and wind power, represents one of the most significant shifts toward sustainability. Sustainable agriculture practices are being developed to feed a growing global population while preserving soil health and biodiversity. In urban planning, concepts like smart cities and green building design are reshaping how we think about human habitation. The circular economy model promotes recycling, reuse, and reduction of waste, challenging the traditional linear economy of take-make-dispose. Corporate sustainability initiatives are becoming increasingly important as businesses recognize both the ethical imperative and economic opportunities in sustainable practices. Education plays a crucial role in promoting sustainability awareness and developing solutions to environmental challenges. The integration of technology in sustainability efforts, from environmental monitoring to energy efficiency, demonstrates how innovation can contribute to solving global challenges. As we move forward, the success of sustainability initiatives will depend on international cooperation, technological innovation, and individual commitment to more sustainable lifestyles."
  ]
};

// Sound effects
const keyPressSound = "/key-press.mp3";
const errorSound = "/error.mp3";
const completionSound = "/completion.mp3";

// Music tracks
const musicTracks = [
  {
    title: "Ambient Flow",
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Kevin_MacLeod_-_Cipher.mp3"
  },
  {
    title: "Focus Beat",
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3"
  },
  {
    title: "Calm Typing",
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3"
  }
];

interface TypingTestProps {
  customText?: string;
  mode?: "standard" | "challenge" | "lesson" | "custom";
  timeLimit?: number;
  onComplete?: (stats: { wpm: number; accuracy: number; errors: number }) => void;
}

const TypingTest = ({ 
  customText, 
  mode = "standard", 
  timeLimit = 60,
  onComplete 
}: TypingTestProps) => {
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMode, setCurrentMode] = useState(mode === "standard" ? "random" : "timed");
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(timeLimit);
  const [mobileInput, setMobileInput] = useState("");
  
  const textContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const keyPressAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);
  const completionAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Get appropriate text based on time limit
  const getTextForTimeLimit = useCallback(() => {
    let textPool;
    if (selectedTimeLimit <= 120) { // 1-2 minutes
      textPool = sampleTexts.short;
    } else if (selectedTimeLimit <= 300) { // 5 minutes
      textPool = sampleTexts.medium;
    } else { // 15 minutes
      textPool = sampleTexts.long;
    }
    return textPool[Math.floor(Math.random() * textPool.length)];
  }, [selectedTimeLimit]);

  // Initialize with text based on mode and time limit
  useEffect(() => {
    if (customText) {
      setText(customText);
    } else {
      resetTest();
    }
  }, [customText]);

  // Timer logic for timed mode
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Calculate WPM in real-time
  useEffect(() => {
    if (startTime && !endTime) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMinutes = (currentTime - startTime) / 60000;
        if (elapsedMinutes > 0) {
          // Words are standardized to 5 characters
          const words = currentIndex / 5;
          const currentWpm = Math.round(words / elapsedMinutes);
          setWpm(currentWpm);
        }
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [startTime, endTime, currentIndex]);

  // Handle music player
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
      
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Audio play failed, using silent mode");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted, currentTrack]);

  // Focus management for mobile
  useEffect(() => {
    const handleClick = () => {
      if (mobileInputRef.current) {
        mobileInputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const resetTest = useCallback(() => {
    // If custom text is provided, use it, otherwise select a random text based on time limit
    if (customText) {
      setText(customText);
    } else {
      setText(getTextForTimeLimit());
    }
    
    setStartTime(null);
    setEndTime(null);
    setCurrentIndex(0);
    setErrors(0);
    setAccuracy(100);
    setWpm(0);
    setIsCompleted(false);
    setProgress(0);
    setTimeRemaining(selectedTimeLimit);
    setIsTimerRunning(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Focus the text container
    if (textContainerRef.current) {
      textContainerRef.current.focus();
    }
  }, [customText, selectedTimeLimit, getTextForTimeLimit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isCompleted) return;

    // Prevent default behavior for most keys to avoid unwanted actions
    if (e.key !== 'Tab') {
      e.preventDefault();
    }

    // Start the timer on first keypress
    if (!startTime) {
      setStartTime(Date.now());
      if (currentMode === "timed" || mode === "challenge") {
        setIsTimerRunning(true);
        setTimeRemaining(selectedTimeLimit);
      }
    }

    // Handle the typed character
    if (e.key.length === 1) { // Only process single characters
      const expectedChar = text[currentIndex];
      
      if (e.key === expectedChar) {
        // Play key press sound
        if (keyPressAudioRef.current && !isMuted) {
          keyPressAudioRef.current.currentTime = 0;
          keyPressAudioRef.current.play().catch(e => {
            // Silent fail for audio
          });
        }
        
        setCurrentIndex(currentIndex + 1);
        const newProgress = ((currentIndex + 1) / text.length) * 100;
        setProgress(newProgress);
        
        // Check if test is completed
        if (currentIndex + 1 >= text.length) {
          completeTest();
        }
      } else {
        // Play error sound
        if (errorAudioRef.current && !isMuted) {
          errorAudioRef.current.currentTime = 0;
          errorAudioRef.current.play().catch(e => {
            // Silent fail for audio
          });
        }
        
        setErrors(errors + 1);
        // Calculate accuracy
        const totalAttempts = currentIndex + errors + 1;
        const newAccuracy = Math.max(0, Math.round(((totalAttempts - (errors + 1)) / totalAttempts) * 100));
        setAccuracy(newAccuracy);
      }
    }
  };

  // Handle mobile input changes
  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChar = e.target.value.slice(-1);
    if (newChar) {
      const expectedChar = text[currentIndex];
      
      if (newChar === expectedChar) {
        handleCorrectKey();
      } else {
        handleIncorrectKey();
      }
    }
    // Clear the input for next character
    setMobileInput("");
  };

  const handleCorrectKey = () => {
    // Play key press sound
    if (keyPressAudioRef.current && !isMuted) {
      keyPressAudioRef.current.currentTime = 0;
      keyPressAudioRef.current.play().catch(e => {
        // Silent fail for audio
      });
    }
    
    setCurrentIndex(currentIndex + 1);
    const newProgress = ((currentIndex + 1) / text.length) * 100;
    setProgress(newProgress);
    
    // Check if test is completed
    if (currentIndex + 1 >= text.length) {
      completeTest();
    }
  };

  const handleIncorrectKey = () => {
    // Play error sound
    if (errorAudioRef.current && !isMuted) {
      errorAudioRef.current.currentTime = 0;
      errorAudioRef.current.play().catch(e => {
        // Silent fail for audio
      });
    }
    
    setErrors(errors + 1);
    // Calculate accuracy
    const totalAttempts = currentIndex + errors + 1;
    const newAccuracy = Math.max(0, Math.round(((totalAttempts - (errors + 1)) / totalAttempts) * 100));
    setAccuracy(newAccuracy);
  };

  const completeTest = () => {
    if (!isCompleted) {
      setEndTime(Date.now());
      setIsCompleted(true);
      setIsTimerRunning(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Play completion sound
      if (completionAudioRef.current && !isMuted) {
        completionAudioRef.current.play().catch(e => {
          // Silent fail for audio
        });
      }
      
      // Calculate final stats
      if (startTime) {
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        // Words are standardized to 5 characters
        const words = currentIndex / 5;
        const finalWpm = Math.round(words / elapsedMinutes);
        setWpm(finalWpm);
        
        // Call onComplete callback if provided
        if (onComplete) {
          onComplete({
            wpm: finalWpm,
            accuracy,
            errors
          });
        }
      }
    }
  };

  const handleModeChange = (newMode: string) => {
    setCurrentMode(newMode);
    resetTest();
  };

  const handleTimeLimitChange = (limit: number) => {
    setSelectedTimeLimit(limit);
    setTimeRemaining(limit);
    resetTest();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Render different UI based on mode
  const renderModeControls = () => {
    if (mode !== "standard") {
      return null; // No mode controls for non-standard modes
    }
    
    return (
      <Tabs defaultValue="random" onValueChange={handleModeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="random">Random Text</TabsTrigger>
          <TabsTrigger value="timed">Timed Challenge</TabsTrigger>
        </TabsList>
        
        <TabsContent value="random" className="mt-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              Practice with random text passages. Type the text below as quickly and accurately as possible.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="timed" className="mt-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Challenge yourself with a timed test. Select your preferred duration:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedTimeLimit === 60 ? "default" : "outline"} 
                onClick={() => handleTimeLimitChange(60)}
                size="sm"
              >
                1 Minute
              </Button>
              <Button 
                variant={selectedTimeLimit === 120 ? "default" : "outline"} 
                onClick={() => handleTimeLimitChange(120)}
                size="sm"
              >
                2 Minutes
              </Button>
              <Button 
                variant={selectedTimeLimit === 300 ? "default" : "outline"} 
                onClick={() => handleTimeLimitChange(300)}
                size="sm"
              >
                5 Minutes
              </Button>
              <Button 
                variant={selectedTimeLimit === 900 ? "default" : "outline"} 
                onClick={() => handleTimeLimitChange(900)}
                size="sm"
              >
                15 Minutes
              </Button>
            </div>
            {isTimerRunning && (
              <div className="mt-4 text-center">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {formatTime(timeRemaining)}
                </Badge>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    );
  };

  // Render timer for challenge mode
  const renderTimer = () => {
    if ((mode === "challenge" || currentMode === "timed") && isTimerRunning) {
      return (
        <div className="text-center mb-4">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {formatTime(timeRemaining)}
          </Badge>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection - only for standard mode */}
      {renderModeControls()}

      {/* Timer Display */}
      {renderTimer()}

      {/* Stats Display */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 text-center border">
          <p className="text-sm text-muted-foreground">WPM</p>
          <p className="text-3xl font-bold">{wpm}</p>
        </div>
        <div className="bg-card rounded-lg p-4 text-center border">
          <p className="text-sm text-muted-foreground">Accuracy</p>
          <p className="text-3xl font-bold">{accuracy}%</p>
        </div>
        <div className="bg-card rounded-lg p-4 text-center border">
          <p className="text-sm text-muted-foreground">Errors</p>
          <p className="text-3xl font-bold">{errors}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Text Display and Input Area */}
      <div 
        ref={textContainerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn(
          "bg-card p-6 rounded-lg border shadow-sm outline-none transition-colors relative",
          "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          isCompleted && "pointer-events-none opacity-50"
        )}
      >
        {/* Mobile Input (hidden but functional) */}
        <input
          ref={mobileInputRef}
          type="text"
          value={mobileInput}
          onChange={handleMobileInput}
          className="opacity-0 absolute top-0 left-0 h-full w-full cursor-default"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          aria-label="Type here"
        />
        
        <p className="text-lg leading-relaxed font-mono select-none whitespace-pre-wrap">
          {text.split("").map((char, index) => {
            let className = "";
            
            if (index < currentIndex) {
              className = "text-green-500 dark:text-green-400"; // Correct
            } else if (index === currentIndex) {
              className = "bg-primary/20 text-primary underline"; // Current
            }
            
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {/* Reset Button for Completed Test */}
      {isCompleted && (
        <div className="flex justify-center">
          <Button onClick={resetTest} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      )}

      {/* Music Player */}
      <div className="bg-card p-4 rounded-lg border mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Background Music</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          {musicTracks.map((track, index) => (
            <Button
              key={index}
              variant={currentTrack === index ? "default" : "outline"}
              size="sm"
              onClick={() => changeTrack(index)}
              className={cn(
                "justify-start overflow-hidden",
                currentTrack === index && isPlaying ? "animate-pulse" : ""
              )}
            >
              {track.title}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="flex-1"
          />
        </div>
      </div>

      {/* Audio Elements */}
      <audio ref={audioRef} src={musicTracks[currentTrack].src} loop />
      <audio ref={keyPressAudioRef} src={keyPressSound} />
      <audio ref={errorAudioRef} src={errorSound} />
      <audio ref={completionAudioRef} src={completionSound} />
    </div>
  );
};

export default TypingTest;
