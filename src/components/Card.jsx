import './Card.css';

function Card({ title, subtitle, onClick, image, children }) {
  return (
    <div className="card" onClick={onClick}>
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export default Card;
