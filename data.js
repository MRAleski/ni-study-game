// ═══════════════════════════════════════════════════════════════════
//  NEGOTIABLE INSTRUMENTS — Chapter 13 Term & Concept Data
//  Organized by learning objective category
//  QB references align with the Chapter 13 question bank
// ═══════════════════════════════════════════════════════════════════

const CARDS = [
  // ─── PARTIES & ROLES ────────────────────────────────────────────
  {
    term: "Maker",
    def: "The party who creates and signs a promissory note, promising to pay a stated sum. The maker is primarily liable — they must pay when the note is due, no presentment required.",
    category: "parties",
    qb: "QB 64"
  },
  {
    term: "Drawer",
    def: "The party who writes and signs a check or draft, ordering the drawee to pay. The drawer is secondarily liable — responsible only if the drawee dishonors the instrument AND the drawer receives timely notice.",
    category: "parties",
    qb: "QB 65"
  },
  {
    term: "Drawee",
    def: "The party ordered to pay on a draft or check (typically a bank). The drawee has NO liability until it accepts the instrument. Once accepted, the drawee becomes primarily liable as the acceptor.",
    category: "parties",
    qb: "QB 67, 72"
  },
  {
    term: "Payee",
    def: "The party to whom payment on a negotiable instrument is directed. The payee is the original holder and must indorse the instrument to transfer it further.",
    category: "parties",
    qb: "QB 13"
  },
  {
    term: "Indorser",
    def: "A party who signs a negotiable instrument on its back to transfer or guarantee it. Indorsers are secondarily liable — they must pay if the instrument is dishonored and they receive timely notice.",
    category: "parties",
    qb: "QB 68"
  },
  {
    term: "Holder",
    def: "A person in possession of a negotiable instrument that is payable to them or to bearer. Only a holder (or HDC) can enforce the instrument against the maker or drawer.",
    category: "parties",
    qb: "QB 17, 18"
  },
  {
    term: "Holder in Due Course (HDC)",
    def: "A holder who takes a negotiable instrument (1) for value, (2) in good faith, and (3) without notice of any defects or claims. An HDC takes the instrument free of most personal defenses.",
    category: "hdc",
    qb: "QB 23, 55, 56"
  },
  {
    term: "Acceptor",
    def: "A drawee who has signed (accepted) a draft, thereby becoming primarily liable on the instrument. Before acceptance, the drawee owes no obligation on the instrument.",
    category: "parties",
    qb: "QB 72"
  },

  // ─── FORMATION REQUIREMENTS ────────────────────────────────────
  {
    term: "Negotiable Instrument",
    def: "A signed writing that contains an unconditional promise or order to pay a fixed amount of money, payable on demand or at a definite time, and payable to order or to bearer. Must meet all 6 UCC requirements.",
    category: "formation",
    qb: "QB 1, 36"
  },
  {
    term: "Promissory Note",
    def: "A two-party instrument in which the maker unconditionally promises to pay a fixed sum to the payee. It is a promise to pay (not an order). Examples: mortgage notes, student loans.",
    category: "formation",
    qb: "QB 4, 37"
  },
  {
    term: "Draft (Bill of Exchange)",
    def: "A three-party instrument in which the drawer orders the drawee to pay a sum to the payee. A check is the most common type of draft. A trade acceptance is a draft used in commercial transactions.",
    category: "formation",
    qb: "QB 3, 38"
  },
  {
    term: "Unconditionality Requirement",
    def: "A negotiable instrument must contain an UNCONDITIONAL promise or order to pay. A statement of condition ('pay if the goods arrive') or reference to another document that limits payment destroys negotiability.",
    category: "formation",
    qb: "QB 8, 9, 41, 44"
  },
  {
    term: "Fixed Amount Requirement",
    def: "The amount payable must be determinable from the instrument itself. Variable interest rates tied to an index (e.g., prime rate) are acceptable — the sum is still ascertainable at payment time.",
    category: "formation",
    qb: "QB 5, 16"
  },
  {
    term: "Payable on Demand or at a Definite Time",
    def: "An instrument is payable on demand if it states 'on demand' or has no stated time (like a check). It is payable at a definite time if it names a calendar date or references a calculable event.",
    category: "formation",
    qb: "QB 10, 11, 42, 43"
  },
  {
    term: "Acceleration Clause",
    def: "A clause allowing the holder to demand full payment earlier than the stated due date if a specified event occurs (e.g., missed payment). An acceleration clause does NOT destroy negotiability.",
    category: "formation",
    qb: "QB 12"
  },
  {
    term: "Payable to Order or Bearer",
    def: "An instrument must be payable 'to order' (naming a specific payee) or 'to bearer' (payable to whoever holds it). Without these words, the instrument is NOT negotiable — it is a mere assignment.",
    category: "formation",
    qb: "QB 13, 14, 48"
  },
  {
    term: "Bearer Instrument",
    def: "An instrument payable to 'bearer,' 'cash,' or with a blank indorsement. Anyone in possession is the holder and can negotiate it by delivery alone — no indorsement needed. High theft risk.",
    category: "formation",
    qb: "QB 18, 50"
  },
  {
    term: "Order Instrument",
    def: "An instrument payable to a specifically named payee ('Pay to the order of Jane Smith'). To negotiate it, the payee must indorse AND deliver it. More secure than a bearer instrument.",
    category: "formation",
    qb: "QB 17, 49"
  },

  // ─── TRANSFER & INDORSEMENTS ────────────────────────────────────
  {
    term: "Negotiation",
    def: "The transfer of a negotiable instrument in a way that makes the transferee a holder. Order instruments require indorsement + delivery. Bearer instruments require delivery only.",
    category: "transfer",
    qb: "QB 17, 49, 50"
  },
  {
    term: "Assignment (vs. Negotiation)",
    def: "When a check or note is transferred WITHOUT proper indorsement, it is an assignment — the transferee is an assignee, not a holder, and cannot claim HDC status. Subject to all defenses.",
    category: "transfer",
    qb: "QB 17, 49"
  },
  {
    term: "Blank Indorsement",
    def: "The payee signs only their name on the back — no specific indorsee named. Converts an order instrument into a BEARER instrument. Anyone who possesses it can negotiate it (risky if lost or stolen).",
    category: "transfer",
    qb: "QB 19, 52"
  },
  {
    term: "Special Indorsement",
    def: "'Pay to [Name]' + payee's signature. Converts a blank (bearer) indorsement back into an order instrument. Safer because only the named indorsee can negotiate it next.",
    category: "transfer",
    qb: "QB 20, 53"
  },
  {
    term: "Qualified Indorsement",
    def: "'Without recourse' + signature. Limits the indorser's secondary liability — the indorser passes on the instrument but disclaims responsibility if the maker or drawer does not pay.",
    category: "transfer",
    qb: "QB 53"
  },
  {
    term: "Restrictive Indorsement",
    def: "'For deposit only' or 'Pay to [Bank] for collection.' Limits further negotiation. A bank receiving a 'for deposit only' check must honor the restriction and may not negotiate the instrument further.",
    category: "transfer",
    qb: "QB 21, 54"
  },
  {
    term: "Joint Payees Rule",
    def: "When an instrument is payable to 'A AND B' — BOTH signatures are required for valid negotiation. When payable to 'A OR B' — either signature alone is sufficient.",
    category: "transfer",
    qb: "QB 22"
  },

  // ─── HOLDER IN DUE COURSE ───────────────────────────────────────
  {
    term: "Taking for Value (HDC Element 1)",
    def: "An HDC must give something of value — money, goods, services, or discharge of an existing debt. A gift-recipient or executor of an estate who does not give new value cannot be an HDC.",
    category: "hdc",
    qb: "QB 55, 57"
  },
  {
    term: "Good Faith (HDC Element 2)",
    def: "The HDC must act honestly and observe reasonable commercial standards. A holder who ignores obvious 'red flags' (e.g., buying a large check for pennies on the dollar) may lack good faith.",
    category: "hdc",
    qb: "QB 56, 58"
  },
  {
    term: "Without Notice (HDC Element 3)",
    def: "At the time of taking, the HDC must not know: (1) the instrument is overdue or dishonored, (2) there are unauthorized signatures, (3) a defense or claim exists against the instrument.",
    category: "hdc",
    qb: "QB 59, 60, 63"
  },
  {
    term: "Shelter Principle",
    def: "A transferee who receives an instrument from an HDC acquires the HDC's rights, even if the transferee personally does not qualify as an HDC. Promotes free transferability of instruments.",
    category: "hdc",
    qb: "QB 26"
  },

  // ─── LIABILITY ──────────────────────────────────────────────────
  {
    term: "Primary Liability",
    def: "Absolute obligation to pay — no condition (like presentment or dishonor) must occur first. Makers of notes and acceptors of drafts are primarily liable.",
    category: "liability",
    qb: "QB 31, 64"
  },
  {
    term: "Secondary Liability",
    def: "Conditional obligation to pay — arises only after the instrument is presented, dishonored, AND proper notice is given. Drawers of checks and indorsers are secondarily liable.",
    category: "liability",
    qb: "QB 65, 68"
  },
  {
    term: "Transfer Warranties",
    def: "Warranties made by a transferor for consideration: (1) all signatures are authentic and authorized, (2) instrument is not altered, (3) no defenses exist, (4) no knowledge of insolvency proceedings.",
    category: "liability",
    qb: "QB 27, 33"
  },
  {
    term: "Unauthorized Signature / Forgery",
    def: "A forged signature is INEFFECTIVE against the person whose name was forged. The forger is liable, not the person whose signature was forged. Exception: if the named person was negligent in allowing the forgery.",
    category: "liability",
    qb: "QB 7, 32, 39"
  },
  {
    term: "Material Alteration",
    def: "A fraudulent, unauthorized change to a completed instrument (e.g., changing '$500' to '$5,000'). An ordinary holder may enforce only the original terms. An HDC without notice may enforce the altered amount.",
    category: "defenses",
    qb: "QB 69"
  },

  // ─── DEFENSES ───────────────────────────────────────────────────
  {
    term: "Real (Universal) Defense",
    def: "A defense effective against EVERYONE, including an HDC. The six real defenses: (1) forgery/fraud in execution, (2) material alteration, (3) discharge in bankruptcy, (4) minority, (5) illegality/extreme duress, (6) mental incapacity that voids the contract.",
    category: "defenses",
    qb: "QB 34"
  },
  {
    term: "Personal Defense",
    def: "A defense good against an ordinary holder but NOT against an HDC. Examples: lack of consideration, fraud in the inducement, breach of contract, ordinary duress, payment, and non-delivery.",
    category: "defenses",
    qb: "QB 34, 70"
  },
  {
    term: "FTC Consumer Rule",
    def: "A Federal Trade Commission rule that allows consumers to assert personal defenses against an HDC when the instrument finances a consumer purchase. Without this rule, consumers would be bound to pay regardless of defects in goods.",
    category: "defenses",
    qb: "QB 35"
  },
  {
    term: "Discharge in Bankruptcy",
    def: "A REAL defense — a party whose debts are discharged in bankruptcy cannot be required to pay on a negotiable instrument, even to an HDC.",
    category: "defenses",
    qb: "QB 34"
  },
  {
    term: "Fraud in the Inducement",
    def: "A PERSONAL defense — the maker was deceived into signing an instrument (e.g., believing they were getting a good deal when the product is defective). Valid against an ordinary holder but not an HDC.",
    category: "defenses",
    qb: "QB 70"
  }
];

