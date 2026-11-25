/* Catalogue of XMTrading 2027 product ideas: single source of truth for the studio, the review dock and the comments page.

   HOW TO WORK WITH THIS FILE
   - Every idea from the "XMTrading 2027 Product Ideas" deck is listed once, in deck order. Ids are stable: never renumber.
   - When you build a prototype, edit ONLY your own entry: set status: 'built', add `path`, fill `shows`.
   - Details: docs/ADDING_AN_IDEA.md. Validate with:  python3 scripts/check.py

   Fields
     id         two-digit string, stable ('01'...). Also the prefix of the folder name: ideas/<id>-<slug>/
     slide      slide number(s) in the 2027 deck, e.g. 12 or '12-13'
     area       key of XM_AREAS below
     status     'built'  = clickable prototype exists (needs `path` and `shows`)
                'todo'   = shortlisted, prototype still to be built
                'deck'   = idea only (deck text, not shortlisted yet)
     title      short name (list + header)
     short      one line (list sub-title)
     assumption / scope / metrics / proposal   deck text. String or array of strings.
     shows      what the prototype shows (array of bullets), only for status 'built'
     shortlist  { priority: 1|2, impact: 'High'|'Medium'|'Low', confidence: '', notes: '' }  or omit
     images     deck screenshots, paths under assets/deck/
     links      [{ label, url }] Figma, AI Studio, references
     flag       optional amber banner text, e.g. 'In progress'
*/
window.XM_CONFIG = {
  /* Deployed address (GitHub Pages). Used for copied links and the "Slide links" table.
     Leave empty to use the address the studio is currently opened from. */
  publicUrl: '',
  deck: 'XMTrading 2027 Product Ideas'
};

window.XM_AREAS = {
  promotions: { label: 'Promotions',                 color: '#008454', blurb: 'Bonuses, RAF, loyalty, seasonal and other promotions' },
  loyalty:    { label: 'Client Loyalty',             color: '#c26a00', blurb: 'XMP, tiers and rewards for existing clients' },
  affiliates: { label: 'XMTD Affiliates',            color: '#2f62f0', blurb: 'Affiliate promotions and the partner platform' },
  onboarding: { label: 'Onboarding and Education',   color: '#8a3fd1', blurb: 'Customer onboarding, education, support and KYC tooling' },
  trading:    { label: 'Trading',                    color: '#0b7285', blurb: 'Charts, order ticket, alerts, automation and gamification' },
  financial:  { label: 'Financial Products',         color: '#d6336c', blurb: 'Instruments, marketplace perks and promotion screens' },
  internal:   { label: 'Internal Tools for XMTD',    color: '#5f6670', blurb: 'Tools for the XMTD teams' }
};

