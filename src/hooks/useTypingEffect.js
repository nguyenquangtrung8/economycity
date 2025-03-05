// src/hooks/useTypingEffect.js
import { useState, useEffect } from 'react';

export const useTypingEffect = (texts = [], typingSpeed = 100, displayDuration = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Hiệu ứng gõ chữ
  useEffect(() => {
    if (isFadingOut || !texts.length) return;

    const currentText = texts[currentIndex];
    let index = 0;

    const typingTimer = setInterval(() => {
      setDisplayText(currentText.slice(0, index));
      index++;
      if (index > currentText.length) {
        clearInterval(typingTimer);
        // Hiển thị text hoàn chỉnh trong một khoảng thời gian
        setTimeout(() => setIsFadingOut(true), displayDuration);
      }
    }, typingSpeed);

    return () => clearInterval(typingTimer);
  }, [currentIndex, isFadingOut, texts, typingSpeed, displayDuration]);

  // Xử lý fade out và chuyển text tiếp theo
  useEffect(() => {
    if (!isFadingOut || !texts.length) return;

    const fadeOutTimer = setTimeout(() => {
      setDisplayText('');
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setIsFadingOut(false);
    }, 500); // Thời gian fade out

    return () => clearTimeout(fadeOutTimer);
  }, [isFadingOut, texts.length]);

  return {
    displayText,
    isFadingOut,
    currentText: texts[currentIndex] || '',
    isTyping: !isFadingOut && displayText !== texts[currentIndex]
  };
};