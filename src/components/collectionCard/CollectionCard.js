import './CollectionCard.css';

const CollectionCard = ({ collection, index }) => {
    return (
        <div key={index} className="collection-container">
            <p className="collection-name">{collection.name}</p>
            <p className="collection-rating">{collection.averageRating}</p>
        </div>
    );
}

export default CollectionCard;