// ═══════════════════════════════════════════════════════════════════
//  QUIZ QUESTIONS (definition/term format, aligned to QB items)
// ═══════════════════════════════════════════════════════════════════

const QUIZ_QUESTIONS = [
  {
    q: "Which party is PRIMARILY liable on a promissory note from the moment it is signed?",
    options: ["The payee", "The maker", "The drawer", "The indorser"],
    answer: 1,
    explain: "The maker creates and signs the note, promising to pay. Makers have primary, unconditional liability — no presentment is required. (QB 64)"
  },
  {
    q: "An instrument states 'Pay to the order of Sarah Jones.' Sarah signs only her name on the back. This creates a:",
    options: ["Special indorsement", "Qualified indorsement", "Blank indorsement", "Restrictive indorsement"],
    answer: 2,
    explain: "Signing your name alone (with no named indorsee) is a blank indorsement. It converts the order instrument to a bearer instrument — anyone who holds it can negotiate it. (QB 19, 52)"
  },
  {
    q: "Karen writes 'I owe you $600' and signs it. Is this a negotiable instrument?",
    options: ["Yes — it is signed and states an amount", "No — an IOU is not a promise or order to pay", "Yes — if it is in writing it is negotiable", "No — it lacks a payee's name"],
    answer: 1,
    explain: "An IOU is merely an acknowledgment of a debt — it is not an unconditional promise or order to pay as required by UCC Article 3. (QB 40)"
  },
  {
    q: "Which of the following is a REAL defense that can be used against even an HDC?",
    options: ["Failure of consideration", "Fraud in the inducement", "Breach of contract", "Discharge in bankruptcy"],
    answer: 3,
    explain: "Discharge in bankruptcy is one of the six real (universal) defenses effective against all parties, including an HDC. The others listed are personal defenses only. (QB 34)"
  },
  {
    q: "A check is payable 'to Marcus AND Nathan.' Marcus indorses it alone. Is this a valid negotiation?",
    options: ["Yes — either party may sign", "No — both Marcus AND Nathan must sign", "Yes — a check can always be cashed by one payee", "No — the check is nonnegotiable"],
    answer: 1,
    explain: "'AND' means both parties must sign. If the check were payable to 'Marcus OR Nathan,' either one could sign alone. (QB 22)"
  },
  {
    q: "A note states 'Pay $1,000 only if the shipment of goods arrives.' This note is:",
    options: ["Negotiable — conditions are allowed", "Not negotiable — the payment is conditional", "Negotiable — commercial reasonableness applies", "Not negotiable — the amount is uncertain"],
    answer: 1,
    explain: "A negotiable instrument must be an UNCONDITIONAL promise or order to pay. Tying payment to a condition ('if the shipment arrives') destroys negotiability. (QB 8, 9, 41)"
  },
  {
    q: "Jill buys a bearer instrument in good faith from Kiley, paying fair value, not knowing Kiley had stolen it. Jill is:",
    options: ["Not a holder — the instrument was stolen", "An HDC — bearer instruments can be negotiated by delivery alone", "An assignee — she lacks a proper indorsement", "A secondary holder — theft limits rights"],
    answer: 1,
    explain: "Bearer instruments are negotiated by delivery alone. A thief can effectively transfer a bearer instrument. Jill took in good faith, for value, without notice — she qualifies as an HDC. (QB 23, 61)"
  },
  {
    q: "The drawer writes the number '100' in the box of a check but writes 'One Thousand Dollars' in words. How much must the bank pay?",
    options: ["$100 — the numerical amount controls", "$1,000 — the written amount controls", "The check is void for ambiguity", "Either amount at the bank's discretion"],
    answer: 1,
    explain: "When a written amount and a numerical amount conflict, the WRITTEN words control. This rule exists because words are harder to alter. (QB 15)"
  },
  {
    q: "A promissory note includes an acceleration clause stating the full balance is due if any payment is missed. Is the note negotiable?",
    options: ["No — acceleration clauses destroy negotiability", "Yes — acceleration clauses do not affect negotiability", "No — the amount is not fixed", "Yes — only if the interest rate is fixed"],
    answer: 1,
    explain: "Acceleration clauses allow earlier payment if a trigger occurs, but do not destroy negotiability. The payment time remains definite. (QB 12)"
  },
  {
    q: "Logan signs a contract 'Logan' without indicating he is acting on behalf of Mining Corporation. If a dispute arises, who is liable on the instrument?",
    options: ["Mining Corporation only — principals are always liable", "Logan personally — the signature is ambiguous", "Both Logan and Mining Corporation jointly", "Neither — the signature is void"],
    answer: 1,
    explain: "An agent who signs without clearly indicating representative capacity may be personally liable. Logan should have signed 'Mining Corporation, by Logan, Agent.' (QB 66)"
  },
  {
    q: "Which action by a holder PREVENTS them from qualifying as an HDC?",
    options: ["Paying fair market value for the instrument", "Taking the instrument before its due date", "Knowing the maker had previously dishonored the instrument", "Receiving the instrument as a birthday gift"],
    answer: 2,
    explain: "An HDC must take WITHOUT notice that the instrument has been dishonored. Knowledge of prior dishonor eliminates HDC status. Note: receiving an instrument as a gift also fails (no value given). (QB 59)"
  },
  {
    q: "Maya transfers a promissory note to Derek without indorsing it. Derek is:",
    options: ["A holder who can enforce the note", "An HDC if he paid fair value", "An assignee — not a holder", "A secondary indorser"],
    answer: 2,
    explain: "An order instrument transferred WITHOUT indorsement is an assignment, not a negotiation. Derek is an assignee — he cannot be a holder or HDC and takes subject to all defenses. (QB 17, 49)"
  },
  {
    q: "An HDC takes a note that was altered from $500 to $5,000 without noticing the change. The HDC can enforce the note for:",
    options: ["$500 — the original amount only", "$5,000 — the altered amount", "$0 — material alteration voids the instrument", "$2,500 — splitting the difference is standard"],
    answer: 1,
    explain: "An HDC who takes without notice of a material alteration can enforce the instrument for the altered amount. An ordinary holder (with notice) can enforce only the original amount. (QB 69)"
  },
  {
    q: "The Shelter Principle allows a non-HDC transferee to:",
    options: ["Assert real defenses against the original maker", "Acquire the rights of the HDC from whom they received the instrument", "Convert a personal defense into a real defense", "Enforce an instrument despite giving no value"],
    answer: 1,
    explain: "Under the Shelter Principle, receiving an instrument from an HDC gives the transferee the HDC's rights — even if the transferee personally does not qualify. This promotes free transferability. (QB 26)"
  },
  {
    q: "A consumer buys a defective refrigerator using a promissory note that a store sells to an HDC. The FTC consumer rule means the consumer can:",
    options: ["Only sue the store, not the HDC", "Assert personal defenses (like defective goods) even against the HDC", "Discharge the debt in bankruptcy regardless", "Demand the HDC return the note"],
    answer: 1,
    explain: "The FTC consumer rule allows consumers to assert personal defenses — including product defects — even against an HDC in consumer credit transactions. Without this rule, the consumer would owe the HDC regardless. (QB 35)"
  },
  {
    q: "A 'for deposit only' indorsement is classified as a:",
    options: ["Blank indorsement", "Special indorsement", "Qualified indorsement", "Restrictive indorsement"],
    answer: 3,
    explain: "'For deposit only' restricts what can be done with the instrument. It is a restrictive indorsement — only the payee's bank can acquire holder rights under it. (QB 21, 54)"
  },
  {
    q: "Before a drawee accepts a draft, who is primarily liable on the instrument?",
    options: ["The drawer", "The drawee", "No one is primarily liable yet", "The payee"],
    answer: 2,
    explain: "A drawee has NO liability on a draft until it signs the instrument as acceptor. Before acceptance, only secondary liability exists (drawer, indorsers). (QB 72)"
  },
  {
    q: "Which of the following is a PERSONAL defense that cannot be used against an HDC?",
    options: ["Forgery of the maker's signature", "Fraud in the inducement", "Discharge in bankruptcy", "Material alteration of the instrument"],
    answer: 1,
    explain: "Fraud in the inducement is a personal defense — effective against an ordinary holder but NOT against an HDC. Forgery, bankruptcy discharge, and material alteration are real defenses. (QB 70)"
  },
  {
    q: "A variable-rate mortgage note tied to the prime interest rate is:",
    options: ["Not negotiable — the amount is not fixed", "Negotiable — the sum is ascertainable at payment time", "Negotiable only if the rate cap is stated", "Not negotiable — drafts must have fixed rates"],
    answer: 1,
    explain: "A variable interest rate tied to an index does NOT destroy negotiability. The UCC allows for variable rates because the amount is calculable when payment is due. (QB 16)"
  },
  {
    q: "Transfer warranties are made by a transferor to all subsequent holders. Which of these is NOT a transfer warranty?",
    options: ["All signatures are authentic and authorized", "The instrument has not been materially altered", "The maker will be solvent at the time of payment", "No defense or claim exists against the instrument"],
    answer: 2,
    explain: "Transfer warranties do NOT guarantee the maker's solvency — only that the transferor has no knowledge of insolvency proceedings. The other three are genuine transfer warranties. (QB 27, 33)"
  }
];

