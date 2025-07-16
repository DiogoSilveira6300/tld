# VentureHUB: A Web3 Platform for Startup Investment

VentureHUB is a full-stack Web3 application designed to revolutionize startup fundraising. It leverages blockchain technology to allow entrepreneurs to tokenize their company's equity, raise capital in a transparent and decentralized manner, and manage their venture through a community-driven DAO.

This platform provides a complete ecosystem for the startup lifecycle: from launching an idea as a fractionalized IP-NFT to managing secondary market trading and on-chain governance.

---

### Table of Contents

- [The VentureHUB Vision](#the-venturehub-vision)
- [Core Features](#core-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Installation](#1-installation)
  - [2. Environment Setup](#2-environment-setup)
  - [3. Database Setup](#3-database-setup)
- [Running the Application](#running-the-application)
- [Core User Workflows](#core-user-workflows)
- [API Endpoints Guide](#api-endpoints-guide)

---

### The VentureHUB Vision

In the traditional startup world, equity is illiquid, fundraising is opaque, and governance is centralized. VentureHUB challenges this paradigm by providing:

-   **Liquidity for Founders:** Entrepreneurs can access capital without waiting for traditional funding rounds by selling fractionalized equity on an open market.
-   **Access for Investors:** VCs and angel investors can discover and invest in vetted, early-stage ventures with on-chain transparency.
-   **Decentralized Governance:** Every share is a vote. Stakeholders can directly influence the direction of a venture by creating and voting on governance proposals.

### Core Features

-   **Venture Creation:** Entrepreneurs can launch their venture, which creates an on-chain IP-NFT representing the core charter and mints fractional share tokens (`ERC20Votes`).
-   **Primary Sale (Deal Flow):** Ventures can raise their initial seed round through a dedicated `SaleTreasury` contract.
-   **Secondary Marketplace:** A peer-to-peer marketplace allows any shareholder to list their shares for sale and any user to purchase them, creating a liquid secondary market.
-   **DAO Governance:** A full-featured governance system based on OpenZeppelin Governor allows token holders to create, vote on, and execute on-chain proposals.
-   **Gasless Transactions:** Key governance actions like voting and proposing are designed as meta-transactions, where the backend relays the user's signed message and pays the gas fee, providing a smoother user experience.

### System Architecture

VentureHUB is a monorepo containing three main components that work in concert:

1.  **Smart Contracts (Root):** The Solidity-based on-chain logic, built with Hardhat. It handles all core functionalities like token creation, sales, and governance.
2.  **Backend (`/backend`):** A Node.js/Express server that acts as a secure bridge. It manages user authentication (JWT), pins metadata to IPFS via Pinata, and relays meta-transactions.
3.  **Frontend (`/frontend`):** A React (MUI) single-page application that serves as the user interface, interacting with both the backend API and directly with the blockchain via a Web3 wallet (MetaMask).

### Technology Stack

| Category      | Technologies                                                                   |
| :------------ | :----------------------------------------------------------------------------- |
| **Blockchain**  | Solidity, Hardhat, Ethers.js, OpenZeppelin Contracts              |
| **Backend**     | Node.js, Express.js, MySQL (`mysql2`), JWT, Pinata (IPFS)                     |
| **Frontend**    | React, Material-UI (MUI), Ethers.js, Axios                                   |
| **Database**    | MariaDB / MySQL                                                              |

### Getting Started

Follow these steps to set up and run the VentureHUB platform locally.

#### Prerequisites

-   **Node.js** (v18.x or later) & **npm**
-   **Git**
-   A local or cloud-based **MySQL/MariaDB** server
-   A **Pinata** account for IPFS hosting ([Get Keys Here](https://app.pinata.cloud/keys))
-   A browser with the **MetaMask** extension

#### 1. Installation

First, clone the repository and install all necessary dependencies for each part of the monorepo.

```bash
# Clone the project
git clone https://github.com/FuryCode-bit/VentureHUB
cd VentureHUB

# Install root, backend, and frontend dependencies in one command
cd backend && npm install && cd ../frontend && npm install && cd ..
```

#### 2. Environment Setup

The project uses a central `.env` file in the root directory for all configuration.

1.  **Create the `.env` file:**
    ```bash
    cp .env.example .env
    ```

2.  **Edit `.env`** and provide your specific credentials:
    ```env
    # --- DATABASE ---
    DB_HOST=127.0.0.1
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=venturehub

    # --- AUTH ---
    JWT_SECRET=replace_with_a_very_strong_and_long_secret_key_for_jwt

    # --- IPFS (get from app.pinata.cloud/keys) ---
    PINATA_API_KEY=your_pinata_api_key
    PINATA_API_SECRET=your_pinata_api_secret

    # --- BLOCKCHAIN ---
    # The default URL for the local Hardhat node
    JSON_RPC_URL=http://127.0.0.1:8545
    # The default private key for the deployer account (Account #0 from `npx hardhat node`)
    DEPLOYER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    
    # These will be auto-populated by the deployment script
    VENTURE_FACTORY_ADDRESS=
    MOCK_USDC_CONTRACT_ADDRESS=
    MARKETPLACE_ADDRESS=
    ```

#### 3. Database Setup

1.  Log in to your MySQL/MariaDB client: `mysql -u your_db_user -p`
2.  Create the database: `CREATE DATABASE venturehub;`
3.  Use the database: `USE venturehub;`
4.  Run the schema script by pasting the contents of `backend/db/schema.sql` into your client and executing.

### Running the Application

To launch the full application, you will need **four separate terminal windows**.

1.  **Terminal 1: Start the Local Blockchain**
    This command starts a local Hardhat node, simulating the Ethereum network.
    ```bash
    npx hardhat node
    ```

2.  **Terminal 2: Deploy Smart Contracts**
    This script compiles and deploys all contracts to your local node and automatically updates your `.env` file with the deployed contract addresses.
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

3.  **Terminal 3: Start the Backend Server**
    This runs the API that connects your frontend to the database and IPFS.
    ```bash
    cd backend
    npm start
    ```

4.  **Terminal 4: Start the Frontend Application**
    This launches the React development server.
    ```bash
    cd frontend
    npm start
    ```

Your browser will open to **http://localhost:3000**. The application is now running!

### Core User Workflows

1.  **Setup MetaMask:**
    -   Add a new network:
        -   **Network Name:** `Hardhat Local`
        -   **RPC URL:** `http://127.0.0.1:8545`
        -   **Chain ID:** `31337`
    -   Import a test account using one of the private keys provided by the `npx hardhat node` command.

2.  **Register & Link Wallet:** Create an "Entrepreneur" and a "VC" account. Log in with each and link your imported MetaMask account.

3.  **Launch Venture (as Entrepreneur):** Navigate to "Launch New Venture" and fill out the form. This triggers the on-chain creation of the Venture IP-NFT and all associated DAO contracts.

4.  **Invest (as VC):**
    -   Navigate to the "Exchange" page to swap some test ETH for MockUSDC.
    -   Go to the "Deal Flow" page, find the new venture, and invest directly.

5.  **Trade (Secondary Market):**
    -   Navigate to the "Marketplace".
    -   As a shareholder, you can list a portion of your shares for sale.
    -   Any other user (including other founders) can buy these listed shares.

6.  **Govern (as any Shareholder):**
    -   Navigate to the venture's detail page and then to the "Manage/Govern" page.
    -   **Activate Votes:** You must delegate your voting power to your own address one time to participate.
    -   **Submit Proposals:** Create new governance proposals.
    -   **Vote:** Cast your vote on active proposals gas-free.

---

### API Endpoints Guide

This is a comprehensive guide to the VentureHUB backend API. All endpoints prefixed with `(Protected)` require a valid JSON Web Token (`x-auth-token`) in the request header.

#### Authentication (`/api/auth`)

-   `POST /register`
    -   **Description:** Registers a new user.
    -   **Body:** `{ "fullName", "email", "password", "role" }` where `role` is either `'entrepreneur'` or `'vc'`.
-   `POST /login`
    -   **Description:** Logs in an existing user.
    -   **Body:** `{ "email", "password" }`
    -   **Response:** `{ "token", "user": { ... } }`

#### User Management (`/api/users`)

-   `POST /link-wallet` **(Protected)**
    -   **Description:** Links a Web3 wallet address to the logged-in user's account.
    -   **Body:** `{ "walletAddress" }`

#### Venture Management (`/api/ventures`)

-   `POST /create` **(Protected)**
    -   **Description:** The core endpoint for launching a new venture. Orchestrates IPFS uploads and two on-chain transactions to create the full venture ecosystem.
    -   **Body:** `FormData` containing `{ "ventureName", "industry", "mission", "teamInfo", "fundraisingGoal", "totalShares", "logo" (file) }`.
-   `GET /` **(Protected)**
    -   **Description:** Fetches a list of all ventures for the public "Deal Flow" page.
-   `GET /:id` **(Protected)**
    -   **Description:** Fetches detailed information for a single venture from the database.
-   `GET /:id/stats` **(Protected)**
    -   **Description:** Fetches live on-chain statistics for a venture, including `sharesSold`, `pricePerShare`, and `totalSharesForSale`.
-   `GET /:ventureId/dashboard` **(Protected)**
    -   **Description:** A comprehensive endpoint that aggregates all data needed for the DAO governance page, including venture details, proposals, live on-chain data, and the current user's stake.

#### Portfolio Management (`/api/portfolio`)

-   `GET /all` **(Protected)**
    -   **Description:** The unified endpoint for fetching a user's complete portfolio. It checks the user's on-chain balance for *every* venture in the system and returns a fully hydrated list of only those they own shares in. Serves all portfolio pages.

#### Investment Tracking (`/api/investments`)

-   `POST /record` **(Protected)**
    -   **Description:** Records a relationship between a user and a venture in the `investments` table. Crucially, this creates the link that allows portfolio endpoints to discover potential holdings. Called after a direct investment or marketplace purchase.
    -   **Body:** `{ "ventureId", "sharesOwned" }`

#### Marketplace (`/api/market`)

-   `POST /listings` **(Protected)**
    -   **Description:** Records a new share listing in the database after it has been successfully created on-chain.
    -   **Body:** `{ "listingOnchainId", "ventureId", ... }`
-   `GET /listings` **(Protected)**
    -   **Description:** Fetches all currently `open` listings for the secondary marketplace.
-   `PUT /listings/:listingId` **(Protected)**
    -   **Description:** Updates the status of a listing to either `'sold'` or `'cancelled'`.
    -   **Body:** `{ "status" }`

#### Governance (Meta-Transactions) (`/api/governance` & `/api/proposals`)

-   `POST /proposals/record` **(Protected)**
    -   **Description:** Records the details of a proposal to the database *after* the user has successfully submitted it on-chain.
    -   **Body:** `{ "ventureId", "proposalOnchainId", "title", "description", ... }`
-   `POST /governance/vote-gasless` **(Protected)**
    -   **Description:** Relays a gasless vote. The user signs a typed message (EIP-712) on the frontend, and this endpoint submits that signature to the `castVoteBySig` function on the DAO contract, paying the gas fee on the user's behalf.
    -   **Body:** `{ "ventureId", "proposalId", "support", "v", "r", "s" }`

#### Admin (`/api/admin`)

-   `POST /set-price` **(Protected, Admin/Owner Only)**
    -   **Description:** Allows a venture admin to manually set a new price for shares in the primary sale treasury.
    -   **Body:** `{ "ventureId", "newPrice" }`