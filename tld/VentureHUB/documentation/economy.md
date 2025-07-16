# VentureHUB Platform Economy

The economy of the platform works like this:

- **Internal Currency:**  
  The platform uses USDC as its internal currency. Users can exchange USDC for ETH at a 1:1 rate.

- **Venture Creation:**  
  A user creates a venture by minting an NFT (ERC-721 token), which represents the venture. This NFT is then divided into a specified number of ERC-20 tokens, each representing an equal share of the venture.

- **Share Distribution:**  
  The shares are distributed into three vaults:
  - 40% belong to the venture founder.
  - 40% are put up for sale.
  - 20% belong to the platform for funding purposes.

- **Initial Share Price:**  
  The initial price of the shares is set indirectly by the venture founder. It is calculated by dividing the founder's funding target by the number of shares available for investment. After the initial sale, the share price fluctuates according to market dynamics.

  > **Note:** For simulation purposes, the current implementation allows an admin endpoint to manually set the share price.

- **Marketplace:**  
  Users can trade shares between each other in the marketplace. Here they can sell a certain amount of shares for a chosen price, and others can buy them.

- **Venture Proposals:**  
  Users can propose a distribution of venture funds in various scenarios, such as when the venture gains or loses significant value, or other events affecting the venture.  
  Proposals are based on the current share value and the ownership

- **Voting Mechanism:**  
  Proposals are subject to voting. A quorum must be met, and each user's voting power is proportional to their number of shares in the venture.

- **Gas Fees:**  
  Most operational gas fees are covered by the platform. However, users must pay the gas fee