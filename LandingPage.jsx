import { useState, useEffect, useRef } from "react";

// ============ TRANSLATIONS ============
const T = {
  sk: {
    nav: { cta: "Bezplatný audit", links: { problem: "Problém", calc: "Kalkulačka", solution: "Riešenie", faq: "FAQ" } },
    hero: {
      badge: "Pre firmy v segmente služieb pre domácnosti",
      h1a: "Tvoj biznis je vedro.",
      h1b: "A ono tečie.",
      sub: "Každý mesiac ti uniká 15–20 zákaziek. Nie preto, že by si nemal leady. Ale preto, že ich strácaš skôr, než sa ti podarí uzavrieť.",
      cta: "Ukáž mi, kde tečiem",
      ctaSub: "30-minútový audit zadarmo. Žiadne záväzky. Žiadny predaj. Len čísla.",
      bucketLabel1: "Tvoje leady",
      bucketLabel2: "Pomalý follow-up",
      bucketLabel3: "Zlý predajný proces",
      bucketLabel4: "Žiadna systematizácia",
      bucketLoss: "Mesačne strácaš",
    },
    problem: {
      badge: "Problém",
      h2a: "Tri diery,",
      h2b: "ktoré ťa potichu zabíjajú.",
      items: [
        {
          num: "21",
          suffix: "×",
          title: "Pomalý follow-up",
          stat: "menšia šanca uzavrieť lead, ktorý kontaktuješ po 30 minútach oproti tomu, do 5 minút.",
          story: "Lead napíše vo štvrtok o 14:37. Ty si na zákazke. Zavoláš mu v piatok o 10:00. Medzitým si našiel troch iných a vybral toho, kto zavolal prvý. Nebola to otázka ceny. Bola to otázka 18 hodín.",
          source: "Zdroj: Oldroyd, MIT, Harvard Business Review",
        },
        {
          num: "67",
          suffix: "%",
          title: "Deravý predajný proces",
          stat: "leadov, ktorí by kúpili, nekúpi — nie preto, že by nechceli, ale preto, že ich predaj stratil.",
          story: "Prídeš na obhliadku. Odmeriaš. Povieš „pošlem cenovú ponuku\". Pošleš PDF emailom. Klient si ho otvorí, nerozumie mu, odloží. Ty zavoláš o týždeň. Už má ponuku od konkurencie, ktorá mu ju prezentovala priamo.",
          source: "Zdroj: HubSpot State of Sales Report",
        },
        {
          num: "5–10",
          suffix: "×",
          title: "Žiadna systematizácia",
          stat: "viac je hodnota existujúceho zákazníka oproti novému. A ty mu po zákazke nikdy viac nenapíšeš.",
          story: "Urobil si prácu. Zákazník bol spokojný. Nepýtal si recenziu. Nepýtal si referral. Nezaradil si ho do systému, ktorý mu o pol roka pripomenie servis. Za rok tvoja firma zabudla, že existuje.",
          source: "Zdroj: Bain & Company, Harvard Business Review",
        },
      ],
      bottom: "Každá z týchto dier ťa stojí peniaze. Dokopy? Viac, než si ochotný si priznať.",
    },
    calc: {
      badge: "Kalkulačka strát",
      h2: "Koľko presne ťa stojí deravé vedro?",
      sub: "Posuvníkmi nastav svoje čísla. Uvidíš pravdu.",
      label1: "Koľko dopytov dostaneš mesačne?",
      label2: "Aká je tvoja priemerná zákazka?",
      label3: "Aké percento dopytov uzavrieš teraz?",
      result: "Mesačne strácaš",
      yearly: "Ročne to je",
      explanation: "Ak by si uzatváral priemer v odvetví (30 % namiesto tvojich",
      explanation2: "%), získal by si mesačne",
      explanation3: "zákaziek navyše.",
      cta: "Ukáž mi, ako to opraviť",
    },
    solution: {
      badge: "Riešenie",
      h2a: "Takto opravím",
      h2b: "tvoje vedro.",
      sub: "Tri časti. 90 dní. Jeden výsledok: prestaneš strácať peniaze, ktoré už máš.",
      columns: [
        {
          icon: "water",
          title: "Naliatie vody",
          subtitle: "Viac kvalifikovaných leadov",
          items: [
            "Google Ads — nastavené na zákazku, nie na klik",
            "Meta Ads — kreatívy, ktoré filtrujú kvalifikovaných",
            "Landing page — ktorá konvertuje, nie len vyzerá",
            "Google Business Profile — dominancia lokálne",
            "SEO základy — aby ťa našli aj bez reklamy",
          ],
        },
        {
          icon: "patch",
          title: "Oprava vedra",
          subtitle: "Prestaneš strácať to, čo už máš",
          items: [
            "CRM, kde nikdy nezabudneš na lead",
            "Automatický follow-up do 5 minút (SMS + email)",
            "Predajné skripty pre telefón aj obhliadku",
            "Cenová ponuka prezentovaná, nie poslaná",
            "Námietky, ktoré vieš riešiť",
          ],
        },
        {
          icon: "plus",
          title: "Udržanie vody",
          subtitle: "Každý zákazník je dlhodobá hodnota",
          items: [
            "Automatické pýtanie recenzií po zákazke",
            "Referral program, ktorý reálne funguje",
            "Reaktivácia starých zákazníkov",
            "Manažment Google profilu",
            "Sledovanie customer lifetime value",
          ],
        },
      ],
      bottom: "Toto nie je marketing. Toto je rastový systém.",
    },
    how: {
      badge: "Proces",
      h2: "Štyri kroky. Nič viac.",
      steps: [
        { num: "01", title: "Audit", time: "30 min, zadarmo", desc: "Ukážem ti presne, kde tvoje vedro tečie a koľko ťa to stojí. Aj keď so mnou nebudeš ďalej spolupracovať, dostaneš akčný plán." },
        { num: "02", title: "Stratégia", time: "Týždeň 1", desc: "Ak sa rozhodneme spolupracovať, postavím pre teba 90-dňový plán na mieru. Nie šablóna." },
        { num: "03", title: "Implementácia", time: "Týždne 2–8", desc: "Postavím celý systém, kým ty robíš svoju prácu. Týždenné updaty, aby si vedel, kde sme." },
        { num: "04", title: "Rast", time: "Týždne 9–12+", desc: "Systém beží. Optimalizujeme na základe dát. Ty vidíš výsledky každý týždeň." },
      ],
    },
    guarantee: {
      badge: "Garancia",
      h2a: "Prestaneš strácať peniaze,",
      h2b: "alebo pracujem zadarmo.",
      p1: "Vieš, prečo väčšina marketérov garantuje „spokojnosť\"? Pretože spokojnosť nič neznamená a nič nestojí.",
      p2: "Ja garantujem toto: za 90 dní uvidíš minimálne zdvojnásobenie počtu kvalifikovaných leadov. Merateľné, čierno-biele, nedá sa s tým manipulovať.",
      p3: "Ak nie, pracujem zadarmo ďalej — bez mesačného poplatku — kým ten cieľ nedosiahneme. Ak po 180 dňoch stále nie sme tam, vrátim ti 100 % toho, čo si zaplatil za implementáciu.",
      p4: "Nie sú tu žiadne kličky. Žiadne „ak budeš dodržiavať všetko\". Ak nedodám výsledok, stratím peniaze ja, nie ty.",
      signature: "— Zakladateľ NAVY OS",
    },
    about: {
      badge: "Kto som",
      h2: "Prečo by si ma mal počúvať.",
      p1: "Volám sa [Tvoje meno]. Pomáham firmám v segmente služieb pre domácnosti na Slovensku a v Česku prestať strácať peniaze a začať rásť systematicky — nie náhodou.",
      p2: "Odmietam to, ako väčšina marketingu funguje dnes — prázdne sľuby, mesačné poplatky bez výsledkov, reporty plné čísel, ktoré nič neznamenajú. Buď ti pomôžem reálne zarobiť viac peňazí, alebo to nemá zmysel robiť. Preto mám garanciu, ktorú mám.",
      p3: "Práve teraz hľadám prvých 5 firiem, s ktorými vybudujem dlhodobé partnerstvá. Preto je moja garancia agresívna a preto je audit zadarmo — viem, že jediná cesta, ako si vybudovať reputáciu, je dodať výsledky. Nie sľuby.",
    },
    faq: {
      badge: "Časté otázky",
      h2: "Možno sa pýtaš",
      items: [
        { q: "Ako viem, že to pre mňa bude fungovať, keď nepoznáš môj biznis?", a: "Preto je prvý krok audit, nie predaj. Počas 30 minút ti poviem úprimne, či ti dokážem pomôcť, alebo nie. Ak nie, poviem ti to priamo a odporučím niečo iné." },
        { q: "Už som mal marketérov a sklamali ma. Prečo by si bol iný?", a: "Väčšina marketérov ti predáva prácu — počet príspevkov, reklám, kliknutí. Ja ti predávam výsledok — počet zákaziek. A ak ho nedodám, pracujem zadarmo." },
        { q: "Koľko to presne stojí?", a: "Cenu poviem až na audite, keď uvidím tvoje čísla — pretože cena musí dávať zmysel voči tomu, koľko teraz strácaš. Väčšina klientov zarobí 10–20× viac, než investuje." },
        { q: "Ako dlho trvá, kým uvidím prvé výsledky?", a: "Prvé leady zvyčajne prídu do 14 dní od spustenia kampaní. Plné výsledky garancie — zdvojnásobenie — do 90 dní." },
        { q: "Čo ak teraz nemám budget?", a: "Audit ti aj tak urobím zadarmo. Dostaneš akčný plán, ktorý môžeš implementovať sám. A keď budeš mať budget, vrátime sa k tomu." },
        { q: "Koľko času to odo mňa vyžaduje?", a: "Prvý týždeň cca 3–4 hodiny (onboarding, zdieľanie informácií). Od druhého týždňa už len 30-minútový weekly hovor. Robotu robím ja, nie ty." },
        { q: "Funguje to pre moje remeslo?", a: "Ak robíš služby pre domácnosti — kúrenie, elektro, stavba, maľovanie, strechy, okná, solárne panely, klimatizácie, rekonštrukcie, čistenie fasád, ploty, garážové brány — áno. Špecializujeme sa výhradne na home services." },
      ],
    },
    finalCta: {
      h2: "Tvoje vedro môže byť celé.",
      sub: "Začni auditom. 30 minút. Zadarmo. Zistíš presne, kde strácaš peniaze a ako to opraviť.",
      cta: "Rezervovať audit",
      ctaSub: "Žiadne záväzky. Žiadny predaj. Len čísla.",
    },
    form: {
      badge: "Posledný krok",
      h2: "Rezervuj si svoj audit",
      sub: "30 sekúnd. Ozveme sa do 24 hodín.",
      progressLabel: "Vyplnené",
      step: "Krok",
      of: "z",
      fields: {
        name: "Vaše meno", namePh: "Ján Novák",
        company: "Názov firmy", companyPh: "Novák s.r.o.",
        trade: "Vaše remeslo / služba",
        tradeOptions: ["Kúrenár / Inštalatér", "Elektrikár", "Stavebná firma", "Maliar / Natierač / Fasády", "Stolár", "Podlahár", "Klampiar / Strechy", "Okná / Dvere", "Solárne panely", "Klimatizácie / Tepelné čerpadlá", "Garážové brány", "Ploty a brány", "Kúpeľne / Rekonštrukcie", "Čistenie striech / fasád", "Iné"],
        leads: "Koľko dopytov dostávate mesačne?",
        leadsOptions: ["Menej ako 10", "10–30", "30–60", "60–100", "100+"],
        revenue: "Mesačný obrat (cca)",
        revenueOptions: ["Do 5 000 €", "5 000–15 000 €", "15 000–50 000 €", "50 000+ €"],
        problem: "Aký je tvoj najväčší problém teraz?",
        problemPh: "Napr. nemám dosť dopytov, strácam zákazky, nemám čas na follow-up...",
        phone: "Telefónne číslo", phonePh: "+421 900 000 000",
        email: "E-mail", emailPh: "jan@novak.sk",
      },
      next: "Pokračovať",
      back: "Späť",
      cta: "Odoslať a rezervovať audit",
      sending: "Odosielame...",
      disclaimer: "Vaše údaje sú v bezpečí. GDPR compliant.",
      done: { h: "Máme to!", p: "Ozveme sa vám do 24 hodín a dohodneme termín auditu. Skontrolujte si email — potvrdenie už ide k vám." },
    },
    sticky: "Rezervovať audit",
    exitPopup: {
      h2: "Počkaj chvíľu.",
      sub: "Audit je úplne zadarmo. 30 minút. Žiadny predaj. Uvidíš presne, kde strácaš peniaze — aj keď si potom povieš, že so mnou nebudeš spolupracovať.",
      cta1: "Chcem audit zadarmo",
      cta2: "Nie, ďakujem",
    },
    footer: {
      tagline: "Operačný systém pre firmy v segmente služieb pre domácnosti.",
      company: "Spoločnosť",
      cAbout: "O nás",
      cBlog: "Blog",
      cContact: "Kontakt",
      product: "Produkt",
      pHow: "Ako to funguje",
      pCalc: "Kalkulačka",
      pAudit: "Bezplatný audit",
      pFaq: "FAQ",
      legal: "Právne",
      lPrivacy: "Ochrana súkromia",
      lTerms: "Obchodné podmienky",
      lCookies: "Cookies",
      lGdpr: "GDPR",
      copy: "© 2026 NAZ Capital s. r. o. Všetky práva vyhradené.",
      operatedBy: "NAVY OS prevádzkuje",
    },
  },
  cs: {
    nav: { cta: "Bezplatný audit", links: { problem: "Problém", calc: "Kalkulačka", solution: "Řešení", faq: "FAQ" } },
    hero: {
      badge: "Pro firmy v segmentu služeb pro domácnosti",
      h1a: "Tvůj byznys je kbelík.",
      h1b: "A on teče.",
      sub: "Každý měsíc vám uniká 15–20 zakázek. Ne proto, že byste neměli leady. Ale proto, že je ztrácíte dřív, než se vám podaří uzavřít.",
      cta: "Ukaž mi, kde teču",
      ctaSub: "30minutový audit zdarma. Žádné závazky. Žádný prodej. Jen čísla.",
      bucketLabel1: "Tvoje leady",
      bucketLabel2: "Pomalý follow-up",
      bucketLabel3: "Špatný prodejní proces",
      bucketLabel4: "Žádná systematizace",
      bucketLoss: "Měsíčně ztrácíš",
    },
    problem: {
      badge: "Problém",
      h2a: "Tři díry,",
      h2b: "které vás potichu zabíjejí.",
      items: [
        { num: "21", suffix: "×", title: "Pomalý follow-up", stat: "menší šance uzavřít lead, který kontaktujete po 30 minutách oproti tomu do 5 minut.", story: "Lead napíše ve čtvrtek ve 14:37. Vy jste na zakázce. Zavoláte mu v pátek v 10:00. Mezitím si našel tři jiné a vybral toho, kdo zavolal první. Nebyla to otázka ceny. Byla to otázka 18 hodin.", source: "Zdroj: Oldroyd, MIT, Harvard Business Review" },
        { num: "67", suffix: "%", title: "Děravý prodejní proces", stat: "leadů, kteří by koupili, nekoupí — ne proto, že by nechtěli, ale proto, že je prodej ztratil.", story: "Přijdete na obhlídku. Změříte. Řeknete „pošlu cenovou nabídku\". Pošlete PDF emailem. Klient si ho otevře, nerozumí mu, odloží. Vy zavoláte za týden. Už má nabídku od konkurence.", source: "Zdroj: HubSpot State of Sales Report" },
        { num: "5–10", suffix: "×", title: "Žádná systematizace", stat: "vyšší je hodnota stávajícího zákazníka oproti novému. A vy mu po zakázce nikdy víc nenapíšete.", story: "Udělal jste práci. Zákazník byl spokojený. Nepožádal jste o recenzi. Nepožádal jste o referral. Za rok vaše firma zapomněla, že existuje.", source: "Zdroj: Bain & Company, Harvard Business Review" },
      ],
      bottom: "Každá z těchto děr vás stojí peníze. Dohromady? Více, než jste ochotni si přiznat.",
    },
    calc: {
      badge: "Kalkulačka ztrát",
      h2: "Kolik přesně vás stojí děravý kbelík?",
      sub: "Posuvníky nastavte svá čísla. Uvidíte pravdu.",
      label1: "Kolik poptávek dostanete měsíčně?",
      label2: "Jaká je vaše průměrná zakázka?",
      label3: "Jaké procento poptávek uzavřete teď?",
      result: "Měsíčně ztrácíte",
      yearly: "Ročně je to",
      explanation: "Kdybyste uzavírali průměr v odvětví (30 % místo vašich",
      explanation2: "%), získali byste měsíčně",
      explanation3: "zakázek navíc.",
      cta: "Ukaž mi, jak to opravit",
    },
    solution: {
      badge: "Řešení",
      h2a: "Takto opravím",
      h2b: "váš kbelík.",
      sub: "Tři části. 90 dní. Jeden výsledek: přestanete ztrácet peníze, které už máte.",
      columns: [
        { icon: "water", title: "Nalití vody", subtitle: "Více kvalifikovaných leadů", items: ["Google Ads — nastavené na zakázku, ne na klik", "Meta Ads — kreativy filtrující kvalifikované", "Landing page — která konvertuje, ne jen vypadá", "Google Business Profile — lokální dominance", "SEO základy — ať vás najdou i bez reklamy"] },
        { icon: "patch", title: "Oprava kbelíku", subtitle: "Přestanete ztrácet to, co už máte", items: ["CRM, kde nikdy nezapomenete na lead", "Automatický follow-up do 5 minut", "Prodejní skripty pro telefon i obhlídku", "Cenová nabídka prezentovaná, ne poslaná", "Námitky, které umíte řešit"] },
        { icon: "plus", title: "Udržení vody", subtitle: "Každý zákazník je dlouhodobá hodnota", items: ["Automatické žádosti o recenze", "Referral program, který reálně funguje", "Reaktivace starých zákazníků", "Management Google profilu", "Sledování customer lifetime value"] },
      ],
      bottom: "Toto není marketing. Toto je růstový systém.",
    },
    how: {
      badge: "Proces", h2: "Čtyři kroky. Nic víc.",
      steps: [
        { num: "01", title: "Audit", time: "30 min, zdarma", desc: "Ukážu vám přesně, kde váš kbelík teče a kolik vás to stojí." },
        { num: "02", title: "Strategie", time: "Týden 1", desc: "Postavím pro vás 90denní plán na míru. Ne šablona." },
        { num: "03", title: "Implementace", time: "Týdny 2–8", desc: "Postavím celý systém, zatímco vy děláte svou práci." },
        { num: "04", title: "Růst", time: "Týdny 9–12+", desc: "Systém běží. Optimalizujeme na základě dat." },
      ],
    },
    guarantee: {
      badge: "Garance",
      h2a: "Přestanete ztrácet peníze,",
      h2b: "nebo pracuji zdarma.",
      p1: "Víte, proč většina marketérů garantuje „spokojenost\"? Protože spokojenost nic neznamená a nic nestojí.",
      p2: "Já garantuji toto: za 90 dnů uvidíte minimálně zdvojnásobení počtu kvalifikovaných leadů. Měřitelné, černobílé.",
      p3: "Pokud ne, pracuji zdarma dál — bez měsíčního poplatku — dokud ten cíl nedosáhneme. Pokud po 180 dnech stále nejsme tam, vrátím vám 100 % toho, co jste zaplatili za implementaci.",
      p4: "Žádné kličky. Pokud nedodám výsledek, ztratím peníze já, ne vy.",
      signature: "— Zakladatel NAVY OS",
    },
    about: {
      badge: "Kdo jsem",
      h2: "Proč byste mě měli poslouchat.",
      p1: "Jmenuji se [Vaše jméno]. Pomáhám firmám v segmentu služeb pro domácnosti na Slovensku a v Česku přestat ztrácet peníze a začít růst systematicky — ne náhodou.",
      p2: "Odmítám to, jak většina marketingu funguje dnes — prázdné sliby, měsíční poplatky bez výsledků, reporty plné čísel, která nic neznamenají. Buď vám pomůžu reálně vydělat víc peněz, nebo to nemá smysl dělat. Proto mám garanci, kterou mám.",
      p3: "Právě teď hledám prvních 5 firem, se kterými vybuduji dlouhodobá partnerství. Proto je moje garance agresivní a proto je audit zdarma — vím, že jediná cesta, jak si vybudovat reputaci, je dodat výsledky. Ne sliby.",
    },
    faq: {
      badge: "FAQ", h2: "Možná se ptáte",
      items: [
        { q: "Jak vím, že to pro mě bude fungovat?", a: "Proto je prvním krokem audit, ne prodej. Během 30 minut vám řeknu upřímně, jestli vám dokážu pomoci." },
        { q: "Už jsem měl marketéry a zklamali mě.", a: "Většina marketérů prodává práci. Já prodávám výsledek — počet zakázek. A pokud ho nedodám, pracuji zdarma." },
        { q: "Kolik to přesně stojí?", a: "Cenu řeknu až na auditu. Většina klientů vydělá 10–20× víc, než investuje." },
        { q: "Jak dlouho trvá, než uvidím výsledky?", a: "První leady obvykle přijdou do 14 dnů. Plné výsledky — zdvojnásobení — do 90 dnů." },
        { q: "Co když teď nemám budget?", a: "Audit vám stejně udělám zdarma. Dostanete akční plán, který můžete implementovat sami." },
        { q: "Kolik času to ode mě vyžaduje?", a: "První týden 3–4 hodiny. Od druhého týdne 30minutový weekly hovor." },
        { q: "Funguje to pro moje řemeslo?", a: "Topení, elektro, stavba, malování, střechy, okna, solární panely — ano. Specializujeme se výhradně na home services." },
      ],
    },
    finalCta: {
      h2: "Váš kbelík může být celý.",
      sub: "Začněte auditem. 30 minut. Zdarma.",
      cta: "Rezervovat audit",
      ctaSub: "Žádné závazky. Žádný prodej. Jen čísla.",
    },
    form: {
      badge: "Poslední krok", h2: "Rezervujte si audit",
      sub: "30 sekund. Ozveme se do 24 hodin.",
      progressLabel: "Vyplněno", step: "Krok", of: "z",
      fields: {
        name: "Jméno", namePh: "Jan Novák",
        company: "Firma", companyPh: "Novák s.r.o.",
        trade: "Řemeslo",
        tradeOptions: ["Topenář / Instalatér", "Elektrikář", "Stavební firma", "Malíř / Fasády", "Truhlář", "Podlahář", "Klempíř / Střechy", "Okna / Dveře", "Solární panely", "Klimatizace / TČ", "Garážová vrata", "Ploty", "Koupelny / Rekonstrukce", "Čištění", "Jiné"],
        leads: "Kolik poptávek dostáváte měsíčně?",
        leadsOptions: ["Méně než 10", "10–30", "30–60", "60–100", "100+"],
        revenue: "Měsíční obrat", revenueOptions: ["Do 5 000 €", "5 000–15 000 €", "15 000–50 000 €", "50 000+ €"],
        problem: "Jaký je váš největší problém?",
        problemPh: "Např. nemám dost poptávek, ztrácím zakázky...",
        phone: "Telefon", phonePh: "+420 700 000 000",
        email: "E-mail", emailPh: "jan@novak.cz",
      },
      next: "Pokračovat", back: "Zpět", cta: "Odeslat", sending: "Odesíláme...",
      disclaimer: "Vaše údaje jsou v bezpečí. GDPR.",
      done: { h: "Máme to!", p: "Ozveme se do 24 hodin." },
    },
    sticky: "Rezervovat audit",
    exitPopup: { h2: "Počkejte chvíli.", sub: "Audit je úplně zdarma. 30 minut. Žádný prodej.", cta1: "Chci audit zdarma", cta2: "Ne, díky" },
    footer: {
      tagline: "Operační systém pro firmy v segmentu služeb pro domácnosti.",
      company: "Společnost", cAbout: "O nás", cBlog: "Blog", cContact: "Kontakt",
      product: "Produkt", pHow: "Jak to funguje", pCalc: "Kalkulačka", pAudit: "Bezplatný audit", pFaq: "FAQ",
      legal: "Právní", lPrivacy: "Ochrana soukromí", lTerms: "Obchodní podmínky", lCookies: "Cookies", lGdpr: "GDPR",
      copy: "© 2026 NAZ Capital s. r. o. Všechna práva vyhrazena.", operatedBy: "NAVY OS provozuje",
    },
  },
  en: {
    nav: { cta: "Free Audit", links: { problem: "Problem", calc: "Calculator", solution: "Solution", faq: "FAQ" } },
    hero: {
      badge: "For home service businesses",
      h1a: "Your business is a bucket.",
      h1b: "And it's leaking.",
      sub: "Every month you lose 15–20 jobs. Not because you don't have leads. But because you lose them before you can close them.",
      cta: "Show me where I'm leaking",
      ctaSub: "30-minute free audit. No commitments. No pitch. Just numbers.",
      bucketLabel1: "Your leads",
      bucketLabel2: "Slow follow-up",
      bucketLabel3: "Broken sales process",
      bucketLabel4: "No systematization",
      bucketLoss: "You lose monthly",
    },
    problem: {
      badge: "Problem", h2a: "Three holes", h2b: "quietly killing your business.",
      items: [
        { num: "21", suffix: "×", title: "Slow Follow-up", stat: "lower chance to close a lead contacted after 30 minutes vs within 5 minutes.", story: "A lead messages Thursday at 2:37 PM. You're on a job. You call Friday at 10 AM. Meanwhile they found three others and picked the one who called first. It wasn't about price. It was about 18 hours.", source: "Source: Oldroyd, MIT, Harvard Business Review" },
        { num: "67", suffix: "%", title: "Broken Sales Process", stat: "of leads who would buy don't — not because they don't want to, but because sales lost them.", story: "You come to the site visit. You measure. You say 'I'll send the quote.' You email a PDF. Client opens it, doesn't understand, puts it aside. You call in a week. They already got a competitor's quote, presented in person.", source: "Source: HubSpot State of Sales Report" },
        { num: "5–10", suffix: "×", title: "No Systematization", stat: "more valuable is an existing customer vs a new one. And you never contact them again after the job.", story: "You did the work. Client was happy. You didn't ask for a review. You didn't ask for a referral. Within a year, your business forgot they existed.", source: "Source: Bain & Company, Harvard Business Review" },
      ],
      bottom: "Each of these holes is costing you money. Together? More than you're willing to admit.",
    },
    calc: {
      badge: "Loss Calculator",
      h2: "How much exactly is your leaky bucket costing you?",
      sub: "Set your numbers with the sliders. See the truth.",
      label1: "How many leads do you get monthly?",
      label2: "What's your average job value?",
      label3: "What percentage do you close now?",
      result: "You lose monthly",
      yearly: "That's yearly",
      explanation: "If you closed at industry average (30% instead of your",
      explanation2: "%), you'd get monthly",
      explanation3: "extra jobs.",
      cta: "Show me how to fix it",
    },
    solution: {
      badge: "Solution", h2a: "This is how I'll fix", h2b: "your bucket.",
      sub: "Three parts. 90 days. One result: you stop losing money you already have.",
      columns: [
        { icon: "water", title: "Pouring water in", subtitle: "More qualified leads", items: ["Google Ads — set for jobs, not clicks", "Meta Ads — creatives filtering qualified only", "Landing page — that converts, not just looks nice", "Google Business Profile — local dominance", "SEO foundations — so people find you without ads"] },
        { icon: "patch", title: "Patching the bucket", subtitle: "You stop losing what you have", items: ["CRM where you never forget a lead", "Automated follow-up within 5 minutes", "Sales scripts for phone and site visits", "Quotes presented, not emailed", "Objections you know how to handle"] },
        { icon: "plus", title: "Keeping the water", subtitle: "Every customer is long-term value", items: ["Automated review requests", "Referral program that actually works", "Old customer reactivation", "Google profile management", "Customer lifetime value tracking"] },
      ],
      bottom: "This isn't marketing. This is a growth system.",
    },
    how: {
      badge: "Process", h2: "Four steps. Nothing more.",
      steps: [
        { num: "01", title: "Audit", time: "30 min, free", desc: "I show you exactly where your bucket is leaking and what it's costing you." },
        { num: "02", title: "Strategy", time: "Week 1", desc: "I build a custom 90-day plan for you. Not a template." },
        { num: "03", title: "Implementation", time: "Weeks 2–8", desc: "I build the entire system while you do your work." },
        { num: "04", title: "Growth", time: "Weeks 9–12+", desc: "System runs. We optimize based on data." },
      ],
    },
    guarantee: {
      badge: "Guarantee",
      h2a: "You stop losing money,",
      h2b: "or I work for free.",
      p1: "You know why most marketers guarantee 'satisfaction'? Because satisfaction means nothing and costs nothing.",
      p2: "I guarantee this: within 90 days you'll see at least a doubling of qualified leads. Measurable, black and white, can't be manipulated.",
      p3: "If not, I work for free — no monthly fee — until we hit that goal. If after 180 days we're still not there, I refund 100% of what you paid for implementation.",
      p4: "No fine print. If I don't deliver, I lose money, not you.",
      signature: "— Founder of NAVY OS",
    },
    about: {
      badge: "Who I am",
      h2: "Why you should listen to me.",
      p1: "My name is [Your name]. I help home service businesses stop losing money and start growing systematically — not by chance.",
      p2: "I reject how most marketing works today — empty promises, monthly fees without results, reports full of numbers that mean nothing. Either I help you actually earn more money, or it's not worth doing. That's why I have the guarantee I have.",
      p3: "Right now I'm looking for my first 5 companies to build long-term partnerships with. That's why my guarantee is aggressive and why the audit is free — I know the only way to build a reputation is to deliver results. Not promises.",
    },
    faq: {
      badge: "FAQ", h2: "You might be wondering",
      items: [
        { q: "How do I know this will work for me?", a: "That's why step one is an audit, not a pitch. In 30 minutes I'll tell you honestly if I can help." },
        { q: "I've had marketers before and they let me down.", a: "Most marketers sell work — posts, ads, clicks. I sell results — jobs. And if I don't deliver, I work for free." },
        { q: "How much does it cost?", a: "I'll tell you on the audit. Most clients earn 10–20× what they invest." },
        { q: "How long until I see results?", a: "First leads usually within 14 days. Full guarantee — doubling — within 90 days." },
        { q: "What if I don't have the budget?", a: "I'll do the audit for free anyway. You'll get an action plan you can implement yourself." },
        { q: "How much time does it take from me?", a: "First week 3–4 hours. From week two, just a 30-minute weekly call." },
        { q: "Does this work for my trade?", a: "HVAC, electrical, construction, painting, roofing, windows, solar panels, AC — yes. We specialize exclusively in home services." },
      ],
    },
    finalCta: {
      h2: "Your bucket can be whole.",
      sub: "Start with an audit. 30 minutes. Free.",
      cta: "Book audit",
      ctaSub: "No commitments. No pitch. Just numbers.",
    },
    form: {
      badge: "Final step", h2: "Book your audit",
      sub: "30 seconds. We'll contact you within 24 hours.",
      progressLabel: "Completed", step: "Step", of: "of",
      fields: {
        name: "Your name", namePh: "John Doe",
        company: "Company", companyPh: "Doe LLC",
        trade: "Your trade",
        tradeOptions: ["HVAC / Plumber", "Electrician", "General Contractor", "Painter / Facades", "Carpenter", "Flooring", "Roofer", "Windows / Doors", "Solar Panels", "AC / Heat Pumps", "Garage Doors", "Fencing", "Bathroom / Renovations", "Pressure Washing", "Other"],
        leads: "How many leads do you get monthly?",
        leadsOptions: ["Less than 10", "10–30", "30–60", "60–100", "100+"],
        revenue: "Monthly revenue", revenueOptions: ["Under €5,000", "€5,000–€15,000", "€15,000–€50,000", "€50,000+"],
        problem: "What's your biggest problem right now?",
        problemPh: "E.g. not enough leads, losing jobs, no time for follow-up...",
        phone: "Phone", phonePh: "+1 555 000 0000",
        email: "Email", emailPh: "john@doe.com",
      },
      next: "Continue", back: "Back", cta: "Submit", sending: "Sending...",
      disclaimer: "Your data is safe. GDPR compliant.",
      done: { h: "We got it!", p: "We'll contact you within 24 hours." },
    },
    sticky: "Book audit",
    exitPopup: { h2: "Wait a moment.", sub: "The audit is completely free. 30 minutes. No pitch.", cta1: "I want the free audit", cta2: "No thanks" },
    footer: {
      tagline: "The operating system for home service businesses.",
      company: "Company", cAbout: "About", cBlog: "Blog", cContact: "Contact",
      product: "Product", pHow: "How it works", pCalc: "Calculator", pAudit: "Free audit", pFaq: "FAQ",
      legal: "Legal", lPrivacy: "Privacy Policy", lTerms: "Terms of Service", lCookies: "Cookies", lGdpr: "GDPR",
      copy: "© 2026 NAZ Capital s. r. o. All rights reserved.", operatedBy: "NAVY OS is operated by",
    },
  },
};

