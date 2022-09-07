import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAccount, loadProvider, loadNetwork, loadCryptoCurrencies, loadExchange } from "../redux/action_and_dispatch.js"
import config from "../config.json";
import NavBar from "./NavBar";

function App() {
    const dispatch = useDispatch();
    
    async function initialSetup() {        
        // Connect Ethers with the blockchain and get chain ID of the network.
        let provider = loadProvider(dispatch);
        let chainID = await loadNetwork(provider, dispatch);
        
        
        // Reload page if MetaMask account is changed.
        window.ethereum.on("accountsChanged", async() => {
            await loadAccount(dispatch, provider);
        });
        
        
        // Reload page if the network is changed.
        window.ethereum.on("chainChanged", async() => {
            window.location.reload();
        });


        // Load both cryptocurrencies from the blockchain.
        let uzrAddress = config[chainID].UZR.address;
        let methAddress = config[chainID].mETH.address;
        await loadCryptoCurrencies([uzrAddress, methAddress], provider, dispatch);
        
        
        // Load the exchange from the blockchain.
        let exchangeAddress = config[chainID].exchange.address;
        loadExchange(exchangeAddress, provider, dispatch);
    }

    useEffect(() => {
        initialSetup();
    });

    return (
      <div>
  
        <NavBar />
  
        <main className='exchange grid'>
          <section className='exchange__section--left grid'>
  
            {/* Markets */}
  
            {/* Balance */}
  
            {/* Order */}
  
          </section>
          <section className='exchange__section--right grid'>
  
            {/* PriceChart */}
  
            {/* Transactions */}
  
            {/* Trades */}
  
            {/* OrderBook */}
  
          </section>
        </main>
  
        {/* Alert */}
  
      </div>
    );
}

export default App;