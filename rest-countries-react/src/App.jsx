import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import CountryDetails from "./Components/CountryDetails/CountryDetails";
import { ThemeContext } from "./Components/ThemeContext";

function App() {
    const [mode, setMode] = useState("dark");
    const theme = useContext(ThemeContext);
    return (
        <ThemeContext.Provider value={mode}>
            <BrowserRouter>
                <Header setMode={setMode} />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/country/:id" element={<CountryDetails />}></Route>
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}
export default App;
