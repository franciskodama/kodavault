// WORKING ON:
// TODO: Altcoin Add Asset: after click on Category it has been activating the database
// TODO: CronJob: https://console.cron-job.org/jobs/5201103
// TODO: After CronJob Fix, return the commented code in the middleware f
// TODO: Shortcut styles of the shortcuts
// TODO: Export to CSV: https://www.youtube.com/watch?v=Zz_mP5gAnxc
// TODO: Arrumar reload on Shortcut, etc.. pages

// TODO: Add Assets: Cash in Exchanges don't need to have the option to choose will be always USD or BRL (it's the only option)
// TODO: CardLongsAndShorts or Page for it?
// TODO: Create a Page for the Elliott Waves Cheat Sheet

// TODO: Create a Chrome extension (add and update assets): https://www.luckymedia.dev/blog/how-to-create-a-chrome-extension-with-react-typescript-tailwindcss-and-vite-in-2024 or https://github.com/vercel/next.js/tree/canary/examples/with-chrome-extension

// NEXT:
// TODO: BTC Dominance
// TODO: Assets Forms: If chooses BTC we need to give the right category selected - For all the other coins too, but no hardcode (or api) info we show all the options
// TODO: When I edit the CAD Cash in Wealthsimple Asset, it does not appear Wealthsimple as an option to choose from
// TODO: Assets need to accept QETH.U
// TODO: Não vamos fazer 100X: https://youtu.be/XISm92VwglI?si=OvaYIsQrLriyLdaO
// TODO: Altseason Indicators
// TODO: DJT in the Dashboard
// TODO: Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// TODO: Resistences and Supports?
// TODO: Not using yet for now, but let's create a page to rank the coins (See Crypto.server file)

// If we need to change auth(): https://www.youtube.com/shorts/x6hrvwNzj10

// ERRORS:
// TODO: NaN Alloication Goals, Offset column
// TODO: On Cryptos Page file:      {assetsByType.Crypto.length > 0 ? (

// PRIORITIES 1:
// TODO: Assets to be aware of: for position trade checking RSI and other indicators (ie.: DOL, GLXY...)
// TODO: Assets page, Filter by Exchange + Currency using Dropdown
// TODO: Fix bug on Production Environment because it doesn't work (show assets)
// TODO: Have validation on the Forms
// TODO: alert: recommendation if the amount is too much for a little potential growth

// SMALL PRIORITIES:
// TODO: Avatar Dropdown Style (no border is weird)
// TODO: Dark Mode https://ui.shadcn.com/docs/dark-mode/next
// TODO: Font Bug
// TODO: For edit pencil: https://ui.shadcn.com/docs/components/tooltip
// TODO: Fix ILV and CRO that is saying to buy them
// TODO: Create button Clear and Minimum Amount (0.01)
// TODO: Criar TAGS para Crypto Assets? Safe, Gema, Risky, Bet
// TODO: Show the field (form) with the goal pulled from CoinGoal database
// TODO: If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// TODO: Create button to save the goal for each asset (current line) + Save in the database
// TODO: What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.
// TODO: What appears on SELL and BUY because of the goal, need to appear in the next purchases card

// PRIORITIES 2:
// TODO: Knowledge Page: Place to save videos about coins for future reference
// TODO: Resources Page (?):Card with link for the image of the cycle of the market (already in the public folder)
// TODO: Responsive Tables: https://www.youtube.com/watch?v=qWY25e02BZs&list=WL&index=89&t=79s
// TODO: ATH Table market cap

// FUTURE:
// TODO: https://css-generators.com/ribbon-shapes/
// TODO: to hover Total by Subtype and then see the next tier of details
// TODO: Generate Report + Send it by Email + Download it
// TODO: At the end of the Month close a Report
// TODO: On mouse over on Crypto, show the foundamentals explanation of this coin
// TODO: Check this API: https://www.cryptometer.io/login.php
// TODO: Search Asset

// BACKLOG:
// TODO: If there is cash on TFSA or HFSA, show it on the card or send a alert
// TODO: think about other alerts
// TODO: Card with link of Data Analysis to check on the daily basis (Obdisian)
// ----------------------------------------------------------------------------------------------

