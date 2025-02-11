// TODO: NEXT:
// CronJob: https://console.cron-job.org/jobs/5201103 + https://www.youtube.com/shorts/d9olvU5bbQ4
// CronJob: with header with authentication Bearer Secret
// CronJob: errror for account fk.ca check logs on Vercel
// cryptoAccounts can be inputed by the user on a settings page (check other datas that can be inputed like this instead of hardcode)
// The sum for the Tag SOL Net on the TAG TOTAL CARD is not working

// TODO: DONE ---------------------------------------------------------------------------
// Crypto / ATH Estimation: clear button for the filter

// TODO: EASY:
// Crypto / Ranking of Cryptos getting info from the call for ATH
// Allocation Goals: Add field for search by Asset and a button to clear field

// TODO: WORKING ON:
// Responsivity
// Altcoin Add Asset: after click on Category it has been activating the database
// After CronJob Fix, return the commented code in the middleware f
// Export to CSV: https://www.youtube.com/watch?v=Zz_mP5gAnxc
// Arrumar reload on Shortcut, etc.. pages
// Add Assets: Cash in Exchanges don't need to have the option to choose will be always USD or BRL (it's the only option)
// CardLongsAndShorts or Page for it?
// Create a Page for the Elliott Waves Cheat Sheet
// Create a Chrome extension (add and update assets): https://www.luckymedia.dev/blog/how-to-create-a-chrome-extension-with-react-typescript-tailwindcss-and-vite-in-2024 or https://github.com/vercel/next.js/tree/canary/examples/with-chrome-extension

// TODO ---------------------------------------------------------------------------
// Shortcut styles of the shortcuts
// BTC Dominance
// Assets Forms: If chooses BTC we need to give the right category selected - For all the other coins too, but no hardcode (or api) info we show all the options
// When I edit the CAD Cash in Wealthsimple Asset, it does not appear Wealthsimple as an option to choose from
// Assets need to accept QETH.U
// Não vamos fazer 100X: https://youtu.be/XISm92VwglI?si=OvaYIsQrLriyLdaO
// Altseason Indicators
// DJT in the Dashboard
// Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// Resistences and Supports?
// Not using yet for now, but let's create a page to rank the coins (See Crypto.server file)
// If we need to change auth(): https://www.youtube.com/shorts/x6hrvwNzj10

// TODO: ERRORS:
// NaN Allocation Goals, Offset column
// On Cryptos Page file:      {assetsByType.Crypto.length > 0 ? (

// TODO: PRIORITIES 1:
// Assets to be aware of: for position trade checking RSI and other indicators (ie.: DOL, GLXY...)
// Assets page, Filter by Exchange + Currency using Dropdown
// Fix bug on Production Environment because it doesn't work (show assets)
// Have validation on the Forms
// alert: recommendation if the amount is too much for a little potential growth

// TODO: SMALL PRIORITIES:
// Avatar Dropdown Style (no border is weird)
// Dark Mode https://ui.shadcn.com/docs/dark-mode/next
// Font Bug
// For edit pencil: https://ui.shadcn.com/docs/components/tooltip
// Fix ILV and CRO that is saying to buy them
// Create button Clear and Minimum Amount (0.01)
// Criar TAGS para Crypto Assets? Safe, Gema, Risky, Bet
// Show the field (form) with the goal pulled from CoinGoal database
// If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// Create button to save the goal for each asset (current line) + Save in the database
// What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.
// What appears on SELL and BUY because of the goal, need to appear in the next purchases card

// TODO: PRIORITIES 2:
// Knowledge Page: Place to save videos about coins for future reference
// Resources Page (?):Card with link for the image of the cycle of the market (already in the public folder)
// Responsive Tables: https://www.youtube.com/watch?v=qWY25e02BZs&list=WL&index=89&t=79s
// ATH Table market cap

// TODO: FUTURE:
// https://css-generators.com/ribbon-shapes/
// to hover Total by Subtype and then see the next tier of details
// Generate Report + Send it by Email + Download it
// At the end of the Month close a Report
// On mouse over on Crypto, show the foundamentals explanation of this coin
// Check this API: https://www.cryptometer.io/login.php
// Search Asset

// TODO: BACKLOG:
// If there is cash on TFSA or HFSA, show it on the card or send a alert
// think about other alerts
// Card with link of Data Analysis to check on the daily basis (Obdisian)

