import ChoiceChips from "./ChoiceChips";
import IconMagnifyingGlass from "../assets/icons/icon-magnifying-glass.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [purpose, setPurpose] = useState("");
    const [rangeMin, setRangeMin] = useState(100);
    const [rangeMax, setRangeMax] = useState(50000);
    const [priceRange, setPriceRange] = useState(50000);
    const [homeType, setHomeType] = useState("apartment");

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const [isOpen2, setIsOpen2] = useState(false);
    const [beds, setBeds] = useState(0);
    const toggleDropdown2 = () => setIsOpen2(!isOpen2);

    const [sqft, setSqft] = useState(5000);

    const calculatePercentage = () => 
        ((priceRange - rangeMin) / (rangeMax - rangeMin)) * 100;

    const percentage = () => ((sqft - 1) / (5000 - 1)) * 100;

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/properties?query=${query}&purpose=${purpose}&homeType=${homeType}&priceLimit=${priceRange}&beds=${beds}&baths=${baths}&sqft=${sqft}`);
    };

    const handlePurposeValue = (data) => {
        setPurpose(data);
        if (data === "for-sale") {
            setRangeMin(1000);
            setRangeMax(5000000);
            setPriceRange(5000000);
        } else if (data === "for-rent") {
            setRangeMin(100);
            setRangeMax(50000);
            setPriceRange(50000);
        }
    };

    const handleSelect = (type) => {
        setHomeType(type);
        setIsOpen(false);
    }

    const handleSelect2 = (number) => {
        if (number == 5){
            number = `${number}+`;
        }
        setBeds(number);
        setIsOpen2(false);
    }

    const [isOpen3, setIsOpen3] = useState(false);
    const [baths, setBaths] = useState(0);

    const handleDropdown3 = (baths) => {
        if (baths == 5){
            baths = `${baths}+`;
        }
        setBaths(baths);
        setIsOpen3(false);
    }

    return (
        <div className="search">
            <h1>Search for your dream home</h1>
            <form onSubmit={handleSubmit}>
                <div className="search-bar__container">
                    <input 
                        type="text" 
                        className="search-bar" 
                        placeholder="city, address, postal code or ID" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <img src={IconMagnifyingGlass} alt="Search Icon" />
                </div>
                <ChoiceChips purposeValue={handlePurposeValue} />
                <div className="search-options">
                    <label>
                        <span className="label-large">Home type</span>
                        <div className="custom-select">
                            <div className="custom-select__trigger" onClick={toggleDropdown}>
                                <span>{homeType.charAt(0).toUpperCase() + homeType.slice(1)}</span>
                                <div className="arrow"></div>
                            </div>
                            {isOpen && (
                                <div className="custom-options">
                                    <div className="custom-option" onClick={() => handleSelect('apartment')}>Apartment</div>
                                    <div className="custom-option" onClick={() => handleSelect('house')}>House</div>
                                </div>
                            )}
                            
                        </div>
                    </label>
                    <label>
                        <span className="label-small">Beds</span>
                        <div className="custom-select">
                            <div className="custom-select__trigger" onClick={toggleDropdown2}>
                                <span>{beds}</span>
                                <div className="arrow"></div>
                            </div>
                            {isOpen2 && (
                                <div className="custom-options">
                                    <div className="custom-option" onClick={() => handleSelect2(0)}>0</div>
                                    <div className="custom-option" onClick={() => handleSelect2(1)}>1</div>
                                    <div className="custom-option" onClick={() => handleSelect2(2)}>2</div>
                                    <div className="custom-option" onClick={() => handleSelect2(3)}>3</div>
                                    <div className="custom-option" onClick={() => handleSelect2(4)}>4</div>
                                    <div className="custom-option" onClick={() => handleSelect2(5)}>5+</div>
                                </div>
                            )}
                        </div>

                    </label>
                    <label>
                        <span className="label-large">Price limit</span>
                        <div className="search-options__range">
                            <input 
                                type="range" 
                                min={rangeMin} 
                                max={rangeMax} 
                                step={100} 
                                value={priceRange} 
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #1296a9 ${calculatePercentage()}%, #8d8c8c ${calculatePercentage()}%)`,
                                }}
                            />
                            <p>${priceRange.toLocaleString('en-US')}</p>
                        </div>
                    </label>
                    <label>
                        <span className="label-small">Baths</span>
                        <div className="custom-select">
                            <div className="custom-select__trigger" onClick={() => {setIsOpen3(!isOpen3)}}>
                                <span>{baths}</span>
                                <div className="arrow"></div>
                            </div>
                            {isOpen3 && (
                                <div className="custom-options">
                                    <div className="custom-option" onClick={() => handleDropdown3(0)}>0</div>
                                    <div className="custom-option" onClick={() => handleDropdown3(1)}>1</div>
                                    <div className="custom-option" onClick={() => handleDropdown3(2)}>2</div>
                                    <div className="custom-option" onClick={() => handleDropdown3(3)}>3</div>
                                    <div className="custom-option" onClick={() => handleDropdown3(4)}>4</div>
                                    <div className="custom-option" onClick={() => handleDropdown3(5 )}>5+</div>
                                </div>
                            )}
                        </div>
                    </label>
                    <label>
                        <span className="label-large">Square feet</span>
                        <div className="search-options__range">
                            <input 
                                type="range" 
                                min={1}
                                max={5000}
                                step={1}
                                value={sqft}
                                onChange={(e) => {setSqft(e.target.value)}}
                                style={{
                                    background: `linear-gradient(to right, #1296a9 ${percentage()}%, #8d8c8c ${percentage()}%)`,
                                }}
                            />
                            <p>{sqft}</p>
                        </div>
                    </label>
                </div>
                <button type="submit" className="search-bar__submit">Search</button>
            </form>
        </div>
    );
};

export default Search;
