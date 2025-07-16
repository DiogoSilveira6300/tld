## Documentation: Marketplace

### 1. High-Level Overview & Design Philosophy

In VentureHub, venture capitalists are able to sell shares in their possession and buy shares from others in the platform.

### 2. The Key Actors

| Actor | Role | How it's Implemented |
| :--- | :--- | :--- |
| **The User** | The user who purchares ERC-20 tokens (shares) from another user. |
| **Frontend App** | The user interface that displays shares for sale and allows the user to purchase them. | `DealFlowPage.jsx` (React/MUI) |
| **Backend API** | A trusted "Relayer" that pays the gas for low-risk the required actions to create a DAO (minting ERC-20 and ERC-721 tokens, transferring token ownership and deploying contracts). | Node.js/Express server with an `operatorWallet`. |
| **Blockchain** | The decentralized rulebook that enforces the governance logic and acts as the ultimate source of truth. | `Marketplace.sol` |

### 3. The End-to-End Workflow (Step-by-Step):

This workflow follows the process of buying shares in the market place.

*   **Goal:** To purchase shares from another user.
*   **Gas Cost:** Paid by the **Backend**.

#### Step 1: Investment Creation:

The **User** clicks **"Buy"** in an entry of the marketplace.

#### Step 2: Investment:
The **Frontend**, using the `handleBuyShares()` function, sends the investment details to the backend API (`/api/investments/record`) so the backend can record the transaction in its database, as well as the `/api/market/listings/`, in order to update the listings. Additionally, the frontend directly interacts with the relevant smart contract `Marketplace.sol` — by calling its functions through its respective ABI.

#### Step 3: Shares Transfer:

Upon receiving the request, the **node** calls the `handleBuyShares()` function of `Marketplace.sol`, in order to carry out the transaction:

1. **Share Availability Check:**  
   Checks that there are enough shares left for sale.

2. **Cost Calculation:**  
   Calculates the total cost, which is the product of the number of shares multiplied by the price per share, divided by the number of decimals of the share token (1e18).

3. **Shares Sold Update:**  
   Updates the number of shares sold.

4. **Payment Transfer:**  
   Transfers the payment token (USDC) from the buyer to the contract.

5. **Share Transfer:**  
   Transfers the specified number of shares from the contract to the buyer.

6. **Event Emission:**  
   Emits a SharesPurchased event with the buyer's address, number of shares, and cost.
