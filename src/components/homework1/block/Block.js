import React, { useState } from 'react'
import './blockStyles.scss';

const Block = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="block">
             <div className="block_content">
                <div className="tennis"></div>
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                        );
                    })}
                </div>
                <div className="date">30 ноября 2021 года</div>
                <div className="info">
                    It is a long established fact that a reader will be distracted 
                    by the readable content of a page when looking at its layout.
                </div>
                <button>Подробнее</button>
            </div>
        </div>
    )
}

export default Block;