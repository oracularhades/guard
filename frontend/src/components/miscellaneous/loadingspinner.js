import './css/loadingspinner.css';

export default function LoadingSpinner(props) {
    let size = props.style.width;
    if (!size) {
        size = 20;
    }

    let animationSpeed = props.speed;
    if (!animationSpeed) {
        animationSpeed = "1s";
    }

    let borderPixels = size / 4;

    let style = {
        ...props.style,
        border: `${borderPixels}px solid #808080`,
        borderTop: `${borderPixels}px solid #ffffff`,
        animation: `spin ${animationSpeed} linear infinite`
    };
    style.width = size;
    style.height = size;

    return (
        <div id={props.id} style={style} class="loader"></div>
    )
}