// ═══════════════════════════════════════════════════════════════════
//  SCENARIO QUESTIONS (QB-style fact patterns)
// ═══════════════════════════════════════════════════════════════════

const SCENARIOS = [
  {
    label: "LO 5.1 · Types",
    q: "Hillside Farms draws a draft ordering First National Bank to pay $8,000 to AgriCo Supply on July 1. The bank stamps 'Accepted' and signs it. What type of instrument is this, and who is now primarily liable?",
    options: [
      "Promissory note; Hillside Farms is primarily liable",
      "Trade acceptance; First National Bank (as acceptor) is primarily liable",
      "Cashier's check; AgriCo Supply is primarily liable",
      "Order instrument; Hillside Farms is primarily liable"
    ],
    answer: 1,
    explain: "A draft drawn on a bank and accepted by the bank for a commercial transaction is a trade acceptance. Once the bank (drawee) accepts, it becomes primarily liable as the acceptor. (QB 3, 38, 67)"
  },
  {
    label: "LO 5.2 · Formation",
    q: "Ben signs an undated promissory note for $1,500 payable 'one month after date.' Is this note negotiable?",
    options: [
      "No — an undated note cannot be negotiable",
      "Yes — the time is calculable once a date is inserted, satisfying the definite-time requirement",
      "No — the amount must include interest to be definite",
      "Yes — only if a notary witnesses the signature"
    ],
    answer: 1,
    explain: "An undated note stating a time period ('one month after date') IS negotiable. Courts allow enforcement once a date is supplied because the payment time is objectively calculable. (QB 46)"
  },
  {
    label: "LO 5.5 · Transfer",
    q: "Doyle gives eMarket a blank check and says 'fill in the price when you buy the stock — it should be about $4,000.' eMarket fills in $5,000 and transfers the check to G&H Accountants, who take it in good faith for value without notice. G&H can enforce the check for:",
    options: [
      "$4,000 — the amount Doyle authorized",
      "$5,000 — as an HDC taking a completed instrument without notice",
      "$0 — an incomplete instrument is void",
      "$5,000 — but only if Doyle was negligent"
    ],
    answer: 1,
    explain: "An HDC who takes a completed instrument in good faith, for value, without notice of unauthorized completion can enforce it for the completed amount — even if it exceeds the original authorization. (QB 71)"
  },
  {
    label: "LO 5.3 · Liability",
    q: "On May 1, Hilltop Investments (drawer) writes a draft for $25,000 ordering Greater Metro Development Corp. (drawee) to pay First Choice Moving (payee). First Choice indorses it to City Bank. On May 5, Greater Metro stamps 'Accepted.' Who is primarily liable on May 6?",
    options: [
      "Hilltop Investments, as the drawer",
      "First Choice Moving, as the indorser",
      "Greater Metro Development Corp., as the acceptor",
      "City Bank, as the holder"
    ],
    answer: 2,
    explain: "On May 5, Greater Metro accepts the draft by signing it. Acceptance creates primary liability. Before acceptance (May 1), no one was primarily liable. Hilltop and First Choice remain secondarily liable. (QB 72)"
  },
  {
    label: "LO 5.4 · Defenses",
    q: "Sara signs a promissory note to buy a car. The seller tells her the note is a 'routine quality survey.' Sara cannot read. After discovering the deception, Sara refuses to pay the HDC who purchased the note. Will this defense work?",
    options: [
      "No — fraud in the inducement is only a personal defense",
      "Yes — fraud in the execution (signing without knowing it is a note) is a real defense effective against an HDC",
      "No — an HDC always prevails over any defense",
      "Yes — consumer protection always overrides HDC rights"
    ],
    answer: 1,
    explain: "Fraud in the EXECUTION (being tricked into signing without knowing you are signing a negotiable instrument) is a REAL defense — effective against everyone, including an HDC. This differs from fraud in the inducement, which is only a personal defense. (QB 34)"
  },
  {
    label: "LO 5.5 · Indorsements",
    q: "Kim receives a check payable to her order. She writes 'Pay to Jordan, without recourse' above her signature. What type of indorsement did Kim make, and what is the legal effect?",
    options: [
      "Blank indorsement — converts the check to a bearer instrument",
      "Special qualified indorsement — names Jordan as indorsee AND limits Kim's secondary liability",
      "Restrictive indorsement — restricts Jordan from further negotiation",
      "Special indorsement — names Jordan but Kim remains fully liable"
    ],
    answer: 1,
    explain: "'Pay to Jordan' is a special indorsement (names an indorsee). 'Without recourse' is a qualified indorsement (limits liability). Together they form a special qualified indorsement — Jordan is the next holder and Kim has disclaimed secondary liability. (QB 20, 53)"
  },
  {
    label: "LO 5.2 · Formation",
    q: "A note reads: 'I promise to pay $5,000 subject to the terms of the purchase agreement dated March 1.' Is this note negotiable?",
    options: [
      "Yes — a reference to another agreement is acceptable",
      "No — conditioning payment on another document destroys unconditionality",
      "Yes — as long as the purchase agreement is attached",
      "No — only because the amount might vary"
    ],
    answer: 1,
    explain: "A note that conditions or limits payment by reference to another document is NOT unconditional, and therefore NOT negotiable. Merely 'referencing' an agreement (without conditioning payment) is permissible — but 'subject to the terms' crosses the line. (QB 9, 44)"
  },
  {
    label: "LO 5.3 · Liability",
    q: "Will alters Vera's $500 check to read $5,000. Vera left large blank spaces that made the alteration easy. Vera's bank, acting in good faith, pays $5,000. Who bears the loss?",
    options: [
      "The bank — it should have detected the alteration",
      "Vera — her negligence in preparing the check contributed to the loss",
      "Will — only the forger can be held liable",
      "The payee — they presented a fraudulent instrument"
    ],
    answer: 1,
    explain: "A drawer who negligently prepares an instrument in a way that makes alteration easy may be barred from asserting material alteration as a defense. Vera's negligence shifts the loss to her. (QB 69)"
  },
  {
    label: "LO 5.5 · HDC",
    q: "First Bank purchases a large portfolio of promissory notes at a steep discount, aware that many borrowers have asserted defects in the goods they purchased. Is First Bank an HDC?",
    options: [
      "Yes — banks automatically qualify as HDCs",
      "No — First Bank had notice of defenses against the instruments",
      "Yes — paying value is sufficient for HDC status",
      "No — only individual holders can be HDCs"
    ],
    answer: 1,
    explain: "One element of HDC status is taking WITHOUT NOTICE of any defense or claim. A holder who knows defenses exist against instruments cannot claim HDC status for those instruments. (QB 59, 63)"
  },
  {
    label: "LO 5.1 · Types",
    q: "Amy deposits her paycheck and writes 'For deposit only — First Savings Bank' on the back before signing her name. This is an example of a:",
    options: [
      "Blank indorsement", "Special indorsement", "Qualified indorsement", "Restrictive indorsement"
    ],
    answer: 3,
    explain: "'For deposit only' plus a named bank is a classic restrictive indorsement. It limits the instrument's use to deposit into a specific bank account, protecting against theft or misuse if the check is lost. (QB 21, 54)"
  },
  {
    label: "LO 5.4 · Defenses",
    q: "A consumer buys furniture on credit, signing a promissory note. The furniture falls apart after one week. The store sold the note to an HDC. Without the FTC consumer rule, can the consumer stop paying the HDC?",
    options: [
      "Yes — defective goods always release the consumer from the note",
      "No — product defects are personal defenses, not effective against an HDC",
      "Yes — the HDC must honor any warranty the store made",
      "No — because the consumer already received the goods"
    ],
    answer: 1,
    explain: "Defective goods create a personal defense (failure of consideration / breach of warranty) — valid against the original seller but NOT against an HDC. The FTC consumer rule creates an exception, but without it the consumer must continue paying. (QB 35, 70)"
  },
  {
    label: "LO 5.3 · Liability",
    q: "Terry transfers a promissory note to Lynn by delivery (no indorsement). Lynn later discovers a signature on the note is forged. Lynn sues Terry. Which warranty did Terry breach?",
    options: [
      "Presentment warranty — the instrument was properly presented",
      "Transfer warranty — all signatures are authentic and authorized",
      "No warranty — Terry did not indorse, so no warranties apply",
      "Indorser warranty — secondary liability automatically attaches"
    ],
    answer: 1,
    explain: "Transfer warranties apply to ALL transferors for consideration — even those who do not indorse. One transfer warranty is that all signatures are authentic and authorized. A forged signature breaches this warranty. (QB 27, 33)"
  }
];
