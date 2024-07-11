// Prompt AI: I have this app to manage my investments where I show a spreadsheet with each asset, with its proprieties, and also many cards to summarize specific data. Each card has a Title (name) and a description. I will have a card that shows the total amount of the whole vault in 3 different currencies (USD, CAD, BRL). How can I can this card and its description? It must be short.

// TODO: For edit pencil: https://ui.shadcn.com/docs/components/tooltip
// TODO: example: https://ui.shadcn.com/examples/tasks
// TODO: Add Priority
// TODO: Fix ILV and CRO that is saying to buy them
// TODO: Create button Clear and Minimum Amount (0.01)
// TODO: https://ui.shadcn.com/docs/components/tabs
// TODO: Criar TAGS para Crypto Assets? Safe, Gema, Risky, Bet
// TODO: Include Category for Crypto Assets as Tags. I'm not sure if it is a good idea. Too much work for not much value.
// TODO: Show the field (form) with the goal pulled from CoinGoal database
// TODO: If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// TODO: Create button to save the goal for each asset (current line) + Save in the database
// TODO: What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.
// TODO: What appears on SELL and BUY because of the goal, need to appear in the next purchases card

//------------------------------------------
// TODO: BTC Dominance
// TODO: Altseason Indicators
// TODO: Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// TODO: Resistences and Supports?
// TODO: // Not using yet for now, but let's create a page to rank the coins (See Crypto.server file)
// ERROS:
// TODO: On Update Asset: we need to correct the format of the number (decimals, commas and dots)
// TODO: Context
// TODO: Reload when we update an asset
// ⨯ Error: Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware() (or the deprecated authMiddleware()). Please ensure the following:
// -  clerkMiddleware() (or the deprecated authMiddleware()) is used in your Next.js Middleware.

// PRIORITIES 1:
// TODO: Crypto For Trading
// TODO: Assets to be aware of: for position trade checking RSI and other indicators (ie.: DOL, GLXY...)

// TODO: Stocks by Currency (BRL, CAD, USD)
// TODO: Stocks by Location (BR, CA)
// TODO: DJT in the Dashboard
// TODO: Assets page, Filter by Exchange + Currency using Dropdown
// TODO: Fix bug on Production Environment because it doesn't work (show assets)
// TODO: Have validation on the Forms
// TODO: alert: recommendation if the amount is too much for a little potential growth

// SMALL PRIORITIES:
// TODO: Avatar Dropdown Style (no border is weird)
// TODO: Dark Mode https://ui.shadcn.com/docs/dark-mode/next
// TODO: Font Bug

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
// TODO: Hello, Francis! Greetings on Header
// TODO: Fear and Greed
// TODO: Created Purpose Property in the Assets Page
// TODO: API Refactoring Crypto for one call
// TODO: Chart of Net Worth Evolution on Dashboard
// TODO: Cron Job for the Net Worth Evolution Chart
// TODO: Table Alignment in the Assets Page
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
