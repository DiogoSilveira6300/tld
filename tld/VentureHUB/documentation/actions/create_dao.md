## Documentation: Venture Creation

### 1. High-Level Overview & Design Philosophy

In VentureHub, new ventures (startups) are represented by ERC-721 tokens (NFTs) - this way, an entrepeneur must only **mint** an NFT representing a venture in order to start collecting funds for it. This NFT is then divided into shares which are used for funding and governance purposes.

### 2. The Key Actors

| Actor | Role | How it's Implemented |
| :--- | :--- | :--- |
| **The User** | The DAO member who publishes his startup by minting a non-fungible token, which is then divided in shares representing it. | Interacts with the frontend application as an Entrepeneur. |
| **Frontend App** | The user interface that displays DAO information and allows users buy shares. | `IncubatePage.jsx` (React/MUI) |
| **Backend API** | A trusted "Relayer" that pays the gas for low-risk the required actions to create a DAO (minting ERC-20 and ERC-721 tokens, transferring token ownership and deploying contracts). | Node.js/Express server with an `operatorWallet`. |
| **Blockchain** | The decentralized rulebook that enforces the governance logic and acts as the ultimate source of truth. | `VentureFactory.sol`, `VentureShare.sol`, `VentureDAO.sol`, `FractionalizerVault.sol`, `VentureNFT.sol`, `PlatformTreasury.sol`, `SaleTreasury.sol` |

### 3. The End-to-End Workflow (Step-by-Step):

This workflow follows the process of creating a venture.

*   **Goal:** To create a new venture on the platform in order to collect funds.
*   **Gas Cost:** Paid by the **Backend**.

#### Step 1: Venture Creation:

The **User** fills up the "Launch Your Venture" form and clicks **"Launch Venture"**.

#### Step 2: Venture Submission:
The **Frontend**, through the `handleSubmit()` function, sends the venture info to the backend API (`/api/ventures/create`).

#### Step 3: Venture Tokenization:

Upon receiving the request and with the `operatorWallet`, the backend records the transaction in the database. Additionally, it calls the `createVenture()` function of the `VentureFactory.sol` contract. This function executes a sequence of crucial steps for creating the venture in the **blockchain**:

1. **Calculate Share Distribution:**  
   Taking the total number of shares inserted by the user into account, it calculates the exact number of shares which will be distributed to the entrepeneur, for sale and to the platform - respectively, 40%, 40% and 20%.

2. **Deploy DAO Contracts:**  
   It deploys some of the necessary contracts, namely, the `VentureShare.sol` and the `VentureDAO.sol`, respectively representing the ERC-20 token and the "Venture DAO", i.e, the venture's management system. A `TimelockController` contract is also deployed to be used by the DAO contract for executing transactions.

3. **Mint the Venture IP-NFT:**  
   It mints a new ERC-721 token (NFT) representing the venture.

4. **Deploy Supporting Contracts:**  
   It deploys the `FractionalizerVault.sol` (which keeps the newly minted NFT) and the `SaleTreasury.sol` (which receives the share of ERC-20 tokens destined to be sold).

5. **Mint and Distribute Share Tokens:**  
   The ERC-20 share tokens are minted and distributed to the founder, the treasury (for sale), and the platform treasury according to the previously calculated shares.

6. **Configure DAO Governance Roles:**  
   The `TimelockController` contract is configured with the appropriate proposer and executor roles, which grants governance permissions to the DAO.

7. **Transfer Assets and Ownership:**  
   The newly minted NFT is transferred to the `FractionalizerVault.sol` contract, and ownership of the `VentureShare.sol` contract is transfered to the `TimelockController`.

8. **Relinquish Factory Control:**  
   The `VentureFactory.sol` renounces its admin role on the `TimelockController`, ensuring the venture is now autonomous and governed by its DAO.

9. **Emit Venture Creation Event:**  
   An event is emitted with all relevant contract addresses for backend tracking and future reference.
