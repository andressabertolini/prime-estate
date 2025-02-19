import ChoiceChips from "./ChoiceChips";
import IconMagnifyingGlass from "../assets/icons/icon-magnifying-glass.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
    const [searchParams] = useSearchParams();
    const paramQuery = searchParams.get("query") || "";
    const paramPurpose = searchParams.get("purpose") || "for-rent";
    const paramHomeType = searchParams.get("homeType") || "apartment";
    const paramPriceLimit = searchParams.get("priceLimit") || "";
    const paramBeds = searchParams.get("beds") || 0;
    const paramBaths = searchParams.get("baths") || 0;
    const paramSqft = searchParams.get("sqft") || 5000;

    const [query, setQuery] = useState(paramQuery);
    const [purpose, setPurpose] = useState(paramPurpose);
    const [rangeMin, setRangeMin] = useState(100);
    const [rangeMax, setRangeMax] = useState(50000);
    const [priceRange, setPriceRange] = useState(paramPriceLimit);
    const [homeType, setHomeType] = useState(paramHomeType);

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const [isOpen2, setIsOpen2] = useState(false);
    const [beds, setBeds] = useState(paramBeds);
    const toggleDropdown2 = () => setIsOpen2(!isOpen2);

    const [sqft, setSqft] = useState(paramSqft);

    const calculatePercentage = () => 
        ((priceRange - rangeMin) / (rangeMax - rangeMin)) * 100;

    const percentage = () => ((sqft - 1) / (5000 - 1)) * 100;

    const selectRef = useRef(null);
    const selectRef2 = useRef(null);
    const selectRef3 = useRef(null);

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
    const [baths, setBaths] = useState(paramBaths);

    const handleDropdown3 = (baths) => {
        if (baths == 5){
            baths = `${baths}+`;
        }
        setBaths(baths);
        setIsOpen3(false);
    }

    const handleClickOutside = (event) => {
        if(selectRef.current && !selectRef.current.contains(event.target)){
            setIsOpen(false);
        }
        if(selectRef2.current && !selectRef2.current.contains(event.target)){
            setIsOpen2(false);
        }
        if(selectRef3.current && !selectRef3.current.contains(event.target)){
            setIsOpen3(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        };
    },[]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="search-bar__container">
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Search..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img src={IconMagnifyingGlass} alt="Search Icon" onClick={handleSubmit}/>
            </div>
            <div className="search-options">
                <ChoiceChips purposeValue={handlePurposeValue} />
                <label>
                    <span className="label-large">Home type</span>
                    <div className="custom-select" ref={selectRef}>
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
                <label>
                    <span className="label-small">Beds</span>
                    <div className="custom-select" ref={selectRef2}>
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
                    <span className="label-small">Baths</span>
                    <div className="custom-select" ref={selectRef3}>
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
            </div>
            <button type="submit" className="search-bar__submit">Search</button>
        </form>
    );
};

export default Search;
