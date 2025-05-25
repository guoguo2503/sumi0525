"use client";

import { useState, useEffect } from "react";
import { INSPIRATION_PROMPTS } from "@/lib/constants";

export function useRandomPrompt() {
  const [currentPrompt, setCurrentPrompt] = useState(() => {
    // Set initial prompt immediately
    const randomIndex = Math.floor(Math.random() * INSPIRATION_PROMPTS.length);
    return INSPIRATION_PROMPTS[randomIndex];
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Ensure we have a prompt on client side
    if (!currentPrompt) {
      const randomIndex = Math.floor(Math.random() * INSPIRATION_PROMPTS.length);
      setCurrentPrompt(INSPIRATION_PROMPTS[randomIndex]);
    }
  }, [currentPrompt]);

  const getNewPrompt = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      // Get a new prompt that's different from the current one
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * INSPIRATION_PROMPTS.length);
      } while (INSPIRATION_PROMPTS[newIndex] === currentPrompt);
      
      setCurrentPrompt(INSPIRATION_PROMPTS[newIndex]);
      setIsTransitioning(false);
    }, 500); // Duration of fade-out transition
  };

  return { currentPrompt, isTransitioning, getNewPrompt };
}