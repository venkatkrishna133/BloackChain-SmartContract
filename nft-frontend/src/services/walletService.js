import {BrowserProvider } from 'ethers';

export const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install it to use this feature.');
    }

    try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);

        if (!accounts || accounts.length === 0) {
            throw new Error('No accounts found. Please connect your wallet.');
        }

        const walletAddress = accounts[0];
        return { provider, walletAddress };
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        throw error; // Re-throw the error
    }
};