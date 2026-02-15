import { useState } from "react";

export default function ColorBox({ initialColor, colorOptions }) {
    const [color, setColor] = useState(initialColor);

    const changeColor = () => {
        const randomIndex = Math.floor(Math.random() * colorOptions.length);
        setColor(colorOptions[randomIndex]);
    };

    return (
        <div>
            <div
                style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: color,
                    border: "2px solid black",
                    marginBottom: "10px",
                }}
            ></div>

            <button onClick={changeColor}>Changer de couleur</button>
        </div>
    );
}
