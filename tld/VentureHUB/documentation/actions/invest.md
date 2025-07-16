## Documentation: Investments

### 1. High-Level Overview & Design Philosophy

In VentureHub, venture capitalists can invest in startups they believe in. By possessing shares of the startups, they gain voting power inthe corresponding DAO in proportion to the amount of shares in their portfolio.

### 2. The Key Actors

| Actor | Role | How it's Implemented |
| :--- | :--- | :--- |
| **The User** | The DAO member who purchares ERC-20 tokens, which represent shares in of a startup (DAO). | Interacts with the frontend application as a Venture Capilatist. |
| **Frontend App** | The user interface that displays DAO information and allows users to create new ventures. | `DealFlowPage.jsx` (React/MUI) |
| **Backend API** | A trusted "Relayer" that pays the gas for low-risk the required actions to create a DAO (minting ERC-20 and ERC-721 tokens, transferring token ownership and deploying contracts). | Node.js/Express server with an `operatorWallet`. |
| **Blockchain** | The decentralized rulebook that enforces the governance logic and acts as the ultimate source of truth. | `SaleTreasury.sol` |

### 3. The End-to-End Workflow (Step-by-Step):

This workflow follows the process of investing in a venture.

*   **Goal:** To acquire shares (and thus, voting power) in a DAO.
*   **Gas Cost:** Paid by the **Backend**.

#### Step 1: Investment Creation:

The **User** fills up the "Deal Flow" form and clicks **"Invest"**.

#### Step 2: Investment:
The **Frontend**, using the `handleInvest()` function, sends the investment details to the backend API (`/api/investments/record`) so the backend can record the transaction in its database. Additionally, the frontend directly interacts with the relevant smart contracts — `MockERC20.sol` and `SaleTreasury.sol` — by calling their functions through their respective ABIs.

#### Step 3: Shares Transfer:

Upon receiving the request, the **node** calls the `buyShares()` function of the `SaleTreasury.sol` contract. This function executes the transaction for transferring the shares at the current price per share:

1. Checks that there are enough shares left for sale.

2. Calculates the total cost, which is the product of the number of shares multiplied by the price per share, divided by the number of decimals of the share token (1e18).

3. Updates the number of shares sold.

4. Transfers the payment token (USDC) from the buyer to the contract.

5. Transfers the specified number of shares from the contract to the buyer.

6. Emits a SharesPurchased event with the buyer's address, number of shares, and cost.
