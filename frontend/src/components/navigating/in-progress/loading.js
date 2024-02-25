import LoadingSpinner from "@/components/miscellaneous/loadingspinner";
import "./css/loading.css";
import Base from "@/components/base";

export default function Loading(props) {
    return (
        <Base style={props.style} className="loading_div">
            <LoadingSpinner speed="600ms" style={{ width: 15, alignSelf: "center", justifySelf: "center" }}/>
        </Base>
    )
}