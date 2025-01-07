import { ethers } from 'ethers';


export const mintNFT = async (signer, contractAddress, contractABI, metadata) => {
    try {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contract.mintNFT(JSON.stringify(metadata)); // Send metadata as string
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Error minting NFT:", error);
        throw error; // Re-throw the error to be handled by the component
    }
};