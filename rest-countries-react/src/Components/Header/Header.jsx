import ModeIcon from "../../assets/dark-mode-6682.svg";
import "./Header.css";
function Header(props) {
    function changeMode() {
        if (props.modeType == "") {
            props.setMode("dark");
        } else {
            props.setMode("");
        }
    }
    return (
        <div className={"header-outer" + " " + props.modeType + "-" + "header-outer"}>
            <div className={"header"}>
                <h2>Where in the world?</h2>
                <div
                    className="mode-selector"
                    onClick={() => {
                        changeMode();
                    }}
                >
                    <img className={"mode-img" + " " + props.modeType + "-" + "mode-img"} src={ModeIcon}></img>
                    <p className={"mode-name"}>Dark Mode</p>
                </div>
            </div>
        </div>
    );
}

export default Header;
