import { useState } from "react";

const Calculator = () => {
    const [income, setIncome] = useState("");
    const [entry, setEntry] = useState("");
    const [purchasingPower, setPurchasingPower] = useState("");

    const calculatePurchasingPower = () => {
        const incomeValue = Number(income.replace(/,/g, "")) || 0;
        const entryValue = Number(entry.replace(/,/g, "")) || 0;

        const maximumInstallment = incomeValue * 0.30; // 30% da renda
        const interestRate = 12; // 12% ao ano
        const months = 360; // 30 anos

        const monthlyRate = interestRate / 100 / 12;
        const denominator = 1 - Math.pow(1 + monthlyRate, -months);

        if (denominator === 0) {
            setPurchasingPower("Error in calculation");
            return;
        }

        const loanAmount = (maximumInstallment / monthlyRate) * denominator;
        const result = loanAmount + entryValue;

        setPurchasingPower(formatCurrency(result));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value);
    };

    const handleIncome = (e) => {
        const numericValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
        setIncome(numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // Adiciona as vírgulas
    };

    const handleEntry = (e) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        setEntry(numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    return (
        <div className="container">
            <h1>Calculator</h1>
            <div className="calculator__grid">
                <div>
                    <h2>Purchasing Power</h2>
                    <label>
                        <span>Income</span>
                        <input 
                            type="text" 
                            className="input" 
                            onChange={handleIncome}
                            value={income}
                        />
                    </label>
                    <label>
                        <span>Entry</span>
                        <input 
                            type="text" 
                            className="input" 
                            onChange={handleEntry}
                            value={entry}
                        />
                    </label>
                    <button onClick={calculatePurchasingPower} className="button">
                        Calculate
                    </button>
                    {purchasingPower && <p>Your purchasing power is: {purchasingPower}</p>}
                </div>
                <div>
                    {/* <h2>Property Value</h2>
                    <label>
                        <span>Property Value</span>
                        <input type="text" className="input" />
                        <button className="button">Calculate</button>
                    </label> */}
                </div>
            </div>
        </div>
    );
};

export default Calculator;