// DONE =======================================================================================
// TODO: Total after a filter on Assets Page
// TODO: ATH: desconsider (checkbox) Assets that have ATH to high against their current price
// TODO: ATH: desconsider checkbox: save it on localStorage
// TODO: Add Asset: fix empty field for Altcoin after pressed BTC button (for instance)
// TODO: Add Asset: Cash-CAD doesn't show wealthsimple
// TODO: I create a new asset Cash and it was weird (fields for category and did not have Clear Exchange)
// TODO: Logos of coins on Allocation Table and ATH table
// TODO: Dashboard taking too much time to load
// TODO: Stock Assets that we don't have data, we need to message user to contact the administrator to include Symbol (Google Finance/Sheet)
// TODO: Hide the TO TSX NY... Exchange
// TODO: Dashboard Menu must be highlighted when chosen
// TODO: Clear button for all filters on Asset Page
// TODO: If you don't have a net worth data show a message in the space of the chart
// TODO: Dashboard without any data. Show a message.
// TODO: Shortcut without any data. Show a message.
// TODO: Cryptos Page without any data. Show a message.
// TODO: Stocks Page without any data. Show a message.
// TODO: What happen if there is no cash to invest? What we will show?
// TODO: Tag Card + Save localstorage + No Tag, no total
// TODO: Total By Something: if no Something, show Message to Add an Asset Something
// TODO: Tag Card be empty and Cash is creating a '' instead of null
// TODO: Include Clear as an option for Cash BRL
// TODO: Gauge Indicator (Chart) for what? For Caixa?
// TODO: create a way to filter by cash
// TODO: Set up a Goal: Add a Goal, update a Goal
// TODO: Reduce height of first cards on Dashboard to give space for the Gauge Indicator or Alerts
// TODO: What to do on Update? --> Give the altcoins automatically the right category on Add Assets (when changes the assets must clear the category)
// TODO: Include MM Wallet
// TODO: Context Error
// TODO: Clerk Middleware Error because of the usage of a Clerk function on the [[...rest]] page (Homepage) and is not working in the middleware exception
// TODO: If it's BTC, we already give it a category
// TODO: Give the altcoins automatically the right category on Add Assets
// TODO: Check the categories for the altcoins (hardcoded array)
// TODO: Filter by Exchange must be a dropdown (assets page)
// TODO: Fix the annoying reload when Add, Update and Delete Assets
// TODO: When we filter by asset on the Assets Page, if there are the same symbol in the same exchange, it shows below, the sum of it.
// TODO: If a Token doesn't exist in the search (Assets Page), we show the right message
// TODO: Smart Contract button (alignment)
// TODO: Error if try to Add Asset "Supply Chain"
// TODO: Tag properties of Assets
// TODO: Clear Tag button on Update Assets
// TODO: Total by Tag in Dashboard
// TODO: Quantity in the forms for Updating Assets (error formatting)
// TODO: Include Category for Crypto Assets as Tags. I'm not sure if it is a good idea. Too much work for not much value.
// TODO: Cryptos Page needs to have a sub Dashboard like the Stocks Page (main reason: how much by Exchange)
// TODO: Crypto Page: Pie Chart for Wallet Shares
// TODO: Crypto For Trading
// TODO: Hello, Francis! Greetings on Header
// TODO: Fear and Greed
// TODO: Created Purpose Property in the Assets Page
// TODO: Stocks by Currency (BRL, CAD, USD)
// TODO: Stocks by Location (BR, CA)
// TODO: API Refactoring Crypto for one call
// TODO: Chart of Net Worth Evolution on Dashboard
// TODO: Cron Job for the Net Worth Evolution Chart
// TODO: Table Alignment in the Assets Page
// TODO: https://ui.shadcn.com/docs/components/tabs - Tabs for Cryptos page
// TODO: Q.ETH is USD and there is the possibility only to set it in CAD
// TODO: Fix bug Assets Page: resilience if the coin is not found
// TODO: Fix bug buttons on the +Asset Form
// TODO: Wealthsimple Assets is not getting prices (check if APIs are working or of the values are Hardcoded)
// TODO: Create the Crypto column of how much in percentage we want of each Asset and show how much is missing or over the limit
// TODO: Many Assets (Stock-CAD) is not priced
// TODO: Update Asset - with new logic in the form
// TODO: Fix bug Crypto Prices that was more expensive
// TODO: Move Cryptos from Dashboard to Cryptos Page
// TODO: Move Stocks from Dashboard to Stocks Page
// TODO: Dinamically generate the fields depend on the type of asset: https://www.youtube.com/watch?v=lW_0InDuejU&t=8s
// TODO: Test No Assets Page, then test it including one Asset in the database
// TODO: Button Styles
// TODO: Add Asset, fix bug Radio Button
// TODO: Delete Asset, fix error message
// TODO: change all qtd to qty
// TODO: Home beofre Dashboard - ref.: Kajabi
// TODO: Card "Next Purchases"
// TODO: No more Password for Pull Request
// TODO: favicon
// TODO: Fix Sign in Bug
// TODO: Fix context bug so we can reload Assets page
// TODO: Fix Hydration bug
// TODO: Add filter in the Asset Table
// TODO: The problem is here: the data for the form is not going for the right coin by this component below
// TODO: Solution is to forget the edition inline, and use the action with dropdown to edit the goal (opens a form with a server action)
// TODO: Create Server Action for getting Crypto Goals of this user
// TODO: Symbol + Amount (USD) + Percentage + Goal (%) + Goal (USD)
// TODO: Include Share data
// TODO: Include Observation field (Look at Stochastic Analysis 4h, MACD 3D and W)
// TODO: Add Asset: if there isn't this asset symbol in the CoinGaol table, create it with goal = 0
// TODO: Crypto Page: tabs on the top of the page to change the table between ATH and Allocation goals
// TODO: PRIO3 is not priced
// TODO: APE is not priced
// TODO: Assets page, Filter by Exchange

// =============================================================================================

// - AI: Cryptocurrencies leveraging artificial intelligence for various applications.
// - Meme: Tokens created around internet memes or cultural references, often with a humorous aspect.
// - DeFi: Decentralized finance platforms providing financial services without traditional intermediaries.
// - Oracles: Protocols that connect smart contracts with real-world data and external APIs.
// - Stablecoins: Cryptocurrencies designed to maintain a stable value, often pegged to fiat currencies.
// - Gaming: Tokens used in gaming ecosystems for in-game purchases, rewards, and transactions.
// - Infrastructure: Cryptocurrencies that provide foundational technology for building and supporting blockchain networks.
// - Data: Cryptocurrencies focused on data storage, sharing, and privacy.
// - Interoperability: Platforms enabling different blockchain networks to communicate and interact with each other.
// - Unknown: Cryptocurrencies with unclear or unspecified use cases.
// - Exchange: Tokens associated with cryptocurrency exchanges, often providing benefits like fee discounts.
// - None: Tokens that do not fit into any specific category or lack detailed information.
// - NFT: Non-fungible tokens representing unique digital assets like art, collectibles, and real estate.
// - Safehaven: Cryptocurrencies perceived as secure investments during market volatility.
// - Privacy: Cryptocurrencies designed to enhance transaction privacy and anonymity.
// - Supply chain: Supply chain-focused coins are typically designed to improve transparency, traceability, and efficiency in the supply chain industry.
