// src/components/PoolData.js

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import LiquidityChart from "./LiquidityChart"; 
import "../App.css";

const GET_POOLS = gql`
  query GetPools($poolCount: Int) {
    pools(
      first: $poolCount
      orderBy: volumeUSD
      orderDirection: desc
      where: { volumeUSD_gt: "0" }
    ) {
      id
      token0 { 
        symbol 
        name
        decimals
      }
      token1 { 
        symbol 
        name
        decimals
      }
      volumeUSD
      totalValueLockedUSD
      liquidity
      txCount
       token0Price
      token1Price 
      createdAtTimestamp
    }
  }
`;

export const PoolData = () => {
  const [search, setSearch] = useState("");
  const [selectedPool, setSelectedPool] = useState(null);
  const [poolCount, setPoolCount] = useState(20); // Start with 20 pools

  const { loading, error, data, refetch } = useQuery(GET_POOLS, {
    variables: { poolCount }
  });

  const handleLoadMore = () => {
    setPoolCount(prevCount => prevCount + 20); // Increment by 20
    refetch({ poolCount: poolCount + 20 }); // Refetch data with the new count
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredPools = data?.pools?.filter(pool => {
    const searchTerm = search.toUpperCase();
    return pool.token0.symbol.includes(searchTerm) || pool.token1.symbol.includes(searchTerm);
  }) || [];

  return (
    <div className="p-4 searchBar">
      <div>
        <input
          className="Enter"
          type="text"
          placeholder="Search by token pair..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="token-card-container">
        {filteredPools.length > 0 ? (
          filteredPools.map(pool => (
            <div 
              key={pool.id} 
              onClick={() => setSelectedPool(pool)} 
              className="token-card"
            >
              <h4>{pool.token0.symbol}/{pool.token1.symbol} POOL</h4>
              <p>Token 0: {pool.token0.name} ({pool.token0.symbol})</p>
              <p>Token 1: {pool.token1.name} ({pool.token1.symbol})</p>
              <p>Volume (USD): ${parseFloat(pool.volumeUSD).toLocaleString()}</p>
              <p>Liquidity (USD): ${parseFloat(pool.totalValueLockedUSD).toLocaleString()}</p>
              <p>{pool.token0.symbol.toString()} Price: ${parseFloat(pool.token0Price).toFixed(2)}</p>
              <p>{pool.token1.symbol.toString()} Price: ${parseFloat(pool.token1Price).toFixed(2)}</p>
              <p>Transactions: {pool.txCount}</p>
              <p>Created At: {new Date(pool.createdAtTimestamp * 1000).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No pools found</p>
        )}
      </div>

    <div className="liq">
      <button onClick={handleLoadMore} className="load-more-button">
        Load More Pools
      </button>

    
      {selectedPool && (
        <LiquidityChart poolData={selectedPool}  />
      )}
      </div>
    </div>
  );
};
