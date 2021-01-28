import './spinner.styles.scss'
const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Spinner;