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
        version: "v1.2.0 (smarter + jokes)"
    };


    /* =========================================================
       CONVERSATION STATE
    ========================================================= */

    let lastConversationState = {
        subject: null,
        topic: null,
        exampleIndex: 0
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


    /* =========================================================
       ECONOMICS KNOWLEDGE
    ========================================================= */

    const economicsKnowledge = [

        {
            topic: "Economics",
            keywords: ["economics", "what is economics", "definition of economics", "economic problem"],
            relatedKeywords: ["scarcity", "choice", "resources", "needs", "wants", "opportunity cost"],
            information: "Economics is the study of how individuals, businesses, governments and societies allocate scarce resources that have alternative uses.",
            formulas: [],
            rules: [
                "Resources are scarce.",
                "Human wants are unlimited relative to available resources.",
                "Scarcity creates the need for choice.",
                "Every choice can involve an opportunity cost."
            ],
            examples: [
                "If a student spends three hours studying Accounting instead of working, the income that could have been earned from working is an opportunity cost."
            ]
        },

        {
            topic: "Scarcity and Opportunity Cost",
            keywords: ["scarcity", "opportunity cost", "choice", "economic problem", "limited resources", "unlimited wants"],
            relatedKeywords: ["resources", "needs", "wants", "trade off"],
            information: "Scarcity means resources are limited while wants are unlimited. Opportunity cost is the value of the next best alternative forgone when a choice is made.",
            formulas: ["Opportunity cost = Value of the next best alternative forgone"],
            rules: [
                "Opportunity cost is not necessarily money.",
                "The next best alternative is important; it is not every alternative."
            ],
            examples: [
                "If R1 000 is spent on a phone instead of textbooks, the textbooks are the relevant opportunity cost if they were the next best alternative."
            ]
        },

        {
            topic: "Factors of Production",
            keywords: ["factors of production", "land labour capital entrepreneurship", "land", "labour", "capital", "entrepreneurship"],
            relatedKeywords: ["rent", "wages", "interest", "profit", "resources"],
            information: "The four main factors of production are land, labour, capital and entrepreneurship.",
            formulas: [],
            rules: [
                "Land is rewarded by rent.",
                "Labour is rewarded by wages.",
                "Capital is rewarded by interest.",
                "Entrepreneurship is rewarded by profit."
            ],
            examples: []
        },

        {
            topic: "Demand",
            keywords: ["demand", "law of demand", "demand curve", "quantity demanded", "change in demand", "movement along demand"],
            relatedKeywords: ["price", "consumer", "income", "substitute", "complement"],
            information: "Demand refers to the quantities of a good or service that consumers are willing and able to buy at different prices during a particular period.",
            formulas: [],
            rules: [
                "The law of demand generally states that, ceteris paribus, quantity demanded falls when price rises and rises when price falls.",
                "A movement along the demand curve is caused by a change in the good's own price.",
                "A shift of the demand curve is caused by other determinants such as income, tastes and prices of related goods."
            ],
            examples: []
        },

        {
            topic: "Supply",
            keywords: ["supply", "law of supply", "supply curve", "quantity supplied", "change in supply", "movement along supply"],
            relatedKeywords: ["price", "producer", "cost", "technology", "tax"],
            information: "Supply refers to the quantities of a good or service that producers are willing and able to offer for sale at different prices during a period.",
            formulas: [],
            rules: [
                "The law of supply generally states that quantity supplied rises as price rises, ceteris paribus.",
                "A change in own price causes movement along the supply curve.",
                "Changes in production costs, technology, taxes or subsidies can shift supply."
            ],
            examples: []
        },

        {
            topic: "Market Equilibrium",
            keywords: ["equilibrium", "market equilibrium", "equilibrium price", "equilibrium quantity", "shortage", "surplus"],
            relatedKeywords: ["demand", "supply", "market", "price"],
            information: "Market equilibrium occurs where quantity demanded equals quantity supplied.",
            formulas: ["Equilibrium condition: Qd = Qs"],
            rules: [
                "A shortage occurs when quantity demanded exceeds quantity supplied.",
                "A surplus occurs when quantity supplied exceeds quantity demanded.",
                "Market price tends to adjust through the interaction of demand and supply."
            ],
            examples: []
        },

        {
            topic: "Elasticity",
            keywords: ["elasticity", "price elasticity", "ped", "pes", "income elasticity", "yed", "cross elasticity", "xed"],
            relatedKeywords: ["demand", "supply", "percentage change", "elastic", "inelastic", "substitute", "complement"],
            information: "Elasticity measures the responsiveness of one economic variable to a change in another variable.",
            formulas: [
                "PED = % change in quantity demanded / % change in price",
                "PES = % change in quantity supplied / % change in price",
                "YED = % change in quantity demanded / % change in income",
                "XED = % change in quantity demanded of good A / % change in price of good B"
            ],
            rules: [
                "PED greater than 1 in absolute value indicates elastic demand.",
                "PED less than 1 in absolute value indicates inelastic demand.",
                "XED is positive for substitutes and negative for complements.",
                "YED is generally positive for normal goods and negative for inferior goods."
            ],
            examples: [
                "If price rises by 10% and quantity demanded falls by 20%, PED = -2. Demand is elastic."
            ]
        },

        {
            topic: "Market Structures",
            keywords: ["market structure", "perfect competition", "monopoly", "oligopoly", "monopolistic competition"],
            relatedKeywords: ["firms", "competition", "barriers to entry", "price taker", "price maker", "market power"],
            information: "Market structures describe the characteristics of markets, including the number of firms, product differentiation, barriers to entry and degree of market power.",
            formulas: [
                "TR = Price × Quantity",
                "Profit = Total Revenue - Total Cost",
                "AR = Total Revenue / Quantity",
                "AC = Total Cost / Quantity",
                "MC = Change in Total Cost / Change in Quantity"
            ],
            rules: [
                "Perfect competition has many firms, homogeneous products and relatively free entry and exit.",
                "A monopoly has a single dominant seller with significant barriers to entry.",
                "An oligopoly has a small number of significant firms.",
                "Monopolistic competition has many firms selling differentiated products."
            ],
            examples: []
        },

        {
            topic: "Inflation",
            keywords: ["inflation", "consumer price index", "cpi", "demand pull", "cost push", "imported inflation", "deflation", "disinflation", "hyperinflation", "stagflation"],
            relatedKeywords: ["prices", "purchasing power", "cost of living", "interest rate", "money"],
            information: "Inflation is a sustained increase in the general price level of goods and services over time, which reduces the purchasing power of money.",
            formulas: ["Inflation rate = (CPI current - CPI previous) / CPI previous × 100"],
            rules: [
                "Demand-pull inflation can occur when aggregate demand grows faster than productive capacity.",
                "Cost-push inflation can arise from rising production costs.",
                "Imported inflation can result from higher import prices or currency depreciation.",
                "Deflation is a sustained fall in the general price level.",
                "Disinflation means the inflation rate is falling, not necessarily that prices are falling."
            ],
            examples: [
                "If CPI rises from 120 to 126 over a year, the inflation rate = (126 - 120) / 120 × 100 = 5%.",
                "A sharp increase in global oil prices raising local fuel and transport costs is an example of imported/cost-push inflation.",
                "A rand depreciation that makes imported electronics more expensive for South African consumers is an example of imported inflation.",
                "Wage increases that are not matched by productivity gains, forcing employers to raise prices, illustrate cost-push inflation.",
                "A period where the inflation rate falls from 7% to 4% (still positive, just slower) is disinflation, not deflation."
            ]
        },

        {
            topic: "Unemployment",
            keywords: ["unemployment", "unemployment rate", "frictional unemployment", "structural unemployment", "cyclical unemployment", "seasonal unemployment", "labour force"],
            relatedKeywords: ["employment", "workers", "jobs", "labour market", "wages"],
            information: "Unemployment occurs when people who are part of the labour force are without work but are available for work and seeking employment.",
            formulas: [
                "Unemployment rate = Unemployed / Labour force × 100",
                "Labour force participation rate = Labour force / Working-age population × 100"
            ],
            rules: [
                "Frictional unemployment is associated with people moving between jobs.",
                "Structural unemployment results from a mismatch between workers' skills and available jobs.",
                "Cyclical unemployment is linked to fluctuations in economic activity.",
                "Seasonal unemployment occurs because some jobs are available only during particular seasons."
            ],
            examples: []
        },

        {
            topic: "GDP and Economic Growth",
            keywords: ["gdp", "gross domestic product", "economic growth", "real gdp", "nominal gdp", "gdp per capita", "growth rate"],
            relatedKeywords: ["output", "production", "income", "population", "economy"],
            information: "GDP measures the market value of final goods and services produced within an economy during a specified period. Economic growth refers to an increase in real output over time.",
            formulas: [
                "GDP = C + I + G + (X - M)",
                "GDP per capita = GDP / Population",
                "Growth rate = (New value - Old value) / Old value × 100"
            ],
            rules: [
                "Real GDP removes the effect of price changes more effectively than nominal GDP.",
                "GDP per capita divides GDP by population.",
                "Economic growth is not the same as economic development."
            ],
            examples: ["If GDP rises from R1 trillion to R1.05 trillion, growth = 5%."]
        },

        {
            topic: "Aggregate Demand",
            keywords: ["aggregate demand", "ad", "consumption", "investment", "government spending", "net exports", "c i g x m"],
            relatedKeywords: ["gdp", "macroeconomics", "economy", "spending"],
            information: "Aggregate demand is the total planned expenditure on domestically produced final goods and services at different price levels.",
            formulas: ["AD = C + I + G + (X - M)"],
            rules: [
                "Consumption is household spending.",
                "Investment is spending on capital goods and inventories.",
                "Government spending is expenditure by government.",
                "Net exports equal exports minus imports."
            ],
            examples: []
        },

        {
            topic: "Fiscal Policy",
            keywords: ["fiscal policy", "government spending", "taxation", "budget deficit", "budget surplus", "expansionary fiscal policy", "contractionary fiscal policy"],
            relatedKeywords: ["government", "tax", "spending", "economy", "aggregate demand"],
            information: "Fiscal policy refers to government decisions about taxation and expenditure used to influence economic activity and pursue public objectives.",
            formulas: ["Budget balance = Government revenue - Government expenditure"],
            rules: [
                "Expansionary fiscal policy can involve higher government spending or lower taxes.",
                "Contractionary fiscal policy can involve lower government spending or higher taxes.",
                "A deficit occurs when expenditure exceeds revenue.",
                "A surplus occurs when revenue exceeds expenditure."
            ],
            examples: []
        },

        {
            topic: "Monetary Policy",
            keywords: ["monetary policy", "repo rate", "interest rate", "sarb", "south african reserve bank", "inflation targeting"],
            relatedKeywords: ["money", "credit", "borrowing", "lending", "inflation"],
            information: "Monetary policy is the process through which a central bank influences financial conditions, particularly interest rates and liquidity, to achieve macroeconomic objectives.",
            formulas: ["Approximate real interest rate = Nominal interest rate - Inflation rate"],
            rules: [
                "The South African Reserve Bank conducts monetary policy in South Africa.",
                "Higher interest rates can reduce borrowing and interest-sensitive spending.",
                "Lower interest rates can encourage borrowing and spending.",
                "The effects of monetary policy occur through transmission mechanisms and may involve time lags."
            ],
            examples: []
        },

        {
            topic: "Multiplier",
            keywords: ["multiplier", "economic multiplier", "mps", "mpc", "marginal propensity to consume", "marginal propensity to save"],
            relatedKeywords: ["consumption", "saving", "income", "investment", "government spending"],
            information: "The Keynesian multiplier shows how an initial change in autonomous expenditure can produce a larger eventual change in aggregate income.",
            formulas: [
                "MPC = Change in Consumption / Change in Income",
                "MPS = Change in Saving / Change in Income",
                "MPC + MPS = 1",
                "Multiplier = 1 / (1 - MPC)",
                "Multiplier = 1 / MPS"
            ],
            rules: [
                "A higher MPC generally produces a larger simple spending multiplier.",
                "Leakages such as saving, taxation and imports reduce the overall multiplier effect."
            ],
            examples: ["If MPC = 0.8, multiplier = 1 / (1 - 0.8) = 5."]
        },

        {
            topic: "Business Cycles",
            keywords: ["business cycle", "expansion", "peak", "contraction", "trough", "recovery", "recession"],
            relatedKeywords: ["gdp", "economic activity", "output", "employment"],
            information: "The business cycle describes fluctuations in economic activity around the economy's long-run growth path.",
            formulas: [],
            rules: [
                "Expansion is a period of rising economic activity.",
                "Peak is the high point before contraction.",
                "Contraction is a decline in economic activity.",
                "Trough is the low point.",
                "Recovery is the movement from a trough toward expansion."
            ],
            examples: []
        },

        {
            topic: "Externalities",
            keywords: ["externalities", "externality", "positive externality", "negative externality", "social cost", "social benefit", "pollution"],
            relatedKeywords: ["market failure", "private cost", "external cost", "government", "environment"],
            information: "An externality occurs when an economic activity affects third parties who are not fully reflected in the market transaction.",
            formulas: ["Social Cost = Private Cost + External Cost", "Social Benefit = Private Benefit + External Benefit"],
            rules: [
                "Negative externalities impose external costs on third parties.",
                "Positive externalities create external benefits for third parties.",
                "Externalities are one source of market failure."
            ],
            examples: ["Factory pollution can impose health and environmental costs on nearby residents."]
        },

        {
            topic: "International Trade",
            keywords: ["international trade", "trade", "exports", "imports", "tariff", "quota", "protectionism", "comparative advantage"],
            relatedKeywords: ["wto", "globalisation", "foreign exchange", "terms of trade"],
            information: "International trade involves exchange of goods and services between countries. Countries may trade because of differences in resources, technology, productivity and opportunity costs.",
            formulas: ["Trade balance = Exports - Imports", "Terms of trade = Export price index / Import price index × 100"],
            rules: [
                "A tariff is a tax on imports.",
                "A quota is a quantitative restriction on imports.",
                "Protectionism refers to policies that restrict or influence international competition."
            ],
            examples: [
                "South Africa exporting wine and citrus to the UK while importing machinery from Germany illustrates trade based on comparative advantage.",
                "A country rich in minerals, such as South Africa, tends to export gold and platinum while importing manufactured electronics.",
                "A 20% tariff on imported vehicles raises their local price, protecting domestic vehicle manufacturers from cheaper foreign competition.",
                "A quota limiting sugar imports to 50 000 tonnes a year is a quantitative restriction rather than a price-based one like a tariff.",
                "When the rand depreciates against the US dollar, South African exports become relatively cheaper for foreign buyers, while imports become more expensive locally."
            ]
        },

        {
            topic: "Foreign Exchange",
            keywords: ["foreign exchange", "exchange rate", "currency", "appreciation", "depreciation", "rand", "dollar"],
            relatedKeywords: ["exports", "imports", "forex", "international trade"],
            information: "The foreign exchange market is where currencies are bought and sold. An exchange rate expresses the value of one currency in terms of another.",
            formulas: [],
            rules: [
                "Currency appreciation means a currency becomes more valuable relative to another currency.",
                "Currency depreciation means it becomes less valuable.",
                "A weaker domestic currency can make exports cheaper for foreign buyers and imports more expensive for domestic buyers, all else equal."
            ],
            examples: []
        },

        {
            topic: "Circular Flow of Income",
            keywords: ["circular flow of income", "circular flow", "households firms government", "leakages injections", "leakage", "injection"],
            relatedKeywords: ["income", "spending", "savings", "taxation", "investment", "exports"],
            information: "The circular flow of income model shows how income and spending flow between households, firms, government and the foreign sector in an economy.",
            formulas: [],
            rules: [
                "Households supply factors of production to firms and receive income in return.",
                "Firms supply goods and services to households in return for spending.",
                "Leakages, such as savings, taxation and imports, withdraw money from the circular flow.",
                "Injections, such as investment, government spending and exports, add money to the circular flow.",
                "The circular flow is in equilibrium when total leakages equal total injections."
            ],
            examples: []
        },

        {
            topic: "Market Failure and Public Goods",
            keywords: ["market failure", "public good", "public goods", "private good", "free rider", "non excludable", "non rivalrous", "merit good", "demerit good"],
            relatedKeywords: ["externality", "government intervention", "information failure", "monopoly power"],
            information: "Market failure occurs when the free market fails to allocate resources efficiently. Public goods are one cause of market failure because they are non-excludable and non-rivalrous.",
            formulas: [],
            rules: [
                "A public good is non-excludable, meaning people cannot easily be prevented from using it once it is provided.",
                "A public good is non-rivalrous, meaning one person's use does not reduce its availability to others.",
                "The free-rider problem can lead to public goods being under-provided by the private market.",
                "Merit goods tend to be under-consumed and demerit goods tend to be over-consumed relative to the socially optimal level.",
                "Other causes of market failure include externalities, information failure and market power."
            ],
            examples: [
                "Public goods: national defence and street lighting are non-excludable and non-rivalrous, so private firms won't supply them (free-rider problem).",
                "Negative externality: a mine pollutes a river, and the nearby community bears health and clean-up costs that the mine doesn't pay.",
                "Positive externality: when people get vaccinated or educated, society benefits from fewer diseases and a more skilled workforce, but the individual doesn't get paid for it.",
                "Monopoly power: a sole supplier such as Eskom or Transnet can restrict output and charge above marginal cost.",
                "Information failure: a used-car seller knows more than the buyer, or smokers underestimate health risks, so resources are misallocated.",
                "Immobility of factors: a retrenched mineworker in Limpopo cannot easily move to a tech job in Cape Town because of skills and location barriers.",
                "Demerit goods: cigarettes and alcohol are over-consumed, which is why government uses sin taxes. Merit goods like education are under-consumed, so government subsidises them."
            ]
        },

        {
            topic: "Income Distribution and Poverty",
            keywords: ["income distribution", "poverty", "gini coefficient", "lorenz curve", "inequality", "poverty line", "redistribution"],
            relatedKeywords: ["income", "wealth", "social grants", "unemployment", "welfare"],
            information: "Income distribution describes how income is shared among individuals or households in an economy. The Gini coefficient and Lorenz curve are common tools used to measure income inequality.",
            formulas: ["Gini coefficient ranges from 0 (perfect equality) to 1 (perfect inequality)"],
            rules: [
                "A Lorenz curve plots the cumulative share of income against the cumulative share of the population.",
                "A Gini coefficient closer to 0 indicates a more equal income distribution, while a value closer to 1 indicates greater inequality.",
                "Governments can use taxation, social grants and other redistribution policies to reduce income inequality."
            ],
            examples: []
        },

        {
            topic: "Balance of Payments",
            keywords: ["balance of payments", "current account", "capital account", "financial account", "trade balance", "bop"],
            relatedKeywords: ["exports", "imports", "foreign investment", "reserves"],
            information: "The balance of payments is a record of all economic transactions between residents of a country and the rest of the world over a specific period.",
            formulas: ["Current account balance = Trade balance + Net income + Net current transfers"],
            rules: [
                "The current account mainly records trade in goods and services, income and current transfers.",
                "The financial account mainly records cross-border investment flows.",
                "A current account deficit means a country is generally a net borrower from the rest of the world over that period."
            ],
            examples: []
        },

        {
            topic: "Economic Systems",
            keywords: ["economic system", "economic systems", "market economy", "command economy", "mixed economy", "planned economy", "traditional economy"],
            relatedKeywords: ["resource allocation", "government", "private sector", "central planning"],
            information: "An economic system describes how a society organises the production, distribution and allocation of goods, services and resources.",
            formulas: [],
            rules: [
                "In a market economy, resource allocation is mainly determined by the price mechanism through decentralised decisions.",
                "In a command economy, resource allocation is mainly determined by central government planning.",
                "A mixed economy combines features of both market and command economies.",
                "A traditional economy relies mainly on custom, culture and historical practice to allocate resources."
            ],
            examples: []
        },

        {
            topic: "Economic Indicators",
            keywords: ["economic indicators", "leading indicator", "lagging indicator", "coincident indicator", "composite leading business cycle indicator"],
            relatedKeywords: ["gdp", "inflation", "unemployment", "forecast"],
            information: "Economic indicators are statistics used to assess current economic conditions and help forecast future economic activity.",
            formulas: [],
            rules: [
                "Leading indicators tend to change before the overall economy changes.",
                "Lagging indicators tend to change after the overall economy has already changed.",
                "Coincident indicators tend to move at roughly the same time as the overall economy."
            ],
            examples: ["Building plans passed are often treated as a leading indicator, while the unemployment rate is often treated as a lagging indicator."]
        },

        {
            topic: "Consumer and Producer Behaviour",
            keywords: ["utility", "marginal utility", "consumer behaviour", "producer behaviour", "diminishing marginal utility", "profit maximisation"],
            relatedKeywords: ["satisfaction", "consumption", "production", "cost"],
            information: "Consumer behaviour theory looks at how consumers make choices to maximise satisfaction (utility), while producer behaviour theory looks at how firms make production decisions, often to maximise profit.",
            formulas: [
                "Marginal utility = Change in total utility / Change in quantity consumed",
                "Profit-maximising condition (commonly used approximation): Marginal Revenue = Marginal Cost"
            ],
            rules: [
                "The law of diminishing marginal utility suggests that, ceteris paribus, each additional unit consumed tends to add less satisfaction than the previous unit.",
                "Firms are often assumed to aim to maximise profit, though this is a simplifying assumption."
            ],
            examples: []
        },

        {
            topic: "Money and Banking",
            keywords: ["money", "functions of money", "medium of exchange", "store of value", "unit of account", "commercial bank", "central bank"],
            relatedKeywords: ["currency", "deposits", "credit creation", "reserve bank"],
            information: "Money performs several functions in an economy, and the banking system channels funds between savers and borrowers.",
            formulas: [],
            rules: [
                "Money commonly serves as a medium of exchange, a unit of account, a store of value and a standard of deferred payment.",
                "Commercial banks generally accept deposits and extend loans, which can contribute to credit creation in the economy.",
                "A central bank generally oversees monetary policy and financial system stability for a country."
            ],
            examples: []
        }

    ];


    /* =========================================================
       MATHEMATICS KNOWLEDGE
    ========================================================= */

    const mathematicsKnowledge = [

        {
            topic: "Basic Arithmetic",
            keywords: ["arithmetic", "addition", "subtraction", "multiplication", "division", "order of operations", "bodmas", "pemdas"],
            relatedKeywords: ["numbers", "calculation", "brackets"],
            information: "Arithmetic is the study of basic numerical operations such as addition, subtraction, multiplication and division.",
            formulas: ["BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction"],
            rules: ["Multiplication and division are performed before addition and subtraction unless brackets change the order."],
            examples: ["2 + 3 × 4 = 2 + 12 = 14."]
        },

        {
            topic: "Fractions Percentages and Ratios",
            keywords: ["fraction", "fractions", "percentage", "percent", "ratio", "proportion", "decimal"],
            relatedKeywords: ["numerator", "denominator", "increase", "decrease"],
            information: "Fractions represent parts of a whole, percentages express quantities out of 100 and ratios compare quantities.",
            formulas: ["Percentage = Part / Whole × 100", "Percentage change = (New - Old) / Old × 100"],
            rules: [
                "To add fractions, use a common denominator.",
                "To multiply fractions, multiply numerators and denominators.",
                "To divide by a fraction, multiply by its reciprocal."
            ],
            examples: ["25% of 200 = 0.25 × 200 = 50."]
        },

        {
            topic: "Algebra",
            keywords: ["algebra", "variable", "coefficient", "constant", "like terms", "expression", "simplify"],
            relatedKeywords: ["x", "y", "equation", "terms"],
            information: "Algebra uses symbols and variables to represent numbers and relationships.",
            formulas: ["a(x + y) = ax + ay"],
            rules: [
                "Like terms can be combined.",
                "A coefficient multiplies a variable.",
                "A constant has no variable attached to it."
            ],
            examples: ["3x + 2x - 4 = 5x - 4."]
        },

        {
            topic: "Linear Equations",
            keywords: ["linear equation", "solve equation", "equation", "simultaneous equation", "linear equations"],
            relatedKeywords: ["x", "unknown", "variable", "solve"],
            information: "A linear equation is an equation in which the highest power of the variable is 1.",
            formulas: ["ax + b = c", "x = (c - b) / a"],
            rules: [
                "Perform the same valid operation on both sides of an equation.",
                "The goal is to isolate the unknown variable."
            ],
            examples: ["2x + 6 = 14. Subtract 6: 2x = 8. Divide by 2: x = 4."]
        },

        {
            topic: "Quadratic Equations",
            keywords: ["quadratic", "quadratic equation", "quadratic formula", "factorisation", "discriminant", "parabola"],
            relatedKeywords: ["x squared", "roots", "solutions"],
            information: "A quadratic equation is an equation of the form ax² + bx + c = 0 where a is not zero.",
            formulas: ["x = [-b ± √(b² - 4ac)] / 2a", "Discriminant = b² - 4ac"],
            rules: [
                "If the discriminant is positive, there are two distinct real roots.",
                "If the discriminant is zero, there is one repeated real root.",
                "If the discriminant is negative, there are no real roots."
            ],
            examples: [
                "For x² - 5x + 6 = 0, factorisation gives (x - 2)(x - 3) = 0, so x = 2 or x = 3.",
                "For x² - 2x - 8 = 0, factorisation gives (x - 4)(x + 2) = 0, so x = 4 or x = -2.",
                "For 2x² + 3x - 5 = 0, using the quadratic formula: x = [-3 ± √(9 + 40)] / 4 = [-3 ± 7] / 4, giving x = 1 or x = -2.5.",
                "For x² + 4x + 4 = 0, the discriminant = 16 - 16 = 0, so there is one repeated root: x = -2.",
                "For x² + x + 1 = 0, the discriminant = 1 - 4 = -3, which is negative, so there are no real roots."
            ]
        },

        {
            topic: "Sequences",
            keywords: ["sequence", "arithmetic sequence", "geometric sequence", "series", "common difference", "common ratio"],
            relatedKeywords: ["nth term", "sum", "term"],
            information: "A sequence is an ordered list of numbers following a particular pattern.",
            formulas: [
                "Arithmetic nth term: an = a + (n - 1)d",
                "Arithmetic sum: Sn = n/2[2a + (n - 1)d]",
                "Geometric nth term: an = ar^(n - 1)",
                "Geometric sum: Sn = a(r^n - 1)/(r - 1), r ≠ 1"
            ],
            rules: [
                "An arithmetic sequence has a constant difference.",
                "A geometric sequence has a constant ratio."
            ],
            examples: ["2, 5, 8, 11 has common difference 3."]
        },

        {
            topic: "Functions",
            keywords: ["function", "functions", "domain", "range", "f x", "f(x)", "composite function", "inverse function"],
            relatedKeywords: ["input", "output", "mapping", "graph"],
            information: "A function is a rule that assigns each permitted input exactly one output.",
            formulas: ["f(x) = output produced by applying function f to x"],
            rules: [
                "The domain is the set of allowed inputs.",
                "The range is the set of resulting outputs.",
                "An inverse function reverses the mapping where an inverse exists."
            ],
            examples: ["If f(x) = 2x + 1, then f(3) = 7."]
        },

        {
            topic: "Straight Lines",
            keywords: ["straight line", "gradient", "slope", "y intercept", "x intercept", "point slope", "equation of a line"],
            relatedKeywords: ["coordinate", "parallel", "perpendicular", "graph"],
            information: "A straight-line graph has a constant gradient.",
            formulas: ["Gradient m = (y2 - y1) / (x2 - x1)", "y = mx + c", "y - y1 = m(x - x1)"],
            rules: [
                "Parallel lines have equal gradients.",
                "Perpendicular non-vertical lines have gradients whose product is -1."
            ],
            examples: ["For points (1,2) and (3,6), gradient = (6-2)/(3-1) = 2."]
        },

        {
            topic: "Pythagoras Theorem",
            keywords: ["pythagoras", "pythagorean theorem", "right triangle", "right angled triangle"],
            relatedKeywords: ["hypotenuse", "triangle", "geometry"],
            information: "Pythagoras' theorem applies to right-angled triangles.",
            formulas: ["a² + b² = c²"],
            rules: [
                "c is the hypotenuse, which is opposite the right angle.",
                "The theorem should only be applied directly to right-angled triangles."
            ],
            examples: [
                "If the legs are 3 and 4, c² = 9 + 16 = 25, so c = 5.",
                "If the legs are 6 and 8, c² = 36 + 64 = 100, so c = 10.",
                "If the hypotenuse is 13 and one leg is 5, the other leg = √(169 - 25) = √144 = 12.",
                "A ladder 5 m long leans against a wall with its base 3 m from the wall; it reaches √(25 - 9) = √16 = 4 m up the wall.",
                "A TV screen advertised as 'diagonal 24 inches' with width 19.2 inches and height 14.4 inches checks out because 19.2² + 14.4² = 24²."
            ]
        },

        {
            topic: "Trigonometry",
            keywords: ["trigonometry", "trig", "sin", "cos", "tan", "sohcahtoa", "sine rule", "cosine rule"],
            relatedKeywords: ["triangle", "angle", "opposite", "adjacent", "hypotenuse"],
            information: "Trigonometry studies relationships between angles and sides of triangles.",
            formulas: [
                "sin θ = Opposite / Hypotenuse",
                "cos θ = Adjacent / Hypotenuse",
                "tan θ = Opposite / Adjacent",
                "Sine Rule: a/sin A = b/sin B = c/sin C",
                "Cosine Rule: a² = b² + c² - 2bc cos A"
            ],
            rules: [
                "SOHCAHTOA is useful for right-angled triangles.",
                "The sine and cosine rules can be used for non-right-angled triangles."
            ],
            examples: ["If opposite = 3 and hypotenuse = 5, sin θ = 3/5."]
        },

        {
            topic: "Statistics",
            keywords: ["statistics", "mean", "median", "mode", "range", "variance", "standard deviation", "quartile", "iqr"],
            relatedKeywords: ["data", "average", "distribution", "dataset"],
            information: "Statistics involves collecting, organising, analysing and interpreting data.",
            formulas: ["Mean = Sum of observations / Number of observations", "Range = Maximum - Minimum", "IQR = Q3 - Q1", "Population variance = Σ(x - μ)² / N"],
            rules: [
                "The median is the middle value after sorting the data.",
                "The mode is the most frequently occurring value.",
                "Standard deviation measures spread around the mean."
            ],
            examples: ["For 2, 4, 6, the mean is 4."]
        },

        {
            topic: "Probability",
            keywords: ["probability", "probabilities", "conditional probability", "independent events", "bayes", "permutation", "combination"],
            relatedKeywords: ["event", "sample space", "outcome", "chance"],
            information: "Probability measures how likely an event is to occur.",
            formulas: [
                "P(A) = Number of favourable outcomes / Total number of equally likely outcomes",
                "P(A') = 1 - P(A)",
                "P(A and B) = P(A)P(B) for independent events",
                "P(A|B) = P(A and B) / P(B)",
                "nPr = n! / (n-r)!",
                "nCr = n! / [r!(n-r)!]"
            ],
            rules: [
                "Probability lies between 0 and 1.",
                "An impossible event has probability 0.",
                "A certain event has probability 1."
            ],
            examples: ["For a fair six-sided die, P(rolling a 4) = 1/6."]
        },

        {
            topic: "Financial Mathematics",
            keywords: ["financial mathematics", "simple interest", "compound interest", "interest", "present value", "future value", "depreciation", "compound growth"],
            relatedKeywords: ["principal", "rate", "time", "investment", "loan"],
            information: "Financial mathematics applies mathematical formulas to interest, investment, loans, growth and depreciation.",
            formulas: ["Simple interest: I = Prt", "Simple amount: A = P(1 + rt)", "Compound amount: A = P(1 + r)^n", "Compound interest: I = A - P"],
            rules: ["r must be expressed as a decimal in formulas.", "n represents the number of compounding periods."],
            examples: [
                "R10 000 invested at 10% compound interest for 2 years: A = 10 000(1.10)^2 = R12 100.",
                "R5 000 invested at 8% simple interest for 3 years: I = 5 000 × 0.08 × 3 = R1 200, so A = R6 200.",
                "R20 000 invested at 6% compounded annually for 5 years: A = 20 000(1.06)^5 ≈ R26 764.51.",
                "A car costing R300 000 depreciates at 15% per year on the reducing-balance method; after 2 years its value ≈ 300 000(0.85)^2 = R216 750.",
                "R15 000 borrowed at 12% simple interest per year must be repaid with R1 800 interest after 1 year, giving a total repayment of R16 800."
            ]
        },

        {
            topic: "Differentiation",
            keywords: ["differentiation", "derivative", "differentiate", "calculus", "gradient", "stationary point", "chain rule", "product rule", "quotient rule"],
            relatedKeywords: ["function", "maximum", "minimum", "rate of change"],
            information: "Differentiation measures the instantaneous rate of change of a function.",
            formulas: ["d/dx(x^n) = nx^(n-1)", "Product rule: (uv)' = u'v + uv'", "Quotient rule: (u/v)' = (u'v - uv') / v²", "Chain rule: d/dx[f(g(x))] = f'(g(x))g'(x)"],
            rules: [
                "A stationary point occurs where the first derivative is zero.",
                "The second derivative can help classify stationary points."
            ],
            examples: ["If y = x², dy/dx = 2x."]
        },

        {
            topic: "Integration",
            keywords: ["integration", "integral", "integrate", "antiderivative", "area under curve", "definite integral"],
            relatedKeywords: ["calculus", "area", "function", "constant"],
            information: "Integration is the reverse process of differentiation and can be used to calculate accumulated quantities such as area under a curve.",
            formulas: ["∫x^n dx = x^(n+1)/(n+1) + C, n ≠ -1", "∫a dx = ax + C"],
            rules: [
                "An indefinite integral includes a constant of integration C.",
                "A definite integral has upper and lower limits."
            ],
            examples: ["∫2x dx = x² + C."]
        },

        {
            topic: "Matrices",
            keywords: ["matrix", "matrices", "determinant", "inverse matrix", "matrix multiplication"],
            relatedKeywords: ["linear algebra", "rows", "columns", "identity matrix"],
            information: "A matrix is a rectangular arrangement of numbers or expressions.",
            formulas: ["For a 2×2 matrix [[a,b],[c,d]], determinant = ad - bc", "Inverse = 1/(ad-bc) [[d,-b],[-c,a]] when determinant ≠ 0"],
            rules: [
                "Matrix multiplication requires compatible dimensions.",
                "A square matrix is invertible only if its determinant is non-zero."
            ],
            examples: []
        },

        {
            topic: "Sets",
            keywords: ["set", "sets", "set theory", "union", "intersection", "subset", "venn diagram", "complement of a set"],
            relatedKeywords: ["element", "universal set", "empty set", "real numbers"],
            information: "A set is a well-defined collection of distinct objects, called elements. Set theory provides notation for describing relationships between collections of objects.",
            formulas: ["n(A ∪ B) = n(A) + n(B) - n(A ∩ B)"],
            rules: [
                "The union of two sets contains all elements that are in either set.",
                "The intersection of two sets contains only elements that are in both sets.",
                "A subset contains only elements that also belong to the larger set.",
                "A Venn diagram is a visual way to represent sets and their relationships."
            ],
            examples: ["If A = {1,2,3} and B = {2,3,4}, then A ∩ B = {2,3} and A ∪ B = {1,2,3,4}."]
        },

        {
            topic: "Exponents and Surds",
            keywords: ["exponent", "exponents", "surd", "surds", "law of exponents", "index", "indices", "rational exponent", "simplify surds"],
            relatedKeywords: ["power", "root", "square root", "cube root"],
            information: "Exponents represent repeated multiplication of a base number, while surds are irrational roots that cannot be simplified to a rational number.",
            formulas: ["a^m × a^n = a^(m+n)", "a^m ÷ a^n = a^(m-n)", "(a^m)^n = a^(mn)", "a^0 = 1, a ≠ 0", "a^(-n) = 1/a^n", "a^(m/n) = ⁿ√(a^m)"],
            rules: [
                "The laws of exponents apply only when the bases are the same for multiplication and division of powers.",
                "A surd is a root that results in an irrational number, such as √2.",
                "Surds can sometimes be simplified by factoring out perfect squares or cubes."
            ],
            examples: ["√50 = √(25 × 2) = 5√2."]
        },

        {
            topic: "Inequalities",
            keywords: ["inequality", "inequalities", "linear inequality", "quadratic inequality", "solve inequality", "number line"],
            relatedKeywords: ["greater than", "less than", "interval notation", "solution set"],
            information: "An inequality compares two expressions using symbols such as <, >, ≤ or ≥, and its solution is usually a range of values rather than a single value.",
            formulas: [],
            rules: [
                "Adding or subtracting the same value from both sides of an inequality keeps the inequality sign unchanged.",
                "Multiplying or dividing both sides by a negative number reverses the inequality sign.",
                "The solution to a quadratic inequality is often found by first solving the related quadratic equation."
            ],
            examples: ["Solve 2x + 4 > 10: 2x > 6, so x > 3."]
        },

        {
            topic: "Vectors",
            keywords: ["vector", "vectors", "magnitude", "direction", "vector addition", "resultant vector", "unit vector", "dot product"],
            relatedKeywords: ["displacement", "scalar", "components"],
            information: "A vector is a quantity that has both magnitude and direction, in contrast to a scalar, which has magnitude only.",
            formulas: ["Magnitude of vector (x, y) = √(x² + y²)", "Resultant vector = Sum of the components of the individual vectors", "Dot product: a · b = |a||b| cos θ"],
            rules: [
                "Vectors can be added using the head-to-tail method or by adding their respective components.",
                "A unit vector has a magnitude of 1 and indicates direction only."
            ],
            examples: ["For vector (3, 4), magnitude = √(3² + 4²) = √25 = 5."]
        },

        {
            topic: "Coordinate Geometry and Circles",
            keywords: ["coordinate geometry", "equation of a circle", "circle geometry", "midpoint", "distance formula", "centre radius"],
            relatedKeywords: ["coordinate", "graph", "tangent", "analytical geometry"],
            information: "Coordinate geometry uses algebraic methods to study geometric figures on a coordinate plane, including the equation of a circle.",
            formulas: ["Distance = √[(x2-x1)² + (y2-y1)²]", "Midpoint = ((x1+x2)/2, (y1+y2)/2)", "Equation of a circle centred at origin: x² + y² = r²", "Equation of a circle centred at (a,b): (x-a)² + (y-b)² = r²"],
            rules: [
                "The radius of a circle is the distance from the centre to any point on the circle.",
                "A tangent to a circle touches the circle at exactly one point and is perpendicular to the radius at that point."
            ],
            examples: ["A circle centred at (2,3) with radius 5 has the equation (x-2)² + (y-3)² = 25."]
        },

        {
            topic: "Mensuration: Area, Perimeter and Volume",
            keywords: ["mensuration", "area", "perimeter", "volume", "surface area", "circumference", "area of a triangle", "area of a circle", "volume of a cylinder", "volume of a sphere"],
            relatedKeywords: ["shape", "geometry", "rectangle", "cube", "prism"],
            information: "Mensuration deals with calculating the measurements of geometric shapes, such as area, perimeter, surface area and volume.",
            formulas: [
                "Area of a rectangle = Length × Width",
                "Area of a triangle = 1/2 × Base × Height",
                "Circumference of a circle = 2πr",
                "Area of a circle = πr²",
                "Volume of a cuboid = Length × Width × Height",
                "Volume of a cylinder = πr²h",
                "Volume of a sphere = 4/3 πr³"
            ],
            rules: [
                "Perimeter and circumference measure the distance around a shape.",
                "Area measures the space enclosed by a two-dimensional shape.",
                "Volume measures the space occupied by a three-dimensional object."
            ],
            examples: ["A rectangle with length 8 and width 5 has an area of 40 square units."]
        },

        {
            topic: "Number Patterns",
            keywords: ["number pattern", "number patterns", "quadratic sequence", "second difference", "general term"],
            relatedKeywords: ["sequence", "term", "pattern"],
            information: "Number patterns are sequences of numbers that follow an identifiable rule, which can sometimes be described by a general (nth) term formula.",
            formulas: ["Quadratic sequence general term: Tn = an² + bn + c"],
            rules: [
                "A constant first difference indicates a linear (arithmetic) pattern.",
                "A constant second difference indicates a quadratic pattern."
            ],
            examples: ["1, 4, 9, 16, 25 has first differences 3, 5, 7, 9 and a constant second difference of 2, indicating a quadratic pattern (n²)."]
        },

        {
            topic: "Logarithms",
            keywords: ["logarithm", "logarithms", "log", "natural log", "ln", "log laws"],
            relatedKeywords: ["exponent", "base", "power"],
            information: "A logarithm is the inverse operation of exponentiation; it answers the question of what power a base must be raised to in order to produce a given number.",
            formulas: ["If a^x = b, then log_a(b) = x", "log(mn) = log(m) + log(n)", "log(m/n) = log(m) - log(n)", "log(m^n) = n log(m)"],
            rules: [
                "The base of a logarithm must be positive and not equal to 1.",
                "Logarithms are only defined for positive numbers when working with real numbers."
            ],
            examples: ["log_2(8) = 3, because 2³ = 8."]
        },

        {
            topic: "Rounding and Estimation",
            keywords: ["rounding", "round off", "significant figures", "decimal places", "estimation", "approximation"],
            relatedKeywords: ["number", "accuracy"],
            information: "Rounding and estimation are used to express numbers to a suitable level of accuracy or to quickly approximate a calculation.",
            formulas: [],
            rules: [
                "When rounding, a digit of 5 or more generally rounds the preceding digit up.",
                "Significant figures count all meaningful digits in a number, starting from the first non-zero digit.",
                "Estimation can be used to quickly check whether a calculated answer is reasonable."
            ],
            examples: ["3.14159 rounded to two decimal places is 3.14."]
        }

    ];


    /* =========================================================
       SUBJECT KEYWORDS
    ========================================================= */

    const subjectWords = {

        Accounting: [
            "accounting", "account", "ifrs", "ias", "audit", "auditing", "tax", "vat", "ledger", "debit", "credit",
            "inventory", "stock", "asset", "liability", "equity", "profit", "loss", "depreciation", "cash flow",
            "financial statement", "balance sheet", "income statement", "journal", "trial balance", "consolidation",
            "associate", "subsidiary", "revenue", "lease", "partnership", "partner", "company", "companies",
            "share capital", "shares", "dividend", "manufacturing account", "prime cost", "factory overheads",
            "budget", "budgeting", "cash budget", "internal control", "internal audit", "segregation of duties",
            "non profit", "npo", "accumulated fund", "subscriptions", "petty cash", "suspense account",
            "error of principle", "ethics", "code of ethics", "integrity"
        ],

        Economics: [
            "economics", "economy", "scarcity", "opportunity cost", "demand", "supply", "equilibrium", "market",
            "inflation", "unemployment", "gdp", "fiscal", "monetary", "sarb", "repo", "elasticity", "elastic",
            "trade", "export", "import", "tariff", "quota", "exchange rate", "externality", "aggregate demand",
            "aggregate supply", "multiplier", "circular flow", "leakage", "injection", "market failure",
            "public good", "free rider", "merit good", "demerit good", "income distribution", "poverty", "gini",
            "lorenz curve", "inequality", "balance of payments", "current account", "economic system",
            "command economy", "mixed economy", "economic indicator", "utility", "marginal utility", "money",
            "central bank", "commercial bank"
        ],

        Mathematics: [
            "mathematics", "math", "maths", "algebra", "equation", "quadratic", "linear", "calculus", "derivative",
            "differentiation", "integration", "integral", "trigonometry", "sin", "cos", "tan", "statistics",
            "probability", "matrix", "matrices", "sequence", "function", "gradient", "pythagoras", "percentage",
            "fraction", "set", "sets", "venn diagram", "union", "intersection", "subset", "exponent", "exponents",
            "surd", "surds", "indices", "inequality", "inequalities", "vector", "vectors", "coordinate geometry",
            "equation of a circle", "midpoint", "distance formula", "mensuration", "area", "perimeter", "volume",
            "circumference", "number pattern", "logarithm", "logarithms", "log", "rounding", "significant figures"
        ]

    };


    /* =========================================================
       ECONOMICS ESSAYS (full essay memoranda, given only
       when the person explicitly asks for an "essay")
    ========================================================= */

    const economicsEssays = [
        {
            id: "circular-flow",
            title: "The Four-Sector Circular Flow Model and its Markets",
            keywords: ["circular flow", "four sector model", "four-sector model", "circular flow of income essay"],
            sections: [
                { heading: "Product / Goods Market", points: [
                    "Goods and services are traded on the product market, bought by households, government and the foreign sector from firms.",
                    "Goods are tangible (consumer goods, capital goods, durable, semi-durable and non-durable); services are intangible actions such as those offered by accountants, teachers and doctors.",
                    "The forces of demand and supply determine the equilibrium price and quantity.",
                    "Non-durable goods cannot be re-used (e.g. an apple); semi-durable goods last a short time but can be used more than once (e.g. chalk); durable goods last more than a year (e.g. a chalkboard)."
                ]},
                { heading: "Factor / Resources Market", points: [
                    "The four factors of production (land, labour, capital and entrepreneurship) are traded here for wages/salaries, interest, rent and profit.",
                    "Price and quantity traded are again determined by demand and supply."
                ]},
                { heading: "Money Market", points: [
                    "Used for short-term borrowing and lending, from a few days up to just under 3 years.",
                    "Instruments traded include treasury bills, Reserve Bank debentures, banker's acceptances and short-term government/company debentures."
                ]},
                { heading: "Financial Market", points: [
                    "Consists of banks, pension funds, insurance companies and the JSE, and channels funds from surplus units (savers) to deficit units (borrowers).",
                    "The SARB is a key institution operating in this market."
                ]},
                { heading: "Capital Market", points: [
                    "Handles long-term deposits and borrowings of 3 years and above, such as mortgage bonds.",
                    "The Johannesburg Securities (Stock) Exchange (JSE) is the key institution here."
                ]},
                { heading: "Foreign Exchange Market", points: [
                    "Facilitates the exchange of one currency for another so international transactions can take place in an open economy.",
                    "The exchange rate, usually set by demand and supply (and sometimes influenced by the central bank), determines how much is received on exchange.",
                    "Foreign currency can be obtained through commercial banks such as FNB, ABSA, Nedbank and Standard Bank."
                ]}
            ]
        },
        {
            id: "business-cycles-policy",
            title: "The New Economic Paradigm and Smoothing of Business Cycles",
            keywords: ["business cycle policy essay", "new economic paradigm", "smoothing of cycles", "demand side supply side policy essay"],
            sections: [
                { heading: "The New Economic Paradigm", points: [
                    "Government focuses less on fine-tuning and more on eliminating uncertainty in fiscal and monetary policy.",
                    "Output can be increased by combining demand-side and supply-side policies."
                ]},
                { heading: "Demand-Side Policies", points: [
                    "Aim to increase aggregate demand, mainly during a recession or below-trend growth when there is spare capacity (a negative output gap).",
                    "If the economy is already near full capacity, a further rise in AD mainly causes inflation rather than growth.",
                    "Monetary policy (SARB): can lower interest rates and increase the money supply to boost consumer spending.",
                    "Fiscal policy (Minister of Finance): can increase government spending (triggering the multiplier effect) and cut taxes (raising disposable income).",
                    "If aggregate demand grows faster than aggregate supply, the result is demand-pull inflation."
                ]},
                { heading: "Supply-Side Policies", points: [
                    "Increase market efficiency and competition: deregulation, enforcing the Competition Act, and privatisation.",
                    "Decrease production costs: subsidies and reduced administrative red tape.",
                    "Improve efficiency of inputs: lower tax rates, encourage modern technology, improve human resources through skills development, and provide free advisory services."
                ]}
            ]
        },
        {
            id: "business-cycle-forecasting",
            title: "Features Underpinning Business Cycle Forecasting",
            keywords: ["forecasting essay", "leading lagging coincident indicators", "business cycle indicators essay", "length amplitude trend line essay"],
            sections: [
                { heading: "Leading, Lagging, Coincident and Composite Indicators", points: [
                    "Leading indicators change before the economy as a whole and are useful short-term predictors (e.g. share prices, building permits, money supply).",
                    "Lagging indicators change after the economy has already turned, typically a few quarters later (e.g. the unemployment rate, average prime lending rate).",
                    "Coincident indicators move at roughly the same time as the economy and help identify current peaks/troughs (e.g. industrial production, real retail sales).",
                    "A composite indicator combines several indicators of the same type into one index to benchmark overall economic performance."
                ]},
                { heading: "Length and Amplitude", points: [
                    "Length is the time for one complete cycle, measured peak-to-peak or trough-to-trough; it can be measured via crisis-to-crisis comparisons, historical records or business consensus.",
                    "Amplitude is the intensity (height) of the upswing and downswing and reflects the strength of underlying forces; a larger amplitude means more extreme changes."
                ]},
                { heading: "Trend Line, Extrapolation and Moving Averages", points: [
                    "The trend line shows the general long-term direction of the economy and usually slopes upward as productive capacity grows over time.",
                    "Extrapolation uses past data/trends to predict the future, assuming the trend continues.",
                    "Moving averages repeatedly calculate average values along a time series (arithmetic, median, mode or geometric) to smooth out short-term fluctuations."
                ]}
            ]
        },
        {
            id: "public-sector-problems",
            title: "Problems in the Provision of Public Sector Goods and Services",
            keywords: ["public sector problems essay", "poor public sector provisioning", "accountability efficiency pricing policy essay"],
            sections: [
                { heading: "Accountability", points: [
                    "Public servants may act in self-interest rather than the public interest, so mechanisms exist to keep them accountable.",
                    "Key elements include participation, transparency, ministerial responsibility, parliamentary questioning, National Treasury control and Auditor-General reporting."
                ]},
                { heading: "Privatisation and Parastatals", points: [
                    "Privatisation is selling more than 50% of state-owned shares to the private sector to shrink the public sector, but private owners may ignore public interest, undersupplying merit goods and possibly abandoning unprofitable rural services.",
                    "Parastatals (SOEs) undertake commercial activities on the government's behalf but often focus on profit/cost at the expense of some groups' needs (e.g. Eskom, Transnet, SAA)."
                ]},
                { heading: "Efficiency", points: [
                    "Efficient provisioning requires Pareto efficiency; inefficiency arises from bureaucracy (red tape), incompetence and corruption."
                ]},
                { heading: "Assessing Needs and Pricing Policy", points: [
                    "Since SOEs don't operate purely on demand and supply, assessing needs is difficult; census/survey data and local government structures help.",
                    "Government pricing does not simply maximise profit; it balances free-of-charge services, community goods, collective goods, user charges, subsidies and price discrimination."
                ]}
            ]
        },
        {
            id: "public-sector-objectives",
            title: "The Main Macro-Economic Objectives of the Public Sector",
            keywords: ["public sector objectives essay", "befepe", "macroeconomic objectives essay"],
            sections: [
                { heading: "Balance of Payments Equilibrium", points: [
                    "Government aims for a satisfactory balance of payments position, particularly in the current account, though a deficit is not always alarming if it reflects rising competitiveness."
                ]},
                { heading: "Economic Growth", points: [
                    "South Africa targets roughly 4–5% growth, aiming for growth that raises living standards sustainably without depleting non-renewable resources or damaging the environment."
                ]},
                { heading: "Full Employment", points: [
                    "The goal is for everyone willing and able to work at the going wage rate to find employment, raising productive potential and reducing state benefit costs."
                ]},
                { heading: "Exchange Rate Stability", points: [
                    "Stable exchange rates attract foreign capital; the central bank may adjust the money supply to help maintain this."
                ]},
                { heading: "Price Stability", points: [
                    "SARB targets inflation between 3% and 6% - low and stable rather than zero - which helps firms avoid constantly raising wages and prices."
                ]},
                { heading: "Economic Equity", points: [
                    "Government redistributes income through tax and benefits to ensure access to basic necessities, while trying not to discourage work incentives."
                ]}
            ]
        },
        {
            id: "protectionism-trade",
            title: "Export Promotion and Import Substitution",
            keywords: ["international trade essay", "protectionism essay", "export promotion essay", "import substitution essay", "free trade essay"],
            sections: [
                { heading: "Export Promotion: Definition and Methods", points: [
                    "Export promotion covers policies and interventions to improve a country's trade performance, mainly by increasing exports relative to imports.",
                    "Methods include incentives (market information, transport concessions, export credit), subsidies (direct cash payments or indirect tariff refunds/tax rebates), and trade neutrality (offsetting protection costs, including through Export Processing Zones)."
                ]},
                { heading: "Export Promotion: Advantages and Disadvantages", points: [
                    "Advantages: large markets with no scale limits, production based on cost/efficiency, more realistic exchange rates, added value to natural resources, employment creation, and improved balance of payments.",
                    "Disadvantages: subsidies can artificially lower real production costs, reduce competition, invite retaliatory tariffs/quotas from trading partners, and cause job losses if incentives are withdrawn."
                ]},
                { heading: "Import Substitution: Definition and Reasons", points: [
                    "Import substitution replaces some imports with local production for local consumption rather than for export, aiming to generate employment, save foreign exchange and build self-reliance.",
                    "Reasons include diversifying away from dependence on natural-resource exports, creating jobs, establishing domestic industries, correcting balance of payments problems and building national independence."
                ]},
                { heading: "Import Substitution: Methods, Advantages and Disadvantages", points: [
                    "Methods: tariffs (ad valorem, specific or composite), quotas, subsidies, exchange control, physical bans/embargoes, and voluntary or forced substitution (e.g. due to sanctions).",
                    "Advantages: increased employment and GDP, a broader industrial base, improved balance of payments and easy implementation via tariffs/quotas.",
                    "Disadvantages: draws resources away from areas of comparative advantage, relies on borrowed technology, can overvalue the exchange rate (discouraging exports), and often means higher domestic prices for consumers."
                ]}
            ]
        },
        {
            id: "perfect-market-structures",
            title: "Comparing the Four Market Structures",
            keywords: ["market structures essay", "perfect competition essay", "monopoly essay comparison", "oligopoly essay comparison", "monopolistic competition essay"],
            sections: [
                { heading: "Number of Firms, Product and Entry", points: [
                    "Perfect competition: so many firms that none can influence price; homogeneous product; completely free entry.",
                    "Monopolistic competition: many firms, each acting as if others won't notice; differentiated product; free entry.",
                    "Oligopoly: few firms that must consider rivals' reactions; homogeneous or differentiated product; entry varies from free to restricted.",
                    "Monopoly: one seller; unique product; entry completely blocked."
                ]},
                { heading: "Price Control, Information and Collusion", points: [
                    "Perfect competition: firms are price takers with complete information; collusion is impossible.",
                    "Monopolistic competition: firms have little price control (mostly price makers) with incomplete information; collusion is impossible.",
                    "Oligopoly: considerable price-making power (less than monopoly), incomplete information, and collusion is possible (though illegal under the Competition Act).",
                    "Monopoly: considerable price-making power limited by market demand, complete information, and collusion is impossible (only one firm)."
                ]},
                { heading: "Profit, Output and Examples", points: [
                    "Perfect competition and monopolistic competition earn only normal profit in the long run; oligopoly and monopoly can earn economic profit in the long run.",
                    "Output is highest and most varied under perfect and monopolistic competition, and lowest under oligopoly and monopoly.",
                    "Examples: perfect competition - maize/tomato farmers, gold on the JSE; monopolistic competition - fast food, clothing; oligopoly - banking, cellphone networks, cement; monopoly - Eskom, Transnet."
                ]}
            ]
        },
        {
            id: "perfect-market-equilibrium",
            title: "Equilibrium Positions in Perfect Markets",
            keywords: ["normal profit essay", "economic profit essay", "shutdown point essay", "long run equilibrium perfect competition essay"],
            sections: [
                { heading: "Normal Profit", points: [
                    "Occurs where economic profit is zero, i.e. AC = AR (TR = TC), at the break-even point.",
                    "It's the minimum profit needed to keep entrepreneurs in the industry, accounting for opportunity cost - it doesn't mean zero accounting profit."
                ]},
                { heading: "Economic Profit and Long-Run Adjustment", points: [
                    "Economic profit occurs when AC is less than price (AR), so TR exceeds TC after deducting opportunity costs.",
                    "Economic profit attracts new entrants; supply shifts right, price falls until only normal profit remains, restoring long-run equilibrium at the minimum point of the LAC curve.",
                    "Losses work in reverse: firms exit until price rises back to the level of normal profit."
                ]},
                { heading: "The Shutdown Rule", points: [
                    "In the short run a firm should keep operating if price exceeds average variable cost (P > AVC), because fixed costs must be paid regardless.",
                    "If total revenue exceeds total variable cost, the surplus ('contribution') helps cover fixed costs; if TVC exceeds TR, the firm should shut down immediately.",
                    "The shutdown point is where price just covers AVC; below this point, the firm closes rather than trade at a bigger loss."
                ]}
            ]
        },
        {
            id: "monopoly-essay",
            title: "The Monopoly Market Structure",
            keywords: ["monopoly essay", "discuss monopoly in detail"],
            sections: [
                { heading: "Characteristics", points: [
                    "One seller of a good/service with no close substitute and completely blocked entry; size is not what defines a monopoly.",
                    "Barriers to entry include patents, licences, sole rights, import restrictions and exclusive ownership of raw materials, though globalisation increasingly limits local monopoly power.",
                    "Collusion is impossible (only one firm); information is complete for both buyers and sellers."
                ]},
                { heading: "Price, Output and Profit", points: [
                    "The monopolist is a price maker, limited by market demand and profit-maximisation goals, and faces the downward-sloping market demand curve.",
                    "Because entry is blocked, economic profit can persist in the long run for as long as demand for the product holds.",
                    "Output is low with no consumer choice, and there is no non-price competition."
                ]},
                { heading: "Sources of Monopoly Power and Regulation", points: [
                    "Sources include economies of scale, capital requirements, technological superiority, lack of substitutes, control of natural resources and legal barriers.",
                    "Because monopolists can exploit consumers, government intervenes through legislation such as the Competition Act 89 of 1998."
                ]}
            ]
        },
        {
            id: "oligopoly-essay",
            title: "The Oligopoly Market Structure",
            keywords: ["oligopoly essay", "examine oligopoly in detail"],
            sections: [
                { heading: "Characteristics", points: [
                    "A small number of large firms ('oligopolists') supply most or all of the market; each is aware of, and influenced by, rivals' decisions.",
                    "Products may be homogeneous (pure oligopoly, e.g. petrol) or differentiated (e.g. banking services); entry faces significant barriers such as high capital requirements.",
                    "Collusion is possible and common, though illegal under South Africa's Competition Act - colluding firms effectively behave like a cartel/monopoly."
                ]},
                { heading: "Price, Output and Competition", points: [
                    "Oligopolists are price makers with less control than a monopolist; the demand curve is typically kinked and price changes occur more frequently.",
                    "Output is low with limited choice; economic profit is possible in the long run.",
                    "Non-price competition is common: advertising, after-sales service, brand loyalty, extended hours and product differentiation.",
                    "Examples: banking, cellphone networks, cigarettes and vehicle manufacturing."
                ]}
            ]
        },
        {
            id: "market-failure-causes",
            title: "Causes of Market Failure (Misallocation of Resources)",
            keywords: ["market failure essay", "mielii", "causes of market failure essay"],
            sections: [
                { heading: "Missing Markets and Public Goods", points: [
                    "Some goods are needed/wanted but markets fail to form for them - most extremely, pure public goods like national defence, policing and street lighting.",
                    "Public goods are non-excludable (no one can be denied access) and non-rivalrous (one person's use doesn't reduce availability to others), so entrepreneurs can't charge users and won't supply them."
                ]},
                { heading: "Imperfect Competition and Lack of Information", points: [
                    "Imperfect markets (monopoly, oligopoly) restrict output and raise prices above marginal cost, causing both allocative and technical inefficiency.",
                    "When producers or consumers lack complete, accurate information, they make wrong production/consumption decisions and resources are wasted."
                ]},
                { heading: "Externalities", points: [
                    "Externalities occur when production or consumption affects third parties not part of the transaction, and can be positive or negative.",
                    "Social cost = private cost + external cost; social benefit = private benefit + external benefit.",
                    "Example: a factory's negative production externality is pollution; a positive consumption externality is the wider benefit society gains from an individual's education."
                ]},
                { heading: "Immobility of Factors and Unequal Income Distribution", points: [
                    "Labour immobility (geographic or institutional, e.g. pension ties, family circumstances) and specific/heavy capital slow the market's ability to adjust to changes in demand and supply.",
                    "Unequal income and wealth distribution arises from discrimination, differences in market power, and unequal access to markets and education."
                ]}
            ]
        },
        {
            id: "market-failure-intervention",
            title: "State Intervention as a Consequence of Market Failure",
            keywords: ["state intervention essay", "market failure intervention essay", "minimum wage maximum price essay"],
            sections: [
                { heading: "Direct Control of Externalities", points: [
                    "For negative externalities (e.g. pollution), government can tax the good so consumers pay the full social cost, reducing consumption to a more efficient level (e.g. sin tax on cigarettes).",
                    "For positive externalities (e.g. education), government can subsidise consumption to close the gap between private and social benefit."
                ]},
                { heading: "Imperfect Markets, Minimum Wages and Price Controls", points: [
                    "Government can strengthen competition policy, impose price controls, or license new entrants to challenge a state monopoly.",
                    "A minimum wage set above the market wage increases the quantity of labour supplied but reduces quantity demanded, potentially causing unemployment.",
                    "A minimum price (price floor) set above market price usually creates a surplus; a maximum price (price ceiling) set below market price usually creates a shortage."
                ]},
                { heading: "Taxes, Subsidies and Redistribution", points: [
                    "Progressive taxation charges higher earners more, and taxes can recover external costs by raising prices to reduce harmful production/consumption.",
                    "Subsidies lower production costs and prices, encouraging supply of merit goods.",
                    "Government redistributes wealth via taxing/spending powers and redress mechanisms (e.g. BEE, affirmative action, land restitution) and may directly produce merit/public goods itself."
                ]}
            ]
        },
        {
            id: "growth-demand-side",
            title: "The Demand-Side Approach to Growth and Development",
            keywords: ["demand side approach essay", "growth demand side essay", "monetary fiscal policy growth essay"],
            sections: [
                { heading: "Overview", points: [
                    "Focuses on the aggregate demand created by households, businesses, government and the foreign sector as a driving force for growth.",
                    "There must be adequate and growing demand for domestically produced goods and services: ΔGDP = ΔC + ΔI + ΔG + Δ(X - M)."
                ]},
                { heading: "Monetary Policy", points: [
                    "The SARB influences interest rates and money supply via open market transactions, cash reserve requirements (currently 5% in SA) and moral persuasion with commercial banks."
                ]},
                { heading: "Fiscal Policy", points: [
                    "Government varies taxes and spending to stimulate or restrain demand, funding training, infrastructure, export promotion and new businesses to support growth.",
                    "Development-oriented fiscal tools include progressive taxation, welfare grants, tax reductions, land/home ownership support and benefits in kind."
                ]}
            ]
        },
        {
            id: "growth-supply-side",
            title: "The Supply-Side Approach to Growth and Development",
            keywords: ["supply side approach essay", "growth supply side essay", "south africa supply side policy essay"],
            sections: [
                { heading: "Overview", points: [
                    "Focuses on expanding the economy's production capacity by increasing the quantity or quality of natural resources, labour, capital, entrepreneurship and technology."
                ]},
                { heading: "South Africa's Supply-Side Measures", points: [
                    "Education and training: SETAs promote work-related training for different sectors as skilled-labour demand grows.",
                    "SMME support: funding through Khula, the National Empowerment Fund, IDC and Business Partners, plus free advisory centres.",
                    "Fiscal policy: reduced tax rates and targeted incentives to encourage investment.",
                    "Competition and deregulation: the Competition Act (1998), Competition Commission/Tribunal, and removal of unnecessary trade barriers boost competition.",
                    "Labour legislation, R&D support, privatisation and infrastructure development (transport, energy, telecommunications) round out the supply-side toolkit."
                ]}
            ]
        },
        {
            id: "industrial-development-sa",
            title: "South Africa's Regional Development Initiatives",
            keywords: ["regional development essay", "industrial development policy essay", "sdi idz sez essay"],
            sections: [
                { heading: "Background", points: [
                    "About 80% of SA's GDP comes from four industrialised areas: Johannesburg-Pretoria-Tshwane, Durban-Pinetown, Cape Town and Port Elizabeth-Coega-Uitenhage, mainly due to unequal spending and resource distribution.",
                    "Regional policy aims to spread industries more evenly so capital and labour move toward under-developed areas."
                ]},
                { heading: "Spatial Development Initiatives, IDZs and SEZs", points: [
                    "SDIs link economic hubs to poorer regions to stimulate growth and employment (e.g. the Platinum SDI for mining/agri-tourism, the Maputo Development Corridor for industry/agri-processing).",
                    "Industrial Development Zones (IDZs) are export-focused industrial estates linked to ports/airports, such as Coega and Richards Bay.",
                    "Special Economic Zones (SEZs) are demarcated areas offering tax relief and infrastructure to enable industrial clustering."
                ]},
                { heading: "Incentive Programmes", points: [
                    "Financial incentives include duty-free import concessions, the Small Business Support Programme, the Skills Development Programme, the Critical Infrastructure Programme and foreign investment grants."
                ]}
            ]
        },
        {
            id: "industrial-development-benchmarks",
            title: "International Best-Practice Benchmarks for Regional Development",
            keywords: ["regional development benchmark essay", "good governance sustainability essay", "regional development criteria essay"],
            sections: [
                { heading: "Governance and Partnerships", points: [
                    "Good governance requires democratic decision-making, transparency and effective, corruption-free financial management.",
                    "Integration ensures benefits spill over between regions and industries; partnerships should link central government, local authorities, civil society and the private sector."
                ]},
                { heading: "Resources, Competitiveness and Sustainability", points: [
                    "Sufficient resources (infrastructure, human resources) must be provided in resource-poor areas.",
                    "Businesses created through regional policy should be competitive and not need ongoing government support.",
                    "Sustainability means the region's own resources support development without compromising future employment."
                ]},
                { heading: "People-Centred and Free-Market Principles", points: [
                    "Development should be by, for and from the people, starting at grassroots level and treated as a multi-dimensional process (education, health, nutrition).",
                    "A free-market orientation keeps government intervention minimal so supply, demand and profit motives can allocate resources efficiently, alongside investment in social capital such as education and healthcare."
                ]}
            ]
        },
        {
            id: "economic-indicators-essay",
            title: "Key Economic Indicators",
            keywords: ["economic indicators essay", "production price employment productivity indicators essay"],
            sections: [
                { heading: "Production and Price Indicators", points: [
                    "Real GDP removes the effect of inflation to measure genuine growth; nominal GDP uses current prices; GDP per capita (Real GDP ÷ population) reflects living standards and is used to compare countries or groups.",
                    "The CPI tracks a representative basket of consumer goods/services and is South Africa's official inflation-targeting index; the PPI tracks production (not consumption) costs, excludes VAT and shows import prices explicitly."
                ]},
                { heading: "Monetary and Foreign Trade Indicators", points: [
                    "The SARB tracks money supply in three aggregates: M1 (notes, coins and demand deposits), M2 (M1 plus short/medium-term deposits) and M3 (M2 plus long-term deposits).",
                    "The repo rate is what SARB charges commercial banks and anchors other interest rates; the prime rate (charged to customers) is always higher.",
                    "The terms of trade is the ratio of export prices to import prices; the exchange rate is the price of one currency in terms of another, monitored closely by importers/exporters."
                ]},
                { heading: "Employment and Productivity Indicators", points: [
                    "The Economically Active Population (EAP) is people aged roughly 15-65 who are willing and able to work; the unemployment rate expresses those seeking work but without a job as a percentage of the EAP.",
                    "The employment rate is the percentage of the EAP that is working, useful for spotting sector trends and measuring productivity.",
                    "Labour productivity measures real GDP produced per hour of labour, driven by investment/saving in capital, new technology and human capital."
                ]}
            ]
        },
        {
            id: "social-indicators-essay",
            title: "Key Social Indicators",
            keywords: ["social indicators essay", "demographic nutrition health education housing indicators essay"],
            sections: [
                { heading: "Demographic and Income Indicators", points: [
                    "Population growth (measured via census) matters for service delivery and the tax base; high population growth with low economic growth strains living standards and government finances.",
                    "Life expectancy is the expected years a newborn will live; South Africa's has historically lagged well behind developed countries like the USA.",
                    "The Gini coefficient (0 to 1) measures income inequality; progressive taxation and BEE are used to try to lower it."
                ]},
                { heading: "Education, Housing and Services", points: [
                    "A higher literacy rate reflects more effective education and training, ultimately raising productivity and living standards; education spending is a top priority in the SA budget.",
                    "Housing delivery is hindered by unemployment and unequal income distribution, so government uses subsidies and loans to promote ownership.",
                    "Access to services such as electricity, refuse removal, water supply and sanitation are used in surveys (e.g. the General Household Survey) to track development."
                ]},
                { heading: "Nutrition and Health Indicators", points: [
                    "Infant mortality and under-five mortality (deaths per 1 000 live births) indicate a population's basic health and wellbeing.",
                    "Health expenditure as a percentage of GDP, and access to safe drinking water and sanitation, are used to compare South Africa's health infrastructure internationally.",
                    "Child malnutrition (underweight/stunting) and childhood obesity are both monitored, since either can seriously affect a child's development."
                ]}
            ]
        },
        {
            id: "demand-pull-inflation",
            title: "Causes of Demand-Pull Inflation",
            keywords: ["demand pull inflation essay", "causes of demand inflation essay"],
            sections: [
                { heading: "Consumption, Credit and Investment", points: [
                    "An increase in the money supply without a matching increase in output leaves more money chasing the same goods, pushing prices up.",
                    "Rising household consumption - through declining savings, tax reductions, or easier access to credit as interest rates fall - increases demand faster than supply.",
                    "Lower interest rates improve business profit expectations, encouraging more investment spending on goods such as cement and bricks, adding further demand."
                ]},
                { heading: "Government Spending and Exports", points: [
                    "Government spending that rises without a matching increase in aggregate supply, especially if funded by borrowing (which increases money in circulation), adds to demand-pull pressure.",
                    "Rising export earnings channel more money into the domestic economy; if exports rise without a matching rise in domestic production, fewer goods remain available locally, pushing prices up."
                ]}
            ]
        },
        {
            id: "cost-push-inflation",
            title: "Causes of Cost-Push Inflation",
            keywords: ["cost push inflation essay", "causes of cost inflation essay"],
            sections: [
                { heading: "Wages, Inputs and the Exchange Rate", points: [
                    "Rising wages increase the cost of production, which businesses pass on as higher prices.",
                    "Higher prices for key imported inputs (like oil or machinery) raise domestic production costs directly.",
                    "A depreciating exchange rate makes imported goods and inputs more expensive in rand terms."
                ]},
                { heading: "Profit Margins, Productivity and Shocks", points: [
                    "Businesses increasing profit margins to recover higher costs push prices up further.",
                    "A decrease in productivity means each unit costs more to produce if remuneration stays the same.",
                    "Natural disasters (droughts, floods) and supply shocks (like sudden oil price spikes) raise costs and disrupt supply, feeding a wage-price spiral of rising costs, prices and living expenses."
                ]}
            ]
        },
        {
            id: "tourism-effects",
            title: "The Effects of Tourism",
            keywords: ["tourism effects essay", "effects of tourism essay"],
            sections: [
                { heading: "Positive Effects: GDP, Employment and Poverty", points: [
                    "Tourism contributes strongly to the services sector, directly and indirectly, and is one of the world's largest generators of jobs across all skill levels.",
                    "Because prime tourist attractions are often in rural areas, tourism can be a fast, effective way to spread income sources, empower communities and reduce poverty."
                ]},
                { heading: "Infrastructure and Externalities", points: [
                    "Tourism requires adequate transport, communication, energy and basic-services infrastructure; a lack of this prevents growth, and seasonality complicates planning.",
                    "Tourism has both positive externalities (revenue, poverty alleviation, conservation) and negative ones (environmental damage, resource strain) if growth isn't managed sustainably."
                ]},
                { heading: "Negative Effects: Environment and Society", points: [
                    "Rapid, short-term-focused tourism growth can degrade traditions/culture and damage natural sites through pollution and waste.",
                    "Environmental stress includes permanent restructuring (e.g. roads, airports), waste generation, direct habitat destruction and shifts in population dynamics.",
                    "Other risks include disrespect for local heritage, spread of disease, and concentrating development funds at tourist hubs at the expense of other areas."
                ]}
            ]
        },
        {
            id: "tourism-benefits",
            title: "The Benefits of Tourism",
            keywords: ["tourism benefits essay", "benefits of tourism essay"],
            sections: [
                { heading: "Households and Government", points: [
                    "Households benefit through income (wages from tourism-related work), improved infrastructure, and the variety of skills tourism jobs demand and develop.",
                    "Government benefits mainly through taxation (VAT, excise duties, airport and hotel taxes), which recovers external costs and treats tourists as part of the tax base."
                ]},
                { heading: "Businesses and Infrastructure", points: [
                    "Private businesses (accommodation, transport, retail, recreation) form the profit-generating 'superstructure' of tourism, supported by public-sector infrastructure and financial incentives.",
                    "Tourism also stimulates entrepreneurship, BEE and SMME development, including informal opportunities such as car rentals and craft sales.",
                    "Both economic infrastructure (beach/lake/river access) and social infrastructure (ambulance services, information services) are prioritised to support tourist destinations."
                ]}
            ]
        },
        {
            id: "environmental-government-measures",
            title: "Government Measures to Ensure Environmental Sustainability",
            keywords: ["environmental sustainability essay", "government environmental measures essay", "environmental tax subsidy essay"],
            sections: [
                { heading: "Property Rights, Charges and Taxes", points: [
                    "Granting property rights encourages people to look after what belongs to them (e.g. the Kyoto Protocol's principle of developed countries paying for pollution rights).",
                    "Government can charge for environmental use (emission charges rising with pollution levels) or impose environmental (green) taxes on outputs that cause external costs."
                ]},
                { heading: "Subsidies and Marketable Permits", points: [
                    "Environmental subsidies, funded from taxation, reduce environmentally damaging activities and encourage recycling or cleaner technology.",
                    "Marketable permits let government cap pollution and allow businesses to trade permits/credits amongst themselves in a permit market."
                ]},
                { heading: "Direct Control, Agreements and Education", points: [
                    "Command and Control (CAC) sets legal maximum pollution levels that must be observed.",
                    "Voluntary agreements are negotiated between government and businesses to cut pollution without formal regulation.",
                    "Education changes attitudes toward the environment, for example through community wildlife reserve initiatives."
                ]}
            ]
        },
        {
            id: "environmental-international-measures",
            title: "International Measures for Sustainable Development",
            keywords: ["international environmental measures essay", "sustainable development international essay", "kyoto protocol essay"],
            sections: [
                { heading: "Biodiversity, Chemical and Hazardous Waste", points: [
                    "Species extinction is irreversible; CITES sets policies to curb biodiversity loss.",
                    "The Stockholm Protocol limits toxic chemical waste; the Basel Convention (which South Africa has signed) manages highly hazardous waste, including radioactive waste."
                ]},
                { heading: "Climate Change and Indigenous Knowledge", points: [
                    "Climate change, driven mainly by global warming, is addressed through international cooperation such as sharing weather data and limiting greenhouse gases.",
                    "The Kyoto Protocol (1997) set binding obligations for industrialised countries to cut six greenhouse gases after voluntary reductions failed.",
                    "As indigenous communities lose their habitats or urbanise, valuable traditional environmental knowledge is being lost, making local capacity-building important."
                ]},
                { heading: "Major International Summits", points: [
                    "Rio de Janeiro (UNCED, 1992): established sustainable development as a global objective, including the 'polluter pays' principle.",
                    "Johannesburg Summit (WSSD, 2002): focused on poverty eradication and unsustainable consumption patterns.",
                    "Rio+20 (2012): promoted the 'green economy' as a tool for sustainable growth and poverty eradication.",
                    "COP 17 (Durban): reaffirmed the Kyoto Protocol and established a Green Climate Fund plus an Adaptation Committee to help vulnerable countries."
                ]}
            ]
        }
    ];


    /* =========================================================
       FINANCIAL STATEMENT TEMPLATES (full worked examples,
       given only when the person explicitly asks to prepare
       or see a financial statement)
    ========================================================= */

    const financialStatementTemplates = {

        pnl: `
            <h2>Statement of Profit or Loss (Income Statement)</h2>
            <p><em>Comfy Furniture Traders - for the year ended 28 February 2026 (illustrative figures)</em></p>
            <table style="width:100%; border-collapse:collapse; font-size:0.95em;">
                <tr><td>Sales</td><td style="text-align:right;">850 000</td></tr>
                <tr><td>Cost of sales</td><td style="text-align:right;">(510 000)</td></tr>
                <tr><td><strong>Gross profit</strong></td><td style="text-align:right;"><strong>340 000</strong></td></tr>
                <tr><td>Other income (rent income)</td><td style="text-align:right;">18 000</td></tr>
                <tr><td><strong>Subtotal</strong></td><td style="text-align:right;"><strong>358 000</strong></td></tr>
                <tr><td colspan="2"><em>Operating expenses</em></td></tr>
                <tr><td>&nbsp;&nbsp;Salaries and wages</td><td style="text-align:right;">(120 000)</td></tr>
                <tr><td>&nbsp;&nbsp;Rent expense</td><td style="text-align:right;">(24 000)</td></tr>
                <tr><td>&nbsp;&nbsp;Water and electricity</td><td style="text-align:right;">(15 000)</td></tr>
                <tr><td>&nbsp;&nbsp;Depreciation</td><td style="text-align:right;">(20 000)</td></tr>
                <tr><td>&nbsp;&nbsp;Sundry expenses</td><td style="text-align:right;">(9 000)</td></tr>
                <tr><td><strong>Operating profit</strong></td><td style="text-align:right;"><strong>170 000</strong></td></tr>
                <tr><td>Interest expense</td><td style="text-align:right;">(10 000)</td></tr>
                <tr><td><strong>Profit before tax</strong></td><td style="text-align:right;"><strong>160 000</strong></td></tr>
                <tr><td>Income tax expense (28%)</td><td style="text-align:right;">(44 800)</td></tr>
                <tr><td><strong>Profit for the year</strong></td><td style="text-align:right;"><strong>115 200</strong></td></tr>
            </table>
            <p><em>Figures are illustrative. Swap in your own trial balance amounts to prepare a real statement - happy to help with that too.</em></p>
        `,

        sofp: `
            <h2>Statement of Financial Position (Balance Sheet)</h2>
            <p><em>Comfy Furniture Traders - as at 28 February 2026 (illustrative figures)</em></p>
            <table style="width:100%; border-collapse:collapse; font-size:0.95em;">
                <tr><td colspan="2"><strong>ASSETS</strong></td></tr>
                <tr><td>Non-current assets</td><td></td></tr>
                <tr><td>&nbsp;&nbsp;Property, plant and equipment</td><td style="text-align:right;">480 000</td></tr>
                <tr><td>Current assets</td><td></td></tr>
                <tr><td>&nbsp;&nbsp;Inventory</td><td style="text-align:right;">95 000</td></tr>
                <tr><td>&nbsp;&nbsp;Trade receivables</td><td style="text-align:right;">60 000</td></tr>
                <tr><td>&nbsp;&nbsp;Cash and cash equivalents</td><td style="text-align:right;">35 000</td></tr>
                <tr><td><strong>Total assets</strong></td><td style="text-align:right;"><strong>670 000</strong></td></tr>
                <tr><td colspan="2">&nbsp;</td></tr>
                <tr><td colspan="2"><strong>EQUITY AND LIABILITIES</strong></td></tr>
                <tr><td>Capital (opening)</td><td style="text-align:right;">300 000</td></tr>
                <tr><td>Add: Net profit for the year</td><td style="text-align:right;">115 200</td></tr>
                <tr><td>Less: Drawings</td><td style="text-align:right;">(40 000)</td></tr>
                <tr><td><strong>Capital (closing)</strong></td><td style="text-align:right;"><strong>375 200</strong></td></tr>
                <tr><td>Non-current liabilities</td><td></td></tr>
                <tr><td>&nbsp;&nbsp;Long-term loan</td><td style="text-align:right;">150 000</td></tr>
                <tr><td>Current liabilities</td><td></td></tr>
                <tr><td>&nbsp;&nbsp;Trade payables</td><td style="text-align:right;">100 000</td></tr>
                <tr><td>&nbsp;&nbsp;Bank overdraft</td><td style="text-align:right;">44 800</td></tr>
                <tr><td><strong>Total equity and liabilities</strong></td><td style="text-align:right;"><strong>670 000</strong></td></tr>
            </table>
            <p><em>Figures are illustrative and are set up to balance (Total assets = Total equity and liabilities).</em></p>
        `,

        cashflow: `
            <h2>Statement of Cash Flows</h2>
            <p><em>Comfy Furniture Traders - for the year ended 28 February 2026 (indirect method, illustrative figures)</em></p>
            <table style="width:100%; border-collapse:collapse; font-size:0.95em;">
                <tr><td colspan="2"><strong>Cash flows from operating activities</strong></td></tr>
                <tr><td>Profit before tax</td><td style="text-align:right;">160 000</td></tr>
                <tr><td>Adjustments: Depreciation</td><td style="text-align:right;">20 000</td></tr>
                <tr><td>Adjustments: Interest expense</td><td style="text-align:right;">10 000</td></tr>
                <tr><td><strong>Operating profit before working capital changes</strong></td><td style="text-align:right;"><strong>190 000</strong></td></tr>
                <tr><td>Increase in inventory</td><td style="text-align:right;">(15 000)</td></tr>
                <tr><td>Increase in trade receivables</td><td style="text-align:right;">(10 000)</td></tr>
                <tr><td>Increase in trade payables</td><td style="text-align:right;">20 000</td></tr>
                <tr><td><strong>Cash generated from operations</strong></td><td style="text-align:right;"><strong>185 000</strong></td></tr>
                <tr><td>Interest paid</td><td style="text-align:right;">(10 000)</td></tr>
                <tr><td>Tax paid</td><td style="text-align:right;">(44 800)</td></tr>
                <tr><td><strong>Net cash from operating activities</strong></td><td style="text-align:right;"><strong>130 200</strong></td></tr>
                <tr><td colspan="2">&nbsp;</td></tr>
                <tr><td colspan="2"><strong>Cash flows from investing activities</strong></td></tr>
                <tr><td>Purchase of property, plant and equipment</td><td style="text-align:right;">(60 000)</td></tr>
                <tr><td><strong>Net cash used in investing activities</strong></td><td style="text-align:right;"><strong>(60 000)</strong></td></tr>
                <tr><td colspan="2">&nbsp;</td></tr>
                <tr><td colspan="2"><strong>Cash flows from financing activities</strong></td></tr>
                <tr><td>Proceeds from long-term loan</td><td style="text-align:right;">50 000</td></tr>
                <tr><td>Drawings</td><td style="text-align:right;">(40 000)</td></tr>
                <tr><td><strong>Net cash from financing activities</strong></td><td style="text-align:right;"><strong>10 000</strong></td></tr>
                <tr><td colspan="2">&nbsp;</td></tr>
                <tr><td><strong>Net increase in cash and cash equivalents</strong></td><td style="text-align:right;"><strong>80 200</strong></td></tr>
                <tr><td>Cash and cash equivalents at beginning of year</td><td style="text-align:right;">(45 200)</td></tr>
                <tr><td><strong>Cash and cash equivalents at end of year</strong></td><td style="text-align:right;"><strong>35 000</strong></td></tr>
            </table>
            <p><em>Figures are illustrative and use the indirect method starting from profit before tax.</em></p>
        `

    };


    /* =========================================================
       TEXT NORMALISATION
    ========================================================= */

    function normalizeText(text) {
        return String(text || "")
            .toLowerCase()
            .replace(/[’']/g, "")
            .replace(/[^a-z0-9%²^.\-\s]/gi, " ")
            .replace(/\s+/g, " ")
            .trim();
    }


    /* =========================================================
       TOKENISE
    ========================================================= */

    function getTokens(text) {
        return normalizeText(text)
            .split(/\s+/)
            .filter(Boolean);
    }


    /* =========================================================
       SUBJECT DETECTION
    ========================================================= */

    function detectSubject(question) {
        const text = normalizeText(question);
        let scores = {};
        Object.keys(subjectWords).forEach(k => { scores[k] = 0; });

        Object.keys(subjectWords).forEach(subject => {
            subjectWords[subject].forEach(keyword => {
                const key = normalizeText(keyword);
                if (!key) return;
                if (text.includes(key)) {
                    if (key.includes(" ")) { scores[subject] += 8; }
                    else { scores[subject] += 4; }
                }
            });
        });

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        if (sorted[0][1] === 0) return null;
        if (sorted[1] && sorted[0][1] === sorted[1][1]) return null;
        return sorted[0][0];
    }


    /* =========================================================
       TOPIC SCORING
    ========================================================= */

    function scoreKnowledgeItem(question, item) {
        const text = normalizeText(question);
        const tokens = new Set(getTokens(question));
        let score = 0;

        const topic = normalizeText(item.topic);
        if (text.includes(topic)) score += 60;

        item.keywords.forEach(keyword => {
            const key = normalizeText(keyword);
            if (!key) return;
            if (text.includes(key)) {
                score += key.includes(" ") ? 35 : 25;
            }
        });

        item.keywords.forEach(keyword => {
            const keyTokens = getTokens(keyword);
            let matches = 0;
            keyTokens.forEach(token => { if (tokens.has(token)) matches++; });
            if (matches > 0) score += matches * 7;
        });

        (item.relatedKeywords || []).forEach(keyword => {
            const key = normalizeText(keyword);
            if (key && text.includes(key)) score += 10;
        });

        const formulaWords = ["formula", "calculate", "calculation", "equation", "how much", "work out", "find", "compute"];
        formulaWords.forEach(word => {
            if (text.includes(word) && item.formulas.length > 0) score += 10;
        });

        const definitionWords = ["what is", "define", "definition", "explain", "meaning", "what does"];
        definitionWords.forEach(word => { if (text.includes(word)) score += 3; });

        return score;
    }


    /* =========================================================
       SEARCH KNOWLEDGE
    ========================================================= */

    function searchKnowledge(question, subject) {
        let knowledge = [];
        if (subject === "Accounting") knowledge = accountingKnowledge;
        if (subject === "Economics") knowledge = economicsKnowledge;
        if (subject === "Mathematics") knowledge = mathematicsKnowledge;
        if (subject === "Business Studies") knowledge = businessStudiesKnowledge;
        if (subject === "Financial Management") knowledge = financialManagementKnowledge;
        if (!knowledge.length) return [];

        const scored = knowledge.map(item => ({ item, score: scoreKnowledgeItem(question, item) }));
        scored.sort((a, b) => b.score - a.score);
        return scored.filter(result => result.score >= 18).slice(0, 3);
    }


    /* =========================================================
       TOPIC LIST REQUEST
    ========================================================= */

    function isTopicListRequest(question) {
        const text = normalizeText(question);
        const phrases = ["list topics", "show topics", "topics", "what topics", "available topics", "what can you teach", "what do you know"];
        return phrases.some(phrase => text === phrase || text.includes(phrase));
    }


    /* =========================================================
       ALL INFORMATION REQUEST
    ========================================================= */

    function isAllInformationRequest(question) {
        const text = normalizeText(question);
        const phrases = ["all information", "everything about", "tell me everything", "complete information", "full information", "full explanation", "in detail", "detailed explanation"];
        return phrases.some(phrase => text.includes(phrase));
    }


    /* =========================================================
       EXAMPLE REQUEST DETECTION
    ========================================================= */

    function isExampleRequest(question) {
        const text = normalizeText(question);
        const phrases = ["example", "examples", "give me an example", "give me examples", "show me examples", "show me an example", "worked example"];
        return phrases.some(phrase => text.includes(phrase));
    }


    /* =========================================================
       FORMAT: EXAMPLES ONLY (minimum 5 where stored)
    ========================================================= */

    function formatExamplesOnly(item) {
        const examples = item.examples || [];
        let html = `<h2>${escapeHtml(item.topic)} - Examples</h2>`;

        if (!examples.length) {
            html += `
                <p>
                    I don't have worked examples stored for
                    <strong>${escapeHtml(item.topic)}</strong> yet.
                    Try asking for the general explanation instead,
                    or ask me to add examples for this topic.
                </p>
            `;
            return html;
        }

        html += `<ol>`;
        examples.forEach(example => {
            html += `<li style="margin-bottom:8px;">${escapeHtml(example)}</li>`;
        });
        html += `</ol>`;

        if (examples.length < 5) {
            html += `
                <p>
                    <em>
                        Only ${examples.length} example${examples.length === 1 ? "" : "s"}
                        currently stored for this topic - ask me
                        and I can expand this list to at least five.
                    </em>
                </p>
            `;
        }

        return html;
    }


    /* =========================================================
       ESSAY REQUEST DETECTION (Economics essays)
    ========================================================= */

    function isEssayRequest(question) {
        const text = normalizeText(question);
        return text.includes("essay");
    }


    function scoreEssay(question, essay) {
        const text = normalizeText(question);
        let score = 0;

        essay.keywords.forEach(keyword => {
            const key = normalizeText(keyword);
            if (!key) return;
            if (text.includes(key)) score += key.includes(" ") ? 12 : 6;
        });

        const titleTokens = getTokens(essay.title);
        const questionTokens = new Set(getTokens(question));
        titleTokens.forEach(token => {
            if (token.length > 3 && questionTokens.has(token)) score += 3;
        });

        return score;
    }


    function listEssayTopics() {
        let html = `
            <h2>Available Economics Essays</h2>
            <p>Just ask, for example: "give me an essay on circular flow" or "essay on market failure".</p>
            <ul>
        `;
        economicsEssays.forEach(essay => { html += `<li>${escapeHtml(essay.title)}</li>`; });
        html += `</ul>`;
        return html;
    }


    function renderEssay(essay) {
        let html = `<h2>Essay: ${escapeHtml(essay.title)}</h2>`;
        essay.sections.forEach(section => {
            html += `<h3>${escapeHtml(section.heading)}</h3><ul>`;
            section.points.forEach(point => { html += `<li>${escapeHtml(point)}</li>`; });
            html += `</ul>`;
        });
        return html;
    }


    function generateEssayAnswer(question) {
        const text = normalizeText(question);
        const listPhrases = ["list essay", "essay topics", "what essays", "which essays", "available essays"];
        if (listPhrases.some(phrase => text.includes(phrase))) return listEssayTopics();

        const scored = economicsEssays.map(essay => ({ essay, score: scoreEssay(question, essay) }));
        scored.sort((a, b) => b.score - a.score);

        if (!scored.length || scored[0].score < 6) return listEssayTopics();
        return renderEssay(scored[0].essay);
    }


    /* =========================================================
       FINANCIAL STATEMENT REQUEST DETECTION
    ========================================================= */

    function isFinancialStatementRequest(question) {
        const text = normalizeText(question);
        const phrases = [
            "statement of profit or loss", "statement of comprehensive income", "income statement",
            "statement of financial position", "balance sheet", "cash flow statement", "statement of cash flows",
            "prepare a financial statement", "prepare financial statements", "prepare me a financial statement",
            "example financial statement", "financial statements example"
        ];
        return phrases.some(phrase => text.includes(phrase));
    }


    function generateFinancialStatement(question) {
        const text = normalizeText(question);

        if (text.includes("cash flow statement") || text.includes("statement of cash flows") || (text.includes("cash flow") && text.includes("statement"))) {
            return financialStatementTemplates.cashflow;
        }
        if (text.includes("financial position") || text.includes("balance sheet")) {
            return financialStatementTemplates.sofp;
        }
        if (text.includes("profit or loss") || text.includes("income statement") || text.includes("comprehensive income")) {
            return financialStatementTemplates.pnl;
        }

        return `
            <h2>Which financial statement?</h2>
            <p>I can prepare a full worked example of:</p>
            <ul>
                <li>Statement of Profit or Loss (Income Statement)</li>
                <li>Statement of Financial Position (Balance Sheet)</li>
                <li>Statement of Cash Flows</li>
            </ul>
            <p>Just ask, for example: "prepare a statement of profit or loss".</p>
        `;
    }


    /* =========================================================
       JOKE / FUN FACT REQUEST DETECTION
    ========================================================= */

    function isJokeRequest(question) {
        const text = normalizeText(question);
        const phrases = ["joke", "make me laugh", "tell me something funny", "say something funny"];
        return phrases.some(phrase => text.includes(phrase));
    }


    function isFunFactRequest(question) {
        const text = normalizeText(question);
        const phrases = ["fun fact", "funfact", "interesting fact", "did you know", "random fact"];
        return phrases.some(phrase => text.includes(phrase));
    }


    function isMotivationRequest(question) {
        const text = normalizeText(question);
        const phrases = [
            "motivate me", "motivation", "encourage me", "i am stressed", "i'm stressed",
            "im stressed", "i am tired of studying", "i give up", "this is too hard"
        ];
        return phrases.some(phrase => text.includes(phrase));
    }


    /* =========================================================
       TOPIC TITLE
    ========================================================= */

    function makeTopicTitle(item) {
        return item.topic;
    }


    /* =========================================================
       FORMAT KNOWLEDGE
    ========================================================= */

    function formatKnowledge(item, detailed = false) {
        let html = "";
        html += `<h2>${escapeHtml(item.topic)}</h2>`;
        html += `<p>${escapeHtml(item.information)}</p>`;

        if (item.formulas && item.formulas.length) {
            html += `<h3>Formula${item.formulas.length > 1 ? "s" : ""}</h3>`;
            item.formulas.forEach(formula => {
                html += `<div class="formula">${escapeHtml(formula)}</div>`;
            });
        }

        if (item.rules && item.rules.length) {
            html += `<h3>Key points</h3><ul>`;
            item.rules.forEach(rule => { html += `<li>${escapeHtml(rule)}</li>`; });
            html += `</ul>`;
        }

        if (detailed && item.examples && item.examples.length) {
            html += `<h3>Example${item.examples.length > 1 ? "s" : ""}</h3>`;
            item.examples.forEach(example => {
                html += `<div class="example-box">${escapeHtml(example)}</div>`;
            });
        }

        return html;
    }


    /* =========================================================
       TOPIC LIST
    ========================================================= */

    function getTopicList(subject) {
        let knowledge = [];
        if (subject === "Accounting") knowledge = accountingKnowledge;
        if (subject === "Economics") knowledge = economicsKnowledge;
        if (subject === "Mathematics") knowledge = mathematicsKnowledge;
        if (subject === "Business Studies") knowledge = businessStudiesKnowledge;
        if (subject === "Financial Management") knowledge = financialManagementKnowledge;
        if (!knowledge.length) return "I do not have a topic list available yet.";

        let html = `<h2>${escapeHtml(subject)} topics</h2><ul>`;
        knowledge.forEach(item => { html += `<li>${escapeHtml(item.topic)}</li>`; });
        html += `</ul>`;
        html += `<p><em>Tip: you can also just ask me for a "joke" or a "fun fact" whenever you need a study break.</em></p>`;
        return html;
    }


    /* =========================================================
       SAFE HTML ESCAPE
    ========================================================= */

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =========================================================
       CALCULATOR (chat expression calculator)
    ========================================================= */

    function simpleCalculator(question) {
        const text = normalizeText(question);
        const calculationWords = ["calculate", "what is", "solve", "work out", "compute", "equals"];
        const hasCalculationWord = calculationWords.some(word => text.includes(word));
        if (!hasCalculationWord) return null;

        let expression = text;
        expression = expression
            .replace(/calculate/g, "")
            .replace(/what is/g, "")
            .replace(/solve/g, "")
            .replace(/work out/g, "")
            .replace(/compute/g, "")
            .replace(/equals/g, "")
            .replace(/=/g, "")
            .trim();

        if (!/^[0-9+\-*/().%\s^]+$/.test(expression)) return null;
        if (!expression) return null;

        try {
            let safeExpression = expression
                .replace(/\^/g, "**")
                .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

            if (safeExpression.includes("**")) {
                const pieces = safeExpression.split("**");
                if (pieces.length > 2 || pieces.some(piece => piece.trim() === "")) return null;
            }

            const result = Function(`"use strict"; return (${safeExpression})`)();
            if (typeof result !== "number" || !Number.isFinite(result)) return null;

            const funLine = Math.random() < 0.3
                ? `<p><em>${escapeHtml(pickRandom(encouragements))}</em></p>`
                : "";

            return `
                <h2>Calculation</h2>
                <div class="formula">${escapeHtml(expression)}</div>
                <p><strong>Answer:</strong> ${escapeHtml(Number(result.toFixed(10)).toString())}</p>
                ${funLine}
            `;
        } catch (error) {
            return null;
        }
    }


    /* =========================================================
       JOKE / FUN FACT / MOTIVATION ANSWERS
    ========================================================= */

    function tellJoke() {
        const joke = pickRandom(jokesKnowledge);
        return `
            <h2>Here's one for you</h2>
            <p>${escapeHtml(joke.setup)}</p>
            <p><strong>${escapeHtml(joke.punchline)}</strong></p>
            <p><em>Okay, back to studying. Ask me another topic whenever you're ready.</em></p>
        `;
    }


    function tellFunFact() {
        const fact = pickRandom(funFactsKnowledge);
        return `<h2>Fun fact</h2><p>${escapeHtml(fact)}</p>`;
    }


    function tellMotivation() {
        const line = pickRandom(motivationalLines);
        return `
            <h2>You've got this</h2>
            <p>${escapeHtml(line)}</p>
            <p>If you want, tell me the exact topic you're stuck on and I'll break it down step by step.</p>
        `;
    }


    /* =========================================================
       GENERAL ANSWER
    ========================================================= */

    function generalAnswer(question) {
        const text = normalizeText(question);

        if (text === "hi" || text === "hello" || text === "hey" || text === "good morning" || text === "good afternoon" || text === "good evening") {
            return `
                <p>${escapeHtml(pickRandom(funGreetings))}</p>
                <p>${escapeHtml(pickRandom(greetingFollowUps))}</p>
            `;
        }

        if (text.includes("thank you") || text.includes("thanks") || text === "ty") {
            return `<p>You're very welcome! Go forth and ace that test.</p>`;
        }

        /* ---- Identity: "who are you", "who made you", or both ---- */
        const asksWho = text.includes("who are you") || text.includes("what are you") || text.includes("your name");
        const asksMaker = text.includes("who made you") || text.includes("who created you") ||
            text.includes("who built you") || text.includes("who developed you") || text.includes("developer");

        if (asksWho && asksMaker) {
            return `
                <h2>Mastercommerce</h2>
                <p>I am an educational learning system that helps learners study Accounting, Economics and Mathematics.</p>
                <h3>Who made me</h3>
                <p>${escapeHtml(developerInformation.developer)}, founded by ${escapeHtml(developerInformation.founder)} (${escapeHtml(developerInformation.location)}).</p>
                <p>Version: ${escapeHtml(developerInformation.version)}</p>
            `;
        }

        if (asksWho) {
            return `
                <h2>Mastercommerce</h2>
                <p>I am an educational learning system created to help learners study Accounting, Economics and Mathematics - with the occasional terrible joke thrown in.</p>
            `;
        }

        if (asksMaker) {
            return `
                <h2>Developer</h2>
                <p>${escapeHtml(developerInformation.developer)}</p>
                <p>Founder: ${escapeHtml(developerInformation.founder)}</p>
                <p>Product: ${escapeHtml(developerInformation.product)} (${escapeHtml(developerInformation.version)})</p>
            `;
        }

        return `
            <p>I could not find enough specific information for that question in my current knowledge.</p>
            <p>Try mentioning the exact topic. For example:</p>
            <ul>
                <li>What is IAS 16?</li>
                <li>Explain gross profit.</li>
                <li>What is price elasticity?</li>
                <li>Explain the quadratic formula.</li>
                <li>Give me an essay on market failure.</li>
                <li>Prepare a statement of profit or loss.</li>
                <li>Tell me a joke.</li>
            </ul>
        `;
    }


    /* =========================================================
       CORE ANSWER (original engine, used by generateAnswer)
    ========================================================= */

    function coreAnswer(question) {
        if (isJokeRequest(question)) return tellJoke();
        if (isFunFactRequest(question)) return tellFunFact();
        if (isMotivationRequest(question)) return tellMotivation();
        if (isFinancialStatementRequest(question)) return generateFinancialStatement(question);
        if (isEssayRequest(question)) return generateEssayAnswer(question);

        const calculatorResult = simpleCalculator(question);
        if (calculatorResult) return calculatorResult;

        const subject = detectSubject(question);

        if (isTopicListRequest(question)) {
            if (subject) return getTopicList(subject);
            return `
                <h2>Mastercommerce topics</h2>
                <p>I currently cover:</p>
                <ul>
                    <li>Accounting</li>
                    <li>Economics</li>
                    <li>Mathematics</li>
                    <li>Business Studies</li>
                    <li>Financial Management</li>
                </ul>
                <p>Ask something like "list Business Studies topics" - or "tell me a joke" if you need a break.</p>
            `;
        }

        if (!subject) return generalAnswer(question);

        const wantsExamples = isExampleRequest(question);
        const results = searchKnowledge(question, subject);

        if (!results.length) {
            return `
                <p>I understand that your question appears to be about <strong>${escapeHtml(subject)}</strong>, but I could not find a specific topic that matches it.</p>
                <p>Try using the exact topic name, for example:</p>
                <ul>
                    <li>IAS 16</li>
                    <li>IFRS 15</li>
                    <li>Gross profit</li>
                    <li>Inflation</li>
                    <li>Price elasticity</li>
                    <li>Quadratic equations</li>
                </ul>
            `;
        }

        const best = results[0].item;
        lastConversationState.subject = subject;
        lastConversationState.topic = best.topic;
        lastConversationState.exampleIndex = 0;

        if (wantsExamples) return formatExamplesOnly(best);

        const detailed = isAllInformationRequest(question);
        let answerHtml = formatKnowledge(best, detailed);

        if (Math.random() < 0.2) {
            answerHtml += `<p><em>${escapeHtml(pickRandom(encouragements))}</em></p>`;
        }

        return answerHtml;
    }


    /* =========================================================
       SMART LAYER: typo correction, cross-subject search,
       follow-ups, small talk and suggestions
    ========================================================= */

    /* ---------- Typo correction ---------- */

    let vocabCache = null;

    function getVocabulary() {
        if (vocabCache) return vocabCache;
        const set = new Set();
        [accountingKnowledge, economicsKnowledge, mathematicsKnowledge, businessStudiesKnowledge, financialManagementKnowledge].forEach(list =>
            list.forEach(item =>
                [item.topic, ...item.keywords, ...(item.relatedKeywords || [])]
                    .forEach(p => getTokens(p).forEach(t => { if (t.length >= 4) set.add(t); }))
            )
        );
        vocabCache = Array.from(set);
        return vocabCache;
    }

    function editDistance(a, b) {
        const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
        for (let j = 1; j <= b.length; j++) dp[0][j] = j;
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
                );
            }
        }
        return dp[a.length][b.length];
    }

    function autoCorrect(question) {
        const vocab = getVocabulary();
        const known = new Set(vocab);

        return getTokens(question).map(tok => {
            if (tok.length < 4 || known.has(tok) || /\d/.test(tok)) return tok;

            const max = tok.length <= 6 ? 1 : 2;
            let best = tok;
            let bestD = max + 1;

            vocab.forEach(word => {
                if (Math.abs(word.length - tok.length) > max) return;
                const d = editDistance(tok, word);
                if (d < bestD) { bestD = d; best = word; }
            });

            return best;
        }).join(" ");
    }


    /* ---------- Search all subjects ---------- */

    function searchAllSubjects(question, minScore) {
        const all = [];
        [accountingKnowledge, economicsKnowledge, mathematicsKnowledge, businessStudiesKnowledge, financialManagementKnowledge].forEach((list, i) => {
            const subject = ["Accounting", "Economics", "Mathematics", "Business Studies", "Financial Management"][i];
            list.forEach(item => all.push({ item, subject, score: scoreKnowledgeItem(question, item) }));
        });
        all.sort((a, b) => b.score - a.score);
        return all.filter(r => r.score >= minScore).slice(0, 3);
    }

    function findTopicByName(name) {
        for (const list of [accountingKnowledge, economicsKnowledge, mathematicsKnowledge, businessStudiesKnowledge, financialManagementKnowledge]) {
            const found = list.find(i => i.topic === name);
            if (found) return found;
        }
        return null;
    }


    /* ---------- Follow-ups ("another example", "explain more") ---------- */

    function handleFollowUp(question) {
        const text = normalizeText(question);

        if (!lastConversationState.topic) return null;
        if (detectSubject(question)) return null;
        if (getTokens(question).length > 8) return null;

        const item = findTopicByName(lastConversationState.topic);
        if (!item) return null;

        if (/(another|more|next|one more|different) examples?|give me an example|show me an example|example please/.test(text)) {
            const examples = item.examples || [];
            if (!examples.length) return formatExamplesOnly(item);

            const idx = (lastConversationState.exampleIndex || 0) % examples.length;
            lastConversationState.exampleIndex = idx + 1;

            return `
                <h2>${escapeHtml(item.topic)} - Example ${idx + 1} of ${examples.length}</h2>
                <div class="example-box">${escapeHtml(examples[idx])}</div>
                <p><em>Say "another example" for the next one.</em></p>
            `;
        }

        if (/(explain|tell me) (more|again|further)|more detail|go deeper|i dont understand|simpler/.test(text)) {
            return formatKnowledge(item, true);
        }

        return null;
    }


    /* ---------- Small talk and quick facts ---------- */

    function smallTalk(question) {
        const text = normalizeText(question);

        if (/how are you|how r u|hows it going|whats up/.test(text)) {
            return `<p>I'm doing great, thanks for asking. Ready to help with Accounting, Economics or Maths. What are we tackling?</p>`;
        }

        if (/what can you do|how can you help|^help$/.test(text)) {
            return `
                <h2>What I can do</h2>
                <ul>
                    <li>Explain Accounting, Economics and Maths topics</li>
                    <li>Give worked examples (ask for "examples", then "another example")</li>
                    <li>Write economics essays and prepare financial statements</li>
                    <li>Calculate, and tell jokes or fun facts when you need a break</li>
                </ul>
            `;
        }

        if (/what (is )?(the )?(date|day) (is it )?today|todays date/.test(text)) {
            return `<p>Today is ${escapeHtml(new Date().toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}.</p>`;
        }

        if (/what (is )?(the )?time|time is it/.test(text)) {
            return `<p>It is ${escapeHtml(new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }))}.</p>`;
        }

        if (/^(bye|goodbye|see you|cya|good night)/.test(text)) {
            return `<p>Bye! Good luck with your studies. Come back anytime.</p>`;
        }

        if (/^(ok|okay|cool|nice|great|alright|got it)$/.test(text)) {
            return `<p>Great! Ask me anything else whenever you're ready.</p>`;
        }

        return null;
    }


    /* ---------- Fallback detection ---------- */

    function isFallbackAnswer(html) {
        return html.includes("could not find");
    }


    /* ---------- "Did you mean" suggestions ---------- */

    function suggestClosest(question) {
        const near = searchAllSubjects(question, 8);

        if (!near.length) {
            return `
                <p>I don't have that one in my study notes yet. I'm strongest on Accounting, Economics and Mathematics.</p>
                <p>Try rephrasing with the topic name, or ask me for "list topics".</p>
            `;
        }

        let html = `<p>I'm not 100% sure what you meant. Did you mean one of these?</p><ul>`;
        near.forEach(r => { html += `<li>${escapeHtml(r.item.topic)} (${escapeHtml(r.subject)})</li>`; });
        return html + `</ul>`;
    }


    /* =========================================================
       GENERATE ANSWER (main entry)
    ========================================================= */

    function generateAnswer(question) {

        const followUp = handleFollowUp(question);
        if (followUp) return followUp;

        const talk = smallTalk(question);
        if (talk) return talk;

        const answer = coreAnswer(question);
        if (!isFallbackAnswer(answer)) return answer;

        /* 1) retry after fixing typos */
        const fixed = autoCorrect(question);
        if (fixed && fixed !== normalizeText(question)) {
            const retry = coreAnswer(fixed);
            if (!isFallbackAnswer(retry)) return retry;
        }

        /* 2) search every subject, ignoring subject detection */
        const wantsExamples = isExampleRequest(question);
        const best = searchAllSubjects(fixed || question, 25)[0];

        if (best) {
            lastConversationState.subject = best.subject;
            lastConversationState.topic = best.item.topic;
            lastConversationState.exampleIndex = 0;

            return wantsExamples
                ? formatExamplesOnly(best.item)
                : formatKnowledge(best.item, isAllInformationRequest(question));
        }

        /* 3) suggestions */
        return suggestClosest(question);
    }


    /* =========================================================
       MESSAGE CREATION
    ========================================================= */

    function addMessage(content, type) {
        if (welcomeScreen) welcomeScreen.style.display = "none";

        const row = document.createElement("div");
        row.className = `message-row ${type}`;

        const message = document.createElement("div");
        message.className = `message ${type === "user" ? "user-message" : "assistant-message"}`;
        message.innerHTML = content;

        row.appendChild(message);
        chatArea.appendChild(row);

        requestAnimationFrame(() => {
            chatArea.scrollTop = chatArea.scrollHeight;
        });

        return row;
    }


    /* =========================================================
       THINKING MESSAGE
    ========================================================= */

    function addThinkingMessage() {
        const row = document.createElement("div");
        row.className = "message-row assistant";

        const message = document.createElement("div");
        message.className = "message assistant-message";

        message.innerHTML = `
            <div class="thinking">
                <span>${escapeHtml(pickRandom(thinkingPhrases))}</span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
            </div>
        `;

        row.appendChild(message);
        chatArea.appendChild(row);
        chatArea.scrollTop = chatArea.scrollHeight;

        return row;
    }


    /* =========================================================
       SEND QUESTION
    ========================================================= */

    function sendQuestion() {
        const question = questionInput.value.trim();
        if (!question) return;

        addMessage(escapeHtml(question), "user");

        questionInput.value = "";
        autoResizeInput();

        const thinking = addThinkingMessage();

        setTimeout(() => {
            const answer = generateAnswer(question);
            thinking.remove();
            addMessage(answer, "assistant");
        }, 350);
    }


    /* =========================================================
       INPUT HEIGHT
    ========================================================= */

    function autoResizeInput() {
        questionInput.style.height = "auto";
        const height = Math.min(questionInput.scrollHeight, 180);
        questionInput.style.height = `${height}px`;
        questionInput.style.fontSize = "16px";
    }

    questionInput.addEventListener("input", autoResizeInput);


    /* =========================================================
       ENTER TO SEND
    ========================================================= */

    questionInput.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendQuestion();
        }
    });

    sendButton.addEventListener("click", sendQuestion);


    /* =========================================================
       SIDEBAR
    ========================================================= */

    function openSidebar() {
        sidebar.classList.add("open");
        sidebarOverlay.classList.add("show");
    }

    function closeSidebarMenu() {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    }

    menuButton.addEventListener("click", openSidebar);
    closeSidebar.addEventListener("click", closeSidebarMenu);
    sidebarOverlay.addEventListener("click", closeSidebarMenu);


    /* =========================================================
       HOME
    ========================================================= */

    homeButton.addEventListener("click", () => {
        closeSidebarMenu();

        aboutModal.classList.remove("show");
        settingsModal.classList.remove("show");
        if (calculatorModal) calculatorModal.classList.remove("show");

        chatArea.innerHTML = "";
        chatArea.appendChild(createWelcomeScreen());

        lastConversationState = { subject: null, topic: null, exampleIndex: 0 };
    });


    /* =========================================================
       CREATE WELCOME SCREEN
    ========================================================= */

    function createWelcomeScreen() {
        const wrapper = document.createElement("div");
        wrapper.id = "welcomeScreen";
        wrapper.className = "welcome-screen";

        wrapper.innerHTML = `
            <div class="welcome-content">
                <div class="welcome-logo">M</div>
                <h1>What would you like to learn?</h1>
                <p>Ask a question about Accounting, Economics or Mathematics - or just say "tell me a joke" to break the ice.</p>
                <div class="subject-cards">
                    <div class="subject-card">
                        <div class="subject-letter">A</div>
                        <div>
                            <h3>Accounting</h3>
                            <p>Financial accounting, management accounting, tax, auditing, IFRS and calculations.</p>
                        </div>
                    </div>
                    <div class="subject-card">
                        <div class="subject-letter">E</div>
                        <div>
                            <h3>Economics</h3>
                            <p>Microeconomics, macroeconomics, policies, markets, essays and calculations.</p>
                        </div>
                    </div>
                    <div class="subject-card">
                        <div class="subject-letter">M</div>
                        <div>
                            <h3>Mathematics</h3>
                            <p>Algebra, functions, statistics, probability, calculus and problem solving.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return wrapper;
    }


    /* =========================================================
       NEW CHAT
    ========================================================= */

    newChatButton.addEventListener("click", () => {
        closeSidebarMenu();

        chatArea.innerHTML = "";
        chatArea.appendChild(createWelcomeScreen());

        lastConversationState = { subject: null, topic: null, exampleIndex: 0 };

        questionInput.value = "";
        autoResizeInput();
        questionInput.focus();
    });


    /* =========================================================
       CLEAR CHAT
    ========================================================= */

    clearChatButton.addEventListener("click", () => {
        chatArea.innerHTML = "";
        chatArea.appendChild(createWelcomeScreen());

        lastConversationState = { subject: null, topic: null, exampleIndex: 0 };

        closeSidebarMenu();
    });


    /* =========================================================
       PLUS MENU
    ========================================================= */

    function togglePlusMenu() {
        const showing = plusMenu.classList.toggle("show");
        plusMenu.setAttribute("aria-hidden", String(!showing));
        plusButton.setAttribute("aria-expanded", String(showing));
    }

    plusButton.addEventListener("click", event => {
        event.stopPropagation();
        togglePlusMenu();
    });

    document.querySelectorAll(".plus-option").forEach(option => {
        option.addEventListener("click", () => {
            plusMenu.classList.remove("show");
            plusButton.setAttribute("aria-expanded", "false");

            featureToast.classList.add("show");

            setTimeout(() => {
                featureToast.classList.remove("show");
            }, 2200);
        });
    });

    document.addEventListener("click", event => {
        if (!plusMenu.contains(event.target) && !plusButton.contains(event.target)) {
            plusMenu.classList.remove("show");
            plusButton.setAttribute("aria-expanded", "false");
        }
    });


    /* =========================================================
       ABOUT MODAL
    ========================================================= */

    aboutButton.addEventListener("click", () => {
        closeSidebarMenu();
        aboutModal.classList.add("show");
    });


    /* =========================================================
       SETTINGS MODAL
    ========================================================= */

    settingsButton.addEventListener("click", () => {
        closeSidebarMenu();
        settingsModal.classList.add("show");
    });


    /* =========================================================
       CALCULATOR MODAL
    ========================================================= */

    const calculatorButton = document.getElementById("calculatorButton");
    const calculatorModal = document.getElementById("calculatorModal");

    if (calculatorButton && calculatorModal) {
        calculatorButton.addEventListener("click", () => {
            closeSidebarMenu();
            calculatorModal.classList.add("show");
        });
    }


    /* =========================================================
       MODAL CLOSE BUTTONS
    ========================================================= */

    document.querySelectorAll("[data-close]").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.close;
            const modal = document.getElementById(id);
            if (modal) modal.classList.remove("show");
        });
    });


    /* =========================================================
       CLOSE MODAL WHEN CLICKING BACKGROUND
    ========================================================= */

    [aboutModal, settingsModal, calculatorModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener("click", event => {
            if (event.target === modal) modal.classList.remove("show");
        });
    });


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        closeSidebarMenu();

        aboutModal.classList.remove("show");
        settingsModal.classList.remove("show");
        if (calculatorModal) calculatorModal.classList.remove("show");

        plusMenu.classList.remove("show");
    });


    /* =========================================================
       SETTINGS
    ========================================================= */

    function saveSettings() {
        const settings = {
            theme: document.body.classList.contains("dark") ? "dark" : "light",
            background: ["white", "gray", "warm", "blue", "green", "lavender"].find(name =>
                document.body.classList.contains(`background-${name}`)
            ) || "white",
            font: ["small", "medium", "large"].find(name =>
                document.body.classList.contains(`font-${name}`)
            ) || "medium",
            reducedMotion: document.body.classList.contains("reduced-motion")
        };

        localStorage.setItem("mastercommerceSettings", JSON.stringify(settings));
    }

    function loadSettings() {
        const saved = localStorage.getItem("mastercommerceSettings");

        if (!saved) {
            applyTheme("light");
            applyBackground("white");
            applyFont("medium");
            return;
        }

        try {
            const settings = JSON.parse(saved);
            applyTheme(settings.theme || "light");
            applyBackground(settings.background || "white");
            applyFont(settings.font || "medium");

            if (settings.reducedMotion) {
                document.body.classList.add("reduced-motion");
            }
        } catch (error) {
            applyTheme("light");
            applyBackground("white");
            applyFont("medium");
        }
    }

    function applyTheme(theme) {
        document.body.classList.toggle("dark", theme === "dark");
    }

    function applyBackground(background) {
        ["white", "gray", "warm", "blue", "green", "lavender"].forEach(name => {
            document.body.classList.remove(`background-${name}`);
        });
        document.body.classList.add(`background-${background}`);
    }

    function applyFont(font) {
        ["small", "medium", "large"].forEach(name => {
            document.body.classList.remove(`font-${name}`);
        });
        document.body.classList.add(`font-${font}`);
    }

    document.querySelectorAll("[data-theme]").forEach(button => {
        button.addEventListener("click", () => {
            applyTheme(button.dataset.theme);
            saveSettings();
        });
    });

    document.querySelectorAll("[data-background]").forEach(button => {
        button.addEventListener("click", () => {
            applyBackground(button.dataset.background);
            saveSettings();
        });
    });

    document.querySelectorAll("[data-font]").forEach(button => {
        button.addEventListener("click", () => {
            applyFont(button.dataset.font);
            saveSettings();
        });
    });

    motionButton.addEventListener("click", () => {
        document.body.classList.toggle("reduced-motion");
        saveSettings();
    });

    resetSettingsButton.addEventListener("click", () => {
        document.body.classList.remove(
            "dark",
            "background-white", "background-gray", "background-warm",
            "background-blue", "background-green", "background-lavender",
            "font-small", "font-medium", "font-large",
            "reduced-motion"
        );

        applyTheme("light");
        applyBackground("white");
        applyFont("medium");

        document.body.classList.remove("reduced-motion");

        saveSettings();
    });


    /* =========================================================
       MOBILE ZOOM PROTECTION
    ========================================================= */

    questionInput.style.fontSize = "16px";

    let lastTouchEnd = 0;

    document.addEventListener("touchend", event => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) event.preventDefault();
        lastTouchEnd = now;
    }, { passive: false });

    document.addEventListener("gesturestart", event => { event.preventDefault(); }, { passive: false });
    document.addEventListener("gesturechange", event => { event.preventDefault(); }, { passive: false });
    document.addEventListener("gestureend", event => { event.preventDefault(); }, { passive: false });


    /* =========================================================
       ============================================================
       ADVANCED CALCULATOR (Scientific + Financial)
       ============================================================
    ========================================================= */

    /* ---- Tab switching: Scientific vs Financial ---- */

    const calcTabButtons = document.querySelectorAll("[data-calctab]");
    const calcPanels = {
        scientific: document.getElementById("calcSciPanel"),
        financial: document.getElementById("calcFinPanel")
    };

    calcTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            calcTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            Object.keys(calcPanels).forEach(key => {
                if (!calcPanels[key]) return;
                calcPanels[key].classList.toggle("active", key === btn.dataset.calctab);
            });
        });
    });

    /* ---- Financial sub-tab switching ---- */

    const calcFinTabButtons = document.querySelectorAll("[data-fintab]");
    const calcFinPanels = {
        tvm: document.getElementById("calcTVM"),
        loan: document.getElementById("calcLoan"),
        compound: document.getElementById("calcCompound")
    };

    calcFinTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            calcFinTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            Object.keys(calcFinPanels).forEach(key => {
                if (!calcFinPanels[key]) return;
                calcFinPanels[key].classList.toggle("active", key === btn.dataset.fintab);
            });
        });
    });


    /* =========================================================
       SCIENTIFIC CALCULATOR
    ========================================================= */

    const calcSciDisplay = document.getElementById("calcSciInput");
    const calcSciHistoryEl = document.getElementById("calcSciHistory");
    const calcDegRadBtn = document.getElementById("calcDegRad");
    const calcSciGrid = document.getElementById("calcSciGrid");

    let sciExpression = "";
    let sciAngleMode = "DEG";
    let sciMemory = 0;
    let sciHistory = [];

    function sciAngleToRad(x) {
        return sciAngleMode === "DEG" ? (x * Math.PI / 180) : x;
    }

    function sciRadToAngle(x) {
        return sciAngleMode === "DEG" ? (x * 180 / Math.PI) : x;
    }

    function sciSin(x) { return Math.sin(sciAngleToRad(x)); }
    function sciCos(x) { return Math.cos(sciAngleToRad(x)); }
    function sciTan(x) { return Math.tan(sciAngleToRad(x)); }
    function sciAsin(x) { return sciRadToAngle(Math.asin(x)); }
    function sciAcos(x) { return sciRadToAngle(Math.acos(x)); }
    function sciAtan(x) { return sciRadToAngle(Math.atan(x)); }
    function sciLog(x) { return Math.log(x) / Math.LN10; }
    function sciLn(x) { return Math.log(x); }
    function sciSqrt(x) { return Math.sqrt(x); }
    function sciFact(n) {
        n = Math.round(n);
        if (n < 0 || !Number.isFinite(n)) return NaN;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    }

    function updateSciDisplay() {
        calcSciDisplay.textContent = sciExpression === "" ? "0" : sciExpression;

        calcSciHistoryEl.innerHTML = "";
        sciHistory.slice(-3).forEach(entry => {
            const row = document.createElement("div");
            row.className = "calc-history-row";
            row.textContent = `${entry.expr} = ${entry.result}`;
            row.addEventListener("click", () => {
                sciExpression = String(entry.result);
                updateSciDisplay();
            });
            calcSciHistoryEl.appendChild(row);
        });
    }

    function sciAutoBalance(expr) {
        let open = 0;
        for (const ch of expr) {
            if (ch === "(") open++;
            if (ch === ")") open--;
        }
        if (open > 0) expr += ")".repeat(open);
        return expr;
    }

    function evaluateSciExpression(expr) {
        if (!expr || !expr.trim()) return null;

        let jsExpr = sciAutoBalance(expr);

        jsExpr = jsExpr
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/\^/g, "**")
            .replace(/π/g, "(Math.PI)")
            .replace(/\be\b/g, "(Math.E)");

        try {
            const fn = new Function(
                "sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "sqrt", "fact",
                `"use strict"; return (${jsExpr});`
            );

            const result = fn(sciSin, sciCos, sciTan, sciAsin, sciAcos, sciAtan, sciLog, sciLn, sciSqrt, sciFact);

            if (typeof result !== "number" || !Number.isFinite(result)) return null;

            return Number(result.toFixed(10));
        } catch (error) {
            return null;
        }
    }

    function wrapSciExpression(prefix, suffix) {
        if (!sciExpression) {
            sciExpression = prefix + suffix;
        } else {
            sciExpression = prefix + sciExpression + suffix;
        }
    }

    function handleSciKey(key) {

        if (/^[0-9.]$/.test(key)) {
            sciExpression += key;
            updateSciDisplay();
            return;
        }

        switch (key) {

            case "(":
            case ")":
                sciExpression += key;
                break;

            case "+":
            case "-":
            case "×":
            case "÷":
            case "^":
                sciExpression += key;
                break;

            case "AC":
                sciExpression = "";
                break;

            case "back":
                sciExpression = sciExpression.slice(0, -1);
                break;

            case "%":
                if (sciExpression) sciExpression = "((" + sciExpression + ")/100)";
                break;

            case "sin": wrapSciExpression("sin(", ")"); break;
            case "cos": wrapSciExpression("cos(", ")"); break;
            case "tan": wrapSciExpression("tan(", ")"); break;
            case "asin": wrapSciExpression("asin(", ")"); break;
            case "acos": wrapSciExpression("acos(", ")"); break;
            case "atan": wrapSciExpression("atan(", ")"); break;
            case "log": wrapSciExpression("log(", ")"); break;
            case "ln": wrapSciExpression("ln(", ")"); break;
            case "sqrt": wrapSciExpression("sqrt(", ")"); break;
            case "x2": wrapSciExpression("((", ")^2)"); break;
            case "1/x": wrapSciExpression("(1/(", "))"); break;
            case "fact": wrapSciExpression("fact(", ")"); break;

            case "pi":
                sciExpression += "π";
                break;

            case "euler":
                sciExpression += "e";
                break;

            case "pm":
                if (sciExpression) sciExpression = "(-(" + sciExpression + "))";
                else sciExpression = "-";
                break;

            case "MC":
                sciMemory = 0;
                break;

            case "MR":
                sciExpression += String(sciMemory);
                break;

            case "M+": {
                const val = evaluateSciExpression(sciExpression);
                if (val !== null) sciMemory += val;
                break;
            }

            case "M-": {
                const val = evaluateSciExpression(sciExpression);
                if (val !== null) sciMemory -= val;
                break;
            }

            case "DEG":
                sciAngleMode = sciAngleMode === "DEG" ? "RAD" : "DEG";
                if (calcDegRadBtn) calcDegRadBtn.textContent = sciAngleMode;
                break;

            case "equals": {
                const result = evaluateSciExpression(sciExpression);
                if (result === null) {
                    calcSciDisplay.textContent = "Error";
                    setTimeout(updateSciDisplay, 900);
                    return;
                }
                sciHistory.push({ expr: sciExpression, result: result });
                sciExpression = String(result);
                break;
            }

            default:
                break;
        }

        updateSciDisplay();
    }

    if (calcSciGrid) {
        calcSciGrid.addEventListener("click", event => {
            const btn = event.target.closest("[data-calc-key]");
            if (!btn) return;
            handleSciKey(btn.dataset.calcKey);
        });
    }


    /* =========================================================
       FINANCIAL CALCULATOR - HELPERS
    ========================================================= */

    function formatCurrency(value) {
        if (typeof value !== "number" || !Number.isFinite(value)) return "-";
        const sign = value < 0 ? "-" : "";
        const abs = Math.abs(value);
        const parts = abs.toFixed(2).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `${sign}R ${parts[0]}.${parts[1]}`;
    }

    function formatNumber(value, decimals) {
        if (typeof value !== "number" || !Number.isFinite(value)) return "-";
        return value.toFixed(decimals === undefined ? 4 : decimals);
    }


    /* =========================================================
       TVM SOLVER
    ========================================================= */

    function tvmRateFunction(i, n, pv, pmt, fv, type) {
        if (Math.abs(i) < 1e-12) return pv + pmt * n + fv;
        return pv * Math.pow(1 + i, n) + pmt * (1 + type * i) * ((Math.pow(1 + i, n) - 1) / i) + fv;
    }

    function tvmSolveRate(n, pv, pmt, fv, type) {
        let lo = -0.999999, hi = 10;
        const steps = 3000;
        let prev = tvmRateFunction(lo, n, pv, pmt, fv, type);
        let prevI = lo;
        let bracketLo = null, bracketHi = null;

        for (let k = 1; k <= steps; k++) {
            const i = lo + (hi - lo) * k / steps;
            const val = tvmRateFunction(i, n, pv, pmt, fv, type);

            if (prev === 0) { bracketLo = prevI; bracketHi = prevI; break; }
            if ((prev < 0 && val > 0) || (prev > 0 && val < 0)) {
                bracketLo = prevI;
                bracketHi = i;
                break;
            }
            prev = val;
            prevI = i;
        }

        if (bracketLo === null) return null;

        let a = bracketLo, b = bracketHi;
        for (let iter = 0; iter < 200; iter++) {
            const m = (a + b) / 2;
            const fm = tvmRateFunction(m, n, pv, pmt, fv, type);
            if (Math.abs(fm) < 1e-9) return m;
            const fa = tvmRateFunction(a, n, pv, pmt, fv, type);
            if ((fa < 0 && fm > 0) || (fa > 0 && fm < 0)) b = m; else a = m;
        }

        return (a + b) / 2;
    }

    function tvmSolve(target, inputs) {
        const { n, iY, pv, pmt, fv, py, timing } = inputs;
        const i = (iY / 100) / py;
        const type = timing === "begin" ? 1 : 0;

        switch (target) {

            case "FV": {
                let result;
                if (Math.abs(i) < 1e-12) result = -(pv + pmt * n);
                else result = -(pv * Math.pow(1 + i, n) + pmt * (1 + type * i) * ((Math.pow(1 + i, n) - 1) / i));
                return result;
            }

            case "PV": {
                let result;
                if (Math.abs(i) < 1e-12) result = -(fv + pmt * n);
                else result = -(fv + pmt * (1 + type * i) * ((Math.pow(1 + i, n) - 1) / i)) / Math.pow(1 + i, n);
                return result;
            }

            case "PMT": {
                let result;
                if (Math.abs(i) < 1e-12) {
                    if (n === 0) return null;
                    result = -(fv + pv) / n;
                } else {
                    const annuityFactor = (1 + type * i) * ((Math.pow(1 + i, n) - 1) / i);
                    if (annuityFactor === 0) return null;
                    result = -(fv + pv * Math.pow(1 + i, n)) / annuityFactor;
                }
                return result;
            }

            case "N": {
                if (!pmt) return null;
                if (Math.abs(i) < 1e-12) {
                    return -(fv + pv) / pmt;
                }
                const numerator = pmt * (1 + type * i) - fv * i;
                const denominator = pmt * (1 + type * i) + pv * i;
                if (denominator === 0 || numerator / denominator <= 0) return null;
                return Math.log(numerator / denominator) / Math.log(1 + i);
            }

            case "IY": {
                const iSolved = tvmSolveRate(n, pv, pmt, fv, type);
                if (iSolved === null) return null;
                return iSolved * py * 100;
            }

            default:
                return null;
        }
    }


    /* =========================================================
       LOAN / AMORTISATION
    ========================================================= */

    function calcLoanResult(principal, annualRatePct, years, py) {
        const n = Math.round(years * py);
        const i = (annualRatePct / 100) / py;

        let payment;
        if (i === 0) {
            payment = principal / n;
        } else {
            payment = (principal * i) / (1 - Math.pow(1 + i, -n));
        }

        const totalPaid = payment * n;
        const totalInterest = totalPaid - principal;

        return { payment, totalPaid, totalInterest, n, i, principal };
    }

    function generateAmortizationRows(loanResult) {
        let balance = loanResult.principal;
        const rows = [];

        for (let p = 1; p <= loanResult.n; p++) {
            const interest = balance * loanResult.i;
            let principalPaid = loanResult.payment - interest;

            if (p === loanResult.n) principalPaid = balance;

            balance = balance - principalPaid;
            if (balance < 0.005) balance = 0;

            rows.push({
                period: p,
                payment: p === loanResult.n ? (principalPaid + interest) : loanResult.payment,
                interest,
                principal: principalPaid,
                balance
            });
        }

        return rows;
    }


    /* =========================================================
       COMPOUND INTEREST
    ========================================================= */

    function calcCompoundResult(principal, annualRatePct, years, compoundsPerYear, contribution) {
        const r = annualRatePct / 100;
        const periods = compoundsPerYear * years;
        const ratePerPeriod = r / compoundsPerYear;

        const growthOfPrincipal = principal * Math.pow(1 + ratePerPeriod, periods);

        let growthOfContributions;
        if (ratePerPeriod === 0) {
            growthOfContributions = contribution * periods;
        } else {
            growthOfContributions = contribution * ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod);
        }

        const futureValue = growthOfPrincipal + growthOfContributions;
        const totalContributions = principal + contribution * periods;
        const totalInterest = futureValue - totalContributions;

        return { futureValue, totalContributions, totalInterest, periods };
    }


    /* =========================================================
       FINANCIAL CALCULATOR - UI WIRING
    ========================================================= */

    /* ---- TVM ---- */

    const tvmSolveBtn = document.getElementById("tvmSolveBtn");
    const tvmResultEl = document.getElementById("tvmResult");
    const tvmTargetSelect = document.getElementById("tvmTarget");

    if (tvmSolveBtn) {
        tvmSolveBtn.addEventListener("click", () => {
            const target = tvmTargetSelect.value;

            const inputs = {
                n: parseFloat(document.getElementById("tvmN").value) || 0,
                iY: parseFloat(document.getElementById("tvmIY").value) || 0,
                pv: parseFloat(document.getElementById("tvmPV").value) || 0,
                pmt: parseFloat(document.getElementById("tvmPMT").value) || 0,
                fv: parseFloat(document.getElementById("tvmFV").value) || 0,
                py: parseFloat(document.getElementById("tvmPY").value) || 12,
                timing: document.getElementById("tvmTiming").value
            };

            const result = tvmSolve(target, inputs);

            if (result === null || !Number.isFinite(result)) {
                tvmResultEl.innerHTML = `<p class="calc-error">Could not solve for ${target} with those values. Check your inputs (a solution may not exist for this combination).</p>`;
                return;
            }

            let label = target;
            let displayValue = target === "IY" ? `${formatNumber(result, 4)} %` :
                                target === "N" ? formatNumber(result, 4) + " periods" :
                                formatCurrency(result);

            tvmResultEl.innerHTML = `
                <p><strong>${label} = ${displayValue}</strong></p>
                <p class="calc-note">Sign convention: cash outflows are negative, cash inflows are positive (standard TVM convention).</p>
            `;

            if (target === "N") document.getElementById("tvmN").value = result.toFixed(4);
            if (target === "IY") document.getElementById("tvmIY").value = result.toFixed(4);
            if (target === "PV") document.getElementById("tvmPV").value = result.toFixed(2);
            if (target === "PMT") document.getElementById("tvmPMT").value = result.toFixed(2);
            if (target === "FV") document.getElementById("tvmFV").value = result.toFixed(2);
        });
    }

    /* ---- Loan / Amortisation ---- */

    const loanCalcBtn = document.getElementById("loanCalcBtn");
    const loanResultEl = document.getElementById("loanResult");
    const loanAmortBtn = document.getElementById("loanAmortBtn");
    const loanAmortTableWrap = document.getElementById("loanAmortTableWrap");

    let lastLoanResult = null;

    if (loanCalcBtn) {
        loanCalcBtn.addEventListener("click", () => {
            const principal = parseFloat(document.getElementById("loanPrincipal").value) || 0;
            const rate = parseFloat(document.getElementById("loanRate").value) || 0;
            const years = parseFloat(document.getElementById("loanYears").value) || 0;
            const py = parseFloat(document.getElementById("loanPY").value) || 12;

            if (principal <= 0 || years <= 0) {
                loanResultEl.innerHTML = `<p class="calc-error">Enter a loan amount and term greater than zero.</p>`;
                return;
            }

            lastLoanResult = calcLoanResult(principal, rate, years, py);

            loanResultEl.innerHTML = `
                <p><strong>Payment per period:</strong> ${formatCurrency(lastLoanResult.payment)}</p>
                <p><strong>Total paid:</strong> ${formatCurrency(lastLoanResult.totalPaid)}</p>
                <p><strong>Total interest:</strong> ${formatCurrency(lastLoanResult.totalInterest)}</p>
                <p><strong>Number of payments:</strong> ${lastLoanResult.n}</p>
            `;

            loanAmortTableWrap.innerHTML = "";
            loanAmortTableWrap.style.display = "none";
        });
    }

    if (loanAmortBtn) {
        loanAmortBtn.addEventListener("click", () => {
            if (!lastLoanResult) {
                loanResultEl.innerHTML = `<p class="calc-error">Calculate a loan first.</p>`;
                return;
            }

            const rows = generateAmortizationRows(lastLoanResult);

            let html = `
                <table class="calc-amort-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Payment</th>
                            <th>Interest</th>
                            <th>Principal</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            rows.forEach(row => {
                html += `
                    <tr>
                        <td>${row.period}</td>
                        <td>${formatCurrency(row.payment)}</td>
                        <td>${formatCurrency(row.interest)}</td>
                        <td>${formatCurrency(row.principal)}</td>
                        <td>${formatCurrency(row.balance)}</td>
                    </tr>
                `;
            });

            html += `</tbody></table>`;

            loanAmortTableWrap.innerHTML = html;
            loanAmortTableWrap.style.display = "block";
        });
    }

    /* ---- Compound Interest ---- */

    const compoundCalcBtn = document.getElementById("compoundCalcBtn");
    const compoundResultEl = document.getElementById("compoundResult");

    if (compoundCalcBtn) {
        compoundCalcBtn.addEventListener("click", () => {
            const principal = parseFloat(document.getElementById("compoundPrincipal").value) || 0;
            const rate = parseFloat(document.getElementById("compoundRate").value) || 0;
            const years = parseFloat(document.getElementById("compoundYears").value) || 0;
            const n = parseFloat(document.getElementById("compoundN").value) || 1;
            const contribution = parseFloat(document.getElementById("compoundContribution").value) || 0;

            if (principal < 0 || years <= 0) {
                compoundResultEl.innerHTML = `<p class="calc-error">Enter a principal and term greater than zero.</p>`;
                return;
            }

            const result = calcCompoundResult(principal, rate, years, n, contribution);

            compoundResultEl.innerHTML = `
                <p><strong>Future value:</strong> ${formatCurrency(result.futureValue)}</p>
                <p><strong>Total contributions (incl. principal):</strong> ${formatCurrency(result.totalContributions)}</p>
                <p><strong>Total interest earned:</strong> ${formatCurrency(result.totalInterest)}</p>
            `;
        });
    }


    /* =========================================================
       SMART BACKUP SOURCES (ADD-ON)
       Sits directly ABOVE the "LOAD SETTINGS" section.
       Nothing existing is changed.

       How it works:
       1. Mastercommerce searches its own notes first (as before).
       2. It then checks whether the answer it found REALLY fits
          the question (not just one lucky keyword).
       3. If the notes have no answer, or only a weak/unrelated
          one, it quietly asks Wikipedia instead.
       4. If Wikipedia has nothing either, the original answer
          is shown. The user never has to type "Wikipedia".
    ========================================================= */

    const wikiConfig = {
        lang: "en",
        timeoutMs: 8000,
        minCoverage: 0.6          /* how much of the question the notes must cover */
    };

    let wikiSlotCounter = 0;

    /* Words that carry no subject meaning */
    const wikiStopWords = new Set((
        "a an the of in on at to for from by with without about as is are was were be been being am " +
        "do does did done can could would should will shall may might must " +
        "what whats who whom whose which when where why how whether " +
        "i me my mine we us our you your he she it its they them their this that these those there here " +
        "and or but if then so than also too very just only into over under between " +
        "tell give show explain explanation describe define definition meaning mean means " +
        "please kindly need want know learn understand help " +
        "example examples another more some any all everything information info detail details detailed full brief short simple " +
        "essay summary notes note question answer topic topics " +
        "calculate calculation formula formulas work out find compute"
    ).split(/\s+/));

    /* ---------- Explicit request words (optional for the user) ---------- */

    function wikiWantsLookup(question) {
        return /\b(wikipedia|wiki|look ?up|search for|search the web|google)\b/i.test(question);
    }

    /* ---------- Turn a question into a clean search phrase ---------- */

    function wikiCleanQuery(question) {
        return String(question || "")
            .replace(/\b(please|kindly|wikipedia|wiki|look ?up|search for|search the web|search|google|on the internet|online)\b/gi, " ")
            .replace(/^\s*(can|could|would) you\s+/i, "")
            .replace(/^\s*(tell me|give me|show me)\s+(about|information (on|about)|info (on|about)|more about)\s+/i, "")
            .replace(/^\s*(what do you know about|do you know about|do you know|tell me|explain|describe|define|meaning of|definition of)\s+/i, "")
            .replace(/^\s*(what|who|where|when|why|how)\s+(is|are|was|were|does|do|did)?\s*(the|a|an)?\s*/i, "")
            .replace(/\b(mean|means)\s*$/i, "")
            .replace(/[?!.,]+$/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    /* ---------- Content words of a question ---------- */

    function wikiContentTerms(question) {
        return getTokens(question).filter(t =>
            !wikiStopWords.has(t) && (t.length >= 3 || /\d/.test(t))
        );
    }

    /* ---------- Does a word exist in a vocabulary (typo tolerant)? ---------- */

    function wikiTermKnown(term, vocabSet, vocabList) {
        if (vocabSet.has(term)) return true;

        const singular = term.replace(/(es|s)$/, "");
        if (singular.length >= 3 && vocabSet.has(singular)) return true;
        if (vocabSet.has(term + "s") || vocabSet.has(term + "es")) return true;

        if (term.length < 5 || /\d/.test(term)) return false;

        const max = term.length <= 7 ? 1 : 2;
        return vocabList.some(word =>
            Math.abs(word.length - term.length) <= max &&
            word.length >= 4 &&
            editDistance(term, word) <= max
        );
    }

    /* ---------- Words that belong to one stored topic ---------- */

    function wikiItemVocabulary(item) {
        const set = new Set();
        [item.topic, ...(item.keywords || []), ...(item.relatedKeywords || [])]
            .forEach(phrase => getTokens(phrase).forEach(t => set.add(t)));
        return set;
    }

    /* ---------- Did the notes REALLY answer this question? ---------- */

    function wikiNotesAnsweredWell(question, localAnswer) {

        /* Things the app handles itself: always keep the original reply */
        const ownJobs = [
            isJokeRequest, isFunFactRequest, isMotivationRequest,
            isFinancialStatementRequest, isEssayRequest,
            isTopicListRequest, isExampleRequest
        ];
        for (const check of ownJobs) {
            try {
                if (check(question)) return true;
            } catch (e) { /* ignore */ }
        }

        /* Only judge answers that came from a stored topic */
        const topicName = lastConversationState && lastConversationState.topic;
        const item = topicName ? findTopicByName(topicName) : null;
        if (!item || !localAnswer.includes(escapeHtml(item.topic))) return true;

        const terms = wikiContentTerms(question);
        if (!terms.length) return true;

        const vocabSet = wikiItemVocabulary(item);
        const vocabList = Array.from(vocabSet);
        const known = terms.filter(t => wikiTermKnown(t, vocabSet, vocabList)).length;

        return (known / terms.length) >= wikiConfig.minCoverage;
    }

    /* ---------- Network helper ---------- */

    async function wikiFetchJson(url) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), wikiConfig.timeoutMs);
        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error("HTTP " + response.status);
            return await response.json();
        } finally {
            clearTimeout(timer);
        }
    }

    /* ---------- Find the best Wikipedia page ---------- */

    async function wikiLookup(question) {
        const query = wikiCleanQuery(question);
        if (!query) return null;

        const queryTerms = wikiContentTerms(query);
        if (!queryTerms.length) return null;

        const base = `https://${wikiConfig.lang}.wikipedia.org`;

        const searchUrl =
            `${base}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}` +
            `&srlimit=3&format=json&origin=*`;
        const searchData = await wikiFetchJson(searchUrl);
        const hits = (searchData && searchData.query && searchData.query.search) || [];

        for (const hit of hits) {
            const summaryUrl = `${base}/api/rest_v1/page/summary/${encodeURIComponent(hit.title.replace(/ /g, "_"))}`;

            let summary;
            try {
                summary = await wikiFetchJson(summaryUrl);
            } catch (e) {
                continue;
            }

            if (!summary || !summary.extract || summary.type === "disambiguation") continue;

            /* The page must actually be about what was asked */
            const haystack = (summary.title + " " + summary.extract).toLowerCase();
            const related = queryTerms.some(t => haystack.includes(t.replace(/(es|s)$/, "")));
            if (!related) continue;

            return {
                title: summary.title || hit.title,
                extract: summary.extract,
                description: summary.description || "",
                thumbnail: summary.thumbnail && summary.thumbnail.source ? summary.thumbnail.source : ""
            };
        }

        return null;
    }

    /* ---------- Show the Wikipedia answer ---------- */

    function wikiFormat(result) {
        let html = `<h2>${escapeHtml(result.title)}</h2>`;
        if (result.description) {
            html += `<p><em>${escapeHtml(result.description)}</em></p>`;
        }
        if (result.thumbnail) {
            html += `<p><img src="${escapeHtml(result.thumbnail)}" alt="${escapeHtml(result.title)}" style="max-width:180px; border-radius:8px;"></p>`;
        }
        html += `<p>${escapeHtml(result.extract)}</p>`;
        return html;
    }

    function wikiFillSlot(slotId, html, tries) {
        const slot = document.getElementById(slotId);
        if (slot) {
            slot.innerHTML = html;
            requestAnimationFrame(() => { chatArea.scrollTop = chatArea.scrollHeight; });
            return;
        }
        /* the message may not be on screen yet, so wait briefly */
        if ((tries || 0) < 40) {
            setTimeout(() => wikiFillSlot(slotId, html, (tries || 0) + 1), 100);
        }
    }

    /* =========================================================
       EXTRA FREE SOURCES (all work without an account or key)
       - math.js ........ calculations the notes cannot do
       - Frankfurter .... currency conversion
       - World Bank ..... GDP, inflation, unemployment by country
       - REST Countries . capital, population, currency, languages
       - Dictionary ..... word meanings (dictionaryapi.dev, then Wiktionary)
       - Simple English Wikipedia, Wikibooks, Wikiversity, Wikidata
         (tried when normal Wikipedia finds nothing)
    ========================================================= */

    async function wikiFetchText(url) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), wikiConfig.timeoutMs);
        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error("HTTP " + response.status);
            return await response.text();
        } finally {
            clearTimeout(timer);
        }
    }

    function wikiSimplify(text) {
        return String(text || "").toLowerCase().replace(/[’']/g, "").replace(/[?!.]+$/g, "").replace(/\s+/g, " ").trim();
    }

    function wikiNumber(value, decimals) {
        return Number(value).toLocaleString("en-GB", {
            minimumFractionDigits: decimals || 0,
            maximumFractionDigits: decimals || 0
        });
    }

    /* ---------- 1) Maths (math.js) ---------- */

    function wikiMathExpression(question) {
        let t = String(question || "").toLowerCase()
            .replace(/\b(what is|whats|calculate|solve|work out|compute|equals|how much is)\b/g, " ")
            .replace(/[?=]/g, " ")
            .trim();

        t = t.replace(/(\d)\s*[x×]\s*(?=\d)/g, "$1*").replace(/÷/g, "/");
        t = t.replace(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/g, "($1/100)*$2");

        if (!/^[\d\s+\-*/().%^]+$/.test(t)) return null;
        if (!/\d/.test(t) || !/[+\-*/^%]/.test(t)) return null;
        return t.trim();
    }

    async function wikiMath(expression) {
        const text = (await wikiFetchText("https://api.mathjs.org/v4/?expr=" + encodeURIComponent(expression))).trim();
        const number = Number(text);
        if (!text || (isNaN(number) && !/^[\d\s.,e+\-]+$/i.test(text))) return null;

        const shown = isFinite(number) ? String(parseFloat(number.toPrecision(12))) : text;
        return `<p><strong>${escapeHtml(expression)} = ${escapeHtml(shown)}</strong></p>`;
    }

    /* ---------- 2) Currency (Frankfurter) ---------- */

    const wikiCurrencyNames = {
        rand: "ZAR", rands: "ZAR", zar: "ZAR",
        dollar: "USD", dollars: "USD", usd: "USD", "us dollar": "USD", "us dollars": "USD",
        euro: "EUR", euros: "EUR", eur: "EUR",
        pound: "GBP", pounds: "GBP", gbp: "GBP",
        yen: "JPY", jpy: "JPY",
        yuan: "CNY", rmb: "CNY", cny: "CNY",
        rupee: "INR", rupees: "INR", inr: "INR",
        aud: "AUD", cad: "CAD", chf: "CHF", nzd: "NZD", brl: "BRL", mxn: "MXN",
        sgd: "SGD", sek: "SEK", nok: "NOK", dkk: "DKK", pln: "PLN", try: "TRY",
        krw: "KRW", thb: "THB", hkd: "HKD", idr: "IDR", myr: "MYR", php: "PHP"
    };

    function wikiCurrencyCode(word) {
        return wikiCurrencyNames[String(word || "").toLowerCase()] || null;
    }

    async function wikiTryCurrency(question) {
        const text = wikiSimplify(question);
        const names = Object.keys(wikiCurrencyNames).sort((a, b) => b.length - a.length).join("|");
        const pattern = new RegExp(
            "(?:(\\d[\\d\\s,]*(?:\\.\\d+)?)\\s*)?\\b(" + names + ")\\b\\s*(?:to|in|into|=|vs)\\s*\\b(" + names + ")\\b"
        );
        const m = text.match(pattern);
        if (!m) return null;

        const from = wikiCurrencyCode(m[2]);
        const to = wikiCurrencyCode(m[3]);
        const amount = m[1] ? parseFloat(m[1].replace(/[\s,]/g, "")) : 1;
        if (!from || !to || from === to || !isFinite(amount)) return null;

        let data = null;
        const urls = [
            `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
            `https://api.frankfurter.app/latest?from=${from}&to=${to}`
        ];
        for (const url of urls) {
            try { data = await wikiFetchJson(url); if (data && data.rates && data.rates[to]) break; } catch (e) { data = null; }
        }
        if (!data || !data.rates || !data.rates[to]) return null;

        const rate = data.rates[to];
        return `
            <h2>Currency conversion</h2>
            <p><strong>${wikiNumber(amount, 2)} ${from} = ${wikiNumber(amount * rate, 2)} ${to}</strong></p>
            <p>Rate: 1 ${from} = ${wikiNumber(rate, 4)} ${to}${data.date ? " (" + escapeHtml(data.date) + ")" : ""}</p>
        `;
    }

    /* ---------- Country helpers (REST Countries) ---------- */

    const wikiCountryAliases = {
        "usa": "United States", "america": "United States", "united states of america": "United States",
        "uk": "United Kingdom", "britain": "United Kingdom", "great britain": "United Kingdom",
        "drc": "DR Congo", "ivory coast": "Ivory Coast", "swaziland": "Eswatini"
    };

    const wikiCountryNames = [
        "south africa", "nigeria", "kenya", "zimbabwe", "botswana", "namibia", "mozambique", "zambia",
        "angola", "eswatini", "lesotho", "malawi", "tanzania", "uganda", "ethiopia", "ghana", "egypt",
        "morocco", "algeria", "senegal", "rwanda", "china", "india", "japan", "germany", "france",
        "italy", "spain", "brazil", "argentina", "canada", "australia", "russia", "mexico",
        "united states", "united kingdom", "usa", "uk", "america", "britain", "turkey", "saudi arabia",
        "nigeria", "indonesia", "pakistan", "bangladesh", "netherlands", "sweden", "norway", "switzerland"
    ];

    async function wikiRestCountry(name) {
        const clean = wikiSimplify(name).replace(/^the\s+/, "");
        if (!clean || clean.length < 3) return null;
        const searchName = wikiCountryAliases[clean] || clean;

        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(searchName)}` +
            `?fields=name,cca2,capital,population,currencies,languages,region`;
        const list = await wikiFetchJson(url);
        if (!Array.isArray(list) || !list.length) return null;

        const lower = searchName.toLowerCase();
        const exact = list.find(c =>
            (c.name && c.name.common && c.name.common.toLowerCase() === lower) ||
            (c.name && c.name.official && c.name.official.toLowerCase() === lower)
        );
        return exact || (list.length === 1 ? list[0] : null);
    }

    /* Find a country name inside a question */
    function wikiFindCountryName(text) {
        const known = wikiCountryNames.slice().sort((a, b) => b.length - a.length)
            .find(n => new RegExp("\\b" + n + "\\b").test(text));
        if (known) return known;

        const m = text.match(
            /\b(?:in|of|for)\s+(?:the\s+)?([a-z][a-z .'-]*?)(?=\s+(?:in|for|during)\s+(?:19|20)\d{2}|\s+(?:19|20)\d{2}|\s*$)/
        );
        return m ? m[1].trim() : null;
    }

    /* ---------- 3) Country facts ---------- */

    async function wikiTryCountryFact(question) {
        const text = wikiSimplify(question);
        const m = text.match(/\b(capital|population|currency|currencies|official languages?|languages?|continent)\b.*?\b(?:of|in)\s+(?:the\s+)?([a-z][a-z .'-]*)$/);
        if (!m) return null;

        const country = await wikiRestCountry(m[2]);
        if (!country) return null;

        const currencies = country.currencies
            ? Object.values(country.currencies).map(c => c.name + (c.symbol ? " (" + c.symbol + ")" : "")).join(", ")
            : "";
        const languages = country.languages ? Object.values(country.languages).join(", ") : "";

        let html = `<h2>${escapeHtml(country.name.common)}</h2><ul>`;
        if (country.capital && country.capital.length) html += `<li><strong>Capital:</strong> ${escapeHtml(country.capital.join(", "))}</li>`;
        if (country.population) html += `<li><strong>Population:</strong> ${wikiNumber(country.population)}</li>`;
        if (currencies) html += `<li><strong>Currency:</strong> ${escapeHtml(currencies)}</li>`;
        if (languages) html += `<li><strong>Languages:</strong> ${escapeHtml(languages)}</li>`;
        if (country.region) html += `<li><strong>Region:</strong> ${escapeHtml(country.region)}</li>`;
        return html + `</ul>`;
    }

    /* ---------- 4) Economic figures (World Bank) ---------- */

    const wikiIndicators = [
        { re: /population growth/, code: "SP.POP.GROW", label: "Population growth", type: "pct" },
        { re: /life expectancy/, code: "SP.DYN.LE00.IN", label: "Life expectancy at birth", type: "years" },
        { re: /literacy/, code: "SE.ADT.LITR.ZS", label: "Adult literacy rate", type: "pct" },
        { re: /\bgini\b/, code: "SI.POV.GINI", label: "Gini index (0 = equality, 100 = inequality)", type: "num1" },
        { re: /poverty/, code: "SI.POV.DDAY", label: "Poverty headcount ratio (international poverty line)", type: "pct" },
        { re: /government debt|public debt|debt to gdp|national debt/, code: "GC.DOD.TOTL.GD.ZS", label: "Central government debt (% of GDP)", type: "pct" },
        { re: /lending (interest )?rate|interest rate/, code: "FR.INR.LEND", label: "Lending interest rate", type: "pct" },
        { re: /tax revenue/, code: "GC.TAX.TOTL.GD.ZS", label: "Tax revenue (% of GDP)", type: "pct" },
        { re: /foreign direct investment|\bfdi\b/, code: "BX.KLT.DINV.WD.GD.ZS", label: "Foreign direct investment, net inflows (% of GDP)", type: "pct" },
        { re: /current account/, code: "BN.CAB.XOKA.GD.ZS", label: "Current account balance (% of GDP)", type: "pct" },
        { re: /labour force participation|labor force participation/, code: "SL.TLF.CACT.ZS", label: "Labour force participation rate", type: "pct" },
        { re: /education (spending|expenditure)/, code: "SE.XPD.TOTL.GD.ZS", label: "Government education spending (% of GDP)", type: "pct" },
        { re: /health (spending|expenditure)/, code: "SH.XPD.CHEX.GD.ZS", label: "Health spending (% of GDP)", type: "pct" },
        { re: /trade (openness|to gdp)|trade as a percentage/, code: "NE.TRD.GNFS.ZS", label: "Trade (% of GDP)", type: "pct" },
        { re: /\bexports\b/, code: "NE.EXP.GNFS.ZS", label: "Exports of goods and services (% of GDP)", type: "pct" },
        { re: /\bimports\b/, code: "NE.IMP.GNFS.ZS", label: "Imports of goods and services (% of GDP)", type: "pct" },
        { re: /official exchange rate|exchange rate/, code: "PA.NUS.FCRF", label: "Official exchange rate (local currency per US$)", type: "num2" },
        { re: /gdp growth|economic growth( rate)?|growth rate/, code: "NY.GDP.MKTP.KD.ZG", label: "GDP growth", type: "pct" },
        { re: /gdp per capita/, code: "NY.GDP.PCAP.CD", label: "GDP per capita", type: "usd" },
        { re: /\bgdp\b|gross domestic product/, code: "NY.GDP.MKTP.CD", label: "GDP", type: "usdBig" },
        { re: /\binflation\b|\bcpi\b/, code: "FP.CPI.TOTL.ZG", label: "Inflation (consumer prices, annual)", type: "pct" },
        { re: /unemployment/, code: "SL.UEM.TOTL.ZS", label: "Unemployment rate", type: "pct" },
        { re: /\bpopulation\b/, code: "SP.POP.TOTL", label: "Population", type: "pop" }
    ];

    function wikiFormatIndicator(type, value) {
        if (type === "pct") return wikiNumber(value, 1) + "%";
        if (type === "years") return wikiNumber(value, 1) + " years";
        if (type === "num1") return wikiNumber(value, 1);
        if (type === "num2") return wikiNumber(value, 2);
        if (type === "pop") return wikiNumber(value, 0);
        if (type === "usd") return "US$ " + wikiNumber(value, 0);
        if (value >= 1e12) return "US$ " + wikiNumber(value / 1e12, 2) + " trillion";
        if (value >= 1e9) return "US$ " + wikiNumber(value / 1e9, 2) + " billion";
        return "US$ " + wikiNumber(value, 0);
    }

    /* every country named in the question (up to 3), so "compare" questions work */
    function wikiFindCountries(text) {
        const found = [];
        wikiCountryNames.slice().sort((a, b) => b.length - a.length).forEach(n => {
            if (new RegExp("\\b" + n + "\\b").test(text) && !found.some(f => f.includes(n) || n.includes(f))) found.push(n);
        });
        if (!found.length) {
            const one = wikiFindCountryName(text);
            if (one) found.push(one);
        }
        return found.slice(0, 3);
    }

    async function wikiTryWorldBank(question) {
        const text = wikiSimplify(question);

        /* "why / causes / essay" questions are for the notes, not for statistics */
        if (/\b(cause|causes|effect|effects|impact|essay|why|advantages|disadvantages|types|solutions|reasons|formula|define|definition|explain)\b/.test(text)) return null;

        const indicator = wikiIndicators.find(i => i.re.test(text));
        if (!indicator) return null;

        const names = wikiFindCountries(text);
        if (!names.length) return null;

        const yearMatch = text.match(/\b((?:19|20)\d{2})\b/);
        const lines = [];

        for (const name of names) {
            try {
                const country = await wikiRestCountry(name);
                if (!country || !country.cca2) continue;

                const url = `https://api.worldbank.org/v2/country/${country.cca2}/indicator/${indicator.code}?format=json` +
                    (yearMatch ? `&date=${yearMatch[1]}` : `&mrnev=1`);
                const data = await wikiFetchJson(url);
                const row = data && data[1] && data[1][0];
                if (!row || row.value === null || row.value === undefined) continue;

                lines.push({ country: country.name.common, value: wikiFormatIndicator(indicator.type, row.value), year: row.date });
            } catch (e) { /* skip this country */ }
        }
        if (!lines.length) return null;

        let html = `<h2>${escapeHtml(indicator.label)}</h2>`;
        if (lines.length === 1) {
            html = `<h2>${escapeHtml(lines[0].country)}: ${escapeHtml(indicator.label)}</h2>` +
                   `<p><strong>${escapeHtml(lines[0].value)}</strong> (${escapeHtml(lines[0].year)})</p>`;
        } else {
            html += `<ul>` + lines.map(l => `<li><strong>${escapeHtml(l.country)}:</strong> ${escapeHtml(l.value)} (${escapeHtml(l.year)})</li>`).join("") + `</ul>`;
        }
        return html + `<p><em>World Bank data</em></p>`;
    }

    /* ---------- 5) Word meanings (dictionary, then Wiktionary) ---------- */

    async function wikiTryDictionary(question) {
        const text = wikiSimplify(question);
        const m = text.match(
            /^(?:what does|what do|what is the meaning of|what is the definition of|definition of|meaning of|define)\s+(?:the word\s+)?"?([a-z]{3,})"?(?:\s+mean)?$/
        );
        if (!m) return null;
        const word = m[1];

        /* dictionaryapi.dev */
        try {
            const data = await wikiFetchJson("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word));
            if (Array.isArray(data) && data[0] && data[0].meanings && data[0].meanings.length) {
                let html = `<h2>${escapeHtml(data[0].word || word)}</h2>`;
                data[0].meanings.slice(0, 3).forEach(meaning => {
                    const def = meaning.definitions && meaning.definitions[0];
                    if (!def) return;
                    html += `<p><em>${escapeHtml(meaning.partOfSpeech || "")}</em>: ${escapeHtml(def.definition)}</p>`;
                    if (def.example) html += `<p>Example: ${escapeHtml(def.example)}</p>`;
                });
                return html;
            }
        } catch (e) { /* try Wiktionary next */ }

        /* Wiktionary */
        try {
            const data = await wikiFetchJson("https://en.wiktionary.org/api/rest_v1/page/definition/" + encodeURIComponent(word));
            const entries = data && data.en;
            if (entries && entries.length) {
                let html = `<h2>${escapeHtml(word)}</h2>`;
                entries.slice(0, 3).forEach(entry => {
                    const def = entry.definitions && entry.definitions[0];
                    if (!def) return;
                    const plain = String(def.definition || "").replace(/<[^>]+>/g, "").trim();
                    if (plain) html += `<p><em>${escapeHtml(entry.partOfSpeech || "")}</em>: ${escapeHtml(plain)}</p>`;
                });
                if (html.includes("<p>")) return html;
            }
        } catch (e) { /* nothing */ }

        return null;
    }

    /* ---------- 6) Other Wikimedia sources + Wikidata ---------- */

    async function wikiMediaSearch(host, query, queryTerms) {
        const url =
            `https://${host}/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}` +
            `&gsrlimit=3&prop=extracts&exintro=1&explaintext=1&exlimit=max&exchars=700&format=json&origin=*`;
        const data = await wikiFetchJson(url);
        const pages = data && data.query && data.query.pages ? Object.values(data.query.pages) : [];
        pages.sort((a, b) => (a.index || 0) - (b.index || 0));

        for (const page of pages) {
            const extract = String(page.extract || "").trim();
            if (extract.length < 80) continue;

            const haystack = (page.title + " " + extract).toLowerCase();
            if (!queryTerms.some(t => haystack.includes(t.replace(/(es|s)$/, "")))) continue;

            return { title: page.title, extract: extract, description: "", thumbnail: "" };
        }
        return null;
    }

    async function wikiWikidata(query, queryTerms) {
        const url =
            `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}` +
            `&language=en&format=json&origin=*&limit=3`;
        const data = await wikiFetchJson(url);
        const hits = (data && data.search) || [];

        for (const hit of hits) {
            if (!hit.label || !hit.description) continue;
            const label = hit.label.toLowerCase();
            if (!queryTerms.some(t => label.includes(t.replace(/(es|s)$/, "")))) continue;

            const description = hit.description.charAt(0).toUpperCase() + hit.description.slice(1);
            return { title: hit.label, extract: description + ".", description: "", thumbnail: "" };
        }
        return null;
    }

    /* ---------- 7) Current office holders (Wikidata: president, prime minister, king...) ---------- */

    function wikiCurrentHolderIds(claims) {
        return (claims || [])
            .filter(c => c.rank !== "deprecated" &&
                !(c.qualifiers && c.qualifiers.P582) &&                    /* P582 = end time: skip former holders */
                c.mainsnak && c.mainsnak.datavalue && c.mainsnak.datavalue.value && c.mainsnak.datavalue.value.id)
            .sort((a, b) => (b.rank === "preferred") - (a.rank === "preferred"))
            .map(c => c.mainsnak.datavalue.value.id);
    }

    async function wikiTryOfficeHolder(question) {
        const text = wikiSimplify(question);
        const role = text.match(/\b(president|prime minister|head of state|head of government|king|queen|monarch|chancellor|leader|ruler)\b/);
        if (!role || !/\b(who|current|currently|now|today|name)\b/.test(text)) return null;

        const countryName = wikiFindCountryName(text);
        if (!countryName) return null;
        const search = wikiCountryAliases[countryName.replace(/^the\s+/, "")] || countryName.replace(/^the\s+/, "");

        const found = await wikiFetchJson(
            `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(search)}` +
            `&language=en&format=json&origin=*&limit=5`);
        const country = ((found && found.search) || []).find(h =>
            /country|sovereign state|republic|kingdom|nation|monarchy|state in/i.test(h.description || ""));
        if (!country) return null;

        const ent = await wikiFetchJson(
            `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${country.id}&props=claims&format=json&origin=*`);
        const claims = ent && ent.entities && ent.entities[country.id] && ent.entities[country.id].claims;
        if (!claims) return null;

        const stateIds = wikiCurrentHolderIds(claims.P35);      /* head of state */
        const govIds = wikiCurrentHolderIds(claims.P6);         /* head of government */

        const wantState = /president|king|queen|monarch|head of state|leader|ruler/.test(role[1]);
        const wantGov = /prime minister|chancellor|head of government|leader/.test(role[1]);
        const sameHolder = !!stateIds[0] && stateIds[0] === govIds[0];      /* e.g. South Africa: one person is both */
        const showGov = wantGov || (wantState && sameHolder);
        const ids = [...new Set([].concat(wantState ? stateIds.slice(0, 1) : [], showGov ? govIds.slice(0, 1) : []))];
        if (!ids.length) return null;

        const lab = await wikiFetchJson(
            `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids.join("|")}&props=labels&languages=en&format=json&origin=*`);
        const nameOf = id => lab && lab.entities && lab.entities[id] && lab.entities[id].labels && lab.entities[id].labels.en
            ? lab.entities[id].labels.en.value : null;

        let html = `<h2>${escapeHtml(country.label)}</h2>`;
        const state = wantState && stateIds[0] ? nameOf(stateIds[0]) : null;
        const gov = showGov && govIds[0] ? nameOf(govIds[0]) : null;

        if (state && gov && stateIds[0] === govIds[0]) {
            html += `<p><strong>Head of state and head of government:</strong> ${escapeHtml(state)}</p>`;
        } else {
            if (state) html += `<p><strong>Head of state:</strong> ${escapeHtml(state)}</p>`;
            if (gov) html += `<p><strong>Head of government:</strong> ${escapeHtml(gov)}</p>`;
        }
        if (!state && !gov) return null;

        return html;
    }

    /* ---------- 8) Live weather and local time (Open-Meteo, no key needed) ---------- */

    const wikiWeatherCodes = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Freezing fog",
        51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain",
        71: "Light snow", 73: "Snow", 75: "Heavy snow", 80: "Rain showers", 81: "Rain showers", 82: "Violent rain showers",
        95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with heavy hail"
    };

    async function wikiGeocode(place) {
        const name = String(place || "").trim();
        if (name.length < 2) return null;
        const data = await wikiFetchJson(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json`);
        return data && data.results && data.results[0] ? data.results[0] : null;
    }

    async function wikiTryWeather(question) {
        const text = wikiSimplify(question);
        if (!/\b(weather|temperature|forecast|raining)\b/.test(text)) return null;

        const m = text.match(/\b(?:in|at|for|of)\s+([a-z][a-z .'-]*?)(?:\s+(?:today|now|right now|tomorrow|currently))?$/);
        if (!m) return null;

        const geo = await wikiGeocode(m[1]);
        if (!geo) return null;

        const data = await wikiFetchJson(
            `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}` +
            `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
            `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=2`);
        const c = data && data.current;
        if (!c) return null;

        const d = data.daily || {};
        let html = `<h2>Weather in ${escapeHtml(geo.name)}${geo.country ? ", " + escapeHtml(geo.country) : ""}</h2>`;
        html += `<p><strong>${wikiNumber(c.temperature_2m, 1)}°C</strong> - ${escapeHtml(wikiWeatherCodes[c.weather_code] || "Current conditions")}</p>`;
        html += `<p>Feels like ${wikiNumber(c.apparent_temperature, 1)}°C | Humidity ${wikiNumber(c.relative_humidity_2m)}% | Wind ${wikiNumber(c.wind_speed_10m, 1)} km/h</p>`;
        if (d.temperature_2m_max && d.temperature_2m_min) {
            html += `<p>Today: ${wikiNumber(d.temperature_2m_min[0], 0)}°C to ${wikiNumber(d.temperature_2m_max[0], 0)}°C`;
            if (d.precipitation_probability_max) html += `, rain chance ${wikiNumber(d.precipitation_probability_max[0])}%`;
            html += `</p>`;
            if (d.temperature_2m_max.length > 1) {
                html += `<p>Tomorrow: ${wikiNumber(d.temperature_2m_min[1], 0)}°C to ${wikiNumber(d.temperature_2m_max[1], 0)}°C</p>`;
            }
        }
        return html + `<p><em>Live data from Open-Meteo.</em></p>`;
    }

    async function wikiTryTime(question) {
        const text = wikiSimplify(question);
        const m = text.match(/\btime\b.*?\b(?:in|at)\s+([a-z][a-z .'-]*)$/);
        if (!m) return null;

        const geo = await wikiGeocode(m[1]);
        if (!geo || !geo.timezone) return null;

        const shown = new Intl.DateTimeFormat("en-ZA", {
            timeZone: geo.timezone, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false
        }).format(new Date());

        return `<h2>Time in ${escapeHtml(geo.name)}${geo.country ? ", " + escapeHtml(geo.country) : ""}</h2>` +
               `<p><strong>${escapeHtml(shown)}</strong></p><p><em>Time zone: ${escapeHtml(geo.timezone)}</em></p>`;
    }

    /* ---------- 9) Web search (Google Programmable Search) and live news (GDELT) ----------
       Web search needs your own free Google key (see mcSearch below). Without it, this
       source is skipped. The AI proxy (mcAI.endpoint) does its own, better web search. */

    const mcSearch = {
        google: {
            key: "",     /* API key from Google Cloud - restrict it to your website address (HTTP referrers) */
            cx: ""       /* Search engine ID from programmablesearchengine.google.com ("search the entire web") */
        },
        brave: {
            endpoint: ""  /* URL of YOUR proxy that holds the Brave key (see mastercommerce-proxy.js). Never put the key here. */
        },
        news: true       /* free news search through GDELT (no key); turn off with false */
    };

    function wikiLinkList(items) {
        let html = "<ul>";
        items.forEach(it => {
            if (!it.link || !/^https?:\/\//i.test(it.link)) return;
            html += `<li style="margin-bottom:8px;"><strong>${escapeHtml(it.title)}</strong>` +
                    (it.snippet ? `<br>${escapeHtml(it.snippet)}` : "") +
                    `<br><a href="${escapeHtml(it.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(it.source || it.link)}</a></li>`;
        });
        return html + "</ul>";
    }

    async function wikiTryWebSearch(question) {
        if (!mcSearch.google.key || !mcSearch.google.cx) return null;

        const q = wikiCleanQuery(question) || question;
        const data = await wikiFetchJson(
            `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(mcSearch.google.key)}` +
            `&cx=${encodeURIComponent(mcSearch.google.cx)}&q=${encodeURIComponent(q)}&num=5`);

        const items = ((data && data.items) || []).map(i => ({
            title: i.title, snippet: String(i.snippet || "").replace(/\s+/g, " ").trim(), link: i.link, source: i.displayLink
        }));
        if (!items.length) return null;

        return `<h2>Web results</h2>${wikiLinkList(items)}<p><em>Search results - check the sources before relying on them.</em></p>`;
    }

    async function wikiTryNews(question) {
        if (!mcSearch.news) return null;
        const text = wikiSimplify(question);
        if (!/\b(news|headlines?|latest|breaking|happened|this week)\b/.test(text)) return null;

        const q = wikiCleanQuery(question)
            .replace(/\b(latest|news|headlines?|breaking|about|on|today|this week|what happened|what is|whats|the|in)\b/gi, " ")
            .replace(/\s+/g, " ").trim();
        if (q.length < 3) return null;

        const data = await wikiFetchJson(
            `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(q)}&mode=artlist&maxrecords=5&format=json&sort=datedesc`);

        const articles = (data && data.articles) || [];
        const items = articles.map(a => ({
            title: a.title, link: a.url, source: (a.domain || "") + (a.seendate ? " - " + a.seendate.slice(0, 4) + "-" + a.seendate.slice(4, 6) + "-" + a.seendate.slice(6, 8) : "")
        }));
        if (!items.length) return null;

        return `<h2>Latest news: ${escapeHtml(q)}</h2>${wikiLinkList(items)}<p><em>Headlines from GDELT.</em></p>`;
    }

    /* ---------- DuckDuckGo Instant Answers (free, no key) ----------
       Short topic summaries, definitions and quick answers. It is NOT a full web search:
       deep questions often come back empty, and then the next source is tried. */

    function wikiJsonp(url, timeoutMs) {
        return new Promise((resolve, reject) => {
            const name = "mcJsonp" + Date.now() + Math.floor(Math.random() * 1000);
            const script = document.createElement("script");
            const done = () => { clearTimeout(timer); delete window[name]; if (script.parentNode) script.parentNode.removeChild(script); };
            const timer = setTimeout(() => { done(); reject(new Error("timeout")); }, timeoutMs || wikiConfig.timeoutMs);
            window[name] = data => { done(); resolve(data); };
            script.onerror = () => { done(); reject(new Error("blocked")); };
            script.src = url + "&callback=" + name;
            document.head.appendChild(script);
        });
    }

    async function wikiTryDuckDuckGo(question) {
        const q = wikiCleanQuery(question) || question;
        if (String(q).trim().length < 2) return null;

        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1&t=mastercommerce`;
        let data = null;
        try { data = await wikiFetchJson(url); }
        catch (e) { data = await wikiJsonp(url); }           /* if the browser blocks the normal request, use JSONP */
        if (!data) return null;

        const answer = String(data.Answer || "").trim();
        const abstract = String(data.AbstractText || "").trim();
        const definition = String(data.Definition || "").trim();

        let html = "";
        if (answer) html += `<p><strong>${escapeHtml(answer)}</strong></p>`;
        if (abstract) {
            if (data.Heading) html = `<h2>${escapeHtml(data.Heading)}</h2>` + html;
            html += `<p>${escapeHtml(abstract)}</p>`;
            if (data.AbstractURL && /^https?:\/\//i.test(data.AbstractURL)) {
                html += `<p><a href="${escapeHtml(data.AbstractURL)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.AbstractSource || "Source")}</a></p>`;
            }
        } else if (definition) {
            html += `<p>${escapeHtml(definition)}</p>`;
            if (data.DefinitionURL && /^https?:\/\//i.test(data.DefinitionURL)) {
                html += `<p><a href="${escapeHtml(data.DefinitionURL)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.DefinitionSource || "Source")}</a></p>`;
            }
        }

        if (!html) {
            const topics = (data.RelatedTopics || []).filter(t => t.Text && t.FirstURL && !/duckduckgo\.com\/c\//.test(t.FirstURL)).slice(0, 4);
            if (!topics.length) return null;
            html = `<h2>Related topics</h2>` + wikiLinkList(topics.map(t => ({ title: t.Text.split(" - ")[0], snippet: t.Text, link: t.FirstURL, source: "" })));
        }
        return html + `<p><em>Results from DuckDuckGo Instant Answers.</em></p>`;
    }

    /* ---------- Brave Search (needs your proxy: the Brave key must never be in this file) ---------- */

    async function wikiTryBrave(question) {
        if (!mcSearch.brave.endpoint) return null;

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), wikiConfig.timeoutMs);
        try {
            const res = await fetch(mcSearch.brave.endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: "brave", question: wikiCleanQuery(question) || question }),
                signal: controller.signal
            });
            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();
            const items = ((data && data.results) || []).map(r => ({ title: r.title, snippet: r.description, link: r.url, source: r.host || r.url }));
            if (!items.length) return null;
            return `<h2>Web results</h2>${wikiLinkList(items)}<p><em>Search results from Brave - check the sources before relying on them.</em></p>`;
        } finally {
            clearTimeout(timer);
        }
    }

    /* tries Brave, then Google, then DuckDuckGo; the first one with results wins */
    async function wikiTryAnySearch(question) {
        for (const source of [wikiTryBrave, wikiTryWebSearch, wikiTryDuckDuckGo]) {
            try {
                const html = await source(question);
                if (html) return html;
            } catch (e) { /* this provider failed: try the next */ }
        }
        return null;
    }

    /* ---------- The full lookup order ---------- */

    async function wikiResolve(question, mathExpression) {

        /* Pure calculations: only math.js, never Wikipedia */
        if (mathExpression) {
            try { return await wikiMath(mathExpression); } catch (e) { return null; }
        }

        /* Special-purpose sources (each returns null if the question is not theirs) */
        const specials = [wikiTryOfficeHolder, wikiTryWeather, wikiTryTime, wikiTryCurrency, wikiTryWorldBank, wikiTryCountryFact, wikiTryDictionary];
        for (const source of specials) {
            try {
                const html = await source(question);
                if (html) return html;
            } catch (e) { /* source down: move on */ }
        }

        /* Questions about "now" or records: news and web search come BEFORE Wikipedia */
        const askedAboutNow = /\b(latest|current|currently|today|right now|news|headlines?|this week|this year|recent|recently|who won|record|fastest|slowest|tallest|richest|largest|biggest|smallest|most expensive|cheapest|price of|how much does)\b/.test(wikiSimplify(question));
        if (askedAboutNow) {
            for (const source of [wikiTryNews, wikiTryAnySearch]) {
                try {
                    const html = await source(question);
                    if (html) return html;
                } catch (e) { /* move on */ }
            }
        }

        /* Never fail silently on "now" questions: say plainly when live search is not connected */
        const needsLive = /\b(latest|news|headlines?|today|right now|this week|recent|recently|who won|record|fastest|slowest|tallest|richest|largest|biggest|smallest|most expensive|cheapest|price of)\b/.test(wikiSimplify(question));
        const liveFallback = async () => {
            let html = null;
            try { html = await wikiTryAnySearch(question); } catch (e) { html = null; }
            if (html) return html;
            if (!needsLive) return null;

            const connected = !!mcSearch.google.key || !!mcSearch.brave.endpoint || (typeof mcAI !== "undefined" && !!mcAI.endpoint);
            return connected
                ? `<p>I searched but could not find a reliable result for that. Try rephrasing the question.</p>`
                : `<h2>Live search is not connected</h2>` +
                  `<p>This question needs current information from the internet, and web search has not been set up in this app yet.</p>` +
                  `<p>To turn it on, add a Google or Brave search setting in <strong>mcSearch</strong> or connect the AI proxy in <strong>mcAI.endpoint</strong> (inside script.js).</p>`;
        };

        /* Wikipedia */
        try {
            const result = await wikiLookup(question);
            if (result) return wikiFormat(result);
        } catch (e) { /* move on */ }

        /* Simple English, Wikibooks, Wikiversity and Wikidata (in parallel) */
        const query = wikiCleanQuery(question);
        const queryTerms = wikiContentTerms(query);
        if (!query || !queryTerms.length) {
            return await liveFallback();
        }

        const attempts = await Promise.all([
            wikiMediaSearch("simple.wikipedia.org", query, queryTerms).catch(() => null),
            wikiMediaSearch("en.wikibooks.org", query, queryTerms).catch(() => null),
            wikiMediaSearch("en.wikiversity.org", query, queryTerms).catch(() => null),
            wikiWikidata(query, queryTerms).catch(() => null)
        ]);

        const found = attempts.find(Boolean);
        if (found) return wikiFormat(found);

        /* nothing in the encyclopaedias: last resort is a real web search (if a key is set) */
        return await liveFallback();
    }

    /* ---------- Wrap the existing generateAnswer (original kept intact) ---------- */

    const originalGenerateAnswer = generateAnswer;

    generateAnswer = function (question) {

        const forced = wikiWantsLookup(question);
        const localAnswer = originalGenerateAnswer(question);

        const localFailed =
            isFallbackAnswer(localAnswer) ||
            localAnswer.includes("I don't have that one in my study notes") ||
            localAnswer.includes("I'm not 100% sure what you meant");

        const mathExpression = wikiMathExpression(question);

        /* The notes already answered it properly: nothing more to do */
        if (!forced) {
            if (mathExpression) {
                /* keep the app's own calculator result if it produced one */
                let ownCalc = null;
                try { ownCalc = simpleCalculator(question); } catch (e) { ownCalc = null; }
                if (ownCalc) return localAnswer;
            }
            if (!mathExpression && !localFailed && wikiNotesAnsweredWell(question, localAnswer)) return localAnswer;
        }

        /* Offline: keep the original answer */
        if (typeof navigator !== "undefined" && navigator.onLine === false) {
            return localAnswer;
        }

        const slotId = "wikiSlot" + (++wikiSlotCounter);

        wikiResolve(question, mathExpression)
            .then(html => {
                /* Nothing found anywhere: quietly keep the original answer */
                wikiFillSlot(slotId, html || localAnswer);
            })
            .catch(() => {
                wikiFillSlot(slotId, localAnswer);
            });

        /* Looks exactly like the normal "Thinking" indicator */
        return `<div id="${slotId}"><div class="thinking"><span>Thinking</span><span class="thinking-dot"></span><span class="thinking-dot"></span><span class="thinking-dot"></span></div></div>`;
    };

    /* =========================================================
       END OF SMART BACKUP SOURCES
    ========================================================= */


    /* =========================================================
       DOCUMENT + WORD-PROBLEM UPGRADE (ADD-ON)
       Paste this block directly ABOVE the "LOAD SETTINGS"
       section (below "END OF SMART BACKUP SOURCES").
       Nothing existing is changed; it wraps generateAnswer.

       WHAT THIS DOES (locally, no AI needed):
       - Splits pasted documents into numbered questions/sub-questions
       - Reads marks, keeps order and numbering
       - Solves: linear/quadratic equations, WACC, VAT, gross profit
       - Answers "explain question 2", "answers only", "exam format",
         "continue"
       - Flags missing information instead of inventing it

       WHAT IT CANNOT DO WITHOUT AN AI MODEL:
       General subject understanding (science, English, history,
       essays, case studies). For that, set mcAI.endpoint to YOUR
       OWN backend proxy (the proxy holds the secret API key).
       API keys must never be placed in this file.
    ========================================================= */

    const mcAI = {
        endpoint: "",            /* your proxy URL, e.g. "https://mastercommerce-ai.yourname.workers.dev" (leave "" to stay free/offline-style) */
        timeoutMs: 60000
    };

    const mcBatchSize = 12;
    let mcDoc = { items: [], next: 0, raw: "" };

    /* ---------- number helpers ---------- */

    function mcNum(str) {
        const m = String(str).toLowerCase().replace(/r\s*(?=\d)/g, "").match(/(-?\d[\d\s,]*(?:\.\d+)?)\s*(billion|bn|million|m|thousand|k)?\b/);
        if (!m) return null;
        let v = parseFloat(m[1].replace(/[\s,]/g, ""));
        if (!isFinite(v)) return null;
        const u = m[2];
        if (u === "billion" || u === "bn") v *= 1e9;
        else if (u === "million" || u === "m") v *= 1e6;
        else if (u === "thousand" || u === "k") v *= 1e3;
        return v;
    }

    function mcPercents(clause) {
        const out = [];
        const re = /(\d+(?:\.\d+)?)\s*%/g;
        let m;
        while ((m = re.exec(clause))) out.push(parseFloat(m[1]));
        return out;
    }

    function mcMoney(clause) {
        const c = clause.replace(/\d+(?:\.\d+)?\s*%/g, " ");
        const re = /r?\s*\d[\d\s,]*(?:\.\d+)?\s*(?:billion|bn|million|m|thousand|k)?\b/gi;
        const found = [];
        let m;
        while ((m = re.exec(c))) {
            const v = mcNum(m[0]);
            if (v !== null) found.push(v);
        }
        return found;
    }

    const mcR = v => {
        const r = Math.round(v * 100) / 100, d = Number.isInteger(r) ? 0 : 2;
        return "R " + r.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/,/g, " ");
    };
    const mcP = v => Number(v.toFixed(2)) + "%";
    
    /* =========================================================
       EXTRA STUDY NOTES: Business Studies, Financial Management,
       more Accounting and more Economics topics.
       They join the same search engine as your existing notes.
    ========================================================= */

    const businessStudiesKnowledge = [
        { topic: "Business Environments", keywords: ["business environment", "micro environment", "market environment", "macro environment", "internal environment", "external environment"], relatedKeywords: ["pestle", "stakeholders", "competitors", "suppliers", "customers"],
          information: "A business operates in three environments: the micro (internal) environment, the market environment and the macro environment.",
          formulas: [],
          rules: ["Micro (internal): vision, mission, objectives, culture, resources and management - the business controls these.",
                  "Market: customers, competitors, suppliers, intermediaries and labour - the business can influence but not control them.",
                  "Macro (external): political, economic, social, technological, legal and environmental factors - the business cannot control them."],
          examples: ["A rise in the repo rate is a macro-economic factor; a new competitor opening nearby is a market factor."] },

        { topic: "PESTLE Analysis", keywords: ["pestle", "pest analysis", "pestel", "macro environment factors"], relatedKeywords: ["political", "economic", "social", "technological", "legal", "environmental"],
          information: "PESTLE analysis examines the macro-environment under six headings: Political, Economic, Social, Technological, Legal and Environmental.",
          formulas: [],
          rules: ["Political: government stability and policy, e.g. elections, regulation.", "Economic: interest rates, inflation, exchange rates, economic growth.", "Social: demographics, culture, lifestyle and attitudes.", "Technological: automation, internet, new production methods.", "Legal: legislation such as the Consumer Protection Act and labour laws.", "Environmental: climate change, pollution, sustainability requirements."],
          examples: ["Load shedding is often classed as a technological/economic factor affecting production."] },

        { topic: "SWOT Analysis", keywords: ["swot", "swot analysis", "strengths weaknesses opportunities threats"], relatedKeywords: ["strategy", "internal", "external"],
          information: "SWOT analysis evaluates a business's internal Strengths and Weaknesses and its external Opportunities and Threats.",
          formulas: [],
          rules: ["Strengths and weaknesses are internal factors the business can control.", "Opportunities and threats are external factors from the market and macro environments.", "Results are used to develop strategies that build on strengths and reduce threats."],
          examples: ["Strength: skilled workforce. Weakness: outdated machinery. Opportunity: new export market. Threat: new competitor."] },

        { topic: "Porter's Five Forces", keywords: ["porter", "porters five forces", "five forces", "competitive forces"], relatedKeywords: ["competition", "industry", "substitutes", "new entrants"],
          information: "Porter's Five Forces is a framework for analysing the competitiveness of an industry.",
          formulas: [],
          rules: ["Threat of new entrants.", "Bargaining power of suppliers.", "Bargaining power of buyers (customers).", "Threat of substitute products or services.", "Rivalry among existing competitors."],
          examples: [] },

        { topic: "Management Functions", keywords: ["management functions", "functions of management", "planning organising leading controlling", "polc", "fayol", "management"], relatedKeywords: ["manager", "planning", "organising", "leading", "controlling", "top management", "middle management", "supervisors"],
          information: "Management is the process of using resources effectively to achieve business objectives. The classic functions are planning, organising, leading (directing) and controlling.",
          formulas: [],
          rules: ["Planning: setting objectives and deciding how to achieve them.", "Organising: arranging resources, tasks and authority.", "Leading: motivating and guiding people towards objectives.", "Controlling: comparing actual results with plans and taking corrective action.", "Levels: top management (strategic), middle management (tactical), lower management/supervisors (operational)."],
          examples: [] },

        { topic: "Leadership Styles", keywords: ["leadership styles", "autocratic", "democratic", "laissez faire", "transformational", "transactional", "leadership"], relatedKeywords: ["leader", "decision making", "employees", "participation"],
          information: "A leadership style is the way a leader makes decisions and interacts with employees.",
          formulas: [],
          rules: ["Autocratic: the leader decides alone; fast but can demotivate staff.", "Democratic: employees participate in decisions; better motivation but slower.", "Laissez-faire: the leader gives staff freedom; works with skilled, self-motivated employees.", "Transformational: inspires change and a shared vision.", "Transactional: uses rewards and penalties to achieve set goals."],
          examples: ["In an emergency, an autocratic style is often most suitable because quick decisions are needed."] },

        { topic: "Motivation Theories", keywords: ["motivation", "maslow", "hierarchy of needs", "herzberg", "two factor theory", "theory x", "theory y", "mcgregor"], relatedKeywords: ["needs", "hygiene factors", "motivators", "employees", "job satisfaction"],
          information: "Motivation theories explain what drives employees to perform.",
          formulas: [],
          rules: ["Maslow's hierarchy: physiological, safety, social (belonging), esteem and self-actualisation needs; lower needs must be met before higher ones.", "Herzberg: hygiene factors (salary, conditions, job security) prevent dissatisfaction; motivators (recognition, achievement, responsibility) create satisfaction.", "McGregor Theory X: employees dislike work and need control. Theory Y: employees are self-motivated and seek responsibility."],
          examples: ["Offering promotion and recognition appeals to esteem needs in Maslow's hierarchy."] },

        { topic: "Forms of Ownership", keywords: ["forms of ownership", "sole proprietor", "sole proprietorship", "partnership business", "private company", "public company", "close corporation", "personal liability company", "non profit company", "state owned company", "cooperative", "co operative", "franchise"], relatedKeywords: ["liability", "continuity", "taxation", "capital", "companies act"],
          information: "Forms of ownership describe the legal structure of a business. Each differs in liability, continuity, capital, tax and control.",
          formulas: [],
          rules: ["Sole proprietor: one owner, unlimited personal liability, easy to start, limited capital.", "Partnership: 2 or more partners sharing profits and unlimited liability; ends if a partner leaves unless agreed otherwise.", "Private company ((Pty) Ltd): separate legal entity, limited liability, shares not offered to the public.", "Public company (Ltd): shares can be offered to the public and listed on a stock exchange.", "Personal liability company (Inc.): directors are jointly liable with the company for its debts.", "Non-profit company (NPC): formed for public benefit; profits are not distributed to members.", "State-owned company (SOC Ltd): owned by the government.", "Close corporations: no new ones can be registered since the Companies Act 71 of 2008 took effect; existing ones may continue.", "Co-operative: owned by members who share benefits (Co-operatives Act 14 of 2005).", "Franchise: a franchisee pays fees/royalties to use the franchisor's brand and system."],
          examples: [] },

        { topic: "Entrepreneurship and Business Plans", keywords: ["entrepreneur", "entrepreneurship", "business plan", "start a business", "business idea", "characteristics of an entrepreneur"], relatedKeywords: ["risk", "innovation", "funding", "seda", "smme"],
          information: "An entrepreneur identifies an opportunity, organises resources and takes the risk of starting a business. A business plan sets out how the venture will operate and succeed.",
          formulas: [],
          rules: ["Typical entrepreneur characteristics: risk-taking, innovation, determination, creativity, leadership and self-confidence.", "A business plan usually includes an executive summary, business description, market analysis, marketing plan, operations plan, management and financial plan.", "Sources of funding: own capital, bank loans, venture capital, crowdfunding, grants and support bodies such as SEDA, IDC and NEF.", "SMMEs (small, medium and micro enterprises) are important for job creation and economic growth."],
          examples: [] },

        { topic: "Marketing Mix", keywords: ["marketing mix", "4ps", "7ps", "product price place promotion", "marketing", "promotion mix"], relatedKeywords: ["people", "process", "physical evidence", "advertising", "pricing", "distribution"],
          information: "The marketing mix is the set of tools a business uses to satisfy customers: the 4 Ps (product, price, place, promotion), extended to 7 Ps for services (people, process, physical evidence).",
          formulas: [],
          rules: ["Product: what is sold, including quality, brand and packaging.", "Price: what the customer pays, including discounts and credit terms.", "Place: how and where the product is distributed.", "Promotion: advertising, sales promotion, publicity, personal selling.", "People, process and physical evidence apply mainly to services."],
          examples: [] },

        { topic: "Market Segmentation and Research", keywords: ["market segmentation", "market research", "target market", "segmentation", "market share", "swot of market"], relatedKeywords: ["demographic", "geographic", "psychographic", "behavioural", "survey"],
          information: "Segmentation divides a market into groups of customers with similar needs. Market research gathers information about customers, competitors and trends.",
          formulas: ["Market share % = Business sales / Total market sales × 100"],
          rules: ["Common segmentation bases: geographic, demographic, psychographic (lifestyle) and behavioural.", "Primary research collects new data (surveys, interviews); secondary research uses existing data (reports, statistics)."],
          examples: ["Sales R2 million in a market worth R10 million gives a 20% market share."] },

        { topic: "Product Life Cycle", keywords: ["product life cycle", "plc", "introduction growth maturity decline"], relatedKeywords: ["sales", "profit", "marketing", "stage"],
          information: "The product life cycle describes the stages a product goes through: introduction, growth, maturity and decline.",
          formulas: [],
          rules: ["Introduction: low sales, high costs, heavy promotion.", "Growth: sales and profit rise quickly, competitors enter.", "Maturity: sales peak and stabilise, competition is strong.", "Decline: sales and profit fall; the business may withdraw or relaunch the product."],
          examples: [] },

        { topic: "Human Resource Management", keywords: ["human resource", "human resources", "hr management", "recruitment", "selection", "induction", "training and development", "performance appraisal", "staff turnover"], relatedKeywords: ["employees", "interview", "job description", "job specification", "orientation"],
          information: "Human resource management deals with the people in a business: planning, recruiting, selecting, training, appraising and rewarding employees.",
          formulas: ["Staff turnover % = Employees who left / Average number of employees × 100"],
          rules: ["Job analysis produces a job description (duties) and a job specification (qualifications and skills needed).", "Recruitment attracts applicants; selection chooses the best (CV screening, interviews, tests, reference checks).", "Induction introduces new employees to the business; training develops skills.", "Performance appraisal evaluates how well employees do their jobs."],
          examples: ["10 employees left from an average staff of 100: staff turnover = 10%."] },

        { topic: "Labour Legislation in South Africa", keywords: ["labour legislation", "labour relations act", "lra", "basic conditions of employment", "bcea", "employment equity", "skills development act", "uif", "unemployment insurance", "coida", "ohsa", "occupational health and safety", "ccma", "labour law"], relatedKeywords: ["dismissal", "strike", "overtime", "leave", "discrimination", "employer", "employee"],
          information: "South African labour laws protect employees and regulate the employment relationship.",
          formulas: [],
          rules: ["Labour Relations Act 66 of 1995 (LRA): collective bargaining, unfair dismissal, strikes and lock-outs; disputes go to the CCMA.", "Basic Conditions of Employment Act 75 of 1997 (BCEA): minimum conditions such as working hours, overtime, leave and notice periods.", "Employment Equity Act 55 of 1998 (EEA): prohibits unfair discrimination and promotes affirmative action for designated groups.", "Skills Development Act 97 of 1998 and Skills Development Levies Act 9 of 1999: promote training; employers pay a skills development levy (1% of payroll).", "Unemployment Insurance Act 63 of 2001 (UIA): provides short-term relief for workers who lose income; employer and employee each contribute 1%.", "Compensation for Occupational Injuries and Diseases Act 130 of 1993 (COIDA): compensation for work-related injuries or illness.", "Occupational Health and Safety Act 85 of 1993 (OHSA): safe working conditions."],
          examples: [] },

        { topic: "Business Legislation in South Africa", keywords: ["consumer protection act", "cpa", "national credit act", "nca", "companies act", "competition act", "popia", "protection of personal information", "bbbee", "bee", "broad based black economic empowerment", "business legislation", "nema"], relatedKeywords: ["consumer", "credit", "company", "competition", "privacy", "environment"],
          information: "Several Acts regulate how businesses operate in South Africa.",
          formulas: [],
          rules: ["Consumer Protection Act 68 of 2008: protects consumers from unfair practices and gives rights such as quality goods and fair marketing.", "National Credit Act 34 of 2005: regulates credit granting and protects borrowers from reckless lending.", "Companies Act 71 of 2008: governs the formation and management of companies.", "Competition Act 89 of 1998: promotes fair competition and prohibits cartels and abuse of dominance.", "Protection of Personal Information Act 4 of 2013 (POPIA): regulates how personal information is collected and used.", "Broad-Based Black Economic Empowerment Act 53 of 2003: promotes economic transformation (ownership, management control, skills development, enterprise and supplier development, socio-economic development).", "National Environmental Management Act 107 of 1998 (NEMA): protects the environment and promotes sustainable development."],
          examples: [] },

        { topic: "Quality Management", keywords: ["quality management", "total quality management", "tqm", "quality control", "quality assurance", "quality circles", "quality"], relatedKeywords: ["production", "customer", "defects", "continuous improvement"],
          information: "Quality management aims to ensure products and services consistently meet customer requirements.",
          formulas: [],
          rules: ["Quality control: inspecting products to find defects.", "Quality assurance: preventing defects by building quality into every stage of the process.", "Total Quality Management (TQM): every employee is responsible for quality, with continuous improvement.", "Quality circles: small groups of employees who meet to solve quality problems."],
          examples: [] },

        { topic: "Production and Operations", keywords: ["production management", "operations management", "just in time", "jit", "lean production", "kaizen", "production process", "inventory control"], relatedKeywords: ["efficiency", "waste", "stock", "production function"],
          information: "Production (operations) management converts inputs into outputs efficiently while controlling cost, quality and delivery.",
          formulas: [],
          rules: ["Just-in-time (JIT): materials arrive exactly when needed, reducing storage costs.", "Lean production: removes waste while keeping quality.", "Kaizen: continuous small improvements by everyone.", "Production methods include job, batch and flow (mass) production."],
          examples: [] },

        { topic: "Corporate Social Responsibility and Ethics", keywords: ["corporate social responsibility", "csr", "business ethics", "triple bottom line", "king code", "corporate governance", "social investment", "sustainability"], relatedKeywords: ["stakeholders", "environment", "community", "people planet profit"],
          information: "CSR means a business takes responsibility for its impact on society and the environment. Ethics are the moral standards guiding behaviour.",
          formulas: [],
          rules: ["Triple bottom line: people (social), planet (environmental) and profit (economic).", "Corporate governance is the system by which companies are directed and controlled; South Africa follows the King Code.", "Corporate social investment includes donations, bursaries, community projects and environmental programmes.", "Stakeholders include owners, employees, customers, suppliers, government and the community."],
          examples: [] },

        { topic: "Business Sectors", keywords: ["business sectors", "primary sector", "secondary sector", "tertiary sector", "quaternary sector", "economic sectors"], relatedKeywords: ["agriculture", "mining", "manufacturing", "services"],
          information: "Businesses operate in economic sectors depending on what they produce.",
          formulas: [],
          rules: ["Primary sector: extracts natural resources (farming, mining, fishing).", "Secondary sector: manufactures and processes goods (factories, construction).", "Tertiary sector: provides services (retail, banking, tourism, transport).", "Quaternary sector: knowledge-based services such as research and information technology."],
          examples: [] },

        { topic: "Insurance", keywords: ["insurance", "insurance principles", "utmost good faith", "insurable interest", "indemnity", "subrogation", "contribution", "proximate cause", "underinsurance"], relatedKeywords: ["premium", "claim", "policy", "risk", "short term insurance", "long term insurance"],
          information: "Insurance transfers risk from the insured to the insurer in exchange for a premium.",
          formulas: [],
          rules: ["Utmost good faith: both parties must disclose all relevant facts.", "Insurable interest: the insured must stand to suffer a financial loss.", "Indemnity: the insured is restored to the same financial position, not better.", "Subrogation: after paying a claim, the insurer takes over the insured's rights against a third party.", "Contribution: if insured with several insurers, each pays a share of the loss.", "Proximate cause: the main cause of the loss must be an insured risk."],
          examples: [] },

        { topic: "Investments", keywords: ["investment", "investments", "shares", "bonds", "unit trusts", "fixed deposit", "property investment", "retirement annuity", "jse"], relatedKeywords: ["risk", "return", "dividend", "interest", "liquidity"],
          information: "Investments are assets bought to earn income or growth. Choices balance risk, return and liquidity.",
          formulas: ["Return on investment (ROI) % = (Gain from investment - Cost of investment) / Cost of investment × 100"],
          rules: ["Shares: part ownership; return from dividends and capital growth; higher risk.", "Bonds: loans to governments or companies paying interest; lower risk than shares.", "Unit trusts: pooled funds managed by professionals.", "Fixed deposits: low-risk, fixed interest for a set period.", "Higher expected return generally means higher risk."],
          examples: ["Investment cost R20 000 grows to R23 000: ROI = 3 000 / 20 000 × 100 = 15%."] },

        { topic: "Business Operations: Professionalism and Communication", keywords: ["professionalism", "business communication", "meetings", "agenda", "minutes of a meeting", "report writing", "presentation skills", "negotiation", "conflict management"], relatedKeywords: ["teamwork", "ethics", "stakeholders"],
          information: "Professional behaviour and clear communication are essential for business success.",
          formulas: [],
          rules: ["Features of professionalism: punctuality, honesty, accountability, respect and competence.", "A meeting uses an agenda (list of topics) and minutes (record of what was decided).", "Conflict can be handled by negotiation, mediation or arbitration.", "Good business communication is clear, accurate, courteous and appropriate for the audience."],
          examples: [] },

        { topic: "Strategic Management", keywords: ["strategic management", "strategy", "vision and mission", "mission statement", "vision statement", "objectives", "smart goals", "strategic planning"], relatedKeywords: ["goals", "competitive advantage", "swot", "implementation"],
          information: "Strategic management sets the long-term direction of a business and decides how resources will be used to achieve it.",
          formulas: [],
          rules: ["Vision: where the business wants to be in future.", "Mission: why the business exists and what it does.", "SMART objectives are Specific, Measurable, Achievable, Realistic and Time-bound.", "Strategy steps: analyse the environment, set objectives, formulate, implement and evaluate the strategy."],
          examples: [] }
    ];

    const financialManagementKnowledge = [
        { topic: "Time Value of Money", keywords: ["time value of money", "tvm", "present value", "future value", "annuity", "perpetuity", "discounting", "compounding"], relatedKeywords: ["interest rate", "periods", "cash flow", "discount rate"],
          information: "A rand today is worth more than a rand in future because it can earn interest. Time value of money converts cash flows between different points in time.",
          formulas: ["Future value: FV = PV × (1 + r)^n", "Present value: PV = FV ÷ (1 + r)^n", "PV of an ordinary annuity = PMT × [1 - (1 + r)^-n] ÷ r", "FV of an ordinary annuity = PMT × [(1 + r)^n - 1] ÷ r", "PV of a perpetuity = PMT ÷ r"],
          rules: ["Use the same period for r and n (monthly rate with number of months).", "Annuity due payments occur at the start of each period."],
          examples: ["R10 000 invested at 8% for 3 years: FV = 10 000 × 1.08³ = R12 597.12.", "R5 000 received in 2 years at 10%: PV = 5 000 ÷ 1.10² = R4 132.23."] },

        { topic: "Net Present Value (NPV)", keywords: ["npv", "net present value", "investment appraisal", "capital budgeting", "capital investment decision"], relatedKeywords: ["cash flows", "discount rate", "initial investment", "accept", "reject"],
          information: "NPV is the present value of a project's future cash flows less its initial investment. It shows how much value the project adds.",
          formulas: ["NPV = -Initial investment + Σ [Cash flow(t) ÷ (1 + r)^t]"],
          rules: ["NPV > 0: accept the project (it earns more than the required return).", "NPV < 0: reject the project.", "NPV = 0: the project earns exactly the required return.", "When ranking projects, choose the highest NPV (if funds are not limited)."],
          examples: ["Invest R100 000; inflows R50 000 for 3 years at 10%: PV of inflows = R124 342.60, NPV = R24 342.60, so accept."] },

        { topic: "Internal Rate of Return (IRR)", keywords: ["irr", "internal rate of return"], relatedKeywords: ["npv", "hurdle rate", "required return", "project"],
          information: "IRR is the discount rate at which a project's NPV equals zero.",
          formulas: ["IRR: the rate r where Σ [Cash flow(t) ÷ (1 + r)^t] - Initial investment = 0"],
          rules: ["Accept if IRR is greater than the required rate of return (hurdle rate).", "IRR is found by trial and error, interpolation or a financial calculator.", "IRR can mislead when cash flows change sign more than once."],
          examples: [] },

        { topic: "Payback Period", keywords: ["payback", "payback period", "discounted payback"], relatedKeywords: ["cash flows", "investment", "recover"],
          information: "The payback period is the time it takes for a project's cash inflows to recover the initial investment.",
          formulas: ["Payback (even cash flows) = Initial investment ÷ Annual cash inflow", "Payback (uneven) = Full years + (Unrecovered amount ÷ Cash flow in the next year)"],
          rules: ["Advantage: simple and shows liquidity and risk.", "Disadvantage: ignores the time value of money and cash flows after payback.", "Discounted payback uses discounted cash flows."],
          examples: ["Investment R120 000 with R40 000 a year: payback = 3 years."] },

        { topic: "Cost of Capital and CAPM", keywords: ["cost of capital", "capm", "capital asset pricing model", "cost of equity", "beta", "risk free rate", "market risk premium", "required return"], relatedKeywords: ["wacc", "equity", "debt", "risk"],
          information: "The cost of capital is the return required by the providers of finance. CAPM estimates the cost of equity from market risk.",
          formulas: ["CAPM: Ke = Rf + β × (Rm - Rf)", "After-tax cost of debt = Kd × (1 - tax rate)", "WACC = (E ÷ V × Ke) + (D ÷ V × Kd × (1 - t))"],
          rules: ["Beta measures sensitivity to market movements: β > 1 is riskier than the market.", "(Rm - Rf) is the market risk premium."],
          examples: ["Rf = 7%, β = 1.2, Rm = 14%: Ke = 7% + 1.2 × 7% = 15.4%."] },

        { topic: "Share and Dividend Valuation", keywords: ["dividend growth model", "gordon growth model", "share valuation", "dividend discount model", "value of a share", "intrinsic value"], relatedKeywords: ["dividend", "growth rate", "required return", "share price"],
          information: "A share's value can be estimated as the present value of its expected future dividends.",
          formulas: ["Constant growth model: P0 = D1 ÷ (Ke - g)", "D1 = D0 × (1 + g)", "Dividend yield = D1 ÷ P0"],
          rules: ["Ke must be greater than g for the model to work."],
          examples: ["D0 = R2, g = 5%, Ke = 15%: D1 = R2.10 and P0 = 2.10 ÷ 0.10 = R21."] },

        { topic: "Break-even Analysis", keywords: ["break even", "break even point", "break even analysis", "contribution margin", "cvp analysis", "cost volume profit", "margin of safety"], relatedKeywords: ["fixed costs", "variable costs", "selling price", "units"],
          information: "The break-even point is the sales level where total revenue equals total cost, so profit is zero.",
          formulas: ["Contribution per unit = Selling price - Variable cost per unit", "Break-even units = Fixed costs ÷ Contribution per unit", "Break-even revenue = Break-even units × Selling price", "Units for target profit = (Fixed costs + Target profit) ÷ Contribution per unit", "Margin of safety = Actual sales - Break-even sales"],
          rules: ["Above break-even the business makes a profit; below it, a loss."],
          examples: ["Fixed costs R60 000, price R50, variable cost R30: contribution R20, break-even = 3 000 units (R150 000)."] },

        { topic: "Working Capital Management", keywords: ["working capital", "working capital management", "cash conversion cycle", "operating cycle", "net working capital", "economic order quantity", "eoq"], relatedKeywords: ["inventory", "receivables", "payables", "liquidity"],
          information: "Working capital is the funding needed for day-to-day operations. Managing it balances liquidity and profitability.",
          formulas: ["Net working capital = Current assets - Current liabilities", "Cash conversion cycle = Inventory days + Debtor days - Creditor days", "EOQ = √(2 × D × S ÷ H)"],
          rules: ["D = annual demand, S = ordering cost per order, H = holding cost per unit per year.", "Too little working capital risks illiquidity; too much ties up money that could earn a return."],
          examples: ["D = 10 000 units, S = R50, H = R2: EOQ = √(2 × 10 000 × 50 ÷ 2) = 707 units (about)."] },

        { topic: "Financial and Operating Leverage", keywords: ["leverage", "financial leverage", "operating leverage", "gearing", "capital structure", "debt equity ratio", "degree of operating leverage"], relatedKeywords: ["debt", "equity", "risk", "interest"],
          information: "Leverage uses fixed costs or borrowed funds to magnify returns - and risk.",
          formulas: ["Debt-equity ratio = Total debt ÷ Total equity", "Gearing = Debt ÷ (Debt + Equity)", "Degree of operating leverage = % change in operating profit ÷ % change in sales"],
          rules: ["Higher gearing increases financial risk because interest must be paid.", "Interest on debt is tax deductible, which lowers the after-tax cost of debt."],
          examples: [] },

        { topic: "DuPont Analysis and Return Measures", keywords: ["dupont", "return on equity", "return on assets", "return on investment", "roi", "roce", "return on capital employed", "eva"], relatedKeywords: ["profit margin", "asset turnover", "equity multiplier"],
          information: "DuPont analysis breaks return on equity into profitability, efficiency and leverage.",
          formulas: ["ROE = Net profit margin × Asset turnover × Equity multiplier", "Net profit margin = Net profit ÷ Sales", "Asset turnover = Sales ÷ Total assets", "Equity multiplier = Total assets ÷ Equity", "ROCE = Operating profit ÷ Capital employed × 100"],
          rules: ["A rise in ROE can come from higher margins, better asset use or more borrowing."],
          examples: ["Margin 10%, asset turnover 2, equity multiplier 1.5: ROE = 0.10 × 2 × 1.5 = 30%."] },

        { topic: "Risk and Return", keywords: ["risk and return", "standard deviation", "expected return", "diversification", "systematic risk", "unsystematic risk", "portfolio"], relatedKeywords: ["investment", "beta", "variance"],
          information: "Investors expect higher returns for taking higher risk. Diversification reduces risk that is specific to one asset.",
          formulas: ["Expected return = Σ (Probability × Return)", "Portfolio return = Σ (Weight × Return of each asset)"],
          rules: ["Systematic (market) risk affects all assets and cannot be diversified away.", "Unsystematic (specific) risk can be reduced by diversification."],
          examples: ["Returns 20% (prob. 0.5) and 4% (prob. 0.5): expected return = 12%."] },

        { topic: "Sources of Finance", keywords: ["sources of finance", "long term finance", "short term finance", "debentures", "bank overdraft", "trade credit", "retained earnings", "leasing", "factoring", "venture capital"], relatedKeywords: ["loan", "equity", "debt", "capital"],
          information: "Businesses raise funds from owners (equity) or lenders (debt), over short or long periods.",
          formulas: [],
          rules: ["Short-term: bank overdraft, trade credit, factoring.", "Medium-term: instalment sale, leasing, term loans.", "Long-term: ordinary and preference shares, debentures, mortgage bonds, retained earnings.", "Match the term of finance to the term of the asset being financed."],
          examples: [] }
    ];

    const extraAccountingKnowledge = [
        { topic: "Management Accounting: Costing and Variances", keywords: ["management accounting", "absorption costing", "marginal costing", "variable costing", "standard costing", "variance analysis", "material variance", "labour variance", "overhead absorption", "cost classification", "relevant costing", "make or buy"], relatedKeywords: ["standard cost", "actual cost", "favourable", "adverse", "fixed cost", "variable cost"],
          information: "Management accounting provides cost and planning information for internal decisions.",
          formulas: ["Material price variance = (Actual price - Standard price) × Actual quantity", "Material usage variance = (Actual quantity - Standard quantity) × Standard price", "Labour rate variance = (Actual rate - Standard rate) × Actual hours", "Labour efficiency variance = (Actual hours - Standard hours) × Standard rate", "Overhead absorption rate = Budgeted overheads ÷ Budgeted activity level"],
          rules: ["Absorption costing includes fixed production overheads in product cost; marginal costing treats them as period costs.", "A variance is favourable when it increases profit and adverse when it reduces profit.", "Relevant costs are future cash flows that differ between alternatives; sunk costs are ignored."],
          examples: ["Standard price R10, actual price R11, actual quantity 500 kg: price variance = R500 adverse."] },

        { topic: "Statement of Changes in Equity", keywords: ["statement of changes in equity", "changes in equity", "reserves", "share premium", "retained income"], relatedKeywords: ["dividends", "profit", "share capital", "other comprehensive income"],
          information: "The statement of changes in equity reconciles the opening and closing balance of each component of equity.",
          formulas: ["Closing retained earnings = Opening + Profit for the year - Dividends declared"],
          rules: ["Share issues increase share capital; dividends reduce retained earnings.", "Other comprehensive income (e.g. revaluation surplus) is shown within reserves."],
          examples: [] },

        { topic: "Share Issues", keywords: ["share issue", "issue of shares", "rights issue", "bonus issue", "capitalisation issue", "share buyback", "repurchase of shares"], relatedKeywords: ["share capital", "issue price", "shareholders"],
          information: "A company can raise capital by issuing shares to the public, existing shareholders or specific investors.",
          formulas: ["Proceeds = Number of shares issued × Issue price"],
          rules: ["Rights issue: new shares offered to existing shareholders in proportion to their holdings.", "Bonus (capitalisation) issue: free shares from reserves; total equity does not change.", "A share buyback reduces share capital and cash."],
          examples: ["500 000 shares issued at R4 each raises R2 000 000."] },

        { topic: "Partnership Changes", keywords: ["admission of a partner", "retirement of a partner", "dissolution of a partnership", "goodwill partnership", "change in profit sharing ratio", "revaluation of assets partnership"], relatedKeywords: ["partners", "capital accounts", "goodwill"],
          information: "When partners join, leave or change profit-sharing ratios, assets are revalued, goodwill is dealt with and capital accounts are adjusted.",
          formulas: ["Goodwill = Value of the business - Net identifiable assets"],
          rules: ["Goodwill is usually raised in the old ratio and written off in the new ratio.", "On dissolution, assets are realised, liabilities paid and the balance is shared in the capital account balances."],
          examples: [] },

        { topic: "IAS 1 - Presentation of Financial Statements", keywords: ["ias 1", "presentation of financial statements", "going concern", "accrual basis", "materiality", "ifrs 18"], relatedKeywords: ["statement of financial position", "profit or loss", "notes"],
          information: "IAS 1 sets out the overall requirements for presenting general purpose financial statements. IFRS 18 will replace it for periods starting on or after 1 January 2027.",
          formulas: [],
          rules: ["A complete set includes the statement of financial position, profit or loss and other comprehensive income, changes in equity, cash flows and notes.", "Financial statements are prepared on the going concern and accrual bases unless stated otherwise.", "Material items are presented separately; current and non-current items are normally distinguished."],
          examples: [] },

        { topic: "IAS 38 - Intangible Assets", keywords: ["ias 38", "intangible assets", "development costs", "research costs", "patents", "trademarks", "internally generated goodwill"], relatedKeywords: ["amortisation", "recognition", "useful life"],
          information: "IAS 38 deals with identifiable non-monetary assets without physical substance.",
          formulas: [],
          rules: ["Research costs are expensed.", "Development costs are capitalised only if criteria such as technical feasibility and intention to complete are met.", "Internally generated goodwill is not recognised.", "Intangibles with finite lives are amortised; those with indefinite lives are tested for impairment annually."],
          examples: [] },

        { topic: "IAS 40 - Investment Property and IFRS 5", keywords: ["ias 40", "investment property", "ifrs 5", "held for sale", "non current assets held for sale", "discontinued operations"], relatedKeywords: ["fair value model", "cost model", "disposal group"],
          information: "IAS 40 covers property held to earn rentals or capital appreciation. IFRS 5 covers assets whose carrying amount will be recovered mainly through sale.",
          formulas: [],
          rules: ["Investment property may use the cost model or the fair value model (changes in fair value go to profit or loss).", "IFRS 5: assets held for sale are measured at the lower of carrying amount and fair value less costs to sell, and are not depreciated."],
          examples: [] },

        { topic: "IAS 19 - Employee Benefits", keywords: ["ias 19", "employee benefits", "defined benefit", "defined contribution", "post employment benefits", "leave pay", "bonus provision"], relatedKeywords: ["pension", "short term benefits"],
          information: "IAS 19 governs short-term benefits, post-employment benefits and other long-term benefits.",
          formulas: [],
          rules: ["Short-term benefits (salaries, leave, bonuses) are recognised as an expense when employees render service.", "Defined contribution plan: the employer's cost is the contribution paid.", "Defined benefit plan: the employer carries actuarial and investment risk and recognises a net liability or asset."],
          examples: [] },

        { topic: "IAS 20, IAS 41, IFRS 13 and IFRS 2", keywords: ["ias 20", "government grants", "ias 41", "biological assets", "agriculture accounting", "ifrs 13", "fair value measurement", "ifrs 2", "share based payment"], relatedKeywords: ["fair value", "grant", "vesting"],
          information: "These standards deal with grants, agriculture, fair value and share-based payments.",
          formulas: [],
          rules: ["IAS 20: government grants are recognised in profit or loss over the periods the related costs are expensed.", "IAS 41: biological assets are measured at fair value less costs to sell.", "IFRS 13: fair value is the exit price in an orderly transaction between market participants.", "IFRS 2: equity-settled share-based payments are measured at grant-date fair value and expensed over the vesting period."],
          examples: [] },

        { topic: "Ratio Analysis Interpretation", keywords: ["ratio interpretation", "interpret ratios", "liquidity ratios", "profitability ratios", "solvency ratios", "efficiency ratios", "return on equity", "earnings per share ratio", "price earnings ratio", "dividend yield"], relatedKeywords: ["current ratio", "debt ratio", "inventory turnover", "pe ratio"],
          information: "Ratios are interpreted by comparing them with previous years, budgets, other businesses and industry norms.",
          formulas: ["Price/earnings ratio = Market price per share ÷ Earnings per share", "Dividend yield % = Dividend per share ÷ Market price per share × 100", "Dividend payout ratio = Dividends ÷ Earnings", "Gross profit mark-up % = Gross profit ÷ Cost of sales × 100"],
          rules: ["A current ratio of about 2:1 and acid-test of about 1:1 are traditional liquidity guides.", "Always state the ratio, explain what it shows, and comment on the trend and possible causes."],
          examples: ["Market price R30 and EPS R3: P/E ratio = 10."] }
    ];

    const extraEconomicsKnowledge = [
        { topic: "Production Possibility Curve", keywords: ["production possibility curve", "ppc", "production possibility frontier", "ppf", "opportunity cost curve"], relatedKeywords: ["scarcity", "efficiency", "growth", "trade off"],
          information: "The PPC shows the maximum combinations of two goods an economy can produce with its resources and technology.",
          formulas: ["Opportunity cost of good X = Quantity of Y given up ÷ Quantity of X gained"],
          rules: ["Points on the curve are efficient; points inside indicate unemployed or underused resources; points outside are unattainable.", "The curve shifts outward with economic growth (more resources or better technology).", "The curve is bowed outward because of increasing opportunity cost."],
          examples: [] },

        { topic: "Costs of Production", keywords: ["costs of production", "total cost", "average cost", "marginal cost", "fixed cost", "variable cost", "short run costs", "law of diminishing returns", "economies of scale", "diseconomies of scale"], relatedKeywords: ["output", "firm", "production", "average variable cost"],
          information: "Costs are classified as fixed or variable and are used to find profit-maximising output.",
          formulas: ["TC = TFC + TVC", "AC = TC ÷ Q", "AVC = TVC ÷ Q", "AFC = TFC ÷ Q", "MC = Change in TC ÷ Change in Q"],
          rules: ["Law of diminishing returns: adding more of a variable input to a fixed input eventually yields smaller increases in output.", "Economies of scale: average cost falls as output expands in the long run.", "Marginal cost cuts average cost at its lowest point."],
          examples: ["Q = 10 and TC = R500: AC = R50."] },

        { topic: "Taxation Types", keywords: ["taxation", "progressive tax", "proportional tax", "regressive tax", "direct tax", "indirect tax", "tax system", "personal income tax", "sars"], relatedKeywords: ["government revenue", "vat", "equity", "income distribution"],
          information: "Taxes are compulsory payments to government used to fund public spending and redistribute income.",
          formulas: ["Average tax rate = Tax paid ÷ Taxable income × 100"],
          rules: ["Progressive: the tax rate rises as income rises (e.g. personal income tax).", "Proportional: the same rate at all income levels.", "Regressive: takes a larger share of low incomes.", "Direct taxes are paid on income or wealth; indirect taxes (VAT, fuel levy) are included in prices."],
          examples: [] },

        { topic: "Phillips Curve and Unemployment-Inflation Trade-off", keywords: ["phillips curve", "inflation unemployment trade off", "stagflation phillips"], relatedKeywords: ["inflation", "unemployment", "natural rate"],
          information: "The short-run Phillips curve suggests an inverse relationship between inflation and unemployment.",
          formulas: [],
          rules: ["Lower unemployment is associated with higher inflation in the short run.", "In the long run the curve is vertical at the natural rate of unemployment.", "Stagflation (high inflation with high unemployment) challenged the simple trade-off."],
          examples: [] },

        { topic: "Economic Growth and Development Indicators", keywords: ["economic development", "human development index", "hdi", "development indicators", "sustainable development", "economic growth vs development"], relatedKeywords: ["life expectancy", "education", "income per capita", "poverty"],
          information: "Economic growth is an increase in real output; economic development improves living standards and wellbeing more broadly.",
          formulas: [],
          rules: ["HDI combines life expectancy, education and income per capita.", "Sustainable development meets present needs without compromising the ability of future generations to meet theirs.", "Growth is necessary but not sufficient for development."],
          examples: [] },

        { topic: "Globalisation and Trade Blocs", keywords: ["globalisation", "globalization", "trade bloc", "free trade area", "customs union", "sadc", "brics", "afcfta", "wto", "regional integration"], relatedKeywords: ["trade", "tariffs", "integration", "multinational"],
          information: "Globalisation is the growing integration of economies through trade, investment and technology.",
          formulas: [],
          rules: ["Free trade area: no tariffs between members, each sets its own external tariffs.", "Customs union: free trade inside plus a common external tariff.", "Common market adds free movement of labour and capital.", "SADC and the African Continental Free Trade Area (AfCFTA) are African examples.", "The WTO sets and enforces rules for international trade."],
          examples: [] }
    ];

    /* join the new notes to the same search engine */
    subjectWords["Business Studies"] = [
        "business studies", "business", "entrepreneur", "swot", "pestle", "leadership", "management", "marketing",
        "human resource", "labour relations", "labour law", "bcea", "consumer protection", "csr", "ethics",
        "forms of ownership", "sole proprietor", "partnership", "franchise", "insurance", "investment", "quality",
        "business plan", "motivation", "maslow", "herzberg", "stakeholder", "corporate governance", "market research"
    ];
    subjectWords["Financial Management"] = [
        "financial management", "npv", "net present value", "irr", "internal rate of return", "payback", "capm", "beta",
        "wacc", "cost of capital", "break even", "break-even", "contribution margin", "time value of money",
        "present value", "future value", "annuity", "working capital", "eoq", "leverage", "gearing", "dupont",
        "dividend growth", "cash conversion cycle", "capital budgeting"
    ];
    subjectWords.Accounting = subjectWords.Accounting.concat([
        "management accounting", "variance", "absorption costing", "marginal costing", "standard costing",
        "share issue", "statement of changes in equity", "ias 38", "ias 40", "ias 19", "ifrs 5", "ifrs 13", "ifrs 2", "ias 1"
    ]);
    subjectWords.Economics = subjectWords.Economics.concat([
        "production possibility", "ppc", "costs of production", "economies of scale", "taxation", "progressive tax",
        "phillips curve", "hdi", "development", "globalisation", "trade bloc"
    ]);

    extraAccountingKnowledge.forEach(item => accountingKnowledge.push(item));
    extraEconomicsKnowledge.forEach(item => economicsKnowledge.push(item));

    /* ---------- symbol helpers ---------- */

    /* Clean ASCII maths into proper symbols for display */
    function mcSym(s) {
        return String(s)
            .replace(/<=/g, "≤").replace(/>=/g, "≥").replace(/!=/g, "≠")
            .replace(/\^2(?!\d)/g, "²").replace(/\^3(?!\d)/g, "³")
            .replace(/sqrt\(/gi, "√(")
            .replace(/(\S)\s*\*\s*(\S)/g, "$1 × $2")
            .replace(/(\d|x|\))-(?=[\dx(])/g, "$1 − ")
            .replace(/(\s)-(\s)/g, "$1−$2")
            .replace(/(^|[(=+×÷−\s])-(?=[\dx(])/g, "$1−");
    }

    const mcMinus = n => (n < 0 ? "−" : "") + Math.abs(+Number(n).toFixed(6));
    const mcPar = n => (n < 0 ? "(" + mcMinus(n) + ")" : mcMinus(n));

    /* Render worked lines: steps as headings, workings in formula boxes, final answer highlighted */
    function mcLines(arr) {
        return arr.map(l => {
            const t = mcSym(l);
            if (/^∴/.test(t)) {
                return `<p style="font-weight:700;margin:8px 0;padding:6px 10px;border-left:3px solid currentColor;">${escapeHtml(t)}</p>`;
            }
            if (/^Step \d+:/.test(t)) {
                return `<p style="margin:10px 0 2px;"><strong>${escapeHtml(t)}</strong></p>`;
            }
            return `<div class="formula">${escapeHtml(t)}</div>`;
        }).join("");
    }

    /* ---------- solver: arithmetic with symbols (√ π ² ³ × ÷ −) ---------- */

    function mcSolveArithmetic(text) {
        const raw = String(text).trim();
        const stripped = raw.replace(/^(please\s+)?(calculate|what is|whats|work out|evaluate|simplify|compute|solve)\s*:?\s*/i, "").replace(/[?=\s]+$/g, "");
        const hadWord = stripped !== raw.replace(/[?=\s]+$/g, "");
        const hasSym = /[√π²³×÷−^]/.test(stripped);

        if (!stripped || !/^[\d\s+\-−*×/÷().^√π²³]+$/.test(stripped)) return null;
        if (!/\d/.test(stripped) || !/[+\-−*×/÷^√²³]/.test(stripped)) return null;
        if (!hadWord && !hasSym) return null;

        try {
            let e = stripped
                .replace(/[−–]/g, "-").replace(/×/g, "*").replace(/÷/g, "/")
                .replace(/(\d|\)|π|²|³)(?=\s*[(π√])/g, "$1*")
                .replace(/²/g, "**2").replace(/³/g, "**3").replace(/\^/g, "**")
                .replace(/√\s*(\d+(?:\.\d+)?|\([^()]*\))/g, "Math.sqrt($1)")
                .replace(/π/g, "Math.PI");
            const v = new Function(`"use strict"; return (${e});`)();
            if (typeof v !== "number" || !Number.isFinite(v)) return null;

            const exact = Math.abs(v - +v.toFixed(6)) < 1e-12;
            const pretty = stripped.replace(/\s*[*×]\s*/g, " × ").replace(/\s*[/÷]\s*/g, " ÷ ").replace(/\s*-\s*/g, " − ").replace(/\s*\+\s*/g, " + ");
            return {
                text: [
                    "Step 1: Write the expression",
                    pretty,
                    "Step 2: Evaluate in order (brackets, powers and roots, × and ÷, + and −)",
                    `∴ ${pretty} ${exact ? "=" : "≈"} ${mcMinus(v)}`
                ]
            };
        } catch (err) {
            return null;
        }
    }

    /* ---------- solver: equations in x ---------- */

    function mcPrepExpr(s) {
        return s.replace(/\s+/g, "")
            .replace(/(\d|\)|π)(?=[x(π√])/g, "$1*")
            .replace(/x(?=[\d(xπ√])/g, "x*")
            .replace(/\)(?=\d)/g, ")*")
            .replace(/π(?=\d)/g, "π*")
            .replace(/√(\d+(?:\.\d+)?|\([^()]*\))/g, "Math.sqrt($1)")
            .replace(/π/g, "Math.PI")
            .replace(/\^/g, "**");
    }

    function mcSolveEquation(text) {
        const t = String(text).replace(/[×]/g, "*").replace(/÷/g, "/").replace(/²/g, "^2").replace(/³/g, "^3").replace(/[−–]/g, "-");
        const C = "0-9x+\\-*/().^√π\\s";
        const re = new RegExp(`([${C}]*x[${C}]*=[${C}]+|[${C}]+=[${C}]*x[${C}]*)`, "i");
        const m = t.match(re);
        if (!m) return null;
        const parts = m[1].toLowerCase().split("=");
        if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) return null;

        try {
            const l = mcPrepExpr(parts[0]), r = mcPrepExpr(parts[1]);
            const f = new Function("x", `"use strict"; return (${l}) - (${r});`);
            const f0 = f(0), f1 = f(1), fm = f(-1), f2 = f(2);
            const a = (f1 + fm) / 2 - f0, b = (f1 - fm) / 2, c = f0;
            if (![a, b, c].every(Number.isFinite)) return null;
            if (Math.abs(a * 4 + b * 2 + c - f2) > 1e-6) return { unsupported: true };

            const eq = `${parts[0].trim()} = ${parts[1].trim()}`;
            const poly = [[a, "x²"], [b, "x"], [c, ""]].filter(p => Math.abs(p[0]) > 1e-12)
                .map((p, i) => {
                    const v = +p[0].toFixed(6);
                    const sign = i === 0 ? (v < 0 ? "−" : "") : (v < 0 ? " − " : " + ");
                    return sign + (Math.abs(v) === 1 && p[1] ? "" : Math.abs(v)) + p[1];
                }).join("") || "0";

            const L = ["Step 1: Write the equation", eq, "Step 2: Move everything to one side", `${poly} = 0`];

            if (Math.abs(a) < 1e-12) {
                if (Math.abs(b) < 1e-12) {
                    L.push(Math.abs(c) < 1e-9 ? "∴ True for every x" : "∴ No solution");
                    return { text: L };
                }
                L.push("Step 3: Isolate x", `x = ${mcMinus(-c)} ÷ ${mcPar(b)}`, `∴ x = ${mcMinus(-c / b)}`);
                return { text: L };
            }

            const d = b * b - 4 * a * c;
            L.push(
                "Step 3: Identify the coefficients", `a = ${mcMinus(a)},  b = ${mcMinus(b)},  c = ${mcMinus(c)}`,
                "Step 4: Calculate the discriminant", "Δ = b² − 4ac",
                `Δ = ${mcPar(b)}² − 4(${mcMinus(a)})(${mcMinus(c)}) = ${mcMinus(d)}`
            );
            if (d < -1e-12) {
                L.push("∴ Δ < 0, so there are no real solutions");
            } else if (Math.abs(d) <= 1e-12) {
                L.push("Step 5: Solve", "x = −b ÷ 2a", `∴ x = ${mcMinus(-b / (2 * a))} (repeated root)`);
            } else {
                const s = Math.sqrt(d);
                L.push(
                    "Step 5: Apply the quadratic formula", "x = [−b ± √Δ] ÷ 2a",
                    `x = [${mcMinus(-b)} ± √${mcMinus(d)}] ÷ ${mcMinus(2 * a)}`,
                    `∴ x = ${mcMinus((-b + s) / (2 * a))}  or  x = ${mcMinus((-b - s) / (2 * a))}`
                );
            }
            return { text: L };
        } catch (e) {
            return null;
        }
    }

    /* ---------- solver: WACC ---------- */

    function mcSolveWACC(text) {
        if (!/\bwacc\b|weighted average cost of capital/i.test(text)) return null;

        const clauses = text.split(/[.;\n]|\band\b|,\s+/i).map(s => s.trim()).filter(Boolean);
        const v = {};

        clauses.forEach(c => {
            const lc = c.toLowerCase();
            const pct = mcPercents(c);
            const money = mcMoney(c).filter(n => n >= 100);

            if (pct.length) {
                if (/cost of debt|interest rate|borrowing|\bkd\b|debt.*(rate|cost)/.test(lc) && v.kd === undefined) v.kd = pct[0];
                else if (/cost of equity|required return|\bke\b|equity.*(rate|cost|return)/.test(lc) && v.ke === undefined) v.ke = pct[0];
                else if (/tax/.test(lc) && v.t === undefined) v.t = pct[0];
            } else if (money.length) {
                if (/equity|share|market capital/.test(lc) && v.E === undefined) v.E = money[0];
                else if (/debt|loan|bond|borrow/.test(lc) && v.D === undefined) v.D = money[0];
            }
        });

        const missing = [];
        if (v.E === undefined) missing.push("market value of equity");
        if (v.D === undefined) missing.push("market value of debt");
        if (v.ke === undefined) missing.push("cost of equity");
        if (v.kd === undefined) missing.push("cost of debt");
        if (missing.length) return { missing };

        const assumed = [];
        if (v.t === undefined) { v.t = 0; assumed.push("No tax rate was given, so t = 0% was assumed."); }

        const V = v.E + v.D, we = v.E / V, wd = v.D / V;
        const kdAfter = v.kd * (1 - v.t / 100);
        const w = we * v.ke + wd * kdAfter;

        return {
            assumed,
            text: [
                "Step 1: Write the formula",
                "WACC = (E ÷ V × Ke) + (D ÷ V × Kd × (1 − t))",
                "Step 2: List the given values",
                `E = ${mcR(v.E)}`, `D = ${mcR(v.D)}`,
                `Ke = ${mcP(v.ke)}`, `Kd = ${mcP(v.kd)}`, `t = ${mcP(v.t)}`,
                "Step 3: Total capital",
                `V = E + D = ${mcR(v.E)} + ${mcR(v.D)} = ${mcR(V)}`,
                "Step 4: Weights",
                `E ÷ V = ${mcR(v.E)} ÷ ${mcR(V)} = ${mcP(we * 100)}`,
                `D ÷ V = ${mcR(v.D)} ÷ ${mcR(V)} = ${mcP(wd * 100)}`,
                "Step 5: After-tax cost of debt",
                `Kd × (1 − t) = ${mcP(v.kd)} × (1 − ${+(v.t / 100).toFixed(4)}) = ${mcP(kdAfter)}`,
                "Step 6: Calculate WACC",
                `WACC = (${mcP(we * 100)} × ${mcP(v.ke)}) + (${mcP(wd * 100)} × ${mcP(kdAfter)})`,
                `WACC = ${mcP(we * v.ke)} + ${mcP(wd * kdAfter)}`,
                `∴ WACC ≈ ${mcP(w)}`
            ]
        };
    }

    /* ---------- solver: VAT ---------- */

    function mcSolveVAT(text) {
        if (!/\bvat\b/i.test(text)) return null;
        if (/input vat|output vat/i.test(text) && mcMoney(text).length > 1) return null;

        const money = mcMoney(text.replace(/\d+(?:\.\d+)?\s*%/g, " ")).filter(n => n >= 1);
        if (money.length !== 1) return null;

        const rateM = text.match(/(\d+(?:\.\d+)?)\s*%/);
        const rate = rateM ? parseFloat(rateM[1]) : 15;
        const assumed = rateM ? [] : ["No VAT rate was given, so South Africa's standard 15% was assumed."];
        const amt = money[0];
        const f = (1 + rate / 100).toFixed(2);

        if (/(incl|inclusive)/i.test(text)) {
            const excl = amt / (1 + rate / 100);
            return { assumed, text: [
                "Step 1: VAT-inclusive amount", `${mcR(amt)}`,
                "Step 2: Find the VAT-exclusive amount", `${mcR(amt)} ÷ ${f} = ${mcR(excl)}`,
                "Step 3: Find the VAT", `${mcR(amt)} − ${mcR(excl)} = ${mcR(amt - excl)}`,
                `∴ VAT = ${mcR(amt - excl)}`
            ] };
        }
        if (/(excl|exclusive|add vat|before vat)/i.test(text)) {
            return { assumed, text: [
                "Step 1: VAT-exclusive amount", `${mcR(amt)}`,
                "Step 2: Calculate the VAT", `${mcR(amt)} × ${rate}% = ${mcR(amt * rate / 100)}`,
                "Step 3: VAT-inclusive amount", `${mcR(amt)} × ${f} = ${mcR(amt * (1 + rate / 100))}`,
                `∴ VAT = ${mcR(amt * rate / 100)}  |  Inclusive = ${mcR(amt * (1 + rate / 100))}`
            ] };
        }
        return { missing: ["whether the amount includes or excludes VAT"] };
    }

    /* ---------- solver: gross profit ---------- */

    function mcSolveGrossProfit(text) {
        if (!/gross profit/i.test(text)) return null;
        const s = text.match(/sales[^\d]{0,25}(r?\s*\d[\d\s,]*(?:\.\d+)?)/i);
        const c = text.match(/cost of (?:sales|goods sold)[^\d]{0,25}(r?\s*\d[\d\s,]*(?:\.\d+)?)/i);
        if (!s || !c) return null;
        const sales = mcNum(s[1]), cos = mcNum(c[1]);
        if (sales === null || cos === null) return null;
        const gp = sales - cos;
        return { text: [
            "Step 1: Formula", "Gross profit = Sales − Cost of sales",
            "Step 2: Substitute", `Gross profit = ${mcR(sales)} − ${mcR(cos)} = ${mcR(gp)}`,
            "Step 3: Gross profit percentage", `Gross profit % = ${mcR(gp)} ÷ ${mcR(sales)} × 100 = ${mcP((gp / sales) * 100)}`,
            `∴ Gross profit = ${mcR(gp)} (${mcP((gp / sales) * 100)})`
        ] };
    }

    /* ---------- Financial Management solvers: NPV, IRR, payback, break-even, CAPM, EOQ ---------- */

    const mcRs = v => (v < 0 ? "−" : "") + mcR(Math.abs(v));
    const mcN = v => String(+Number(v).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const mcSup = n => String(n).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[+d]).join("");

    /* amounts in order of appearance; ignores years, periods, percentages and dates */
    function mcMoneyTokens(text) {
        const blank = m => " ".repeat(m.length);
        const cleaned = String(text)
            .replace(/\d+(?:\.\d+)?\s*%/g, blank)
            .replace(/\b(?:years?|periods?|yrs?|months?)\s*\d+(?:\s*(?:to|-|and)\s*\d+)?/gi, blank)
            .replace(/\b\d+(?:\.\d+)?\s*(?:years?|yrs?|months?|units?|times)\b/gi, blank)
            .replace(/\b(?:19|20)\d{2}\b/g, blank);
        const re = /r?\s*(\d{1,3}(?:[ ,]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)\s*(billion|bn|million|m|thousand|k)?\b/gi;
        const out = [];
        let m;
        while ((m = re.exec(cleaned))) {
            let v = parseFloat(m[1].replace(/[ ,]/g, ""));
            const u = (m[2] || "").toLowerCase();
            if (u === "billion" || u === "bn") v *= 1e9;
            else if (u === "million" || u === "m") v *= 1e6;
            else if (u === "thousand" || u === "k") v *= 1e3;
            if (isFinite(v)) out.push({ value: v, index: m.index });
        }
        return out;
    }

    function mcPickRate(text) {
        const re = /(\d+(?:\.\d+)?)\s*%/g;
        let m, first = null;
        while ((m = re.exec(text))) {
            if (first === null) first = parseFloat(m[1]);
            const before = text.slice(Math.max(0, m.index - 60), m.index).toLowerCase();
            if (/discount|required|cost of capital|rate of return|hurdle|interest|wacc|rate/.test(before)) return parseFloat(m[1]);
        }
        return first;
    }

    /* investment + list of cash flows */
    function mcParseProject(text) {
        const toks = mcMoneyTokens(text);
        const kw = /(initial|invest(?:s|ed|ment)?|outlay|capital expenditure|purchas\w*|costs?\b|spends?|buys?|pays?)/i.exec(text);
        if (!kw || !toks.length) return { missing: "initial investment" };

        const invIdx = toks.findIndex(t => t.index >= kw.index);
        if (invIdx < 0) return { missing: "initial investment" };

        const investment = toks[invIdx].value;
        let flows = toks.filter((t, i) => i !== invIdx).map(t => t.value);

        const rep = text.match(/(\d+)\s*(?:years?|yrs?)/i);
        if (flows.length === 1 && rep && /(each|every|per|annual|a year|yearly|for\s+\d+\s*(?:years?|yrs?))/i.test(text)) {
            flows = Array(parseInt(rep[1], 10)).fill(flows[0]);
        }
        if (!flows.length) return { missing: "the yearly cash flows" };
        return { investment, flows };
    }

    function mcNpvAt(rate, investment, flows) {
        return flows.reduce((sum, cf, i) => sum + cf / Math.pow(1 + rate, i + 1), -investment);
    }

    function mcSolveNPV(text) {
        if (!/\bnpv\b|net present value/i.test(text)) return null;
        const p = mcParseProject(text);
        if (p.missing) return { missing: [p.missing] };
        const r = mcPickRate(text);
        if (r === null) return { missing: ["the discount rate (required return)"] };

        const i = r / 100;
        const L = [
            "Step 1: Write the formula", "NPV = −I₀ + Σ [CFₜ ÷ (1 + r)ᵗ]",
            "Step 2: List the given values", `I₀ = ${mcR(p.investment)}`, `r = ${mcP(r)}`,
            ...p.flows.map((cf, k) => `Year ${k + 1} cash flow = ${mcR(cf)}`),
            "Step 3: Discount each cash flow"
        ];
        let total = 0;
        p.flows.forEach((cf, k) => {
            const pv = cf / Math.pow(1 + i, k + 1);
            total += pv;
            L.push(`Year ${k + 1}: ${mcR(cf)} ÷ (1 + ${+(i).toFixed(4)})${k + 1 <= 9 ? mcSup(k + 1) : "^" + (k + 1)} = ${mcR(pv)}`);
        });
        const npv = total - p.investment;
        L.push("Step 4: Add the present values and subtract the investment",
            `Total PV of inflows = ${mcR(total)}`,
            `NPV = ${mcR(total)} − ${mcR(p.investment)} = ${mcRs(npv)}`,
            `∴ NPV = ${mcRs(npv)} → ${npv > 0 ? "accept the project (NPV > 0)" : npv < 0 ? "reject the project (NPV < 0)" : "indifferent (NPV = 0)"}`);
        return { assumed: ["Cash flows were taken in the order given, one at the end of each year."], text: L };
    }

    function mcSolveIRR(text) {
        if (!/\birr\b|internal rate of return/i.test(text)) return null;
        const p = mcParseProject(text);
        if (p.missing) return { missing: [p.missing] };

        let lo = null, hi = null, prev = mcNpvAt(-0.9, p.investment, p.flows);
        for (let r = -0.89; r <= 5; r += 0.01) {
            const v = mcNpvAt(r, p.investment, p.flows);
            if ((prev < 0 && v > 0) || (prev > 0 && v < 0)) { lo = r - 0.01; hi = r; break; }
            prev = v;
        }
        if (lo === null) return { missing: ["cash flows that produce a positive and a negative NPV (an IRR may not exist)"] };

        for (let k = 0; k < 100; k++) {
            const mid = (lo + hi) / 2;
            const f = mcNpvAt(mid, p.investment, p.flows);
            const flo = mcNpvAt(lo, p.investment, p.flows);
            if ((flo < 0 && f > 0) || (flo > 0 && f < 0)) hi = mid; else lo = mid;
        }
        const irr = ((lo + hi) / 2) * 100;
        const hurdle = mcPickRate(text);

        const L = [
            "Step 1: Definition", "IRR is the rate r where NPV = 0",
            "Step 2: List the given values", `I₀ = ${mcR(p.investment)}`,
            ...p.flows.map((cf, k) => `Year ${k + 1} cash flow = ${mcR(cf)}`),
            "Step 3: Find r by trial and error (bisection)",
            `NPV at ${mcP(irr)} ≈ ${mcRs((v => (Math.abs(v) < 0.5 ? 0 : v))(mcNpvAt(irr / 100, p.investment, p.flows)))}`,
            `∴ IRR ≈ ${mcP(irr)}`
        ];
        if (hurdle !== null) L.push(`Compare: IRR ${irr > hurdle ? ">" : "<"} required return ${mcP(hurdle)} → ${irr > hurdle ? "accept" : "reject"} the project`);
        return { text: L };
    }

    function mcSolvePayback(text) {
        if (!/payback/i.test(text)) return null;
        const p = mcParseProject(text);
        if (p.missing) return { missing: [p.missing] };

        const discount = /discounted/i.test(text);
        const r = mcPickRate(text);
        if (discount && r === null) return { missing: ["the discount rate (for discounted payback)"] };

        const L = ["Step 1: Method", discount ? "Discounted payback: accumulate discounted cash flows until I₀ is recovered" : "Accumulate cash flows until I₀ is recovered", `I₀ = ${mcR(p.investment)}`, "Step 2: Cumulative cash flow"];
        let cum = 0, result = null;
        for (let k = 0; k < p.flows.length; k++) {
            const cf = discount ? p.flows[k] / Math.pow(1 + r / 100, k + 1) : p.flows[k];
            const before = cum;
            cum += cf;
            L.push(`Year ${k + 1}: ${mcR(cf)} → cumulative ${mcR(cum)}`);
            if (result === null && cum >= p.investment) {
                result = k + (p.investment - before) / cf;
                L.push("Step 3: Fraction of the recovery year", `(${mcR(p.investment)} − ${mcR(before)}) ÷ ${mcR(cf)} = ${+((p.investment - before) / cf).toFixed(2)}`);
                break;
            }
        }
        if (result === null) { L.push(`∴ The investment is not recovered within ${p.flows.length} years`); return { text: L }; }
        L.push(`∴ ${discount ? "Discounted payback" : "Payback"} ≈ ${+result.toFixed(2)} years`);
        return { text: L };
    }

    function mcSolveBreakEven(text) {
        if (!/break[- ]?even/i.test(text)) return null;
        const val = re => { const m = text.match(re); return m ? mcNum(m[1]) : null; };
        const num = "(r?\\s*\\d[\\d\\s,]*(?:\\.\\d+)?\\s*(?:million|m|thousand|k)?)";
        const fc = val(new RegExp("fixed (?:costs?|expenses?|overheads?)[^\\d]{0,30}" + num, "i"));
        const sp = val(new RegExp("(?:selling price|sales price|price per unit|sells? (?:each |it )?(?:at|for))[^\\d]{0,30}" + num, "i"));
        const vc = val(new RegExp("variable (?:costs?|expenses?)(?: per unit)?[^\\d]{0,30}" + num, "i"));

        const missing = [];
        if (fc === null) missing.push("fixed costs");
        if (sp === null) missing.push("selling price per unit");
        if (vc === null) missing.push("variable cost per unit");
        if (missing.length) return { missing };
        if (sp <= vc) return { text: ["The selling price is not higher than the variable cost per unit, so the contribution is not positive.", "∴ There is no break-even point"] };

        const cm = sp - vc, units = fc / cm;
        const L = [
            "Step 1: Formula", "Break-even units = Fixed costs ÷ (Selling price − Variable cost per unit)",
            "Step 2: Contribution per unit", `${mcR(sp)} − ${mcR(vc)} = ${mcR(cm)}`,
            "Step 3: Break-even units", `${mcR(fc)} ÷ ${mcR(cm)} = ${mcN(units)} units`,
            "Step 4: Break-even revenue", `${mcN(units)} × ${mcR(sp)} = ${mcR(units * sp)}`
        ];
        const tp = text.match(/target profit[^\d]{0,20}(r?\s*\d[\d\s,]*(?:\.\d+)?)/i);
        if (tp) {
            const t = mcNum(tp[1]);
            L.push("Step 5: Units for the target profit", `(${mcR(fc)} + ${mcR(t)}) ÷ ${mcR(cm)} = ${mcN((fc + t) / cm)} units`);
        }
        L.push(`∴ Break-even = ${Math.ceil(units - 1e-9).toLocaleString("en-US").replace(/,/g, " ")} units (${mcR(units * sp)})`);
        return { text: L };
    }

    function mcSolveCAPM(text) {
        if (!/capm|capital asset pricing/i.test(text)) return null;
        const pct = re => { const m = text.match(re); return m ? parseFloat(m[1]) : null; };
        const beta = pct(/beta[^\d-]{0,20}(-?\d+(?:\.\d+)?)/i);
        const rf = pct(/risk[- ]free[^\d]{0,30}(\d+(?:\.\d+)?)\s*%/i);
        let rm = pct(/market (?:return|rate of return)[^\d]{0,30}(\d+(?:\.\d+)?)\s*%/i);
        const prem = pct(/market risk premium[^\d]{0,30}(\d+(?:\.\d+)?)\s*%/i);

        const missing = [];
        if (beta === null) missing.push("beta");
        if (rf === null) missing.push("risk-free rate");
        if (rm === null && prem === null) missing.push("market return (or market risk premium)");
        if (missing.length) return { missing };

        const premium = prem !== null ? prem : rm - rf;
        const ke = rf + beta * premium;
        return { text: [
            "Step 1: Formula", "Ke = Rf + β × (Rm − Rf)",
            "Step 2: Given values", `Rf = ${mcP(rf)}`, `β = ${beta}`, prem !== null ? `Market risk premium = ${mcP(prem)}` : `Rm = ${mcP(rm)}`,
            "Step 3: Market risk premium", prem !== null ? `${mcP(prem)}` : `${mcP(rm)} − ${mcP(rf)} = ${mcP(premium)}`,
            "Step 4: Substitute", `Ke = ${mcP(rf)} + ${beta} × ${mcP(premium)}`,
            `∴ Ke = ${mcP(ke)}`
        ] };
    }

    function mcSolveEOQ(text) {
        if (!/\beoq\b|economic order quantity/i.test(text)) return null;
        const num = "(r?\\s*\\d[\\d\\s,]*(?:\\.\\d+)?)";
        const g = re => { const m = text.match(re); return m ? mcNum(m[1]) : null; };
        const D = g(new RegExp("(?:annual |yearly )?demand[^\\d]{0,25}" + num, "i"));
        const S = g(new RegExp("(?:ordering|order|setup) cost[^\\d]{0,25}" + num, "i"));
        const H = g(new RegExp("(?:holding|carrying|storage) cost[^\\d]{0,25}" + num, "i"));
        const missing = [];
        if (D === null) missing.push("annual demand");
        if (S === null) missing.push("ordering cost per order");
        if (H === null) missing.push("holding cost per unit per year");
        if (missing.length) return { missing };

        const q = Math.sqrt((2 * D * S) / H);
        return { text: [
            "Step 1: Formula", "EOQ = √(2 × D × S ÷ H)",
            "Step 2: Substitute", `EOQ = √(2 × ${mcN(D)} × ${mcN(S)} ÷ ${mcN(H)})`, `EOQ = √${mcN((2 * D * S) / H)}`,
            `∴ EOQ ≈ ${+q.toFixed(2)} units per order`
        ] };
    }

    /* ---------- math.js (loaded from unpkg) ----------
       Used for what the built-in solvers cannot do: trig/log/factorial/statistics,
       matrices, unit conversion, derivatives and simplification.
       If it cannot load (offline), the app simply keeps using its own solvers. */

    const MC_MATHJS_URL = "https://unpkg.com/mathjs@15.2.0/lib/browser/math.js";
    let mcMath = null;
    let mcMathLoading = false;

    function mcAttachMath(lib) {
        try {
            const lb = lib && (lib.create ? lib : lib.default);
            if (!lb || !lb.create) return;

            const m = lb.create(lb.all);
            const keep = { evaluate: m.evaluate, parse: m.parse, simplify: m.simplify, derivative: m.derivative };

            /* students type the expressions, so switch off the risky functions */
            const blocked = () => { throw new Error("This function is disabled"); };
            m.import({ import: blocked, createUnit: blocked, reviver: blocked, evaluate: blocked, parse: blocked, simplify: blocked, derivative: blocked }, { override: true });

            mcMath = { m, evaluate: keep.evaluate, parse: keep.parse, simplify: keep.simplify, derivative: keep.derivative };
        } catch (e) {
            mcMath = null;
        }
    }

    function mcInitMath() {
        if (mcMath || mcMathLoading) return;
        if (typeof window !== "undefined" && window.math) { mcAttachMath(window.math); if (mcMath) return; }

        mcMathLoading = true;
        const s = document.createElement("script");
        s.src = MC_MATHJS_URL;
        s.async = true;
        s.onload = () => { mcMathLoading = false; if (window.math) mcAttachMath(window.math); };
        s.onerror = () => { mcMathLoading = false; };
        document.head.appendChild(s);
    }

    function mcMathPrep(s) {
        return String(s)
            .replace(/[−–]/g, "-").replace(/×/g, "*").replace(/÷/g, "/")
            .replace(/√\s*(\d+(?:\.\d+)?|\([^()]*\))/g, "sqrt($1)")
            .replace(/π/g, "pi").replace(/²/g, "^2").replace(/³/g, "^3")
            .replace(/\s+/g, " ").trim();
    }

    /* every name in the expression must be a real math.js function, constant or unit */
    function mcMathKnownNames(node) {
        let ok = true;
        node.traverse(n => {
            if (n.type === "AssignmentNode" || n.type === "FunctionAssignmentNode" || n.type === "BlockNode" || n.type === "ObjectNode") ok = false;
            if (n.type === "SymbolNode") {
                const name = n.name;
                const isFn = name in mcMath.m;
                let isUnit = false;
                try { isUnit = mcMath.m.Unit.isValuelessUnit(name); } catch (e) { /* ignore */ }
                if (!isFn && !isUnit) ok = false;
            }
        });
        return ok;
    }

    function mcSolveMathjs(text) {
        if (!mcMath) return null;
        const raw = mcMathPrep(text);

        try {
            /* derivative */
            let m = raw.match(/^(?:please\s+)?(?:differentiate|find the derivative of|derivative of|d\/dx(?:\s+of)?)\s*:?\s*(.+?)(?:\s+with respect to\s+([a-z]))?\s*\??$/i);
            if (m && !/[^0-9a-z+\-*/^().,\s]/i.test(m[1])) {
                const v = m[2] || "x";
                const f = m[1].replace(/^f\(\s*[a-z]\s*\)\s*=\s*|^y\s*=\s*/i, "");
                const d = mcMath.simplify(mcMath.derivative(f, v)).toString();
                return { text: ["Step 1: Write the function", `f(${v}) = ${f}`, "Step 2: Differentiate (power, product, quotient and chain rules as needed)", `∴ f′(${v}) = ${d}`] };
            }

            /* simplify */
            m = raw.match(/^(?:please\s+)?simplify\s*:?\s*(.+?)\s*\??$/i);
            if (m && !/[^0-9a-z+\-*/^().,\s]/i.test(m[1])) {
                const s = mcMath.simplify(m[1]).toString();
                return { text: ["Step 1: Write the expression", m[1], "Step 2: Simplify", `∴ ${m[1]} = ${s}`] };
            }

            /* general expression: functions, matrices, units, statistics */
            const expr = raw.replace(/^(?:please\s+)?(?:calculate|what is|what's|work out|evaluate|compute|find|convert)\s*:?\s*/i, "").replace(/[?=\s]+$/g, "");
            if (!expr || !/\d/.test(expr) || expr.length > 300) return null;

            const node = mcMath.parse(expr);
            if (node.type === "ConstantNode" || node.type === "SymbolNode") return null;
            if (!mcMathKnownNames(node)) return null;

            const value = mcMath.evaluate(expr);
            if (value === undefined || value === null || typeof value === "function") return null;

            const shown = typeof value === "number"
                ? (Number.isFinite(value) ? mcMinus(+value.toPrecision(12)) : null)
                : mcMath.m.format(value, { precision: 10 });
            if (shown === null || shown === "undefined") return null;

            return { text: ["Step 1: Write the expression", expr, "Step 2: Evaluate", `∴ ${expr} = ${shown}`] };
        } catch (e) {
            return null;
        }
    }

    mcInitMath();

    /* ---------- combined local solver ---------- */

    function mcSolveLocal(text) {
        const solvers = [mcSolveWACC, mcSolveNPV, mcSolveIRR, mcSolvePayback, mcSolveBreakEven, mcSolveCAPM, mcSolveEOQ, mcSolveVAT, mcSolveGrossProfit, mcSolveEquation, mcSolveArithmetic, mcSolveMathjs];
        for (const s of solvers) {
            const r = s(text);
            if (r && !r.unsupported) return r;
        }
        return null;
    }

    /* ---------- symbol button (appears with the keyboard, opens a symbol panel) ---------- */

    (function mcSymbolPanel() {
        if (!questionInput || document.getElementById("mcSymWrap")) return;

        const symbols = ["+", "−", "×", "÷", "=", "(", ")", "^", "²", "³", "√", "π", "±", "≤", "≥", "≠", "≈", "%", "Δ", "Σ", "x", "∴"];
        const keyStyle = "width:40px;height:40px;border-radius:8px;border:1px solid rgba(128,128,128,.45);background:rgba(128,128,128,.14);color:inherit;font-size:18px;line-height:1;cursor:pointer;padding:0;";

        /* in-flow container: it pushes things apart instead of covering them */
        const wrap = document.createElement("div");
        wrap.id = "mcSymWrap";
        wrap.style.cssText = "display:none;box-sizing:border-box;width:100%;position:relative;";

        const row = document.createElement("div");
        row.style.cssText = "display:flex;justify-content:flex-start;padding:4px 10px 2px;";

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.textContent = "Σ";
        toggle.title = "Maths symbols";
        toggle.setAttribute("aria-label", "Show maths symbols");
        toggle.setAttribute("aria-expanded", "false");
        toggle.style.cssText = "width:34px;height:34px;border-radius:50%;border:1px solid rgba(128,128,128,.5);background:rgba(128,128,128,.16);color:inherit;font-size:16px;line-height:1;cursor:pointer;padding:0;";
        row.appendChild(toggle);

        const panel = document.createElement("div");
        panel.style.cssText = "display:none;flex-wrap:wrap;gap:6px;padding:6px 10px 8px;max-height:35vh;overflow-y:auto;box-sizing:border-box;";

        /* keep the keyboard open when pressing the button or any symbol */
        const keepFocus = el => {
            el.addEventListener("pointerdown", e => e.preventDefault());
            el.addEventListener("mousedown", e => e.preventDefault());
            el.addEventListener("touchend", e => e.stopPropagation());
        };
        keepFocus(toggle);

        symbols.forEach(sym => {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = sym;
            b.setAttribute("aria-label", "Insert " + sym);
            b.style.cssText = keyStyle;
            keepFocus(b);
            b.addEventListener("click", () => {
                const start = questionInput.selectionStart ?? questionInput.value.length;
                const end = questionInput.selectionEnd ?? start;
                questionInput.value = questionInput.value.slice(0, start) + sym + questionInput.value.slice(end);
                questionInput.selectionStart = questionInput.selectionEnd = start + sym.length;
                questionInput.dispatchEvent(new Event("input", { bubbles: true }));
                questionInput.focus();
            });
            panel.appendChild(b);
        });

        wrap.appendChild(row);
        wrap.appendChild(panel);

        /* place it: inside the composer if that is fixed/sticky, otherwise directly above it */
        let fixedEl = null;
        for (let el = questionInput.parentElement; el && el !== document.body; el = el.parentElement) {
            const pos = window.getComputedStyle(el).position;
            if (pos === "fixed" || pos === "sticky" || pos === "absolute") { fixedEl = el; break; }
        }
        if (fixedEl) {
            fixedEl.insertBefore(wrap, fixedEl.firstChild);
        } else {
            const host = questionInput.parentElement;
            if (host && host.parentElement) host.parentElement.insertBefore(wrap, host);
        }

        /* keep the last message visible when the composer grows (never touches the screen while hidden) */
        const basePad = chatArea ? parseFloat(window.getComputedStyle(chatArea).paddingBottom) || 0 : 0;
        let shown = false, isOpen = false, padChanged = false;

        function reflow() {
            if (!chatArea) return;
            if (fixedEl && shown) {
                chatArea.style.paddingBottom = (basePad + wrap.offsetHeight) + "px";
                padChanged = true;
            } else if (padChanged) {
                chatArea.style.paddingBottom = "";
                padChanged = false;
            }
            if (shown && chatArea.querySelector(".message-row")) {
                requestAnimationFrame(() => { chatArea.scrollTop = chatArea.scrollHeight; });
            }
        }

        function setOpen(open) {
            if (open === isOpen) return;
            isOpen = open;
            panel.style.display = open ? "flex" : "none";
            toggle.textContent = open ? "✕" : "Σ";
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Hide maths symbols" : "Show maths symbols");
            reflow();
        }

        function setVisible(visible) {
            if (visible === shown) return;          /* no change = do nothing at all */
            shown = visible;
            wrap.style.display = visible ? "block" : "none";
            if (!visible) setOpen(false);
            reflow();
        }

        toggle.addEventListener("click", () => setOpen(!isOpen));

        /* The button only appears once the on-screen keyboard is really open.
           Before that (including the app's automatic focus at start-up) nothing is shown. */
        const vv = window.visualViewport;
        const viewH = () => (vv ? vv.height : window.innerHeight);
        const touchLike = !(window.matchMedia && window.matchMedia("(pointer: fine)").matches);
        let baseH = viewH();
        let lastW = window.innerWidth;
        let userTyped = false;

        function evaluate() {
            const focused = document.activeElement === questionInput;

            if (!focused) {
                if (window.innerWidth !== lastW) { lastW = window.innerWidth; baseH = viewH(); }   /* rotated */
                else baseH = Math.max(baseH, viewH());
                userTyped = false;
                setVisible(false);
                return;
            }

            const keyboardUp = (baseH - viewH()) > 120;          /* phone/tablet keyboard opened */
            setVisible(touchLike ? keyboardUp : userTyped);      /* desktop: only once typing starts */
        }

        questionInput.addEventListener("focus", () => { setTimeout(evaluate, 80); setTimeout(evaluate, 400); });
        questionInput.addEventListener("blur", () => setTimeout(evaluate, 200));
        questionInput.addEventListener("input", () => { userTyped = true; evaluate(); });
        if (vv) vv.addEventListener("resize", evaluate);
        window.addEventListener("resize", evaluate);
    })();

    /* ---------- document parsing ---------- */

    function mcMarks(text) {
        const m = text.match(/\(\s*(\d+)\s*marks?\s*\)|\[\s*(\d+)\s*(?:marks?)?\s*\]|\b(\d+)\s*marks?\b/i);
        return m ? parseInt(m[1] || m[2] || m[3], 10) : null;
    }

    function mcParseDocument(raw) {
        const lines = String(raw).replace(/\r/g, "").split("\n");
        const top = /^\s*(?:question|q)\s*(\d+(?:\.\d+)*)\s*[.:)\-]?\s*(.*)$|^\s*(\d+(?:\.\d+)*)[.)]\s+(.*)$/i;
        const sub = /^\s*\(?([a-z]|[ivx]{1,4})[.)]\s+(.*)$/i;

        const items = [];
        let cur = null, parent = null;

        lines.forEach(line => {
            const t = top.exec(line);
            const s = !t ? sub.exec(line) : null;

            if (t) {
                const label = (t[1] || t[3]).replace(/\.$/, "");
                cur = { label, text: (t[2] !== undefined ? t[2] : t[4]) || "", context: "", isSub: false };
                items.push(cur);
                parent = cur;
            } else if (s && parent && s[1].length <= 4 && /^[a-z]$|^[ivx]+$/i.test(s[1])) {
                cur = { label: `${parent.label}(${s[1].toLowerCase()})`, text: s[2], context: parent.text, isSub: true, parent };
                items.push(cur);
            } else if (cur) {
                cur.text += (cur.text ? "\n" : "") + line;
            } else if (line.trim()) {
                mcDoc.preamble = (mcDoc.preamble || "") + line + "\n";
            }
        });

        /* Questions that have sub-questions are answered via their parts; the stem is passed as context */
        const parents = new Set(items.filter(i => i.isSub).map(i => i.parent));
        const answerable = items.filter(i => !parents.has(i)).map(i => ({
            label: i.label,
            text: i.text.trim(),
            context: ((i.isSub ? i.context : "") + "\n" + (mcDoc.preamble || "")).trim(),
            marks: mcMarks(i.text) || (i.isSub ? mcMarks(i.parent.text) : null)
        }));

        return answerable.filter(q => q.text);
    }

    function mcLooksLikeDocument(raw) {
        mcDoc.preamble = "";
        const items = mcParseDocument(raw);
        return items.length >= 2 ? items : null;
    }

    /* ---------- AI proxy (optional) ---------- */

    async function mcAskAI(payload) {
        if (!mcAI.endpoint) return null;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), mcAI.timeoutMs);
        try {
            const res = await fetch(mcAI.endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();
            return data && data.answer ? String(data.answer) : null;
        } finally {
            clearTimeout(timer);
        }
    }

    /* ---------- answer one question ---------- */

    function mcDepth(marks) {
        if (!marks) return 3;
        return marks <= 2 ? 1 : marks <= 5 ? 3 : 5;
    }

    async function mcAnswerOne(q, opts) {
        const clean = t => String(t).replace(/\(\s*\d+\s*marks?\s*\)|\[\s*\d+\s*(?:marks?)?\s*\]/gi, " ");
        const full = clean((q.context ? q.context + "\n" : "") + q.text);
        /* try the question on its own first (so a document heading cannot interfere), then with its context */
        let local = mcSolveLocal(clean(q.text));
        if (!local || local.missing) {
            const withContext = mcSolveLocal(full);
            if (withContext && (!withContext.missing || !local)) local = withContext;
        }

        let body = "", status = "";

        if (local && local.missing) {
            body = `<p><strong>More information needed:</strong> ${escapeHtml(local.missing.join(", "))}.</p><p>I have not guessed these values.</p>`;
            status = "missing";
        } else if (local) {
            body = opts.answersOnly ? mcLines([local.text[local.text.length - 1]]) : mcLines(local.text);
            if (local.assumed && local.assumed.length) body += `<p><em>Assumption: ${escapeHtml(local.assumed.join(" "))}</em></p>`;
            status = "solved";
        } else {
            let ai = null;
            try { ai = await mcAskAI({ question: q.text, context: q.context, marks: q.marks, answersOnly: !!opts.answersOnly, examFormat: !!opts.exam }); } catch (e) { ai = null; }

            if (ai) {
                body = ai.split(/\n+/).map(l => `<p>${escapeHtml(l)}</p>`).join("");
                status = "ai";
            } else {
                const hit = searchAllSubjects(full, 25)[0];
                if (hit) {
                    const it = hit.item, n = mcDepth(q.marks);
                    body = `<p>${escapeHtml(it.information)}</p>`;
                    if (!opts.answersOnly && it.formulas && it.formulas.length) body += mcLines(it.formulas.slice(0, n).map(f => "Formula: " + f));
                    if (!opts.answersOnly && it.rules && it.rules.length) body += "<ul>" + it.rules.slice(0, n).map(r => `<li>${escapeHtml(r)}</li>`).join("") + "</ul>";
                    body += `<p><em>This comes from my general notes on "${escapeHtml(it.topic)}". It is not worked out from your specific figures or case.</em></p>`;
                    status = "notes";
                } else {
                    body = `<p><em>I can't answer this one reliably yet. It needs a connected AI model (see mcAI.endpoint) or a topic I have notes for.</em></p>`;
                    status = "unsupported";
                }
            }
        }

        const marks = q.marks ? ` <small>[${q.marks} mark${q.marks === 1 ? "" : "s"}]</small>` : "";
        const header = opts.exam
            ? `<h3>Question ${escapeHtml(q.label)}${marks}</h3><p><strong>Answer:</strong></p>`
            : `<h3>${escapeHtml(q.label)}${marks}</h3>`;

        return { html: header + body, status };
    }

    /* ---------- answer a batch ---------- */

    async function mcAnswerBatch(opts) {
        const start = mcDoc.next;
        const end = Math.min(start + mcBatchSize, mcDoc.items.length);
        let html = `<h2>Answers ${escapeHtml(mcDoc.items[start].label)} to ${escapeHtml(mcDoc.items[end - 1].label)}</h2>`;
        const counts = { solved: 0, ai: 0, notes: 0, missing: 0, unsupported: 0 };

        for (let i = start; i < end; i++) {
            const r = await mcAnswerOne(mcDoc.items[i], opts);
            counts[r.status]++;
            html += r.html;
        }
        mcDoc.next = end;

        html += `<hr><p><em>Covered ${end} of ${mcDoc.items.length} questions. `;
        html += `Worked from your figures: ${counts.solved}, AI: ${counts.ai}, general notes only: ${counts.notes}, need more info: ${counts.missing}, not answerable here: ${counts.unsupported}.</em></p>`;
        if (end < mcDoc.items.length) html += `<p><strong>Say "continue" for questions ${end + 1} to ${mcDoc.items.length}.</strong></p>`;
        return html;
    }

    /* ---------- request parsing ---------- */

    function mcOptions(text) {
        const t = text.toLowerCase();
        return {
            answersOnly: /(only the answers|answers only|just the answers|give me only the answers)/.test(t),
            exam: /(exam(ination)? format|exam style|as in an exam)/.test(t)
        };
    }

    function mcFindQuestion(label) {
        return mcDoc.items.find(q => q.label.toLowerCase() === label.toLowerCase()) ||
            mcDoc.items.find(q => q.label.toLowerCase().startsWith(label.toLowerCase() + "("));
    }

    function mcPlaceholder(promise, label) {
        const slotId = "wikiSlot" + (++wikiSlotCounter);
        promise.then(html => wikiFillSlot(slotId, html))
            .catch(() => wikiFillSlot(slotId, "<p>Something went wrong while answering. Please try again.</p>"));
        return `<div id="${slotId}"><div class="thinking"><span>${escapeHtml(label || "Working through the questions")}</span><span class="thinking-dot"></span><span class="thinking-dot"></span><span class="thinking-dot"></span></div></div>`;
    }

    function mcHandle(question) {
        const text = String(question);
        const lower = text.toLowerCase().trim();
        const opts = mcOptions(text);

        /* "continue" through a long document */
        if (mcDoc.items.length && mcDoc.next < mcDoc.items.length && /^(continue|next|go on|carry on|more)\b/.test(lower)) {
            return mcPlaceholder(mcAnswerBatch(mcDoc.lastOpts || opts));
        }

        /* A new pasted document with several questions */
        const items = (text.length > 80 || text.includes("\n")) ? mcLooksLikeDocument(text) : null;
        if (items) {
            mcDoc = { items, next: 0, raw: text, preamble: "", lastOpts: opts };
            return mcPlaceholder(mcAnswerBatch(opts));
        }

        /* "explain question 2" about the stored document */
        const ref = lower.match(/(?:question|q|no\.?|number)\s*(\d+(?:\.\d+)?(?:\([a-z]\))?)/);
        if (ref && mcDoc.items.length) {
            const q = mcFindQuestion(ref[1]);
            if (!q) return `<p>I could not find question ${escapeHtml(ref[1])} in the document you pasted. I found: ${escapeHtml(mcDoc.items.map(i => i.label).join(", "))}.</p>`;
            return mcPlaceholder(mcAnswerOne(q, opts).then(r => r.html));
        }

        /* A single question with figures or an equation */
        const local = mcSolveLocal(text.replace(/\(\s*\d+\s*marks?\s*\)|\[\s*\d+\s*(?:marks?)?\s*\]/gi, " "));
        if (local) {
            if (local.missing) {
                return `<h2>More information needed</h2><p>To answer this I still need: <strong>${escapeHtml(local.missing.join(", "))}</strong>.</p><p>I have not guessed these values.</p>`;
            }
            let html = `<h2>Worked solution</h2>` + mcLines(local.text);
            if (local.assumed && local.assumed.length) html += `<p><em>Assumption: ${escapeHtml(local.assumed.join(" "))}</em></p>`;
            return html;
        }

        return null;
    }

    const mcPreviousGenerate = generateAnswer;
    generateAnswer = function (question) {
        try {
            const result = mcHandle(question);
            if (result !== null) return result;
        } catch (e) { /* fall through to the normal engine */ }
        return mcPreviousGenerate(question);
    };

    /* ---------- AI for everything else (live facts, any subject) ----------
       Only active once mcAI.endpoint is set to YOUR proxy (see the proxy file).
       Order: calculators and documents -> your own notes -> AI with web search
       -> free live sources (Wikidata, Wikipedia...) if the AI is unreachable. */

    function mcRenderAI(text) {
        return String(text).split(/\n+/).filter(l => l.trim()).map(l =>
            `<p>${escapeHtml(l).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`).join("");
    }

    const mcPreviousGenerate2 = generateAnswer;
    generateAnswer = function (question) {
        if (!mcAI.endpoint) return mcPreviousGenerate2(question);

        try {
            const handled = mcHandle(question);                      /* solvers, documents, "continue" */
            if (handled !== null) return handled;

            const localAnswer = originalGenerateAnswer(question);    /* your notes, jokes, essays, statements... */
            const localFailed =
                isFallbackAnswer(localAnswer) ||
                localAnswer.includes("I don't have that one in my study notes") ||
                localAnswer.includes("I'm not 100% sure what you meant");

            if (!localFailed && wikiNotesAnsweredWell(question, localAnswer)) return localAnswer;

            const fallback = async () => {
                try {
                    const html = await wikiResolve(question, wikiMathExpression(question));
                    return html || localAnswer;
                } catch (e) { return localAnswer; }
            };

            return mcPlaceholder(
                mcAskAI({ question: question, mode: "general" })
                    .then(answer => (answer ? mcRenderAI(answer) : fallback()))
                    .catch(() => fallback()),
                "Looking that up"
            );
        } catch (e) {
            return mcPreviousGenerate2(question);
        }
    };

    /* =========================================================
       WELCOME SCREEN ANIMATION
       Logo spins in, the heading and subtitle flip in word by word,
       then the subject cards rise in and their letters spin.
       Plays every time the welcome screen appears (app open, Home,
       New chat, Clear chat). Tap the "M" logo to replay it.
       Respects the Reduced Motion setting and the device setting.
    ========================================================= */

    (function mcWelcomeAnimation() {

        if (!document.getElementById("mcWelcomeStyle")) {
            const style = document.createElement("style");
            style.id = "mcWelcomeStyle";
            style.textContent = `
                @keyframes mcLogoSpin {
                    0%   { opacity: 0; transform: scale(0) rotate(-540deg); }
                    60%  { opacity: 1; transform: scale(1.15) rotate(20deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0deg); }
                }
                @keyframes mcFloat {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-5px); }
                }
                @keyframes mcWordSpin {
                    0%   { opacity: 0; transform: perspective(500px) rotateX(-100deg) translateY(14px); }
                    100% { opacity: 1; transform: perspective(500px) rotateX(0deg) translateY(0); }
                }
                @keyframes mcCardIn {
                    0%   { opacity: 0; transform: translateY(26px) scale(0.94); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes mcLetterFlip {
                    0%   { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }

                .mc-anim .welcome-logo {
                    cursor: pointer;
                    animation:
                        mcLogoSpin 1.1s cubic-bezier(0.2, 0.9, 0.3, 1.15) backwards,
                        mcFloat 3.2s ease-in-out 1.3s infinite;
                }
                .mc-anim .mc-word {
                    display: inline-block;
                    transform-origin: 50% 100%;
                    animation: mcWordSpin 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
                }
                .mc-anim .subject-card {
                    animation: mcCardIn 0.6s ease-out backwards;
                    animation-delay: var(--mc-card-delay, 1.2s);
                }
                .mc-anim .subject-letter {
                    animation: mcLetterFlip 0.9s ease-in-out backwards;
                    animation-delay: var(--mc-letter-delay, 1.4s);
                }

                @media (prefers-reduced-motion: reduce) {
                    .mc-anim .welcome-logo,
                    .mc-anim .mc-word,
                    .mc-anim .subject-card,
                    .mc-anim .subject-letter { animation: none !important; }
                }
                body.reduced-motion .mc-anim .welcome-logo,
                body.reduced-motion .mc-anim .mc-word,
                body.reduced-motion .mc-anim .subject-card,
                body.reduced-motion .mc-anim .subject-letter { animation: none !important; }
            `;
            document.head.appendChild(style);
        }

        /* Turn a line of text into words that can animate one at a time */
        function splitWords(el, startDelay, step) {
            if (!el) return 0;
            if (el.dataset.mcSplit) return el.querySelectorAll(".mc-word").length;

            const text = el.textContent.trim();
            if (!text) return 0;

            el.dataset.mcSplit = "1";
            el.setAttribute("aria-label", text);
            el.textContent = "";

            const words = text.split(/\s+/);
            words.forEach((word, i) => {
                const span = document.createElement("span");
                span.className = "mc-word";
                span.setAttribute("aria-hidden", "true");
                span.style.animationDelay = (startDelay + i * step).toFixed(2) + "s";
                span.textContent = word;
                el.appendChild(span);
                if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
            });
            return words.length;
        }

        function play(root) {
            root.classList.remove("mc-anim");
            void root.offsetWidth;                 /* restart the animations */
            root.classList.add("mc-anim");
        }

        function mcAnimateWelcome(root) {
            if (!root || root.dataset.mcAnimated) return;
            root.dataset.mcAnimated = "1";

            const heading = root.querySelector("h1");
            const subtitle = root.querySelector(".welcome-content > p");

            const headingWords = splitWords(heading, 0.55, 0.1);
            splitWords(subtitle, 0.55 + headingWords * 0.1 + 0.15, 0.04);

            root.querySelectorAll(".subject-card").forEach((card, i) => {
                card.style.setProperty("--mc-card-delay", (1.3 + i * 0.15).toFixed(2) + "s");
                const letter = card.querySelector(".subject-letter");
                if (letter) letter.style.setProperty("--mc-letter-delay", (1.55 + i * 0.15).toFixed(2) + "s");
            });

            const logo = root.querySelector(".welcome-logo");
            if (logo) logo.addEventListener("click", () => play(root));

            play(root);
        }

        /* the welcome screen that is already on the page when the app opens */
        mcAnimateWelcome(document.getElementById("welcomeScreen"));

        /* every welcome screen created later (Home, New chat, Clear chat) */
        const mcOriginalCreateWelcome = createWelcomeScreen;
        createWelcomeScreen = function () {
            const screen = mcOriginalCreateWelcome();
            mcAnimateWelcome(screen);
            return screen;
        };
    })();

    /* =========================================================
       END OF DOCUMENT + WORD-PROBLEM UPGRADE
    ========================================================= */

    /* =========================================================
       ACCOUNTING CALCULATION ENGINE (ADD-ON, JavaScript only)
       Paste this whole block directly ABOVE the "LOAD SETTINGS"
       section of script.js (below "END OF DOCUMENT + WORD-PROBLEM
       UPGRADE"). Nothing existing is changed or removed: it wraps
       generateAnswer, tries to solve the question first, and hands
       everything it cannot solve back to the existing system.

       - No backend, no API key, no internet, no eval()/new Function.
       - Every number comes from the learner's text; nothing is
         invented. Missing facts are asked for, not guessed.
       - Rates that change over time live in CONFIG below.
    ========================================================= */

    const mcAcct = (function () {
        "use strict";

        /* ---------- CONFIG: values that change over time ---------- */
        const CONFIG = {
            taxYear: "2025/26",                  /* update when SARS changes the rules */
            defaults: { vatRate: 15 },           /* used ONLY when the question gives no VAT rate (an assumption is shown) */
            companyTaxRate: null                 /* null = always ask. Set e.g. 27 to allow a default (an assumption is shown) */
        };

        /* ---------- small helpers ---------- */
        const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        const r2 = v => Math.round((v + Number.EPSILON) * 100) / 100;
        const isInt = v => Math.abs(v - Math.round(v)) < 0.005;
        function grp(n, dp) {
            const p = Math.abs(n).toFixed(dp).split(".");
            return p[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (p[1] ? "." + p[1] : "");
        }
        const R = v => { const x = r2(v); return (x < 0 ? "−" : "") + "R " + grp(x, isInt(x) ? 0 : 2); };
        function N(v, dp) {
            const x = +Number(v).toFixed(dp === undefined ? 4 : dp);
            const d = (String(Math.abs(x)).split(".")[1] || "").length;
            return (x < 0 ? "−" : "") + grp(x, d);
        }
        const P = v => N(v, 2) + "%";
        const sum = arr => (arr || []).reduce((s, f) => s + f.value, 0);
        const first = (by, k) => (by[k] && by[k][0]) || null;
        const close = (a, b) => Math.abs(a - b) <= Math.max(0.01, Math.abs(b) * 0.0005);

        /* ---------- number extraction ----------
           Understands: R150 000, R150,000, 150000, (500 000) as negative, -R5 000,
           15%, R2.5 million, 5 years, 9 months, 200 units ... */
        const MONTHS = "january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec";

        function blank(s, re) { return s.replace(re, m => " ".repeat(m.length)); }

        function clean(raw) {
            let t = String(raw).replace(/\u00a0/g, " ");
            t = blank(t, /\b(?:IAS|IFRS|IFRIC|SIC|Question|Q|Part|Test|Example|Page|Section|Step)\s*\d+(?:\.\d+)*/gi);
            t = blank(t, /^[ \t]*\d+[.)][ \t]+/gm);
            t = blank(t, new RegExp("\\b\\d{1,2}(?:st|nd|rd|th)?\\s+(?:" + MONTHS + ")\\b\\.?(?:\\s+(?:19|20)\\d{2})?", "gi"));
            t = blank(t, new RegExp("\\b(?:" + MONTHS + ")\\b\\.?\\s+(?:19|20)\\d{2}\\b", "gi"));
            t = blank(t, /\b(?:in|during|since|ended)\s+(?:19|20)\d{2}(?:\/\d{2,4})?\b/gi);
            t = blank(t, /\b(?:19|20)X\d\b/g);
            return t;
        }

        const CURMAP = { R: "ZAR", ZAR: "ZAR", USD: "USD", "$": "USD", "€": "EUR", EUR: "EUR", "£": "GBP", GBP: "GBP" };

        function extract(raw) {
            const t = clean(raw);
            const re = /(^|[^A-Za-z0-9.(])(\(|-(?=[R$€£\d])|−(?=[R$€£\d])|–(?=[R$€£\d]))?(R|ZAR|USD|\$|€|£|EUR|GBP)?\s?(\d{1,3}(?:[ ,]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(\s*(?:%|percent\b|per cent\b))?(\)?)/gi;
            const facts = [];
            let m;
            while ((m = re.exec(t))) {
                const lead = m[1], open = m[2], cur = m[3], numS = m[4], pct = m[5], closeP = m[6];
                let value = parseFloat(numS.replace(/[ ,]/g, ""));
                if (!isFinite(value)) continue;
                const start = m.index + lead.length;
                let end = m.index + m[0].length;

                let um = t.slice(end).match(/^\s*(billion|bn|million|thousand)\b/i);
                if (!um && cur) um = t.slice(end).match(/^([km])\b/i);
                if (um) {
                    const u = um[1].toLowerCase();
                    value *= (u === "billion" || u === "bn") ? 1e9 : (u === "million" || u === "m") ? 1e6 : 1e3;
                    end += um[0].length;
                }

                const after = t.slice(end, end + 30).toLowerCase();
                let kind = "number";
                if (pct) kind = "percent";
                else if (/^\s*(?:full\s+|complete\s+|whole\s+)?(?:years?|yrs?|yr)\b/.test(after)) kind = "years";
                else if (/^\s*(?:full\s+|complete\s+)?months?\b/.test(after)) kind = "months";
                else if (/^\s*(?:days?|weeks?)\b/.test(after)) kind = "days";
                else if (cur || /^\s*(?:rands?|zar|dollars?|euros?)\b/.test(after)) kind = "money";
                else if (/^\s*(?:units?|pieces?|items?|kg|kgs|kilograms?|litres?|liters?|hours?|hrs?|tonnes?|tons?|km|batches?|shares?|employees?|components?|bottles?|boxes?|metres?|meters?)\b/.test(after)) kind = "qty";

                if (kind !== "percent" && ((open === "(" && closeP === ")" && (cur || value >= 100)) || (open && open !== "("))) value = -value;

                facts.push({ value, kind, start, end, cur: cur ? (CURMAP[cur.toUpperCase()] || cur) : "", idx: facts.length });
            }

            /* labels around each number: the words just before and just after it */
            facts.forEach((f, i) => {
                const lo = Math.max(i ? facts[i - 1].end : 0, f.start - 80);
                let seg = t.slice(lo, f.start);
                const b = Math.max(seg.lastIndexOf(","), seg.lastIndexOf(";"), seg.lastIndexOf("."), seg.lastIndexOf("!"), seg.lastIndexOf("?"), seg.lastIndexOf("\n"));
                if (b >= 0) seg = seg.slice(b + 1);
                f.pre = seg.toLowerCase();

                const hi = Math.min(i < facts.length - 1 ? facts[i + 1].start : t.length, f.end + 50);
                let s2 = t.slice(f.end, hi);
                const b2 = s2.search(/[,;.!?\n]|\band\b|\bwhile\b|\bwhereas\b|\bwith\b|\bbut\b|\bif\b/i);
                if (b2 >= 0) s2 = s2.slice(0, b2);
                f.post = s2.toLowerCase();
            });
            return { t, facts };
        }

        function makeCtx(raw, carry) {
            const e = extract(raw);
            const F = e.facts;
            return {
                raw, t: e.t, low: String(raw).toLowerCase(), F, carry: carry || {},
                money: F.filter(f => f.kind === "money" || f.kind === "number"),
                pct: F.filter(f => f.kind === "percent"),
                yrs: F.filter(f => f.kind === "years"),
                mon: F.filter(f => f.kind === "months"),
                days: F.filter(f => f.kind === "days"),
                qty: F.filter(f => f.kind === "qty")
            };
        }

        /* give every number a role by looking at the words around it.
           Rows are tried in order, so put the most specific roles first. */
        function tag(list, table) {
            const by = {};
            list.forEach(f => {
                f.role = null;
                const shortPost = f.post.trim().length <= 20;
                for (const row of table) {
                    if (row[1].test(f.pre) || (shortPost && row[1].test(f.post))) { f.role = row[0]; break; }
                }
                if (!f.role && !shortPost) {
                    for (const row of table) { if (row[1].test(f.post)) { f.role = row[0]; break; } }
                }
                if (f.role) (by[f.role] = by[f.role] || []).push(f);
            });
            return by;
        }

        /* the sentence that contains position pos (lower-case) */
        function sentenceAt(t, pos) {
            let a = 0, end = t.length, mm;
            const re = /[.;?!\n](?=\s|$)/g;
            while ((mm = re.exec(t))) {
                if (mm.index < pos) a = mm.index + 1; else { end = mm.index; break; }
            }
            return { text: t.slice(a, end).toLowerCase(), offset: a };
        }

        /* ---------- result objects ---------- */
        function Res(topic) {
            return { topic, given: [], required: "", formula: [], subst: [], calc: [], answer: [], journal: [], explanation: "", notes: [], nums: [], values: {} };
        }
        function Miss(topic, list, note) { return { topic, missing: list, note: note || "", nums: [] }; }
        function money(label, v) { return label + ": " + R(v); }

        function render(r, opts) {
            opts = opts || {};
            const head = t => `<p style="margin:12px 0 2px;"><strong>${esc(t)}</strong></p>`;
            const box = a => a.map(x => `<div class="formula">${esc(x)}</div>`).join("");
            let h = `<h2>${esc(r.topic)}</h2>`;

            if (r.missing) {
                h += `<p><strong>More information needed:</strong></p><ul>` + r.missing.map(m => `<li>${esc(m)}</li>`).join("") + `</ul>`;
                h += `<p>I have not guessed these values.</p>`;
                if (r.note) h += `<p><em>${esc(r.note)}</em></p>`;
                return h;
            }

            if (!opts.answersOnly) {
                if (r.given.length) h += head("Given") + `<ul>` + r.given.map(x => `<li>${esc(x)}</li>`).join("") + `</ul>`;
                if (r.required) h += head("Required") + `<p>${esc(r.required)}</p>`;
                if (r.formula.length) h += head("Formula / accounting rule") + box(r.formula);
                if (r.subst.length) h += head("Substitution") + box(r.subst);
                if (r.calc.length) h += head("Calculation") + box(r.calc);
            }
            h += head("Final answer") + r.answer.map(a =>
                `<p style="font-weight:700;margin:6px 0;padding:6px 10px;border-left:3px solid currentColor;">${esc(a)}</p>`).join("");
            if (r.journal.length) h += head("Journal entry") + box(r.journal);
            if (!opts.answersOnly && r.explanation) h += head("Explanation") + `<p>${esc(r.explanation)}</p>`;
            if (r.notes.length) h += `<p><em>${r.notes.map(esc).join(" ")}</em></p>`;
            return h;
        }

        const MODS = [];
        function reg(m) { MODS.push(m); }

        /* =========================================================
           A. BASIC + FINANCIAL ACCOUNTING MODULES
        ========================================================= */

        /* ---------- Accounting equation ---------- */
        reg({
            id: "equation", name: "Accounting equation and equity", status: "full",
            test: c => /\b(assets?|liabilit\w*|equity|capital)\b/.test(c.low) &&
                !/goodwill|non-?controlling|\bnci\b|identifiable|consideration|subsidiar|associate|return on|ratio|deferred|depreciat|impair|break-?even|inventor|\bvat\b|weighted|beta\b|dividend|\bnpv\b|payback|wacc|temporary|revalu/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["assets", /assets?/], ["liab", /liabilit/],
                    ["equity", /equity|owner'?s? interest|net worth|residual interest/],
                    ["addcap", /additional capital|contribut|invested by/],
                    ["capital", /capital|opening balance/],
                    ["profit", /profit|net income/], ["loss", /\bloss\b/], ["draw", /drawing|withdr/]
                ]);
                const A = first(T, "assets"), L = first(T, "liab"), E = first(T, "equity"), K = first(T, "capital");
                const mv = T.profit || T.loss || T.draw || T.addcap;
                const r = Res("Accounting equation");
                r.formula = ["Assets = Equity + Liabilities", "Equity = Assets − Liabilities", "Closing equity = Opening capital + Additional capital + Profit − Loss − Drawings"];

                if (mv && (K || E) && !A && !L) {
                    const open = (K || E).value, add = sum(T.addcap), p = sum(T.profit), l = sum(T.loss), d = sum(T.draw);
                    const close = open + add + p - l - d;
                    r.given.push(money("Opening capital", open));
                    if (add) r.given.push(money("Additional capital", add));
                    if (p) r.given.push(money("Profit", p));
                    if (l) r.given.push(money("Loss", l));
                    if (d) r.given.push(money("Drawings", d));
                    r.required = "Closing equity";
                    r.subst = [`${R(open)} + ${R(add)} + ${R(p)} − ${R(l)} − ${R(d)}`];
                    r.answer = ["Closing equity = " + R(close)];
                    r.explanation = "Profit and capital contributions increase the owner's interest; losses and drawings decrease it.";
                    r.nums = [close]; r.values.equity = close;
                    return r;
                }
                const eq = E || K;
                const have = [A, L, eq].filter(Boolean).length;
                if (have < 2) return null;
                if (A) r.given.push(money("Assets", A.value));
                if (L) r.given.push(money("Liabilities", L.value));
                if (eq) r.given.push(money("Equity", eq.value));

                if (have === 3) {
                    const diff = A.value - (L.value + eq.value);
                    r.required = "Check that the accounting equation balances";
                    r.subst = [`${R(A.value)} ${close(diff, 0) ? "=" : "≠"} ${R(L.value)} + ${R(eq.value)} = ${R(L.value + eq.value)}`];
                    r.answer = [close(diff, 0) ? "The equation balances." : "The equation does not balance: difference = " + R(diff)];
                    r.nums = [diff];
                    return r;
                }
                if (!A) {
                    const a = L.value + eq.value;
                    r.required = "Total assets"; r.subst = [`Assets = ${R(eq.value)} + ${R(L.value)}`];
                    r.answer = ["Assets = " + R(a)]; r.nums = [a]; r.values.assets = a;
                    r.explanation = "Everything the business owns is financed by the owner (equity) or by outsiders (liabilities).";
                } else if (!L) {
                    const l = A.value - eq.value;
                    r.required = "Total liabilities"; r.subst = [`Liabilities = ${R(A.value)} − ${R(eq.value)}`];
                    r.answer = ["Liabilities = " + R(l)]; r.nums = [l]; r.values.liabilities = l;
                    r.explanation = "Liabilities are the part of the assets that is financed by outsiders.";
                } else {
                    const e = A.value - L.value;
                    r.required = "Equity"; r.subst = [`Equity = ${R(A.value)} − ${R(L.value)}`];
                    r.answer = ["Equity = " + R(e)]; r.nums = [e]; r.values.equity = e;
                    r.explanation = e < 0 ? "Liabilities exceed assets, so equity is negative (the business is technically insolvent)."
                        : "Equity is the owner's residual interest in the assets after deducting all liabilities.";
                }
                return r;
            }
        });

        /* ---------- VAT ---------- */
        const INCL = /\b(?:including|inclusive|incl)\b[^.]{0,14}\bvat\b|\bvat[- ]?(?:inclusive|included|incl)\b|\binclusive of vat\b/g;
        const EXCL = /\b(?:excluding|exclusive|excl|before|plus)\b[^.]{0,14}\bvat\b|\bvat[- ]?(?:exclusive|excluded|excl)\b|\bexclusive of vat\b|\badd(?:ed|ing)? vat\b|\bvat (?:is )?(?:added|extra)\b/g;

        function vatStatus(c, f) {
            const s = sentenceAt(c.t, f.start);
            const pos = f.start - s.offset;
            const near = re => {
                let best = null, mm;
                re.lastIndex = 0;
                while ((mm = re.exec(s.text))) { const d = Math.abs(mm.index - pos); if (best === null || d < best) best = d; }
                return best;
            };
            let a = near(INCL), b = near(EXCL);
            if (a === null && b === null) {
                a = near2(c.low, INCL); b = near2(c.low, EXCL);
                if (a !== null && b !== null) return null;
            }
            if (a === null && b === null) return null;
            if (b === null || (a !== null && a <= b)) return "incl";
            return "excl";
        }
        function near2(text, re) { re.lastIndex = 0; return re.exec(text) ? 0 : null; }

        reg({
            id: "vat", name: "VAT", status: "full",
            test: c => /\bvat\b|value[- ]added tax/.test(c.low) && !/deferred|ias|ifrs/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["out", /output vat|vat (charged|collected|on sales|on output)/],
                    ["in", /input vat|vat (paid|on purchases|on inputs|incurred|claimable)/],
                    ["sales", /sales|revenue|sold|turnover/], ["purch", /purchas|bought|expenses|inputs/]
                ]);
                const rf = c.pct.find(f => /vat|rate|tax/.test(f.pre + f.post)) || (c.pct.length === 1 ? c.pct[0] : null);
                const rate = rf ? rf.value : CONFIG.defaults.vatRate;
                const r = Res("Value-Added Tax (VAT)");
                if (!rf) r.notes.push(`No VAT rate was given, so the standard South African rate of ${rate}% (config, tax year ${CONFIG.taxYear}) was assumed.`);
                const f = 1 + rate / 100;
                r.given.push("VAT rate: " + P(rate));

                const out = first(T, "out"), inn = first(T, "in");
                if (out && inn) {
                    const net = out.value - inn.value;
                    r.given.push(money("Output VAT", out.value), money("Input VAT", inn.value));
                    r.required = "VAT payable to (or refundable from) SARS";
                    r.formula = ["VAT payable = Output VAT − Input VAT"];
                    r.subst = [`${R(out.value)} − ${R(inn.value)}`];
                    r.answer = [net >= 0 ? "VAT payable to SARS = " + R(net) : "VAT refundable from SARS = " + R(-net)];
                    r.explanation = "Output VAT is charged on taxable sales; input VAT is claimed on qualifying purchases. The difference is paid to (or refunded by) SARS.";
                    r.nums = [net]; return r;
                }

                const amts = c.money.filter(x => x.value !== 0);
                if (T.sales && T.purch) {
                    const s = T.sales[0], p = T.purch[0];
                    const st = vatStatus(c, s) || vatStatus(c, p);
                    if (!st) return Miss("Value-Added Tax (VAT)", ["whether the sales and purchases amounts include or exclude VAT"]);
                    const sx = st === "incl" ? s.value / f : s.value, px = st === "incl" ? p.value / f : p.value;
                    const ov = sx * rate / 100, iv = px * rate / 100, net = ov - iv;
                    r.given.push(money("Sales (" + (st === "incl" ? "incl." : "excl.") + " VAT)", s.value), money("Purchases (" + (st === "incl" ? "incl." : "excl.") + " VAT)", p.value));
                    r.required = "Output VAT, input VAT and VAT payable";
                    r.formula = ["Output VAT = VAT-exclusive sales × rate", "Input VAT = VAT-exclusive purchases × rate", "VAT payable = Output VAT − Input VAT"];
                    r.calc = [`Output VAT = ${R(sx)} × ${P(rate)} = ${R(ov)}`, `Input VAT = ${R(px)} × ${P(rate)} = ${R(iv)}`, `VAT payable = ${R(ov)} − ${R(iv)} = ${R(net)}`];
                    r.answer = ["Output VAT = " + R(ov), "Input VAT = " + R(iv), net >= 0 ? "VAT payable = " + R(net) : "VAT refundable = " + R(-net)];
                    r.nums = [ov, iv, net]; return r;
                }
                if (amts.length !== 1) {
                    if (amts.length === 0) return Miss("Value-Added Tax (VAT)", ["the amount to calculate VAT on"]);
                    return null;
                }
                const a = amts[0];
                const st = vatStatus(c, a);
                if (!st) return Miss("Value-Added Tax (VAT)", ["whether the amount " + R(a.value) + " includes VAT or excludes VAT"]);
                r.formula = ["VAT-exclusive amount = VAT-inclusive amount ÷ (1 + rate)", "VAT = VAT-inclusive amount − VAT-exclusive amount", "VAT-inclusive amount = VAT-exclusive amount × (1 + rate)"];
                if (st === "incl") {
                    const ex = a.value / f, v = a.value - ex;
                    r.given.push(money("VAT-inclusive amount", a.value));
                    r.required = "VAT-exclusive amount and the VAT";
                    r.subst = [`Excl. = ${R(a.value)} ÷ ${N(f, 4)}`];
                    r.calc = [`Excl. = ${R(ex)}`, `VAT = ${R(a.value)} − ${R(ex)} = ${R(v)}`];
                    r.answer = ["Price excluding VAT = " + R(ex), "VAT = " + R(v)];
                    r.nums = [ex, v]; r.values.vat = v;
                } else {
                    const v = a.value * rate / 100, inc = a.value + v;
                    r.given.push(money("VAT-exclusive amount", a.value));
                    r.required = "VAT and the VAT-inclusive amount";
                    r.subst = [`VAT = ${R(a.value)} × ${P(rate)}`];
                    r.calc = [`VAT = ${R(v)}`, `Incl. = ${R(a.value)} + ${R(v)} = ${R(inc)}`];
                    r.answer = ["VAT = " + R(v), "Price including VAT = " + R(inc)];
                    r.nums = [v, inc]; r.values.vat = v;
                }
                r.explanation = "VAT is an indirect tax added to the selling price; the vendor collects it for SARS.";
                return r;
            }
        });

        /* ---------- IAS 16: cost of property, plant and equipment ---------- */
        const PPE_ROLES = [
            ["disc", /trade discount|discount|rebate/],
            ["excl", /training|advertis|administrat|opening|staff|relocat|reorgani|abnormal|wastage|general overhead|operating loss/],
            ["dismantl", /dismantl|restor|decommission/],
            ["dir", /install|deliver|freight|transport|import dut|duties|assembl|testing|site prep|legal|professional|erection|commission|cartage/],
            ["price", /purchase price|list price|invoice price|price|cost|purchased|bought|acquired|paid/]
        ];

        reg({
            id: "ppe-cost", name: "IAS 16 cost of property, plant and equipment", status: "full",
            test: c => /capitali[sz]|initial cost|cost (of|to be) (the )?(asset|machine|machinery|equipment|plant|vehicle|building)|recognised at (what )?cost/.test(c.low) &&
                !/depreciat|carrying|accumulated/.test(c.low),
            solve(c) {
                const T = tag(c.money, PPE_ROLES);
                const price = first(T, "price");
                if (!price) return Miss("IAS 16 cost of PPE", ["the purchase price of the asset"]);
                const disc = sum(T.disc), dir = sum(T.dir), dis = sum(T.dismantl), ex = sum(T.excl);
                const cost = price.value - disc + dir + dis;
                const r = Res("IAS 16 – Initial cost of property, plant and equipment");
                r.given.push(money("Purchase price", price.value));
                (T.disc || []).forEach(f => r.given.push(money("Trade discount (deducted)", f.value)));
                (T.dir || []).forEach(f => r.given.push(money("Directly attributable cost (" + (f.pre + f.post).trim().slice(0, 30) + ")", f.value)));
                (T.dismantl || []).forEach(f => r.given.push(money("Dismantling/restoration estimate (included)", f.value)));
                (T.excl || []).forEach(f => r.given.push(money("Not capitalised (expensed)", f.value)));
                r.required = "Cost to be capitalised";
                r.formula = ["Cost = Purchase price − Trade discounts + Directly attributable costs + Initial estimate of dismantling/restoration costs", "Training, administration and general overheads are expensed, not capitalised."];
                r.subst = [`${R(price.value)} − ${R(disc)} + ${R(dir)} + ${R(dis)}`];
                r.calc = [`= ${R(cost)}`];
                if (ex) r.calc.push(`Expensed in profit or loss: ${R(ex)}`);
                r.answer = ["Cost capitalised = " + R(cost)];
                r.explanation = "Under IAS 16.16 cost includes everything needed to bring the asset to the location and condition for use.";
                r.nums = [cost]; r.values.cost = cost;
                return r;
            }
        });

        /* ---------- IAS 16 / IAS 38: depreciation, carrying amount, disposal ---------- */
        reg({
            id: "depreciation", name: "Depreciation / amortisation, carrying amount and disposal", status: "full",
            test: c => /depreciat|amortis|carrying (amount|value)|book value|net book|useful life|residual|written down/.test(c.low) &&
                !/impair|recoverable|deferred tax|temporary difference|tax base|revalu|goodwill|ifrs 3|lease|right[- ]of[- ]use|ratio|ias 12/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["accum", /accumulated|acc\.? dep/],
                    ["resid", /residual|salvage|scrap|resale|trade[- ]in|expected (selling|sale)|estimated (selling|sale)|disposal value/],
                    ["proceeds", /sold for|sale proceeds|proceeds|sells? (it |the \w+ )?for|sale price|disposed (of )?for|sold at/],
                    ["disc", /trade discount|discount|rebate/],
                    ["excl", /training|advertis|administrat|opening|staff|relocat|reorgani|abnormal|wastage|general overhead/],
                    ["dir", /install|deliver|freight|transport|import dut|assembl|testing|site prep|legal|professional|erection|duties/],
                    ["carry", /carrying|book value|net book|written down|wdv/],
                    ["cost", /cost|price|purchase|bought|acquir|original|initial|valued at|worth|paid/]
                ]);
                const Y = tag(c.yrs, [
                    ["elapsed", /after|end of year|at the end|used for|held for|owned for|has been|have been|elapsed|since|in use|by the end|for the (first|past)/],
                    ["life", /useful life|life|lasting|last|over|period|estimated|expected/]
                ]);
                const Q = tag(c.qty, [
                    ["period", /produced|this year|during|current|made|used|manufactured|for the year|in year/],
                    ["total", /total|expected|estimated|lifetime|capacity|life|will produce/]
                ]);

                const costF = first(T, "cost"), carryF = first(T, "carry"), accF = first(T, "accum"), dispF = first(T, "proceeds");
                const rateF = c.pct.find(f => /depreciat|rate|reducing|diminishing|annum|p\.a/.test(f.pre + f.post)) || (c.pct.length === 1 ? c.pct[0] : null);
                let lifeF = first(Y, "life") || (c.yrs.length === 1 && !first(Y, "elapsed") ? c.yrs[0] : null);
                let life = lifeF ? lifeF.value : null;
                if (life === null && c.mon.length && /(life|last)\s*(of|is|=|:)?\s*$/.test(c.mon[0].pre)) life = c.mon[0].value / 12;
                const elapsedF = first(Y, "elapsed");
                const n = elapsedF ? elapsedF.value : null;
                const partMonths = (!elapsedF && c.mon.length && !(life !== null && /(life|last)\s*(of|is|=|:)?\s*$/.test(c.mon[0].pre))) ? c.mon[0].value : null;

                const noResid = /\b(no|nil|zero|without|not have any)\s+(a\s+)?(residual|scrap|salvage)|residual (value )?(of |is |= )?(nil|zero)/.test(c.low);
                const residF = first(T, "resid");
                const resid = noResid ? 0 : (residF ? residF.value : null);

                const isRB = /reducing[- ]balance|diminishing[- ]balance|declining[- ]balance/.test(c.low);
                const uopTotal = first(Q, "total"), uopPeriod = first(Q, "period");
                const isUOP = /units?[- ]of[- ]production|units of output|machine hours|production method|per unit produced/.test(c.low) || (uopTotal && uopPeriod && c.qty.length >= 2);
                const isSL = /straight[- ]line|equal annual|fixed instalment/.test(c.low);

                const r = Res("Depreciation / carrying amount (IAS 16 / IAS 38)");
                let cost = null;
                if (costF) {
                    cost = costF.value - sum(T.disc) + sum(T.dir);
                    r.given.push(money("Cost", costF.value));
                    (T.dir || []).forEach(f => r.given.push(money("Directly attributable cost (added)", f.value)));
                    (T.disc || []).forEach(f => r.given.push(money("Discount (deducted)", f.value)));
                    if (T.dir || T.disc) r.calc.push(`Cost = ${R(costF.value)} − ${R(sum(T.disc))} + ${R(sum(T.dir))} = ${R(cost)}`);
                }
                if (resid !== null) r.given.push(money("Residual value", resid));
                if (life !== null) r.given.push("Useful life: " + N(life, 2) + " years");
                if (rateF) r.given.push("Rate: " + P(rateF.value));
                if (n !== null) r.given.push("Time elapsed: " + N(n, 2) + " years");

                /* ----- decide the method ----- */
                let method = isRB ? "rb" : isUOP ? "uop" : isSL ? "sl" : null;
                if (!method) {
                    if (life !== null && !rateF) { method = "sl"; r.notes.push("No depreciation method was stated. Because only a useful life was supplied, the straight-line method was applied – confirm this is the entity's policy."); }
                    else if (rateF && life === null) {
                        return Miss("Depreciation", ["the depreciation method (straight-line on cost, or reducing balance) – a rate alone does not say which one"]);
                    }
                }

                let annual = null, rows = [], rate = null, base = null, perUnit = null;
                const need = [];
                if (!dispF || cost !== null || (carryF && !costF)) {
                    if (method === "sl") {
                        if (cost === null) need.push("cost of the asset");
                        if (life !== null) {
                            if (resid === null) need.push('residual value (write "nil" if there is none)');
                            if (!need.length) {
                                annual = (cost - resid) / life;
                                r.formula.push("Depreciation per year = (Cost − Residual value) ÷ Useful life");
                                r.subst.push(`(${R(cost)} − ${R(resid)}) ÷ ${N(life, 2)}`);
                                r.calc.push(`Annual depreciation = ${R(annual)}`);
                            }
                        } else if (rateF) {
                            if (!need.length) {
                                annual = cost * rateF.value / 100;
                                r.formula.push("Depreciation per year = Cost × Straight-line rate");
                                r.subst.push(`${R(cost)} × ${P(rateF.value)}`);
                                r.calc.push(`Annual depreciation = ${R(annual)}`);
                            }
                        } else need.push("useful life (or depreciation rate)");
                    } else if (method === "rb") {
                        base = cost !== null ? cost : (carryF ? carryF.value : null);
                        if (base === null) need.push("cost or carrying amount of the asset");
                        if (rateF) rate = rateF.value / 100;
                        else if (life !== null && resid !== null && resid > 0 && base > 0) {
                            rate = 1 - Math.pow(resid / base, 1 / life);
                            r.formula.push("Rate = 1 − (Residual value ÷ Cost)^(1 ÷ Useful life)");
                            r.subst.push(`1 − (${R(resid)} ÷ ${R(base)})^(1 ÷ ${N(life, 2)}) = ${P(rate * 100)}`);
                        } else need.push("the reducing-balance rate (or useful life and a positive residual value)");
                        if (!need.length) {
                            r.formula.push("Depreciation = Opening carrying amount × Rate", "Closing carrying amount = Opening carrying amount − Depreciation");
                            const years = n !== null ? Math.max(1, Math.round(n)) : 1;
                            let bal = base;
                            for (let y = 1; y <= years && y <= 12; y++) {
                                const d = bal * rate; rows.push({ y, d, open: bal, close: bal - d }); bal -= d;
                            }
                            annual = rows[0].d;
                            rows.forEach(x => r.calc.push(`Year ${x.y}: ${R(x.open)} × ${P(rate * 100)} = ${R(x.d)} → carrying amount ${R(x.close)}`));
                        }
                    } else if (method === "uop") {
                        if (cost === null) need.push("cost of the asset");
                        if (resid === null) need.push('residual value (write "nil" if there is none)');
                        if (!uopTotal) need.push("total expected units of production over the asset's life");
                        if (!uopPeriod) need.push("units produced in the period");
                        if (!need.length) {
                            perUnit = (cost - resid) / uopTotal.value;
                            annual = perUnit * uopPeriod.value;
                            r.formula.push("Depreciation per unit = (Cost − Residual value) ÷ Total expected units", "Depreciation for the period = Depreciation per unit × Units produced");
                            r.subst.push(`(${R(cost)} − ${R(resid)}) ÷ ${N(uopTotal.value, 0)} = ${R(perUnit)} per unit`);
                            r.calc.push(`${R(perUnit)} × ${N(uopPeriod.value, 0)} units = ${R(annual)}`);
                        }
                    } else {
                        if (cost === null) need.push("cost of the asset");
                        need.push("useful life (or depreciation rate)", "depreciation method (e.g. straight-line or reducing balance)");
                        if (resid === null) need.push('residual value (write "nil" if there is none)');
                    }
                }

                if (need.length && !(dispF && (carryF || (accF && cost !== null) || c.carry.carrying !== undefined))) {
                    return Miss("Depreciation", need, "Depreciation cannot be calculated without these facts. Add them and ask again.");
                }

                /* ----- results ----- */
                let carrying = null, accumulated = null;
                if (annual !== null) {
                    r.answer.push("Annual depreciation" + (method === "rb" ? " (year 1)" : "") + " = " + R(annual));
                    r.nums.push(annual); r.values.depreciation = annual;
                    r.required = "Depreciation" + (n !== null ? " and carrying amount" : "");

                    if (partMonths !== null && method !== "rb") {
                        const firstYr = annual * partMonths / 12;
                        r.calc.push(`Part-year depreciation = ${R(annual)} × ${N(partMonths, 0)}/12 = ${R(firstYr)}`);
                        r.answer.push(`Depreciation for the first ${N(partMonths, 0)} months = ${R(firstYr)}`);
                        r.nums.push(firstYr);
                    }
                    if (n !== null) {
                        if (method === "rb") {
                            carrying = rows[rows.length - 1].close; accumulated = base - carrying;
                        } else if (method === "sl") {
                            let yrs = n;
                            if (life !== null && n > life) { yrs = life; r.notes.push("The time elapsed is longer than the useful life, so depreciation stops at the end of the useful life."); }
                            accumulated = annual * yrs; carrying = cost - accumulated;
                            r.calc.push(`Accumulated depreciation after ${N(n, 2)} years = ${R(annual)} × ${N(yrs, 2)} = ${R(accumulated)}`);
                        }
                        if (carrying !== null) {
                            r.calc.push(`Carrying amount = ${R(method === "rb" ? base : cost)} − ${R(accumulated)} = ${R(carrying)}`);
                            r.formula.push("Carrying amount = Cost − Accumulated depreciation");
                            r.answer.push(`Accumulated depreciation after ${N(n, 2)} years = ${R(accumulated)}`, `Carrying amount after ${N(n, 2)} years = ${R(carrying)}`);
                            r.nums.push(accumulated, carrying);
                        }
                    } else if (method === "rb") {
                        carrying = rows[0].close;
                        r.answer.push("Closing carrying amount = " + R(carrying)); r.nums.push(carrying);
                    } else if (/carrying|book value|net book/.test(c.low) && cost !== null) {
                        carrying = cost - annual;
                        r.answer.push("Carrying amount after one year = " + R(carrying)); r.nums.push(carrying);
                    }
                    if (/journal/.test(c.low)) {
                        r.journal = [`Dr Depreciation expense   ${R(annual)}`, `   Cr Accumulated depreciation   ${R(annual)}`];
                    }
                    r.explanation = "Depreciation spreads the depreciable amount of an asset over its useful life; the carrying amount is cost less accumulated depreciation.";
                }

                /* ----- disposal ----- */
                if (dispF) {
                    let cv = null, src = "";
                    if (carryF && !costF) { cv = carryF.value; src = "given carrying amount"; }
                    else if (carryF) { cv = carryF.value; src = "given carrying amount"; }
                    else if (accF && cost !== null) { cv = cost - accF.value; src = "cost less given accumulated depreciation"; r.calc.push(`Carrying amount = ${R(cost)} − ${R(accF.value)} = ${R(cv)}`); }
                    else if (carrying !== null) { cv = carrying; src = "calculated carrying amount"; }
                    else if (c.carry.carrying !== undefined) { cv = c.carry.carrying; src = "carrying amount from the earlier part"; }
                    if (cv === null) return Miss("Disposal of an asset", ["the carrying amount (or cost and accumulated depreciation) at the date of disposal"]);
                    const pl = dispF.value - cv;
                    r.formula.push("Profit/loss on disposal = Proceeds − Carrying amount");
                    r.subst.push(`${R(dispF.value)} − ${R(cv)}`);
                    r.answer.push(pl >= 0 ? "Profit on disposal = " + R(pl) : "Loss on disposal = " + R(-pl));
                    r.given.push(money("Proceeds", dispF.value));
                    r.notes.push("Carrying amount used: " + src + ".");
                    r.nums.push(pl); r.values.disposalProfit = pl;
                    if (!r.required) r.required = "Profit or loss on disposal";
                    if (!r.explanation) r.explanation = "A profit arises when proceeds exceed the carrying amount; a loss when they are lower (IAS 16.68).";
                }
                if (carrying !== null) r.values.carrying = carrying;
                if (!r.answer.length) return null;
                return r;
            }
        });

        /* ---------- IAS 16: revaluation ---------- */
        reg({
            id: "revaluation", name: "IAS 16 revaluation", status: "partial",
            test: c => /revalu/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["surplus", /revaluation surplus|previous(ly)? (recognised )?surplus|existing surplus|credit balance/],
                    ["prevloss", /previous(ly)? (recognised )?(loss|decrease)|loss previously|decrease previously/],
                    ["fv", /fair value|revalued (to|at)|valued at|new value|valuation/],
                    ["carry", /carrying|book value|net book|written down|cost/]
                ]);
                const cv = first(T, "carry"), fv = first(T, "fv");
                const miss = [];
                if (!cv) miss.push("the carrying amount before revaluation");
                if (!fv) miss.push("the fair value at the revaluation date");
                if (miss.length) return Miss("IAS 16 revaluation", miss);
                const diff = fv.value - cv.value, s = sum(T.surplus), pl0 = sum(T.prevloss);
                const r = Res("IAS 16 – Revaluation model");
                r.given.push(money("Carrying amount", cv.value), money("Fair value", fv.value));
                r.required = "Revaluation gain or loss and where it is recognised";
                r.formula = ["Revaluation difference = Fair value − Carrying amount", "Increase: other comprehensive income (revaluation surplus), unless it reverses an earlier loss in profit or loss", "Decrease: first against any existing surplus (OCI), the rest in profit or loss"];
                r.subst = [`${R(fv.value)} − ${R(cv.value)} = ${R(diff)}`];
                if (diff >= 0) {
                    const rev = Math.min(diff, pl0), oci = diff - rev;
                    if (rev) r.answer.push("Reversal of earlier loss in profit or loss = " + R(rev));
                    r.answer.push("Revaluation surplus in OCI = " + R(oci));
                    r.nums.push(rev, oci);
                } else {
                    const dec = -diff, fromSurplus = Math.min(dec, s), pl = dec - fromSurplus;
                    if (fromSurplus) r.answer.push("Debited against existing revaluation surplus (OCI) = " + R(fromSurplus));
                    r.answer.push("Loss in profit or loss = " + R(pl));
                    r.nums.push(fromSurplus, pl);
                }
                r.notes.push("Deferred tax on the revaluation is not included. Ask separately with the tax rate.");
                return r;
            }
        });

        /* ---------- IAS 36: impairment ---------- */
        reg({
            id: "impairment", name: "IAS 36 impairment", status: "partial",
            test: c => /impair|recoverable amount|value in use/.test(c.low) && !/ecl|expected credit|ifrs 9/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["fvlcd", /fair value less (the )?costs? (of disposal|to sell)|fvlcd/],
                    ["cod", /costs? of disposal|costs? to sell|selling costs|disposal costs/],
                    ["fv", /fair value|market value|selling price|net selling/],
                    ["viu", /value in use|viu|present value of (the )?(future )?cash/],
                    ["carry", /carrying|book value|net book|written down/]
                ]);
                const cv = first(T, "carry");
                if (!cv) return Miss("IAS 36 impairment", ["the carrying amount of the asset"]);
                const viu = first(T, "viu"), fvl = first(T, "fvlcd"), fv = first(T, "fv"), cod = first(T, "cod");
                let fvlcd = fvl ? fvl.value : (fv ? fv.value - (cod ? cod.value : 0) : null);
                const r = Res("IAS 36 – Impairment of an asset");
                r.given.push(money("Carrying amount", cv.value));
                if (viu) r.given.push(money("Value in use", viu.value));
                if (fv) r.given.push(money("Fair value", fv.value));
                if (cod) r.given.push(money("Costs of disposal", cod.value));
                if (fvl) r.given.push(money("Fair value less costs of disposal", fvl.value));
                r.required = "Recoverable amount and impairment loss";
                r.formula = ["FVLCD = Fair value − Costs of disposal", "Recoverable amount = Higher of (Value in use ; FVLCD)", "Impairment loss = Carrying amount − Recoverable amount (if positive)"];
                if (fv && cod && !fvl) r.calc.push(`FVLCD = ${R(fv.value)} − ${R(cod.value)} = ${R(fvlcd)}`);

                let rec;
                if (viu && fvlcd !== null) rec = Math.max(viu.value, fvlcd);
                else if (viu && viu.value >= cv.value) { rec = viu.value; r.notes.push("Value in use already exceeds the carrying amount, so FVLCD need not be estimated (IAS 36.19)."); }
                else if (fvlcd !== null && fvlcd >= cv.value) { rec = fvlcd; r.notes.push("FVLCD already exceeds the carrying amount, so value in use need not be estimated (IAS 36.19)."); }
                else return Miss("IAS 36 impairment", [viu ? "fair value less costs of disposal" : fvlcd !== null ? "value in use" : "value in use and fair value less costs of disposal"]);

                const loss = cv.value - rec;
                r.calc.push(`Recoverable amount = ${R(rec)}`, `${R(cv.value)} − ${R(rec)} = ${R(loss)}`);
                r.answer = ["Recoverable amount = " + R(rec), loss > 0 ? "Impairment loss = " + R(loss) : "No impairment loss (carrying amount does not exceed recoverable amount)"];
                if (loss > 0) r.journal = [`Dr Impairment loss (profit or loss)   ${R(loss)}`, `   Cr Accumulated impairment   ${R(loss)}`];
                r.explanation = "An asset may not be carried above the amount that can be recovered through use or sale.";
                r.nums = [rec, Math.max(loss, 0)]; r.values.carrying = rec;
                r.notes.push("Allocation of a loss across a cash-generating unit and goodwill is not covered.");
                return r;
            }
        });

        /* ---------- IAS 2: net realisable value (lower of cost and NRV) ---------- */
        reg({
            id: "nrv", name: "IAS 2 lower of cost and net realisable value", status: "full",
            test: c => /net realisable|\bnrv\b|lower of cost/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["comp", /completion|to complete|finish/],
                    ["sell", /selling costs|costs? (necessary )?to (make|sell)|commission|marketing|distribution|to sell/],
                    ["sp", /selling price|sells?|expected (selling )?price|sale price|estimated (selling )?price/],
                    ["cost", /cost/]
                ]);
                const cost = first(T, "cost"), sp = first(T, "sp");
                const miss = [];
                if (!cost) miss.push("the cost of the inventory");
                if (!sp) miss.push("the estimated selling price");
                if (miss.length) return Miss("IAS 2 NRV", miss);
                const comp = sum(T.comp), sell = sum(T.sell);
                const nrv = sp.value - comp - sell, carrying = Math.min(cost.value, nrv), wd = cost.value - carrying;
                const r = Res("IAS 2 – Inventory at the lower of cost and NRV");
                r.given.push(money("Cost", cost.value), money("Estimated selling price", sp.value), money("Costs to complete", comp), money("Selling costs", sell));
                r.required = "Net realisable value and the amount at which inventory is measured";
                r.formula = ["NRV = Estimated selling price − Costs of completion − Costs necessary to make the sale", "Inventory = Lower of Cost and NRV"];
                r.subst = [`NRV = ${R(sp.value)} − ${R(comp)} − ${R(sell)}`];
                r.calc = [`NRV = ${R(nrv)}`, `Lower of ${R(cost.value)} and ${R(nrv)} = ${R(carrying)}`];
                r.answer = ["NRV = " + R(nrv), "Inventory measured at " + R(carrying), wd > 0 ? "Write-down = " + R(wd) : "No write-down"];
                r.explanation = "Inventory may not be carried above the amount the business expects to recover from selling it.";
                r.nums = [nrv, carrying, wd]; return r;
            }
        });

        /* ---------- IAS 2: FIFO and weighted average (periodic) ---------- */
        reg({
            id: "cost-flow", name: "IAS 2 FIFO and weighted-average cost", status: "partial",
            test: c => /\bfifo\b|first[- ]in|weighted[- ]average|average cost/.test(c.low),
            solve(c) {
                const lots = []; let sold = null;
                c.t.split(/[.;\n]/).forEach(sent => {
                    const s = sent.toLowerCase();
                    if (/\b(sold|sales?|sell|sells)\b/.test(s)) {
                        const m = s.match(/(\d[\d ,]*)\s*(?:units?|items?|pieces?)/);
                        if (m) sold = (sold || 0) + parseFloat(m[1].replace(/[ ,]/g, ""));
                        return;
                    }
                    const re = /(\d[\d ,]*)\s*(?:units?|items?|pieces?)?\s*(?:@|at|costing|for)\s*(?:r|zar)?\s*(\d[\d ,]*(?:\.\d+)?)(?!\s*%)/gi;
                    let m;
                    while ((m = re.exec(sent))) {
                        const q = parseFloat(m[1].replace(/[ ,]/g, "")), p = parseFloat(m[2].replace(/[ ,]/g, ""));
                        if (isFinite(q) && isFinite(p) && q > 0) lots.push({ q, p });
                    }
                });
                if (lots.length < 1) return Miss("IAS 2 cost formulas", ["the opening inventory and purchases (quantity and unit cost for each batch)"]);
                if (sold === null) return Miss("IAS 2 cost formulas", ["the number of units sold"]);
                const totalQ = lots.reduce((s, l) => s + l.q, 0), totalC = lots.reduce((s, l) => s + l.q * l.p, 0);
                if (sold > totalQ) return Miss("IAS 2 cost formulas", ["a units-sold figure that does not exceed the units available (" + N(totalQ, 0) + ")"]);

                const r = Res("IAS 2 – FIFO and weighted-average cost");
                lots.forEach((l, i) => r.given.push(`Batch ${i + 1}: ${N(l.q, 0)} units at ${R(l.p)}`));
                r.given.push("Units sold: " + N(sold, 0));
                r.required = "Cost of sales and closing inventory";
                const wantF = /fifo|first[- ]in/.test(c.low), wantW = /weighted|average/.test(c.low);
                const doF = wantF || !wantW, doW = wantW || !wantF;

                if (doF) {
                    let left = sold, cos = 0; const parts = [];
                    lots.forEach(l => { if (left > 0) { const u = Math.min(left, l.q); cos += u * l.p; parts.push(`${N(u, 0)} × ${R(l.p)}`); left -= u; } });
                    const closing = totalC - cos;
                    r.formula.push("FIFO: the oldest units are sold first; closing inventory is the most recent purchases");
                    r.calc.push(`FIFO cost of sales = ${parts.join(" + ")} = ${R(cos)}`, `FIFO closing inventory = ${R(totalC)} − ${R(cos)} = ${R(closing)}`);
                    r.answer.push("FIFO cost of sales = " + R(cos), "FIFO closing inventory = " + R(closing));
                    r.nums.push(cos, closing);
                }
                if (doW) {
                    const avg = totalC / totalQ, cos = avg * sold, closing = totalC - cos;
                    r.formula.push("Weighted average cost per unit = Total cost of units available ÷ Total units available");
                    r.calc.push(`Average cost = ${R(totalC)} ÷ ${N(totalQ, 0)} = ${R(avg)} per unit`, `Cost of sales = ${N(sold, 0)} × ${R(avg)} = ${R(cos)}`, `Closing inventory = ${R(totalC)} − ${R(cos)} = ${R(closing)}`);
                    r.answer.push("Weighted-average cost of sales = " + R(cos), "Weighted-average closing inventory = " + R(closing));
                    r.nums.push(cos, closing);
                }
                r.notes.push("Periodic method: the weighted average is calculated once for the whole period.");
                r.explanation = "FIFO and weighted average are the cost formulas allowed by IAS 2; LIFO is not allowed.";
                return r;
            }
        });

        /* ---------- Cost of sales, gross profit, mark-up ---------- */
        reg({
            id: "gross-profit", name: "Cost of sales, gross profit, mark-up", status: "full",
            test: c => /gross profit|mark-?up|gross margin|cost of (sales|goods sold)|\bcos\b/.test(c.low) &&
                !/break-?even|contribution|variable|impair|deferred|goodwill|variance|ratio|unrealised|intragroup/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["open", /opening (stock|inventory)/], ["close", /closing (stock|inventory)/],
                    ["ret", /returns? (outwards?|on purchases)|purchases? returns?|discount received/],
                    ["carr", /carriage|freight in|transport in/],
                    ["purch", /purchases?|bought/],
                    ["cos", /cost of (sales|goods sold)|\bcos\b|cost price|^\s*cost\b|\bcost\b/],
                    ["gp", /gross profit/],
                    ["sales", /sales|revenue|turnover|selling price/]
                ]);
                const mk = c.pct.find(f => /mark-?up/.test(f.pre + f.post));
                const mg = c.pct.find(f => /margin|gross profit/.test(f.pre + f.post) && !/mark-?up/.test(f.pre + f.post));
                const open = first(T, "open"), close = first(T, "close"), pur = first(T, "purch");
                const r = Res("Cost of sales and gross profit");
                let sales = first(T, "sales"), cos = first(T, "cos"), gpF = first(T, "gp");
                let cosV = cos ? cos.value : null, salesV = sales ? sales.value : null;

                if (open && close && pur) {
                    cosV = open.value + pur.value + sum(T.carr) - sum(T.ret) - close.value;
                    r.formula.push("Cost of sales = Opening inventory + Net purchases + Carriage on purchases − Closing inventory");
                    r.given.push(money("Opening inventory", open.value), money("Purchases", pur.value), money("Closing inventory", close.value));
                    if (T.carr) r.given.push(money("Carriage on purchases", sum(T.carr)));
                    if (T.ret) r.given.push(money("Purchase returns", sum(T.ret)));
                    r.subst.push(`${R(open.value)} + ${R(pur.value)} + ${R(sum(T.carr))} − ${R(sum(T.ret))} − ${R(close.value)}`);
                    r.answer.push("Cost of sales = " + R(cosV)); r.nums.push(cosV); r.values.cos = cosV;
                    r.required = "Cost of sales";
                }
                if (salesV !== null && cosV !== null) {
                    const gp = salesV - cosV;
                    r.formula.push("Gross profit = Sales − Cost of sales", "Gross profit % = Gross profit ÷ Sales × 100", "Mark-up % = Gross profit ÷ Cost of sales × 100");
                    r.given.push(money("Sales", salesV)); if (cos) r.given.push(money("Cost of sales", cos.value));
                    r.calc.push(`Gross profit = ${R(salesV)} − ${R(cosV)} = ${R(gp)}`);
                    r.answer.push("Gross profit = " + R(gp)); r.nums.push(gp);
                    if (salesV !== 0) { const g = gp / salesV * 100; r.calc.push(`Gross profit % = ${R(gp)} ÷ ${R(salesV)} × 100 = ${P(g)}`); r.answer.push("Gross profit percentage = " + P(g)); r.nums.push(g); }
                    if (cosV !== 0) { const m = gp / cosV * 100; r.calc.push(`Mark-up % = ${R(gp)} ÷ ${R(cosV)} × 100 = ${P(m)}`); r.answer.push("Mark-up on cost = " + P(m)); r.nums.push(m); }
                    r.values.grossProfit = gp; r.required = r.required || "Gross profit and percentages";
                    r.explanation = "Gross profit is what remains of sales after deducting the cost of the goods sold, before operating expenses.";
                    return r;
                }
                if (r.answer.length) return r;

                if (cosV !== null && mk) {
                    const sp = cosV * (1 + mk.value / 100), gp = sp - cosV;
                    r.given.push(money("Cost", cosV), "Mark-up: " + P(mk.value));
                    r.required = "Selling price"; r.formula = ["Selling price = Cost × (1 + Mark-up %)"];
                    r.subst = [`${R(cosV)} × (1 + ${N(mk.value / 100, 4)})`];
                    r.answer = ["Selling price = " + R(sp), "Gross profit = " + R(gp)];
                    r.nums = [sp, gp]; return r;
                }
                if (salesV !== null && mk) {
                    const cs = salesV / (1 + mk.value / 100), gp = salesV - cs;
                    r.given.push(money("Selling price", salesV), "Mark-up: " + P(mk.value));
                    r.required = "Cost price"; r.formula = ["Cost = Selling price ÷ (1 + Mark-up %)"];
                    r.subst = [`${R(salesV)} ÷ ${N(1 + mk.value / 100, 4)}`];
                    r.answer = ["Cost price = " + R(cs), "Gross profit = " + R(gp)];
                    r.nums = [cs, gp]; return r;
                }
                if (salesV !== null && mg) {
                    const cs = salesV * (1 - mg.value / 100), gp = salesV - cs;
                    r.given.push(money("Sales", salesV), "Gross profit margin: " + P(mg.value));
                    r.required = "Cost of sales"; r.formula = ["Cost of sales = Sales × (1 − Gross profit %)"];
                    r.subst = [`${R(salesV)} × (1 − ${N(mg.value / 100, 4)})`];
                    r.answer = ["Cost of sales = " + R(cs), "Gross profit = " + R(gp)];
                    r.nums = [cs, gp]; return r;
                }
                if (gpF && salesV !== null) {
                    const cs = salesV - gpF.value;
                    r.given.push(money("Sales", salesV), money("Gross profit", gpF.value));
                    r.answer = ["Cost of sales = " + R(cs)]; r.formula = ["Cost of sales = Sales − Gross profit"]; r.nums = [cs];
                    return r;
                }
                return Miss("Cost of sales and gross profit", ["sales and cost of sales (or opening inventory, purchases and closing inventory), or a cost with a mark-up %"]);
            }
        });

        /* =========================================================
           C. MANAGEMENT ACCOUNTING
        ========================================================= */

        /* ---------- Cost-volume-profit / break-even ---------- */
        reg({
            id: "break-even", name: "Break-even and CVP analysis", status: "full",
            test: c => /break-?even|contribution|margin of safety|target profit|cost[- ]volume/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["var", /variable/], ["fixed", /fixed|overhead/],
                    ["target", /target profit|desired profit|required profit|profit of/],
                    ["sp", /selling price|sales price|price|sells?/],
                    ["contrib", /contribution/]
                ]);
                const sp = first(T, "sp"), vc = first(T, "var"), fc = first(T, "fixed"), tp = first(T, "target");
                const cmr = c.pct.find(f => /contribution|c\/s|cm/.test(f.pre + f.post));
                const budget = c.qty.find(f => /budget|expected|forecast|actual|planned|sales of|sell|sold/.test(f.pre + f.post));
                const r = Res("Break-even and cost-volume-profit analysis");

                if (!fc) return Miss("Break-even analysis", ["total fixed costs"].concat(sp && vc ? [] : ["selling price per unit and variable cost per unit (or the contribution margin ratio)"]));

                if (sp && vc) {
                    if (sp.value <= vc.value) return Miss("Break-even analysis", ["a selling price higher than the variable cost per unit (the contribution is not positive)"]);
                    const cm = sp.value - vc.value, ratio = cm / sp.value * 100, beU = fc.value / cm, beS = beU * sp.value;
                    r.given.push(money("Selling price per unit", sp.value), money("Variable cost per unit", vc.value), money("Fixed costs", fc.value));
                    r.required = "Contribution per unit, break-even point (units and rand)";
                    r.formula = ["Contribution per unit = Selling price − Variable cost per unit", "Break-even units = Fixed costs ÷ Contribution per unit", "Break-even sales = Break-even units × Selling price", "Contribution ratio = Contribution ÷ Selling price"];
                    r.calc = [`Contribution = ${R(sp.value)} − ${R(vc.value)} = ${R(cm)}`, `Break-even units = ${R(fc.value)} ÷ ${R(cm)} = ${N(beU, 2)} units`, `Break-even sales = ${N(beU, 2)} × ${R(sp.value)} = ${R(beS)}`, `Contribution ratio = ${R(cm)} ÷ ${R(sp.value)} = ${P(ratio)}`];
                    r.answer = ["Contribution per unit = " + R(cm), "Break-even = " + N(Math.ceil(beU - 1e-9), 0) + " units (" + R(beS) + ")", "Contribution ratio = " + P(ratio)];
                    r.nums = [cm, beU, beS, ratio];
                    if (tp) {
                        const u = (fc.value + tp.value) / cm;
                        r.calc.push(`Units for target profit = (${R(fc.value)} + ${R(tp.value)}) ÷ ${R(cm)} = ${N(u, 2)} units`);
                        r.answer.push("Units needed for target profit " + R(tp.value) + " = " + N(Math.ceil(u - 1e-9), 0) + " (" + R(u * sp.value) + ")");
                        r.nums.push(u, u * sp.value);
                    }
                    if (budget) {
                        const mos = budget.value - beU;
                        r.calc.push(`Margin of safety = ${N(budget.value, 0)} − ${N(beU, 2)} = ${N(mos, 2)} units (${P(mos / budget.value * 100)} of sales)`);
                        r.answer.push("Margin of safety = " + N(mos, 2) + " units (" + P(mos / budget.value * 100) + ")");
                        r.nums.push(mos);
                    }
                    r.explanation = "At the break-even point total contribution equals fixed costs, so profit is zero. Every unit sold above it adds the contribution to profit.";
                    return r;
                }
                if (cmr) {
                    const beS = fc.value / (cmr.value / 100);
                    r.given.push(money("Fixed costs", fc.value), "Contribution ratio: " + P(cmr.value));
                    r.required = "Break-even sales"; r.formula = ["Break-even sales = Fixed costs ÷ Contribution ratio"];
                    r.subst = [`${R(fc.value)} ÷ ${N(cmr.value / 100, 4)}`];
                    r.answer = ["Break-even sales = " + R(beS)]; r.nums = [beS]; return r;
                }
                return Miss("Break-even analysis", ["selling price per unit and variable cost per unit (or the contribution margin ratio)"]);
            }
        });

        /* ---------- Standard costing variances ---------- */
        reg({
            id: "variances", name: "Material and labour variances", status: "partial",
            test: c => /variance/.test(c.low),
            solve(c) {
                const rows = [
                    ["sq", /standard (quantity|usage|kg|litres|hours)|allowed|budgeted (quantity|usage|hours)/],
                    ["aq", /actual (quantity|usage|kg|litres|hours|units)|actually (used|purchased|worked)|\bused\b|worked/],
                    ["sp", /standard (price|cost|rate)|budgeted (price|rate)/],
                    ["ap", /actual (price|cost|rate)|actually paid|paid/]
                ];
                const T = tag(c.money.concat(c.qty), rows);
                const sp = first(T, "sp"), ap = first(T, "ap"), sq = first(T, "sq"), aq = first(T, "aq");
                const lab = /labour|wage|hours|\brate\b/.test(c.low) && !/material/.test(c.low);
                const nm = lab ? ["Labour rate variance", "Labour efficiency variance"] : ["Material price variance", "Material usage variance"];
                const miss = [];
                if (!sp) miss.push("standard " + (lab ? "rate" : "price")); if (!ap) miss.push("actual " + (lab ? "rate" : "price"));
                if (!aq) miss.push("actual " + (lab ? "hours" : "quantity")); if (!sq) miss.push("standard " + (lab ? "hours" : "quantity") + " allowed for actual output");
                if (miss.length > 2) return Miss("Standard costing variances", miss);
                const r = Res("Standard costing – " + (lab ? "labour" : "material") + " variances");
                r.required = nm.join(" and ");
                r.formula = [nm[0] + " = (Standard " + (lab ? "rate" : "price") + " − Actual " + (lab ? "rate" : "price") + ") × Actual " + (lab ? "hours" : "quantity"), nm[1] + " = (Standard " + (lab ? "hours" : "quantity") + " − Actual " + (lab ? "hours" : "quantity") + ") × Standard " + (lab ? "rate" : "price"), "Positive = favourable (F); negative = adverse (A)"];
                const lbl = v => (v >= 0 ? "favourable (F)" : "adverse (A)");
                if (sp && ap && aq) {
                    const v = (sp.value - ap.value) * aq.value;
                    r.given.push(money("Standard " + (lab ? "rate" : "price"), sp.value), money("Actual " + (lab ? "rate" : "price"), ap.value), "Actual " + (lab ? "hours" : "quantity") + ": " + N(aq.value, 2));
                    r.calc.push(`${nm[0]} = (${R(sp.value)} − ${R(ap.value)}) × ${N(aq.value, 2)} = ${R(Math.abs(v))} ${lbl(v)}`);
                    r.answer.push(nm[0] + " = " + R(Math.abs(v)) + " " + lbl(v)); r.nums.push(v);
                }
                if (sq && aq && sp) {
                    const v = (sq.value - aq.value) * sp.value;
                    r.calc.push(`${nm[1]} = (${N(sq.value, 2)} − ${N(aq.value, 2)}) × ${R(sp.value)} = ${R(Math.abs(v))} ${lbl(v)}`);
                    r.answer.push(nm[1] + " = " + R(Math.abs(v)) + " " + lbl(v)); r.nums.push(v);
                }
                if (!r.answer.length) return Miss("Standard costing variances", miss);
                r.explanation = "A variance compares actual results with the standard. Favourable variances increase profit; adverse variances reduce it.";
                return r;
            }
        });

        /* ---------- EOQ and re-order level ---------- */
        reg({
            id: "eoq", name: "Economic order quantity and re-order level", status: "partial",
            test: c => /\beoq\b|economic order quantity|re-?order level/.test(c.low),
            solve(c) {
                if (/re-?order level/.test(c.low)) {
                    const us = c.qty.find(f => /per day|a day|daily|per week|weekly|usage/.test(f.pre + f.post));
                    const lead = c.days[0] || c.mon[0];
                    if (!us || !lead) return Miss("Re-order level", ["usage per day (or week) and the lead time"]);
                    const sf = c.qty.find(f => /safety|buffer/.test(f.pre + f.post));
                    const lt = lead.value, rol = us.value * lt + (sf ? sf.value : 0);
                    const r = Res("Re-order level");
                    r.formula = ["Re-order level = Usage per period × Lead time (+ Safety stock)"];
                    r.subst = [`${N(us.value, 2)} × ${N(lt, 2)} + ${N(sf ? sf.value : 0, 2)}`];
                    r.answer = ["Re-order level = " + N(rol, 2) + " units"]; r.nums = [rol];
                    r.notes.push("Usage and lead time must use the same time unit (e.g. both in days).");
                    return r;
                }
                const T = tag(c.money.concat(c.qty), [
                    ["h", /holding|carrying|storage|per unit per year/], ["s", /ordering|order cost|setup|per order/], ["d", /demand|annual|per year|yearly/]
                ]);
                const d = first(T, "d"), s = first(T, "s"), h = first(T, "h");
                const miss = [];
                if (!d) miss.push("annual demand"); if (!s) miss.push("ordering cost per order"); if (!h) miss.push("holding cost per unit per year");
                if (miss.length) return Miss("Economic order quantity", miss);
                const q = Math.sqrt(2 * d.value * s.value / h.value);
                const r = Res("Economic order quantity (EOQ)");
                r.given.push("Annual demand D: " + N(d.value, 0), money("Ordering cost S", s.value), money("Holding cost H", h.value));
                r.required = "EOQ and number of orders per year";
                r.formula = ["EOQ = √(2 × D × S ÷ H)"];
                r.subst = [`√(2 × ${N(d.value, 0)} × ${N(s.value, 2)} ÷ ${N(h.value, 2)})`];
                r.calc = [`= √${N(2 * d.value * s.value / h.value, 2)}`];
                r.answer = ["EOQ = " + N(q, 2) + " units", "Orders per year = " + N(d.value / q, 2)];
                r.nums = [q, d.value / q]; return r;
            }
        });

        /* =========================================================
           D. FINANCIAL MANAGEMENT
        ========================================================= */

        /* ---------- project cash flows (for NPV / IRR / payback) ---------- */
        function parseProject(c) {
            const flows = [];
            let t = c.t;
            const re = /\b(?:year|yr|period)\s*(\d+)\s*(?:[:=\-–]|is|of)?\s*(?:R|ZAR)?\s*(\(?-?\d{1,3}(?:[ ,]\d{3})+(?:\.\d+)?\)?|\(?-?\d+(?:\.\d+)?\)?)/gi;
            let m;
            while ((m = re.exec(t))) {
                const k = parseInt(m[1], 10);
                let raw = m[2], neg = /^\(.*\)$/.test(raw) || raw.indexOf("-") >= 0;
                const v = parseFloat(raw.replace(/[()\- ,]/g, ""));
                if (k >= 1 && isFinite(v)) { flows[k - 1] = neg ? -v : v; t = t.slice(0, m.index) + " ".repeat(m[0].length) + t.slice(m.index + m[0].length); re.lastIndex = m.index + m[0].length; }
            }
            const c2 = makeCtx(t, c.carry);
            const T = tag(c2.money, [
                ["scrap", /scrap|residual|salvage|terminal|recover|working capital released/],
                ["inv", /initial|invest|outlay|capital|cost|purchas|spend|buy|pays?/],
                ["cf", /inflow|cash flow|return|receipt|net cash|annual|each year|per year|every year|saving|profit/]
            ]);
            const inv = first(T, "inv") || null;
            let n = flows.filter(x => x !== undefined).length;
            if (n === 0) {
                const lv = first(T, "cf") || c2.money.find(f => f !== inv);
                const yrs = c2.yrs.find(f => /for|over|each|every|period|years?/.test(f.pre + f.post)) || c2.yrs[0];
                if (lv && yrs && lv !== inv) { for (let i = 0; i < yrs.value; i++) flows.push(lv.value); }
                else {
                    /* list of amounts after the words inflows / cash flows */
                    const list = c2.money.filter(f => f !== inv && !/scrap|residual|salvage/.test(f.pre + f.post));
                    list.forEach(f => flows.push(f.value));
                }
            }
            for (let i = 0; i < flows.length; i++) if (flows[i] === undefined) flows[i] = 0;
            if (T.scrap && flows.length) flows[flows.length - 1] += sum(T.scrap);
            const rate = c2.pct.find(f => /discount|required|cost of capital|rate of return|hurdle|wacc|rate|interest/.test(f.pre + f.post)) || c2.pct[0] || null;
            return { inv: inv ? inv.value : null, flows, rate: rate ? rate.value : null, scrap: sum(T.scrap) };
        }
        const npvAt = (i, inv, fl) => fl.reduce((s, cf, k) => s + cf / Math.pow(1 + i, k + 1), -inv);

        function solveIRR(inv, fl) {
            let lo = null, hi = null, prev = npvAt(-0.95, inv, fl), prevR = -0.95;
            for (let x = -0.94; x <= 10; x += 0.01) {
                const v = npvAt(x, inv, fl);
                if ((prev < 0 && v > 0) || (prev > 0 && v < 0) || v === 0) { lo = prevR; hi = x; break; }
                prev = v; prevR = x;
            }
            if (lo === null) return null;
            for (let k = 0; k < 200; k++) {
                const mid = (lo + hi) / 2, f = npvAt(mid, inv, fl), fl0 = npvAt(lo, inv, fl);
                if ((fl0 < 0 && f > 0) || (fl0 > 0 && f < 0)) hi = mid; else lo = mid;
            }
            return (lo + hi) / 2;
        }

        reg({
            id: "capital-budgeting", name: "NPV, IRR, payback, ARR", status: "full",
            test: c => /\bnpv\b|net present value|\birr\b|internal rate of return|payback|accounting rate of return|\barr\b/.test(c.low),
            solve(c) {
                const p = parseProject(c);
                const wantARR = /accounting rate of return|\barr\b/.test(c.low);
                const wantNPV = /\bnpv\b|net present value/.test(c.low), wantIRR = /\birr\b|internal rate/.test(c.low), wantPB = /payback/.test(c.low);
                const disc = /discounted payback/.test(c.low);
                const miss = [];
                if (p.inv === null) miss.push("the initial investment");

                if (wantARR) {
                    const avgP = c.money.find(f => /average (annual )?(accounting )?profit|annual (accounting )?profit/.test(f.pre + f.post));
                    if (!avgP) miss.push("the average annual accounting profit");
                    if (miss.length) return Miss("Accounting rate of return", miss);
                    const avgInv = /average investment/.test(c.low) ? (p.inv + (p.scrap || 0)) / 2 : null;
                    const base = avgInv !== null ? avgInv : p.inv;
                    const arr = avgP.value / base * 100;
                    const r = Res("Accounting rate of return (ARR)");
                    r.given.push(money("Average annual profit", avgP.value), money(avgInv !== null ? "Average investment" : "Initial investment", base));
                    r.required = "ARR"; r.formula = ["ARR = Average annual accounting profit ÷ Investment × 100"];
                    r.subst = [`${R(avgP.value)} ÷ ${R(base)} × 100`]; r.answer = ["ARR = " + P(arr)]; r.nums = [arr];
                    return r;
                }
                if (!p.flows.length) miss.push("the yearly cash flows");
                if ((wantNPV || disc) && p.rate === null) miss.push("the discount rate (required return)");
                if (miss.length) return Miss("Capital investment appraisal", miss);

                const r = Res("Capital investment appraisal");
                r.given.push(money("Initial investment", p.inv), ...p.flows.map((cf, k) => `Year ${k + 1} cash flow: ${R(cf)}`));
                if (p.rate !== null) r.given.push("Discount / required rate: " + P(p.rate));
                r.notes.push("Cash flows are treated as arising at the end of each year.");

                if (wantNPV || (!wantIRR && !wantPB)) {
                    const i = p.rate / 100; let tot = 0;
                    r.formula.push("NPV = −Initial investment + Σ [Cash flow ÷ (1 + r)^t]");
                    p.flows.forEach((cf, k) => { const pv = cf / Math.pow(1 + i, k + 1); tot += pv; r.calc.push(`Year ${k + 1}: ${R(cf)} ÷ ${N(1 + i, 4)}^${k + 1} = ${R(pv)}`); });
                    const npv = tot - p.inv;
                    r.calc.push(`NPV = ${R(tot)} − ${R(p.inv)} = ${R(npv)}`);
                    r.answer.push("NPV = " + R(npv) + (npv > 0 ? " → accept (NPV > 0)" : npv < 0 ? " → reject (NPV < 0)" : " → indifferent"));
                    r.nums.push(npv, tot);
                }
                if (wantIRR) {
                    const irr = solveIRR(p.inv, p.flows);
                    if (irr === null) { r.answer.push("No IRR exists for these cash flows (NPV never changes sign)."); }
                    else {
                        r.formula.push("IRR is the rate r at which NPV = 0 (found by a numerical search)");
                        r.calc.push(`NPV at ${P(irr * 100)} ≈ ${R(npvAt(irr, p.inv, p.flows))}`);
                        r.answer.push("IRR = " + P(irr * 100) + (p.rate !== null ? (irr * 100 > p.rate ? " → accept (IRR > required return)" : " → reject (IRR < required return)") : ""));
                        r.nums.push(irr * 100);
                    }
                }
                if (wantPB) {
                    let cum = 0, res = null;
                    r.formula.push(disc ? "Discounted payback: accumulate discounted cash flows until the investment is recovered" : "Payback: accumulate cash flows until the investment is recovered");
                    for (let k = 0; k < p.flows.length; k++) {
                        const cf = disc ? p.flows[k] / Math.pow(1 + p.rate / 100, k + 1) : p.flows[k], before = cum;
                        cum += cf; r.calc.push(`Year ${k + 1}: ${R(cf)} → cumulative ${R(cum)}`);
                        if (cum >= p.inv) { res = k + (p.inv - before) / cf; break; }
                    }
                    if (res === null) r.answer.push("The investment is not recovered within " + p.flows.length + " years.");
                    else { r.answer.push((disc ? "Discounted payback = " : "Payback period = ") + N(res, 2) + " years"); r.nums.push(res); }
                }
                r.explanation = "A project that earns more than the required return has a positive NPV and adds value for the owners.";
                return r;
            }
        });

        /* ---------- Time value of money ---------- */
        reg({
            id: "tvm", name: "Time value of money", status: "full",
            test: c => /present value|future value|annuity|perpetuity|sinking fund|effective (annual )?(interest )?rate|nominal (annual )?(interest )?rate|compounded|compound interest|instal(l)?ment|repayment|amortis(ation|ed)? (schedule|loan)/.test(c.low) &&
                !/\bnpv\b|net present value|\birr\b|payback|goodwill|ifrs|ias \d|bond|dividend|lease|wacc/.test(c.low),
            solve(c) {
                const rate = c.pct.find(f => /rate|interest|per annum|p\.a|annum|nominal|effective|at|compounded/.test(f.pre + f.post)) || c.pct[0];
                if (!rate) return Miss("Time value of money", ["the interest rate"]);
                const T = tag(c.money, [
                    ["pmt", /payments?|instal(l)?ments?|annuity|each (month|year|quarter)|per (month|year|quarter)|a (month|year)|monthly|annually|contribut|every (month|year)/],
                    ["fv", /future value|accumulate|will be worth|grow (to|into)|target|goal|\bfv\b/],
                    ["pv", /present value|invest|deposit|principal|borrow|loan|lump sum|today|initial|\bpv\b|amount/]
                ]);
                const pmt = first(T, "pmt"), fv = first(T, "fv"), pv = first(T, "pv") || (!pmt && !fv ? c.money[0] : null);
                const low = c.low;
                const freqWord = s => /monthly|per month|each month|a month|every month/.test(s) ? 12 : /quarterly|per quarter|each quarter/.test(s) ? 4 : /semi-?annual|half-?yearly/.test(s) ? 2 : /daily/.test(s) ? 365 : /weekly/.test(s) ? 52 : /annual|per year|each year|yearly|a year|per annum|p\.a/.test(s) ? 1 : null;
                const cm = low.match(/compounded\s+(monthly|quarterly|semi-?annually|annually|daily|weekly)/);
                const cf = cm ? freqWord(cm[1]) || (/semi/.test(cm[1]) ? 2 : /annual/.test(cm[1]) ? 1 : null) : null;
                const payF = freqWord(low.replace(/compounded\s+\w+/, ""));
                const r = Res("Time value of money");
                const notes = [];

                const i0 = rate.value / 100;
                if (/effective/.test(low) && /nominal/.test(low) && !pv && !pmt && !fv) {
                    const m = cf || null;
                    if (!m) return Miss("Effective interest rate", ["how often the interest is compounded (monthly, quarterly...)"]);
                    const eff = Math.pow(1 + i0 / m, m) - 1;
                    r.given.push("Nominal rate: " + P(rate.value), "Compounding periods per year: " + m);
                    r.formula = ["Effective rate = (1 + i ÷ m)^m − 1"]; r.subst = [`(1 + ${N(i0, 6)} ÷ ${m})^${m} − 1`];
                    r.answer = ["Effective annual rate = " + P(eff * 100)]; r.nums = [eff * 100]; return r;
                }

                let m = cf || payF || 1;
                if (!cf && !payF) notes.push("No compounding frequency was stated, so annual compounding was assumed.");
                else if (!cf && payF) notes.push("Compounding was taken to match the payment frequency (" + payF + " per year).");
                const yrs = c.yrs[0] ? c.yrs[0].value : (c.mon[0] ? c.mon[0].value / 12 : null);
                const i = i0 / m;
                const due = /beginning of|annuity due|start of each|in advance/.test(low);
                const wantPV = /present value|how much (must|should|do|would).*(invest|deposit|save)|invest today|today/.test(low) && !/loan|instal|repay/.test(low);
                const wantPMT = /instal(l)?ment|repayment|monthly payment|calculate the payment|sinking fund|how much (must|should).*(each|per)/.test(low);
                const wantFV = /future value|accumulate|will (it )?(be|grow)|value after|worth after/.test(low) || !wantPV;

                if (/perpetuity/.test(low) && pmt) {
                    const v = pmt.value / i0;
                    r.formula = ["PV of a perpetuity = Payment ÷ Rate"]; r.subst = [`${R(pmt.value)} ÷ ${N(i0, 6)}`];
                    r.answer = ["Present value = " + R(v)]; r.nums = [v]; return r;
                }
                if (yrs === null) return Miss("Time value of money", ["the number of years (or months)"]);
                const n = yrs * m;
                r.given.push("Rate: " + P(rate.value) + " per annum", "Periods: " + N(n, 2) + " (" + m + " per year)");
                const af = (1 + (due ? i : 0)) * ((Math.pow(1 + i, n) - 1) / i);

                if (pmt && !pv && !fv) {
                    const pm = pmt.value;
                    if (wantPV) {
                        const v = pm * (1 + (due ? i : 0)) * (1 - Math.pow(1 + i, -n)) / i;
                        r.given.push(money("Payment", pm)); r.formula = ["PV of annuity = PMT × [1 − (1 + i)^−n] ÷ i" + (due ? " × (1 + i)" : "")];
                        r.subst = [`${R(pm)} × [1 − (1 + ${N(i, 6)})^−${N(n, 2)}] ÷ ${N(i, 6)}`]; r.answer = ["Present value = " + R(v)]; r.nums = [v];
                    } else {
                        const v = pm * af;
                        r.given.push(money("Payment", pm)); r.formula = ["FV of annuity = PMT × [(1 + i)^n − 1] ÷ i" + (due ? " × (1 + i)" : "")];
                        r.subst = [`${R(pm)} × [(1 + ${N(i, 6)})^${N(n, 2)} − 1] ÷ ${N(i, 6)}`]; r.answer = ["Future value = " + R(v)]; r.nums = [v];
                        r.answer.push("Total paid in = " + R(pm * n), "Interest earned = " + R(v - pm * n)); r.nums.push(pm * n, v - pm * n);
                    }
                } else if (pv && wantPMT && !pmt) {
                    const pm = pv.value * i / (1 - Math.pow(1 + i, -n));
                    r.given.push(money("Loan / amount", pv.value)); r.formula = ["PMT = PV × i ÷ [1 − (1 + i)^−n]"];
                    r.subst = [`${R(pv.value)} × ${N(i, 6)} ÷ [1 − (1 + ${N(i, 6)})^−${N(n, 2)}]`];
                    r.answer = ["Payment per period = " + R(pm), "Total repaid = " + R(pm * n), "Total interest = " + R(pm * n - pv.value)]; r.nums = [pm, pm * n, pm * n - pv.value];
                } else if (pv && !pmt) {
                    const v = pv.value * Math.pow(1 + i, n);
                    r.given.push(money("Present value", pv.value)); r.formula = ["FV = PV × (1 + i)^n"];
                    r.subst = [`${R(pv.value)} × (1 + ${N(i, 6)})^${N(n, 2)}`]; r.answer = ["Future value = " + R(v), "Interest earned = " + R(v - pv.value)]; r.nums = [v, v - pv.value];
                } else if (fv && !pmt && !pv) {
                    const v = fv.value / Math.pow(1 + i, n);
                    r.given.push(money("Future value", fv.value)); r.formula = ["PV = FV ÷ (1 + i)^n"];
                    r.subst = [`${R(fv.value)} ÷ (1 + ${N(i, 6)})^${N(n, 2)}`]; r.answer = ["Present value = " + R(v)]; r.nums = [v];
                } else if (fv && pmt && !pv) {
                    const pm = fv.value / af;
                    r.given.push(money("Target future value", fv.value)); r.formula = ["PMT = FV ÷ {[(1 + i)^n − 1] ÷ i}"];
                    r.subst = [`${R(fv.value)} ÷ ${N(af, 6)}`]; r.answer = ["Payment per period = " + R(pm)]; r.nums = [pm];
                } else return Miss("Time value of money", ["which value is required (present value, future value or payment) and the amounts given"]);
                r.required = "As asked"; r.notes = notes.concat(due ? [] : ["Payments are taken at the end of each period (ordinary annuity)."]);
                r.explanation = "Money earns interest over time, so amounts at different dates are converted to the same date using the interest rate.";
                return r;
            }
        });

        /* ---------- WACC ---------- */
        reg({
            id: "wacc", name: "WACC", status: "full",
            test: c => /\bwacc\b|weighted average cost of capital/.test(c.low),
            solve(c) {
                const M = tag(c.money, [["E", /equity|shares|market capital/], ["D", /debt|loan|bond|borrow/]]);
                const Pc = tag(c.pct, [
                    ["ke", /cost of equity|required return|equity.*(rate|cost|return)|\bke\b/],
                    ["kd", /cost of debt|debt.*(rate|cost)|interest|\bkd\b|borrowing/],
                    ["tax", /tax rate|taxed at|tax at|tax of|corporate tax|company tax/]
                ]);
                const E = first(M, "E"), D = first(M, "D"), ke = first(Pc, "ke"), kd = first(Pc, "kd"), tx = first(Pc, "tax");
                const miss = [];
                if (!E) miss.push("market value of equity"); if (!D) miss.push("market value of debt");
                if (!ke) miss.push("cost of equity"); if (!kd) miss.push("cost of debt");
                const afterTax = kd && /after[- ]tax/.test(kd.pre + kd.post);
                if (!tx && !afterTax) {
                    if (CONFIG.companyTaxRate === null) miss.push("the tax rate (or confirm that the cost of debt is already after tax)");
                }
                if (miss.length) return Miss("Weighted average cost of capital", miss);
                let t = tx ? tx.value : (afterTax ? 0 : CONFIG.companyTaxRate);
                const V = E.value + D.value, we = E.value / V, wd = D.value / V, kda = afterTax ? kd.value : kd.value * (1 - t / 100);
                const w = we * ke.value + wd * kda;
                const r = Res("Weighted average cost of capital (WACC)");
                r.given.push(money("Equity (E)", E.value), money("Debt (D)", D.value), "Cost of equity: " + P(ke.value), (afterTax ? "After-tax cost of debt: " : "Pre-tax cost of debt: ") + P(kd.value), "Tax rate: " + P(t));
                if (!tx && !afterTax) r.notes.push("No tax rate was given; the configured rate " + t + "% (" + CONFIG.taxYear + ") was assumed.");
                r.required = "WACC";
                r.formula = ["WACC = (E ÷ V × Ke) + (D ÷ V × Kd × (1 − t))", "V = E + D"];
                r.subst = [`V = ${R(E.value)} + ${R(D.value)} = ${R(V)}`, `WACC = (${R(E.value)} ÷ ${R(V)} × ${P(ke.value)}) + (${R(D.value)} ÷ ${R(V)} × ${P(kd.value)} × (1 − ${N(t / 100, 4)}))`];
                r.calc = [`Weights: E = ${P(we * 100)}, D = ${P(wd * 100)}`, `After-tax Kd = ${P(kd.value)} × (1 − ${N(t / 100, 4)}) = ${P(kda)}`, `WACC = ${P(we * ke.value)} + ${P(wd * kda)}`];
                r.answer = ["WACC = " + P(w)]; r.nums = [w]; r.values.wacc = w;
                r.explanation = "WACC is the average return the providers of finance require, weighted by the market value of each source. Interest is tax-deductible, so debt is cheaper after tax.";
                return r;
            }
        });

        /* ---------- CAPM, dividend growth model, bonds ---------- */
        reg({
            id: "valuation", name: "CAPM, dividend growth model, bond value", status: "full",
            test: c => /capm|capital asset pricing|\bbeta\b|dividend growth|gordon|cost of equity|value of (a|the) (share|bond)|share valuation|bond (value|price|valuation)|intrinsic value/.test(c.low) && !/wacc|weighted average/.test(c.low),
            solve(c) {
                const low = c.low;
                const pc = tag(c.pct, [["rf", /risk[- ]free/], ["rm", /market (return|rate)|return on the market/], ["prem", /risk premium/], ["g", /growth|grow/], ["ke", /required|cost of equity|return|yield|discount|\bke\b/], ["cpn", /coupon|interest/]]);
                const mn = tag(c.money, [["d1", /next (year'?s )?dividend|expected dividend|\bd1\b/], ["d0", /last dividend|dividend (just )?paid|current dividend|\bd0\b|dividend of|dividend/], ["p0", /share price|market price|current price|price of|price/], ["face", /face value|nominal|par|maturity|redeem/]]);
                if (/capm|capital asset pricing|\bbeta\b/.test(low)) {
                    const beta = c.F.find(f => f.kind === "number" && /beta|β/.test(f.pre + f.post));
                    const rf = first(pc, "rf"), rm = first(pc, "rm"), pr = first(pc, "prem");
                    const miss = [];
                    if (!beta) miss.push("beta"); if (!rf) miss.push("risk-free rate"); if (!rm && !pr) miss.push("market return (or market risk premium)");
                    if (miss.length) return Miss("CAPM", miss);
                    const prem = pr ? pr.value : rm.value - rf.value, ke = rf.value + beta.value * prem;
                    const r = Res("CAPM – cost of equity");
                    r.given.push("Risk-free rate: " + P(rf.value), "Beta: " + N(beta.value, 2), pr ? "Market risk premium: " + P(pr.value) : "Market return: " + P(rm.value));
                    r.required = "Cost of equity (Ke)"; r.formula = ["Ke = Rf + β × (Rm − Rf)"];
                    r.subst = [`${P(rf.value)} + ${N(beta.value, 2)} × ${P(prem)}`]; r.answer = ["Ke = " + P(ke)]; r.nums = [ke]; r.values.ke = ke;
                    r.explanation = "Investors require the risk-free rate plus a premium that grows with the share's market risk (beta).";
                    return r;
                }
                if (/bond/.test(low)) {
                    const face = first(mn, "face") || c.money[0], cp = first(pc, "cpn"), y = first(pc, "ke") || c.pct.find(f => f !== cp);
                    const yrs = c.yrs[0];
                    const miss = [];
                    if (!face) miss.push("face value"); if (!cp) miss.push("coupon rate"); if (!y) miss.push("market yield (required return)"); if (!yrs) miss.push("years to maturity");
                    if (miss.length) return Miss("Bond valuation", miss);
                    const cf = face.value * cp.value / 100, i = y.value / 100, n = yrs.value;
                    const v = cf * (1 - Math.pow(1 + i, -n)) / i + face.value / Math.pow(1 + i, n);
                    const r = Res("Bond valuation");
                    r.given.push(money("Face value", face.value), "Coupon rate: " + P(cp.value) + " (annual)", "Yield: " + P(y.value), "Years: " + N(n, 0));
                    r.required = "Value of the bond"; r.formula = ["Value = Coupon × [1 − (1 + i)^−n] ÷ i + Face value ÷ (1 + i)^n"];
                    r.subst = [`Coupon = ${R(face.value)} × ${P(cp.value)} = ${R(cf)}`, `${R(cf)} × [1 − (1 + ${N(i, 4)})^−${n}] ÷ ${N(i, 4)} + ${R(face.value)} ÷ (1 + ${N(i, 4)})^${n}`];
                    r.answer = ["Bond value = " + R(v)]; r.nums = [v]; r.notes.push("Annual coupons assumed.");
                    return r;
                }
                /* dividend growth model */
                const g = first(pc, "g"), ke = first(pc, "ke") && first(pc, "ke") !== g ? first(pc, "ke") : c.pct.find(f => f !== g);
                let d1 = first(mn, "d1"), d0 = first(mn, "d0"), p0 = first(mn, "p0");
                if (!g) return Miss("Dividend growth model", ["the dividend growth rate"]);
                if (!d1 && !d0) return Miss("Dividend growth model", ["the dividend (last or expected)"]);
                const D1 = d1 ? d1.value : d0.value * (1 + g.value / 100);
                const r = Res("Dividend growth model");
                r.given.push("Growth rate g: " + P(g.value), d1 ? money("Next dividend D1", D1) : money("Last dividend D0", d0.value));
                if (!d1) r.calc.push(`D1 = ${R(d0.value)} × (1 + ${N(g.value / 100, 4)}) = ${R(D1)}`);
                if (p0 && (!ke || /cost of equity|required return/.test(low) && !/value of/.test(low))) {
                    const k = D1 / p0.value * 100 + g.value;
                    r.required = "Cost of equity"; r.formula = ["Ke = D1 ÷ P0 + g"]; r.subst = [`${R(D1)} ÷ ${R(p0.value)} + ${P(g.value)}`];
                    r.answer = ["Ke = " + P(k)]; r.nums = [k]; r.values.ke = k; return r;
                }
                if (!ke) return Miss("Dividend growth model", ["the required return (cost of equity)"]);
                if (ke.value <= g.value) return Miss("Dividend growth model", ["a required return higher than the growth rate (the model does not work otherwise)"]);
                const v = D1 / ((ke.value - g.value) / 100);
                r.given.push("Required return Ke: " + P(ke.value));
                r.required = "Value of the share"; r.formula = ["P0 = D1 ÷ (Ke − g)"]; r.subst = [`${R(D1)} ÷ (${N(ke.value / 100, 4)} − ${N(g.value / 100, 4)})`];
                r.answer = ["Share value P0 = " + R(v)]; r.nums = [v]; return r;
            }
        });

        /* ---------- Financial ratios ---------- */
        const RATIOS = [
            ["current ratio", /current ratio/, ["ca", "cl"], v => v.ca / v.cl, "Current assets ÷ Current liabilities", x => N(x, 2) + " : 1", "A ratio of about 2 : 1 is a traditional liquidity guide; compare it with the industry and earlier years."],
            ["acid-test (quick) ratio", /acid[- ]test|quick ratio/, ["ca", "inv", "cl"], v => (v.ca - v.inv) / v.cl, "(Current assets − Inventory) ÷ Current liabilities", x => N(x, 2) + " : 1", "About 1 : 1 or higher suggests the business can pay current debts without selling inventory."],
            ["debt ratio", /debt ratio/, ["tl", "ta"], v => v.tl / v.ta * 100, "Total liabilities ÷ Total assets × 100", P, "The higher the ratio, the more of the assets are financed by outsiders."],
            ["debt-equity ratio", /debt[- ]equity|gearing/, ["debt", "eq"], v => v.debt / v.eq, "Total debt ÷ Total equity", x => N(x, 2) + " : 1", "A higher ratio means higher financial risk and interest commitments."],
            ["gross profit percentage", /gross profit (percentage|margin|%)|gross margin/, ["gp", "sales"], v => v.gp / v.sales * 100, "Gross profit ÷ Sales × 100", P, "Shows how much gross profit each rand of sales earns."],
            ["net profit percentage", /net profit (percentage|margin|%)|net margin/, ["np", "sales"], v => v.np / v.sales * 100, "Net profit ÷ Sales × 100", P, "Shows profit after all expenses per rand of sales."],
            ["return on equity", /return on equity|\broe\b/, ["np", "eq"], v => v.np / v.eq * 100, "Net profit ÷ Equity × 100", P, "Shows the return earned for the owners; use average equity if given."],
            ["return on assets", /return on assets|\broa\b/, ["np", "ta"], v => v.np / v.ta * 100, "Net profit ÷ Total assets × 100", P, "Shows how efficiently assets generate profit."],
            ["return on capital employed", /return on capital employed|\broce\b/, ["ebit", "ce"], v => v.ebit / v.ce * 100, "Operating profit ÷ Capital employed × 100", P, "Shows the return on all long-term finance."],
            ["inventory turnover", /inventory turnover|stock turnover/, ["cos", "inv"], v => v.cos / v.inv, "Cost of sales ÷ Average inventory", x => N(x, 2) + " times", "Higher turnover means inventory is sold faster."],
            ["debtors' collection period", /debtors?'? ?(collection|days)|receivables? (days|collection)/, ["rec", "sales"], v => v.rec / v.sales * 365, "Receivables ÷ Credit sales × 365", x => N(x, 1) + " days", "Compare with the credit terms granted to customers."],
            ["creditors' payment period", /creditors?'? ?(payment|days)|payables? (days|payment)/, ["pay", "cos"], v => v.pay / v.cos * 365, "Payables ÷ Credit purchases (or cost of sales) × 365", x => N(x, 1) + " days", "A long period helps cash flow but may damage supplier relationships."],
            ["interest cover", /interest cover/, ["ebit", "int"], v => v.ebit / v.int, "Operating profit ÷ Interest expense", x => N(x, 2) + " times", "Shows how comfortably profit covers interest."],
            ["price-earnings ratio", /price[- ]earnings|p\/e/, ["price", "eps"], v => v.price / v.eps, "Market price per share ÷ Earnings per share", x => N(x, 2) + " times", "Shows how many years of earnings the market is paying for."],
            ["dividend yield", /dividend yield/, ["dps", "price"], v => v.dps / v.price * 100, "Dividend per share ÷ Market price × 100", P, "Shows the cash return from dividends relative to the share price."]
        ];

        reg({
            id: "ratios", name: "Financial ratios", status: "full",
            test: c => RATIOS.some(x => x[1].test(c.low)),
            solve(c) {
                const T = tag(c.money, [
                    ["cos", /cost of (sales|goods sold)|\bcos\b/], ["gp", /gross profit/], ["np", /net profit|profit after tax|net income|profit for the year/],
                    ["ebit", /ebit|operating profit|profit before interest/], ["ca", /current assets/], ["cl", /current liabilities/],
                    ["tl", /total liabilities/], ["ta", /total assets/], ["ce", /capital employed/], ["eq", /total equity|shareholders|owner'?s equity|equity/],
                    ["inv", /inventor|stock/], ["rec", /receivables|debtors/], ["pay", /payables|creditors/],
                    ["sales", /sales|revenue|turnover/], ["int", /interest/], ["dps", /dividend/], ["eps", /earnings per share|\beps\b/], ["price", /market price|share price|price/], ["debt", /debt|borrowings|loans/]
                ]);
                const v = {}; Object.keys(T).forEach(k => { v[k] = T[k][0].value; });
                const r = Res("Financial ratio analysis");
                const done = [], skipped = [];
                RATIOS.forEach(x => {
                    if (!x[1].test(c.low)) return;
                    const miss = x[2].filter(k => v[k] === undefined);
                    if (miss.length) { skipped.push(x[0] + " (needs " + miss.join(", ") + ")"); return; }
                    if (x[2].some(k => v[k] === 0)) { skipped.push(x[0] + " (division by zero)"); return; }
                    const val = x[3](v);
                    r.formula.push(x[0].charAt(0).toUpperCase() + x[0].slice(1) + " = " + x[4]);
                    r.subst.push(x[2].map(k => k + " = " + R(v[k])).join(", "));
                    r.answer.push(x[0].charAt(0).toUpperCase() + x[0].slice(1) + " = " + x[5](val));
                    r.nums.push(val); r.explanation += (r.explanation ? " " : "") + x[6];
                    x[2].forEach(k => { const f = T[k][0]; r.given.push(k + ": " + R(f.value)); });
                });
                if (!r.answer.length) return skipped.length ? Miss("Financial ratios", ["the figures needed: " + skipped.join("; ")]) : null;
                r.required = "Requested ratio(s)";
                if (skipped.length) r.notes.push("Not calculated: " + skipped.join("; ") + ".");
                return r;
            }
        });

        /* =========================================================
           B. IFRS / IAS MODULES
        ========================================================= */

        /* ---------- IFRS 3 / IFRS 10: goodwill and NCI ---------- */
        reg({
            id: "goodwill", name: "IFRS 3 goodwill and non-controlling interest", status: "partial",
            test: c => /goodwill|non-?controlling|\bnci\b|bargain purchase|acquisition method/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["nciFV", /fair value of (the )?(nci|non-?controlling)|nci.*fair value|non-?controlling.*fair value/],
                    ["prev", /previously held|previous(ly)? (interest|holding)/],
                    ["post", /post[- ]acquisition (profit|earnings)|profit (since|after) acquisition/],
                    ["div", /dividend/],
                    ["net", /identifiable net assets|net assets|fair value of (the )?(net )?(identifiable )?assets|net identifiable/],
                    ["consid", /consideration|paid|purchase price|acquisition cost|purchase consideration/]
                ]);
                const pc = c.pct.find(f => /acquir|purchas|buys?|bought|owns?|holding|shares|voting|stake/.test(f.pre + f.post)) || c.pct[0];
                const consid = first(T, "consid"), net = first(T, "net"), nciFV = first(T, "nciFV"), prev = first(T, "prev");
                const miss = [];
                if (!consid) miss.push("consideration transferred");
                if (!net) miss.push("fair value of identifiable net assets at the acquisition date");
                if (!pc) miss.push("the percentage acquired");
                if (miss.length) return Miss("IFRS 3 goodwill", miss);
                const pct = pc.value / 100, ncip = 1 - pct;
                const prop = /proportionate share|proportion of (the )?(identifiable )?net assets|partial goodwill/.test(c.low);
                const fvBasis = /full goodwill|fair value of (the )?(nci|non-?controlling)|nci.*(at )?fair value/.test(c.low) || !!nciFV;
                let nci = 0, basis = "";
                if (ncip > 1e-9) {
                    if (prop) { nci = ncip * net.value; basis = "proportionate share of identifiable net assets (partial goodwill)"; }
                    else if (fvBasis) {
                        if (!nciFV) return Miss("IFRS 3 goodwill", ["the fair value of the non-controlling interest at the acquisition date"]);
                        nci = nciFV.value; basis = "fair value (full goodwill)";
                    } else return Miss("IFRS 3 goodwill", ["how NCI is measured: at its proportionate share of identifiable net assets, or at fair value"]);
                }
                const gw = consid.value + nci + (prev ? prev.value : 0) - net.value;
                const r = Res("IFRS 3 / IFRS 10 – Goodwill and non-controlling interest");
                r.given.push(money("Consideration transferred", consid.value), money("Identifiable net assets (fair value)", net.value), "Interest acquired: " + P(pc.value), "NCI measurement: " + (basis || "not applicable (100% acquired)"));
                if (prev) r.given.push(money("Fair value of previously held interest", prev.value));
                r.required = "NCI at acquisition and goodwill (or bargain purchase gain)";
                r.formula = ["Goodwill = Consideration + NCI + Fair value of previously held interest − Fair value of identifiable net assets", prop ? "NCI = NCI % × Identifiable net assets" : "NCI = Fair value of NCI"];
                r.calc = [`NCI = ${ncip > 1e-9 ? (prop ? `${P(ncip * 100)} × ${R(net.value)}` : R(nci)) : "0"} = ${R(nci)}`, `Goodwill = ${R(consid.value)} + ${R(nci)} + ${R(prev ? prev.value : 0)} − ${R(net.value)} = ${R(gw)}`];
                if (gw >= 0) r.answer = ["NCI = " + R(nci), "Goodwill = " + R(gw)];
                else r.answer = ["NCI = " + R(nci), "Bargain purchase gain in profit or loss = " + R(-gw) + " (after reassessing the fair values)"];
                r.journal = gw >= 0 ? [`Dr Net identifiable assets   ${R(net.value)}`, `Dr Goodwill   ${R(gw)}`, `   Cr Non-controlling interest   ${R(nci)}`, `   Cr Consideration (cash/shares)   ${R(consid.value)}`] : [];
                r.nums = [nci, gw]; r.values.goodwill = gw; r.values.nci = nci;
                const post = first(T, "post"), dv = first(T, "div");
                if (post && ncip > 1e-9) {
                    const close = nci + ncip * (post.value - (dv ? dv.value : 0));
                    r.calc.push(`NCI at reporting date = ${R(nci)} + ${P(ncip * 100)} × (${R(post.value)} − ${R(dv ? dv.value : 0)}) = ${R(close)}`);
                    r.answer.push("NCI at reporting date = " + R(close)); r.nums.push(close);
                }
                r.explanation = "Goodwill is the excess of what was paid (plus NCI) over the fair value of what was acquired. The measurement basis chosen for NCI changes both NCI and goodwill.";
                r.notes.push("Impairment of goodwill and other consolidation adjustments are not included.");
                return r;
            }
        });

        /* ---------- IFRS 10: unrealised intragroup profit ---------- */
        reg({
            id: "unrealised-profit", name: "Unrealised intragroup profit", status: "partial",
            test: c => /unrealised profit|intra-?group|inter-?company|intercompany/.test(c.low),
            solve(c) {
                const inv = c.money.find(f => /inventor|stock|remain|still (held|in)/.test(f.pre + f.post)) || c.money[0];
                const mk = c.pct.find(f => /mark-?up|cost/.test(f.pre + f.post)), mg = c.pct.find(f => /margin|selling price|gross profit/.test(f.pre + f.post) && f !== mk);
                if (!inv) return Miss("Unrealised profit", ["the amount of the intragroup inventory still held at the reporting date"]);
                if (!mk && !mg) return Miss("Unrealised profit", ["the mark-up on cost (or the gross profit margin) on the intragroup sale"]);
                const up = mk ? inv.value * mk.value / (100 + mk.value) : inv.value * mg.value / 100;
                const tx = c.pct.find(f => /tax/.test(f.pre + f.post)), nci = c.pct.find(f => /nci|non-?controlling|minority/.test(f.pre + f.post));
                const upstream = /upstream|subsidiary sold|sold by the subsidiary|subsidiary sells/.test(c.low);
                const r = Res("IFRS 10 – Unrealised intragroup profit in inventory");
                r.given.push(money("Intragroup inventory still held", inv.value), mk ? "Mark-up on cost: " + P(mk.value) : "Gross margin: " + P(mg.value));
                r.required = "Unrealised profit to eliminate";
                r.formula = [mk ? "Unrealised profit = Inventory × Mark-up ÷ (100 + Mark-up)" : "Unrealised profit = Inventory × Gross margin %"];
                r.subst = [mk ? `${R(inv.value)} × ${N(mk.value, 2)} ÷ ${N(100 + mk.value, 2)}` : `${R(inv.value)} × ${P(mg.value)}`];
                r.answer = ["Unrealised profit = " + R(up)]; r.nums = [up]; r.values.unrealised = up;
                if (tx) { const dt = up * tx.value / 100; r.calc.push(`Deferred tax asset = ${R(up)} × ${P(tx.value)} = ${R(dt)}`, `Profit after tax effect = ${R(up - dt)}`); r.answer.push("Deferred tax on the adjustment = " + R(dt)); r.nums.push(dt); }
                if (nci && upstream) { const base = up * (1 - (tx ? tx.value / 100 : 0)); const share = base * nci.value / 100; r.answer.push("Share attributed to NCI (upstream sale) = " + R(share)); r.nums.push(share); }
                else if (nci) r.notes.push("For a downstream sale the whole adjustment reduces the parent's profit; NCI is not affected.");
                r.journal = [`Dr Cost of sales / Group profit   ${R(up)}`, `   Cr Inventory   ${R(up)}`];
                r.explanation = "Profit made on a sale inside the group is not realised until the goods are sold outside the group, so it is removed on consolidation.";
                return r;
            }
        });

        /* ---------- IFRS 9: classification ---------- */
        reg({
            id: "ifrs9-class", name: "IFRS 9 classification of financial assets", status: "full", qualitative: true,
            test: c => /sppi|business model|amortised cost|fvoci|fvtpl|financial asset|solely payments of principal/.test(c.low) && /classif|categor|measured|measurement|which|how should|business model|sppi/.test(c.low) && !/effective interest|expected credit|\becl\b/.test(c.low),
            solve(c) {
                const low = c.low;
                const equity = /equity (instrument|investment)|ordinary shares|shares in/.test(low) && !/debt/.test(low);
                const collectSell = /collect(ing)?( the)?( contractual)?( cash flows)?\s*(,)?\s*and\s*(by )?sell|both (collecting|collect)|collect and sell/.test(low);
                const collectOnly = !collectSell && /(held|hold(s|ing)?|hold) (it |the asset )?(in order )?to collect|collect(ing)? (the )?contractual cash flows|business model.{0,40}collect/.test(low);
                const other = /held for trading|trading|short[- ]term profit|manage.{0,30}fair value|sell(ing)? (the asset )?(in the short|for profit)/.test(low);
                const sppiFail = /(fail(s|ed)?|does not (meet|pass|satisfy)|not (meet|pass|satisfy)|doesn'?t (meet|pass)|no)\s+(the\s+)?sppi|sppi (test )?(is )?(failed|not met)|not solely payments/.test(low);
                const sppiPass = !sppiFail && /(meet|meets|pass|passes|passed|satisfy|satisfies|satisfied|solely payments of principal)/.test(low) && /sppi|solely payments/.test(low);
                const fvo = /fair value option|designat/.test(low);
                const r = Res("IFRS 9 – Classification of a financial asset");
                r.required = "Measurement category";
                r.formula = ["Amortised cost: held to collect contractual cash flows AND SPPI test passed", "FVOCI: held to collect AND sell, and SPPI passed", "FVTPL: everything else (including failed SPPI or trading)"];
                let cat, why;
                if (equity) {
                    const el = /irrevocabl|election|elect/.test(low) && !other;
                    cat = el ? "FVOCI (irrevocable election; no recycling to profit or loss)" : "FVTPL";
                    why = "An equity instrument can never meet the SPPI test, so it is FVTPL unless there is an irrevocable election to present fair value changes in OCI (not available for trading).";
                } else if (sppiFail) { cat = "FVTPL"; why = "The contractual cash flows are not solely payments of principal and interest."; }
                else if (!sppiPass) return Miss("IFRS 9 classification", ["whether the contractual cash flows pass the SPPI test"]);
                else if (collectSell) { cat = "FVOCI"; why = "SPPI is passed and the business model is both to collect cash flows and to sell."; }
                else if (collectOnly) { cat = "Amortised cost"; why = "SPPI is passed and the business model is to hold the asset to collect contractual cash flows."; }
                else if (other) { cat = "FVTPL"; why = "The business model is neither hold-to-collect nor collect-and-sell (e.g. trading)."; }
                else return Miss("IFRS 9 classification", ["the business model (hold to collect, collect and sell, or other)"]);
                r.given.push("Business model: " + (equity ? "equity instrument" : collectSell ? "collect and sell" : collectOnly ? "hold to collect" : other ? "trading / other" : "not stated"), "SPPI test: " + (equity ? "cannot be met by equity" : sppiFail ? "failed" : "passed"));
                r.calc = [why];
                r.answer = ["Classification = " + cat];
                r.explanation = "Classification depends on BOTH the business model and the SPPI test, not on whether the asset pays interest.";
                r.notes.push(fvo ? "A fair value option designation was mentioned: it is allowed only to remove an accounting mismatch." : "This assumes the fair value option has not been elected and all other IFRS 9 requirements are satisfied.");
                return r;
            }
        });

        /* ---------- IFRS 9: expected credit loss ---------- */
        reg({
            id: "ecl", name: "IFRS 9 expected credit loss", status: "partial",
            test: c => /expected credit loss|\becl\b|probability of default|loss given default/.test(c.low),
            solve(c) {
                const ead = c.money.find(f => /exposure|ead|carrying|outstanding|balance|loan/.test(f.pre + f.post)) || c.money[0];
                const pd = c.pct.find(f => /probability of default|\bpd\b|default/.test(f.pre + f.post) && !/loss given/.test(f.pre + f.post));
                let lgd = c.pct.find(f => /loss given default|\blgd\b/.test(f.pre + f.post));
                const rec = c.pct.find(f => /recover/.test(f.pre + f.post));
                const miss = [];
                if (!ead) miss.push("exposure at default"); if (!pd) miss.push("probability of default");
                if (!lgd && !rec) miss.push("loss given default (or recovery rate)");
                if (miss.length) return Miss("IFRS 9 expected credit loss", miss);
                const lv = lgd ? lgd.value : 100 - rec.value, ecl = ead.value * pd.value / 100 * lv / 100;
                const r = Res("IFRS 9 – Expected credit loss");
                r.given.push(money("Exposure at default", ead.value), "PD: " + P(pd.value), "LGD: " + P(lv));
                r.required = "Expected credit loss allowance"; r.formula = ["ECL = EAD × PD × LGD", "LGD = 1 − Recovery rate"];
                r.subst = [`${R(ead.value)} × ${P(pd.value)} × ${P(lv)}`]; r.answer = ["ECL = " + R(ecl)]; r.nums = [ecl];
                r.journal = [`Dr Impairment loss (ECL expense)   ${R(ecl)}`, `   Cr Loss allowance   ${R(ecl)}`];
                r.notes.push("Use a 12-month PD for stage 1 assets and a lifetime PD for stages 2 and 3; discounting is not applied here.");
                return r;
            }
        });

        /* ---------- IFRS 9: effective interest / amortised cost ---------- */
        reg({
            id: "effective-interest", name: "IFRS 9 effective interest method", status: "partial",
            test: c => /effective interest|amortised cost.*(calculate|table|schedule|carrying)|amortisation table|amortisation schedule/.test(c.low),
            solve(c) {
                const T = tag(c.money, [["face", /face|nominal|maturity|redeem|par value|repay/], ["cpn", /coupon|interest (of|paid|received)|annual interest/], ["price", /issued at|purchased|bought|fair value|initial|price|lent|loan|invest/]]);
                const yrs = c.yrs[0], price = first(T, "price"), face = first(T, "face") || null;
                const cpnPct = c.pct.find(f => /coupon|nominal|stated|interest/.test(f.pre + f.post) && !/effective|market/.test(f.pre + f.post));
                const eirF = c.pct.find(f => /effective|market|yield/.test(f.pre + f.post));
                const miss = [];
                if (!price) miss.push("the initial amount (fair value / price paid)"); if (!face) miss.push("the face value repaid at maturity");
                if (!yrs) miss.push("the number of years"); if (!first(T, "cpn") && !cpnPct) miss.push("the annual coupon (amount or rate)");
                if (miss.length) return Miss("Effective interest method", miss);
                const cpn = first(T, "cpn") ? first(T, "cpn").value : face.value * cpnPct.value / 100, n = Math.round(yrs.value);
                const flows = Array(n).fill(cpn); flows[n - 1] += face.value;
                const eir = eirF ? eirF.value / 100 : solveIRR(price.value, flows);
                if (eir === null) return Miss("Effective interest method", ["cash flows that allow an effective rate to be found"]);
                const r = Res("IFRS 9 – Amortised cost and effective interest");
                r.given.push(money("Initial amount", price.value), money("Face value", face.value), money("Annual coupon", cpn), "Years: " + n, "Effective rate: " + P(eir * 100) + (eirF ? "" : " (calculated)"));
                r.required = "Interest income each year and the amortised cost";
                r.formula = ["Interest = Opening amortised cost × Effective rate", "Closing amortised cost = Opening + Interest − Cash received"];
                let bal = price.value;
                for (let y = 1; y <= n && y <= 12; y++) {
                    const int = bal * eir, cash = y === n ? cpn + face.value : cpn, cl = bal + int - (y === n ? cpn : cpn);
                    r.calc.push(`Year ${y}: ${R(bal)} × ${P(eir * 100)} = ${R(int)} interest; coupon ${R(cpn)} → closing ${R(cl)}`);
                    bal = cl; r.nums.push(int);
                }
                r.answer = ["Effective interest rate = " + P(eir * 100), "Year 1 interest = " + R(price.value * eir), "Amortised cost at end of year " + Math.min(n, 12) + " (before the final repayment) = " + R(bal)];
                r.nums.push(eir * 100, bal); r.notes.push("Expected credit losses are not deducted.");
                return r;
            }
        });

        /* ---------- IAS 12: deferred tax and current tax ---------- */
        reg({
            id: "deferred-tax", name: "IAS 12 deferred tax", status: "full",
            test: c => /deferred tax|temporary difference|tax base|\bdtl\b|\bdta\b/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["taxallow", /tax (depreciation|allowance|wear)|capital allowance|wear and tear|sars allowance/],
                    ["accdep", /accounting depreciation|accumulated (accounting )?depreciation|depreciation (charged|for accounting)/],
                    ["taxbase", /tax base|tax value|for tax purposes/], ["open", /opening|brought forward|previous|beginning/],
                    ["carry", /carrying amount|book value|accounting value|statement of financial position/], ["cost", /cost|purchase|bought/]
                ]);
                const rf = c.pct.find(f => /tax|rate/.test(f.pre + f.post)) || c.pct[0];
                let rate = rf ? rf.value : CONFIG.companyTaxRate;
                const miss = [];
                if (rate === null || rate === undefined) miss.push("the tax rate");
                const liab = /liabilit|provision|accrual|deferred income|received in advance/.test(c.low);
                let carry = first(T, "carry") ? first(T, "carry").value : null, tb = first(T, "taxbase") ? first(T, "taxbase").value : null;
                const cost = first(T, "cost");
                if (carry === null && cost && first(T, "accdep")) carry = cost.value - first(T, "accdep").value;
                if (tb === null && cost && first(T, "taxallow")) tb = cost.value - first(T, "taxallow").value;
                if (carry === null) miss.push("the carrying amount (or cost and accounting depreciation)");
                if (tb === null) miss.push("the tax base (or cost and tax allowances claimed)");
                if (miss.length) return Miss("IAS 12 deferred tax", miss);
                const td = liab ? tb - carry : carry - tb;   /* positive = taxable temporary difference */
                const dt = td * rate / 100;
                const r = Res("IAS 12 – Deferred tax");
                r.given.push(money("Carrying amount", carry), money("Tax base", tb), "Tax rate: " + P(rate));
                if (rf === undefined || !rf) r.notes.push("Tax rate taken from configuration (" + CONFIG.taxYear + ").");
                r.required = "Temporary difference and deferred tax";
                r.formula = [liab ? "Temporary difference (liability) = Tax base − Carrying amount" : "Temporary difference (asset) = Carrying amount − Tax base", "Deferred tax = Temporary difference × Tax rate", "Taxable difference → deferred tax liability; deductible difference → deferred tax asset"];
                r.calc = [`Temporary difference = ${R(td)} (${td > 0 ? "taxable" : td < 0 ? "deductible" : "none"})`, `Deferred tax = ${R(Math.abs(td))} × ${P(rate)} = ${R(Math.abs(dt))}`];
                if (td > 0) r.answer = ["Deferred tax liability = " + R(dt)];
                else if (td < 0) { r.answer = ["Deferred tax asset = " + R(-dt)]; r.notes.push("A deferred tax asset is recognised only if it is probable that future taxable profit will be available."); }
                else r.answer = ["No temporary difference, so no deferred tax."];
                r.nums = [td, Math.abs(dt)]; r.values.deferredTax = dt;
                const op = first(T, "open");
                if (op) {
                    const closing = td > 0 ? -dt : -dt; /* liability shown positive below */
                    const mv = Math.abs(dt) - op.value;
                    r.calc.push(`Movement = closing ${R(Math.abs(dt))} − opening ${R(op.value)} = ${R(mv)}`);
                    r.answer.push((mv >= 0 ? "Increase" : "Decrease") + " in deferred tax balance (profit or loss) = " + R(Math.abs(mv))); r.nums.push(mv);
                }
                r.explanation = "Deferred tax recognises the future tax effect of differences between the accounting and tax treatment of assets and liabilities.";
                return r;
            }
        });

        reg({
            id: "current-tax", name: "Current tax (taxable income × rate)", status: "partial",
            test: c => /taxable income|normal tax|current tax|income tax (expense|payable)/.test(c.low) && !/deferred|temporary/.test(c.low),
            solve(c) {
                const T = tag(c.money, [
                    ["less", /exempt|non-?taxable|dividend income|tax allowance|wear and tear|capital allowance|deduct|donation|allowance/],
                    ["add", /non-?deductible|add[- ]?back|disallowed|fines|penalt|entertainment|depreciation|impairment|provision/],
                    ["pbt", /profit before tax|accounting profit|net profit before|profit for the year before/]
                ]);
                const pbt = first(T, "pbt");
                const rf = c.pct.find(f => /tax|rate/.test(f.pre + f.post)) || c.pct[0];
                const rate = rf ? rf.value : CONFIG.companyTaxRate;
                const miss = [];
                if (!pbt) miss.push("accounting profit before tax"); if (rate === null || rate === undefined) miss.push("the tax rate");
                if (miss.length) return Miss("Current tax", miss);
                const add = sum(T.add), less = sum(T.less), ti = pbt.value + add - less, tax = Math.max(ti, 0) * rate / 100;
                const r = Res("Current tax calculation");
                r.given.push(money("Profit before tax", pbt.value), money("Add back (non-deductible / accounting items)", add), money("Less (exempt income / tax allowances)", less), "Tax rate: " + P(rate));
                r.required = "Taxable income and current tax"; r.formula = ["Taxable income = Profit before tax + Non-deductible items − Exempt income − Tax allowances", "Current tax = Taxable income × Tax rate"];
                r.calc = [`Taxable income = ${R(pbt.value)} + ${R(add)} − ${R(less)} = ${R(ti)}`, `Current tax = ${R(Math.max(ti, 0))} × ${P(rate)} = ${R(tax)}`];
                r.answer = ["Taxable income = " + R(ti), "Current tax = " + R(tax)]; r.nums = [ti, tax];
                r.notes.push("Items were classified from the words next to each amount. Check that each was added or deducted correctly.");
                return r;
            }
        });

        /* ---------- IAS 21: foreign currency ---------- */
        reg({
            id: "forex", name: "IAS 21 foreign currency transactions", status: "partial",
            test: c => /foreign (currency|exchange)|exchange (rate|difference)|ias 21|spot rate|closing rate/.test(c.low) || (/\$|usd|€|euro/.test(c.low) && /rate/.test(c.low) && /payable|receivable|import|export|creditor|debtor/.test(c.low)),
            solve(c) {
                const fc = c.F.find(f => f.cur && f.cur !== "ZAR" && f.kind === "money");
                const T = tag(c.F.filter(f => f !== fc && (f.kind === "money" || f.kind === "number")), [
                    ["settle", /settle|paid|payment date|settlement/], ["close", /closing|reporting date|year[- ]end|balance sheet/], ["spot", /transaction date|spot|initial|date of (the )?transaction|delivery|purchase|invoice|on /]
                ]);
                const miss = [];
                if (!fc) miss.push("the foreign currency amount (e.g. $10 000)");
                const spot = first(T, "spot"), cl = first(T, "close"), se = first(T, "settle");
                if (!spot) miss.push("the exchange rate on the transaction date");
                if (!cl && !se) miss.push("the closing rate and/or the settlement rate");
                if (miss.length) return Miss("IAS 21 foreign currency", miss);
                const liab = /payable|creditor|owe|import|purchas|borrow|loan received/.test(c.low);
                const r = Res("IAS 21 – Foreign currency transaction");
                const init = fc.value * spot.value;
                r.given.push(fc.cur + " " + N(fc.value, 2), "Spot rate: " + N(spot.value, 4), "Item type: " + (liab ? "monetary liability" : "monetary asset"));
                r.required = "Initial rand amount and exchange differences"; r.formula = ["Rand amount = Foreign amount × Rate", "Liability: higher rate → exchange loss; Asset: higher rate → exchange gain"];
                r.calc.push(`Initial recognition = ${N(fc.value, 2)} × ${N(spot.value, 4)} = ${R(init)}`); r.answer.push("Initial amount = " + R(init)); r.nums.push(init);
                let prev = init, prevRate = spot.value;
                [["closing rate (reporting date)", cl], ["settlement rate", se]].forEach(([nm, f]) => {
                    if (!f) return;
                    const v = fc.value * f.value, d = v - prev, gain = liab ? -d : d;
                    r.calc.push(`At ${nm}: ${N(fc.value, 2)} × ${N(f.value, 4)} = ${R(v)}; change ${R(d)}`);
                    r.answer.push((gain >= 0 ? "Exchange gain" : "Exchange loss") + " to " + nm + " = " + R(Math.abs(gain))); r.nums.push(gain);
                    prev = v;
                });
                r.explanation = "Monetary items are retranslated at the closing rate; the difference goes to profit or loss.";
                return r;
            }
        });

        /* ---------- IAS 28: equity method ---------- */
        reg({
            id: "equity-method", name: "IAS 28 equity method", status: "partial",
            test: c => /equity method|associate|ias 28|significant influence/.test(c.low) && /profit|dividend|carrying|cost|invest/.test(c.low),
            solve(c) {
                const pc = c.pct.find(f => /own|acqui|holding|interest|shares|stake|%/.test(f.pre + f.post)) || c.pct[0];
                const T = tag(c.money, [
                    ["imp", /impair/], ["divrec", /(investor|received|we received|dividend received)/], ["div", /dividend/],
                    ["profit", /profit|earnings|income/], ["cost", /cost|acquired|purchas|paid|invest|opening|carrying/]
                ]);
                const profit = first(T, "profit"), cost = first(T, "cost");
                const miss = [];
                if (!pc) miss.push("the investor's percentage holding"); if (!profit) miss.push("the associate's profit for the year"); if (!cost) miss.push("the cost or opening carrying amount of the investment");
                if (miss.length) return Miss("IAS 28 equity method", miss);
                const p = pc.value / 100, share = p * profit.value;
                let dv = 0, dvTxt = "";
                if (T.divrec) { dv = sum(T.divrec); dvTxt = `Dividend received = ${R(dv)}`; }
                else if (T.div) { dv = p * sum(T.div); dvTxt = `Dividend received = ${P(pc.value)} × ${R(sum(T.div))} = ${R(dv)}`; }
                const imp = sum(T.imp), close = cost.value + share - dv - imp;
                const r = Res("IAS 28 – Investment in an associate (equity method)");
                r.given.push(money("Cost / opening carrying amount", cost.value), "Holding: " + P(pc.value), money("Associate's profit", profit.value));
                if (pc.value < 20) r.notes.push("A holding below 20% does not normally give significant influence unless other evidence exists (e.g. board representation).");
                r.required = "Share of profit and closing carrying amount";
                r.formula = ["Share of profit = Holding % × Associate profit", "Closing carrying amount = Opening + Share of profit − Dividends received − Impairment"];
                r.calc = [`Share of profit = ${P(pc.value)} × ${R(profit.value)} = ${R(share)}`]; if (dvTxt) r.calc.push(dvTxt);
                r.calc.push(`Closing = ${R(cost.value)} + ${R(share)} − ${R(dv)} − ${R(imp)} = ${R(close)}`);
                r.answer = ["Share of profit = " + R(share), "Closing carrying amount = " + R(close)]; r.nums = [share, close, dv];
                r.explanation = "Under the equity method the investment is adjusted for the investor's share of the associate's results; dividends reduce the investment because they are a return of value already recognised.";
                return r;
            }
        });

        /* ---------- IAS 33: earnings per share ---------- */
        reg({
            id: "eps", name: "IAS 33 earnings per share", status: "partial",
            test: c => /earnings per share|\beps\b|ias 33/.test(c.low) && !/price[- ]earnings|p\/e/.test(c.low),
            solve(c) {
                const T = tag(c.money, [["prefdiv", /preference dividend|preference share dividend/], ["conv", /interest (saved|on (the )?convertible)/], ["profit", /profit|earnings|income|attributable/]]);
                const profit = first(T, "profit");
                const sh = tag(c.qty, [["issue", /issued|new shares|rights|issue/], ["start", /start|beginning|opening|in issue|outstanding|at the/], ["pot", /convertible|potential|options|dilut/]]);
                const start = first(sh, "start") || c.qty[0];
                const miss = [];
                if (!profit) miss.push("profit attributable to the ordinary shareholders"); if (!start) miss.push("number of ordinary shares in issue");
                if (miss.length) return Miss("IAS 33 earnings per share", miss);
                const earn = profit.value - sum(T.prefdiv);
                let wa = start.value, wtxt = `${N(start.value, 0)}`;
                const iss = first(sh, "issue");
                if (iss && iss !== start) {
                    const mb = c.low.match(/(\d+)\s*months?\s*(?:before|prior to)\s*(?:the\s*)?(?:year[- ]?end|reporting date)/);
                    const ma = c.low.match(/(\d+)\s*months?\s*(?:after|into|from)\s*(?:the\s*)?(?:start|beginning)/);
                    const out = mb ? parseInt(mb[1], 10) : ma ? 12 - parseInt(ma[1], 10) : null;
                    if (out === null) return Miss("IAS 33 earnings per share", ["for how many months the new shares were outstanding (e.g. '3 months before year-end')"]);
                    wa = start.value + iss.value * out / 12; wtxt = `${N(start.value, 0)} + ${N(iss.value, 0)} × ${out}/12`;
                }
                const r = Res("IAS 33 – Earnings per share");
                r.given.push(money("Profit for ordinary shareholders", profit.value), "Shares at start: " + N(start.value, 0));
                if (T.prefdiv) r.given.push(money("Preference dividends deducted", sum(T.prefdiv)));
                r.required = "Basic EPS"; r.formula = ["Basic EPS = (Profit − Preference dividends) ÷ Weighted average number of ordinary shares"];
                r.calc = [`Weighted average shares = ${wtxt} = ${N(wa, 2)}`, `EPS = ${R(earn)} ÷ ${N(wa, 2)} = ${R(earn / wa)}`];
                r.answer = ["Basic EPS = " + R(earn / wa) + " per share (" + N(earn / wa * 100, 2) + " cents)"]; r.nums = [earn / wa, earn / wa * 100, wa];
                if (/dilut/.test(c.low)) {
                    const pot = first(sh, "pot"), isv = first(T, "conv"), tx = c.pct.find(f => /tax/.test(f.pre + f.post));
                    if (pot) {
                        const sv = isv ? isv.value * (1 - (tx ? tx.value / 100 : 0)) : 0, dEPS = (earn + sv) / (wa + pot.value);
                        r.calc.push(`Diluted EPS = (${R(earn)} + ${R(sv)}) ÷ (${N(wa, 2)} + ${N(pot.value, 0)}) = ${R(dEPS)}`);
                        r.answer.push("Diluted EPS = " + R(dEPS)); r.nums.push(dEPS);
                    } else r.notes.push("Diluted EPS needs the number of potential ordinary shares (and any interest saved after tax).");
                }
                return r;
            }
        });

        /* =========================================================
           F. AUDITING NUMERICAL QUESTIONS
        ========================================================= */
        reg({
            id: "audit", name: "Audit materiality and projected misstatement", status: "partial",
            test: c => /materiality|projected misstatement|tolerable misstatement|sampling interval|misstatement/.test(c.low),
            solve(c) {
                const low = c.low;
                if (/projected misstatement|sample/.test(low) && /misstatement|error/.test(low) && !/overall materiality/.test(low)) {
                    const T = tag(c.money, [["pop", /population|total (value|balance)|book value of the (population|account)|account balance/], ["samp", /sample (value|total|size)|tested|sample of|examined/], ["err", /misstatement|error|found|overstate|understate/], ["tol", /tolerable/]]);
                    const pop = first(T, "pop"), sa = first(T, "samp"), er = first(T, "err"), tol = first(T, "tol");
                    const miss = [];
                    if (!pop) miss.push("the value of the population"); if (!sa) miss.push("the value of the sample tested"); if (!er) miss.push("the misstatement found in the sample");
                    if (miss.length) return Miss("Projected misstatement", miss);
                    const proj = er.value / sa.value * pop.value;
                    const r = Res("Audit sampling – Projected misstatement");
                    r.given.push(money("Population", pop.value), money("Sample value", sa.value), money("Misstatement in sample", er.value));
                    r.required = "Projected misstatement"; r.formula = ["Projected misstatement = (Misstatement in sample ÷ Sample value) × Population value"];
                    r.subst = [`(${R(er.value)} ÷ ${R(sa.value)}) × ${R(pop.value)}`]; r.answer = ["Projected misstatement = " + R(proj)]; r.nums = [proj];
                    if (tol) r.answer.push(proj > tol.value ? "Projected misstatement exceeds tolerable misstatement (" + R(tol.value) + ") – the balance may be materially misstated." : "Projected misstatement is within tolerable misstatement (" + R(tol.value) + ").");
                    return r;
                }
                if (/materiality/.test(low)) {
                    const bench = c.money.find(f => /profit|revenue|sales|assets|equity|benchmark|turnover|income/.test(f.pre + f.post)) || c.money[0];
                    const pc = c.pct.find(f => /materiality|of|%/.test(f.pre + f.post)) || c.pct[0];
                    if (!bench) return Miss("Audit materiality", ["the benchmark amount (e.g. profit before tax or revenue)"]);
                    if (!pc) return Miss("Audit materiality", ["the percentage applied to the benchmark"]);
                    const om = bench.value * pc.value / 100;
                    const r = Res("Audit materiality");
                    r.given.push(money("Benchmark", bench.value), "Percentage: " + P(pc.value));
                    r.required = "Overall materiality"; r.formula = ["Overall materiality = Benchmark × Percentage"];
                    r.subst = [`${R(bench.value)} × ${P(pc.value)}`]; r.answer = ["Overall materiality = " + R(om)]; r.nums = [om];
                    const pm = c.pct.find(f => f !== pc && /performance|of overall|of materiality/.test(f.pre + f.post));
                    if (pm) { const p = om * pm.value / 100; r.calc.push(`Performance materiality = ${R(om)} × ${P(pm.value)} = ${R(p)}`); r.answer.push("Performance materiality = " + R(p)); r.nums.push(p); }
                    r.explanation = "Materiality is the size of misstatement that could influence users' decisions; the percentage is a matter of professional judgement.";
                    return r;
                }
                return null;
            }
        });

        /* =========================================================
           ENGINE: splitting questions, multiple choice, entry points
        ========================================================= */

        function splitOptions(text) {
            const re = /^\s*\(?([A-E])[.)]\s+(.+)$/gm;
            const opts = []; let m, firstIdx = -1;
            while ((m = re.exec(text))) { if (firstIdx < 0) firstIdx = m.index; opts.push({ letter: m[1], text: m[2] }); }
            if (opts.length < 3) return { stem: text, options: null };
            return { stem: text.slice(0, firstIdx), options: opts };
        }

        function splitParts(txt) {
            const re = /(?:^|\s)\(([a-z]|[ivx]{1,4})\)\s+/g;
            const marks = []; let m;
            while ((m = re.exec(txt))) marks.push({ label: m[1], start: m.index, end: m.index + m[0].length });
            if (marks.length < 2) return null;
            const stem = txt.slice(0, marks[0].start);
            const parts = marks.map((mk, i) => ({ label: "(" + mk.label + ")", text: txt.slice(mk.end, i + 1 < marks.length ? marks[i + 1].start : txt.length) }));
            return { stem, parts };
        }

        function splitTop(text) {
            const topRe = /^\s*(?:question\s*)?(\d+(?:\.\d+)*)[.):]\s+(\S.*)$/i;
            const items = []; let cur = null;
            text.replace(/\r/g, "").split("\n").forEach(line => {
                const m = topRe.exec(line);
                if (m) { cur = { label: m[1], text: m[2] }; items.push(cur); }
                else if (cur) cur.text += "\n" + line;
            });
            return items.length >= 2 ? items : [{ label: "", text }];
        }

        const THEORY = /^\s*(what (is|are|does|do)|define|explain|discuss|describe|list|outline|state|why|differentiate|distinguish|tell me|give (me )?(an? )?(example|examples))\b/i;
        const CALC = /calculat|comput|determin|work out|find the|how much|what is the|what are the|solve|prepare|show that|value of/i;

        function solveOne(text, carry) {
            const c = makeCtx(text, carry);
            if (!c.F.length) {
                const q = MODS.find(m => m.qualitative && m.test(c));
                if (!q) return null;
                let r = null;
                try { r = q.solve(c); } catch (e) { r = null; }
                if (r) r.module = q.id;
                return r;
            }
            if (THEORY.test(text) && !CALC.test(text) && c.F.length < 2) return null;
            if (/\b(formula|definition|meaning|rules?)\b/i.test(text) && !c.F.some(f => f.kind === "money" || f.kind === "qty")) return null;
            let firstMiss = null;
            for (const m of MODS) {
                let ok = false;
                try { ok = m.test(c); } catch (e) { ok = false; }
                if (!ok) continue;
                let r = null;
                try { r = m.solve(c); } catch (e) { r = null; }
                if (!r) continue;
                r.module = m.id;
                if (r.missing) { if (!firstMiss) firstMiss = r; continue; }
                return r;
            }
            if (firstMiss && (CALC.test(text) || c.F.length >= 2)) return firstMiss;
            return null;
        }

        function matchOption(r, options) {
            if (!r || r.missing || !options) return null;
            for (const o of options) {
                const vals = extract(o.text).facts.map(f => f.value);
                if (vals.some(v => r.nums.some(n => close(v, n) || close(v, Math.abs(n))))) return o;
            }
            return null;
        }

        /* returns [{label, result, options, option}] */
        function analyse(text) {
            const out = [];
            splitTop(text).forEach(item => {
                const sp = splitParts(item.text);
                const carry = {};
                const run = (label, body) => {
                    const o = splitOptions(body);
                    const r = solveOne(o.stem, carry);
                    if (r && r.values) Object.assign(carry, r.values);
                    out.push({ label, result: r, options: o.options, option: matchOption(r, o.options) });
                };
                if (sp) sp.parts.forEach(p => run((item.label ? item.label + " " : "") + p.label, sp.stem + "\n" + p.text));
                else run(item.label, item.text);
            });
            return out;
        }

        function answerHtml(question) {
            const text = String(question || "");
            if (text.trim().length < 8) return null;
            const opts = { answersOnly: /answers? only|only the answers|just the answers/i.test(text) };
            const out = analyse(text);
            if (!out.some(o => o.result)) return null;
            let html = "";
            out.forEach(o => {
                if (out.length > 1) html += `<h2>${esc(o.label ? "Question " + o.label : "Question")}</h2>`;
                if (o.result) {
                    html += render(o.result, opts);
                    if (o.options && !o.result.missing) {
                        html += o.option
                            ? `<p><strong>Option ${esc(o.option.letter)} matches the calculated answer.</strong></p>`
                            : `<p><strong>None of the options matches my calculated answer.</strong> Check the options and the question figures.</p>`;
                    }
                } else {
                    html += `<p><em>The accounting engine could not solve this part. Send it as a separate question with its figures.</em></p>`;
                }
            });
            return html + `<p><em>Worked out by the built-in accounting engine (no internet needed). Check any assumptions shown above.</em></p>`;
        }

        return {
            CONFIG, analyse, answerHtml, extract, makeCtx,
            solve: text => analyse(text),
            modules: () => MODS.map(m => ({ id: m.id, name: m.name, status: m.status }))
        };
    })();

    /* ---- hook into the existing app (runs first, falls back to everything else) ---- */
    if (typeof generateAnswer === "function") {
        const mcAccountingPrevious = generateAnswer;
        generateAnswer = function (question) {
            try {
                const html = mcAcct.answerHtml(question);
                if (html) return html;
            } catch (e) { /* fall through to the existing engine */ }
            return mcAccountingPrevious(question);
        };
    }
    if (typeof window !== "undefined") window.MC_ACCOUNTING = mcAcct;
    if (typeof module !== "undefined" && module.exports) module.exports = mcAcct;

    /* =========================================================
       END OF ACCOUNTING CALCULATION ENGINE
    ========================================================= */


    /* =========================================================
       MASTERCOMMERCE ECONOMICS ENGINE v2 (offline JavaScript)

       Solves: equilibrium (any linear form), shortage/surplus, taxes,
       subsidies, shifts, consumer/producer surplus, PED/PES/YED/XED,
       GDP (expenditure/income/real/nominal/growth/per capita/GNI),
       multipliers + Keynesian equilibrium income, inflation/CPI/real
       wage/real interest, labour-market rates, cost/revenue tables,
       profit maximisation (MR = MC), comparative advantage, exchange
       rates, terms of trade, trade balance, tariffs, budget/debt,
       money multiplier, utility, Gini, poverty, tax rates, % change.
       Anything it cannot solve is passed to the rest of the app.
    ========================================================= */
    const MC_ECONOMICS_ENGINE = (function () {
        "use strict";

        /* ---------- formatting ---------- */
        const esc = v => String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        function f(n, dp) {
            if (typeof n !== "number" || !isFinite(n)) return "undefined";
            dp = dp === undefined ? 2 : dp;
            let s = Math.abs(n).toFixed(dp);
            if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
            const p = s.split(".");
            p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            const out = p.join(".");
            return (n < 0 && /[1-9]/.test(out) ? "−" : "") + out;
        }
        const P = (n, dp) => f(n, dp === undefined ? 2 : dp) + "%";

        /* ---------- text preparation ---------- */
        const SCALES = { trillion: 1e12, billion: 1e9, bn: 1e9, million: 1e6, mn: 1e6, thousand: 1e3 };
        const SCALE_NAME = { 1e12: "trillion", 1e9: "billion", 1e6: "million", 1e3: "thousand" };

        function prep(raw) {
            const src = String(raw || "");
            let t = src.toLowerCase().replace(/[−–—]/g, "-").replace(/×/g, "*").replace(/÷/g, "/")
                .replace(/²/g, "^2").replace(/³/g, "^3").replace(/[’`]/g, "'").replace(/\u00a0/g, " ");
            const lt0 = t;
            t = t.replace(/\$\s?/g, "usd ").replace(/€\s?/g, "eur ").replace(/£\s?/g, "gbp ");
            const usd = /usd|dollar|\$/i.test(src) && !/\br\s?\d|\brand|zar/i.test(src);
            t = t.replace(/\b(?:zar|rands?)\s*(?=\d)/g, "").replace(/\br\s?(?=\d)/g, "");
            const lt = t;
            t = t.replace(/(^|[^\d.,])(\d{1,3}(?:[ ,]\d{3})+)(?!\d)/g, (m, a, b) => a + b.replace(/[ ,]/g, ""));
            t = t.replace(/\bper\s?cent\b|\bpercent\b/g, "%").replace(/(\d)\s+%/g, "$1%");
            const used = new Set();
            t = t.replace(/(\d+(?:\.\d+)?)\s*(trillion|billion|million|thousand|bn|mn)\b/g, (m, n, u) => {
                used.add(SCALES[u]);
                return String(Math.round(parseFloat(n) * SCALES[u] * 1e4) / 1e4);
            });
            const scale = used.size === 1 ? Array.from(used)[0] : 1;
            const c = {
                raw: src, t, lt, scale, unitName: SCALE_NAME[scale] || "", cur: usd ? "$" : "R",
                intent: /calculat|comput|work out|determin|find|how (much|many)|what (is|are|will|would|was)|solve|derive|estimate|show/.test(t)
            };
            c.sc = n => (scale > 1 && Math.abs(n) >= scale) ? f(n / scale) + " " + c.unitName : f(n);
            c.num = n => (n < 0 ? "−" : "") + c.sc(Math.abs(n));
            c.money = n => (n < 0 ? "−" : "") + c.cur + c.sc(Math.abs(n));
            return c;
        }

        /* ---------- value finders ---------- */
        const FILL = "(?:\\s+(?:is|are|was|were|of|equals?|at|totals?|amounts?\\s+to|stands\\s+at|=|:))*\\s*[=:]?\\s*";
        const nameRe = names => names.map(n => /^[a-z]$/.test(n) ? n + "(?=\\s*[=:])" : n).join("|");
        function val(t, names) {
            const m = new RegExp("\\b(?:" + nameRe(names) + ")\\b" + FILL + "(-?\\d+(?:\\.\\d+)?)").exec(t);
            return m ? parseFloat(m[1]) : null;
        }
        function valB(t, names) {
            const m = new RegExp("(\\d+(?:\\.\\d+)?)\\s*(?:people|persons|workers|individuals|adults)?\\s*(?:are|were|is|was)?\\s*(?:" + nameRe(names) + ")\\b").exec(t);
            return m ? parseFloat(m[1]) : null;
        }
        function vals(t, names) {
            const re = new RegExp("\\b(?:" + nameRe(names) + ")\\b" + FILL + "(-?\\d+(?:\\.\\d+)?)", "g"), out = []; let m;
            while ((m = re.exec(t))) out.push(parseFloat(m[1]));
            return out;
        }
        function frac(t, names) {
            const m = new RegExp("\\b(?:" + nameRe(names) + ")\\b" + FILL + "(-?\\d+(?:\\.\\d+)?)(%?)").exec(t);
            if (!m) return null;
            let v = parseFloat(m[1]);
            return (m[2] || v > 1) ? v / 100 : v;
        }
        function pctVal(t, names) {
            const m = new RegExp("\\b(?:" + nameRe(names) + ")\\b" + FILL + "(-?\\d+(?:\\.\\d+)?)\\s*%").exec(t);
            return m ? parseFloat(m[1]) : null;
        }
        function plainNums(t) {
            const out = [], re = /(\d+(?:\.\d+)?)(%?)/g; let m;
            while ((m = re.exec(t))) {
                const v = parseFloat(m[1]);
                if (m[2]) continue;
                if (Number.isInteger(v) && v >= 1900 && v <= 2100) continue;
                out.push(v);
            }
            return out;
        }
        function listOf(lt, names) {
            const re = new RegExp("(?:" + names + ")\\b[^0-9\\n=:\\-]{0,25}[=:]?\\s*((?:-?\\d+(?:\\.\\d+)?(?:\\s*[,;/]\\s*|\\s+))+-?\\d+(?:\\.\\d+)?)", "i");
            const m = re.exec(lt);
            if (!m) return null;
            const a = m[1].split(/\s*[,;/]\s*|\s+/).map(parseFloat).filter(x => isFinite(x));
            return a.length >= 3 ? a : null;
        }

        /* ---------- polynomial helpers (variable q or p) ---------- */
        function parsePoly(expr, v) {
            if (expr == null) return null;
            let e = String(expr).toLowerCase().replace(/[−–]/g, "-").replace(/×/g, "*").replace(/\s+/g, "").replace(/\.+$/, "")
                .replace(/²/g, "^2").replace(/³/g, "^3").replace(/\^/g, "**").replace(/\br(?=\d)/g, "");
            if (!e || !new RegExp("^[0-9.+\\-*/()" + v + "]+$").test(e)) return null;
            e = e.replace(new RegExp("([0-9)])(?=[(" + v + "])", "g"), "$1*");
            let fn;
            try { fn = new Function(v, '"use strict";return (' + e + ");"); } catch (er) { return null; }
            const g = x => { try { const y = fn(x); return typeof y === "number" && isFinite(y) ? y : NaN; } catch (er) { return NaN; } };
            const f0 = g(0), f1 = g(1), f2 = g(2), f3 = g(3), f4 = g(4);
            if ([f0, f1, f2, f3, f4].some(isNaN)) return null;
            const d2 = f2 - 2 * f1 + f0, d3 = f3 - 3 * f2 + 3 * f1 - f0;
            const c3 = d3 / 6, c2 = (d2 - 6 * c3) / 2, c1 = (f1 - f0) - c2 - c3;
            const c = [f0, c1, c2, c3];
            const pred = f0 + c1 * 4 + c2 * 16 + c3 * 64;
            if (Math.abs(pred - f4) > 1e-6 * Math.max(1, Math.abs(f4))) return null;
            return trimP(c.map(x => Math.abs(x) < 1e-9 ? 0 : x));
        }
        function trimP(c) { c = c.slice(); while (c.length > 1 && Math.abs(c[c.length - 1]) < 1e-9) c.pop(); return c; }
        function padd(a, b, s) { s = s === undefined ? 1 : s; const n = Math.max(a.length, b.length), o = []; for (let i = 0; i < n; i++) o.push((a[i] || 0) + s * (b[i] || 0)); return trimP(o); }
        const pmulq = a => [0].concat(a);
        const pder = a => a.length <= 1 ? [0] : a.slice(1).map((c, i) => c * (i + 1));
        const pev = (a, x) => a.reduceRight((s, c) => s * x + c, 0);
        function pstr(a, v) {
            a = trimP(a); const parts = [];
            for (let i = a.length - 1; i >= 0; i--) {
                const c = a[i]; if (Math.abs(c) < 1e-9) continue;
                const mag = Math.abs(c);
                const term = (i === 0 || Math.abs(mag - 1) > 1e-9 ? f(mag, 4) : "") + (i > 0 ? v + (i > 1 ? ["", "", "²", "³"][i] : "") : "");
                parts.push((parts.length ? (c < 0 ? " − " : " + ") : (c < 0 ? "−" : "")) + term);
            }
            return parts.length ? parts.join("") : "0";
        }
        function proots(a) {
            const D = trimP(a), deg = D.length - 1;
            if (deg < 1) return [];
            if (deg === 1) return [-D[0] / D[1]];
            if (deg === 2) {
                const disc = D[1] * D[1] - 4 * D[2] * D[0];
                if (disc < 0) return [];
                const s = Math.sqrt(disc);
                return [(-D[1] + s) / (2 * D[2]), (-D[1] - s) / (2 * D[2])];
            }
            return null;
        }
        const STOP = "(?=[;\\n,]|\\.(?:\\s|$)|\\s+(?:and|while|whereas|where|if|find|calculate|determine|what|supply|demand|when|then|but|at|for|given|assume)\\b|$)";
        function eqPoly(t, names, v) {
            const m = new RegExp("\\b(?:" + names + ")\\s*(?:\\(\\s*[a-z]\\s*\\))?\\s*=\\s*([^;\\n,]+?)" + STOP).exec(t);
            return m ? parsePoly(m[1], v) : null;
        }

        /* ---------- results ---------- */
        const R = title => ({ title, given: [], steps: [], answers: [], notes: [], html: "" });
        const Miss = (title, list) => ({ title, missing: list });
        const lin = (a, b) => f(a) + " " + (b < 0 ? "−" : "+") + " " + f(Math.abs(b)) + "P";
        function render(r) {
            const head = s => `<p style="margin:12px 0 2px;"><strong>${esc(s)}</strong></p>`;
            const box = a => a.map(x => `<div class="formula">${esc(x)}</div>`).join("");
            let h = `<h2>${esc(r.title)}</h2>`;
            if (r.missing) return h + `<p><strong>More information needed:</strong></p><ul>` + r.missing.map(m => `<li>${esc(m)}</li>`).join("") + `</ul><p>I have not guessed these values.</p>`;
            if (r.given.length) h += head("Given") + "<ul>" + r.given.map(x => `<li>${esc(x)}</li>`).join("") + "</ul>";
            if (r.steps.length) h += head("Working") + box(r.steps);
            if (r.html) h += r.html;
            if (r.answers.length) h += head("Final answer") + r.answers.map(a => `<p style="font-weight:700;margin:6px 0;padding:6px 10px;border-left:3px solid currentColor;">${esc(a)}</p>`).join("");
            if (r.notes.length) h += `<p><em>${r.notes.map(esc).join(" ")}</em></p>`;
            return h;
        }
        function table(headers, rows, hi) {
            let h = `<div style="overflow-x:auto;"><table style="border-collapse:collapse;width:100%;font-size:0.9em;"><tr>` +
                headers.map(x => `<th style="text-align:right;padding:4px 6px;border-bottom:1px solid currentColor;">${esc(x)}</th>`).join("") + `</tr>`;
            rows.forEach((row, i) => {
                h += `<tr${hi === i ? ' style="font-weight:700;"' : ""}>` + row.map(x => `<td style="text-align:right;padding:4px 6px;border-bottom:1px solid rgba(128,128,128,.3);">${esc(x)}</td>`).join("") + `</tr>`;
            });
            return h + `</table></div>`;
        }

        /* =========================================================
           MODULE: MARKET (equilibrium, shortage/surplus, tax, shifts, surplus)
        ========================================================= */
        function findCurves(t) {
            const cv = { d: null, s: null };
            const re = new RegExp("\\b(qd|qs|pd|ps|q\\s*d|q\\s*s|p\\s*d|p\\s*s|q|p)\\s*(?:\\(\\s*[pq]\\s*\\))?\\s*=\\s*([^;\\n,]+?)" + STOP, "g");
            let m;
            while ((m = re.exec(t))) {
                const lhs = m[1].replace(/\s/g, ""), expr = m[2].replace(/[.\s]+$/, "");
                let side = null;
                if (lhs === "qd" || lhs === "pd") side = "d";
                else if (lhs === "qs" || lhs === "ps") side = "s";
                else {
                    const before = t.slice(Math.max(0, m.index - 35), m.index);
                    const di = before.lastIndexOf("demand"), si = before.lastIndexOf("suppl");
                    if (di < 0 && si < 0) continue;
                    side = di > si ? "d" : "s";
                }
                let a, b;
                if (lhs.charAt(0) === "q") {
                    const p = parsePoly(expr, "p"); if (!p || p.length > 2) continue;
                    a = p[0]; b = p[1] || 0;
                } else {
                    const p = parsePoly(expr, "q"); if (!p || p.length > 2 || !p[1]) continue;
                    a = -p[0] / p[1]; b = 1 / p[1];
                }
                if (!cv[side]) cv[side] = { a, b };
            }
            return cv;
        }

        function marketModule(c) {
            const t = c.t;
            const cv = findCurves(t);
            if (!cv.d && !cv.s) return null;
            const r = R("Market equilibrium (demand and supply)");
            const D = cv.d, S = cv.s;
            if (!D || !S) {
                const one = D || S, nm = D ? "Qd" : "Qs";
                const pm = val(t, ["price", "p"]);
                if (pm == null) return c.intent ? Miss("Market equilibrium", ["both the demand and the supply equation"]) : null;
                const q = one.a + one.b * pm;
                r.given.push(nm + " = " + lin(one.a, one.b), "P = " + f(pm));
                r.steps.push(`${nm} = ${f(one.a)} ${one.b < 0 ? "−" : "+"} ${f(Math.abs(one.b))}(${f(pm)}) = ${f(q)}`);
                r.answers.push(nm + " = " + f(q));
                return r;
            }
            let shiftTxt = "";
            const sh = /\b(demand|supply)\b\s+(?:(?:then|now|later|also)\s+)?(?:increases?|rises?|decreases?|falls?|shifts?\s+(?:to the )?(?:right|left))\s*(?:by)?\s*(\d+(?:\.\d+)?)/.exec(t);
            const D0 = { a: D.a, b: D.b }, S0 = { a: S.a, b: S.b };
            r.given.push("Demand: Qd = " + lin(D.a, D.b), "Supply: Qs = " + lin(S.a, S.b));
            const den = D.b - S.b;
            if (Math.abs(den) < 1e-12) return Miss("Market equilibrium", ["demand and supply curves that are not parallel"]);
            const eq = (d, s) => { const p = (s.a - d.a) / (d.b - s.b); return { P: p, Q: d.a + d.b * p }; };
            const E = eq(D, S);
            r.steps.push("Step 1: At equilibrium Qd = Qs", `${lin(D.a, D.b)} = ${lin(S.a, S.b)}`,
                "Step 2: Solve for P", `P = (${f(S.a)} − ${f(D.a)}) ÷ (${f(D.b)} − ${f(S.b)}) = ${f(E.P)}`,
                "Step 3: Substitute P into Qd", `Q = ${f(D.a)} ${D.b < 0 ? "−" : "+"} ${f(Math.abs(D.b))}(${f(E.P)}) = ${f(E.Q)}`);
            r.answers.push("Equilibrium price = " + f(E.P), "Equilibrium quantity = " + f(E.Q));
            if (E.P <= 0 || E.Q <= 0) r.notes.push("The equilibrium price or quantity is not positive, so check the equations.");

            /* fixed price: shortage / surplus */
            let fp = null, m;
            const pre = /(?:fixed|set|controlled|regulated|ceiling|floor|minimum price|maximum price|a price of|price is|price =|price at|at a price)\s*(?:at|of|to|is|=)?\s*(\d+(?:\.\d+)?)/g;
            while ((m = pre.exec(t))) { if (!/equilibrium\s*$/.test(t.slice(Math.max(0, m.index - 14), m.index))) { fp = parseFloat(m[1]); break; } }
            if (fp != null && Math.abs(fp - E.P) > 1e-9) {
                const qd = D.a + D.b * fp, qs = S.a + S.b * fp;
                r.steps.push(`Step 4: At P = ${f(fp)}: Qd = ${f(qd)}, Qs = ${f(qs)}`);
                const kind = qd > qs ? "Shortage" : "Surplus";
                r.answers.push(`At P = ${f(fp)}: ${kind} = ${f(Math.abs(qd - qs))} units (Qd = ${f(qd)}, Qs = ${f(qs)})`);
                r.notes.push(fp < E.P ? "The price is below equilibrium, so it acts as a binding price ceiling (maximum price)." : "The price is above equilibrium, so it acts as a binding price floor (minimum price).");
                r.notes.push("Quantity actually traded = the smaller of Qd and Qs = " + f(Math.min(qd, qs)) + ".");
            }

            /* tax or subsidy per unit */
            const tx = /\b(tax|subsid\w*)\b[^0-9.%]{0,25}(\d+(?:\.\d+)?)(?!\d|\.\d|%)/.exec(t);
            if (tx) {
                const sub = /subsid/.test(tx[1]), amt = parseFloat(tx[2]), tt = sub ? -amt : amt;
                const Pn = (S.a - S.b * tt - D.a) / (D.b - S.b), Qn = D.a + D.b * Pn;
                const recv = Pn - tt, cb = Pn - E.P, pb = E.P - recv;
                r.steps.push(`Step 4: ${sub ? "Subsidy" : "Tax"} of ${f(amt)} per unit: producers receive P − (${f(tt)}), so Qs = ${f(S.a)} + ${f(S.b)}(P − ${f(tt)})`,
                    `New P = ${f(Pn)}, new Q = ${f(Qn)}`);
                r.answers.push(`New market price = ${f(Pn)}; new quantity = ${f(Qn)}`, `Price producers actually receive = ${f(recv)}`);
                r.answers.push(sub ? `Subsidy cost to government = ${f(amt * Qn)}` : `Tax revenue = ${f(amt)} × ${f(Qn)} = ${f(amt * Qn)}`);
                r.answers.push(`${sub ? "Benefit" : "Burden"} to consumers = ${f(Math.abs(cb))} per unit; ${sub ? "benefit" : "burden"} to producers = ${f(Math.abs(pb))} per unit`);
            }

            /* shift of demand or supply */
            if (sh) {
                const dec = /decreas|fall|left/.test(sh[0]), amt = parseFloat(sh[2]) * (dec ? -1 : 1);
                const D1 = { a: D0.a, b: D0.b }, S1 = { a: S0.a, b: S0.b };
                if (sh[1] === "demand") D1.a += amt; else S1.a += amt;
                const E1 = eq(D1, S1);
                r.steps.push(`Step 4: ${sh[1]} ${dec ? "decreases" : "increases"} by ${f(Math.abs(amt))} units at every price`, `${sh[1] === "demand" ? "Qd" : "Qs"} = ${lin(sh[1] === "demand" ? D1.a : S1.a, sh[1] === "demand" ? D1.b : S1.b)}`);
                r.answers.push(`New equilibrium price = ${f(E1.P)} (was ${f(E.P)}); new quantity = ${f(E1.Q)} (was ${f(E.Q)})`);
            }

            /* consumer and producer surplus */
            if (/surplus|welfare/.test(t) && /consumer|producer|total|welfare/.test(t)) {
                const cs = (E.Q * E.Q / 2 - D.a * E.Q) / D.b - E.P * E.Q;
                const ps = E.P * E.Q - (E.Q * E.Q / 2 - S.a * E.Q) / S.b;
                r.steps.push("Consumer surplus = area under the demand curve − P × Q; producer surplus = P × Q − area under the supply curve");
                r.answers.push(`Consumer surplus = ${f(cs)}`, `Producer surplus = ${f(ps)}`, `Total surplus = ${f(cs + ps)}`);
                r.notes.push("Calculated as the areas between the curves and the equilibrium price (integration of the linear curves).");
            }
            return r;
        }

        /* =========================================================
           MODULE: ELASTICITY
        ========================================================= */
        const VARS = "(price|wage|quantity(?: demanded| supplied)?|qty|qd|qs|demand|supply|income|output|sales|consumption)";
        const DIR = "(rises?|rose|increases?|increased|grows?|grew|goes up|up|climbs?|falls?|fell|decreases?|decreased|drops?|dropped|declines?|declined|reduces?|reduced|goes down|down|cut)";
        const varKey = s => /price|wage/.test(s) ? "price" : /income/.test(s) ? "income" : "qty";
        const isDown = s => /fall|fell|decreas|drop|declin|reduc|down|cut/.test(s);
        function changes(t) {
            const ev = {}; let m;
            const re1 = new RegExp("\\b" + VARS + "\\b[^.;\\d%]{0,45}?\\bfrom\\s*(-?\\d+(?:\\.\\d+)?)\\s*(?:to|->|→|until)\\s*(-?\\d+(?:\\.\\d+)?)", "g");
            while ((m = re1.exec(t))) { const k = varKey(m[1]); if (!ev[k]) ev[k] = { from: +m[2], to: +m[3] }; }
            const re2 = new RegExp("\\b" + VARS + "\\b[^.;\\d%]{0,45}?\\b" + DIR + "\\b\\s*(?:by|of)?\\s*(\\d+(?:\\.\\d+)?)\\s*%", "g");
            while ((m = re2.exec(t))) { const k = varKey(m[1]); if (!ev[k]) ev[k] = { pct: (isDown(m[2]) ? -1 : 1) * parseFloat(m[3]) }; }
            const re3 = new RegExp("(\\d+(?:\\.\\d+)?)\\s*%\\s*(increase|rise|fall|decrease|drop|reduction|decline|growth|change)\\s+in\\s+(?:(?:the|its|own|consumer|average)\\s+)*" + VARS + "\\b", "g");
            while ((m = re3.exec(t))) { const k = varKey(m[3]); if (!ev[k]) ev[k] = { pct: (isDown(m[2]) ? -1 : 1) * parseFloat(m[1]) }; }
            return ev;
        }
        function elasticityModule(c) {
            const t = c.t;
            const ev = changes(t);
            let kind;
            const hasIncome = !!ev.income;
            if (hasIncome || /income elasticity|\byed\b/.test(t)) kind = "yed";
            else if (/cross|\bxed\b|substitute|complement/.test(t)) kind = "xed";
            else if (/supply|supplied|\bpes\b/.test(t) && !/demand/.test(t.replace(/supply and demand|demand and supply/, ""))) kind = "pes";
            else kind = "ped";
            const NAMES = { ped: "Price elasticity of demand (PED)", pes: "Price elasticity of supply (PES)", yed: "Income elasticity of demand (YED)", xed: "Cross elasticity of demand (XED)" };
            const xk = kind === "yed" ? "income" : "price";
            const r = R(NAMES[kind]);
            const given = t.match(/\b(ped|pes|yed|xed|elasticity(?: of (?:demand|supply))?(?: coefficient)?)\b\s*(?:is|=|of|:)?\s*(-?\d+(?:\.\d+)?)/);
            const pc = e => e.pct != null ? e.pct : (e.to - e.from) / e.from * 100;
            const mid = e => e.pct != null ? null : (e.to - e.from) / ((e.to + e.from) / 2) * 100;

            /* coefficient given + one change: find the other change */
            if (given && (ev.qty || ev[xk]) && !(ev.qty && ev[xk])) {
                const e = parseFloat(given[2]);
                r.given.push(`Elasticity coefficient = ${f(e, 4)}`);
                r.steps.push("Elasticity = %Δ quantity ÷ %Δ " + (kind === "yed" ? "income" : "price"));
                if (ev.qty) {
                    const q = pc(ev.qty), x = q / e;
                    r.steps.push(`%Δ ${xk} = ${P(q, 4)} ÷ ${f(e, 4)} = ${P(x, 4)}`);
                    r.answers.push(`%Δ ${xk} = ${P(x, 4)}`);
                } else {
                    const x = pc(ev[xk]), q = e * x;
                    r.steps.push(`%Δ quantity = ${f(e, 4)} × ${P(x, 4)} = ${P(q, 4)}`);
                    r.answers.push(`%Δ quantity = ${P(q, 4)}`);
                }
                return r;
            }
            if (!(ev.qty && ev[xk])) {
                if (given && !c.intent) return null;
                return /elasticit|\bped\b|\bpes\b|\byed\b|\bxed\b/.test(t) && c.intent && /\d/.test(t) ? Miss(NAMES[kind], ["the change (or % change) in quantity", "the change (or % change) in " + (kind === "yed" ? "income" : "price")]) : null;
            }
            const q = ev.qty, x = ev[xk];
            const useMid = /midpoint|mid-point|arc|average of/.test(t);
            let e, calc = [];
            if (q.from != null && x.from != null) {
                const pq = pc(q), px = pc(x), mq = mid(q), mx = mid(x);
                const ePoint = pq / px, eMid = mq / mx;
                r.given.push(`${xk === "price" ? "Price" : "Income"}: ${f(x.from)} → ${f(x.to)}`, `Quantity: ${f(q.from)} → ${f(q.to)}`);
                r.steps.push("Percentage method: %Δ = (new − old) ÷ old × 100", `%Δ quantity = (${f(q.to)} − ${f(q.from)}) ÷ ${f(q.from)} × 100 = ${P(pq, 4)}`,
                    `%Δ ${xk} = (${f(x.to)} − ${f(x.from)}) ÷ ${f(x.from)} × 100 = ${P(px, 4)}`, `E = ${P(pq, 4)} ÷ ${P(px, 4)} = ${f(ePoint, 4)}`,
                    `Midpoint method: E = ${f(eMid, 4)}`);
                e = useMid ? eMid : ePoint;
                r.notes.push(useMid ? `Using the midpoint method. The simple percentage method gives ${f(ePoint, 4)}.` : `Using the simple percentage method. The midpoint method gives ${f(eMid, 4)}.`);
                if (kind === "ped" && x.from != null) {
                    const tr1 = x.from * q.from, tr2 = x.to * q.to;
                    r.steps.push(`Total revenue: ${f(x.from)} × ${f(q.from)} = ${f(tr1)} → ${f(x.to)} × ${f(q.to)} = ${f(tr2)}`);
                    r.notes.push(`Total revenue ${tr2 > tr1 ? "rises" : tr2 < tr1 ? "falls" : "is unchanged"} by ${f(Math.abs(tr2 - tr1))}.`);
                }
            } else {
                const pq = pc(q), px = pc(x);
                if (px === 0) return Miss(NAMES[kind], ["a non-zero change in " + xk]);
                e = pq / px;
                r.given.push(`%Δ quantity = ${P(pq, 4)}`, `%Δ ${xk} = ${P(px, 4)}`);
                r.steps.push(`E = %Δ quantity ÷ %Δ ${xk} = ${P(pq, 4)} ÷ ${P(px, 4)} = ${f(e, 4)}`);
            }
            r.answers.push(`${kind.toUpperCase()} = ${f(e, 4)}`);
            const a = Math.abs(e);
            if (kind === "ped") {
                const cl = a === 0 ? "perfectly inelastic" : a < 1 ? "inelastic (|PED| < 1)" : Math.abs(a - 1) < 1e-9 ? "unit elastic (|PED| = 1)" : "elastic (|PED| > 1)";
                r.answers.push("Demand is " + cl);
                if (e > 0) r.notes.push("A positive PED is unusual (a Giffen or Veblen-type good, or a data error).");
                r.notes.push("If demand is elastic, a price increase lowers total revenue; if inelastic, a price increase raises it.");
            } else if (kind === "pes") {
                r.answers.push("Supply is " + (a < 1 ? "inelastic (PES < 1)" : Math.abs(a - 1) < 1e-9 ? "unit elastic" : "elastic (PES > 1)"));
            } else if (kind === "yed") {
                r.answers.push(e < 0 ? "Inferior good (negative YED)" : e < 1 ? "Normal good, a necessity (0 < YED < 1)" : "Normal good, a luxury (YED > 1)");
            } else {
                r.answers.push(e > 0 ? "The goods are substitutes (positive XED)" : e < 0 ? "The goods are complements (negative XED)" : "The goods are unrelated (XED = 0)");
            }
            return r;
        }

        /* =========================================================
           MODULE: GDP, NATIONAL INCOME
        ========================================================= */
        function gdpModule(c) {
            const t = c.t;
            const NA = {
                C: ["consumption", "consumer spending", "household consumption", "household spending", "personal consumption", "private consumption", "c"],
                I: ["investment", "gross investment", "gross fixed capital formation", "capital formation", "private investment", "i"],
                G: ["government spending", "government expenditure", "government consumption", "public spending", "g"],
                X: ["exports", "export", "x"], M: ["imports", "import", "m"], NX: ["net exports"]
            };
            const gdpV = val(t, ["gdp", "gross domestic product", "national income", "national output"]);
            const r = R("National income and GDP");

            /* real / nominal / deflator */
            if (/deflator|real gdp|nominal gdp|real and nominal|constant prices/.test(t)) {
                const nom = val(t, ["nominal gdp", "nominal"]), real = val(t, ["real gdp", "real"]), def = val(t, ["gdp deflator", "deflator", "price index"]);
                if (nom != null && def != null) {
                    const rv = nom / def * 100;
                    r.given.push("Nominal GDP = " + c.money(nom), "GDP deflator = " + f(def));
                    r.steps.push("Real GDP = Nominal GDP ÷ Deflator × 100", `= ${c.money(nom)} ÷ ${f(def)} × 100 = ${c.money(rv)}`);
                    r.answers.push("Real GDP = " + c.money(rv)); return r;
                }
                if (real != null && def != null) {
                    const nv = real * def / 100;
                    r.given.push("Real GDP = " + c.money(real), "GDP deflator = " + f(def));
                    r.steps.push("Nominal GDP = Real GDP × Deflator ÷ 100", `= ${c.money(real)} × ${f(def)} ÷ 100 = ${c.money(nv)}`);
                    r.answers.push("Nominal GDP = " + c.money(nv)); return r;
                }
                if (nom != null && real != null && real !== 0) {
                    const d = nom / real * 100;
                    r.given.push("Nominal GDP = " + c.money(nom), "Real GDP = " + c.money(real));
                    r.steps.push("GDP deflator = Nominal GDP ÷ Real GDP × 100", `= ${c.money(nom)} ÷ ${c.money(real)} × 100 = ${f(d, 4)}`);
                    r.answers.push("GDP deflator = " + f(d, 2));
                    r.notes.push("A deflator above 100 means prices are higher than in the base year."); return r;
                }
            }

            /* per capita */
            if (/per capita|per person/.test(t)) {
                const pop = val(t, ["population", "people", "inhabitants", "citizens"]);
                if (gdpV != null && pop) {
                    r.given.push("GDP = " + c.money(gdpV), "Population = " + c.num(pop));
                    r.steps.push("GDP per capita = GDP ÷ Population", `= ${c.money(gdpV)} ÷ ${c.num(pop)} = ${c.cur}${f(gdpV / pop)}`);
                    r.answers.push("GDP per capita = " + c.cur + f(gdpV / pop)); return r;
                }
            }

            /* growth rate */
            if (/growth/.test(t)) {
                let a = null, b = null, m = /(?:gdp|output|national income|economy)[^.;\d]{0,40}?from\s*(\d+(?:\.\d+)?)\s*(?:to|->)\s*(\d+(?:\.\d+)?)/.exec(t);
                if (m) { a = +m[1]; b = +m[2]; }
                else {
                    a = val(t, ["last year", "previous year", "prior year", "base year", "year 1", "last year's gdp", "previous gdp", "old gdp"]);
                    b = val(t, ["this year", "current year", "year 2", "latest year", "current gdp", "new gdp"]);
                }
                if (a != null && b != null && a !== 0) {
                    const g = (b - a) / a * 100;
                    r.given.push("Previous GDP = " + c.money(a), "New GDP = " + c.money(b));
                    r.steps.push("Growth rate = (New − Old) ÷ Old × 100", `= (${c.money(b)} − ${c.money(a)}) ÷ ${c.money(a)} × 100 = ${P(g, 4)}`);
                    r.answers.push("Economic growth rate = " + P(g)); return r;
                }
            }

            /* GNI, NNI */
            if (/\bgni\b|\bgnp\b|net primary|net factor|from abroad|paid abroad|\bnni\b/.test(t)) {
                let nfi = val(t, ["net primary income", "net factor income", "net income from abroad", "net income received from abroad"]);
                const rec = val(t, ["income received from abroad", "primary income received", "factor income received", "income from abroad", "income earned abroad"]);
                const paid = val(t, ["income paid abroad", "income paid to foreigners", "primary income paid", "factor income paid", "income to foreigners"]);
                if (nfi == null && rec != null && paid != null) nfi = rec - paid;
                const dep = val(t, ["depreciation", "consumption of fixed capital"]);
                if (gdpV != null && nfi != null) {
                    const gni = gdpV + nfi;
                    r.given.push("GDP = " + c.money(gdpV), "Net primary income from abroad = " + c.money(nfi));
                    r.steps.push("GNI = GDP + Net primary income from abroad", `= ${c.money(gdpV)} + ${c.money(nfi)} = ${c.money(gni)}`);
                    r.answers.push("GNI = " + c.money(gni));
                    if (dep != null) { r.steps.push("NNI = GNI − Depreciation", `= ${c.money(gni)} − ${c.money(dep)} = ${c.money(gni - dep)}`); r.answers.push("NNI = " + c.money(gni - dep)); }
                    return r;
                }
            }

            /* income approach */
            const W = val(t, ["compensation of employees", "wages and salaries", "wages", "salaries", "remuneration"]), Rn = val(t, ["rent"]), In = val(t, ["interest"]),
                Pf = val(t, ["profits?", "operating surplus", "gross operating surplus"]), Dp = val(t, ["depreciation", "consumption of fixed capital"]),
                IT = val(t, ["net indirect taxes", "indirect taxes", "indirect tax", "taxes on products", "taxes on production"]), Sb = val(t, ["subsidies", "subsidy"]);
            const inc = [W, Rn, In, Pf].filter(x => x != null);
            if (inc.length >= 3 && /income approach|factor|national income|wages|compensation/.test(t)) {
                const fs = inc.reduce((a, b) => a + b, 0);
                r.given.push(...[["Wages / compensation", W], ["Rent", Rn], ["Interest", In], ["Profit / operating surplus", Pf]].filter(x => x[1] != null).map(x => x[0] + " = " + c.money(x[1])));
                r.steps.push("Income approach: add all factor incomes", `Total factor income = ${c.money(fs)}`);
                r.answers.push("Net national income at factor cost = " + c.money(fs));
                let g = fs;
                if (Dp != null) { g += Dp; r.steps.push(`+ Depreciation ${c.money(Dp)} = ${c.money(g)} (gross domestic income at factor cost)`); r.answers.push("GDP at factor cost = " + c.money(g)); }
                if (IT != null) { g += IT - (Sb || 0); r.steps.push(`+ Indirect taxes ${c.money(IT)} − Subsidies ${c.money(Sb || 0)} = ${c.money(g)}`); r.answers.push("GDP at market prices = " + c.money(g)); }
                return r;
            }

            /* expenditure approach */
            const vC = val(t, NA.C), vI = val(t, NA.I), vG = val(t, NA.G);
            let vX = val(t, NA.X), vM = val(t, NA.M);
            const vNX = val(t, NA.NX);
            const nxKnown = vNX != null || (vX != null && vM != null);
            const nx = vNX != null ? vNX : (vX != null && vM != null ? vX - vM : null);
            if (vC != null && vI != null && vG != null && nxKnown) {
                const g = vC + vI + vG + nx;
                r.given.push("C = " + c.money(vC), "I = " + c.money(vI), "G = " + c.money(vG), vNX != null ? "Net exports = " + c.money(vNX) : `X = ${c.money(vX)}, M = ${c.money(vM)}`);
                r.steps.push("GDP = C + I + G + (X − M)", `= ${c.money(vC)} + ${c.money(vI)} + ${c.money(vG)} + ${c.money(nx)} = ${c.money(g)}`);
                r.answers.push("GDP = " + c.money(g));
                if (nx < 0) r.notes.push("Net exports are negative (a trade deficit), which reduces GDP in the formula.");
                return r;
            }
            /* GDP known, one component missing */
            if (gdpV != null && /gdp|gross domestic/.test(t)) {
                const comp = { C: vC, I: vI, G: vG, NX: nx };
                const missing = Object.keys(comp).filter(k => comp[k] == null);
                if (missing.length === 1) {
                    const k = missing[0], others = Object.keys(comp).filter(x => x !== k).reduce((s, x) => s + comp[x], 0), v = gdpV - others;
                    r.given.push("GDP = " + c.money(gdpV));
                    r.steps.push("GDP = C + I + G + (X − M), so rearrange for the missing item", `${k === "NX" ? "Net exports" : k} = ${c.money(gdpV)} − ${c.money(others)} = ${c.money(v)}`);
                    r.answers.push((k === "NX" ? "Net exports (X − M)" : k) + " = " + c.money(v)); return r;
                }
            }
            return null;
        }

        /* =========================================================
           MODULE: MULTIPLIER AND KEYNESIAN EQUILIBRIUM
        ========================================================= */
        function multiplierModule(c) {
            const t = c.t, r = R("Keynesian multiplier / equilibrium income");
            /* equilibrium income from equations */
            const cm = /\bc\s*=\s*(\d+(?:\.\d+)?)\s*\+\s*(\d*\.?\d+)\s*\*?\s*(\(\s*y\s*-\s*(?:t|\d+(?:\.\d+)?)\s*\)|yd|y)/.exec(t);
            if (cm) {
                const a = +cm[1], b = +cm[2], dispo = /\(|yd/.test(cm[3]);
                let T = 0;
                if (dispo) { const inline = /-\s*(\d+(?:\.\d+)?)\s*\)/.exec(cm[3]); T = inline ? +inline[1] : (val(t, ["lump sum tax", "taxes", "tax", "t"]) || 0); }
                const I = val(t, ["investment", "i"]) || 0, G = val(t, ["government spending", "government expenditure", "g"]) || 0, X = val(t, ["exports", "x"]) || 0;
                const mm = /\bm\s*=\s*(\d+(?:\.\d+)?)(?:\s*\+\s*(\d*\.?\d+)\s*\*?\s*y)?/.exec(t);
                const M0 = mm ? +mm[1] : (val(t, ["imports"]) || 0), m1 = mm && mm[2] ? +mm[2] : 0;
                const k = 1 / (1 - b + m1), Y = k * (a + I + G + X - M0 - b * T);
                const C = a + b * (Y - (dispo ? T : 0));
                r.given.push(`C = ${f(a)} + ${f(b)}${dispo ? "(Y − T)" : "Y"}`, `I = ${f(I)}, G = ${f(G)}, X = ${f(X)}, M = ${f(M0)}${m1 ? " + " + f(m1) + "Y" : ""}${dispo ? ", T = " + f(T) : ""}`);
                r.steps.push("Equilibrium: Y = C + I + G + X − M", `Y = ${f(a)} + ${f(b)}${dispo ? `(Y − ${f(T)})` : "Y"} + ${f(I)} + ${f(G)} + ${f(X)} − ${f(M0)}${m1 ? " − " + f(m1) + "Y" : ""}`,
                    `Y × (1 − ${f(b)}${m1 ? " + " + f(m1) : ""}) = ${f(a + I + G + X - M0 - b * T)}`, `Y = ${f(a + I + G + X - M0 - b * T)} ÷ ${f(1 - b + m1, 4)} = ${f(Y)}`, `Multiplier = 1 ÷ ${f(1 - b + m1, 4)} = ${f(k, 4)}`);
                r.answers.push("Equilibrium income Y = " + f(Y), "Consumption C = " + f(C), "Multiplier = " + f(k, 4));
                return r;
            }
            if (!/multiplier|\bmpc\b|\bmps\b|\bmpm\b|propensity/.test(t)) return null;
            let mpc = frac(t, ["mpc", "marginal propensity to consume"]), mps = frac(t, ["mps", "marginal propensity to save"]);
            const mpm = frac(t, ["mpm", "marginal propensity to import"]), tr = frac(t, ["tax rate", "marginal tax rate", "mpt"]);
            if (mpc == null && mps == null) {
                const dc = /consumption[^.;\d]{0,30}\bby\s*(\d+(?:\.\d+)?)/.exec(t), dy = /income[^.;\d]{0,30}\bby\s*(\d+(?:\.\d+)?)/.exec(t);
                if (dc && dy) { mpc = +dc[1] / +dy[1]; r.steps.push(`MPC = ΔC ÷ ΔY = ${dc[1]} ÷ ${dy[1]} = ${f(mpc, 4)}`); }
            }
            if (mpc == null && mps == null) return c.intent ? Miss("Multiplier", ["the MPC or MPS (or the change in consumption and income)"]) : null;
            if (mpc == null) mpc = 1 - mps;
            if (mps == null) mps = 1 - mpc;
            if (Math.abs(mpc + mps - 1) > 0.011 && frac(t, ["mpc", "marginal propensity to consume"]) != null && frac(t, ["mps", "marginal propensity to save"]) != null) return Miss("Multiplier", ["MPC and MPS that add up to 1"]);
            if (mpc >= 1 || mpc < 0) return Miss("Multiplier", ["an MPC between 0 and 1"]);
            const k = 1 / (1 - mpc * (1 - (tr || 0)) + (mpm || 0));
            r.given.push(`MPC = ${f(mpc, 4)}`, `MPS = ${f(mps, 4)}`);
            if (tr) r.given.push("Tax rate = " + f(tr, 4)); if (mpm) r.given.push("MPM = " + f(mpm, 4));
            if (tr || mpm) r.steps.push("Multiplier = 1 ÷ [1 − MPC(1 − t) + MPM]", `= 1 ÷ [1 − ${f(mpc, 4)}(1 − ${f(tr || 0, 4)}) + ${f(mpm || 0, 4)}] = ${f(k, 4)}`);
            else r.steps.push("Multiplier k = 1 ÷ (1 − MPC) = 1 ÷ MPS", `k = 1 ÷ ${f(mps, 4)} = ${f(k, 4)}`);
            r.answers.push("Multiplier = " + f(k, 4));
            const dm = /\b(investment|government spending|government expenditure|autonomous spending|autonomous expenditure|exports|injection|initial (?:injection|spending|increase)|spending)\b[^.;\d]{0,35}?(rises?|increases?|falls?|decreases?|by|of|changes?|is|cut)\s*(?:by|of)?\s*(\d+(?:\.\d+)?)/.exec(t);
            if (dm) {
                const d = (isDown(dm[0]) ? -1 : 1) * parseFloat(dm[3]), dY = k * d;
                r.steps.push(`Change in income = Multiplier × Change in spending = ${f(k, 4)} × ${f(d)} = ${f(dY)}`);
                r.answers.push("Change in national income = " + c.num(dY));
            }
            if (/tax multiplier|change in tax|tax(es)? (rise|increase|fall|decrease|cut)/.test(t)) {
                r.steps.push(`Tax multiplier = −MPC ÷ MPS = −${f(mpc, 4)} ÷ ${f(mps, 4)} = ${f(-mpc / mps, 4)}`);
                r.answers.push("Tax multiplier = " + f(-mpc / mps, 4));
            }
            return r;
        }

        /* =========================================================
           MODULE: PRICES (inflation, CPI, real values)
        ========================================================= */
        function pricesModule(c) {
            const t = c.t, r = R("Prices and inflation");
            if (!/inflation|\bcpi\b|price index|real wage|real income|real interest|fisher|purchasing power|deflat|cost of living|basket/.test(t)) return null;
            if (/real (interest|rate)|fisher/.test(t)) {
                const nom = pctVal(t, ["nominal (?:interest )?(?:rate)?", "interest rate", "repo rate", "lending rate", "nominal"]), inf = pctVal(t, ["inflation(?: rate)?", "expected inflation"]);
                if (nom != null && inf != null) {
                    const ap = nom - inf, ex = ((1 + nom / 100) / (1 + inf / 100) - 1) * 100;
                    r.given.push("Nominal rate = " + P(nom), "Inflation = " + P(inf));
                    r.steps.push("Real rate ≈ Nominal rate − Inflation rate", `= ${P(nom)} − ${P(inf)} = ${P(ap, 4)}`, "Exact (Fisher): (1 + i) ÷ (1 + π) − 1", `= ${f(1 + nom / 100, 4)} ÷ ${f(1 + inf / 100, 4)} − 1 = ${P(ex, 4)}`);
                    r.answers.push("Real interest rate ≈ " + P(ap) + " (exact: " + P(ex) + ")"); return r;
                }
            }
            if (/real (wage|income)/.test(t)) {
                const wm = /(?:wages?|salar\w+|income)[^.;\d%]{0,30}?(\d+(?:\.\d+)?)\s*%/.exec(t), im = /inflation[^.;\d%]{0,30}?(\d+(?:\.\d+)?)\s*%/.exec(t);
                if (wm && im) {
                    const w = (isDown(wm[0]) ? -1 : 1) * parseFloat(wm[1]), i = parseFloat(im[1]), real = ((1 + w / 100) / (1 + i / 100) - 1) * 100;
                    r.given.push("Nominal change = " + P(w), "Inflation = " + P(i));
                    r.steps.push("Real change = (1 + nominal) ÷ (1 + inflation) − 1", `= ${f(1 + w / 100, 4)} ÷ ${f(1 + i / 100, 4)} − 1 = ${P(real, 4)}`, `Approximation: ${P(w)} − ${P(i)} = ${P(w - i, 4)}`);
                    r.answers.push("Change in real " + (/income/.test(t) ? "income" : "wage") + " = " + P(real)); r.notes.push(real < 0 ? "Purchasing power has fallen." : "Purchasing power has risen."); return r;
                }
                const w = val(t, ["nominal wages?", "wages?", "salary", "income", "nominal income"]), cp = val(t, ["cpi", "price index"]);
                if (w != null && cp) {
                    r.given.push("Nominal wage = " + c.money(w), "CPI = " + f(cp));
                    r.steps.push("Real wage = Nominal wage ÷ CPI × 100", `= ${c.money(w)} ÷ ${f(cp)} × 100 = ${c.money(w / cp * 100)}`);
                    r.answers.push("Real wage = " + c.money(w / cp * 100)); return r;
                }
            }
            if (/basket/.test(t) && /\bcpi\b|price index/.test(t) && /base/.test(t)) {
                const base = val(t, ["base year", "base", "base year cost", "cost in the base year"]), cur = val(t, ["current year", "current", "this year", "current cost", "cost in the current year"]);
                if (base && cur != null) {
                    r.given.push("Cost of basket in base year = " + c.money(base), "Cost of basket in current year = " + c.money(cur));
                    r.steps.push("CPI = Cost of basket (current) ÷ Cost of basket (base) × 100", `= ${c.money(cur)} ÷ ${c.money(base)} × 100 = ${f(cur / base * 100, 4)}`);
                    r.answers.push("CPI = " + f(cur / base * 100, 2)); return r;
                }
            }
            if (/inflation|deflat|cpi|price index|cost of living/.test(t)) {
                let a = null, b = null, m = /(?:cpi|price index|prices?|basket|cost of living|index)[^.;\d]{0,45}?from\s*(\d+(?:\.\d+)?)\s*(?:to|->)\s*(\d+(?:\.\d+)?)/.exec(t);
                if (m) { a = +m[1]; b = +m[2]; }
                else { const n = plainNums(t); if (n.length === 2) { a = n[0]; b = n[1]; } }
                if (a && b != null) {
                    const inf = (b - a) / a * 100;
                    r.given.push("Previous CPI / price level = " + f(a), "New CPI / price level = " + f(b));
                    r.steps.push("Inflation rate = (New CPI − Old CPI) ÷ Old CPI × 100", `= (${f(b)} − ${f(a)}) ÷ ${f(a)} × 100 = ${P(inf, 4)}`);
                    r.answers.push("Inflation rate = " + P(inf));
                    r.notes.push(inf < 0 ? "A negative rate means deflation (a fall in the general price level)." : "Prices rose, so the purchasing power of money fell.");
                    return r;
                }
            }
            return null;
        }

        /* =========================================================
           MODULE: LABOUR MARKET
        ========================================================= */
        function labourModule(c) {
            const t = c.t;
            if (!/unemploy|labour force|labor force|participation|employed|economically active|working[- ]age/.test(t)) return null;
            let U = val(t, ["unemployed(?: people| persons| workers)?", "number of unemployed", "unemployment"]),
                E = val(t, ["employed(?: people| persons| workers)?", "number of employed", "employment"]),
                L = val(t, ["labour force", "labor force", "economically active population", "eap", "active population"]);
            if (U == null) U = valB(t, ["unemployed"]);
            if (E == null) E = valB(t, ["employed"]);
            if (L == null) L = valB(t, ["in the labour force", "in the labor force"]);
            const W = val(t, ["working[- ]age population", "population aged 15(?:-| to )64", "population of working age", "wap"]),
                D = val(t, ["discouraged(?: work[- ]seekers| workers| job seekers)?"]);
            const ur = pctVal(t, ["unemployment rate", "rate of unemployment"]);
            const r = R("Labour market: unemployment and participation");
            if (L == null && E != null && U != null) { L = E + U; r.steps.push(`Labour force = Employed + Unemployed = ${c.num(E)} + ${c.num(U)} = ${c.num(L)}`); }
            if (U == null && L != null && E != null) { U = L - E; r.steps.push(`Unemployed = Labour force − Employed = ${c.num(U)}`); }
            if (E == null && L != null && U != null) { E = L - U; r.steps.push(`Employed = Labour force − Unemployed = ${c.num(E)}`); }
            if (U == null && ur != null && L != null) { U = ur / 100 * L; r.steps.push(`Unemployed = ${P(ur)} × ${c.num(L)} = ${c.num(U)}`); }
            if (L == null && ur != null && U != null) { L = U / (ur / 100); r.steps.push(`Labour force = ${c.num(U)} ÷ ${f(ur / 100, 4)} = ${c.num(L)}`); }
            if (L == null || U == null) return c.intent && /rate/.test(t) ? Miss("Labour market", ["the number unemployed and the labour force (or employed and unemployed)"]) : null;
            r.given.push("Unemployed = " + c.num(U), "Labour force = " + c.num(L));
            const rate = U / L * 100;
            r.steps.push("Unemployment rate = Unemployed ÷ Labour force × 100", `= ${c.num(U)} ÷ ${c.num(L)} × 100 = ${P(rate, 4)}`);
            r.answers.push("Unemployment rate = " + P(rate));
            if (W) { r.steps.push(`Participation rate = ${c.num(L)} ÷ ${c.num(W)} × 100 = ${P(L / W * 100, 4)}`); r.answers.push("Labour force participation rate = " + P(L / W * 100)); if (E != null) r.answers.push("Employment-to-population ratio = " + P(E / W * 100)); }
            if (D != null) { const ex = (U + D) / (L + D) * 100; r.steps.push(`Expanded rate = (${c.num(U)} + ${c.num(D)}) ÷ (${c.num(L)} + ${c.num(D)}) × 100 = ${P(ex, 4)}`); r.answers.push("Expanded unemployment rate (incl. discouraged) = " + P(ex)); }
            return r;
        }

        /* =========================================================
           MODULE: COSTS, REVENUE, PROFIT MAXIMISATION
        ========================================================= */
        function costTable(c) {
            const lt = c.lt;
            const Q = listOf(lt, "output|quantity|quantities|units produced|units|q"); if (!Q) return null;
            const L = (names) => { const a = listOf(lt, names); return a && a.length === Q.length ? a : null; };
            let TC = L("total costs?|tc|total cost"), TVC = L("total variable costs?|tvc|variable costs?"), TFCl = L("total fixed costs?|tfc|fixed costs?"),
                TR = L("total revenue|tr|revenue"), Pl = L("price|prices|p");
            const tfcS = val(c.t, ["total fixed costs?", "tfc", "fixed costs?"]), pS = val(c.t, ["selling price", "price per unit", "price", "p"]);
            const TFC = TFCl || (tfcS != null ? Q.map(() => tfcS) : null);
            if (!TC && TVC && TFC) TC = TVC.map((v, i) => v + TFC[i]);
            if (!TC && !TR) return null;
            if (!TR) { if (Pl) TR = Q.map((q, i) => q * Pl[i]); else if (pS != null && TC) TR = Q.map(q => q * pS); }
            const r = R("Cost, revenue and profit schedule");
            const rows = [], head = ["Q"]; if (TFC) head.push("TFC"); if (TVC || (TC && TFC)) head.push("TVC"); if (TC) head.push("TC", "ATC", "MC"); if (TFC) head.push("AFC");
            if (TR) head.push("TR", "MR"); if (TC && TR) head.push("Profit");
            const TVCc = TVC || (TC && TFC ? TC.map((v, i) => v - TFC[i]) : null);
            let best = -1, bestP = -Infinity;
            Q.forEach((q, i) => {
                const row = [f(q)];
                if (TFC) row.push(f(TFC[i]));
                if (TVCc) row.push(f(TVCc[i]));
                if (TC) { row.push(f(TC[i]), q ? f(TC[i] / q) : "-", i ? f((TC[i] - TC[i - 1]) / (q - Q[i - 1])) : "-"); }
                if (TFC) row.push(q ? f(TFC[i] / q) : "-");
                if (TR) row.push(f(TR[i]), i ? f((TR[i] - TR[i - 1]) / (q - Q[i - 1])) : "-");
                if (TC && TR) { const pf = TR[i] - TC[i]; row.push(f(pf)); if (pf > bestP) { bestP = pf; best = i; } }
                rows.push(row);
            });
            r.html = table(head, rows, best);
            r.steps.push("TC = TFC + TVC; ATC = TC ÷ Q; MC = ΔTC ÷ ΔQ; MR = ΔTR ÷ ΔQ; Profit = TR − TC");
            if (best >= 0) {
                r.answers.push(`Profit is highest at Q = ${f(Q[best])}, where profit = ${c.money(bestP)}`);
                r.notes.push("The profit-maximising output is where MR = MC (or the last unit where MR ≥ MC).");
            }
            return r;
        }

        function costModule(c) {
            const t = c.t;
            if (/break-?even|contribution|margin of safety|gross profit|cost of sales/.test(t)) return null;
            if (!/\b(mr|mc|tc|tr|atc|avc|afc|marginal (?:cost|revenue)|total (?:cost|revenue|variable|fixed)|average (?:cost|variable|fixed|total|revenue)|fixed costs?|variable costs?|monopol\w*|competit\w*|firm|output|profit[- ]maxim\w*|economic profit)\b/.test(t)) return null;
            const tbl = costTable(c); if (tbl) return tbl;

            const Pq0 = eqPoly(t, "p(?:rice)?|ar|inverse demand", "q");
            let Pq = Pq0;
            if (!Pq) { const dq = eqPoly(t, "qd|q|demand", "p"); if (dq && dq.length === 2 && dq[1]) Pq = [-dq[0] / dq[1], 1 / dq[1]]; }
            const TRq = eqPoly(t, "tr|total revenue", "q"), MRq = eqPoly(t, "mr|marginal revenue", "q"),
                TCq = eqPoly(t, "tc|total cost(?: function)?|c\\(q\\)", "q"), ACq = eqPoly(t, "atc|ac|average (?:total )?cost", "q"), MCq = eqPoly(t, "mc|marginal cost", "q");
            const TR = TRq || (Pq ? pmulq(Pq) : null), TC = TCq || (ACq ? pmulq(ACq) : null);
            const MR = MRq || (TR ? pder(TR) : null), MC = MCq || (TC ? pder(TC) : null);

            if (TR || TC || MR || MC) {
                const r = R(MR && MC ? "Profit maximisation (MR = MC)" : "Costs and revenue from the given functions");
                if (Pq) r.given.push("Price (demand): P = " + pstr(Pq, "Q"));
                if (TR) r.given.push("TR = " + pstr(TR, "Q")); if (TC) r.given.push("TC = " + pstr(TC, "Q"));
                const qGiven = val(t, ["output", "quantity", "q"]);
                if (qGiven != null && !/maximi|optimal|best|most profit/.test(t)) {
                    const q = qGiven;
                    if (TC) { r.steps.push(`TC(${f(q)}) = ${f(pev(TC, q))}`, `AC = TC ÷ Q = ${f(pev(TC, q) / q)}`); r.answers.push(`TC = ${f(pev(TC, q))}`, `Average cost = ${f(pev(TC, q) / q)}`); }
                    if (MC) { r.steps.push(`MC = d(TC)/dQ = ${pstr(MC, "Q")} = ${f(pev(MC, q))} at Q = ${f(q)}`); r.answers.push("Marginal cost = " + f(pev(MC, q))); }
                    if (TR) { r.steps.push(`TR(${f(q)}) = ${f(pev(TR, q))}`); r.answers.push("Total revenue = " + f(pev(TR, q))); }
                    if (MR) { r.steps.push(`MR = d(TR)/dQ = ${pstr(MR, "Q")} = ${f(pev(MR, q))}`); r.answers.push("Marginal revenue = " + f(pev(MR, q))); }
                    if (TR && TC) r.answers.push("Profit = " + f(pev(TR, q) - pev(TC, q)));
                    return r.answers.length ? r : null;
                }
                if (!(MR && MC)) return c.intent && /maximi/.test(t) ? Miss("Profit maximisation", ["revenue information (price or TR or MR) and cost information (TC or MC)"]) : null;
                r.steps.push(TR ? "MR = d(TR)/dQ = " + pstr(MR, "Q") : "MR = " + pstr(MR, "Q"), TC ? "MC = d(TC)/dQ = " + pstr(MC, "Q") : "MC = " + pstr(MC, "Q"));
                const D = padd(MR, MC, -1), roots = proots(D);
                if (roots === null) return Miss("Profit maximisation", ["functions that are quadratic or simpler"]);
                const dD = pder(D);
                const good = roots.filter(x => x > 1e-9 && pev(dD, x) < 0);
                const cand = good.length ? good : roots.filter(x => x > 1e-9);
                r.steps.push("Set MR = MC: " + pstr(MR, "Q") + " = " + pstr(MC, "Q"));
                if (!cand.length) { r.answers.push("There is no positive output where MR = MC."); return r; }
                const q = cand[0];
                r.steps.push(`Solve: Q = ${f(q, 4)}`, "Second-order check: MC must be rising faster than MR at this output" + (good.length ? " ✓" : " (not confirmed)"));
                r.answers.push("Profit-maximising output Q = " + f(q, 4));
                let price = Pq ? pev(Pq, q) : null;
                if (price != null) { r.steps.push(`Price from the demand curve: P = ${f(price, 4)}`); r.answers.push("Price = " + f(price)); }
                if (TR && TC) {
                    const tr = pev(TR, q), tcv = pev(TC, q), pf = tr - tcv;
                    r.steps.push(`TR = ${f(tr)}, TC = ${f(tcv)}, Profit = TR − TC = ${f(pf)}`);
                    r.answers.push("Total revenue = " + f(tr), "Total cost = " + f(tcv), (pf >= 0 ? "Economic profit = " : "Economic loss = ") + f(Math.abs(pf)));
                    r.notes.push(Math.abs(pf) < 1e-9 ? "Only normal profit is earned." : pf < 0 ? "The firm makes a loss; it should compare price with average variable cost to decide whether to shut down." : "The firm earns supernormal (economic) profit.");
                }
                return r;
            }

            /* scalar cost figures */
            if (!/economic|firm|output|marginal|average|monopol|competit|short[- ]run|tfc|tvc|\bmc\b|\bmr\b|atc|avc|afc|total (?:cost|revenue)/.test(t)) return null;
            const tfc = val(t, ["total fixed costs?", "tfc", "fixed costs?"]), tvc = val(t, ["total variable costs?", "tvc"]),
                vcu = val(t, ["variable costs? per unit", "average variable cost", "avc", "unit variable cost"]), tcS = val(t, ["total costs?", "tc"]);
            let q = val(t, ["output", "quantity(?: produced| sold)?", "units(?: produced| sold)?", "produces?", "sells?"]);
            if (q == null) { const m = /(\d+(?:\.\d+)?)\s*units?\b/.exec(t); if (m) q = +m[1]; }
            const pr = val(t, ["selling price", "price per unit", "price", "p"]), trS = val(t, ["total revenue", "tr", "revenue"]);
            const r = R("Costs, revenue and profit");
            let TCv = tcS, TVCv = tvc;
            if (TVCv == null && vcu != null && q != null) TVCv = vcu * q;
            if (TCv == null && tfc != null && TVCv != null) TCv = tfc + TVCv;
            let TRv = trS; if (TRv == null && pr != null && q != null) TRv = pr * q;
            const any = [];
            if (TVCv != null && tvc == null && vcu != null) r.steps.push(`TVC = variable cost per unit × Q = ${f(vcu)} × ${f(q)} = ${c.money(TVCv)}`);
            if (TCv != null && tcS == null) r.steps.push(`TC = TFC + TVC = ${c.money(tfc)} + ${c.money(TVCv)} = ${c.money(TCv)}`), r.answers.push("Total cost = " + c.money(TCv));
            if (TCv != null && q) { r.steps.push(`ATC = TC ÷ Q = ${c.money(TCv)} ÷ ${f(q)} = ${c.cur}${f(TCv / q)}`); r.answers.push("Average total cost = " + c.cur + f(TCv / q)); any.push(1); }
            if (TVCv != null && q && tvc != null) { r.steps.push(`AVC = TVC ÷ Q = ${c.cur}${f(TVCv / q)}`); r.answers.push("Average variable cost = " + c.cur + f(TVCv / q)); any.push(1); }
            if (tfc != null && q) { r.steps.push(`AFC = TFC ÷ Q = ${c.money(tfc)} ÷ ${f(q)} = ${c.cur}${f(tfc / q)}`); r.answers.push("Average fixed cost = " + c.cur + f(tfc / q)); any.push(1); }
            if (TRv != null && trS == null) { r.steps.push(`TR = P × Q = ${c.cur}${f(pr)} × ${f(q)} = ${c.money(TRv)}`); r.answers.push("Total revenue = " + c.money(TRv)); any.push(1); }
            if (TRv != null && TCv != null) { const pf = TRv - TCv; r.steps.push(`Profit = TR − TC = ${c.money(TRv)} − ${c.money(TCv)} = ${c.money(pf)}`); r.answers.push((pf >= 0 ? "Profit = " : "Loss = ") + c.money(Math.abs(pf))); any.push(1); }
            return any.length || r.answers.length ? r : null;
        }

        /* =========================================================
           MODULE: INTERNATIONAL TRADE AND EXCHANGE RATES
        ========================================================= */
        function norm(s) { return String(s).replace(/\b(?:units? of|tonnes? of|kg of|the)\b/g, "").replace(/\s+/g, " ").trim().replace(/(?:es|s)$/, ""); }
        function parseProducers(t) {
            const out = [];
            const strip = s => { s = s.trim(); let prev; do { prev = s; s = s.replace(/^(suppose|assume|assuming|given that|if|while|whereas|and|but|then|in one hour|in one day|per day|in a day|one hour|the)\s+/, "").trim(); } while (s !== prev); return s; };
            const re = /([a-z][a-z ]{0,25}?)\s+(?:can\s+)?(?:produce|produces|make|makes|manufacture|manufactures|grow|grows)\s+(?:either\s+)?(?:up to\s+|a maximum of\s+|maximum of\s+)?(\d+(?:\.\d+)?)\s+(?:units of\s+|tonnes of\s+|kg of\s+)?([a-z][a-z ]{0,20}?)\s+(?:or|and|\/)\s+(\d+(?:\.\d+)?)\s+(?:units of\s+)?([a-z][a-z ]{0,20}?)(?=[.;,]|\s+(?:per|in|while|whereas|but|if|with|using)\b|$)/g;
            let m;
            while ((m = re.exec(t))) out.push({ who: strip(m[1]) || "Producer " + (out.length + 1), a: +m[2], gA: norm(m[3]), b: +m[4], gB: norm(m[5]) });
            if (!out.length) {
                const re2 = /([a-z][a-z ]{0,20}?)\s*[:\-]\s*(\d+(?:\.\d+)?)\s+([a-z]+)\s*(?:,|and|or|\/|;)\s*(\d+(?:\.\d+)?)\s+([a-z]+)/g;
                while ((m = re2.exec(t))) out.push({ who: strip(m[1]) || "Producer " + (out.length + 1), a: +m[2], gA: norm(m[3]), b: +m[4], gB: norm(m[5]) });
            }
            return out.filter(x => x.a > 0 && x.b > 0);
        }
        function tradeModule(c) {
            const t = c.t;
            /* comparative / absolute advantage */
            if (/opportunity cost|comparative|absolute|advantage|specialis/.test(t)) {
                const pr = parseProducers(t);
                if (pr.length) {
                    const r = R("Opportunity cost and comparative advantage");
                    const A = pr[0];
                    pr.forEach((p, i) => { if (i && p.gA === A.gB && p.gB === A.gA) { const x = p.a; p.a = p.b; p.b = x; p.gA = A.gA; p.gB = A.gB; } });
                    pr.forEach(p => {
                        r.given.push(`${p.who}: ${f(p.a)} ${A.gA} or ${f(p.b)} ${A.gB}`);
                        r.steps.push(`${p.who}: 1 ${A.gA} costs ${f(p.b)} ÷ ${f(p.a)} = ${f(p.b / p.a, 4)} ${A.gB}; 1 ${A.gB} costs ${f(p.a)} ÷ ${f(p.b)} = ${f(p.a / p.b, 4)} ${A.gA}`);
                        r.answers.push(`${p.who}: opportunity cost of 1 ${A.gA} = ${f(p.b / p.a, 4)} ${A.gB}; of 1 ${A.gB} = ${f(p.a / p.b, 4)} ${A.gA}`);
                    });
                    if (pr.length >= 2) {
                        const [p1, p2] = pr, o1 = p1.b / p1.a, o2 = p2.b / p2.a;
                        if (Math.abs(o1 - o2) < 1e-9) r.answers.push("The opportunity costs are equal, so there is no comparative advantage and no gain from trade.");
                        else {
                            const lowA = o1 < o2 ? p1 : p2, lowB = o1 < o2 ? p2 : p1;
                            r.answers.push(`Comparative advantage: ${lowA.who} in ${A.gA}; ${lowB.who} in ${A.gB}`);
                            r.notes.push(`A mutually beneficial price for 1 ${A.gA} lies between ${f(Math.min(o1, o2), 4)} and ${f(Math.max(o1, o2), 4)} ${A.gB}.`);
                        }
                        const aa = p1.a === p2.a ? "neither" : (p1.a > p2.a ? p1.who : p2.who), ab = p1.b === p2.b ? "neither" : (p1.b > p2.b ? p1.who : p2.who);
                        r.answers.push(`Absolute advantage: ${aa} in ${A.gA}; ${ab} in ${A.gB}`);
                    }
                    return r;
                }
            }
            const r = R("International trade");
            /* terms of trade */
            if (/terms of trade/.test(t)) {
                const x = val(t, ["export price index", "export prices?", "price of exports", "index of export prices"]), m = val(t, ["import price index", "import prices?", "price of imports", "index of import prices"]);
                if (x != null && m) {
                    const tot = x / m * 100;
                    r.given.push("Export price index = " + f(x), "Import price index = " + f(m));
                    r.steps.push("Terms of trade = Export price index ÷ Import price index × 100", `= ${f(x)} ÷ ${f(m)} × 100 = ${f(tot, 4)}`);
                    r.answers.push("Terms of trade = " + f(tot, 2));
                    r.notes.push(tot > 100 ? "The terms of trade have improved (export prices are high relative to import prices)." : tot < 100 ? "The terms of trade have deteriorated." : "The terms of trade are unchanged.");
                    return r;
                }
            }
            /* exchange rate */
            if (/exchange rate|rand|depreciat|appreciat|convert|forex|dollar|euro|pound|usd|eur|gbp/.test(t)) {
                const CUR = "(?:us\\s*)?(usd|dollars?|euros?|eur|pounds?|gbp|yen)";
                const ch = new RegExp("from\\s*(\\d+(?:\\.\\d+)?)\\s*(?:to|->)\\s*(\\d+(?:\\.\\d+)?)").exec(t);
                if (ch && /exchange rate|rand|dollar|usd|euro|eur|pound|gbp|per/.test(t)) {
                    const a = +ch[1], b = +ch[2];
                    const dom = (a / b - 1) * 100, forn = (b / a - 1) * 100;
                    r.given.push(`Exchange rate (domestic currency per foreign unit): ${f(a)} → ${f(b)}`);
                    r.steps.push(`More domestic currency is needed for 1 foreign unit, so the domestic currency has ${b > a ? "depreciated" : "appreciated"}.`,
                        `Value of domestic currency: (1 ÷ ${f(b)} − 1 ÷ ${f(a)}) ÷ (1 ÷ ${f(a)}) = ${P(dom, 4)}`, `Foreign currency: (${f(b)} − ${f(a)}) ÷ ${f(a)} = ${P(forn, 4)}`);
                    r.answers.push(`The domestic currency ${b > a ? "depreciated" : "appreciated"} (its value changed by ${P(dom, 2)}); the foreign currency changed by ${P(forn, 2)}`);
                    r.notes.push(b > a ? "Exports become cheaper for foreigners and imports become more expensive locally." : "Exports become dearer for foreigners and imports become cheaper locally.");
                    const ip = val(t, ["import(?:ed)? (?:price|cost)", "price"]);
                    if (ip != null && /import/.test(t)) { r.steps.push(`Import price in domestic currency: ${f(ip)} × ${f(a)} = ${f(ip * a)} → ${f(ip)} × ${f(b)} = ${f(ip * b)}`); r.answers.push(`Local price of the import rises from ${c.cur}${f(ip * a)} to ${c.cur}${f(ip * b)}`); }
                    return r;
                }
                let rate = null, m = new RegExp("(\\d+(?:\\.\\d+)?)\\s*(?:rand|zar)?\\s*(?:=|per|to the|to one|/)\\s*(?:1\\s*)?" + CUR).exec(t);
                let fc = m ? m[2] : null; if (m) rate = +m[1];
                if (rate == null) { m = new RegExp("(?:1\\s*)?" + CUR + "\\s*(?:=|:|is worth|costs)\\s*(\\d+(?:\\.\\d+)?)").exec(t); if (m) { rate = +m[2]; fc = m[1]; } }
                if (rate != null) {
                    const fcn = /usd|dollar/.test(fc) ? "dollars" : /eur/.test(fc) ? "euros" : /gbp|pound/.test(fc) ? "pounds" : "units of foreign currency";
                    const fa = new RegExp("(\\d+(?:\\.\\d+)?)\\s*" + CUR).exec(t.replace(/(\d+(?:\.\d+)?)\s*(?:rand|zar)?\s*(?:=|per|to the|to one|\/)\s*(?:1\s*)?(?:us\s*)?(?:usd|dollars?|euros?|eur|pounds?|gbp|yen)/, ""));
                    const ra = new RegExp("\\b(?:r|zar)\\s?(\\d[\\d ,]*(?:\\.\\d+)?)", "gi"); let rv = null, mm;
                    while ((mm = ra.exec(c.lt0 || c.raw.toLowerCase()))) { const v = parseFloat(mm[1].replace(/[ ,]/g, "")); if (v !== rate) { rv = v; break; } }
                    r.given.push(`Exchange rate: R${f(rate)} = 1 ${fcn.replace(/s$/, "")}`);
                    if (fa && !/how many (dollar|euro|pound|usd|eur|gbp)|in (dollar|euro|pound)/.test(t)) {
                        const v = +fa[1] * rate; r.steps.push(`Rand = foreign amount × rate = ${f(+fa[1])} × ${f(rate)} = ${f(v)}`); r.answers.push(`${f(+fa[1])} ${fcn} = R${f(v)}`); return r;
                    }
                    if (rv != null) { const v = rv / rate; r.steps.push(`Foreign amount = rand ÷ rate = ${f(rv)} ÷ ${f(rate)} = ${f(v, 4)}`); r.answers.push(`R${f(rv)} = ${f(v)} ${fcn}`); return r; }
                }
            }
            /* tariff */
            if (/tariff/.test(t)) {
                const tp = pctVal(t, ["tariff", "tariff of", "import tariff", "ad valorem tariff"]), wp = val(t, ["world price", "import price", "price of the import", "price"]), qty = val(t, ["imports?", "quantity", "units"]);
                if (tp != null && wp != null) {
                    const np = wp * (1 + tp / 100);
                    r.given.push("World price = " + c.money(wp), "Tariff = " + P(tp));
                    r.steps.push("Domestic price = World price × (1 + tariff rate)", `= ${c.money(wp)} × ${f(1 + tp / 100, 4)} = ${c.money(np)}`);
                    r.answers.push("Domestic price with tariff = " + c.money(np), "Tariff per unit = " + c.money(np - wp));
                    if (qty != null) r.answers.push("Tariff revenue = " + c.money((np - wp) * qty));
                    return r;
                }
            }
            /* trade balance / current account */
            if (/trade balance|balance of trade|current account|balance of payments|trade deficit|trade surplus|net exports/.test(t)) {
                const x = val(t, ["exports?", "value of exports"]), m = val(t, ["imports?", "value of imports"]);
                if (x != null && m != null) {
                    const b = x - m;
                    r.given.push("Exports = " + c.money(x), "Imports = " + c.money(m));
                    r.steps.push("Trade balance = Exports − Imports", `= ${c.money(x)} − ${c.money(m)} = ${c.money(b)}`);
                    let tot = b, label = "Trade balance";
                    const sv = val(t, ["net services", "services balance"]), inc = val(t, ["net income", "net primary income", "income balance"]), tr = val(t, ["net transfers", "net current transfers", "secondary income", "transfers"]);
                    if (/current account/.test(t) && (sv != null || inc != null || tr != null)) {
                        tot = b + (sv || 0) + (inc || 0) + (tr || 0); label = "Current account balance";
                        r.steps.push(`Current account = goods balance + services + income + transfers = ${c.money(b)} + ${c.money(sv || 0)} + ${c.money(inc || 0)} + ${c.money(tr || 0)} = ${c.money(tot)}`);
                    }
                    r.answers.push(`${label} = ${c.money(tot)} (${tot > 0 ? "surplus" : tot < 0 ? "deficit" : "balanced"})`);
                    return r;
                }
            }
            return null;
        }

        /* =========================================================
           MODULE: PUBLIC FINANCE AND MONEY
        ========================================================= */
        function fiscalModule(c) {
            const t = c.t, r = R("Public finance and money");
            if (/reserve (requirement|ratio)|money multiplier|credit creation|cash reserve|deposit multiplier/.test(t)) {
                let rr = frac(t, ["reserve requirement ratio", "reserve requirement", "reserve ratio", "required reserve ratio", "cash reserve ratio", "crr", "reserve"]);
                const dep = val(t, ["initial deposit", "new deposit", "deposit", "cash deposited"]);
                if (rr) {
                    const k = 1 / rr;
                    r.given.push("Reserve requirement = " + P(rr * 100, 4));
                    r.steps.push("Money (deposit) multiplier = 1 ÷ reserve ratio", `= 1 ÷ ${f(rr, 4)} = ${f(k, 4)}`);
                    r.answers.push("Money multiplier = " + f(k, 4));
                    if (dep != null) {
                        r.given.push("Initial deposit = " + c.money(dep));
                        r.steps.push(`Maximum total deposits = ${c.money(dep)} × ${f(k, 4)} = ${c.money(dep * k)}`, `New money created = ${c.money(dep * k)} − ${c.money(dep)} = ${c.money(dep * k - dep)}`, `First loan (excess reserves) = ${c.money(dep)} × (1 − ${f(rr, 4)}) = ${c.money(dep * (1 - rr))}`);
                        r.answers.push("Total deposits created = " + c.money(dep * k), "New money created = " + c.money(dep * k - dep));
                    }
                    return r;
                }
            }
            if (/budget|deficit|surplus|public debt|government debt|national debt|debt[- ]to[- ]gdp/.test(t) && !/consumer|producer|qd|qs/.test(t)) {
                const rev = val(t, ["government revenue", "total revenue", "tax revenue", "revenue", "receipts"]), exp = val(t, ["government expenditure", "government spending", "total expenditure", "expenditure", "spending"]),
                    gdp = val(t, ["gdp"]), debt = val(t, ["public debt", "government debt", "national debt", "total debt", "debt"]), intr = val(t, ["interest payments?", "debt service(?: costs?)?", "interest on debt"]);
                if (rev != null && exp != null) {
                    const b = rev - exp;
                    r.given.push("Revenue = " + c.money(rev), "Expenditure = " + c.money(exp));
                    r.steps.push("Budget balance = Revenue − Expenditure", `= ${c.money(rev)} − ${c.money(exp)} = ${c.money(b)}`);
                    r.answers.push(`Budget ${b < 0 ? "deficit" : b > 0 ? "surplus" : "balance"} = ${c.money(Math.abs(b))}`);
                    if (gdp) { r.steps.push(`As % of GDP = ${c.money(b)} ÷ ${c.money(gdp)} × 100 = ${P(b / gdp * 100, 4)}`); r.answers.push("Balance as % of GDP = " + P(b / gdp * 100)); }
                    if (intr != null) { const pb = rev - (exp - intr); r.steps.push(`Primary balance = Revenue − (Expenditure − Interest) = ${c.money(pb)}`); r.answers.push("Primary balance = " + c.money(pb)); }
                    return r;
                }
                if (debt != null && gdp) {
                    r.given.push("Debt = " + c.money(debt), "GDP = " + c.money(gdp));
                    r.steps.push("Debt-to-GDP ratio = Debt ÷ GDP × 100", `= ${c.money(debt)} ÷ ${c.money(gdp)} × 100 = ${P(debt / gdp * 100, 4)}`);
                    r.answers.push("Debt-to-GDP ratio = " + P(debt / gdp * 100)); return r;
                }
            }
            return null;
        }

        /* =========================================================
           MODULE: UTILITY, INEQUALITY, TAX, % CHANGE
        ========================================================= */
        function miscModule(c) {
            const t = c.t, lt = c.lt, r = R("Economics calculation");
            /* utility */
            const TU = listOf(lt, "total utility|tu"), MU = listOf(lt, "marginal utility|mu");
            if (TU || MU) {
                r.title = "Total and marginal utility";
                if (TU) {
                    const mu = TU.map((v, i) => i ? v - TU[i - 1] : v);
                    r.html = table(["Units", "TU", "MU"], TU.map((v, i) => [String(i + 1), f(v), f(mu[i])]));
                    r.steps.push("MU = change in TU from one extra unit");
                    const dim = mu.slice(1).every((v, i) => v <= mu[i]);
                    r.answers.push("Marginal utility: " + mu.map(f).join(", "));
                    r.notes.push(dim ? "MU keeps falling, which illustrates the law of diminishing marginal utility." : "MU does not fall every time, so check the data.");
                    const mx = TU.indexOf(Math.max.apply(null, TU)); r.notes.push("TU is highest at " + (mx + 1) + " unit(s); the consumer is satisfied (MU = 0) around this point.");
                } else {
                    let s = 0; const tu = MU.map(v => (s += v));
                    r.html = table(["Units", "MU", "TU"], MU.map((v, i) => [String(i + 1), f(v), f(tu[i])]));
                    r.steps.push("TU = running total of MU"); r.answers.push("Total utility: " + tu.map(f).join(", "));
                }
                return r;
            }
            /* Gini */
            if (/gini|lorenz/.test(t)) {
                const a = val(t, ["area a"]), b = val(t, ["area b"]);
                if (a != null && b != null && a + b) {
                    r.title = "Gini coefficient";
                    r.given.push("Area A = " + f(a), "Area B = " + f(b));
                    r.steps.push("Gini = A ÷ (A + B)", `= ${f(a)} ÷ (${f(a)} + ${f(b)}) = ${f(a / (a + b), 4)}`);
                    r.answers.push("Gini coefficient = " + f(a / (a + b), 4)); r.notes.push("0 means perfect equality; 1 means perfect inequality."); return r;
                }
            }
            /* poverty headcount */
            if (/poverty|poor/.test(t) && /headcount|rate|percentage|proportion/.test(t)) {
                const poor = val(t, ["poor(?: people| persons)?", "people living in poverty", "below the poverty line", "in poverty"]), pop = val(t, ["population", "total population"]);
                if (poor != null && pop) { r.title = "Poverty headcount ratio"; r.steps.push("Headcount ratio = Poor ÷ Population × 100", `= ${c.num(poor)} ÷ ${c.num(pop)} × 100 = ${P(poor / pop * 100, 4)}`); r.answers.push("Poverty rate = " + P(poor / pop * 100)); return r; }
            }
            /* average and marginal tax rates */
            if (/average tax|marginal tax|tax rate|taxable income|progressive|regressive|income tax/.test(t) && /tax/.test(t)) {
                const pairs = []; const re = /income\s*(?:of|is|=)?\s*(\d+(?:\.\d+)?)[^.;\d]{0,40}?tax\s*(?:of|is|=|payable|paid)?\s*(\d+(?:\.\d+)?)/g; let m;
                while ((m = re.exec(t))) pairs.push({ y: +m[1], tx: +m[2] });
                if (!pairs.length) { const y = val(t, ["taxable income", "income", "earns"]), tx = val(t, ["tax paid", "tax payable", "tax", "pays"]); if (y && tx != null) pairs.push({ y, tx }); }
                if (pairs.length) {
                    r.title = "Average and marginal tax rates";
                    pairs.forEach(p => { r.steps.push(`Average tax rate = ${c.money(p.tx)} ÷ ${c.money(p.y)} × 100 = ${P(p.tx / p.y * 100, 4)}`); r.answers.push(`Average tax rate on ${c.money(p.y)} = ${P(p.tx / p.y * 100)}`); });
                    if (pairs.length >= 2) {
                        const a = pairs[0], b = pairs[1], mt = (b.tx - a.tx) / (b.y - a.y) * 100;
                        r.steps.push(`Marginal tax rate = ΔTax ÷ ΔIncome = ${c.money(b.tx - a.tx)} ÷ ${c.money(b.y - a.y)} × 100 = ${P(mt, 4)}`); r.answers.push("Marginal tax rate = " + P(mt));
                        const ra = a.tx / a.y, rb = b.tx / b.y;
                        r.notes.push(rb > ra + 1e-9 ? "The average rate rises with income: a progressive tax." : rb < ra - 1e-9 ? "The average rate falls as income rises: a regressive tax." : "The average rate is constant: a proportional tax.");
                    }
                    return r;
                }
            }
            /* simple percentage change */
            if (/percentage change|percent change|% change|rate of change|percentage (increase|decrease)|growth rate/.test(t)) {
                let a = null, b = null; const m = /from\s*(-?\d+(?:\.\d+)?)\s*(?:to|->)\s*(-?\d+(?:\.\d+)?)/.exec(t);
                if (m) { a = +m[1]; b = +m[2]; } else { const n = plainNums(t); if (n.length === 2) { a = n[0]; b = n[1]; } }
                if (a && b != null) {
                    r.title = "Percentage change";
                    r.steps.push("% change = (New − Old) ÷ Old × 100", `= (${f(b)} − ${f(a)}) ÷ ${f(a)} × 100 = ${P((b - a) / a * 100, 4)}`);
                    r.answers.push(`${b >= a ? "Increase" : "Decrease"} of ${P(Math.abs((b - a) / a * 100))}`); return r;
                }
            }
            return null;
        }

        /* =========================================================
           DISPATCH
        ========================================================= */
        const MODULES = [
            { id: "market", test: c => /=/.test(c.t) && /\b(qd|qs|pd|ps|demand|suppl\w*|equilibrium|quantity)\b/.test(c.t), run: marketModule },
            { id: "multiplier", test: c => /multiplier|\bmpc\b|\bmps\b|propensity|\bc\s*=\s*\d/.test(c.t), run: multiplierModule },
            { id: "elasticity", test: c => /elastic|\bped\b|\bpes\b|\byed\b|\bxed\b/.test(c.t), run: elasticityModule },
            { id: "gdp", test: c => /gdp|gross domestic|national income|\bgni\b|\bgnp\b|\bnni\b|deflator|consumption|net exports|economic growth/.test(c.t), run: gdpModule },
            { id: "prices", test: c => /inflation|\bcpi\b|price index|real wage|real income|real interest|fisher|deflat|cost of living|basket/.test(c.t), run: pricesModule },
            { id: "labour", test: c => /unemploy|labour force|labor force|participation|economically active|working[- ]age/.test(c.t), run: labourModule },
            { id: "trade", test: c => /opportunity cost|comparative|absolute advantage|terms of trade|exchange rate|rand|depreciat|appreciat|tariff|trade balance|trade deficit|trade surplus|current account|balance of payments|convert/.test(c.t), run: tradeModule },
            { id: "cost", test: c => /\b(mr|mc|tc|tr|atc|avc|afc)\b|marginal|total (cost|revenue|variable|fixed)|average (cost|variable|fixed|total)|fixed costs?|variable costs?|monopol|competit|firm|economic profit/.test(c.t), run: costModule },
            { id: "fiscal", test: c => /reserve|money multiplier|credit creation|budget|deficit|public debt|government debt|national debt|debt[- ]to[- ]gdp/.test(c.t), run: fiscalModule },
            { id: "misc", test: c => /utility|gini|lorenz|poverty|tax|percentage change|percent change|% change|rate of change|growth rate|percentage (increase|decrease)/.test(c.t), run: miscModule }
        ];

        function solveText(raw) {
            const c = prep(raw);
            c.lt0 = String(raw || "").toLowerCase();
            if (!/\d/.test(c.t)) return null;
            let firstMiss = null;
            for (const m of MODULES) {
                let ok = false; try { ok = m.test(c); } catch (e) { ok = false; }
                if (!ok) continue;
                let r = null; try { r = m.run(c); } catch (e) { r = null; }
                if (!r) continue;
                if (r.missing) { if (!firstMiss) firstMiss = r; continue; }
                if (r.answers && r.answers.length || r.html) return r;
            }
            return firstMiss;
        }

        function splitQuestions(text) {
            const top = /^\s*(?:question\s*)?(\d+(?:\.\d+)*)[.):]\s+(\S.*)$/i, items = []; let cur = null;
            String(text).replace(/\r/g, "").split("\n").forEach(line => {
                const m = top.exec(line);
                if (m) { cur = { label: m[1], text: m[2] }; items.push(cur); } else if (cur) cur.text += "\n" + line;
            });
            if (items.length >= 2) return items;
            const re = /(?:^|\s)\(([a-z])\)\s+/g, marks = []; let m;
            while ((m = re.exec(text))) marks.push({ label: "(" + m[1] + ")", start: m.index, end: m.index + m[0].length });
            if (marks.length >= 2) {
                const stem = text.slice(0, marks[0].start);
                return marks.map((mk, i) => ({ label: mk.label, text: stem + "\n" + text.slice(mk.end, i + 1 < marks.length ? marks[i + 1].start : text.length) }));
            }
            return [{ label: "", text }];
        }

        function answerHtml(question) {
            const text = String(question || "");
            if (text.trim().length < 6 || !/\d/.test(text)) return null;
            const parts = splitQuestions(text), out = [];
            for (const p of parts) {
                const r = solveText(p.text);
                if (!r) return null;
                out.push({ label: p.label, r });
            }
            let html = "";
            out.forEach(o => {
                if (out.length > 1) html += `<h3>Question ${esc(o.label)}</h3>`;
                html += render(o.r);
            });
            return html + `<p><em>Worked out by the built-in Economics engine (no internet needed).</em></p>`;
        }

        return { answerHtml, solve: solveText, answer: answerHtml, topics: () => MODULES.map(m => m.id) };
    })();

    /* Runs before the older answer path; claims only questions it can fully
       solve and otherwise hands the question back to the rest of the app. */
    const mcBeforeEconomicsEngine = generateAnswer;
    generateAnswer = function (question) {
        try {
            const economicsResult = MC_ECONOMICS_ENGINE.answerHtml(question);
            if (economicsResult) return economicsResult;
        } catch (e) { /* keep the app working if one solver meets unusual input */ }
        return mcBeforeEconomicsEngine(question);
    };
    if (typeof window !== "undefined") window.MC_ECONOMICS_ENGINE = MC_ECONOMICS_ENGINE;

    /* =========================================================
       END OF MASTERCOMMERCE ECONOMICS ENGINE
    ========================================================= */


    /* =========================================================
       DOCUMENT UPLOAD + QUESTIONS ABOUT DOCUMENTS (ADD-ON)

       WHAT IT DOES (all in the browser, no backend, no AI API)
       - Attachment button (paperclip) next to the message box,
         plus drag-and-drop onto the chat.
       - Reads PDF (PDF.js), DOCX (Mammoth.js) and TXT (built in).
         Scanned PDFs are detected and read with OCR (Tesseract.js).
       - Splits the text into numbered questions, sub-questions and
         marks, and keeps it for the whole session (memory only,
         nothing is saved to local storage or sent anywhere).
       - Questions are answered by YOUR existing engines, in this
         order: accounting engine -> economics engine -> the
         original solvers (VAT, WACC, NPV, equations, maths ...) ->
         your study notes. Anything they cannot solve is reported
         honestly, never invented.

       LIBRARIES (see MC_DOC.libs below)
       Each library is tried from your own /libs folder first, then
       from a CDN. A CDN needs internet. Put the files in /libs to
       work offline (OCR also needs its language data, see ocr).

       WHAT NEEDS INTERNET (unless you host the files yourself)
       PDF.js, Mammoth.js, Tesseract.js and the OCR language data.
       TXT files need nothing.
    ========================================================= */

    const MC_DOC = {
        maxFiles: 5,
        maxBytes: 25 * 1024 * 1024,          /* 25 MB per file */
        maxChars: 2000000,                   /* text kept per document */
        ocrMaxPages: 40,
        ocrScale: 2,
        scannedCharsPerPage: 30,             /* below this a PDF page counts as "no text" */
        ocr: {
            lang: "eng",
            /* To run OCR offline, copy the Tesseract worker, core and eng.traineddata.gz
               into your project, then set useLocal to true and adjust the paths. */
            useLocal: false,
            workerPath: "libs/tesseract/worker.min.js",
            corePath: "libs/tesseract/",
            langPath: "libs/tesseract/lang"
        },
        libs: {
            pdf: {
                global: "pdfjsLib",
                label: "PDF reader (PDF.js)",
                urls: ["libs/pdf.min.js", "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"],
                workers: ["libs/pdf.worker.min.js", "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"],
                help: "Check your internet connection, or add libs/pdf.min.js and libs/pdf.worker.min.js to your project."
            },
            mammoth: {
                global: "mammoth",
                label: "Word reader (Mammoth.js)",
                urls: ["libs/mammoth.browser.min.js", "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"],
                help: "Check your internet connection, or add libs/mammoth.browser.min.js to your project."
            },
            tesseract: {
                global: "Tesseract",
                label: "OCR engine (Tesseract.js)",
                urls: ["libs/tesseract.min.js", "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js"],
                help: "Check your internet connection, or host Tesseract.js yourself (see MC_DOC.ocr)."
            }
        }
    };

    const docState = { docs: [], nextId: 1, busy: false };


    /* ---------- small helpers ---------- */

    function docFmtSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1024 / 1024).toFixed(1) + " MB";
    }

    function docFail(message) {
        const e = new Error(message);
        e.user = true;
        return e;
    }

    function docCancelled() {
        const e = new Error("cancelled");
        e.cancelled = true;
        return e;
    }

    function docCheck(doc) {
        if (doc.cancelled) throw docCancelled();
    }

    const docYield = () => new Promise(resolve => setTimeout(resolve, 0));

    function docClean(text) {
        return String(text)
            .replace(/\r\n?/g, "\n")
            .replace(/\u00a0/g, " ")
            .replace(/\f/g, "\n\n")
            .replace(/[ \t]+\n/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
    }


    /* ---------- loading libraries ---------- */

    const docLibCache = {};

    function docLoadScript(url) {
        return new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = url;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => { s.remove(); reject(new Error("Could not load " + url)); };
            document.head.appendChild(s);
        });
    }

    function docEnsureLib(key) {
        const cfg = MC_DOC.libs[key];
        if (docLibCache[key]) return docLibCache[key];

        docLibCache[key] = (async () => {
            if (window[cfg.global]) return 0;
            for (let i = 0; i < cfg.urls.length; i++) {
                try {
                    await docLoadScript(cfg.urls[i]);
                    if (window[cfg.global]) {
                        if (key === "pdf") window.pdfjsLib.GlobalWorkerOptions.workerSrc = cfg.workers[i];
                        return i;
                    }
                } catch (e) { /* try the next source */ }
            }
            throw docFail(`The ${cfg.label} could not be loaded. ${cfg.help}`);
        })();

        docLibCache[key].catch(() => { delete docLibCache[key]; });
        return docLibCache[key];
    }


    /* ---------- TXT ---------- */

    async function docReadTxt(file) {
        const buf = await file.arrayBuffer();
        let text = new TextDecoder("utf-8").decode(buf);
        const bad = (text.match(/\uFFFD/g) || []).length;
        if (bad > 3 && bad / Math.max(text.length, 1) > 0.01) {
            try { text = new TextDecoder("windows-1252").decode(buf); } catch (e) { /* keep utf-8 */ }
        }
        if (/\u0000/.test(text.slice(0, 2000))) throw docFail("This file looks like a binary file, not plain text.");
        return { text, pages: null, pageTexts: null, notes: [] };
    }


    /* ---------- DOCX ---------- */

    function docHtmlToText(html) {
        const parsed = new DOMParser().parseFromString(html, "text/html");
        const out = [];
        const own = el => {
            const c = el.cloneNode(true);
            c.querySelectorAll("ul, ol").forEach(n => n.remove());
            return c.textContent.replace(/\s+/g, " ").trim();
        };

        function walk(parent, depth) {
            Array.from(parent.children).forEach(el => {
                const tag = el.tagName.toLowerCase();
                if (/^h[1-6]$/.test(tag)) {
                    out.push("", el.textContent.replace(/\s+/g, " ").trim(), "");
                } else if (tag === "p") {
                    const t = el.textContent.replace(/\s+/g, " ").trim();
                    out.push(t === "" ? "" : t);
                } else if (tag === "ol" || tag === "ul") {
                    let i = 0;
                    Array.from(el.children).forEach(li => {
                        if (li.tagName.toLowerCase() !== "li") return;
                        i++;
                        const marker = tag === "ul" ? "•"
                            : depth === 0 ? i + "." : "(" + String.fromCharCode(96 + ((i - 1) % 26) + 1) + ")";
                        out.push(marker + " " + own(li));
                        walk(li, depth + 1);
                    });
                    out.push("");
                } else if (tag === "table") {
                    out.push("");
                    Array.from(el.querySelectorAll("tr")).forEach(tr => {
                        const cells = Array.from(tr.children).map(c => c.textContent.replace(/\s+/g, " ").trim());
                        if (cells.some(Boolean)) out.push(cells.join(" | "));
                    });
                    out.push("");
                } else {
                    walk(el, depth);
                }
            });
        }

        walk(parsed.body, 0);
        return { text: out.join("\n"), images: parsed.querySelectorAll("img").length };
    }

    async function docReadDocx(doc, file) {
        await docEnsureLib("mammoth");
        docCheck(doc);
        const buffer = await file.arrayBuffer();
        let result;
        try {
            result = await window.mammoth.convertToHtml(
                { arrayBuffer: buffer },
                { convertImage: window.mammoth.images.imgElement(() => ({ src: "" })) }
            );
        } catch (e) {
            throw docFail("This Word file could not be opened. It may be corrupted, password-protected, or an old .doc file saved with a .docx name.");
        }
        docCheck(doc);
        const converted = docHtmlToText(result.value || "");
        const notes = [];
        if (converted.images) notes.push(`${converted.images} image${converted.images === 1 ? "" : "s"} in the document were skipped (pictures, graphs and scanned content are not read).`);
        if (/\n\d+\.\s/.test(converted.text)) notes.push("Automatic Word numbering is rebuilt from the list structure. Check that question numbers match your original.");
        return { text: converted.text, pages: null, pageTexts: null, notes };
    }


    /* ---------- PDF ---------- */

    function docPdfItemsToText(items) {
        const lines = [];
        let cur = null;

        items.forEach(it => {
            if (typeof it.str !== "string") return;
            const x = it.transform ? it.transform[4] : 0;
            const y = it.transform ? it.transform[5] : 0;
            if (!cur || Math.abs(cur.y - y) > 2.5) {
                cur = { y, parts: [] };
                lines.push(cur);
            }
            if (it.str !== "") cur.parts.push({ x, w: it.width || 0, s: it.str });
        });

        const built = lines.map(line => {
            const parts = line.parts.sort((a, b) => a.x - b.x);
            let s = "";
            parts.forEach((p, i) => {
                if (i > 0) {
                    const prev = parts[i - 1];
                    const gap = p.x - (prev.x + prev.w);
                    if (gap > 18) s += " | ";
                    else if (gap > 1.2 && !/\s$/.test(s) && !/^\s/.test(p.s)) s += " ";
                }
                s += p.s;
            });
            return { y: line.y, text: s.replace(/[ \t]+/g, " ").trim() };
        }).filter(l => l.text !== "");

        /* blank line where the vertical gap is clearly bigger than normal line spacing */
        const diffs = [];
        for (let i = 1; i < built.length; i++) {
            const d = built[i - 1].y - built[i].y;
            if (d > 0) diffs.push(d);
        }
        diffs.sort((a, b) => a - b);
        const typical = diffs.length ? diffs[Math.floor(diffs.length / 2)] : 12;

        const out = [];
        built.forEach((l, i) => {
            if (i > 0) {
                const d = built[i - 1].y - l.y;
                if (d > typical * 1.7) out.push("");
            }
            out.push(l.text);
        });
        return out.join("\n");
    }

    async function docOcrPages(doc, pdf, pageNumbers, pageTexts) {
        await docEnsureLib("tesseract");
        const T = window.Tesseract;
        const opts = {
            logger: m => {
                if (m && m.status === "recognizing text" && typeof m.progress === "number") {
                    doc.progress = (doc.ocrDone + m.progress) / Math.max(doc.ocrTotal, 1);
                    docRenderTray();
                }
            }
        };
        if (MC_DOC.ocr.useLocal) {
            opts.workerPath = MC_DOC.ocr.workerPath;
            opts.corePath = MC_DOC.ocr.corePath;
            opts.langPath = MC_DOC.ocr.langPath;
        }

        let worker;
        try {
            worker = await T.createWorker(MC_DOC.ocr.lang, 1, opts);
        } catch (e) {
            throw docFail("The OCR engine started but its language data could not be loaded. This needs internet (or local OCR files, see MC_DOC.ocr).");
        }

        try {
            for (const num of pageNumbers) {
                docCheck(doc);
                doc.status = "ocr";
                doc.detail = `Reading scanned page ${doc.ocrDone + 1} of ${doc.ocrTotal}`;
                docRenderTray();

                const page = await pdf.getPage(num);
                const viewport = page.getViewport({ scale: MC_DOC.ocrScale });
                const canvas = document.createElement("canvas");
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;

                const res = await worker.recognize(canvas);
                pageTexts[num - 1] = (res && res.data && res.data.text) ? res.data.text : "";

                canvas.width = 0;
                canvas.height = 0;
                page.cleanup();
                doc.ocrDone++;
                await docYield();
            }
        } finally {
            try { await worker.terminate(); } catch (e) { /* ignore */ }
        }
    }

    async function docReadPdf(doc, file) {
        await docEnsureLib("pdf");
        docCheck(doc);

        const buffer = await file.arrayBuffer();
        let pdf;
        try {
            pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
        } catch (e) {
            if (e && e.name === "PasswordException") throw docFail("This PDF is password-protected. Remove the password and upload it again.");
            throw docFail("This PDF could not be opened. It may be corrupted or incomplete.");
        }

        const notes = [];
        const total = pdf.numPages;
        const pageTexts = new Array(total).fill("");

        try {
            for (let p = 1; p <= total; p++) {
                docCheck(doc);
                doc.detail = `Reading page ${p} of ${total}`;
                doc.progress = p / total;
                docRenderTray();

                const page = await pdf.getPage(p);
                const content = await page.getTextContent();
                pageTexts[p - 1] = docPdfItemsToText(content.items);
                page.cleanup();
                if (p % 5 === 0) await docYield();
            }

            /* pages with (almost) no text are probably scans */
            const weak = [];
            pageTexts.forEach((t, i) => { if (t.replace(/\s/g, "").length < MC_DOC.scannedCharsPerPage) weak.push(i + 1); });

            if (weak.length) {
                const wholeDocScanned = weak.length === total;
                const toRead = weak.slice(0, MC_DOC.ocrMaxPages);
                doc.ocrTotal = toRead.length;
                doc.ocrDone = 0;
                doc.progress = 0;

                try {
                    await docOcrPages(doc, pdf, toRead, pageTexts);
                    doc.usedOcr = true;
                    notes.push(`OCR (text recognition) was used on ${toRead.length} page${toRead.length === 1 ? "" : "s"}. OCR can misread digits, brackets, minus signs and table columns, so check every figure against your original.`);
                    if (weak.length > toRead.length) notes.push(`Only the first ${MC_DOC.ocrMaxPages} scanned pages were read with OCR (${weak.length - toRead.length} more were skipped).`);
                } catch (e) {
                    if (e.cancelled) throw e;
                    if (wholeDocScanned) throw docFail("This PDF has no selectable text (it looks scanned) and OCR could not run: " + (e.user ? e.message : "unknown error"));
                    notes.push("Some pages have no selectable text and OCR could not run: " + (e.user ? e.message : "unknown error"));
                }
            }
        } finally {
            try { await pdf.destroy(); } catch (e) { /* ignore */ }
        }

        notes.push("Tables are rebuilt from text positions (columns are shown with | ), and equations, graphs and pictures are not understood. Check figures and layouts against your original.");
        return { text: pageTexts.join("\n\n"), pages: total, pageTexts, notes };
    }


    /* ---------- question parsing ---------- */

    function docMarks(text) {
        const m = String(text).match(/\(\s*(\d{1,3})\s*marks?\s*\)|\[\s*(\d{1,3})\s*(?:marks?)?\s*\]|\b(\d{1,3})\s*marks?\b|\(\s*(\d{1,2})\s*\)\s*$/im);
        return m ? parseInt(m[1] || m[2] || m[3] || m[4], 10) : null;
    }

    function docParseQuestions(raw) {
        const lines = String(raw).split("\n");
        const reQ = /^\s*(?:question|q)\s*\.?\s*(\d+(?:\.\d+)*)\s*[.:)\-–—]?\s*(.*)$/i;
        const reDotted = /^\s*(\d+(?:\.\d+)+)[.)]?\s+(?=[A-Za-z(])(.*)$/;
        const reNum = /^\s*(\d{1,2})[.)]\s+(.*)$/;
        const reSub = /^\s*\(([a-z]|[ivx]{1,4})\)\s*(.*)$|^\s*([a-z])[.)]\s+(.*)$/;

        const explicit = lines.filter(l => reQ.test(l)).length >= 2;

        const nodes = [];
        const byLabel = new Map();
        let preamble = "";
        let cur = null, lastNum = null;

        function addNode(label, text, parent, isSub) {
            const node = { label, text: text || "", parent: parent || null, children: [], isSub: !!isSub, order: nodes.length };
            nodes.push(node);
            if (!byLabel.has(label.toLowerCase())) byLabel.set(label.toLowerCase(), node);
            if (parent) parent.children.push(node);
            return node;
        }

        function parentFor(label) {
            let l = label;
            while (l.includes(".")) {
                l = l.replace(/\.\d+$/, "");
                const p = byLabel.get(l.toLowerCase());
                if (p) return p;
            }
            return null;
        }

        lines.forEach(line => {
            let m;
            if ((m = reQ.exec(line))) {
                const label = m[1].replace(/\.$/, "");
                cur = lastNum = addNode(label, m[2], parentFor(label), false);
            } else if ((m = reDotted.exec(line))) {
                const label = m[1].replace(/\.$/, "");
                cur = lastNum = addNode(label, m[2], parentFor(label), false);
            } else if (!explicit && (m = reNum.exec(line))) {
                cur = lastNum = addNode(m[1], m[2], null, false);
            } else if (lastNum && (m = reSub.exec(line)) && ((m[1] || m[3]).length <= 4)) {
                const token = (m[1] || m[3]).toLowerCase();
                const rest = m[1] !== undefined ? m[2] : m[4];
                const base = lastNum.isSub ? lastNum.parent : lastNum;
                cur = addNode(`${base.label}(${token})`, rest, base, true);
            } else if (cur) {
                cur.text += (cur.text || line.trim() ? "\n" : "") + line;
            } else if (line.trim()) {
                preamble += line + "\n";
            }
        });

        nodes.forEach(n => { n.text = n.text.trim(); });

        const ancestorsText = node => {
            const chain = [];
            for (let p = node.parent; p; p = p.parent) chain.unshift(p.text);
            return chain.filter(Boolean).join("\n");
        };
        const marksFor = node => {
            let m = docMarks(node.text);
            for (let p = node.parent; !m && p; p = p.parent) m = docMarks(p.text);
            return m;
        };

        const leaves = nodes
            .filter(n => n.children.length === 0 && n.text.replace(/\(\s*\d+\s*marks?\s*\)|\[\s*\d+\s*(?:marks?)?\s*\]/gi, "").trim() !== "")
            .map(n => ({
                label: n.label,
                text: n.text,
                context: (ancestorsText(n) + (preamble.trim() ? "\n" + preamble.trim() : "")).trim(),
                marks: marksFor(n),
                node: n,
                order: n.order
            }));

        return { nodes, byLabel, leaves, preamble: preamble.trim() };
    }

    function docLeavesUnder(parsed, node) {
        return parsed.leaves.filter(l => {
            for (let n = l.node; n; n = n.parent) if (n === node) return true;
            return false;
        });
    }

    function docNormLabel(label) {
        return String(label).toLowerCase().replace(/\s+/g, "").replace(/\.$/, "");
    }

    function docFindLeaves(doc, label) {
        const node = doc.parsed.byLabel.get(docNormLabel(label));
        if (!node) return null;
        return node.children.length ? docLeavesUnder(doc.parsed, node) : doc.parsed.leaves.filter(l => l.node === node);
    }

    function docEndOrder(node) {
        let max = node.order;
        node.children.forEach(c => { max = Math.max(max, docEndOrder(c)); });
        return max;
    }


    /* ---------- searching inside a document ---------- */

    const DOC_STOP = new Set(("a an and are as at be by for from has have how i in is it its of on or that the this to was were what when where which who why will with you your me my " +
        "document file pdf uploaded upload attached according using only based answer explain paragraph passage section tell about please give show can could would does do not").split(" "));

    const docWords = text => (String(text).toLowerCase().match(/[a-z0-9']+/g) || []);

    function docChunks(doc) {
        const chunks = [];
        const add = (text, page) => {
            const t = text.trim();
            if (t.length > 20) chunks.push({ text: t, page: page || null, words: new Set(docWords(t).filter(w => !DOC_STOP.has(w))) });
        };
        const pieces = doc.pageTexts && doc.pageTexts.length
            ? doc.pageTexts.map((t, i) => ({ t, page: i + 1 }))
            : [{ t: doc.text, page: null }];

        pieces.forEach(piece => {
            let buf = "";
            piece.t.split(/\n{2,}/).forEach(par => {
                if ((buf + "\n\n" + par).length > 700 && buf) { add(buf, piece.page); buf = par; }
                else buf = buf ? buf + "\n\n" + par : par;
                while (buf.length > 1400) {
                    const cut = buf.lastIndexOf(". ", 900);
                    const at = cut > 200 ? cut + 1 : 900;
                    add(buf.slice(0, at), piece.page);
                    buf = buf.slice(at);
                }
            });
            add(buf, piece.page);
        });
        return chunks;
    }

    function docSearch(doc, query, limit) {
        const terms = Array.from(new Set(docWords(query).filter(w => !DOC_STOP.has(w) && w.length > 1)));
        if (!terms.length) return [];
        const df = {};
        terms.forEach(t => { df[t] = doc.chunks.filter(c => c.words.has(t)).length; });

        return doc.chunks.map((c, i) => {
            let score = 0;
            terms.forEach(t => { if (c.words.has(t)) score += 1 + 1 / (1 + df[t]); });
            return { chunk: c, score: score / Math.sqrt(terms.length), index: i };
        })
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit || 4)
            .sort((a, b) => a.index - b.index);
    }

    function docSentences(text) {
        return String(text).replace(/\n+/g, " ").split(/(?<=[.!?])\s+(?=[A-Z0-9(])/).map(s => s.trim()).filter(s => s.length >= 40 && s.length <= 320);
    }

    function docKeySentences(text, count) {
        const sentences = docSentences(text);
        if (!sentences.length) return [];
        const freq = {};
        docWords(text).forEach(w => { if (!DOC_STOP.has(w) && w.length > 3) freq[w] = (freq[w] || 0) + 1; });
        const scored = sentences.map((s, i) => {
            const ws = docWords(s).filter(w => freq[w]);
            const score = ws.reduce((a, w) => a + freq[w], 0) / Math.sqrt(Math.max(ws.length, 1));
            return { s, i, score };
        });
        return scored.sort((a, b) => b.score - a.score).slice(0, count).sort((a, b) => a.i - b.i).map(x => x.s);
    }

    function docOutline(text) {
        const out = [];
        text.split("\n").forEach(line => {
            const t = line.trim();
            if (!t || t.length > 90) return;
            const caps = t.length > 4 && t === t.toUpperCase() && /[A-Z]{3}/.test(t);
            if (caps || /^(section|part|chapter|unit|topic|question)\s+[\dA-Z]+\b/i.test(t)) {
                if (!out.includes(t)) out.push(t);
            }
        });
        return out.slice(0, 14);
    }


    /* ---------- answering questions ---------- */

    function docCleanMarks(t) {
        return String(t).replace(/\(\s*\d+\s*marks?\s*\)|\[\s*\d+\s*(?:marks?)?\s*\]/gi, " ");
    }

    function docQuestionLooksBroken(text) {
        const body = docCleanMarks(text).trim();
        if (body.length < 10) return "the question text is very short or empty";
        const letters = (body.match(/[A-Za-z0-9]/g) || []).length;
        if (letters / body.length < 0.55) return "the text contains many unreadable symbols";
        return null;
    }

    async function docAnswerLeaf(doc, q, opts) {
        const marks = q.marks ? ` <small>[${q.marks} mark${q.marks === 1 ? "" : "s"}]</small>` : "";
        const header = opts.exam
            ? `<h3>Question ${escapeHtml(q.label)}${marks}</h3><p><strong>Answer:</strong></p>`
            : `<h3>Question ${escapeHtml(q.label)}${marks}</h3>`;

        const preview = docCleanMarks(q.text).replace(/\s+/g, " ").trim();
        const quoted = `<p><em>${escapeHtml(preview.length > 260 ? preview.slice(0, 260) + "…" : preview)}</em></p>`;

        const broken = docQuestionLooksBroken(q.text);
        if (broken) {
            return {
                status: "missing",
                html: header + quoted + `<p><strong>This question may be incomplete or unreadable:</strong> ${escapeHtml(broken)}. Please check it in your original document. I have not guessed the missing part.</p>`
            };
        }

        const full = docCleanMarks((q.context ? q.context + "\n" : "") + q.text) + (opts.answersOnly ? "\nanswers only" : "");
        const own = docCleanMarks(q.text) + (opts.answersOnly ? "\nanswers only" : "");

        /* 1) accounting engine, 2) economics engine (each only claims what it can fully solve) */
        const engines = [
            ["accounting", t => mcAcct.answerHtml(t)],
            ["economics", t => MC_ECONOMICS_ENGINE.answerHtml(t)]
        ];
        for (const [, run] of engines) {
            for (const text of [full, own]) {
                try {
                    const html = run(text);
                    if (html && !/could not solve this part/i.test(html)) {
                        return { status: "solved", html: header + quoted + html };
                    }
                } catch (e) { /* try the next engine */ }
            }
        }

        /* 3) original solvers (VAT, WACC, NPV, equations, maths ...) and study notes */
        const r = await mcAnswerOne({ label: q.label, text: q.text, context: q.context, marks: q.marks }, opts);
        const html = r.html.replace(/^<h3>.*?<\/h3>(<p><strong>Answer:<\/strong><\/p>)?/, "");
        return { status: r.status, html: header + quoted + html };
    }

    async function docAnswerBatch(doc, opts) {
        const m = doc.mcObj;
        const start = m.next;
        const end = Math.min(start + mcBatchSize, m.items.length);
        const batch = m.items.slice(start, end);
        const counts = { solved: 0, ai: 0, notes: 0, missing: 0, unsupported: 0 };

        let html = batch.length === 1
            ? ""
            : `<h2>Answers ${escapeHtml(batch[0].label)} to ${escapeHtml(batch[batch.length - 1].label)}</h2>`;

        for (const q of batch) {
            const r = await docAnswerLeaf(doc, q, opts);
            counts[r.status] = (counts[r.status] || 0) + 1;
            html += r.html;
            await docYield();
        }
        m.next = end;

        html += `<hr><p><em>From "${escapeHtml(doc.name)}": covered ${end} of ${m.items.length} question${m.items.length === 1 ? "" : "s"}. `;
        html += `Worked from the figures: ${counts.solved}, general notes only: ${counts.notes}, need more info: ${counts.missing}, not answerable here: ${counts.unsupported}.</em></p>`;
        if (counts.notes || counts.unsupported) {
            html += `<p><em>"General notes only" and "not answerable" mean the offline engines could not work that question out from its own figures or wording. Please do not treat those as full answers.</em></p>`;
        }
        if (end < m.items.length) html += `<p><strong>Say "continue" for questions ${escapeHtml(m.items[end].label)} to ${escapeHtml(m.items[m.items.length - 1].label)}.</strong></p>`;
        return html;
    }

    function docSelect(doc, leaves) {
        doc.mcObj.items = leaves;
        doc.mcObj.next = 0;
        mcDoc = doc.mcObj;
    }


    /* ---------- other document answers ---------- */

    function docSummaryHtml(doc) {
        const words = docWords(doc.text).length;
        const q = doc.parsed.leaves;
        const totalMarks = q.reduce((a, x) => a + (x.marks || 0), 0);
        const outline = docOutline(doc.text);
        const key = docKeySentences(doc.text, 5);

        let html = `<h2>Summary of ${escapeHtml(doc.name)}</h2><ul>`;
        if (doc.pages) html += `<li>${doc.pages} page${doc.pages === 1 ? "" : "s"}</li>`;
        html += `<li>About ${words.toLocaleString("en-ZA")} words</li>`;
        if (q.length) html += `<li>${q.length} question${q.length === 1 ? "" : "s"} found${totalMarks ? `, ${totalMarks} marks in total` : ""}</li>`;
        html += `</ul>`;

        if (outline.length) html += `<h3>Headings found</h3><ul>${outline.map(o => `<li>${escapeHtml(o)}</li>`).join("")}</ul>`;
        if (key.length) html += `<h3>Key sentences</h3><ul>${key.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>`;
        if (!key.length && !q.length) html += `<p>I could not find enough sentence text to summarise.</p>`;

        html += `<p><em>This is an extractive summary: the most important sentences are picked from the document, not rewritten. Ask "list the questions" or "explain the paragraph about ..." for more.</em></p>`;
        return html;
    }

    function docListHtml(doc) {
        const q = doc.parsed.leaves;
        if (!q.length) return docNoQuestionsHtml(doc);
        let html = `<h2>Questions in ${escapeHtml(doc.name)}</h2><ul>`;
        q.forEach(x => {
            const t = docCleanMarks(x.text).replace(/\s+/g, " ").trim();
            html += `<li><strong>${escapeHtml(x.label)}</strong>${x.marks ? ` [${x.marks}]` : ""} ${escapeHtml(t.length > 90 ? t.slice(0, 90) + "…" : t)}</li>`;
        });
        return html + `</ul><p>Ask for any of them, for example "Answer Question ${escapeHtml(q[0].label)} in full", or say "answer all questions".</p>`;
    }

    function docNoQuestionsHtml(doc) {
        const head = doc.text.split("\n").filter(l => l.trim()).slice(0, 4).join(" / ");
        return `<p>I could not find numbered questions in <strong>${escapeHtml(doc.name)}</strong>. Questions need labels such as "Question 1", "1.", "2.1" or "(a)".</p>` +
            `<p>The text I extracted starts with: <em>${escapeHtml(head.length > 200 ? head.slice(0, 200) + "…" : head)}</em></p>` +
            `<p>You can still ask me to summarise it, or to explain a paragraph or topic from it.</p>`;
    }

    function docShowHtml(doc, leaves, label) {
        let html = "";
        leaves.forEach(q => {
            html += `<h3>Question ${escapeHtml(q.label)}${q.marks ? ` <small>[${q.marks} mark${q.marks === 1 ? "" : "s"}]</small>` : ""}</h3>`;
            if (q.context && leaves.length === 1) html += `<p><em>${escapeHtml(q.context.length > 500 ? q.context.slice(0, 500) + "…" : q.context)}</em></p>`;
            html += `<p>${escapeHtml(q.text).replace(/\n/g, "<br>")}</p>`;
        });
        return html + `<p><em>Shown exactly as extracted from "${escapeHtml(doc.name)}". If something looks wrong, the original may contain tables, equations or pictures I cannot read.</em></p>`;
    }

    function docExcerptsHtml(doc, query, title, simple) {
        const hits = docSearch(doc, query, simple ? 1 : 4);
        if (!hits.length) {
            return `<p>I could not find anything about that in <strong>${escapeHtml(doc.name)}</strong>. I only used the document, so I am not adding outside information. Try different words from the document.</p>`;
        }
        let html = `<h2>${escapeHtml(title)}</h2>`;
        hits.forEach(h => {
            const text = h.chunk.text.length > 900 ? h.chunk.text.slice(0, 900) + "…" : h.chunk.text;
            html += `<p>${escapeHtml(text).replace(/\n/g, "<br>")}</p>` +
                `<p><small>${h.chunk.page ? "Page " + h.chunk.page : "From the document"}</small></p>`;
        });

        if (simple) {
            const sentences = docSentences(hits[0].chunk.text);
            const notes = searchAllSubjects(hits[0].chunk.text, 12).slice(0, 2);
            html += `<h3>In shorter pieces</h3><ul>` +
                (sentences.length ? sentences.map(s => `<li>${escapeHtml(s)}</li>`).join("") : `<li>${escapeHtml(hits[0].chunk.text.slice(0, 300))}</li>`) + `</ul>`;
            if (notes.length) {
                html += `<h3>Terms explained from my study notes</h3>`;
                notes.forEach(n => { html += `<p><strong>${escapeHtml(n.item.topic)}:</strong> ${escapeHtml(n.item.information)}</p>`; });
            }
            html += `<p><em>I can split a paragraph into shorter pieces and explain the terms I have notes on, but I cannot rewrite it in my own words without an AI model.</em></p>`;
        } else {
            html += `<p><em>These are the passages of "${escapeHtml(doc.name)}" that best match your question. Only the document was used.</em></p>`;
        }
        return html;
    }


    /* ---------- choosing what the learner asked ---------- */

    const DOC_LBL = "(\\d+(?:\\.\\d+)*(?:\\s*\\(\\s*[a-z]{1,4}\\s*\\))?)";

    function docPick(t, ready) {
        const n = t.match(/\b(?:document|file|pdf)\s*(?:no\.?|number)?\s*(\d)\b/);
        if (n && ready[parseInt(n[1], 10) - 1]) return ready[parseInt(n[1], 10) - 1];
        if (/\bfirst (document|file|pdf)\b/.test(t)) return ready[0];
        if (/\bsecond (document|file|pdf)\b/.test(t) && ready[1]) return ready[1];
        const hit = ready.find(d => {
            const base = d.name.replace(/\.[^.]+$/, "").toLowerCase();
            return base.length > 3 && t.includes(base);
        });
        return hit || ready[ready.length - 1];
    }

    function docHandle(question) {
        const raw = String(question || "");
        const t = raw.toLowerCase().trim();
        if (!t) return null;

        const ready = docState.docs.filter(d => d.status === "ready");
        const working = docState.docs.some(d => ["queued", "reading", "ocr"].includes(d.status));
        const refRx = new RegExp("\\b(?:questions?|qs?|nos?\\.?|number)\\s*\\.?\\s*" + DOC_LBL, "i");
        const mentionsDoc = /\b(uploaded|attached|attachment)\b|\b(my|the|this|that) (document|file|pdf|paper|text|passage|memo)\b|\b(document|file|pdf) (only|says|states)\b/.test(t);
        const wantsDocWork = refRx.test(t) || /\bsummari[sz]e\b|\b(all|every) (the )?questions\b|\blist (all )?(the )?questions\b/.test(t);

        if (!ready.length) {
            if (working && (mentionsDoc || wantsDocWork)) return `<p>Your document is still being read. I'll be ready in a moment, then ask me again.</p>`;
            if (mentionsDoc && /\b(answer|summari[sz]e|questions?|explain|read)\b/.test(t) && !mcDoc.items.length) {
                return `<p>I don't have a document yet. Tap the paperclip next to the message box to upload a PDF, Word (.docx) or text (.txt) file, then ask me about it.</p>`;
            }
            return null;
        }

        const doc = docPick(t, ready);
        const ownsMc = mcDoc === doc.mcObj;
        const opts = Object.assign(mcOptions(raw), {});

        /* "continue" through a long answer set */
        if (ownsMc && mcDoc.next < mcDoc.items.length && /^(continue|next|go on|carry on|more)\b/.test(t)) {
            return mcPlaceholder(docAnswerBatch(doc, mcDoc.lastOpts || opts), "Working through the questions");
        }

        if (!(ownsMc || mentionsDoc)) {
            /* a pasted document owns "question N" right now; unrelated chat goes to the normal engines */
            if (!/\bsummari[sz]e (the |this |my )?(document|file|pdf)\b/.test(t)) return null;
        }

        /* summary */
        if (/\bsummari[sz]e\b|\bsummary\b|what is (this|the) (document|file|pdf) about/.test(t) && (mentionsDoc || t.split(/\s+/).length <= 6)) {
            return docSummaryHtml(doc);
        }

        /* list the questions */
        if (/\b(list|show|display|what are|give me)\b.*\bquestions\b/.test(t) && !refRx.test(t) && !/\banswer|solve\b/.test(t)) {
            return docListHtml(doc);
        }

        /* explain a paragraph in simple words */
        if (/\b(paragraph|passage|section|sentence|part)\b/.test(t) && /\b(explain|simplify|simple|plain|easy|meaning|mean)\b/.test(t) && !refRx.test(t)) {
            return docExcerptsHtml(doc, raw, "The paragraph from your document", true);
        }

        /* all questions */
        if (/\b(answer|solve|do|work(?: out)?|complete|give)\b/.test(t) &&
            (/\b(all|every|each|whole|entire)\b.*\bquestions?\b/.test(t) || /\b(whole|entire) (document|paper|file)\b/.test(t) || /\banswer (the )?(document|paper|file)\b/.test(t))) {
            if (!doc.parsed.leaves.length) return docNoQuestionsHtml(doc);
            docSelect(doc, doc.parsed.leaves);
            mcDoc.lastOpts = opts;
            return mcPlaceholder(docAnswerBatch(doc, opts), "Working through the questions");
        }

        /* specific question(s) */
        if (refRx.test(t)) {
            if (!doc.parsed.leaves.length) return docNoQuestionsHtml(doc);

            const range = t.match(new RegExp("\\b(?:questions?|qs?)\\s*\\.?\\s*" + DOC_LBL + "\\s*(?:to|-|–|—|until|through|thru)\\s*(?:questions?\\s*)?" + DOC_LBL, "i"));
            let leaves = null, missing = [];

            if (range) {
                const a = doc.parsed.byLabel.get(docNormLabel(range[1]));
                const b = doc.parsed.byLabel.get(docNormLabel(range[2]));
                if (a && b) {
                    const endOrder = docEndOrder(b);
                    leaves = doc.parsed.leaves.filter(l => l.order >= Math.min(a.order, b.order) && l.order <= Math.max(endOrder, docEndOrder(a)));
                } else {
                    if (!a) missing.push(range[1]);
                    if (!b) missing.push(range[2]);
                }
            } else {
                const after = t.slice(t.search(/\b(?:questions?|qs?|nos?\.?|number)\b/));
                const labels = (after.match(new RegExp(DOC_LBL, "g")) || []).slice(0, 12);
                const found = [];
                labels.forEach(l => {
                    const got = docFindLeaves(doc, l);
                    if (got && got.length) got.forEach(x => { if (!found.includes(x)) found.push(x); });
                    else missing.push(l);
                });
                leaves = found.length ? found.sort((x, y) => x.order - y.order) : null;
            }

            if (!leaves || !leaves.length) {
                const avail = doc.parsed.leaves.map(l => l.label).slice(0, 40).join(", ");
                return `<p>I could not find question <strong>${escapeHtml(missing.join(", ") || "that")}</strong> in "${escapeHtml(doc.name)}".</p><p>The questions I found are: ${escapeHtml(avail)}${doc.parsed.leaves.length > 40 ? ", …" : ""}.</p>`;
            }

            const showOnly = /\b(show|read|display|print|repeat|what does|what is|tell me)\b/.test(t) &&
                !/\b(answer|solve|explain|calculate|work out|workings|complete|do)\b/.test(t);
            if (showOnly) return docShowHtml(doc, leaves);

            docSelect(doc, leaves);
            mcDoc.lastOpts = opts;
            let note = "";
            if (missing.length) note = `<p><em>I could not find: ${escapeHtml(missing.join(", "))}.</em></p>`;
            return mcPlaceholder(docAnswerBatch(doc, opts).then(h => note + h), "Working out the answer");
        }

        /* "using only the document", "according to the document" */
        if (/(only using|using only|according to|based on|from|in|use) (the |this |my )?(uploaded )?(document|file|pdf|text|passage|paper)|document only|only the document/.test(t)) {
            return docExcerptsHtml(doc, raw, "From your document", false);
        }

        return null;
    }

    const docPreviousGenerate = generateAnswer;
    generateAnswer = function (question) {
        try {
            const result = docHandle(question);
            if (result !== null) return result;
        } catch (e) {
            console.error("Document handler:", e);
        }
        return docPreviousGenerate(question);
    };


    /* ---------- processing an uploaded file ---------- */

    async function docProcess(doc, file) {
        try {
            doc.status = "reading";
            doc.detail = "Reading file";
            doc.progress = 0;
            docRenderTray();
            await docYield();

            const ext = (file.name.split(".").pop() || "").toLowerCase();
            const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
            const isPdf = head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46;
            const isZip = head[0] === 0x50 && head[1] === 0x4b;

            let result;
            if (ext === "pdf") {
                if (!isPdf) throw docFail("This file is named .pdf but is not a valid PDF. It may be corrupted or the wrong file type.");
                result = await docReadPdf(doc, file);
            } else if (ext === "docx") {
                if (!isZip) throw docFail("This file is named .docx but is not a valid Word document. It may be corrupted or an old .doc file.");
                result = await docReadDocx(doc, file);
            } else if (ext === "txt") {
                result = await docReadTxt(file);
            } else if (ext === "doc") {
                throw docFail("Old .doc files are not supported. Open it in Word and save it as .docx (or PDF), then upload it again.");
            } else {
                throw docFail("Unsupported file type. Please upload a PDF, Word (.docx) or text (.txt) file.");
            }
            docCheck(doc);

            let text = docClean(result.text);
            const notes = result.notes.slice();
            if (!text) {
                throw docFail(ext === "pdf"
                    ? "No readable text was found in this PDF."
                    : "This document is empty or contains no readable text (it may contain only pictures).");
            }
            if (text.length > MC_DOC.maxChars) {
                text = text.slice(0, MC_DOC.maxChars);
                notes.push("This document is very large, so only the first " + MC_DOC.maxChars.toLocaleString("en-ZA") + " characters were kept.");
            }

            doc.text = text;
            doc.pages = result.pages;
            doc.pageTexts = result.pageTexts
                ? result.pageTexts.map(p => docClean(p))
                : null;
            doc.notes = notes;
            doc.parsed = docParseQuestions(text);
            doc.chunks = docChunks(doc);
            doc.mcObj = {
                items: doc.parsed.leaves,
                next: 0,
                raw: text,
                preamble: doc.parsed.preamble,
                lastOpts: undefined
            };
            mcDoc = doc.mcObj;

            doc.status = "ready";
            doc.detail = "";
            doc.progress = 1;
            docRenderTray();
            addMessage(docReadyHtml(doc), "assistant");
        } catch (e) {
            if (e && e.cancelled) return;
            console.error("Document upload:", e);
            doc.status = "error";
            doc.progress = 0;
            doc.detail = e && e.user ? e.message : "This file could not be read.";
            docRenderTray();
            addMessage(`<p><strong>Could not read ${escapeHtml(doc.name)}.</strong></p><p>${escapeHtml(doc.detail)}</p>`, "assistant");
        }
    }

    function docReadyHtml(doc) {
        const q = doc.parsed.leaves;
        const totalMarks = q.reduce((a, x) => a + (x.marks || 0), 0);
        const words = docWords(doc.text).length;

        let html = `<h2>Document ready</h2><p><strong>${escapeHtml(doc.name)}</strong> (${docFmtSize(doc.size)})`;
        if (doc.pages) html += ` — ${doc.pages} page${doc.pages === 1 ? "" : "s"}`;
        html += ` — about ${words.toLocaleString("en-ZA")} words.</p>`;
        html += q.length
            ? `<p>I found <strong>${q.length}</strong> question${q.length === 1 ? "" : "s"}${totalMarks ? ` (${totalMarks} marks)` : ""}.</p>`
            : `<p>I did not find numbered questions, but you can ask me to summarise it or explain parts of it.</p>`;

        if (doc.notes.length) html += `<ul>${doc.notes.map(n => `<li>${escapeHtml(n)}</li>`).join("")}</ul>`;

        html += `<p>You can ask, for example:</p><ul>` +
            (q.length ? `<li>Answer Question ${escapeHtml(q[0].label)} in full</li><li>Answer all questions</li>` : "") +
            `<li>Summarise the document</li><li>Explain the paragraph about …</li></ul>`;
        return html;
    }

    async function docAddFiles(fileList) {
        const files = Array.from(fileList || []);
        if (!files.length) return;

        for (const file of files) {
            const active = docState.docs.filter(d => d.status !== "error").length;
            if (active >= MC_DOC.maxFiles) {
                addMessage(`<p>You can keep up to ${MC_DOC.maxFiles} documents at a time. Remove one with the ✕ button, then upload <strong>${escapeHtml(file.name)}</strong> again.</p>`, "assistant");
                continue;
            }
            if (!file.size) {
                addMessage(`<p><strong>${escapeHtml(file.name)}</strong> is empty (0 bytes).</p>`, "assistant");
                continue;
            }
            if (file.size > MC_DOC.maxBytes) {
                addMessage(`<p><strong>${escapeHtml(file.name)}</strong> is ${docFmtSize(file.size)}. The limit is ${docFmtSize(MC_DOC.maxBytes)} per file.</p>`, "assistant");
                continue;
            }

            const doc = {
                id: docState.nextId++,
                name: file.name,
                size: file.size,
                status: "queued",
                detail: "Waiting",
                progress: 0,
                cancelled: false,
                text: "", notes: [], parsed: { nodes: [], byLabel: new Map(), leaves: [], preamble: "" }, chunks: [], pageTexts: null, mcObj: null
            };
            docState.docs.push(doc);
            docRenderTray();

            /* one file at a time keeps memory use low */
            while (docState.busy) await new Promise(r => setTimeout(r, 150));
            if (doc.cancelled) continue;
            docState.busy = true;
            try { await docProcess(doc, file); } finally { docState.busy = false; }
        }
    }

    function docRemove(id) {
        const doc = docState.docs.find(d => d.id === id);
        if (!doc) return;
        doc.cancelled = true;
        docState.docs = docState.docs.filter(d => d.id !== id);
        if (doc.mcObj && mcDoc === doc.mcObj) mcDoc = { items: [], next: 0, raw: "" };
        const name = doc.name;
        doc.text = ""; doc.pageTexts = null; doc.chunks = []; doc.parsed = null; doc.mcObj = null;
        docRenderTray();
        if (doc.status === "ready") addMessage(`<p>Removed <strong>${escapeHtml(name)}</strong>. Its text has been cleared from this session.</p>`, "assistant");
    }


    /* ---------- interface (built with JavaScript, no HTML changes) ---------- */

    let docTray = null;

    function docRenderTray() {
        if (!docTray) return;
        docTray.textContent = "";
        docTray.style.display = docState.docs.length ? "flex" : "none";

        docState.docs.forEach(doc => {
            const chip = document.createElement("div");
            chip.className = "mc-doc-chip" + (doc.status === "error" ? " mc-doc-error" : "");

            const info = document.createElement("div");
            info.className = "mc-doc-info";

            const name = document.createElement("div");
            name.className = "mc-doc-name";
            name.textContent = doc.name;
            name.title = doc.name;

            const meta = document.createElement("div");
            meta.className = "mc-doc-meta";
            const statusText = doc.status === "ready" ? "Ready"
                : doc.status === "error" ? doc.detail
                    : doc.status === "queued" ? "Waiting"
                        : doc.detail || (doc.status === "ocr" ? "Reading scanned pages" : "Reading");
            meta.textContent = docFmtSize(doc.size) + " · " + statusText;

            info.appendChild(name);
            info.appendChild(meta);

            if (doc.status === "reading" || doc.status === "ocr") {
                const bar = document.createElement("div");
                bar.className = "mc-doc-bar";
                const fill = document.createElement("i");
                fill.style.width = Math.max(4, Math.min(100, Math.round((doc.progress || 0) * 100))) + "%";
                bar.appendChild(fill);
                info.appendChild(bar);
            }

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "mc-doc-remove";
            remove.setAttribute("aria-label", "Remove " + doc.name);
            remove.textContent = "✕";
            remove.addEventListener("click", () => docRemove(doc.id));

            chip.appendChild(info);
            chip.appendChild(remove);
            docTray.appendChild(chip);
        });
    }

    (function docBuildInterface() {
        if (document.getElementById("mcAttachButton")) return;

        const style = document.createElement("style");
        style.id = "mcDocStyle";
        style.textContent = `
            #mcDocTray{display:none;flex-wrap:wrap;gap:8px;padding:6px 12px;box-sizing:border-box;width:100%;max-width:100%}
            .mc-doc-chip{display:flex;align-items:center;gap:8px;max-width:100%;min-width:0;padding:6px 8px 6px 10px;border:1px solid rgba(128,128,128,.4);border-radius:12px;background:rgba(128,128,128,.1);font-size:13px;line-height:1.3;color:inherit}
            .mc-doc-chip.mc-doc-error{border-color:#d33;background:rgba(220,50,50,.1)}
            .mc-doc-info{min-width:0;display:flex;flex-direction:column;gap:2px}
            .mc-doc-name{max-width:210px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600}
            .mc-doc-meta{font-size:11.5px;opacity:.75;max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
            .mc-doc-bar{height:3px;border-radius:2px;background:rgba(128,128,128,.3);overflow:hidden;margin-top:2px}
            .mc-doc-bar i{display:block;height:100%;background:currentColor;opacity:.7;transition:width .2s}
            .mc-doc-remove{border:none;background:transparent;color:inherit;cursor:pointer;font-size:14px;line-height:1;padding:6px;border-radius:8px;min-width:28px;min-height:28px;opacity:.7}
            .mc-doc-remove:hover{opacity:1;background:rgba(128,128,128,.2)}
            #mcAttachButton{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex:0 0 auto;border:none;background:transparent;color:inherit;cursor:pointer;border-radius:50%;padding:0;opacity:.8}
            #mcAttachButton:hover{opacity:1;background:rgba(128,128,128,.18)}
            #mcAttachButton svg{width:20px;height:20px}
            body.mc-doc-dragging #chatArea{outline:2px dashed rgba(128,128,128,.6);outline-offset:-6px}
        `;
        document.head.appendChild(style);

        const input = document.createElement("input");
        input.type = "file";
        input.id = "mcDocInput";
        input.multiple = true;
        input.accept = ".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
        input.style.display = "none";
        document.body.appendChild(input);
        input.addEventListener("change", () => {
            const files = Array.from(input.files || []);
            input.value = "";
            docAddFiles(files);
        });

        const button = document.createElement("button");
        button.type = "button";
        button.id = "mcAttachButton";
        button.setAttribute("aria-label", "Attach a document (PDF, Word or text)");
        button.title = "Attach a document (PDF, Word or text)";
        button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;
        button.addEventListener("click", () => input.click());

        if (sendButton && sendButton.parentNode) sendButton.parentNode.insertBefore(button, sendButton);

        docTray = document.createElement("div");
        docTray.id = "mcDocTray";
        const composer = questionInput.parentElement;
        if (composer && composer.parentElement) composer.parentElement.insertBefore(docTray, composer);
        else document.body.appendChild(docTray);

        /* drag and drop onto the chat */
        const hasFiles = e => e.dataTransfer && Array.from(e.dataTransfer.types || []).includes("Files");
        document.addEventListener("dragover", e => {
            if (!hasFiles(e)) return;
            e.preventDefault();
            document.body.classList.add("mc-doc-dragging");
        });
        document.addEventListener("dragleave", e => {
            if (e.target === document.documentElement || !e.relatedTarget) document.body.classList.remove("mc-doc-dragging");
        });
        document.addEventListener("drop", e => {
            if (!hasFiles(e)) return;
            e.preventDefault();
            document.body.classList.remove("mc-doc-dragging");
            docAddFiles(e.dataTransfer.files);
        });
    })();

    if (typeof window !== "undefined") {
        window.MC_DOCUMENTS = {
            config: MC_DOC,
            list: () => docState.docs.map(d => ({ name: d.name, status: d.status, questions: d.parsed ? d.parsed.leaves.length : 0 })),
            parse: text => { const p = docParseQuestions(text); return p.leaves.map(l => ({ label: l.label, marks: l.marks, text: l.text })); }
        };
    }

    /* =========================================================
       END OF DOCUMENT UPLOAD ADD-ON
    ========================================================= */


    /* =========================================================
       TSHIVENḒA LANGUAGE LAYER (ADD-ON)

       HOW IT WORKS
       - The app starts in English and stays in English.
       - Tshivenḓa switches ON only when the user types in
         Tshivenḓa, for example:
             "Let's use Tshivenda"      "Explain in Tshivenda"
             "Ndaa"                     "Ndi matsheloni"
             "Ṱalutshedza depreciation" "Ni kha vhuḓi?"
       - Typing "English" / "Let's use English" switches back.
       - While ON: greetings, small talk, identity, help,
         date/time, buttons, the welcome screen, the "thinking"
         messages, headings and the app's own sentences are shown
         in Tshivenḓa. Tshivenḓa questions such as "Ṱalutshedza X"
         or "Tsumbo ya X" are understood by the study engine.
       - Topic names and the study notes themselves (Accounting,
         Economics, Maths content) are still written in English,
         because that content has not been translated yet.

       WHERE TO EDIT
       - V_EXACT / V_PATTERNS : screen text and headings
       - V_* arrays and the vDirect() function : chat replies
       Have a first-language Tshivenḓa speaker review the wording.
    ========================================================= */

    const vLang = {
        active: false,
        noteShown: false,
        prevLang: document.documentElement.getAttribute("lang") || "en",
        prevPlaceholder: null
    };


    /* ---------- text helpers ---------- */

    /* lower-case and remove diacritics, so ḓ ṋ ṱ ḽ ṅ match d n t l n */
    const vFold = s => String(s == null ? "" : s)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\u2019\u2018`\u00b4]/g, "'");

    const vNorm = s => vFold(s).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

    const vKey = s => String(s)
        .toLowerCase()
        .replace(/[\u2019\u2018]/g, "'")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/[.!?:]+$/, "");


    /* ---------- language words and commands ---------- */

    const V_LANG = "(?:tshi ?v(?:h)?enda|luvenda|venda|tshivhulani)";

    const V_CMD_PREFIX =
        "(?:use|speak|talk in|talk|switch to|change to|go to|reply in|answer in|respond in|" +
        "explain in|explain on|translate to|translate into|write in|in|into|on|to|" +
        "nga|kha ri shumise|shumisa|shumisani|amba nga|ambani nga)";

    const V_FILLER = new RegExp(
        "\\b(?:let'?s|lets|please|use|speak|talk|switch|change|explain|reply|answer|respond|to|in|into|on|" +
        "can|you|could|i|want|now|from|here|it|everything|all|turn|translate|and|then|the|app|this|chat|" +
        "language|ndi|khou|toda|kha|ri|shumise|shumisa|shumisani|nga|ni|amba|ambani|talutshedza|" +
        "talutshedzani|zwino|a|livhuwa)\\b", "g");

    function vLanguageCommand(raw, langPattern) {
        const folded = vFold(raw).replace(/university of venda/g, "university of vxnda");

        const prefix = new RegExp("\\b(?:" + V_CMD_PREFIX + ")\\s+" + langPattern + "\\b(?:\\s+(?:please|only))?", "i");
        const bare = new RegExp("^\\s*" + langPattern + "(?:\\s+(?:please|only))?\\s*[.!]*\\s*$", "i");
        const trailing = new RegExp("\\b" + langPattern + "\\s+(?:please|only)\\b", "i");

        const m = folded.match(prefix) || folded.match(bare) || folded.match(trailing);
        if (!m) return null;

        const rest = folded.replace(m[0], " ").replace(/vxnda/g, "venda").replace(/\s+/g, " ").trim();
        const left = rest.replace(V_FILLER, " ").replace(/[^a-z0-9]/g, "");

        return { pure: left === "", rest: rest };
    }

    const vVendaCommand = raw => vLanguageCommand(raw, V_LANG);
    const vEnglishCommand = raw => vLanguageCommand(raw, "english");

    /* Words that show the user is writing in Tshivenḓa (checked on the folded text) */
    const V_MARKERS = [
        /\bnda{2,}\b/,
        /\bndi (matsheloni|masiari|madekwana)\b/,
        /\b(ni|vha|u) kha vhudi\b/,
        /\b(ni|no) vuwa hani\b/,
        /\bndi (a )?livhuwa\b/,
        /\b(ro|ndo) livhuwa\b/,
        /\b(ni|vha|u) nnyi\b/,
        /\btsumbo\b/, /\bdzitsumbo\b/,
        /\btalutshedza(ni)?\b/, /\btalutshedzo\b/,
        /\bmbudziso\b/,
        /\bnthuse\b/, /\bnthusa\b/,
        /\bndi (khou )?toda\b/,
        /\bndi khou humbela\b/,
        /\bkha ri\b/,
        /\b(salani|iyani|dzulani) zwavhudi\b/,
        /\bndi mini\b/,
        /\bduvha lifhio\b/,
        /\bmafhungo a mangadzo\b/
    ];

    const vHasMarkers = n => V_MARKERS.some(rx => rx.test(n));


    /* ---------- Tshivenḓa -> English, so the study engine can answer ---------- */

    const V_TO_ENGLISH = [
        [/\btalutshedza(?:ni)?\b/g, "explain"],
        [/\btalutshedzo\b/g, "explanation"],
        [/\bdzitsumbo(?: dza)?\b/g, "examples of"],
        [/\btsumbo(?: ya| dza)?\b/g, "example of"],
        [/\bndi mini\b/g, "what is"],
        [/\bndi (?:khou )?toda\b/g, "i want"],
        [/\bndi nea\b/g, "give me"],
        [/\bnga ha\b/g, "about"],
        [/\bjoko\b/g, "tell me a joke"],
        [/\bmafhungo a mangadzo\b/g, "fun fact"],
        [/\b(?:ndi )?tutuwedze?a?\b/g, "motivate me"],
        [/\bthero(?: dza| ya)?\b/g, "topics"],
        [/\bfhindula(?:ni)?\b/g, "answer"],
        [/\bmbudziso\b/g, "question"]
    ];

    function vToEnglishQuery(q) {
        let t = vFold(q);
        let changed = false;
        V_TO_ENGLISH.forEach(([rx, rep]) => {
            const next = t.replace(rx, rep);
            if (next !== t) { changed = true; t = next; }
        });
        return changed ? t.replace(/\s+/g, " ").trim() : q;
    }


    /* ---------- Tshivenḓa wording used by chat replies ---------- */

    const V_DAYS = ["Swondaha", "Musumbuluwo", "Ḽavhuvhili", "Ḽavhuraru", "Ḽavhuṋa", "Ḽavhuṱanu", "Mugivhela"];
    const V_MONTHS = ["Phando", "Luhuhi", "Ṱhafamuhwe", "Lambamai", "Shundunthule", "Fulwi",
        "Fulwana", "Ṱhangule", "Khubvumedzi", "Tshimedzi", "Ḽara", "Nyendavhusiku"];

    const V_THINKING = [
        "Ndi khou humbula",
        "Ndi khou ita mbalo",
        "Ndi khou vhala manotsi anga",
        "Ndi khou sedza phindulo"
    ];

    const V_ENCOURAGE = [
        "Ndi mbudziso ya ndeme!",
        "Zwavhuḓi khulu!",
        "Kha ri zwi ite ri tshi ṱangana."
    ];

    const V_MOTIVATION = [
        "Gudani tshiṱuku tshiṱuku duvha ḽiṅwe na ḽiṅwe, ni ḓo vhona mvelelo.",
        "A hu na mbudziso i si na phindulo. Dzulani ni tshi lingedza."
    ];

    const V_GREET_FOLLOWUPS = [
        "Ni ṱoḓa u guda mini namusi — Accounting, Economics kana Mathematics?",
        "Ni khou lugiselela ndingo kana ni khou ṱoḓa u ḓivha fhedzi?",
        "Kha ri thome — ni ṱoḓa ndi ni thuse nga mini?",
        "Ndi thero ifhio i ni konda zwino?"
    ];

    const V_NOTE = "Ndi khou humbela pfarelo: zwa pfunzo zwi kha English zwino.";

    const V_PLACEHOLDER = "Ṅwalani mbudziso yanu henefha...";

    const vPick = arr => arr[Math.floor(Math.random() * arr.length)];


    /* ---------- screen text: exact matches ---------- */

    const V_EXACT = {};
    [
        /* buttons, menus, welcome screen */
        ["Home", "Muḓini"],
        ["About", "Nga ha riṋe"],
        ["Settings", "U lugisa"],
        ["New chat", "Nyambedzano ntswa"],
        ["Clear chat", "Sula nyambedzano"],
        ["Close", "Valani"],
        ["Send", "Rumela"],
        ["What would you like to learn?", "Ni ṱoḓa u guda mini?"],

        /* headings used in answers */
        ["What I can do", "Zwine ndi nga zwi ita"],
        ["Formula", "Fomula"],
        ["Formulas", "Dzifomula"],
        ["Key points", "Mafhungo a ndeme"],
        ["Example", "Tsumbo"],
        ["Examples", "Dzitsumbo"],
        ["Worked solution", "Phindulo yo ṱalutshedzwaho"],
        ["More information needed", "Hu ṱoḓea mafhungo manzhi"],
        ["Calculation", "Mbalo"],
        ["Currency conversion", "U shandukisa tshelede"],
        ["Fun fact", "Mafhungo a mangadzo"],
        ["Here's one for you", "Joko"],
        ["You've got this", "Ni nga kona!"],
        ["Related topics", "Thero dzi fanaho"],
        ["Web results", "Zwo wanalaho kha webusaithi"],
        ["Developer", "Muvhumbi"],
        ["Who made me", "Ndo itwa nga nnyi"],
        ["Live search is not connected", "Live search a i khou shuma"],
        ["Thinking", "Ndi khou humbula"],
        ["Mastercommerce topics", "Thero dza Mastercommerce"],
        ["I currently cover:", "Zwine ndi zwi ṱalutshedza zwino:"],
        ["Available Economics Essays", "Dzi-essay dza Economics dzi re hone"],
        ["Answer", "Phindulo"],

        /* the app's own sentences */
        ["I could not find enough specific information for that question in my current knowledge.",
            "A thi athu wana phindulo ya mbudziso iyi kha zwine nda zwi ḓivha zwino."],
        ["Try mentioning the exact topic. For example:",
            "Lingedzani u bula dzina ḽa thero. Sa tsumbo:"],
        ["Okay, back to studying. Ask me another topic whenever you're ready.",
            "Zwo luga, kha ri dovhe kha u guda. Vhudzisani zwiṅwe musi ni tshi khou lugela."],
        ["If you want, tell me the exact topic you're stuck on and I'll break it down step by step.",
            "Arali ni tshi ṱoḓa, ndi vhudzeni thero ine ya ni konda, ndi ni ṱalutshedze tshiṱuku tshiṱuku."],
        ["I'm not 100% sure what you meant. Did you mean one of these?",
            "A thi athu pfesesa zwine na zwi ṱoḓa. Ni amba zwiṅwe zwa izwi?"],
        ["I don't have that one in my study notes yet. I'm strongest on Accounting, Economics and Mathematics.",
            "Iyo a ndi athu i wana kha manotsi anga a pfunzo. Ndi shuma zwavhuḓi kha Accounting, Economics na Mathematics."]
    ].forEach(([k, v]) => { V_EXACT[vKey(k)] = v; });

    /* ---------- screen text: patterns ---------- */

    const V_PATTERNS = [
        [/^(.+) topics$/i, m => "Thero dza " + m[1]],
        [/^Ask a question about Accounting, Economics or Mathematics/i,
            () => "Vhudzisani mbudziso nga ha Accounting, Economics kana Mathematics."],
        [/^Try rephrasing with the topic name/i,
            () => "Lingedzani hafhu ni tshi shumisa dzina ḽa thero, kana ni humbele \"list topics\"."],
        [/^Tip: you can also just ask me/i,
            () => "Nyeletshedzo: ni nga humbela \"joko\" kana \"mafhungo a mangadzo\" musi ni tshi ṱoḓa u awela."],
        [/^Ask something like/i,
            () => "Vhudzisani sa \"list Business Studies topics\" kana \"tell me a joke\" arali ni tshi ṱoḓa u awela."],
        [/^Worked out by the built-in Economics engine/i,
            () => "Ya shumiwa nga Economics engine ine ya vha kha app (a hu ṱoḓei inthanethe)."],
        [/^Final answer\b/i, () => "Phindulo ya u fhedza"],
        [/^Answer\b/i, () => "Phindulo"]
    ];

    function vTranslateText(text) {
        const lead = (text.match(/^[^A-Za-z]*/) || [""])[0];
        const core = text.slice(lead.length).trim();
        if (!core) return null;

        const hit = V_EXACT[vKey(core)];
        if (hit) {
            const colon = /:\s*$/.test(core) && !/[:?!]$/.test(hit) ? ":" : "";
            return lead + hit + colon;
        }

        for (let i = 0; i < V_PATTERNS.length; i++) {
            const m = core.match(V_PATTERNS[i][0]);
            if (!m) continue;
            const out = V_PATTERNS[i][1](m, core);
            /* "Answer: 25" keeps its figure; replace only the leading word */
            if (/^(Final answer|Answer)\b/i.test(core) && core.length > m[0].length) {
                return lead + out + core.slice(m[0].length);
            }
            return lead + out;
        }
        return null;
    }


    /* ---------- apply to the screen ---------- */

    const vUiTouched = new Map();

    function vTextNodes(root) {
        const nodes = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) nodes.push(walker.currentNode);
        return nodes;
    }

    /* buttons, menus, welcome screen: remembered so English can be restored */
    function vLocalizeUI(root) {
        if (!root) return;
        vTextNodes(root).forEach(node => {
            const parent = node.parentElement;
            if (!parent || parent.closest(".message-row, .message, textarea, input, script, style, #calculatorModal")) return;
            const raw = node.nodeValue;
            if (!raw.trim()) return;
            const out = vTranslateText(raw.trim());
            if (out && out !== raw.trim()) {
                if (!vUiTouched.has(node)) vUiTouched.set(node, raw);
                node.nodeValue = raw.replace(raw.trim(), out);
            }
        });
    }

    function vRestoreUI() {
        vUiTouched.forEach((original, node) => { node.nodeValue = original; });
        vUiTouched.clear();
    }

    /* assistant messages: translated once, then left as they are */
    function vLocalizeMessages(root) {
        if (!root || root.nodeType !== 1) return;
        let targets = [];
        if (root.matches && root.matches(".assistant-message")) targets = [root];
        else if (root.closest && root.closest(".assistant-message")) targets = [root];
        else if (root.querySelectorAll) targets = Array.from(root.querySelectorAll(".assistant-message"));

        targets.forEach(target => {
            vTextNodes(target).forEach(node => {
                const parent = node.parentElement;
                if (parent && parent.closest(".formula, .example-box")) return;
                const raw = node.nodeValue;
                if (!raw.trim()) return;
                const out = vTranslateText(raw.trim());
                if (out && out !== raw.trim()) node.nodeValue = raw.replace(raw.trim(), out);
            });
        });
    }

    /* answers that arrive later (web lookups, long documents) are translated too */
    let vBusy = false;
    const vObserver = new MutationObserver(mutations => {
        if (!vLang.active || vBusy) return;
        vBusy = true;
        try {
            mutations.forEach(m => {
                m.addedNodes.forEach(n => {
                    if (n.nodeType === 1) vLocalizeMessages(n);
                    else if (n.nodeType === 3 && n.parentElement) vLocalizeMessages(n.parentElement);
                });
            });
        } finally {
            vBusy = false;
        }
    });
    vObserver.observe(chatArea, { childList: true, subtree: true });


    /* ---------- switch language ON / OFF ---------- */

    const vOriginalLists = {
        thinking: thinkingPhrases.slice(),
        encourage: encouragements.slice(),
        motivation: motivationalLines.slice()
    };

    function vSwapList(target, replacement) {
        target.splice(0, target.length, ...replacement);
    }

    function vSetLang(on) {
        if (vLang.active === on) return;
        vLang.active = on;
        vLang.noteShown = false;

        if (on) {
            vSwapList(thinkingPhrases, V_THINKING);
            vSwapList(encouragements, V_ENCOURAGE);
            vSwapList(motivationalLines, V_MOTIVATION);

            if (vLang.prevPlaceholder === null) vLang.prevPlaceholder = questionInput.getAttribute("placeholder") || "";
            questionInput.setAttribute("placeholder", V_PLACEHOLDER);

            document.documentElement.setAttribute("lang", "ve");
            vLocalizeUI(document.body);
        } else {
            vSwapList(thinkingPhrases, vOriginalLists.thinking);
            vSwapList(encouragements, vOriginalLists.encourage);
            vSwapList(motivationalLines, vOriginalLists.motivation);

            if (vLang.prevPlaceholder !== null) {
                questionInput.setAttribute("placeholder", vLang.prevPlaceholder);
                vLang.prevPlaceholder = null;
            }

            document.documentElement.setAttribute("lang", vLang.prevLang);
            vRestoreUI();
        }
    }

    /* welcome screen is rebuilt on Home / New chat / Clear chat */
    const vPreviousWelcome = createWelcomeScreen;
    createWelcomeScreen = function () {
        const screen = vPreviousWelcome();
        if (vLang.active) vLocalizeUI(screen);
        return screen;
    };


    /* ---------- direct Tshivenḓa replies ---------- */

    function vSwitchedHtml() {
        vLang.noteShown = true;
        return `
            <h2>Tshivenḓa</h2>
            <p>Zwo luga! Zwino ndi khou shumisa Tshivenḓa.</p>
            <p>Ni nga ṅwala mbudziso yanu nga Tshivenḓa kana nga English. Ni tshi ṱoḓa u dovha kha English, ṅwalani <strong>English</strong>.</p>
            <p><em>${V_NOTE}</em></p>
        `;
    }

    function vIdentityHtml(asksWho, asksMaker) {
        const d = developerInformation;
        const who = `<p>Ndi tshishumiswa tsha pfunzo tshi thusaho vhagudi u guda Accounting, Economics na Mathematics.</p>`;

        if (asksWho && asksMaker) {
            return `
                <h2>Mastercommerce</h2>
                ${who}
                <h3>Ndo itwa nga nnyi</h3>
                <p>${escapeHtml(d.developer)}, o thomiwaho nga ${escapeHtml(d.founder)} (${escapeHtml(d.location)}).</p>
                <p>Vesheni: ${escapeHtml(d.version)}</p>
            `;
        }
        if (asksWho) return `<h2>Mastercommerce</h2>${who}`;

        return `
            <h2>Muvhumbi</h2>
            <p>${escapeHtml(d.developer)}</p>
            <p>Muthomi: ${escapeHtml(d.founder)}</p>
            <p>${escapeHtml(d.product)} (${escapeHtml(d.version)})</p>
        `;
    }

    function vHelpHtml() {
        return `
            <h2>Zwine ndi nga zwi ita</h2>
            <ul>
                <li>U ṱalutshedza thero dza Accounting, Economics na Mathematics</li>
                <li>U ṋea dzitsumbo dzo ṱalutshedzwaho</li>
                <li>U vhumba dzi-essay dza Economics na financial statements</li>
                <li>U ita mbalo, na u ni ṋea joko kana mafhungo a mangadzo musi ni tshi ṱoḓa u awela</li>
                <li>U shumisa Tshivenḓa kana English — ni nga shandukisa tshifhinga tshiṅwe na tshiṅwe</li>
            </ul>
        `;
    }

    function vDirect(q) {
        const n = vNorm(q);
        if (!n) return null;
        const words = n.split(" ").length;

        /* date */
        if (/duvha lifhio|namusi ndi duvha|what (is )?(the )?(date|day)( is it)? today|todays date/.test(n)) {
            const now = new Date();
            return `<p>Ṋamusi ndi ${V_DAYS[now.getDay()]}, ${now.getDate()} ${V_MONTHS[now.getMonth()]} ${now.getFullYear()}.</p>`;
        }

        /* time */
        if (/awara (ya )?(zwino|ifhio)|tshifhinga zwino|ndi awara ifhio|what (is )?(the )?time|time is it/.test(n)) {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, "0");
            const mm = String(now.getMinutes()).padStart(2, "0");
            return `<p>Zwino ndi awara ya ${hh}:${mm}.</p>`;
        }

        /* greetings and "how are you" */
        const isHow = /how are you|how r u|hows it going|whats up|\b(ni|vha|u) kha vhudi\b|\b(ni|no) vuwa hani\b/.test(n);
        const isGreet = /^(hi|hello|hey|howzit|ndaa+|ndi (matsheloni|masiari|madekwana)|good (morning|afternoon|evening))\b/.test(n);

        if (isHow || (isGreet && words <= 5)) {
            let greet = "Aa!";
            if (/matsheloni|good morning/.test(n)) greet = "Ndi matsheloni!";
            else if (/masiari|good afternoon/.test(n)) greet = "Ndi masiari!";
            else if (/madekwana|good evening/.test(n)) greet = "Ndi madekwana!";

            const how = isHow ? " Ndi kha vhuḓi, ndo livhuwa. Na vhone ni kha vhuḓi?" : "";
            return `<p>${greet}${how}</p><p>${vPick(V_GREET_FOLLOWUPS)}</p>`;
        }

        /* thanks */
        if (words <= 6 && /thank you|thanks|^ty$|\bndi (a )?livhuwa\b|\b(ro|ndo) livhuwa\b/.test(n)) {
            return `<p>A hu na mulandu! Ni nga dovha ni vhudzisa tshifhinga tshiṅwe na tshiṅwe.</p>`;
        }

        /* goodbye */
        if (words <= 5 && /^(bye|goodbye|see you|cya|good night)|\b(salani|iyani) zwavhudi\b|\bkha ri vhonane\b|\bvhusiku vhudi\b/.test(n)) {
            return `<p>Iyani zwavhuḓi! Ni nga dovha tshifhinga tshiṅwe na tshiṅwe.</p>`;
        }

        /* identity */
        const asksWho = /who are you|what are you|your name|\b(ni|vha|u) nnyi\b|\bdzina\b/.test(n);
        const asksMaker = /who (made|created|built|developed) you|\bdeveloper\b/.test(n) ||
            (/\bnnyi\b/.test(n) && /\b(vhumba|vhumbile|vhumbiwa|itwa|ite|ita|itela)\b/.test(n));
        if (asksWho || asksMaker) return vIdentityHtml(asksWho, asksMaker);

        /* help */
        if (words <= 4 && /what can you do|how can you help|^help$|\bnthuse\b|\bnthusa\b|ni nga ita mini|zwine ni nga zwi ita/.test(n)) {
            return vHelpHtml();
        }

        /* short acknowledgements */
        if (/^(ok|okay|cool|nice|great|alright|got it|zwo luga|zwavhudi|ndo pfesesa|ndi a pfesesa)$/.test(n)) {
            return `<p>Zwavhuḓi! Vhudzisani zwiṅwe zwine na zwi ṱoḓa.</p>`;
        }

        return null;
    }


    /* ---------- the language gate: runs before everything else ---------- */

    const vPreviousGenerate = generateAnswer;

    generateAnswer = function (question) {
        const raw = String(question == null ? "" : question);
        const folded = vNorm(raw);

        /* 1) asked to go back to English */
        const toEnglish = vEnglishCommand(raw);
        if (toEnglish) {
            const wasVenda = vLang.active;
            vSetLang(false);
            if (toEnglish.pure) {
                return wasVenda
                    ? `<p>Okay, we're back in English. Ask me anything. To use Tshivenḓa again, say "let's use Tshivenda" or greet me with "Ndaa".</p>`
                    : `<p>We're already using English. To switch, say "let's use Tshivenda" or greet me with "Ndaa".</p>`;
            }
            return vPreviousGenerate(toEnglish.rest);
        }

        /* 2) asked for Tshivenḓa, or typed in Tshivenḓa */
        let query = raw;
        const toVenda = vVendaCommand(raw);

        if (toVenda) {
            vSetLang(true);
            if (toVenda.pure) return vSwitchedHtml();
            query = toVenda.rest;
        } else if (!vLang.active && vHasMarkers(folded)) {
            vSetLang(true);
        }

        /* 3) English stays exactly as it was */
        if (!vLang.active) return vPreviousGenerate(raw);

        /* 4) Tshivenḓa mode */
        try {
            const direct = vDirect(query);
            if (direct) return direct;
        } catch (e) { /* fall back to the study engine */ }

        let html = vPreviousGenerate(vToEnglishQuery(query));

        if (!vLang.noteShown && typeof html === "string") {
            vLang.noteShown = true;
            html += `<p><em>${V_NOTE}</em></p>`;
        }
        return html;
    };

    if (typeof window !== "undefined") {
        window.MC_VENDA = {
            enable: () => vSetLang(true),
            disable: () => vSetLang(false),
            isActive: () => vLang.active,
            dictionary: V_EXACT
        };
    }

    /* =========================================================
       END OF TSHIVENḒA LANGUAGE LAYER
    ========================================================= */


    /* =========================================================
       LOAD SETTINGS
    ========================================================= */

    loadSettings();


    /* =========================================================
       START APP
    ========================================================= */

    autoResizeInput();

    questionInput.focus();

});
