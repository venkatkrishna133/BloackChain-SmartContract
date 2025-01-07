

export const mintNFT = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/mint', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Minted successfully:', data.transactionHash);
      } else {
        console.error('Minting failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };