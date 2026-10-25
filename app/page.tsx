'use client';
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [lang, setLang] = useState('Roman Urdu');
  const [words, setWords] = useState('600');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!topic) return alert('Topic likho yaar!');
    setLoading(true);
    
    setTimeout(() => {
      const w = parseInt(words);
      const isEnglish = lang === 'English' || topic.toLowerCase().includes('english');
      
      let s = `🎬 TOPIC: ${topic}\n📝 Language: ${lang} | Words: ${w}\n\n`;

      if(isEnglish) {
        s += `HOOK (0:00-0:40) - This is about ${topic}. What I'm about to tell you will change how you think.\n\n`;
        s += `STORY (0:40-2:30) - Let's talk about ${topic} in detail. Most people ignore this. They think it's normal. But the truth is hidden. Imagine you are there. Everything is happening around ${topic}. You need to understand the reality behind it.\n\n`;
        s += `DEEP DIVE (2:30-${w>600?'5:00':'3:30'}) - Here are 3 powerful points about ${topic}:\n1. The hidden truth no one tells you.\n2. The mistake 99% people make about ${topic}.\n3. The secret method that actually works.\n\nThe story of ${topic} is not just a story, it's a lesson. If you focus, you will get something that others missed.\n\n`;
        s += `ENDING (${w>600?'5:00-6:00':'3:30-4:00'}) - So what do you think about ${topic}? Comment below. Want more videos on ${topic}? Type "${topic} Part 2".`;
      } else {
        s += `HOOK [0:00-0:45] - ${topic}... Ye lafz sunne me aam lagta hai, lekin iske peeche ek aisi kahani hai jo aapko hila degi. Kya aap tayar hain?\n\n`;
        s += `KAHANI [0:45-2:30] - Baat hai ${topic} ki. Log samajhte hain ye aam si baat hai. Lekin haqeeqat kuch aur hai. Socho zara... ${topic} ke bare me jo me batane wala hun, wo aaj se pehle aapne kahin nahi suna hoga. Har lafz me
