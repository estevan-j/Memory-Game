import { useEffect, useRef, useState } from "react"
import { getImages } from "../helpers/getImages";
import confetti from 'canvas-confetti'
let size = 3;
let clicks = 0;

const Cards = ({start, score}) => {
    const [images, setImages] = useState(getImages(size));
    const [selected, setSelected] = useState([]);
    const [opened, setOpened] = useState([]);

    const handleClick = (item) => {
        if (start) {
            clicks += 1;
            if (selected.length < 2) {
                setSelected(selected => selected.concat(item)); 
            }
        }
    }

    useEffect(() => {
        if (selected.length == 2) {
            if (selected[0].split('|')[1] === selected[1].split('|')[1]) {
                setOpened(opened => opened.concat(selected));
            }
            setTimeout(() => setSelected([]), 1000) 
        }
    }, [selected])

    useEffect(() => {
        if (opened.length == images.length) {
            calculateScore();
            size += 2;
            clearArrays();
            setImages(getImages(size));

            confetti({
                particleCount: 200,
                startVelocity: 30,
                spread: 300,
                gravity: 1.5,
                origin: {y: 0}
            })
        }
    }, [])


    const calculateScore = () => {
        const passLevel = size * 10;
        let total = score.current;
        const cards = size * 2;
        if (clicks === cards) {
            total += (cards * 2) + passLevel;        
        } else if (clicks > cards && clicks < cards + 5) {
            total += cards + passLevel;
        } else if (clicks > cards+5 &&  clicks < clicks+10) {
            total += cards / 2 + passLevel;
        } else {
            total += Math.round(cards/ 3) + passLevel;
        }
        clicks = 0;
        score.current = total;
    }

    const clearArrays = () => {
        setSelected([]);
        setOpened([]);
    }
    let include = false;

  return (
    <div className="cards">
        <h2>Score: {score.current}</h2>
        <ul>
        {
            images.map((image, index) => (
                <li key={index} onClick={() => handleClick(image)}>
                    <div className="content">
                        {/* Condicion para mostra IMG If incluye en selected(Esta selecionada) o incluye open(Esta con su par) */}
                        { include = selected.includes(image) || opened.includes(image)}
                        <div className={`front ${include ? 'flip-front': ''}`}>
                            <img src= '/question.png' alt="icon" />
                        </div>
                        <div className={`back ${include? 'flip-back' : '' }`}>
                            <img src={include? image.split('|')[1]: '/question.png'} alt="icon" />
                        </div>
                    </div>
                </li>
            ))
        }
        </ul>
    </div>
  )
}

export default Cards
