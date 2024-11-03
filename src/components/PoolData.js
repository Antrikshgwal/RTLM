import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import LiquidityChart from "./LiquidityChart"; // Import the chart component

const GET_POOLS = gql`
  query GetPools {
    pools(
      first: 20
      orderBy: volumeUSD
      orderDirection: desc
      where: { volumeUSD_gt: "0" }
    ) {
      id
      token0 { symbol }
      token1 { symbol }
      volumeUSD
      totalValueLockedUSD
    }
  }
`;

export const PoolData = () => {
  const [search, setSearch] = useState("");
  const [selectedPool, setSelectedPool] = useState(null); // State to hold selected pool data

  const { loading, error, data } = useQuery(GET_POOLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredPools = data?.pools?.filter(pool => {
    const searchTerm = search.toUpperCase();
    return pool.token0.symbol.includes(searchTerm) || pool.token1.symbol.includes(searchTerm);
  }) || [];

  console.log("Selected Pool Data:", selectedPool);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by token pair..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {filteredPools.length > 0 ? (
        <div>
          {filteredPools.map(pool => (
            <div 
              key={pool.id} 
              onClick={() => setSelectedPool(pool)} // Update selectedPool on click
              className="pool-item"
            >
              <h4>{pool.token0.symbol}/{pool.token1.symbol}</h4>
              <p>Volume (USD): ${parseFloat(pool.volumeUSD).toLocaleString()}</p>
              <p>Liquidity (USD): ${parseFloat(pool.totalValueLockedUSD).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No pools found</p>
      )}
      

      {/* Render LiquidityChart only if a pool is selected */}
      {selectedPool && (
        <LiquidityChart poolData={selectedPool} poolid={pools.id} />
      )}
  
    </div>
  );
};
