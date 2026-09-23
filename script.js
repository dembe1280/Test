document.addEventListener("DOMContentLoaded", () => {

    if (window.mastercommerceLoaded) return;
    window.mastercommerceLoaded = true;


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const menuButton = document.getElementById("menuButton");
    const closeSidebar = document.getElementById("closeSidebar");

    const homeButton = document.getElementById("homeButton");
    const aboutButton = document.getElementById("aboutButton");
    const settingsButton = document.getElementById("settingsButton");

    const newChatButton = document.getElementById("newChatButton");
    const clearChatButton = document.getElementById("clearChatButton");

    const chatArea = document.getElementById("chatArea");
    const welcomeScreen = document.getElementById("welcomeScreen");

    const questionInput = document.getElementById("questionInput");
    const sendButton = document.getElementById("sendButton");

    const plusButton = document.getElementById("plusButton");
    const plusMenu = document.getElementById("plusMenu");
    const featureToast = document.getElementById("featureToast");

    const aboutModal = document.getElementById("aboutModal");
    const settingsModal = document.getElementById("settingsModal");

    const motionButton = document.getElementById("motionButton");
    const resetSettingsButton =
        document.getElementById("resetSettingsButton");


    /* =========================================================
       DEVELOPER INFORMATION
    ========================================================= */

    const developerInformation = {
        developer: "PD | Web & App Development",
        founder: "Phungo Dembe Vusani",
        location: "Limpopo, South Africa",
        education: "University of Venda, BCom in Accounting",
        product: "Mastercommerce",
        version: "v1.1.0 (now with jokes)"
    };


    /* =========================================================
       CONVERSATION STATE
    ========================================================= */

    let lastConversationState = {
        subject: null,
        topic: null
    };


    /* =========================================================
       FUN / PERSONALITY DATA

       This section exists purely to make chatting with
       Mastercommerce more enjoyable. None of it replaces the
       real study content below - it just sits alongside it.
    ========================================================= */

    const funGreetings = [
        "Hello there! Ready to make some numbers behave today?",
        "Hey! I've had my coffee (metaphorically). Let's learn something.",
        "Howzit! Accounting, Economics or Maths - pick your fighter.",
        "Welcome back. I promise I'm more fun than your textbook.",
        "Hi! Warning: I may sneak in a bad joke while explaining IFRS.",
        "Greetings, scholar. Shall we balance some books or bend some curves?",
        "Hey hey! Let's turn 'I don't get it' into 'oh, THAT'S easy'.",
        "Hello! Fun fact: you just made an AI's day by saying hi."
    ];

    const greetingFollowUps = [
        "So, what's on your plate today - Accounting, Economics or Maths?",
        "How's your day going so far? And what are we tackling together?",
        "Are you revising for a test, or just curious about something?",
        "What's been the trickiest topic for you lately?",
        "Got a specific chapter giving you trouble, or just exploring for now?",
        "Been staring at your notes for a while, or fresh off a break?",
        "Are we doing quick revision today, or diving deep into one topic?",
        "What grade or level are you studying at right now?",
        "Any particular subject stressing you out this week?",
        "Feeling good about your studies today, or need a confidence boost first?"
    ];

    const thinkingPhrases = [
        "Thinking",
        "Crunching numbers",
        "Flipping through my notes",
        "Consulting the ledger",
        "Balancing the equation",
        "Digging through my brain-vault",
        "Doing the maths (carefully)",
        "Summoning the right formula",
        "Checking twice, answering once",
        "Warming up the calculator"
    ];

    const encouragements = [
        "Great question!",
        "Ooh, good one.",
        "Love this topic.",
        "Solid question - let's dig in.",
        "Nice, this one's actually kind of fun.",
        "Here we go!",
        "Let's sort this out together."
    ];

    const jokesKnowledge = [

        /* --- Accounting --- */
        { setup: "Why did the accountant cross the road?", punchline: "To get to the other ledger side." },
        { setup: "Why did the accountant break up with the calculator?", punchline: "Too many mixed feelings, not enough closure entries." },
        { setup: "Why don't accountants play hide and seek?", punchline: "Because good luck hiding when they always balance the books." },
        { setup: "What do you call an accountant who can't do maths?", punchline: "Retired." },
        { setup: "Why did the balance sheet go to therapy?", punchline: "It had too many unresolved issues on both sides." },
        { setup: "Why was the ledger always calm?", punchline: "It knew how to keep things balanced." },
        { setup: "What's an accountant's favourite dance move?", punchline: "The double entry shuffle." },
        { setup: "Why did the VAT return blush?", punchline: "It saw its input and output getting a little too close." },
        { setup: "Why did the depreciation schedule feel unappreciated?", punchline: "Its value just kept going down every year." },
        { setup: "What's a partnership's favourite type of music?", punchline: "Anything with a good profit-sharing ratio." },
        { setup: "Why did the auditor bring a magnifying glass to the party?", punchline: "To check if the fun was properly accounted for." },
        { setup: "What do you call two accountants arguing?", punchline: "A reconciliation." },
        { setup: "Why did the bookkeeper break up with their partner?", punchline: "Too many unexplained variances." },
        { setup: "Why did the trial balance refuse to apologise?", punchline: "It insisted it was always right, even when it wasn't." },
        { setup: "What did the accountant say to the messy drawer?", punchline: "This needs some serious reconciliation." },
        { setup: "Why do accountants make great detectives?", punchline: "They always follow the paper trail." },
        { setup: "Why did the suspense account go to a support group?", punchline: "It had too many unresolved issues to deal with alone." },
        { setup: "Why did the inventory feel important?", punchline: "Because everyone kept counting on it." },
        { setup: "What do you call an asset with a great personality?", punchline: "Current." },
        { setup: "Why was the cash book always invited to parties?", punchline: "It always knew how to keep track of who owed what." },
        { setup: "Why did the goodwill refuse to leave?", punchline: "It just couldn't be written off that easily." },
        { setup: "What's a financial statement's favourite genre of movie?", punchline: "A balance-of-power thriller." },
        { setup: "Why did the accrual show up before the party even started?", punchline: "It believes in recognising things when they happen, not when cash arrives." },
        { setup: "Why did the bank reconciliation take so long?", punchline: "It had a lot of unpresented issues to work through." },
        { setup: "Why did the debit and credit get married?", punchline: "Because together, they always balance each other out." },
        { setup: "What did the auditor say to the nervous client?", punchline: "Relax, I'm just here to test your controls." },
        { setup: "Why did the petty cash box stay humble?", punchline: "It knew it was never going to be a big spender." },
        { setup: "Why did the depreciation method apply for a job?", punchline: "It wanted some straight-line stability in life." },
        { setup: "What do you call a shy transaction?", punchline: "Understated." },
        { setup: "Why did the financial year refuse to end on time?", punchline: "It had too many closing entries to finish." },

        /* --- Economics --- */
        { setup: "Why did the economist bring a ladder to the meeting?", punchline: "To reach the higher level of aggregate demand." },
        { setup: "Why are economists bad at relationships?", punchline: "They always want to know the opportunity cost of staying." },
        { setup: "How does an economist say 'I love you'?", punchline: "'Ceteris paribus, my feelings for you only increase.'" },
        { setup: "Why did the demand curve break up with the supply curve?", punchline: "They just couldn't find equilibrium." },
        { setup: "What do you call an economist with an opinion?", punchline: "Rare, and usually followed by 'it depends'." },
        { setup: "Why did the GDP go to the gym?", punchline: "To work on its growth rate." },
        { setup: "Why don't economists ever get lost?", punchline: "They always trust the market to find equilibrium eventually." },
        { setup: "Why did the inflation rate get invited to every party?", punchline: "Because it just kept rising to the occasion." },
        { setup: "Why did the economist stare at their coffee all morning?", punchline: "They were waiting for it to reach equilibrium temperature." },
        { setup: "Why did the currency feel insecure?", punchline: "It kept depreciating in front of everyone." },
        { setup: "What did the unemployed graph say to the economist?", punchline: "Please, just give me some seasonal work." },
        { setup: "Why did the economist refuse to play cards?", punchline: "Too many sunk costs already invested in that deck." },
        { setup: "Why did the interest rate go up the stairs slowly?", punchline: "It wanted to avoid a sudden economic shock." },
        { setup: "What do economists call a bad relationship?", punchline: "A market failure." },
        { setup: "Why did the export feel proud?", punchline: "It finally made it big overseas." },
        { setup: "Why did the tariff show up uninvited?", punchline: "It just wanted to increase the cost of the party." },
        { setup: "Why did the budget deficit apologise?", punchline: "It knew it was spending more than it should." },
        { setup: "What's an economist's favourite type of tea?", punchline: "Equilibri-tea." },
        { setup: "Why did the market fail its driving test?", punchline: "It couldn't find the right price signal." },
        { setup: "Why did the multiplier get invited to every economy's birthday?", punchline: "Because it always makes things bigger." },
        { setup: "Why did the Gini coefficient go to a party alone?", punchline: "It's used to measuring inequality, not sharing it." },
        { setup: "Why did the recession bring an umbrella?", punchline: "It heard there was a downturn coming." },
        { setup: "Why did the exchange rate keep changing its mind?", punchline: "It's naturally quite volatile." },
        { setup: "What did the surplus say to the deficit?", punchline: "I've got more than enough, want some?" },
        { setup: "Why did the elasticity get all the attention?", punchline: "It's just very responsive." },

        /* --- Mathematics --- */
        { setup: "Why did the mathematician refuse to leave the house?", punchline: "They couldn't find a reason - the sine just wasn't there." },
        { setup: "Why do maths teachers love parks?", punchline: "Because of all the natural logs." },
        { setup: "Why was the equation feeling insecure?", punchline: "It had too many unresolved variables." },
        { setup: "Why did the student do maths on the floor?", punchline: "The teacher said not to use tables." },
        { setup: "What do you call a number that can't sit still?", punchline: "A roamin' numeral." },
        { setup: "Why was six afraid of seven?", punchline: "Because seven ate nine, and now everyone's suspicious of seven." },
        { setup: "Why did the fraction feel out of place at the party?", punchline: "It just wasn't a whole number." },
        { setup: "What did the triangle say to the circle?", punchline: "You're pointless." },
        { setup: "Why don't mathematicians ever fight?", punchline: "They always prefer to find common ground first." },
        { setup: "Why did the graph go to therapy?", punchline: "It had way too many ups and downs." },
        { setup: "Why did the obtuse angle go to the beach?", punchline: "Because it was never a right angle to begin with." },
        { setup: "What do you call an empty set at a party?", punchline: "Lonely, but technically still invited." },
        { setup: "Why did the quadratic equation get anxious?", punchline: "It always had two possible outcomes to worry about." },
        { setup: "Why did the decimal point look worried?", punchline: "It felt slightly out of place." },
        { setup: "What did the algebra book say to the student?", punchline: "Stop trying to solve all your problems, focus on mine first." },
        { setup: "Why did the statistician drown in the river?", punchline: "It had an average depth of one metre." },
        { setup: "Why do circles never get invited to arguments?", punchline: "They avoid coming to a point." },
        { setup: "Why did the calculus student stay up all night?", punchline: "They were trying to find their limit." },
        { setup: "Why did the matrix break up with the vector?", punchline: "It felt the relationship wasn't well defined." },
        { setup: "Why did the probability student never worry?", punchline: "They knew the odds were usually in their favour." },
        { setup: "What did zero say to eight?", punchline: "Nice belt." },
        { setup: "Why did the number line feel endless conversations?", punchline: "It just kept going in both directions." },
        { setup: "Why did the exponent feel powerful?", punchline: "It always raised the stakes." },
        { setup: "What's a mathematician's favourite season?", punchline: "Sum-mer." },
        { setup: "Why did the geometry teacher skip the gym?", punchline: "They already had enough figures to work on." },
        { setup: "Why did the fraction and the decimal stop talking?", punchline: "They just couldn't relate anymore." },
        { setup: "Why was the derivative so confident?", punchline: "It always knew the rate at which things were changing." },
        { setup: "Why did the parabola bring an umbrella?", punchline: "It heard there might be a vertex of rain." },
        { setup: "Why did the student bring a ladder to maths class?", punchline: "To reach the higher-order terms." },
        { setup: "What did the hypotenuse say to the other sides?", punchline: "I've got you covered - literally, I'm the longest one." },
        { setup: "Why did the sequence feel proud of itself?", punchline: "It always knew what came next." },
        { setup: "Why did the inequality refuse to settle down?", punchline: "It always wanted to be greater than or equal to something." },
        { setup: "Why did the surd feel misunderstood?", punchline: "People kept trying to round it off." },
        { setup: "What do you call a maths teacher who loves the outdoors?", punchline: "One who takes their roots seriously." },
        { setup: "Why did the polynomial fail the interview?", punchline: "It had too many unnecessary terms." },
        { setup: "Why was the algebra teacher's garden so tidy?", punchline: "They always kept the variables in check." },

        /* --- General study / nerdy --- */
        { setup: "Why did the student bring a pencil to the exam?", punchline: "To draw their own conclusions." },
        { setup: "Why did the calculator apply for a job?", punchline: "It just wanted to add some value." },
        { setup: "Why did the textbook go to the doctor?", punchline: "It had too many unresolved chapters." },
        { setup: "Why did the exam paper feel nervous?", punchline: "It knew it was about to be graded." },
        { setup: "Why did the laptop keep failing quizzes?", punchline: "It kept losing its train of thought - low battery." },
        { setup: "Why did the study group meet at the bakery?", punchline: "Because they heard it had the best rolls for revision." },
        { setup: "Why did the highlighter feel appreciated?", punchline: "It always knew how to bring out the important points." },
        { setup: "Why do students love breaks?", punchline: "Because even equations need to rest sometimes." },
        { setup: "Why did the clock get invited to study group?", punchline: "It always knows how to manage time." },
        { setup: "Why did the notebook feel confident?", punchline: "It had everything written down, just in case." },
        { setup: "Why did the deadline get chased around campus?", punchline: "Because everyone was trying to beat it." },
        { setup: "Why did the coffee cup join the study session?", punchline: "It wanted to help everyone stay grounded." },
        { setup: "What did the pencil say to the eraser?", punchline: "You really rub me the wrong way sometimes." },
        { setup: "Why did the student stare at the exam so long?", punchline: "The paper said 'do not turn over' and they took it literally." },
        { setup: "Why did the revision plan feel proud?", punchline: "It finally had structure." },
        { setup: "Why did the flashcards break up?", punchline: "They just didn't click anymore." },
        { setup: "Why did the printer refuse to work during exams?", punchline: "It said it needed a well-deserved break too." },
        { setup: "Why did the library stay so quiet?", punchline: "Because everyone was busy turning pages, not making noise." },
        { setup: "Why did the studying owl get top marks?", punchline: "It was a real night owl about revision." },
        { setup: "Why did the app crash right before the test?", punchline: "It got too stressed trying to load everything at once." },
        { setup: "Why did the ruler feel unappreciated in maths class?", punchline: "Everyone kept overlooking its many uses." },
        { setup: "Why did the accountant love spreadsheets so much?", punchline: "Because everything finally had its own cell." },
        { setup: "Why did the economist love long walks?", punchline: "They said it helped clear their head of externalities." },
        { setup: "Why did the fraction refuse to fight the whole number?", punchline: "It knew it was already outnumbered." },
        { setup: "Why did the fiscal year throw a party?", punchline: "It finally made it to year-end without a single error." },
        { setup: "Why did the fraction and the percentage become best friends?", punchline: "They just always found common ground out of 100." },
        { setup: "Why did the fixed asset refuse to move offices?", punchline: "It said it was, by definition, non-current." },
        { setup: "Why did the number 9 feel confident before an exam?", punchline: "It knew it was almost perfect, just one away." },
        { setup: "Why did the study timer get promoted?", punchline: "It always knew exactly how much time was left." }
    ];

    const funFactsKnowledge = [

        /* --- Accounting & finance history --- */
        "The word 'salary' comes from the Latin 'salarium', originally linked to payments Roman soldiers received - some say partly in salt.",
        "Double-entry bookkeeping as we broadly know it today was popularised by Luca Pacioli, an Italian friar, in a 1494 mathematics text.",
        "South Africa's standard VAT rate is 15%, but it wasn't always that way - it has changed more than once since VAT was introduced in 1991.",
        "'Bankrupt' comes from the Italian 'banca rotta', meaning 'broken bench' - referring to a moneylender's bench being physically broken.",
        "The South African Reserve Bank was established in 1921 and is one of the oldest central banks in Africa.",
        "Compound interest is sometimes informally called 'the eighth wonder of the world' because of how quickly it can grow over long periods.",
        "The trial balance doesn't actually prove there are no errors in the books - some errors, like a transaction omitted entirely, still balance perfectly.",
        "The word 'audit' comes from the Latin 'audire', meaning 'to hear' - early audits were literally read aloud to be checked.",
        "The oldest known accounting records are clay tokens used in Mesopotamia thousands of years ago to track goods and livestock.",
        "IFRS (International Financial Reporting Standards) is used, in some form, in well over 100 countries around the world.",
        "The word 'cash' likely traces back to the Old French 'casse', meaning a money box - not the actual coins themselves.",
        "Goodwill on a balance sheet isn't a vague feeling - it's a specific, measurable intangible asset created through acquisitions.",
        "The word 'ledger' comes from the Middle Dutch 'legger', meaning something that lies permanently in one place, like a large book.",
        "Some of the earliest known 'auditors' in history worked for ancient Egyptian and Mesopotamian temples, checking grain stores.",
        "Depreciation doesn't try to track an asset's market value - it simply spreads out cost over the asset's useful life.",
        "The term 'blue chip', used for large stable companies, comes from poker, where blue chips traditionally hold the highest value.",
        "A 'shell company' isn't necessarily illegal - it's simply a company with no significant operations or assets of its own.",
        "The word 'fiscal' comes from the Latin 'fiscus', which referred to a basket used to hold public money.",
        "South Africa's JSE (Johannesburg Stock Exchange) is one of the largest stock exchanges on the African continent.",
        "Double-entry accounting means every single transaction affects at least two accounts - which is exactly why the books balance.",
        "The word 'dividend' comes from the Latin 'dividendum', meaning 'a thing to be divided'.",
        "A company's financial year doesn't have to match the calendar year - many businesses choose a different year-end for practical reasons.",
        "The word 'budget' comes from the Old French 'bougette', meaning a small leather bag once used to carry money and documents.",
        "Early forms of insurance can be traced back thousands of years, including merchants in ancient China spreading cargo across boats to manage risk.",
        "The term 'red tape' referring to bureaucracy comes from the red ribbon once used to bind official government documents.",

        /* --- Economics --- */
        "The term 'inflation' was originally used to describe an increase in the money supply before it came to mean rising prices generally.",
        "The Great Depression of the 1930s is one of the key historical events that shaped modern macroeconomic theory, including Keynesian economics.",
        "Adam Smith's 'The Wealth of Nations' (1776) is often treated as a foundational text of modern economics.",
        "The word 'economics' comes from the Greek 'oikonomia', meaning household management.",
        "The Nobel Prize in Economic Sciences wasn't part of Alfred Nobel's original will - it was established later, in 1968, by Sweden's central bank.",
        "Hyperinflation has occurred in various countries throughout history, sometimes causing prices to double in a matter of days.",
        "The 'invisible hand', a famous economic metaphor, was used by Adam Smith to describe how individual self-interest can benefit society overall.",
        "GDP was developed largely in the 1930s and 1940s, partly to help track economic activity during the Great Depression and World War II.",
        "Opportunity cost applies to time as much as money - every hour spent on one activity is an hour not spent on the next best alternative.",
        "The term 'stagflation' combines 'stagnation' and 'inflation' to describe the unusual combination of slow growth and rising prices.",
        "Many central banks around the world target a specific inflation rate, often around 2 to 6%, rather than aiming for zero inflation.",
        "The Bretton Woods conference in 1944 helped shape the modern international monetary system after World War II.",
        "Barter systems predate money, but they require what's called a 'double coincidence of wants' to work smoothly.",
        "The law of diminishing marginal utility suggests the tenth slice of pizza rarely brings as much joy as the first.",
        "Some economists distinguish between 'positive economics' (what is) and 'normative economics' (what should be).",
        "The term 'black market' refers to trade that happens outside official, legal channels, often to avoid taxes or restrictions.",
        "South Africa's economy is often described as one of the more diversified and industrialised economies on the African continent.",
        "The concept of comparative advantage, developed by David Ricardo, shows that trade can benefit both parties even if one is better at everything.",
        "The word 'recession' is often informally defined as two consecutive quarters of negative real GDP growth, though definitions can vary.",
        "Game theory, used to study strategic decision-making in economics, was significantly developed by mathematician John von Neumann.",

        /* --- Mathematics --- */
        "The number zero as a placeholder and number in its own right developed independently in places including ancient India.",
        "The Fibonacci sequence (1, 1, 2, 3, 5, 8...) shows up in surprising places in nature, like sunflower seed spirals and pinecones.",
        "Pi (π) has been calculated to trillions of digits, but only about 40 digits are needed for most practical physics calculations.",
        "The word 'algebra' comes from the Arabic 'al-jabr', part of the title of a 9th-century mathematical text.",
        "A googol is the number 1 followed by 100 zeros - and it's smaller than the number of possible chess games.",
        "The symbol for 'equals' (=) was introduced by Welsh mathematician Robert Recorde in 1557, because 'no two things can be more equal'.",
        "Prime numbers have no positive divisors other than 1 and themselves - and mathematicians still search for the largest ones today.",
        "The Pythagorean theorem was known and used in some form by several ancient civilisations well before Pythagoras.",
        "A 'perfect number' equals the sum of its own positive divisors (excluding itself) - 6 is the smallest example (1 + 2 + 3 = 6).",
        "The concept of negative numbers was used in ancient China and India long before it became widely accepted in Europe.",
        "Calculus was developed independently by both Isaac Newton and Gottfried Wilhelm Leibniz in the late 17th century.",
        "The golden ratio, roughly 1.618, appears in art, architecture and nature, and is closely linked to the Fibonacci sequence.",
        "There are infinitely many prime numbers - a fact proven by the ancient Greek mathematician Euclid over 2 000 years ago.",
        "A 'palindrome number' reads the same forwards and backwards, like 121 or 3 443.",
        "The word 'geometry' comes from the Greek words for 'earth' and 'measurement'.",
        "Chess has more possible unique game sequences than there are atoms in the observable universe.",
        "The number system most of the world uses today (0-9, base 10) is often called the 'Hindu-Arabic numeral system'.",
        "A 'Mobius strip' is a surface with only one side and one edge, created by giving a strip of paper a half twist before joining the ends.",
        "The word 'trigonometry' comes from Greek words meaning 'triangle' and 'measure'.",
        "The 'butterfly effect' in chaos theory illustrates how small changes in initial conditions can lead to vastly different outcomes.",
        "Statisticians distinguish correlation from causation - two things moving together doesn't prove one causes the other.",
        "A standard deck of 52 playing cards can be shuffled into more unique orders than there are seconds since the universe began.",
        "The number e (approximately 2.71828) shows up naturally in growth and decay problems, much like compound interest calculations.",
        "Binary code, used throughout computing, works with only two digits - 0 and 1 - to represent all data.",
        "The word 'hypotenuse' comes from Greek, roughly meaning 'stretching under', referring to the side opposite the right angle.",

        /* --- General study / science trivia --- */
        "Short, spaced-out study sessions are generally more effective for long-term memory than one long cramming session.",
        "Writing notes by hand, rather than typing them, has been linked in some studies to better retention of information.",
        "The 'forgetting curve', described by psychologist Hermann Ebbinghaus, shows how quickly memory can fade without review.",
        "Taking short breaks during study sessions can actually improve overall focus and information retention.",
        "Explaining a concept out loud to someone else (or even to yourself) is a well-known way to test how well you actually understand it.",
        "Sleep plays an important role in memory consolidation, which is part of why an all-nighter before an exam can backfire.",
        "The 'Pomodoro Technique' - working in focused sprints with short breaks - is a popular time-management method among students.",
        "Practice questions and self-testing are generally more effective for learning than simply re-reading notes.",
        "Mixing up topics during a study session (sometimes called 'interleaving') can improve long-term understanding compared to studying one topic at a time.",
        "Background noise levels that work for one person can be distracting for another - there's no single 'best' study environment for everyone."
    ];

    const motivationalLines = [
        "You're one question closer to understanding this properly - keep going!",
        "Every expert was once confused by exactly this. You're doing fine.",
        "Small steps. This concept will click before you know it.",
        "If it feels hard, that usually means you're actually learning.",
        "Take a breath, re-read it once - it'll make more sense the second time."
    ];

    function pickRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }


    /* =========================================================
       MASTERCOMMERCE KNOWLEDGE ENGINE
       
       Everything below is stored directly inside script.js.
       
       Each topic contains:
       - topic
       - keywords
       - relatedKeywords
       - information
       - formulas
       - rules
       - examples
    ========================================================= */


    /* =========================================================
       ACCOUNTING KNOWLEDGE
    ========================================================= */

    const accountingKnowledge = [

        {
            topic: "Accounting Basics",

            keywords: [
                "accounting",
                "accounting definition",
                "what is accounting",
                "bookkeeping",
                "financial information",
                "accounting equation"
            ],

            relatedKeywords: [
                "business",
                "transactions",
                "records",
                "financial statements",
                "assets",
                "liabilities",
                "equity"
            ],

            information:
                "Accounting is the process of identifying, recording, classifying, summarising and communicating financial information to users so that they can make informed decisions.",

            formulas: [
                "Assets = Equity + Liabilities"
            ],

            rules: [
                "Assets are resources controlled by the business.",
                "Liabilities are obligations owed to other parties.",
                "Equity is the owner's residual interest in the assets after liabilities.",
                "Income increases equity.",
                "Expenses decrease equity."
            ],

            examples: [
                "If a business has assets of R100 000 and liabilities of R40 000, equity is R60 000."
            ]
        },


        {
            topic: "Accounting Equation",

            keywords: [
                "accounting equation",
                "assets liabilities equity",
                "assets equals liabilities",
                "equity formula",
                "capital formula"
            ],

            relatedKeywords: [
                "assets",
                "liabilities",
                "capital",
                "drawings",
                "profit",
                "loss"
            ],

            information:
                "The accounting equation shows the relationship between what a business owns, what it owes and the owner's interest.",

            formulas: [
                "Assets = Equity + Liabilities",
                "Equity = Assets - Liabilities",
                "Equity = Capital + Profit - Drawings"
            ],

            rules: [
                "Every transaction must keep the accounting equation balanced."
            ],

            examples: [
                "Assets = R500 000 and liabilities = R200 000. Equity = R500 000 - R200 000 = R300 000."
            ]
        },


        {
            topic: "Debit and Credit",

            keywords: [
                "debit",
                "credit",
                "debit credit",
                "debit rules",
                "credit rules",
                "double entry"
            ],

            relatedKeywords: [
                "asset",
                "liability",
                "equity",
                "income",
                "expense",
                "capital",
                "drawings"
            ],

            information:
                "Debit and credit are the two sides used in double-entry accounting. Every transaction normally has at least one debit and one credit of equal amounts.",

            formulas: [],

            rules: [
                "Assets increase with a debit and decrease with a credit.",
                "Expenses increase with a debit and decrease with a credit.",
                "Drawings increase with a debit.",
                "Liabilities increase with a credit and decrease with a debit.",
                "Equity increases with a credit.",
                "Income increases with a credit."
            ],

            examples: [
                "Buying equipment for cash: Debit Equipment and Credit Bank/Cash."
            ]
        },


        {
            topic: "Gross Profit and Net Profit",

            keywords: [
                "gross profit",
                "gross profit formula",
                "net profit",
                "gross profit percentage",
                "net profit percentage",
                "profit"
            ],

            relatedKeywords: [
                "sales",
                "cost of sales",
                "expenses",
                "income",
                "mark up"
            ],

            information:
                "Gross profit is the profit made from buying and selling trading stock before operating expenses. Net profit is the remaining profit after other income and expenses are considered.",

            formulas: [
                "Gross Profit = Sales - Cost of Sales",
                "Net Profit = Gross Profit + Other Income - Expenses",
                "Gross Profit % = Gross Profit / Sales × 100",
                "Net Profit % = Net Profit / Sales × 100"
            ],

            rules: [
                "A higher gross profit percentage generally means more gross profit is earned from each rand of sales.",
                "Net profit takes operating expenses and other income into account."
            ],

            examples: [
                "Sales = R100 000 and cost of sales = R60 000. Gross profit = R40 000."
            ]
        },


        {
            topic: "Cost of Sales",

            keywords: [
                "cost of sales",
                "cost of goods sold",
                "cos",
                "opening stock",
                "closing stock",
                "purchases",
                "carriage on purchases"
            ],

            relatedKeywords: [
                "inventory",
                "stock",
                "gross profit",
                "sales"
            ],

            information:
                "Cost of sales measures the cost of inventory that was sold during the accounting period.",

            formulas: [
                "Cost of Sales = Opening Stock + Net Purchases + Carriage on Purchases - Closing Stock",
                "Gross Profit = Sales - Cost of Sales"
            ],

            rules: [
                "Closing stock is deducted because it was not sold during the period."
            ],

            examples: [
                "Opening stock R20 000 + purchases R60 000 + carriage R5 000 - closing stock R15 000 = cost of sales R70 000."
            ]
        },


        {
            topic: "Inventory",

            keywords: [
                "inventory",
                "stock",
                "trading stock",
                "inventory valuation",
                "fifo",
                "weighted average",
                "periodic inventory",
                "perpetual inventory"
            ],

            relatedKeywords: [
                "cost",
                "net realisable value",
                "nrV",
                "cost of sales",
                "closing stock"
            ],

            information:
                "Inventory consists of assets held for sale in the ordinary course of business, or materials used in producing goods or services.",

            formulas: [
                "NRV = Estimated Selling Price - Costs of Completion - Costs Necessary to Make the Sale"
            ],

            rules: [
                "Under IAS 2, inventory is generally measured at the lower of cost and net realisable value.",
                "FIFO assumes the earliest goods purchased are sold first.",
                "Weighted average assigns an average cost per unit."
            ],

            examples: [
                "Cost = R900 000 and NRV = R820 000. Inventory is written down to R820 000, giving an R80 000 write-down."
            ]
        },


        {
            topic: "VAT",

            keywords: [
                "vat",
                "value added tax",
                "input vat",
                "output vat",
                "vat inclusive",
                "vat exclusive",
                "vat 15 percent"
            ],

            relatedKeywords: [
                "south africa",
                "tax",
                "sales",
                "purchases"
            ],

            information:
                "VAT is an indirect consumption tax charged on taxable supplies. In South Africa, the standard VAT rate is 15%.",

            formulas: [
                "VAT = VAT-exclusive amount × 15%",
                "VAT-inclusive amount = VAT-exclusive amount × 1.15",
                "VAT-exclusive amount = VAT-inclusive amount ÷ 1.15",
                "VAT payable = Output VAT - Input VAT"
            ],

            rules: [
                "Output VAT is generally VAT charged on taxable sales.",
                "Input VAT is generally VAT incurred on qualifying business purchases.",
                "The net amount payable is output VAT less allowable input VAT."
            ],

            examples: [
                "R10 000 excluding VAT × 15% = R1 500 VAT. Inclusive amount = R11 500."
            ]
        },


        {
            topic: "Depreciation",

            keywords: [
                "depreciation",
                "straight line depreciation",
                "diminishing balance",
                "carrying amount",
                "residual value",
                "useful life"
            ],

            relatedKeywords: [
                "asset",
                "ppe",
                "property plant equipment",
                "non current asset"
            ],

            information:
                "Depreciation is the systematic allocation of the depreciable amount of an asset over its useful life.",

            formulas: [
                "Straight-line depreciation = (Cost - Residual Value) / Useful Life",
                "Carrying Amount = Cost - Accumulated Depreciation - Accumulated Impairment"
            ],

            rules: [
                "Depreciation is an expense unless included in another asset's cost.",
                "Useful life and residual value should be reviewed where required."
            ],

            examples: [
                "Straight-line: Cost R850 000, residual value R50 000, useful life 8 years. Annual depreciation = (850 000 - 50 000) ÷ 8 = R100 000 per year.",
                "Diminishing balance: Carrying amount R400 000 and a diminishing-balance rate of 20%. Depreciation for the year = R400 000 × 20% = R80 000, so the new carrying amount is R320 000.",
                "Partial year: An asset costing R120 000 (no residual value, 5-year useful life) is bought on 1 April, but the financial year ends on 31 December (9 months). Annual depreciation would be R24 000, so depreciation for the 9 months = R24 000 × 9/12 = R18 000.",
                "Change in estimate: An asset with a carrying amount of R60 000 has its remaining useful life revised from 4 years to 2 years. Going forward, annual depreciation becomes R60 000 ÷ 2 = R30 000 per year (applied prospectively, not restated).",
                "Disposal: An asset with a cost of R200 000 and accumulated depreciation of R150 000 has a carrying amount of R50 000. If it is sold for R70 000, the business records a profit on sale of R20 000 (R70 000 - R50 000)."
            ]
        },


        {
            topic: "IAS 16 - Property Plant and Equipment",

            keywords: [
                "ias 16",
                "property plant equipment",
                "ppe",
                "property plant and equipment",
                "depreciation",
                "residual value",
                "useful life",
                "carrying amount",
                "revaluation",
                "disposal"
            ],

            relatedKeywords: [
                "asset",
                "recognition",
                "cost model",
                "revaluation model",
                "component accounting"
            ],

            information:
                "IAS 16 deals with property, plant and equipment. PPE is recognised when it is probable that future economic benefits will flow to the entity and the cost can be measured reliably.",

            formulas: [
                "Initial cost = Purchase price + Directly attributable costs",
                "Depreciable amount = Cost - Residual value",
                "Straight-line depreciation = (Cost - Residual value) / Useful life",
                "Carrying amount = Cost - Accumulated depreciation - Accumulated impairment"
            ],

            rules: [
                "Directly attributable costs necessary to bring the asset to the location and condition necessary for operation can form part of cost.",
                "Training costs are normally expensed.",
                "An entity may use the cost model or revaluation model as permitted by IAS 16.",
                "Significant components with different useful lives may need separate depreciation.",
                "Depreciation begins when the asset is available for use.",
                "An asset is derecognised on disposal or when no future economic benefits are expected."
            ],

            examples: [
                "Purchase price R800 000 + installation R20 000 + delivery R30 000 = R850 000 capitalised cost. Training of R15 000 is normally expensed."
            ]
        },


        {
            topic: "IAS 2 - Inventories",

            keywords: [
                "ias 2",
                "ias2",
                "inventories",
                "inventory",
                "net realisable value",
                "nrv",
                "fifo",
                "weighted average"
            ],

            relatedKeywords: [
                "cost",
                "closing stock",
                "cost of sales",
                "write down"
            ],

            information:
                "IAS 2 prescribes accounting for inventories. Inventory is measured at the lower of cost and net realisable value.",

            formulas: [
                "NRV = Estimated selling price - costs of completion - costs necessary to make the sale"
            ],

            rules: [
                "Inventory cost includes purchase costs, conversion costs and other costs incurred to bring inventory to its present location and condition.",
                "Inventory is written down when NRV is below cost."
            ],

            examples: [
                "Inventory cost R700 000, selling price R750 000, completion costs R30 000 and selling costs R20 000. NRV = R700 000, so there is no write-down."
            ]
        },


        {
            topic: "IAS 7 - Statement of Cash Flows",

            keywords: [
                "ias 7",
                "cash flow",
                "cash flows",
                "operating activities",
                "investing activities",
                "financing activities",
                "cash equivalents"
            ],

            relatedKeywords: [
                "cash",
                "bank",
                "investment",
                "financing"
            ],

            information:
                "IAS 7 requires information about changes in cash and cash equivalents through operating, investing and financing activities.",

            formulas: [],

            rules: [
                "Operating activities relate to the main revenue-producing activities.",
                "Investing activities relate mainly to acquiring and disposing of long-term assets and investments.",
                "Financing activities relate to changes in contributed equity and borrowings."
            ],

            examples: [
                "Cash received from customers is generally an operating cash flow.",
                "Cash paid to buy equipment is generally an investing cash flow.",
                "Cash received from issuing shares is generally a financing cash flow."
            ]
        },


        {
            topic: "IAS 8 - Accounting Policies Estimates and Errors",

            keywords: [
                "ias 8",
                "accounting policies",
                "accounting estimates",
                "errors",
                "retrospective",
                "prospective"
            ],

            relatedKeywords: [
                "prior period",
                "financial statements",
                "correction"
            ],

            information:
                "IAS 8 deals with accounting policies, changes in accounting estimates and errors.",

            formulas: [],

            rules: [
                "Changes in accounting policies are generally applied retrospectively unless impracticable or another standard provides specific transitional requirements.",
                "Changes in accounting estimates are generally recognised prospectively.",
                "Material prior-period errors are generally corrected retrospectively."
            ],

            examples: [
                "Changing the estimated useful life of an asset is normally a change in estimate and therefore affects the current and future periods."
            ]
        },


        {
            topic: "IAS 10 - Events After Reporting Period",

            keywords: [
                "ias 10",
                "events after reporting period",
                "adjusting event",
                "non adjusting event",
                "adjusting events"
            ],

            relatedKeywords: [
                "reporting date",
                "financial statements",
                "year end"
            ],

            information:
                "IAS 10 deals with events occurring between the reporting date and the date the financial statements are authorised for issue.",

            formulas: [],

            rules: [
                "Adjusting events provide evidence of conditions existing at the reporting date.",
                "Non-adjusting events relate to conditions arising after the reporting date.",
                "Material non-adjusting events may require disclosure."
            ],

            examples: [
                "A customer bankruptcy shortly after year-end may provide evidence that the receivable was impaired at year-end."
            ]
        },


        {
            topic: "IAS 12 - Income Taxes",

            keywords: [
                "ias 12",
                "income tax",
                "deferred tax",
                "current tax",
                "tax base",
                "temporary difference",
                "dtl",
                "dta"
            ],

            relatedKeywords: [
                "deferred tax liability",
                "deferred tax asset",
                "carrying amount",
                "taxable temporary difference",
                "deductible temporary difference"
            ],

            information:
                "IAS 12 deals with current and deferred income tax. Deferred tax arises from temporary differences between the carrying amount of an asset or liability and its tax base.",

            formulas: [
                "Temporary difference = Carrying amount - Tax base",
                "Deferred tax = Temporary difference × Applicable tax rate"
            ],

            rules: [
                "A taxable temporary difference generally gives rise to a deferred tax liability, subject to exceptions.",
                "A deductible temporary difference may give rise to a deferred tax asset when recognition criteria are met.",
                "Permanent differences do not create deferred tax."
            ],

            examples: [
                "Carrying amount R500 000, tax base R350 000 and tax rate 27%. Taxable temporary difference = R150 000. DTL = R40 500."
            ]
        },


        {
            topic: "IAS 21 - Foreign Exchange",

            keywords: [
                "ias 21",
                "foreign exchange",
                "foreign currency",
                "exchange rate",
                "functional currency",
                "monetary items",
                "exchange difference"
            ],

            relatedKeywords: [
                "rand",
                "dollar",
                "euro",
                "closing rate",
                "spot rate"
            ],

            information:
                "IAS 21 deals with foreign currency transactions, translation of foreign operations and determination of functional currency.",

            formulas: [
                "Foreign currency amount × Exchange rate = Functional currency amount"
            ],

            rules: [
                "A foreign currency transaction is initially recorded using the spot exchange rate at the transaction date.",
                "Foreign currency monetary items are generally translated at the closing rate at reporting date.",
                "Exchange differences are generally recognised in profit or loss unless another requirement applies."
            ],

            examples: [
                "$10 000 at R18/$ = R180 000. If the closing rate becomes R19/$, the monetary item becomes R190 000, creating a R10 000 exchange difference."
            ]
        },


        {
            topic: "IAS 23 - Borrowing Costs",

            keywords: [
                "ias 23",
                "borrowing costs",
                "qualifying asset",
                "capitalised interest",
                "interest"
            ],

            relatedKeywords: [
                "construction",
                "loan",
                "capitalisation"
            ],

            information:
                "IAS 23 requires borrowing costs directly attributable to the acquisition, construction or production of a qualifying asset to be capitalised as part of that asset's cost.",

            formulas: [
                "Borrowing cost = Principal × Interest rate × Time"
            ],

            rules: [
                "Capitalisation starts when expenditure is incurred, borrowing costs are incurred and activities necessary to prepare the asset are in progress.",
                "Capitalisation stops when substantially all activities necessary to prepare the asset are complete."
            ],

            examples: [
                "R5 million borrowed at 10% for a qualifying asset for a full year gives R500 000 borrowing cost before considering specific adjustments."
            ]
        },


        {
            topic: "IAS 24 - Related Parties",

            keywords: [
                "ias 24",
                "related parties",
                "related party",
                "key management personnel",
                "related party transaction"
            ],

            relatedKeywords: [
                "director",
                "parent",
                "subsidiary",
                "associate",
                "family"
            ],

            information:
                "IAS 24 requires disclosure of related-party relationships, transactions and outstanding balances in specified circumstances.",

            formulas: [],

            rules: [
                "Related parties can include parents, subsidiaries, associates, joint ventures, key management personnel and certain close family members.",
                "The purpose is to provide users with information about relationships and transactions that could affect financial statements."
            ],

            examples: []
        },


        {
            topic: "IAS 28 - Associates and Joint Ventures",

            keywords: [
                "ias 28",
                "associate",
                "significant influence",
                "equity method",
                "joint venture",
                "investment in associate",
                "board representation"
            ],

            relatedKeywords: [
                "20 percent",
                "20%",
                "voting power",
                "equity method",
                "goodwill",
                "dividend",
                "net investment"
            ],

            information:
                "IAS 28 governs investments in associates and joint ventures. Significant influence is the power to participate in financial and operating policy decisions without having control or joint control.",

            formulas: [
                "Investor's share of profit = Ownership percentage × Associate profit",
                "Investment carrying amount = Opening carrying amount + Share of profit - Dividends - Impairment ± other required adjustments"
            ],

            rules: [
                "Holding 20% or more of voting power creates a rebuttable presumption of significant influence.",
                "Board representation and participation in policy-making can provide evidence of significant influence.",
                "Goodwill arising on acquiring an associate is included in the carrying amount of the investment.",
                "Dividends received reduce the carrying amount of the investment under the equity method.",
                "The investor recognises its share of the associate's profit or loss."
            ],

            examples: [
                "If an investor owns 30% of an associate that earns R1 million, the investor's share of profit is R300 000.",
                "If the associate pays a R500 000 dividend, the investor's 30% share is R150 000 and this reduces the investment carrying amount."
            ]
        },


        {
            topic: "IFRS 7 - Financial Instruments Disclosures",

            keywords: [
                "ifrs 7",
                "financial instruments disclosures",
                "financial risk",
                "credit risk",
                "liquidity risk",
                "market risk"
            ],

            relatedKeywords: [
                "risk",
                "disclosure",
                "financial asset",
                "financial liability"
            ],

            information:
                "IFRS 7 requires disclosures that enable users to evaluate the significance of financial instruments and the nature and extent of risks arising from them.",

            formulas: [],

            rules: [
                "Important financial risks include credit risk, liquidity risk and market risk.",
                "Disclosures include information about risk exposures and how those risks are managed."
            ],

            examples: []
        },


        {
            topic: "IFRS 9 - Financial Instruments",

            keywords: [
                "ifrs 9",
                "financial instruments",
                "financial asset",
                "amortised cost",
                "fvoci",
                "fvtpl",
                "fair value through profit or loss",
                "expected credit loss",
                "ecl",
                "sppi"
            ],

            relatedKeywords: [
                "interest",
                "credit loss",
                "business model",
                "cash flows",
                "financial liability"
            ],

            information:
                "IFRS 9 deals with classification and measurement of financial assets and liabilities, impairment and hedge accounting.",

            formulas: [
                "Expected Credit Loss = Exposure × Probability of Default × Loss Given Default"
            ],

            rules: [
                "Financial assets may be measured at amortised cost, FVOCI or FVTPL depending on classification requirements.",
                "Amortised cost classification generally requires a hold-to-collect business model and cash flows that pass the SPPI test.",
                "The effective interest method is used for amortised cost.",
                "The expected credit loss model is used for impairment."
            ],

            examples: [
                "A loan of R500 000 with an estimated loss rate of 4% and recovery factor represented by 60% exposure gives a simplified expected loss of R12 000."
            ]
        },


        {
            topic: "IFRS 10 - Consolidated Financial Statements",

            keywords: [
                "ifrs 10",
                "consolidation",
                "consolidated financial statements",
                "control",
                "subsidiary",
                "parent",
                "nci",
                "non controlling interest",
                "intragroup"
            ],

            relatedKeywords: [
                "85%",
                "elimination",
                "goodwill",
                "pre acquisition",
                "post acquisition",
                "intragroup profit"
            ],

            information:
                "IFRS 10 establishes principles for presenting consolidated financial statements when an entity controls one or more other entities.",

            formulas: [
                "Goodwill = Consideration transferred + NCI + Fair value of previous interest - Fair value of identifiable net assets acquired"
            ],

            rules: [
                "Control exists when the investor has power over the investee, exposure or rights to variable returns and the ability to use power to affect those returns.",
                "Intragroup balances and transactions are eliminated on consolidation.",
                "Unrealised intragroup profits are eliminated to the extent required.",
                "NCI is presented separately within equity."
            ],

            examples: [
                "Parent consideration R10 million + NCI R2 million - identifiable net assets R9 million = goodwill of R3 million.",
                "If NCI is 20% and relevant net assets are R3 million, NCI is R600 000."
            ]
        },


        {
            topic: "IFRS 15 - Revenue",

            keywords: [
                "ifrs 15",
                "revenue",
                "five step model",
                "performance obligation",
                "contract asset",
                "contract liability",
                "variable consideration",
                "principal agent"
            ],

            relatedKeywords: [
                "customer",
                "contract",
                "transaction price",
                "standalone selling price"
            ],

            information:
                "IFRS 15 establishes a five-step model for recognising revenue from contracts with customers.",

            formulas: [
                "Allocated transaction price = Transaction price × Standalone selling price / Total standalone selling prices"
            ],

            rules: [
                "Identify the contract with a customer.",
                "Identify the performance obligations.",
                "Determine the transaction price.",
                "Allocate the transaction price to performance obligations.",
                "Recognise revenue when or as each performance obligation is satisfied."
            ],

            examples: [
                "A contract price of R12 000 is allocated between goods with standalone selling prices of R10 000 and R5 000. The allocations are R8 000 and R4 000."
            ]
        },


        {
            topic: "IFRS 16 - Leases",

            keywords: [
                "ifrs 16",
                "lease",
                "right of use asset",
                "rou asset",
                "lease liability",
                "lessee"
            ],

            relatedKeywords: [
                "rent",
                "present value",
                "interest",
                "depreciation"
            ],

            information:
                "IFRS 16 requires a lessee to recognise a right-of-use asset and lease liability for most leases, subject to exemptions.",

            formulas: [
                "Lease liability = Present value of lease payments",
                "Interest expense = Opening lease liability × Interest rate",
                "Closing liability = Opening liability + Interest - Lease payment"
            ],

            rules: [
                "The right-of-use asset is generally depreciated over the relevant period.",
                "The lease liability is subsequently measured using the effective interest method."
            ],

            examples: [
                "Opening lease liability R379 000, interest R37 900 and payment R100 000 gives closing liability of R316 900."
            ]
        },


        {
            topic: "IFRS 3 - Business Combinations",

            keywords: [
                "ifrs 3",
                "business combination",
                "acquisition method",
                "goodwill",
                "bargain purchase",
                "acquirer"
            ],

            relatedKeywords: [
                "subsidiary",
                "consideration",
                "fair value",
                "nci",
                "net assets"
            ],

            information:
                "IFRS 3 establishes accounting requirements for business combinations using the acquisition method.",

            formulas: [
                "Goodwill = Consideration + NCI + Previous interest - Fair value of identifiable net assets"
            ],

            rules: [
                "Identify the acquirer.",
                "Determine the acquisition date.",
                "Recognise identifiable assets acquired and liabilities assumed at acquisition-date fair values, subject to specific requirements.",
                "Recognise goodwill or a bargain purchase gain."
            ],

            examples: [
                "Consideration R10m + NCI R2m - net identifiable assets R9m = goodwill R3m."
            ]
        },


        {
            topic: "IAS 36 - Impairment of Assets",

            keywords: [
                "ias 36",
                "impairment",
                "recoverable amount",
                "value in use",
                "fair value less costs of disposal",
                "fvlcd",
                "carrying amount"
            ],

            relatedKeywords: [
                "asset",
                "loss",
                "recoverable amount",
                "cash generating unit",
                "cgu"
            ],

            information:
                "IAS 36 requires assets not to be carried above their recoverable amount.",

            formulas: [
                "Recoverable amount = Higher of Value in Use and Fair Value Less Costs of Disposal",
                "Impairment loss = Carrying Amount - Recoverable Amount"
            ],

            rules: [
                "An impairment loss is recognised when carrying amount exceeds recoverable amount.",
                "Cash-generating units are used where an individual asset does not generate largely independent cash inflows."
            ],

            examples: [
                "Carrying amount R1.5m, FVLCD R1.2m and VIU R1.35m. Recoverable amount = R1.35m. Impairment loss = R150 000."
            ]
        },


        {
            topic: "IAS 37 - Provisions",

            keywords: [
                "ias 37",
                "provision",
                "contingent liability",
                "contingent asset",
                "present obligation",
                "probable",
                "best estimate"
            ],

            relatedKeywords: [
                "lawsuit",
                "obligation",
                "uncertain",
                "discount",
                "expected value"
            ],

            information:
                "IAS 37 deals with provisions, contingent liabilities and contingent assets.",

            formulas: [
                "Expected value = Σ Probability × Possible outcome"
            ],

            rules: [
                "A provision is recognised when there is a present obligation from a past event, a probable outflow of resources and a reliable estimate can be made.",
                "A contingent liability is generally disclosed rather than recognised unless the probability and other recognition requirements are met.",
                "Long-term provisions may require discounting."
            ],

            examples: [
                "Possible outcomes: 60% probability of R0, 30% of R1m and 10% of R3m. Expected value = R600 000."
            ]
        },


        {
            topic: "IAS 33 - Earnings Per Share",

            keywords: [
                "ias 33",
                "earnings per share",
                "eps",
                "weighted average shares",
                "basic eps"
            ],

            relatedKeywords: [
                "profit",
                "ordinary shares",
                "shareholders"
            ],

            information:
                "IAS 33 prescribes principles for calculating and presenting earnings per share for entities whose ordinary shares are publicly traded or are in the process of issuing such shares.",

            formulas: [
                "Basic EPS = Profit attributable to ordinary equity holders / Weighted average number of ordinary shares"
            ],

            rules: [
                "The weighted average number of ordinary shares reflects changes in shares during the period."
            ],

            examples: [
                "Profit R10m and weighted average shares of 5m gives EPS of R2.00."
            ]
        },


        {
            topic: "Bank Reconciliation",

            keywords: [
                "bank reconciliation",
                "bank recon",
                "cash book",
                "bank statement",
                "unpresented cheque",
                "outstanding deposit"
            ],

            relatedKeywords: [
                "bank",
                "cash",
                "cheque",
                "deposit"
            ],

            information:
                "A bank reconciliation compares the business's cash records with the bank statement and explains differences between the two balances.",

            formulas: [],

            rules: [
                "Unpresented cheques may appear in the cash book but not yet in the bank statement.",
                "Outstanding deposits may appear in the cash book but not yet in the bank statement.",
                "Bank charges appearing only on the bank statement normally need recording in the cash book."
            ],

            examples: []
        },


        {
            topic: "Accounting Ratios",

            keywords: [
                "accounting ratios",
                "ratios",
                "current ratio",
                "acid test",
                "debt ratio",
                "inventory turnover",
                "debtors collection",
                "creditors payment",
                "gross profit percentage",
                "net profit percentage",
                "roe",
                "roa"
            ],

            relatedKeywords: [
                "liquidity",
                "solvency",
                "profitability",
                "efficiency"
            ],

            information:
                "Accounting ratios are used to analyse liquidity, profitability, solvency and operating efficiency.",

            formulas: [
                "Current ratio = Current Assets / Current Liabilities",
                "Acid test = (Current Assets - Inventory) / Current Liabilities",
                "Debt ratio = Total Liabilities / Total Assets × 100",
                "Gross profit % = Gross Profit / Sales × 100",
                "Net profit % = Net Profit / Sales × 100",
                "ROE = Net Profit / Average Equity × 100",
                "ROA = Net Profit / Average Assets × 100",
                "Inventory turnover = Cost of Sales / Average Inventory",
                "Debtors collection period = Average Receivables / Credit Sales × 365",
                "Creditors payment period = Average Payables / Credit Purchases × 365"
            ],

            rules: [
                "Liquidity ratios measure the ability to meet short-term obligations.",
                "Profitability ratios measure profit performance.",
                "Solvency ratios examine long-term financial risk.",
                "Efficiency ratios examine how effectively assets and working capital are used."
            ],

            examples: [
                "Current assets R200 000 and current liabilities R100 000 gives a current ratio of 2:1."
            ]
        },


        {
            topic: "Partnerships",

            keywords: [
                "partnership",
                "partnerships",
                "partnership agreement",
                "current account partner",
                "capital account partner",
                "profit sharing ratio",
                "appropriation account"
            ],

            relatedKeywords: [
                "partner",
                "salary",
                "bonus",
                "interest on capital",
                "drawings",
                "dissolution"
            ],

            information:
                "A partnership is a business owned by two or more partners who share profits, losses and responsibilities according to a partnership agreement.",

            formulas: [
                "Partner's share of profit = Profit sharing ratio × Net profit after appropriations",
                "Interest on capital = Capital balance × Interest rate",
                "Closing current account = Opening balance + Salary + Interest on capital + Bonus + Share of profit - Drawings - Interest on drawings"
            ],

            rules: [
                "In the absence of a partnership agreement, profits and losses are often shared equally, subject to applicable law.",
                "Partner salaries, bonuses and interest on capital are appropriations of profit, not expenses in determining net profit.",
                "Each partner usually has a separate capital account and current account.",
                "The capital account generally remains fixed unless there is a permanent change in capital contributed.",
                "The current account records day-to-day movements such as salary, interest, share of profit and drawings."
            ],

            examples: [
                "Net profit R200 000 shared equally between two partners gives each partner R100 000 before other appropriations.",
                "A partner with capital of R300 000 and interest on capital of 10% receives R30 000 interest on capital."
            ]
        },


        {
            topic: "Companies and Share Capital",

            keywords: [
                "company",
                "companies",
                "share capital",
                "ordinary shares",
                "preference shares",
                "dividends",
                "retained earnings",
                "shares issued",
                "authorised shares"
            ],

            relatedKeywords: [
                "shareholders",
                "equity",
                "directors",
                "public company",
                "private company"
            ],

            information:
                "A company is a separate legal entity whose equity is divided into shares held by shareholders. Companies raise capital by issuing shares and may distribute profits as dividends.",

            formulas: [
                "Dividends per share = Total dividends declared / Number of shares in issue",
                "Retained earnings closing balance = Opening balance + Net profit for the year - Dividends declared",
                "Shares issued during year × Issue price = Proceeds from share issue"
            ],

            rules: [
                "A company has a legal identity separate from its shareholders.",
                "Ordinary shareholders generally carry the main voting and residual profit rights, while preference shareholders often receive a fixed dividend preference.",
                "Dividends are a distribution of profit and are not treated as an expense in determining net profit.",
                "Retained earnings accumulate undistributed profits over time."
            ],

            examples: [
                "A company declares total dividends of R500 000 on 1 000 000 shares in issue, giving dividends per share of R0.50."
            ]
        },


        {
            topic: "Manufacturing Accounts",

            keywords: [
                "manufacturing account",
                "manufacturing accounts",
                "cost of production",
                "direct material",
                "direct labour",
                "factory overheads",
                "prime cost",
                "work in progress"
            ],

            relatedKeywords: [
                "factory",
                "production",
                "finished goods",
                "raw materials",
                "cost accounting"
            ],

            information:
                "Manufacturing accounts calculate the total cost of producing finished goods, distinguishing direct costs from indirect factory overheads.",

            formulas: [
                "Prime cost = Direct materials + Direct labour",
                "Cost of production = Prime cost + Factory overheads + Opening WIP - Closing WIP",
                "Direct materials used = Opening raw materials + Purchases - Closing raw materials"
            ],

            rules: [
                "Direct materials and direct labour are directly traceable to units produced.",
                "Factory overheads are indirect production costs, such as factory rent and indirect labour.",
                "Work in progress represents partly completed units at the start or end of a period.",
                "Non-manufacturing costs, such as administration and selling expenses, are excluded from cost of production."
            ],

            examples: [
                "Direct materials R150 000 + direct labour R100 000 = prime cost of R250 000. Adding factory overheads of R60 000 gives a cost of production of R310 000 before adjusting for work in progress."
            ]
        },


        {
            topic: "Budgeting",

            keywords: [
                "budget",
                "budgeting",
                "cash budget",
                "projected income statement",
                "variance",
                "favourable variance",
                "unfavourable variance"
            ],

            relatedKeywords: [
                "forecast",
                "planning",
                "control",
                "actual",
                "cash flow"
            ],

            information:
                "Budgeting involves preparing financial plans, such as a cash budget or projected income statement, and comparing budgeted figures with actual results.",

            formulas: [
                "Variance = Actual amount - Budgeted amount",
                "Closing cash balance = Opening cash balance + Total receipts - Total payments"
            ],

            rules: [
                "A cash budget projects expected cash receipts and payments over a future period.",
                "A favourable variance generally means results were better than budgeted; an unfavourable variance means results were worse.",
                "Budgets support planning, decision-making and performance evaluation."
            ],

            examples: [
                "Budgeted sales of R80 000 and actual sales of R95 000 gives a favourable sales variance of R15 000."
            ]
        },


        {
            topic: "Internal Control and Internal Audit",

            keywords: [
                "internal control",
                "internal audit",
                "segregation of duties",
                "authorisation",
                "control measures",
                "fraud prevention"
            ],

            relatedKeywords: [
                "risk",
                "policy",
                "procedure",
                "safeguard",
                "cash control",
                "stock control"
            ],

            information:
                "Internal control refers to the policies and procedures a business implements to safeguard assets, ensure accurate records and promote operational efficiency.",

            formulas: [],

            rules: [
                "Segregation of duties reduces the risk that one person can commit and conceal an error or fraud.",
                "Proper authorisation procedures help ensure transactions are valid and approved.",
                "Physical controls, such as locked storerooms, help safeguard assets.",
                "Regular reconciliations, such as bank reconciliations and stock counts, help detect errors and irregularities."
            ],

            examples: [
                "Separating the roles of receiving cash, recording cash and reconciling the bank account is an example of segregation of duties."
            ]
        },


        {
            topic: "Non-Profit Organisations",

            keywords: [
                "non profit organisation",
                "non profit organisations",
                "npo",
                "receipts and payments",
                "income and expenditure account",
                "accumulated fund",
                "subscriptions"
            ],

            relatedKeywords: [
                "club",
                "society",
                "surplus",
                "deficit",
                "members"
            ],

            information:
                "Non-profit organisations, such as clubs and societies, prepare financial statements such as an income and expenditure account rather than an income statement, since the entity is not operated for profit.",

            formulas: [
                "Surplus or deficit = Total income - Total expenditure",
                "Closing accumulated fund = Opening accumulated fund + Surplus - Deficit"
            ],

            rules: [
                "The accumulated fund is broadly equivalent to the equity of a non-profit organisation.",
                "Subscriptions received in advance or still outstanding often require adjustment when calculating subscription income for the period.",
                "A surplus increases the accumulated fund and a deficit decreases it."
            ],

            examples: [
                "Total income of R120 000 and total expenditure of R95 000 gives a surplus of R25 000 for the period."
            ]
        },


        {
            topic: "Cash Flow Statement Adjustments",

            keywords: [
                "cash flow adjustments",
                "indirect method",
                "reconciliation of profit to cash",
                "non cash items",
                "working capital changes"
            ],

            relatedKeywords: [
                "depreciation",
                "profit before tax",
                "receivables",
                "payables"
            ],

            information:
                "The indirect method starts with profit before tax and adjusts for non-cash items and changes in working capital to arrive at cash generated from operations.",

            formulas: [
                "Cash generated from operations = Profit before tax + Depreciation - Profit on sale of assets ± Working capital changes"
            ],

            rules: [
                "Depreciation is added back because it is a non-cash expense.",
                "An increase in receivables reduces cash generated; a decrease increases it.",
                "An increase in payables increases cash generated; a decrease reduces it."
            ],

            examples: [
                "Profit before tax R400 000 + depreciation R60 000 - increase in receivables R20 000 = R440 000 cash generated before further adjustments."
            ]
        },


        {
            topic: "Errors and Correction of Errors",

            keywords: [
                "errors in accounting",
                "correction of errors",
                "suspense account",
                "error of omission",
                "error of commission",
                "error of principle",
                "compensating error"
            ],

            relatedKeywords: [
                "trial balance",
                "journal entry",
                "ledger"
            ],

            information:
                "Accounting errors are mistakes made in recording transactions. Some errors cause the trial balance not to balance, while others do not.",

            formulas: [],

            rules: [
                "An error of omission occurs when a transaction is left out entirely and does not affect the trial balance.",
                "An error of principle occurs when a transaction is recorded against the wrong class of account.",
                "A compensating error occurs when two unrelated errors happen to cancel each other out.",
                "A suspense account is a temporary account used to make a trial balance agree while the underlying error is investigated."
            ],

            examples: [
                "Recording the purchase of equipment as a repairs expense is an error of principle."
            ]
        },


        {
            topic: "Petty Cash",

            keywords: [
                "petty cash",
                "petty cash book",
                "imprest system",
                "petty cash voucher"
            ],

            relatedKeywords: [
                "cash",
                "float",
                "reimbursement"
            ],

            information:
                "Petty cash is a small amount of cash kept on hand to pay for minor day-to-day business expenses.",

            formulas: [
                "Amount to reimburse = Imprest float - Cash remaining on hand"
            ],

            rules: [
                "Under the imprest system, the float is topped up back to a fixed amount at the end of each period.",
                "Petty cash vouchers support each payment made from petty cash."
            ],

            examples: [
                "An imprest float of R1 000 with R350 remaining means R650 needs to be reimbursed to restore the float."
            ]
        },


        {
            topic: "Financial Statement Analysis and Interpretation",

            keywords: [
                "financial statement analysis",
                "interpretation of financial statements",
                "trend analysis",
                "comparative analysis",
                "common size statements"
            ],

            relatedKeywords: [
                "ratios",
                "performance",
                "users of financial statements"
            ],

            information:
                "Financial statement analysis involves examining financial statements, often using ratios and trends, to assess performance, liquidity and financial position.",

            formulas: [],

            rules: [
                "Comparing figures over several years can reveal trends that a single year's figures may hide.",
                "Ratios are often more meaningful when compared with prior periods or with similar businesses.",
                "Users of financial statements include owners, lenders, employees, government and potential investors."
            ],

            examples: [
                "A steadily declining gross profit percentage over three years may prompt further investigation into pricing or cost control."
            ]
        },


        {
            topic: "Code of Professional Ethics for Accountants",

            keywords: [
                "accounting ethics",
                "professional ethics",
                "code of ethics",
                "integrity",
                "objectivity",
                "professional competence",
                "confidentiality"
            ],

            relatedKeywords: [
                "accountant",
                "auditor",
                "professional conduct"
            ],

            information:
                "Professional accountants are generally expected to follow fundamental ethical principles when carrying out their work.",

            formulas: [],

            rules: [
                "Integrity requires being straightforward and honest in professional relationships.",
                "Objectivity requires not allowing bias, conflict of interest or undue influence to override professional judgement.",
                "Professional competence and due care require maintaining knowledge and skill and acting diligently.",
                "Confidentiality requires respecting the confidentiality of information acquired through professional work.",
                "Professional behaviour requires complying with relevant laws and avoiding conduct that discredits the profession."
            ],

            examples: []
        }

    ];
