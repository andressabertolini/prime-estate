import { useState, useEffect } from "react";

interface ChoiceChipsProps {
    purposeValue: (value: string) => void;
}

const ChoiceChips: React.FC<ChoiceChipsProps> = ({purposeValue}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [purpose, setPurpose] = useState('for-rent');

    const handleChipClick = (e: React.MouseEvent<HTMLButtonElement>, index: number, purpose: string) => {
        e.preventDefault();
        setActiveIndex(index);
        setPurpose(purpose);
        purposeValue(purpose);
    }

    useEffect(() => {
        purposeValue(purpose);
    },[]);

    return(
        <div className="choice-chips">
            <div className="choice-chip__bg" style={{left: `${activeIndex * 50}%`}}></div>
            <button className={`choice-chip ${activeIndex === 0 ? 'active' : ''}`} onClick={(e) => handleChipClick(e, 0, 'for-rent')}>Rent</button>
            <button className={`choice-chip ${activeIndex === 1 ? 'active' : ''}`} onClick={(e) => handleChipClick(e, 1, 'for-sale')}>Buy</button>
            <input className="choice-chip__value" type="hidden" value={purpose} />
        </div>
    );
}

export default ChoiceChips;