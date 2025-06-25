import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import './CollectionsPage.css';
import CollectionCard from '../../components/collectionCard/CollectionCard';

const CollectionsPage = () => {

    const [collection, setCollection] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sortDirection, setSortDirection] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    const backendIP = process.env.REACT_APP_BACKEND_IP;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    const apiUrl = `http://${backendIP}:${backendPort}/game-collection`;

    const fetchCollections = useCallback(async (pageNumber, query) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${apiUrl}/all?pageNumber=${pageNumber}&pageSize=20&orderBy=${sortDirection}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name: query?.trim() ? query : null})
                }
            );

            const data = await response.json();
            if (data.content && data.content.length > 0) {
                setCollection((prevCollections) => {
                    const newCollections = data.content.filter((collection) => 
                        !prevCollections.some((prev) => prev.id === collection.id)
                    );
                    return [...prevCollections, ...newCollections];
                });
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Failed to fetch collections:", error);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl, sortDirection]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        setCollection([]); 
        setPage(0); 
        setHasMore(true); 
    }, [sortDirection, searchQuery]);

    const toggleSortDirection = () => {
        setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    };

    useEffect(() => {
        fetchCollections (page, searchQuery);
    }, [page, fetchCollections, searchQuery]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100 &&
            !isLoading &&
            hasMore
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isLoading, hasMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return(
        <div className="collections-page">

            <div className="collections-header">
                <h1>Game Collections</h1>

                <div className="collections-controls">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        class="search-bar"
                    />
                    <button onClick={toggleSortDirection} class="sort-button">
                        Name: {sortDirection === "asc" ? "Asc" : "Desc"}
                    </button>
                </div>
                
            </div>
            
            <div className='collections-main'>
                {collection.map((item, index) => (
                    <CollectionCard collection={item} index={index} />
                ))}
            </div>

            {isLoading && <p class="loading">Loading your Game Collections...</p>}
            {!hasMore && <p class="loading">That's all of your Game Collections!</p>}
        </div>
    );
}

export default CollectionsPage;