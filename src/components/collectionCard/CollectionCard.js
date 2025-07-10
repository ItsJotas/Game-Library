import './CollectionCard.css';

const CollectionCard = ({ collection, index }) => {
    const containerStyle = {
        '--header-background-color-alt': collection.color || '#e7e7e7'
    };

    return (
        <div key={index} className="collection-container" style={containerStyle}>
            <p className="collection-name">{collection.name}</p>
            <p className="collection-count">Games: {collection.games?.length || 0}</p>
            <p className="collection-rating">{collection.averageRating}</p>
        </div>
    );
}

export default CollectionCard;