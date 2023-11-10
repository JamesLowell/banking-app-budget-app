import React, { useState, useEffect } from 'react';
import { FaRandom } from "react-icons/fa"; 

export default function RandomQuotes() {
  const quotes = [
    "\"Put not your trust in money, but put your money in trust.\"",
    "\"The best way to rob a bank is to own one.\"",
    "\"When you put good will out there, it's amazing what can be accomplished.\"",
    "\"A bank is a place that will lend you money if you can prove that you don't need it.\"",
    "\"Mananatiling ikaw, kahit 'di ka nakikita araw araw\""
  ];

  const [randomQuote, setRandomQuote] = useState(quotes[0]);
  const [, setQuoteContainerOpacity] = useState(0);

  // Function to change the quote with a fade-in effect
  const changeQuote = () => {
    setQuoteContainerOpacity(0);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
      setQuoteContainerOpacity(1);
    }, 500);
  };

  // Trigger the initial quote change on component mount
  useEffect(() => {
    changeQuote();
  }, []);

  return (
    <div style={{display:'flex', flexDirection:'column',gap:'.3rem', alignItems:'center'}}>
      <span>{randomQuote}</span>
      <button style={{cursor:'pointer'}}onClick={changeQuote}><FaRandom/></button>
    </div>
  );
}