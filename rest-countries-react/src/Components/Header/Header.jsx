import { useContext } from "react";
import ModeIcon from "../../assets/dark-mode-6682.svg";
import "./Header.css";
import { ThemeContext } from "../ThemeContext";
import { BrowserRouter, Link } from "react-router-dom";
function Header(props) {
    const theme = useContext(ThemeContext);

    function changeMode() {
        if (theme == "light") {
            props.setMode("dark");
        } else {
            props.setMode("light");
        }
    }
    return (
        <div className={"header-outer" + " " + theme + "-" + "header-outer"}>
            <div className={"header"}>
                <h2>Where in the world?</h2>
                <div
                    className="mode-selector"
                    onClick={() => {
                        changeMode();
                    }}
                >
                    <img className={"mode-img" + " " + theme + "-" + "mode-img"} src={ModeIcon}></img>
                    <p className={"mode-name"}>{theme == "dark" ? "Light Mode" : "Dark Mode"}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;
