import { ApolloProvider } from "@apollo/client";
import client from "./components/apolloClient";
import { PoolData } from "./components/PoolData";
import { LiquidityChart } from "./components/LiquidityChart";
import { Header } from "./components/Header";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        
        <PoolData />
      </div>
    </ApolloProvider>
  );
}
export default App;