// TODO: DONE =======================================================================================
// Assets Page: Review deselect all in once with a single button (confirmation before delete all reviews status check)
// Assets Page: Review must be fast, so perhaps it should use local storage
// Assets Page: Show how many types of asset it has in the user's filter (so que can check the number of assets in the platform when reviewing)
// Form add and update Asset: if it's a platform, select automatically the '-' option for account
// Error: 2 items with the same key on Crypto Page
// Crypto Projection Form: Clear is submiting
// Asset Gone Britney Spears Pop up is with 2 erros about h3 and p
// Include Note on Projections
// Review in Assets Page must be local storage to be faster (instead of a call to the database)
// Google Chart for the Crypto Page
// Sum of the Asset Page must be in another place. It's getting out of the Table
// Update NextJs and React versions: https://www.youtube.com/watch?v=fqabW3WRUbw&t=1s
// Check if we can delete the classes in Add Asset and Update Asset and use the import from './lib/classes'
// How many assets are there? How many cryptos?
// Filter by tag on the Asset Page
// Check icon for the ones we make a big check like that (Reviewed and Unreviewed)
// Account can also be the Accounts/Networks in Ledger
// When filter no 0 - instead a message
// Why do we have 2 Cryptos on the select on Asset Page?
// Change the domain: trezo.app --> Check on vercel if it's already valid
// Why we don't have the updated price for ETHX.B? It's correct in the spreadsheet
// Bug Tooltip was submitting the form without filling all the fields and clicking on Submit
// Total Vault board: show what they have. It it's only one currency or not
// Add Disable the other fields if the type was not chosen
// Change Clear Exchange to 'ClearXP'
// No assets found --> Message Box
// Scroll on Sheet
// Total after a filter on Assets Page
// ATH: desconsider (checkbox) Assets that have ATH to high against their current price
// ATH: desconsider checkbox: save it on localStorage
// Add Asset: fix empty field for Altcoin after pressed BTC button (for instance)
// Add Asset: Cash-CAD doesn't show wealthsimple
// I create a new asset Cash and it was weird (fields for category and did not have Clear Exchange)
// Logos of coins on Allocation Table and ATH table
// Dashboard taking too much time to load
// Stock Assets that we don't have data, we need to message user to contact the administrator to include Symbol (Google Finance/Sheet)
// Hide the TO TSX NY... Exchange
// Dashboard Menu must be highlighted when chosen
// Clear button for all filters on Asset Page
// If you don't have a net worth data show a message in the space of the chart
// Dashboard without any data. Show a message.
// Shortcut without any data. Show a message.
// Cryptos Page without any data. Show a message.
// Stocks Page without any data. Show a message.
// What happen if there is no cash to invest? What we will show?
// Tag Card + Save localstorage + No Tag, no total
// Total By Something: if no Something, show Message to Add an Asset Something
// Tag Card be empty and Cash is creating a '' instead of null
// Include Clear as an option for Cash BRL
// Gauge Indicator (Chart) for what? For Caixa?
// create a way to filter by cash
// Set up a Goal: Add a Goal, update a Goal
// Reduce height of first cards on Dashboard to give space for the Gauge Indicator or Alerts
// What to do on Update? --> Give the altcoins automatically the right category on Add Assets (when changes the assets must clear the category)
// Include MM Wallet
// Context Error
// Clerk Middleware Error because of the usage of a Clerk function on the [[...rest]] page (Homepage) and is not working in the middleware exception
// If it's BTC, we already give it a category
// Give the altcoins automatically the right category on Add Assets
// Check the categories for the altcoins (hardcoded array)
// Filter by Exchange must be a dropdown (assets page)
// Fix the annoying reload when Add, Update and Delete Assets
// When we filter by asset on the Assets Page, if there are the same symbol in the same exchange, it shows below, the sum of it.
// If a Token doesn't exist in the search (Assets Page), we show the right message
// Smart Contract button (alignment)
// Error if try to Add Asset "Supply Chain"
// Tag properties of Assets
// Clear Tag button on Update Assets
// Total by Tag in Dashboard
// Quantity in the forms for Updating Assets (error formatting)
// Include Category for Crypto Assets as Tags. I'm not sure if it is a good idea. Too much work for not much value.
// Cryptos Page needs to have a sub Dashboard like the Stocks Page (main reason: how much by Exchange)
// Crypto Page: Pie Chart for Wallet Shares
// Crypto For Trading
// Hello, Francis! Greetings on Header
// Fear and Greed
// Created Purpose Property in the Assets Page
// Stocks by Currency (BRL, CAD, USD)
// Stocks by Location (BR, CA)
// API Refactoring Crypto for one call
// Chart of Net Worth Evolution on Dashboard
// Cron Job for the Net Worth Evolution Chart
// Table Alignment in the Assets Page
// https://ui.shadcn.com/docs/components/tabs - Tabs for Cryptos page
// Q.ETH is USD and there is the possibility only to set it in CAD
// Fix bug Assets Page: resilience if the coin is not found
// Fix bug buttons on the +Asset Form
// Wealthsimple Assets is not getting prices (check if APIs are working or of the values are Hardcoded)
// Create the Crypto column of how much in percentage we want of each Asset and show how much is missing or over the limit
// Many Assets (Stock-CAD) is not priced
// Update Asset - with new logic in the form
// Fix bug Crypto Prices that was more expensive
// Move Cryptos from Dashboard to Cryptos Page
// Move Stocks from Dashboard to Stocks Page
// Dinamically generate the fields depend on the type of asset: https://www.youtube.com/watch?v=lW_0InDuejU&t=8s
// Test No Assets Page, then test it including one Asset in the database
// Button Styles
// Add Asset, fix bug Radio Button
// Delete Asset, fix error message
// change all qtd to qty
// Home beofre Dashboard - ref.: Kajabi
// Card "Next Purchases"
// No more Password for Pull Request
// favicon
// Fix Sign in Bug
// Fix context bug so we can reload Assets page
// Fix Hydration bug
// Add filter in the Asset Table
// The problem is here: the data for the form is not going for the right coin by this component below
// Solution is to forget the edition inline, and use the action with dropdown to edit the goal (opens a form with a server action)
// Create Server Action for getting Crypto Goals of this user
// Symbol + Amount (USD) + Percentage + Goal (%) + Goal (USD)
// Include Share data
// Include Observation field (Look at Stochastic Analysis 4h, MACD 3D and W)
// Add Asset: if there isn't this asset symbol in the CoinGaol table, create it with goal = 0
// Crypto Page: tabs on the top of the page to change the table between ATH and Allocation goals
// PRIO3 is not priced
// APE is not priced
// Assets page, Filter by Exchange

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
