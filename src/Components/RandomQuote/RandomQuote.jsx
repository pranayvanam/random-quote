import React, { useState, useEffect } from 'react'; 
import './RandomQuote.css';
import twitter_icon from '../Assets/twitterx.png';
import reload_icon from '../Assets/reload.png';

const RandomQuote = () => {
    const [quote, setQuote] = useState({
        text: "Difficulties increase the nearer we get to the goal.",
        author: "Johann Wolfgang von Goethe",
    });
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const loadQuotes = async () => {
            const response = await fetch("https://type.fit/api/quotes");
            const quotesData = await response.json();
            setQuotes(quotesData);
        };
        loadQuotes();
    }, []);

    const random = () => {
        if (quotes.length > 0) {
            const select = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(select);
        }
    };

    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text} -${quote.author.split(',')[0]}`);
    };

    return (
        <div className='container'>
            <div className='quote'>{quote.text}</div>
            <div>
                <div className='line'></div>
                <div className='bottom'>
                    <div className='author'>- {quote.author.split(',')[0]}</div>
                    <div className='icons'>
                        <img src={reload_icon} alt="Reload" onClick={random} />
                        <img src={twitter_icon} alt="Twitter" onClick={twitter} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomQuote;