window.XM_IDEAS = [
  /* ============================ NEW: TEAM CONTESTS (P1, first in the list) ============================ */
  {
    id: '01', slide: 'n/a', area: 'trading', status: 'built',
    path: 'ideas/01-team-contests/index.html',
    title: 'Team contests',
    short: 'Form a team, invite up to 5 friends and compete on a team leaderboard',
    shortlist: { priority: 1, impact: 'High', confidence: '', notes: 'New idea, not in the original deck. First in the P1 list.' },
    shows: [
      'Competitions page in the PWA with Participating / In Progress / Upcoming / Ended filters',
      'Register as a team: team name check, then a team lobby for the contest',
      'Invite link with copy and share buttons, and a live count of members who joined by your invite',
      'Maximum of 6 members: full-team state pauses the link, removing a member reopens a spot',
      'Individual and team leaderboards in parallel, with a separate team prize pool'
    ],
    assumption: 'If we allow users to form teams (for example a Daimyo leading a Ninja Crew), we may see a boost in overall trading volume.',
    scope: [
      'Participants compete on individual and team leaderboards in parallel.',
      'A separate prize pool for the team track means that even if a user falls behind individually, they may stay motivated to keep trading to support their team\u2019s rank and share in the collective prize.',
      'Add a Register as a team button on the contest. The team lead sees how many members joined by their invite. A team has a maximum of 6 members.'
    ],
    metrics: 'Team registrations, members per team, invite-to-join conversion, new registrations and funded accounts from invites, trading volume and active days of team members versus solo participants. Monitor abuse (multi-accounting between team members), complaints and prize cost.',
    proposal: 'Let clients register for a contest as a team. The lead invites friends by link, up to 6 members in total, and watches the roster fill. Teams compete on a team leaderboard with its own prize pool, alongside the individual one.'
  },

  /* ============================ PROMOTIONS ============================ */
  {
    id: '02', slide: 4, area: 'promotions', status: 'deck',
    title: 'RAF progression',
    short: 'Referral milestones 0, 5, 10, 15 in the Client Portal',
    assumption: 'Clients who successfully refer 15 qualified new clients may be receptive to a clear invitation to explore the existing Partner Program. A recognition milestone could increase sustained advocacy without changing affiliate economics or eligibility. Hypothesis only: 15 is a proposed trigger.',
    scope: ['Show a referral milestone journey in the Client Portal: 0, 5, 10, 15 qualified referrals.', 'At 15, display a promotional "Explore becoming a Partner" CTA linking to the existing Partner application and terms.', 'No automatic Partner conversion; existing approval, compliance, commissions and program rules remain unchanged.'],
    metrics: 'CTA impressions, clicks, completed applications, approved Partners; qualified referrals per 1,000 eligible clients; incremental retained client value. Pilot the milestone messaging against a control cohort.'
  },
  {
    id: '03', slide: 5, area: 'promotions', status: 'deck',
    title: 'RAF visibility in PWA',
    short: 'Referral dashboard from invite to reward',
    assumption: 'Referrers may share more frequently when they can see progress from invite to reward, understand the next step, and identify when a referral has qualified. Better transparency may reduce support questions and increase completion.',
    scope: 'Introduce a PWA referral dashboard: aggregate link clicks, registrations, KYC completed, funded accounts, qualifying lots progress, rewards pending and paid. Include milestones, eligibility explanations and pre-completed reminders. Some other changes might also be needed.',
    metrics: 'PWA RAF dashboard adoption, repeat visits, shares per active referrer, referral-to-funded conversion, funded-to-3-lot completion, time to payout, support contact rate, qualified referrals per 1,000 eligible clients.'
  },
  {
    id: '04', slide: 6, area: 'promotions', status: 'built',
    title: 'Staged rewards based on trading milestones',
    short: 'Missions: deposit, then volume milestones unlock rewards',
    path: 'ideas/04-staged-rewards/index.html',
    shows: ['Login popup with three missions: deposit $100, trade $300,000, trade $500,000, each with its own reward and progress', 'Home widget: a compact track with the current mission, progress bar and one clear next action', 'My Profile sidebar: missions listed under the loyalty scale, with the $300K and $500K marks on the way to the next tier', 'Deposit, trade and claim actually work: nodes unlock, Credit updates, confetti on claim; presets and a volume slider move the demo client', 'Referred-client variant and a mobile view (bottom-sheet popup, Home, Profile)', 'Illustrative values only: rewards and thresholds are placeholders'],
    shortlist: { priority: 2, impact: 'High', confidence: '', notes: '' },
    assumption: 'Clients are more likely to finish a reward when it is split into small, visible missions than when it hangs on one large requirement.',
    scope: ['Three starter missions, each with its own reward: deposit $100, reach $300,000 trading volume, reach $500,000 trading volume.', 'One mission track, shown in the login popup, on the Home page and next to the loyalty scale in My Profile, always pointing to the next step.', 'Later missions: first trade, a chosen instrument, staying active over a set period.', 'Referred clients get the same missions, so referrer and referee both see progress.'],
    metrics: 'Primary: share of clients who complete the 3-lot requirement. Also track: first-deposit rate, drop-off between missions, mission completion rate, repeat visits and trading volume per client. Goal: a clearer path and a stronger sense of progress for both sides.'
  },
  {
    id: '05', slide: 6, area: 'promotions', status: 'deck',
    title: 'Promote referrals through the MQ mobile app',
    short: 'Referral notifications in the app with 58% of NDC share',
    scope: 'Test referral notifications and promotional messaging through the MQ Mobile App, which represents 58.0% of combined NDC share.',
    metrics: 'Expected benefit: using the most relevant digital channel could increase referral awareness, improve engagement and generate more registrations from active mobile users.'
  },
  {
    id: '06', slide: 7, area: 'promotions', status: 'deck',
    title: 'Referral portal and PWA transparency',
    short: 'Better share message, clearer journey for referrers',
    scope: ['Improve the preselected message users share from the Portal; clear, engaging and easy to personalise.', 'The PWA shows how much referred clients have traded, progress toward qualifying requirements, generated rewards, remaining milestones, registrations, active clients and conversion rates.'],
    metrics: 'Expected benefit: referrals easier to share, better referral communication, more referrer engagement, and confidence that referrals and rewards are tracked accurately.'
  },
  {
    id: '07', slide: 8, area: 'promotions', status: 'deck',
    title: 'Referee chooses Trading Credit or Cash',
    short: 'Pick the reward type at claim time',
    scope: 'Present both options clearly during the reward-claim process, including value, terms, restrictions and conditions. Trading Credit could be positioned as the faster or more flexible option where cash payments are unavailable. Subject to eligibility and payment-provider limitations.',
    metrics: 'Expected benefit: greater flexibility, less payment-related friction, better reward satisfaction and potentially higher referral-programme completion.'
  },
  {
    id: '08', slide: 9, area: 'promotions', status: 'deck',
    title: 'RAF conversion experiments',
    short: 'A/B: $150 + $40 vs $100 + $100, guest-first code sharing',
    flag: 'In motion',
    assumption: 'XMTrading currently positions $150 for the referrer and $40 trading credit for the friend. A more balanced offer may make invitations easier to accept; simpler code-based sharing may expand reach.',
    scope: 'Run a controlled A/B test: current $150 + $40 versus proposed $100 + $100, with reward type and eligibility explicitly defined. Explore a guest-first code sharing flow without a Portal profile.',
    metrics: 'Primary KPI: incremental qualified referrals per 1,000 eligible clients at acceptable reward cost. Secondary: link-to-registration, registration-to-funded, funded-to-qualified, friend activation, 30/90-day retention, LTV and fraud rate.'
  },
  {
    id: '09', slide: 10, area: 'promotions', status: 'built',
    title: 'New currency in wallet',
    short: 'JPY as a wallet currency, benefits credited in JPY',
    path: 'ideas/09-new-currency-in-wallet/index.html',
    shows: ['MyWallet with a USD wallet and a one-tap Add JPY wallet step; the total can be viewed in USD or JPY', 'Reward claim compared: today (USD, converted later) versus a JPY wallet (credited in yen, nothing to convert)', 'Transfer to a JPY trading account with a conversion summary, whole-yen check and insufficient-balance error', 'Balances and transaction history update across scenes; Reset demo restores the start', 'Illustrative values only: the rate is 1 USD = ¥150'],
    shortlist: { priority: 2, impact: 'Medium', confidence: '', notes: '' },
    assumption: 'Adding more currencies to the client wallet, starting with JPY, gives greater flexibility when offering promotional benefits and rewards in the clients\' preferred currency, with fewer currency conversions.',
    scope: ['Add JPY as an available wallet currency.', 'Allow promotional benefits, bonuses and rewards to be credited directly in JPY.', 'More flexibility for country-specific campaigns and promotions.', 'Proper currency conversion and wallet balance management where applicable.', 'Consistent experience across supported wallet currencies.'],
    metrics: ['More promotional benefit claims and utilisation.', 'Higher conversion in campaigns targeting JPY clients.', 'More wallet activity and benefit redemption.', 'Better client retention and engagement.', 'Less currency-related friction when distributing rewards.']
  },

  /* ============================ CLIENT LOYALTY ============================ */
  {
    id: '10', slide: '12-13', area: 'loyalty', status: 'built',
    title: 'XMP Spread Saver',
    short: 'Use XMPs at the order ticket to offset spread cost',
    path: 'ideas/10-xmp-spread-saver/index.html',
    shortlist: { priority: 2, impact: 'High', confidence: '', notes: '' },
    assumption: 'Applying XMPs to eligible spread cost could make loyalty value more tangible for traders; the benefit and trading economics need validation.',
    scope: 'Eligible Platinum traders see an estimated XMP offset on the order ticket, choose an amount and confirm. Trade history shows trading P/L and any XMP credit separately. Concept ratio: 15 XMP = $1 withdrawable value.',
    metrics: ['Trader: adoption among eligible Platinum clients; XMP redemption and repeat-use rate; understanding of the history credit; support contacts about spread offset.', 'XMTrading: incremental activity vs eligible holdout; net contribution after XMP cost; XMP cost per retained active trader; support or dispute rate after redemption.'],
    shows: ['PWA order ticket with the "XMP spread saver" card: toggle, XMP stepper, estimated spread cost, XMP credit and net spread cost (15 XMP = $1)', 'Lots and instrument change the estimate live; the amount is capped by the spread cost and the XMP balance', 'Platinum-only: a Gold client sees why it is locked and how to unlock it', 'Open position, close it, then history shows trading P/L and XMP credit as separate lines', 'Illustrative values only: ratio, caps and eligibility are placeholders'],
    images: ['assets/deck/s13-xmp-spread-saver.png'],
    links: [{ label: 'Figma prototype', url: 'https://www.figma.com/design/JDbhXCVI8YjN12s1M02ez2/XMTrading-XMP-Spread-Saver?node-id=4-2' }]
  },

  /* ============================ XMTD AFFILIATES ============================ */
  {
    id: '11', slide: '15-16', area: 'affiliates', status: 'deck',
    title: 'Referral codes',
    short: 'Several memorable codes per affiliate, code-level stats',
    assumption: 'Giving affiliates multiple memorable referral codes may increase sharing and enable channel-specific attribution.',
    scope: 'Let affiliates create, copy and manage referral codes, explain where codes appear during registration, and view code-level performance. Define eligibility and attribution rules.',
    metrics: ['Affiliate: codes created and actively shared; link/code clicks and sign-ups per code; first-time funded clients per code; commission per code.', 'XMTrading: incremental qualified funded clients; registration-to-funded conversion; cost per qualified acquired client; attribution accuracy and fraud flags.'],
    images: ['assets/deck/s16-referral-codes.png']
  },
  {
    id: '12', slide: '17-18', area: 'affiliates', status: 'deck',
    title: 'Custom short links',
    short: 'Branded short links from approved destinations',
    assumption: 'Branded, customizable affiliate links may make campaign promotion easier and improve tracking across channels.',
    scope: 'Create a short link from an approved XMTrading destination, select a unique alias, add an internal label, and manage links in one searchable table. Validate destinations and enforce tracking.',
    metrics: ['Affiliate: active links by campaign/channel; click-through and share-to-click rates; registration and funding conversion per link; best-performing destinations.', 'XMTrading: qualified funded clients per link; acquisition cost by source/campaign; link-to-registration conversion; invalid links, abuse and attribution loss.'],
    images: ['assets/deck/s18-short-links.png']
  },
  {
    id: '13', slide: '19-21', area: 'affiliates', status: 'built',
    title: 'Personalized sign-up page',
    short: 'Affiliate configurator with live preview and a dedicated sign-up page',
    path: 'ideas/13-personalized-signup/index.html',
    shortlist: { priority: 2, impact: 'Medium', confidence: '', notes: '' },
    assumption: 'A trusted, affiliate-branded introduction may help prospective clients understand the offer and complete registration.',
    scope: 'A configurator for affiliates: set an approved photo or logo, display name, language, introduction, benefits and campaign highlights, check a live desktop and mobile preview, then publish a dedicated sign-up page with their own tracked link. XMTrading controls compliant claims and approved templates.',
    metrics: ['Affiliate: page visits and unique visitors; visitor-to-registration conversion; registration-to-first-deposit conversion; leads and funded clients attributed to the page.', 'XMTrading: incremental qualified funded clients; cost per funded client versus generic pages; 30/90-day activation and retention; content approval rate and compliance incidents.'],
    shows: ['Affiliate platform editor: profile photo, display name, language, approved template, about me, event highlight and benefit description', 'Live preview next to the form, switchable between desktop and mobile', 'Approval status: Draft, Pending XMTrading review, Approved (simulated), with the approved-claims guardrails', 'Visitor view: the published page with the affiliate context, the XMTrading offer and the registration form', 'Illustrative copy and offers only; templates and claims are placeholders'],
    images: ['assets/deck/s20-personalized-signup.png']
  },
  {
    id: '14', slide: '22-23', area: 'affiliates', status: 'deck',
    title: 'Affiliate campaigns and competitions',
    short: 'Catalogue of time-limited, ready-to-share campaigns',
    assumption: 'Ready-to-share, time-limited campaigns may increase affiliate engagement and bring in new qualified clients.',
    scope: 'Provide a campaign catalogue with eligibility, promotional assets, campaign links, deadlines, rewards and status. Affiliates can join and track campaign-specific results.',
    metrics: ['Affiliate: campaign participation and promotion rate; traffic and registrations per campaign; qualified funded referrals and rewards; repeat participation.', 'XMTrading: incremental funded clients and net deposits; campaign CPA and reward ROI; client trading activation and retention; eligibility compliance and suspicious activity.'],
    images: ['assets/deck/s23-campaigns.png']
  },
  {
    id: '15', slide: '24-25', area: 'affiliates', status: 'deck',
    title: 'Community group bot',
    short: 'Telegram / Discord bot verifies referred members',
    assumption: 'Affiliates running Telegram or Discord communities may benefit from automated membership checks tied to referral attribution.',
    scope: 'Offer an opt-in bot setup with guided connection, role permissions and eligibility verification. Provide clear member consent, privacy safeguards and a way to disconnect the bot.',
    metrics: ['Affiliate: connected communities and verified members; verification completion rate; time saved on manual checks; community-driven funded referrals.', 'XMTrading: incremental qualified funded clients; verification accuracy and support volume; community-to-funded conversion; privacy/security incidents and bot misuse.'],
    images: ['assets/deck/s25-community-bot.png']
  },
  {
    id: '16', slide: '26-27', area: 'affiliates', status: 'deck',
    title: 'Cashback offer studio',
    short: 'Partner-tied cashback offers within an approved cap',
    assumption: 'Partner-tied cashback offers may make affiliate promotions more distinctive while XMTrading keeps incremental campaign cost within an approved cap.',
    scope: 'Build offers from approved mechanics, audiences and dates; cap eligible volume; submit for review; publish a tracked partner page. Existing base cashback stays unchanged.',
    metrics: ['Affiliate: offer creation-to-approval time; active offers and repeat campaign use; click-to-qualified-funding rate per offer; offer-level referred client performance.', 'XMTrading: qualified funded clients; promo cost per funded client; campaigns within approved exposure caps; partner retention among adopters vs peers.'],
    images: ['assets/deck/s27-cashback-studio.png'],
    links: [{ label: 'Figma prototype', url: 'https://www.figma.com/design/cUtO7XugOspZ56dlQGm3rK/XMTrading-Cashback-Offer-Studio?node-id=0-1' }]
  },
  {
    id: '17', slide: '28-29', area: 'affiliates', status: 'deck',
    title: 'Affiliate postbacks',
    short: 'Signed milestone events sent to the affiliate\'s endpoint',
    assumption: 'Signed, timely milestone events may let affiliates optimize campaigns with less manual reporting and make their XMTrading integration more useful to keep.',
    scope: 'Affiliates add an HTTPS endpoint, configure signing, select permitted events and preview payloads; test before activation; then review delivery history and retries. Minimize client data.',
    metrics: ['Affiliate: time to first successful test; partners with active postback endpoints; event delivery success and retry rate; campaign changes using event feedback.', 'XMTrading: delivery latency (p95) and success rate; duplicate or failed events per 1,000; support tickets per integration; retention among active integrators.'],
    images: ['assets/deck/s29-postbacks.png'],
    links: [{ label: 'Figma prototype', url: 'https://www.figma.com/design/jlq8BNrxhHGyCdkppy164w/XMTrading-Affiliate-Postback-Studio?node-id=2-2' }]
  },
  {
    id: '18', slide: '30-31', area: 'affiliates', status: 'deck',
    title: 'Partner automation API',
    short: 'API and embeddable market and campaign widgets',
    assumption: 'An API plus embeddable market and campaign components could keep affiliate pages current after a one-time setup, reducing publisher effort and increasing integration stickiness.',
    scope: 'Affiliates choose a localized market or campaign component, preview it in a sandbox and embed a generated snippet. XMTrading manages approved content updates and attribution. Validate market-data rights, security and campaign governance. Concept mockup only, no Figma prototype yet.',
    metrics: ['Affiliate: time from API setup to first live embed; active partners and deployed widgets; campaign updates without manual edits; satisfaction and continued use.', 'XMTrading: API uptime and data freshness; widget clicks to tracked XMTrading pages; API-attributed qualified funded clients; retention and growth among adopters.']
  },
  {
    id: '19', slide: '32-33', area: 'affiliates', status: 'deck',
    title: 'Branded loyalty coins',
    short: 'Tier-branded coins issued by partner campaigns',
    assumption: 'Tier-branded coins could make XMTD loyalty more tangible and allow for new, distinctive campaign features, with reward cost controlled by eligibility and caps.',
    scope: ['Create XM-branded tier crests that identify each tier and give it an identity.', 'Campaign flow: set campaign; eligible referrals receive branded coins in loyalty (earned tier and XMP stay unchanged); clients redeem coins for selected tier rewards.', 'Eligibility, reward choice, limits and expiry are shown before claim; XMTrading measures activity against reward cost.']
  },
  {
    id: '20', slide: '34-35', area: 'affiliates', status: 'deck',
    title: 'Affiliate media rotation',
    short: 'Self-serve rotator embed for affiliate placements',
    assumption: 'A self-serve media rotator could keep affiliate placements current with less manual upkeep, while preserving partner attribution and giving XMTD a measurable content channel.',
    scope: 'Affiliates select approved XMTD creatives or submit permitted HTTPS media URLs, add their tracked destination, set display options (badge, placement, sound, call-to-action) and copy an embed. Each load randomly serves one active asset. XMTD controls approval, expiry and attribution.',
    metrics: ['Affiliate: time to first live placement; active embeds per affiliate; reuse of placements across campaigns; retention among tool users vs peers.', 'XMTD: impressions and clicks by asset; click-through rate on placements; click-to-qualified registration rate; broken or expired creative rate.'],
    images: ['assets/deck/s35-media-rotation.png']
  },
  {
    id: '21', slide: 36, area: 'affiliates', status: 'deck',
    title: 'Spin the wheel promotions',
    short: 'Wheel on the homepage or registration, plus a promo summary',
    scope: 'Show a spin the wheel when the user registers, with a specific promo invented for it. Afterwards, show an infographic with all of the user\'s promos in a gamified manner.',
    metrics: ['Registration completed.', 'Promotion participation diversified (a suitable metric still to be defined).'],
    proposal: 'Introduce spin the wheel plus an all-promos summary on the Homepage or in Registration.'
  },

  /* ============================ ONBOARDING AND EDUCATION ============================ */
  {
    id: '22', slide: 38, area: 'onboarding', status: 'deck',
    title: 'KYC: colour code indicators',
    short: 'Case age shown as white, orange, red in the KYC inbox',
    scope: 'Cases uploaded today stay white, cases from yesterday turn orange at midnight, and cases pending for 2 days or longer turn red. The team already works top to bottom; the colours draw attention to aging accounts, create urgency for overdue cases and show queue health at a glance. A one-click view of all aging accounts (orange/red) shows the backlog.',
    metrics: ['Reduce average handling time per case.', 'Increase daily throughput per admin.', 'Decrease the number of overdue cases.'],
    proposal: 'Introduce dynamic, color-coded visual indicators in the KYC inbox based on document upload age. Ask from the Operational team.'
  },
  {
    id: '23', slide: 39, area: 'onboarding', status: 'deck',
    title: 'KYC: timer rule',
    short: 'Ownership returns to the inbox when no action is taken',
    scope: 'If a user takes ownership of an account but takes no action within X minutes (for example 30), ownership is automatically released back to the general inbox. A visible countdown can turn red in the last 5 minutes.',
    metrics: ['Reduce average handling time per case.', 'Increase daily throughput per admin.', 'Decrease the number of overdue cases.', 'Prevents accounts getting stuck in an inactive user\'s personal queue (break, log off). In XMTD/MU it also pushes users to handle cases faster.'],
    proposal: 'Ask from the Operational team.'
  },
  {
    id: '24', slide: 40, area: 'onboarding', status: 'deck',
    title: 'KYC: tool view and performance report',
    short: 'Safer buttons, bigger tick box, per-brand report',
    scope: ['Proposal 1: enhance the KYC performance report with a per-brand/agent filter, an alternative data source for handled cases by brand without relying entirely on SAPBI.', 'Proposal 2: the "Move to CD folder" and "Move to on hold" buttons sit close together and are pressed by mistake across brands. Reposition them or add space.', 'Proposal 3: make the sensitive info box bigger so it is easier to tick.'],
    proposal: 'Ask from the Operational team.',
    images: ['assets/deck/s40-kyc-tool-view-a.png', 'assets/deck/s40-kyc-tool-view-b.png']
  },
  {
    id: '25', slide: 41, area: 'onboarding', status: 'deck',
    title: 'KYC: fix total count with filtering',
    short: 'Pending count follows the filters applied',
    scope: 'The total of pending cases in KYC should reflect the filters applied, not the total across all brands. In the screenshot the XMTD/MU brands have 538 pending cases, while 583 is the total of all inboxes and brands combined.',
    proposal: 'Ask from the Operational team.',
    images: ['assets/deck/s41-kyc-count.png']
  },
  {
    id: '26', slide: 42, area: 'onboarding', status: 'deck',
    title: 'PWA: MyWallet in the Funding tab',
    short: 'Same Funding options from the left panel and top right',
    scope: 'Observation: the Funding section reached through Other (left panel) has Deposit, Withdraw and MyWallet, while the Funding section from the top right corner has only Deposit and Withdraw. Add MyWallet to the Funding tab reachable from the top right corner.',
    images: ['assets/deck/s42-mywallet-a.png', 'assets/deck/s42-mywallet-b.png']
  },

  /* ============================ TRADING ============================ */
  {
    id: '28', slide: '45-46', area: 'trading', status: 'built',
    title: 'Trading hours on the chart',
    path: 'ideas/28-trading-hours-chart/index.html',
    shows: [
      'Chart tinted by session: pre-market, regular, after-hours and closed, with labels and time boundaries',
      'Sessions filter: shading, labels and regular hours only, so it stays non-intrusive',
      'Demo clock and Play the day to watch the chart and ticket change as sessions start and end',
      'Order ticket that explains limit-only sessions and queues market orders for the open',
      'Mobile chart with an hours strip, and the Market hours sheet with Stock/CFD tabs and a time-zone switch'
    ],
    short: 'Pre-market, regular, after-hours and closed shading',
    scope: 'Subtle background shading, session labels and clear time boundaries within the trading chart, so traders understand market status, read price moves in context and see when liquidity and volatility may change. It should work as a filter so it is non-intrusive. Include: pre-market, regular market, after-hours, market closed.',
    metrics: 'Better trading-hour comprehension, less user confusion, more chart engagement, more informed trading decisions.',
    proposal: 'Improve the visibility of trading hours by separating pre-market, regular-market and closed-market periods directly on the chart.',
    images: ['assets/deck/s46-trading-hours.png'],
    links: [{ label: 'AI Studio draft', url: 'https://ai.studio/apps/bb1712a5-9978-4ba9-880e-e75932be86e3' }]
  },
  {
    id: '29', slide: '47-48', area: 'trading', status: 'deck',
    title: 'Promotions and rewards inside trading',
    short: 'Tier, points, promos and multipliers where the trade is made',
    scope: 'Display the loyalty tier, reward points, active promotions and applicable multipliers in key areas such as the header, watchlist, instrument panel and order ticket. Show a clear breakdown of how a trade contributes to rewards, with simple eligibility indicators and contextual explanations. Design principle: rewards should enhance a trade decision, not define whether the trade feels worthwhile.',
    metrics: 'More promotion awareness, reward-program engagement, eligible trade volume, repeat trading and loyalty; less confusion by making reward eligibility visible at the moment of decision.',
    proposal: 'Integrate promotions, bonuses and loyalty rewards directly into the trading interface so users see eligibility and potential benefits while placing trades.',
    images: ['assets/deck/s48-promos-in-trading-a.png', 'assets/deck/s48-promos-in-trading-b.png']
  },
  {
    id: '30', slide: '49-50', area: 'trading', status: 'deck',
    title: 'Protected SL / TP',
    short: 'Pay a transparent premium to guarantee SL or TP execution',
    scope: 'Add an optional protection toggle when setting an SL or TP, displaying the premium cost, protected price, expiry conditions, and whether the premium is refundable or charged only when triggered.',
    metrics: 'More risk-management adoption, protected-order usage, premium revenue and client confidence, while monitoring pricing transparency, complaints and execution quality.',
    proposal: 'Allow traders to protect their Stop Loss or Take Profit execution by paying a transparent premium, guaranteeing execution at the selected price even during high volatility or market gaps.',
    images: ['assets/deck/s50-protected-sl-tp.png']
  },
  {
    id: '31', slide: 51, area: 'trading', status: 'built',
    path: 'ideas/31-notifications-about-chosen-instruments/index.html',
    shows: [
      'Follow instruments for trade ideas and/or news, with search and an empty-state summary',
      'Channel choice (mobile push, PWA banner, email, chat), frequency caps and quiet hours',
      'Mobile push on a lock screen that opens the idea with entry, target and stop',
      'Top banner inside the PWA when the app is open, with dismiss, auto-hide and a notification inbox',
      'Delivery log that explains why each event was sent, held or skipped'
    ],
    title: 'Notifications about chosen instruments',
    short: 'Subscribe to ideas and news for the instruments you follow',
    shortlist: { priority: 1, impact: 'High', confidence: '', notes: 'Prioritise for WEB over PWA' },
    scope: 'A user can subscribe to instrument(s) for trade ideas and for news connected with the instrument. When a new idea or news item appears, a notification arrives in the chosen channel (mobile push, browser alert, email, WA/LINE/TG, etc).',
    metrics: 'More relevant return visits and engagement with instrument pages, with potential growth in trading activity. Measure subscriptions, notification opens, instrument-page visits and subsequent trades; monitor opt-outs, complaints and changes in risk-taking after alerts.',
    proposal: 'Send timely, relevant updates that help traders assess market events and potential opportunities. Allow users to subscribe to news and trade ideas for instruments they follow.'
  },
  {
    id: '32', slide: 52, area: 'trading', status: 'deck',
    title: 'Gamification: daily and weekly tasks',
    short: 'Tasks, points, badges and levels in the PWA member area',
    scope: 'Show daily/weekly tasks in the PWA member area, with progress through points, badges or levels. Define task eligibility, reward limits and anti-abuse rules. It can also be positioned as creating a sense of productivity. Tasks could be reviewing a market, checking open positions, exploring a trade, joining a competition, and also opening a trade if acceptable from the legal side. The gamification can grow into a system covering trading, learning, competitions, RAF and more, perhaps Duolingo style.',
    metrics: 'More retention and trading activity. Measure task completion, repeat visits, competition entries and trading volume; monitor losses, complaints and reward costs.',
    proposal: 'Introduce daily and weekly tasks that give traders a reason to return and build trading habits.'
  },
  {
    id: '33', slide: 53, area: 'trading', status: 'deck',
    title: 'Third-party bot services',
    short: 'Authorize a bot service through a trading API key',
    scope: 'Provide a trading API and a way for clients to authorize a bot service, initially through a key created for their account. The connection allows order placement but not withdrawals, and clients can revoke it.',
    metrics: 'Attract and retain traders who want automation and potentially increase account activity. Measure connected accounts, users who launch a bot, retention and trading activity compared with similar users; track failed orders, connection issues, complaints and losses.',
    proposal: 'Enable clients to connect their accounts to selected third-party bot services, where they create automated strategies that execute on our platform, without us building a bot creator.'
  },
  {
    id: '34', slide: 54, area: 'trading', status: 'todo',
    title: 'Trade the news simulator',
    short: 'Practise trading the direction after major news',
    shortlist: { priority: 2, impact: 'Medium', confidence: 'Medium', notes: 'Needs extensive work' },
    scope: 'Modeled chart behaviour that unites, in one session, prominent market volatility events where the user tries to trade the right direction after the major news sequence. A training in high waves, possibly combined with competitions.',
    metrics: ['Acquisition: leads and visitors.', 'Conversion to clients.', 'Deposits.'],
    proposal: 'Introduce an educational trade the news simulator within demo competitions or as a predefined sequence of events. A feature to promote on social and landing pages for beginners to learn how to trade the news.'
  },
  {
    id: '35', slide: 55, area: 'trading', status: 'deck',
    title: 'Trading diary and coach',
    short: 'Standalone journal app with AI coaching for JP traders',
    scope: 'App with journaling, import and AI-generated content and video materials.',
    metrics: ['Journal to register conversion.', 'CAC.', 'Engagement.'],
    proposal: 'A standalone app that imports trading history from any broker and gives AI coaching that speaks JP-style trading culture. It is an acquisition product.'
  },
  {
    id: '36', slide: 56, area: 'trading', status: 'deck',
    title: 'Smart staking',
    short: 'Ad-hoc staking offer for likely-to-withdraw clients',
    scope: ['Define compliance constraints.', 'Define the rates and interest.', 'Scope the behaviour suitable for the offering vs all.'],
    metrics: ['Offer shown vs accepted.', 'Profitability.', 'Staking vs copy volume.'],
    proposal: 'Introduce an ad-hoc staking proposal for clients we are likely to define as having withdrawal-likely behaviour.'
  },

  /* ============================ FINANCIAL PRODUCTS ============================ */
  {
    id: '37', slide: 58, area: 'financial', status: 'deck',
    title: 'Expand weekend instruments',
    short: 'Weekend-tradable indices and USDJPY, clearly labelled',
    scope: 'Add eligible weekend instruments to the watchlist with clear "Weekend Trading" labels, dedicated pricing, trading-hour information, spreads and risk disclosures. Users discover them easily while understanding that weekend liquidity, volatility and pricing may differ. Key risks: wider spreads, lower liquidity, higher volatility, gaps; do not present weekend trading as equivalent to normal market trading.',
    metrics: 'More weekend trading activity, platform engagement, instrument adoption and client retention. Measure weekend volume, active weekend traders, new-instrument adoption, spread-related complaints and order execution quality.',
    proposal: 'Introduce additional weekend-tradable instruments, such as selected indices and USDJPY, so clients can manage positions and respond to global developments outside standard market hours.'
  },
  {
    id: '38', slide: '59-60', area: 'financial', status: 'deck',
    title: 'Promotions screen adapts to the user state',
    short: 'From generic description to a personal progress view',
    scope: 'Show the promotion status, progress, remaining requirements, reward details, eligibility conditions and next action in one clear view, reducing the need to select Check Progress.',
    metrics: 'Less user friction, higher promotion completion, better engagement, fewer support enquiries and more repeat visits to the promotions screen.',
    proposal: 'Adapt the promotions screen to the user\'s current state. Once a client registers for a promotion, the screen moves from a generic description to a personalised progress view.',
    images: ['assets/deck/s60-promotions-state.png']
  },
  {
    id: '39', slide: 61, area: 'financial', status: 'deck',
    title: 'Alpha Generation',
    short: 'Trading Central indicators as a marketplace perk',
    scope: 'Users activate Alpha Generation from the marketplace and access Trading Central indicators directly within their MT4, MT5 or TradingView charting workflow. The indicators highlight potential trade opportunities, entry points, exit points and market sentiment.',
    metrics: 'More value in the marketplace, advanced analytical tools for MT4 and MT5 users, stronger Trading Central adoption and better informed clients.',
    proposal: 'Introduce Alpha Generation by Trading Central as a new marketplace perk for MT4 and MT5 users, with the indicators integrated into TradingView charts as well.'
  },

  /* ============================ INTERNAL TOOLS FOR XMTD ============================ */
  {
    id: '40', slide: 63, area: 'internal', status: 'deck',
    title: 'Personalized XMTD registration',
    short: 'Registration endpoints managed on the XMTD side',
    scope: ['Feature promotions.', 'Feed website personalization cookies.', 'Improved UI/UX.'],
    metrics: 'Intent to completed registration rate.',
    proposal: 'Expose registration endpoints to be managed on the XMTD side to feature a more balanced registration along with promo offerings.'
  },
  {
    id: '41', slide: 64, area: 'internal', status: 'todo',
    title: 'Social monitor',
    short: 'Track negative brand mentions across social and forums',
    flag: 'In progress',
    shortlist: { priority: 2, impact: 'High', confidence: '', notes: 'In progress' },
    scope: 'Sentiment detection, urgency classification, source links, mention volume, trend monitoring and alerts for high-risk issues. Users filter mentions by market, language, product and topic, then assign items for review or response. Include human review: sarcasm, context and multilingual content create false positives.',
    metrics: 'Identify reputational risks earlier, respond to customer issues faster, detect recurring product problems, improve brand perception. Measure detection accuracy, alert response time, resolution time and issues identified before escalation.',
    proposal: 'Improve Social Monitor to detect and track real-time or near-real-time negative mentions of our brand across social media, forums, review platforms and online communities.'
  },
  {
    id: '42', slide: 65, area: 'internal', status: 'deck',
    title: 'Competition monitor',
    short: 'One place for competitor research, products and pricing',
    scope: 'Users add competitor profiles, upload research, compare products and features, track changes over time and generate structured reports. Dashboards, alerts for important competitor updates, source links and filters by market or region. Distinguish verified information from assumptions, record the source and date of each insight, and control access to sensitive internal analysis.',
    metrics: 'Less duplicated research, better access to competitive intelligence, faster decision-making, and earlier sight of market opportunities and threats.',
    proposal: 'Build an internal application that centralises competitor research, so teams monitor competitor products, pricing, promotions, features, campaigns and market positioning in one place.'
  },

  /* ============================ NEW: XMP-BASED COMPETITIONS (P1) ============================ */
  {
    id: '43', slide: 'n/a', area: 'loyalty', status: 'built',
    path: 'ideas/43-xmp-based-competitions/index.html',
    title: 'XMP-based competitions (Samurai XMP Challenge)',
    short: 'Real-account challenge ranked by XMP earned, per loyalty tier, with a growing prize pot',
    shortlist: { priority: 1, impact: 'High', confidence: '', notes: 'New idea from the Promo Tool proposal (Case 2). Alternative to Case 1, a classic ROI competition.' },
    shows: [
      'Public challenge page: prize pot that grows with XMP earned, five samurai levels, two tier-based leaderboards with account search',
      'PWA flow from the pop-up card to Promo Tool registration (client ID entered twice) and a private progress view',
      'Progress view that states the mechanic, shows the last refresh time, XMP, level and rank in your tier division',
      'Simulated trading that moves XMP, level, rank and the pot, with an optional marketplace XMP booster',
      'Award note: results are reviewed first, then prizes go to winners\u2019 wallets'
    ],
    assumption: 'Clients and affiliates want real-account competitions back. Until the XM product platform can deliver them (not before Q2 2027), a Promo Tool challenge may meet the demand and support acquisition with a fresh offer.',
    scope: [
      'Use the Promo Tool to register participants, link each registration to a client ID and track eligible trading activity across the client\u2019s real accounts.',
      'Participants compete to earn the most XMP in a limited period. Separate leaderboards by loyalty tier, initially higher and lower tiers. The top XMP earner in each tier wins that tier\u2019s prize, subject to final allocation rules.',
      'Trading activity also feeds the prize pot: minimum guaranteed pot of $100,000, growing if contributions exceed it. The contribution rule is to be confirmed.',
      'Publish progress and results on a website, then distribute awards to winners\u2019 wallets once results are confirmed.'
    ],
    metrics: 'Registrations, activation (first eligible trade), trading volume and active days of participants versus non-participants, XMP earned, new accounts from affiliates, completion of the funnel from discovery to registration, support contacts. Monitor prize cost, abuse and complaints.',
    proposal: 'Introduce the XMP Samurai Challenge: a limited-time, loyalty-based competition in which clients rise through levels by earning XMP, and the whole community adds to a prize pot that starts at $100,000. It ties the competition to loyalty and rewards trading activity.'
  },

  /* Registration buddy bot: kept last in the P1 list (array order = list order) */
  {
    id: '27', slide: 43, area: 'onboarding', status: 'built',
    path: 'ideas/27-registration-buddy-bot-in-whatsapp-line/index.html',
    shows: [
      'Chat button on the registration page with a LINE, WhatsApp or Telegram choice and QR code',
      'Bot guides each field of the form, validates email and password, and explains why each is asked',
      'Verification help: email code, ID and address documents, and a rejected-photo recovery',
      'First deposit help: methods, safety, minimum amount error, and no pressure to deposit',
      'Getting-started checklist, free-text questions and hand-over to a support agent'
    ],
    title: 'Registration buddy bot in WhatsApp / LINE / Telegram',
    short: 'A bot that guides sign-up step by step',
    shortlist: { priority: 1, impact: 'High', confidence: '', notes: '' },
    scope: 'Add a prompt on the website page(s) that opens the bot in WhatsApp, LINE or Telegram. Build the bot with step-by-step guidance, answers to common questions, and links back to the relevant pages on our platform.',
    metrics: 'Reduce confusion and abandonment, improving registration completion without weakening required checks. Measure completion rate, drop-off and time spent at each step, support requests, and user feedback on whether they understood what to do next.',
    proposal: 'Offer a registration buddy that guides users step by step while they open a trading account. The bot explains what is required, answers common questions, and helps users continue when they get stuck, so they feel supported throughout the process.'
  }
];
