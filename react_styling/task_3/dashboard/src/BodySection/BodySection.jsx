import './BodySection.css'

function BodySection ({ title, children }) {
    return (
        <div className="BodySection">
            <h2>{title}</h2>
            {children}
        </div>
    )
}
export default BodySection;