const detectLang = () => {
  const n = (navigator.language || "en").toLowerCase();
  if (n.startsWith("sk")) return "sk";
  if (n.startsWith("cs") || n.startsWith("cz")) return "cs";
  return "en";
};

// ============ ICONS ============
const Icon = ({ name, size = 24, color = "currentColor", strokeWidth = 1.75 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    arrow: <svg {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    check: <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>,
    plus: <svg {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    x: <svg {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    shield: <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    water: <svg {...props}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    patch: <svg {...props}><path d="M3 21l1.9-5.7a8.38 8.38 0 1 1 3.8 3.8z"/></svg>,
    zap: <svg {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    sparkle: <svg {...props}><path d="M12 3l1.9 5.8L20 10l-5.8 1.9L12 18l-2.2-6.1L4 10l6.1-1.2L12 3z"/></svg>,
  };
  return icons[name] || null;
};

// ============ LOGO ============
const Logo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="navy-grad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#4a6ba8" />
        <stop offset="100%" stopColor="#1a2744" />
      </linearGradient>
    </defs>
    <path d="M20 85V15h16l28 42V15h16v70H64L36 43v42H20z" fill="url(#navy-grad)" />
    <path d="M58 50L76 85H64L50 58l8-8z" fill="#0f1d35" fillOpacity="0.5" />
  </svg>
);

// ============ BUCKET ANIMATION ============
const BucketAnimation = ({ labels }) => {
  return (
    <div style={{ width: "100%", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <svg viewBox="0 0 400 500" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="bucketGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Pouring water from top */}
        <g>
          <rect x="195" y="30" width="10" height="90" fill="url(#waterGrad)" opacity="0.9">
            <animate attributeName="y" values="30;35;30" dur="0.6s" repeatCount="indefinite" />
          </rect>
          {/* Drops */}
          <circle cx="200" cy="50" r="3" fill="#60a5fa">
            <animate attributeName="cy" values="30;130;30" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="80" r="2.5" fill="#60a5fa">
            <animate attributeName="cy" values="30;130;30" dur="1s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Label: Tvoje leady */}
        <text x="200" y="20" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="600" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.5px", textTransform: "uppercase" }}>
          ↓ {labels[0]} ↓
        </text>

        {/* Bucket */}
        <g>
          {/* Bucket rim */}
          <ellipse cx="200" cy="130" rx="130" ry="15" fill="none" stroke="#94a3b8" strokeWidth="3" />

          {/* Bucket body */}
          <path
            d="M 70 130 L 90 360 L 310 360 L 330 130"
            fill="url(#bucketGrad)"
            stroke="#94a3b8"
            strokeWidth="3"
          />

          {/* Water inside - low level because of leaks */}
          <clipPath id="bucketClip">
            <path d="M 70 130 L 90 360 L 310 360 L 330 130 Z" />
          </clipPath>

          <g clipPath="url(#bucketClip)">
            {/* Water level animation */}
            <rect x="70" y="270" width="260" height="100" fill="url(#waterGrad)">
              <animate attributeName="y" values="280;260;280" dur="2s" repeatCount="indefinite" />
            </rect>
            {/* Water surface wave */}
            <path d="M 70 270 Q 135 260 200 270 T 330 270 L 330 290 L 70 290 Z" fill="#60a5fa" opacity="0.6">
              <animate attributeName="d" values="M 70 270 Q 135 260 200 270 T 330 270 L 330 290 L 70 290 Z;M 70 270 Q 135 280 200 270 T 330 270 L 330 290 L 70 290 Z;M 70 270 Q 135 260 200 270 T 330 270 L 330 290 L 70 290 Z" dur="2s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Bottom ellipse */}
          <ellipse cx="200" cy="360" rx="110" ry="10" fill="none" stroke="#94a3b8" strokeWidth="3" />

          {/* Three holes */}
          <circle cx="130" cy="320" r="6" fill="#0a1628" stroke="#e63946" strokeWidth="2" />
          <circle cx="200" cy="340" r="7" fill="#0a1628" stroke="#e63946" strokeWidth="2" />
          <circle cx="270" cy="315" r="6" fill="#0a1628" stroke="#e63946" strokeWidth="2" />

          {/* Water leaking from holes */}
          <g>
            {/* Hole 1 leak */}
            <path d="M 128 326 Q 125 360 120 400 Q 118 430 115 460" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite" />
            </path>
            <circle cx="115" cy="460" r="3" fill="#60a5fa">
              <animate attributeName="cy" values="330;470" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="120" cy="400" r="2.5" fill="#60a5fa">
              <animate attributeName="cy" values="330;470" dur="1.4s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="1.4s" begin="0.3s" repeatCount="indefinite" />
            </circle>

            {/* Hole 2 leak */}
            <path d="M 200 347 L 200 470" stroke="#60a5fa" strokeWidth="2.5" fill="none" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
            </path>
            <circle cx="200" cy="430" r="3" fill="#60a5fa">
              <animate attributeName="cy" values="350;480" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="400" r="2.5" fill="#60a5fa">
              <animate attributeName="cy" values="350;480" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
            </circle>

            {/* Hole 3 leak */}
            <path d="M 272 321 Q 275 360 280 400 Q 283 430 285 460" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <circle cx="285" cy="450" r="3" fill="#60a5fa">
              <animate attributeName="cy" values="325;470" dur="1.3s" begin="0.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="1.3s" begin="0.2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Labels for holes */}
          <text x="50" y="320" textAnchor="end" fill="#e63946" fontSize="11" fontWeight="600" style={{ fontFamily: "Inter, sans-serif" }}>
            {labels[1]}
          </text>
          <line x1="55" y1="320" x2="120" y2="320" stroke="#e63946" strokeWidth="1" opacity="0.5" />

          <text x="200" y="485" textAnchor="middle" fill="#e63946" fontSize="11" fontWeight="600" style={{ fontFamily: "Inter, sans-serif" }}>
            {labels[2]}
          </text>

          <text x="350" y="315" textAnchor="start" fill="#e63946" fontSize="11" fontWeight="600" style={{ fontFamily: "Inter, sans-serif" }}>
            {labels[3]}
          </text>
          <line x1="280" y1="315" x2="345" y2="315" stroke="#e63946" strokeWidth="1" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

// ============ FIXED BUCKET ============
const BucketFixed = () => {
  return (
    <div style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}>
      <svg viewBox="0 0 400 500" style={{ width: "100%", height: "auto" }}>
        <defs>
          <linearGradient id="waterGradF" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="bucketGradF" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Pouring water */}
        <rect x="195" y="20" width="10" height="110" fill="url(#waterGradF)" opacity="0.9">
          <animate attributeName="y" values="20;25;20" dur="0.6s" repeatCount="indefinite" />
        </rect>

        {/* Bucket */}
        <ellipse cx="200" cy="130" rx="130" ry="15" fill="none" stroke="#94a3b8" strokeWidth="3" />
        <path d="M 70 130 L 90 360 L 310 360 L 330 130" fill="url(#bucketGradF)" stroke="#94a3b8" strokeWidth="3" />

        <clipPath id="bucketClipF">
          <path d="M 70 130 L 90 360 L 310 360 L 330 130 Z" />
        </clipPath>

        <g clipPath="url(#bucketClipF)">
          {/* Full water level */}
          <rect x="70" y="150" width="260" height="220" fill="url(#waterGradF)">
            <animate attributeName="y" values="155;145;155" dur="3s" repeatCount="indefinite" />
          </rect>
          <path d="M 70 150 Q 135 140 200 150 T 330 150 L 330 170 L 70 170 Z" fill="#4ade80" opacity="0.6">
            <animate attributeName="d" values="M 70 150 Q 135 140 200 150 T 330 150 L 330 170 L 70 170 Z;M 70 150 Q 135 160 200 150 T 330 150 L 330 170 L 70 170 Z;M 70 150 Q 135 140 200 150 T 330 150 L 330 170 L 70 170 Z" dur="3s" repeatCount="indefinite" />
          </path>
        </g>

        <ellipse cx="200" cy="360" rx="110" ry="10" fill="none" stroke="#94a3b8" strokeWidth="3" />

        {/* Patched holes with checkmarks */}
        <g>
          <circle cx="130" cy="320" r="10" fill="#4ade80" opacity="0.2" />
          <circle cx="130" cy="320" r="10" fill="none" stroke="#4ade80" strokeWidth="2" />
          <polyline points="125,320 128,323 134,317" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          <circle cx="200" cy="340" r="11" fill="#4ade80" opacity="0.2" />
          <circle cx="200" cy="340" r="11" fill="none" stroke="#4ade80" strokeWidth="2" />
          <polyline points="194,340 198,344 205,336" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          <circle cx="270" cy="315" r="10" fill="#4ade80" opacity="0.2" />
          <circle cx="270" cy="315" r="10" fill="none" stroke="#4ade80" strokeWidth="2" />
          <polyline points="265,315 268,318 274,312" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
};

// ============ REVEAL ============
const Reveal = ({ children, delay = 0, y = 30 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
};

// ============ COUNTER ============
const Counter = ({ end, duration = 1500, trigger, prefix = "", suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(end);
    };
    requestAnimationFrame(tick);
  }, [trigger, end, duration]);
  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString("sk-SK").replace(/,/g, " ");
  return <span>{prefix}{display}{suffix}</span>;
};

// ============ MAIN ============
export default function NavyOS() {
  const [lang, setLang] = useState("sk");
  const [openFaq, setOpenFaq] = useState(null);
  const [fd, setFd] = useState({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const [exitDone, setExitDone] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Calculator state
  const [calcLeads, setCalcLeads] = useState(40);
  const [calcJobValue, setCalcJobValue] = useState(8000);
  const [calcCloseRate, setCalcCloseRate] = useState(15);

  useEffect(() => { setLang(detectLang()); }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onLeave = (e) => { if (e.clientY < 5 && !exitDone) { setExit(true); setExitDone(true); } };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [exitDone]);

  const t = T[lang];
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Calculator calculations
  const industryAvg = 30;
  const currentJobs = calcLeads * (calcCloseRate / 100);
  const potentialJobs = calcLeads * (industryAvg / 100);
  const extraJobs = Math.max(0, potentialJobs - currentJobs);
  const monthlyLoss = Math.round(extraJobs * calcJobValue);
  const yearlyLoss = monthlyLoss * 12;

  // Form handling
  const handleSubmit = async () => {
    setSending(true);
    setError(null);
    try {
      const response = await fetch("https://formspree.io/f/mreojywy", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...fd, _language: lang }),
      });
      if (response.ok) setDone(true);
      else setError(true);
    } catch (err) {
      setError(true);
    }
    setSending(false);
  };

  const formSteps = [
    { fields: ["name", "company"] },
    { fields: ["trade", "leads", "revenue"] },
    { fields: ["problem"] },
    { fields: ["phone", "email"] },
  ];
  const totalSteps = formSteps.length;
  const currentFields = formSteps[formStep - 1].fields;
  const formProgress = (formStep / totalSteps) * 100;
  const canProceed = currentFields.every(f => fd[f] && fd[f].trim() !== "");

  const inputStyle = {
    width: "100%", padding: "16px 18px", fontSize: 15, borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)",
    color: "#fff", fontFamily: "inherit", outline: "none", transition: "all 0.3s",
  };

  const labelStyle = {
    display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)",
    marginBottom: 8, textAlign: "left", letterSpacing: "0.3px", textTransform: "uppercase",
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#ffffff", background: "#0a1628", lineHeight: 1.6,
      WebkitFontSmoothing: "antialiased", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; background: #0a1628; }
        body { background: #0a1628; }
        ::selection { background: #4a6ba8; color: #fff; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.7; transform: scale(1.05) } }
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1) } 33% { transform: translate(30px, -50px) scale(1.1) } 66% { transform: translate(-20px, 20px) scale(0.9) } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .float { animation: float 4s ease-in-out infinite; }
        .pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .blob { animation: blob 20s ease-in-out infinite; }
        select, input, button, textarea { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
        input:focus, select:focus, textarea:focus { border-color: rgba(74,107,168,0.5) !important; background: rgba(255,255,255,0.05) !important; }
        .card-hover { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15) !important; }

        /* Custom slider */
        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 100px;
          background: rgba(255,255,255,0.08);
          outline: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          cursor: pointer;
          border: 3px solid #0a1628;
          box-shadow: 0 0 0 2px #3b82f6, 0 0 20px rgba(96, 165, 250, 0.6);
          transition: all 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 0 2px #60a5fa, 0 0 30px rgba(96, 165, 250, 0.8);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          cursor: pointer;
          border: 3px solid #0a1628;
          box-shadow: 0 0 0 2px #3b82f6, 0 0 20px rgba(96, 165, 250, 0.6);
        }

        .footer-link { transition: color 0.2s; }
        .footer-link:hover { color: #fff !important; }

        @media (max-width: 720px) {
          .hide-mobile { display: none !important; }
          .grid-1-mobile { grid-template-columns: 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center !important; }
          .hero-text { text-align: center !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .problem-row { grid-template-columns: 1fr !important; }
          .problem-number { font-size: 80px !important; text-align: center !important; }
        }
      `}</style>

      {/* PROGRESS BAR */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1001, background: "rgba(255,255,255,0.04)" }}>
        <div style={{
          height: "100%", width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #60a5fa 0%, #4ade80 100%)",
          transition: "width 0.1s linear", boxShadow: "0 0 10px rgba(96,165,250,0.6)",
        }} />
      </div>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 3, left: 0, right: 0, zIndex: 1000, padding: "16px 24px",
        background: scrolled ? "rgba(10,22,40,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={26} />
            <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", color: "#fff" }}>NAVY OS</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hide-mobile">
            <button onClick={() => go("problem")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", fontFamily: "inherit" }}>{t.nav.links.problem}</button>
            <button onClick={() => go("calc")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", fontFamily: "inherit" }}>{t.nav.links.calc}</button>
            <button onClick={() => go("solution")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", fontFamily: "inherit" }}>{t.nav.links.solution}</button>
            <button onClick={() => go("faq")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", fontFamily: "inherit" }}>{t.nav.links.faq}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, border: "1px solid rgba(255,255,255,0.06)" }}>
              {["sk", "cs", "en"].map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "5px 11px", fontSize: 11, fontWeight: 600, border: "none", borderRadius: 7, cursor: "pointer",
                  background: lang === l ? "rgba(255,255,255,0.1)" : "transparent",
                  color: lang === l ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.2s",
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
            <button onClick={() => go("form")} className="hide-mobile" style={{
              padding: "10px 20px", fontSize: 13, fontWeight: 600, border: "none", borderRadius: 10, cursor: "pointer",
              background: "#FFD60A", color: "#0a1628",
              boxShadow: "0 4px 20px rgba(255,214,10,0.3)",
            }}>{t.nav.cta}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "160px 24px 80px",
        background: "radial-gradient(ellipse at top, #0f1d35 0%, #0a1628 100%)",
        position: "relative", overflow: "hidden", minHeight: "100vh",
        display: "flex", alignItems: "center",
      }}>
        <div className="blob" style={{
          position: "absolute", top: "-200px", right: "-100px", width: 700, height: 700,
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)",
        }} />
        <div className="blob" style={{
          position: "absolute", bottom: "-200px", left: "-100px", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)", animationDelay: "-10s",
        }} />
        <div className="hero-grid" style={{
          maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2,
          display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center", width: "100%",
        }}>
          {/* LEFT - TEXT */}
          <div className="hero-text" style={{ textAlign: "left" }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)", marginBottom: 28, letterSpacing: "0.3px",
              }}>
                <span className="pulse-slow" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                {t.hero.badge}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 style={{
                fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.02,
                letterSpacing: "-0.04em", marginBottom: 24, color: "#fff",
              }}>
                {t.hero.h1a}
                <br />
                <span style={{
                  fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
                  background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {t.hero.h1b}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p style={{ fontSize: 19, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 36, maxWidth: 520 }}>
                {t.hero.sub}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <button onClick={() => go("form")} style={{
                padding: "20px 36px", fontSize: 17, fontWeight: 700,
                border: "none", borderRadius: 14, cursor: "pointer",
                background: "#FFD60A",
                color: "#0a1628", fontFamily: "inherit", letterSpacing: "-0.01em",
                boxShadow: "0 20px 60px rgba(255,214,10,0.35), 0 0 0 1px rgba(255,255,255,0.1) inset",
                display: "inline-flex", alignItems: "center", gap: 10,
                transition: "all 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {t.hero.cta} <Icon name="arrow" size={20} />
              </button>
              <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                {t.hero.ctaSub}
              </p>
            </Reveal>
          </div>

          {/* RIGHT - BUCKET */}
          <Reveal delay={200}>
            <BucketAnimation labels={[t.hero.bucketLabel1, t.hero.bucketLabel2, t.hero.bucketLabel3, t.hero.bucketLabel4]} />
          </Reveal>
        </div>
      </section>

      {/* PROBLEM - THREE HOLES */}
      <section id="problem" style={{ padding: "120px 24px", background: "#0a1628", position: "relative" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
              background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.15)",
              color: "#e63946", marginBottom: 20, letterSpacing: "0.3px", textTransform: "uppercase",
            }}>
              {t.problem.badge}
            </div>
            <h2 style={{
              fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 80, color: "#fff",
            }}>
              {t.problem.h2a}
              <br />
              <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
              }}>
                {t.problem.h2b}
              </span>
            </h2>
          </Reveal>

          {t.problem.items.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="problem-row" style={{
                display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60,
                padding: "60px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "center",
              }}>
                {/* LEFT - BIG NUMBER */}
                <div>
                  <div className="problem-number" style={{
                    fontSize: 140, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.05em",
                    background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.3) 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    marginBottom: 12,
                  }}>
                    {item.num}<span style={{ fontSize: 80, verticalAlign: "top" }}>{item.suffix}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 320 }}>
                    {item.stat}
                  </p>
                </div>

                {/* RIGHT - STORY */}
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "5px 12px", borderRadius: 6, background: "rgba(230,57,70,0.1)",
                    fontSize: 11, fontWeight: 700, color: "#ef4444",
                    letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 16,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
                    {item.title}
                  </div>
                  <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 16 }}>
                    {item.story}
                  </p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
                    {item.source}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={400}>
            <div style={{
              marginTop: 60, padding: "40px", borderRadius: 20,
              background: "rgba(230,57,70,0.05)",
              border: "1px solid rgba(230,57,70,0.15)",
              textAlign: "center",
            }}>
              <p style={{
                fontSize: 22, fontWeight: 500, color: "#fff",
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                lineHeight: 1.5,
              }}>
                {t.problem.bottom}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" style={{ padding: "120px 24px", background: "#0f1d35", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{
          position: "absolute", top: "20%", right: "-200px", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(255,214,10,0.06) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)",
        }} />
        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.2)",
                color: "#FFD60A", marginBottom: 20, letterSpacing: "0.3px", textTransform: "uppercase",
              }}>
                {t.calc.badge}
              </div>
              <h2 style={{
                fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, lineHeight: 1.1,
                letterSpacing: "-0.03em", marginBottom: 14, color: "#fff",
              }}>
                {t.calc.h2}
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)" }}>
                {t.calc.sub}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 28, padding: "48px",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}>
              {/* Slider 1 - Leads */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{t.calc.label1}</label>
                  <span style={{
                    fontSize: 22, fontWeight: 700, color: "#60a5fa",
                    minWidth: 60, textAlign: "right",
                  }}>{calcLeads}</span>
                </div>
                <input type="range" min="10" max="200" value={calcLeads} onChange={(e) => setCalcLeads(Number(e.target.value))} />
              </div>

              {/* Slider 2 - Job value */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{t.calc.label2}</label>
                  <span style={{
                    fontSize: 22, fontWeight: 700, color: "#60a5fa",
                    minWidth: 120, textAlign: "right",
                  }}>{calcJobValue.toLocaleString("sk-SK").replace(/,/g, " ")} €</span>
                </div>
                <input type="range" min="500" max="30000" step="500" value={calcJobValue} onChange={(e) => setCalcJobValue(Number(e.target.value))} />
              </div>

              {/* Slider 3 - Close rate */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{t.calc.label3}</label>
                  <span style={{
                    fontSize: 22, fontWeight: 700, color: "#60a5fa",
                    minWidth: 60, textAlign: "right",
                  }}>{calcCloseRate} %</span>
                </div>
                <input type="range" min="5" max="50" value={calcCloseRate} onChange={(e) => setCalcCloseRate(Number(e.target.value))} />
              </div>

              {/* RESULT */}
              <div style={{
                padding: "32px",
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(230,57,70,0.12) 0%, rgba(230,57,70,0.04) 100%)",
                border: "1px solid rgba(230,57,70,0.2)",
                textAlign: "center",
              }}>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>
                  {t.calc.result}
                </p>
                <div style={{
                  fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  lineHeight: 1, marginBottom: 12,
                }}>
                  {monthlyLoss.toLocaleString("sk-SK").replace(/,/g, " ")} €
                </div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                  {t.calc.yearly}: <strong style={{ color: "#fff" }}>{yearlyLoss.toLocaleString("sk-SK").replace(/,/g, " ")} €</strong>
                </p>
                {calcCloseRate < industryAvg && (
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 12, lineHeight: 1.5 }}>
                    {t.calc.explanation} {calcCloseRate}{t.calc.explanation2} <strong style={{ color: "#4ade80" }}>{extraJobs.toFixed(1)}</strong> {t.calc.explanation3}
                  </p>
                )}
              </div>

              <div style={{ marginTop: 32, textAlign: "center" }}>
                <button onClick={() => go("form")} style={{
                  padding: "18px 36px", fontSize: 16, fontWeight: 700,
                  border: "none", borderRadius: 14, cursor: "pointer",
                  background: "#FFD60A", color: "#0a1628", fontFamily: "inherit",
                  boxShadow: "0 12px 40px rgba(255,214,10,0.3)",
                  display: "inline-flex", alignItems: "center", gap: 10, transition: "all 0.3s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {t.calc.cta} <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION - BUCKET REPAIR */}
      <section id="solution" style={{ padding: "120px 24px", background: "#0a1628", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{
          position: "absolute", top: "10%", left: "-200px", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
                color: "#4ade80", marginBottom: 20, letterSpacing: "0.3px", textTransform: "uppercase",
              }}>
                {t.solution.badge}
              </div>
              <h2 style={{
                fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.05,
                letterSpacing: "-0.03em", marginBottom: 16, color: "#fff",
              }}>
                {t.solution.h2a}
                <br />
                <span style={{
                  fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
                  background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {t.solution.h2b}
                </span>
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 620, margin: "0 auto" }}>
                {t.solution.sub}
              </p>
            </div>
          </Reveal>

          <div className="grid-1-mobile" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          }}>
            {t.solution.columns.map((col, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="card-hover" style={{
                  padding: 36, borderRadius: 24, height: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(74,222,128,0.15) 0%, rgba(74,222,128,0.05) 100%)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  }}>
                    <Icon name={col.icon} size={26} color="#4ade80" strokeWidth={2} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.02em", color: "#fff" }}>
                    {col.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>
                    {col.subtitle}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 2,
                          background: "rgba(74,222,128,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Icon name="check" size={11} color="#4ade80" strokeWidth={3} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <p style={{
              marginTop: 60, fontSize: 22, fontWeight: 500, textAlign: "center",
              fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
              color: "rgba(255,255,255,0.7)",
            }}>
              {t.solution.bottom}
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOW - PROCESS */}
      <section style={{ padding: "120px 24px", background: "#0f1d35" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)", marginBottom: 20, letterSpacing: "0.3px", textTransform: "uppercase",
            }}>
              {t.how.badge}
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 64, color: "#fff",
            }}>
              {t.how.h2}
            </h2>
          </Reveal>
          <div className="grid-1-mobile" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
          }}>
            {t.how.steps.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{
                  padding: 24, borderRadius: 18, textAlign: "left", height: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{
                    fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    lineHeight: 1, marginBottom: 12,
                  }}>
                    {s.num}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "#fff", letterSpacing: "-0.01em" }}>
                    {s.title}
                  </h3>
                  <div style={{
                    display: "inline-block",
                    fontSize: 11, fontWeight: 600, color: "#60a5fa",
                    background: "rgba(96,165,250,0.1)", padding: "3px 10px", borderRadius: 100,
                    marginBottom: 12,
                  }}>
                    {s.time}
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section style={{ padding: "120px 24px", background: "#0a1628", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)",
        }} />
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <div className="float" style={{
              width: 96, height: 96, borderRadius: 24,
              background: "linear-gradient(135deg, rgba(74,222,128,0.15) 0%, rgba(74,222,128,0.04) 100%)",
              border: "1px solid rgba(74,222,128,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px",
              boxShadow: "0 20px 60px rgba(74,222,128,0.15)",
            }}>
              <Icon name="shield" size={44} color="#4ade80" strokeWidth={1.5} />
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
              color: "#4ade80", marginBottom: 24, letterSpacing: "0.3px", textTransform: "uppercase",
            }}>
              {t.guarantee.badge}
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 40, color: "#fff",
            }}>
              {t.guarantee.h2a}
              <br />
              <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {t.guarantee.h2b}
              </span>
            </h2>
            <div style={{ textAlign: "left", maxWidth: 640, margin: "0 auto" }}>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 20 }}>
                {t.guarantee.p1}
              </p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.75, marginBottom: 20, fontWeight: 500 }}>
                {t.guarantee.p2}
              </p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 20 }}>
                {t.guarantee.p3}
              </p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.75, fontWeight: 500, marginBottom: 28 }}>
                {t.guarantee.p4}
              </p>
              <p style={{
                fontSize: 20, color: "#4ade80",
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                textAlign: "right",
              }}>
                {t.guarantee.signature}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT - Who I am */}
      <section style={{ padding: "120px 24px", background: "#0f1d35", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{
          position: "absolute", top: "30%", right: "-200px", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)",
        }} />
        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)", marginBottom: 20, letterSpacing: "0.3px", textTransform: "uppercase",
              }}>
                {t.about.badge}
              </div>
              <h2 style={{
                fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, lineHeight: 1.1,
                letterSpacing: "-0.03em", color: "#fff",
              }}>
                {t.about.h2}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 24, padding: "44px 48px",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: 20 }}>
                {t.about.p1}
              </p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 20 }}>
                {t.about.p2}
              </p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
                {t.about.p3}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "120px 24px", background: "#0f1d35" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)", marginBottom: 20, letterSpacing: "0.3px", textTransform: "uppercase",
              }}>
                {t.faq.badge}
              </div>
              <h2 style={{
                fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, lineHeight: 1.1,
                letterSpacing: "-0.03em", color: "#fff",
              }}>
                {t.faq.h2}
              </h2>
            </div>
          </Reveal>
          <div>
            {t.faq.items.map((x, i) => (
              <Reveal key={i} delay={i * 40}>
                <div style={{
                  marginBottom: 12, borderRadius: 16,
                  background: openFaq === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                  border: openFaq === i ? "1px solid rgba(96,165,250,0.25)" : "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden", transition: "all 0.3s",
                }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "24px 28px", background: "none", border: "none", cursor: "pointer",
                    fontSize: 16, fontWeight: 600, color: "#fff", textAlign: "left",
                  }}>
                    {x.q}
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0, marginLeft: 14,
                      background: openFaq === i ? "#60a5fa" : "rgba(255,255,255,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", transition: "all 0.3s",
                    }}>
                      <Icon name="plus" size={16} color={openFaq === i ? "#0a1628" : "#fff"} strokeWidth={3} />
                    </div>
                  </button>
                  <div style={{
                    maxHeight: openFaq === i ? 400 : 0, opacity: openFaq === i ? 1 : 0,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", overflow: "hidden",
                  }}>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, padding: "0 28px 24px" }}>
                      {x.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        padding: "120px 24px 80px", background: "#0a1628",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div className="blob" style={{
          position: "absolute", top: "-100px", right: "-100px", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)",
        }} />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <BucketFixed />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h2 style={{
              fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 20, color: "#fff",
            }}>
              <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {t.finalCta.h2}
              </span>
            </h2>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,0.6)", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
              {t.finalCta.sub}
            </p>
            <button onClick={() => go("form")} style={{
              padding: "22px 44px", fontSize: 18, fontWeight: 700,
              border: "none", borderRadius: 16, cursor: "pointer",
              background: "#FFD60A", color: "#0a1628", fontFamily: "inherit", letterSpacing: "-0.01em",
              boxShadow: "0 24px 60px rgba(255,214,10,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
              display: "inline-flex", alignItems: "center", gap: 12, transition: "all 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
            >
              {t.finalCta.cta} <Icon name="arrow" size={22} />
            </button>
            <p style={{ marginTop: 18, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              {t.finalCta.ctaSub}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORM */}
      <section id="form" style={{ padding: "100px 24px", background: "#0f1d35", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{
          position: "absolute", bottom: "-200px", left: "-200px", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)",
        }} />
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
              background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.2)",
              color: "#FFD60A", marginBottom: 20, letterSpacing: "0.3px", textTransform: "uppercase",
            }}>
              {t.form.badge}
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 700, lineHeight: 1.1,
              letterSpacing: "-0.03em", marginBottom: 14, color: "#fff",
            }}>
              {t.form.h2}
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginBottom: 40 }}>
              {t.form.sub}
            </p>
          </Reveal>

          {done ? (
            <Reveal>
              <div style={{
                padding: 48, borderRadius: 24,
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
              }}>
                <div className="float" style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(74,222,128,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
                }}>
                  <Icon name="check" size={40} color="#4ade80" strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, color: "#fff" }}>
                  {t.form.done.h}
                </h3>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  {t.form.done.p}
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={150}>
              <div style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 24, padding: 40,
                border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)",
              }}>
                {/* Progress */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.3px", textTransform: "uppercase" }}>
                      {t.form.step} {formStep} {t.form.of} {totalSteps}
                    </span>
                    <span style={{ fontSize: 12, color: "#60a5fa", fontWeight: 700 }}>
                      {Math.round(formProgress)}%
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 100, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${formProgress}%`,
                      background: "linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)",
                      borderRadius: 100,
                      transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: "0 0 12px rgba(96,165,250,0.4)",
                    }} />
                  </div>
                </div>

                {/* Step 1 */}
                {formStep === 1 && (
                  <div style={{ animation: "fade-in-up 0.4s ease" }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>{t.form.fields.name}</label>
                      <input type="text" placeholder={t.form.fields.namePh} value={fd.name || ""} onChange={(e) => setFd({ ...fd, name: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.form.fields.company}</label>
                      <input type="text" placeholder={t.form.fields.companyPh} value={fd.company || ""} onChange={(e) => setFd({ ...fd, company: e.target.value })} style={inputStyle} />
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {formStep === 2 && (
                  <div style={{ animation: "fade-in-up 0.4s ease" }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>{t.form.fields.trade}</label>
                      <select value={fd.trade || ""} onChange={(e) => setFd({ ...fd, trade: e.target.value })} style={{ ...inputStyle, color: fd.trade ? "#fff" : "rgba(255,255,255,0.3)", cursor: "pointer", appearance: "none" }}>
                        <option value="" style={{ background: "#1a2744" }}>—</option>
                        {t.form.fields.tradeOptions.map((o) => <option key={o} value={o} style={{ background: "#1a2744", color: "#fff" }}>{o}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>{t.form.fields.leads}</label>
                      <select value={fd.leads || ""} onChange={(e) => setFd({ ...fd, leads: e.target.value })} style={{ ...inputStyle, color: fd.leads ? "#fff" : "rgba(255,255,255,0.3)", cursor: "pointer", appearance: "none" }}>
                        <option value="" style={{ background: "#1a2744" }}>—</option>
                        {t.form.fields.leadsOptions.map((o) => <option key={o} value={o} style={{ background: "#1a2744", color: "#fff" }}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.form.fields.revenue}</label>
                      <select value={fd.revenue || ""} onChange={(e) => setFd({ ...fd, revenue: e.target.value })} style={{ ...inputStyle, color: fd.revenue ? "#fff" : "rgba(255,255,255,0.3)", cursor: "pointer", appearance: "none" }}>
                        <option value="" style={{ background: "#1a2744" }}>—</option>
                        {t.form.fields.revenueOptions.map((o) => <option key={o} value={o} style={{ background: "#1a2744", color: "#fff" }}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {formStep === 3 && (
                  <div style={{ animation: "fade-in-up 0.4s ease" }}>
                    <label style={labelStyle}>{t.form.fields.problem}</label>
                    <textarea
                      placeholder={t.form.fields.problemPh}
                      value={fd.problem || ""}
                      onChange={(e) => setFd({ ...fd, problem: e.target.value })}
                      rows={5}
                      style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    />
                  </div>
                )}

                {/* Step 4 */}
                {formStep === 4 && (
                  <div style={{ animation: "fade-in-up 0.4s ease" }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>{t.form.fields.phone}</label>
                      <input type="tel" placeholder={t.form.fields.phonePh} value={fd.phone || ""} onChange={(e) => setFd({ ...fd, phone: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.form.fields.email}</label>
                      <input type="email" placeholder={t.form.fields.emailPh} value={fd.email || ""} onChange={(e) => setFd({ ...fd, email: e.target.value })} style={inputStyle} />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  {formStep > 1 && (
                    <button onClick={() => setFormStep(formStep - 1)} style={{
                      padding: "14px 24px", fontSize: 14, fontWeight: 600,
                      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, cursor: "pointer",
                      background: "rgba(255,255,255,0.03)", color: "#fff", fontFamily: "inherit",
                    }}>{t.form.back}</button>
                  )}
                  {formStep < totalSteps ? (
                    <button onClick={() => canProceed && setFormStep(formStep + 1)} disabled={!canProceed} style={{
                      flex: 1, padding: 18, fontSize: 15, fontWeight: 700,
                      border: "none", borderRadius: 12, cursor: canProceed ? "pointer" : "not-allowed",
                      background: canProceed ? "#FFD60A" : "rgba(255,255,255,0.06)",
                      color: canProceed ? "#0a1628" : "rgba(255,255,255,0.3)", fontFamily: "inherit",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "all 0.3s",
                      boxShadow: canProceed ? "0 8px 24px rgba(255,214,10,0.3)" : "none",
                    }}>
                      {t.form.next} <Icon name="arrow" size={16} />
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={!canProceed || sending} style={{
                      flex: 1, padding: 18, fontSize: 15, fontWeight: 700,
                      border: "none", borderRadius: 12, cursor: (canProceed && !sending) ? "pointer" : "not-allowed",
                      background: (canProceed && !sending) ? "#FFD60A" : "rgba(255,255,255,0.06)",
                      color: (canProceed && !sending) ? "#0a1628" : "rgba(255,255,255,0.3)", fontFamily: "inherit",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                      boxShadow: (canProceed && !sending) ? "0 8px 24px rgba(255,214,10,0.3)" : "none",
                    }}>
                      {sending ? t.form.sending : <>{t.form.cta} <Icon name="arrow" size={16} /></>}
                    </button>
                  )}
                </div>

                {error && (
                  <p style={{ marginTop: 14, fontSize: 13, color: "#ef4444" }}>
                    {lang === "en" ? "Something went wrong. Please try again." : "Niečo sa pokazilo. Skúste to znova."}
                  </p>
                )}

                <p style={{ marginTop: 18, fontSize: 12, color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Icon name="shield" size={12} /> {t.form.disclaimer}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "80px 24px 32px", background: "#0a1628", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{
            display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 60, marginBottom: 56,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Logo size={32} />
                <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: "#fff" }}>NAVY OS</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 20, maxWidth: 320 }}>
                {t.footer.tagline}
              </p>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
                <div style={{ marginBottom: 4, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>{t.footer.operatedBy}</div>
                <div>NAZ Capital s. r. o.</div>
                <div>IČO: 57139521</div>
                <div>DIČ: 2122583386</div>
                <div>Baškovce 93, 067 23</div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                {t.footer.company}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                <li><a href="#" className="footer-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{t.footer.cAbout}</a></li>
                <li><a href="#" className="footer-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{t.footer.cBlog}</a></li>
                <li><a href="#" className="footer-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{t.footer.cContact}</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                {t.footer.product}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                <li><button onClick={() => go("solution")} className="footer-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "inherit", textAlign: "left" }}>{t.footer.pHow}</button></li>
                <li><button onClick={() => go("calc")} className="footer-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "inherit", textAlign: "left" }}>{t.footer.pCalc}</button></li>
                <li><button onClick={() => go("form")} className="footer-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "inherit", textAlign: "left" }}>{t.footer.pAudit}</button></li>
                <li><button onClick={() => go("faq")} className="footer-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "inherit", textAlign: "left" }}>{t.footer.pFaq}</button></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                {t.footer.legal}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                <li><a href="/privacy" className="footer-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{t.footer.lPrivacy}</a></li>
                <li><a href="/terms" className="footer-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{t.footer.lTerms}</a></li>
                <li><a href="/cookies" className="footer-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{t.footer.lCookies}</a></li>
                <li><a href="/gdpr" className="footer-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{t.footer.lGdpr}</a></li>
              </ul>
            </div>
          </div>

          <div style={{
            paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
          }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t.footer.copy}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
              <Icon name="shield" size={12} />
              GDPR Compliant · SSL Secured
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, padding: "12px 16px",
        background: "rgba(10,22,40,0.95)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        transform: scrolled ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <button onClick={() => go("form")} style={{
          width: "100%", padding: 16, fontSize: 15, fontWeight: 700,
          border: "none", borderRadius: 12, cursor: "pointer",
          background: "#FFD60A", color: "#0a1628", fontFamily: "inherit",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: "0 8px 24px rgba(255,214,10,0.3)",
        }}>
          {t.sticky} <Icon name="arrow" size={16} />
        </button>
      </div>

      {/* WHATSAPP */}
      <a href="https://wa.me/421900000000" target="_blank" rel="noopener noreferrer" style={{
        position: "fixed", bottom: scrolled ? 84 : 24, right: 24, zIndex: 998,
        width: 58, height: 58, borderRadius: "50%", background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", textDecoration: "none",
      }}>
        <svg width={28} height={28} viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* EXIT POPUP */}
      {exit && (
        <div onClick={() => setExit(false)} style={{
          position: "fixed", inset: 0, zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
          animation: "fade-in-up 0.4s ease", padding: 20,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#0f1d35", borderRadius: 28, padding: 44, maxWidth: 480, width: "100%",
            textAlign: "center", position: "relative",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
            animation: "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <button onClick={() => setExit(false)} style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(255,255,255,0.06)", border: "none",
              width: 32, height: 32, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Icon name="x" size={16} color="rgba(255,255,255,0.5)" />
            </button>
            <div className="float" style={{
              width: 72, height: 72, borderRadius: 20,
              background: "rgba(255,214,10,0.1)",
              border: "1px solid rgba(255,214,10,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
            }}>
              <Icon name="sparkle" size={32} color="#FFD60A" strokeWidth={2} />
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em", color: "#fff" }}>
              {t.exitPopup.h2}
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", marginBottom: 28, lineHeight: 1.6 }}>
              {t.exitPopup.sub}
            </p>
            <button onClick={() => { setExit(false); go("form"); }} style={{
              width: "100%", padding: 16, fontSize: 15, fontWeight: 700,
              border: "none", borderRadius: 12, cursor: "pointer",
              background: "#FFD60A", color: "#0a1628", fontFamily: "inherit", marginBottom: 12,
              boxShadow: "0 8px 24px rgba(255,214,10,0.3)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <Icon name="arrow" size={16} />
              {t.exitPopup.cta1}
            </button>
            <button onClick={() => setExit(false)} style={{
              background: "none", border: "none", fontSize: 13,
              color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 8,
            }}>{t.exitPopup.cta2}</button>
          </div>
        </div>
      )}
    </div>
  );
}
