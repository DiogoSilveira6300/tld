## Documentation: Exchange

### 1. High-Level Overview & Design Philosophy

The withdraw mechanism allows users to convert their Ethereum into the platform's cryptocurrency - USDC - at a 1:1 rate.

### 2. The Key Actors

| Actor | Role | How it's Implemented |
| :--- | :--- | :--- |
| **The User** | The user willing to use the platform. | Converts the Ethereum into USDC. |
| **Frontend App** | The user interface that shows the form in which the user specifies how much Ethereum they intend to exchange for USDC. | `CoinExchange.jsx` (React/MUI) |
| **Backend API** | A trusted "Relayer" that pays the gas for low-risk the required actions to execute the exchange. | Node.js/Express server with an `operatorWallet`. |
| **Blockchain** | The decentralized rulebook that enforces the governance logic and acts as the ultimate source of truth. | `IERC20.sol`, `Ownable.sol` |

### 3. The End-to-End Workflow (Step-by-Step):

This workflow follows the process converting ETH into USDC.

*   **Goal:** To get USDC - the platforms main currency.
*   **Gas Cost:** Paid by the **Backend**.

#### Step 1: Exchange Specification:

The **User** fills up the "Exchange" form and clicks **"Exchange"**.

#### Step 2: Investment:
The **Frontend**, through the `handleSwap()` function, calls the functions ofthe relevant smart contract - `SimpleExchange.sol` - through its respectibe ABI, in order to convert an amount of user's ETH into USDC.

#### Step 3: Shares Transfer:

Upon receiving the request, the blockchain **node** calls the `swapEthForUsdc()` function of the `SimpleExchange.sol` contract. This function executes the transaction for exchanging ETH for USDC at a 1:1 rate:

1. **Checks ETH Sent:**
Ensures the user sent some ETH. If not, it reverts with an error message.

2. **Calculates USDC Amount:**
Calculates how much USDC to send to the user based on the fixed exchange rate.

3. **Checks USDC Balance:**
Verifies the contract has enough USDC to fulfill the swap.

4. **Transfers USDC:**
Transfers the calculated USDC amount from the contract to the user’s address. If the transfer fails, it reverts with an error message.

5. **Emits Event:**
Emits a Swapped event with the user’s address, ETH amount sent, and USDC amount received.
