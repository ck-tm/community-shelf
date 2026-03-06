(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/context/ThemeProvider.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ThemeProvider(param) {
    let { initialTheme = "light", children } = param;
    _s();
    const [dark, setDarkState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTheme === "dark");
    // Apply theme class on mount and change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            document.documentElement.classList.toggle("dark", dark);
        }
    }["ThemeProvider.useEffect"], [
        dark
    ]);
    const setDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[setDark]": (value)=>{
            const isDark = typeof value === "function" ? value(dark) : value;
            setDarkState(isDark);
            // Persist to cookie
            document.cookie = "theme=".concat(isDark ? "dark" : "light", ";path=/;max-age=").concat(365 * 24 * 60 * 60, ";samesite=lax");
        }
    }["ThemeProvider.useCallback[setDark]"], [
        dark
    ]);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[toggle]": ()=>setDark({
                "ThemeProvider.useCallback[toggle]": (d)=>!d
            }["ThemeProvider.useCallback[toggle]"])
    }["ThemeProvider.useCallback[toggle]"], [
        setDark
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            dark,
            setDark,
            toggle
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/ThemeProvider.jsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "+lf8uHsRDvQliJfO599kRaHa/Vc=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
_s1(useTheme, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/i18n/ro.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"nav\":{\"brand\":\"Biblio•tech•a\",\"dashboard\":\"Panou de control\",\"login\":\"Conectare\",\"createLibrary\":\"Creează o bibliotecă\",\"signOut\":\"Deconectare\",\"lightMode\":\"Comută la modul luminos\",\"darkMode\":\"Comută la modul întunecat\",\"pageTitle\":\"Community Shelf — Biblioteca comunității tale, online\",\"contact\":\"Contact\"},\"footer\":{\"brand\":\"Community Shelf\",\"terms\":\"Termeni și condiții\",\"contact\":\"Contact\",\"privacy\":\"Confidențialitate\",\"copyright\":\"Drepturi de autor\",\"madeWith\":\"Făcut cu ♥ de\"},\"landing\":{\"badge\":\"Gratuit pentru orice comunitate\",\"heroTitle1\":\"Biblioteca\",\"heroTitle2\":\"online\",\"heroTitleHighlight\":\"comunității tale\",\"subtitle\":\"Împarte cărți, jocuri, muzică și multe altele cu vecinii tăi. Tot ce ai nevoie ca să administrezi o bibliotecă comunitară — fără cunoștințe tehnice.\",\"ctaDashboard\":\"Către panou de control\",\"ctaCreate\":\"Creează-ți biblioteca\",\"ctaExplore\":\"Vezi cum funcționează\",\"featuresTitle\":\"Creat pentru bibliotecarii comunității\",\"featuresSubtitle\":\"Cataloghează-ți colecția, gestionează împrumuturile și fă-ți biblioteca să se simtă ca acasă.\",\"featureCatalogTitle\":\"Gestionare catalog\",\"featureCatalogDesc\":\"Adaugă cărți, jocuri, muzică și multe altele — cu imagini de copertă și detalii completate automat.\",\"featureIsbnTitle\":\"Scanner ISBN\",\"featureIsbnDesc\":\"Îndreaptă telefonul spre codul de bare și adaugă o carte în câteva secunde. Ai o colecție mare? Import-o dintr-un fișier.\",\"featureTrackingTitle\":\"Urmărirea disponibilității\",\"featureTrackingDesc\":\"Vezi ce e disponibil, cine ce are împrumutat și unde se află fiecare exemplar — totul în timp real.\",\"featureLendingTitle\":\"Împrumuturi și returnări\",\"featureLendingDesc\":\"Membrii solicită un împrumut, tu aprobi, ei returnează. Reamintirile se trimit automat.\",\"featureListsTitle\":\"Colecții curatoriate\",\"featureListsDesc\":\"Creează liste de lectură, recomandări sezoniere sau «alegerile bibliotecii» pentru a-ți ajuta membrii.\",\"featureBrandingTitle\":\"Branding personalizat\",\"featureBrandingDesc\":\"Adaugă logo-ul tău, alege-ți culorile și fă biblioteca să aparțină comunității tale.\",\"featureSpaceTitle\":\"Spațiul tău propriu\",\"featureSpaceDesc\":\"Biblioteca ta e complet a ta — catalogul tău, membrii tăi, setările tale, separate de ale celorlalți.\",\"directoryTitle\":\"Biblioteci care folosesc deja Biblio•tech•a\",\"directorySubtitle\":\"Descoperă ce au construit alte comunități.\",\"directoryEmpty\":\"Nicio bibliotecă publică încă. Fii primul care\",\"directoryEmptyLink\":\"creează una\",\"mapTitle\":\"Găsește o bibliotecă în apropierea ta\",\"mapSubtitle\":\"Explorează bibliotecile comunitare pe hartă.\",\"mapVisit\":\"Vizitează biblioteca\",\"locateMe\":\"Găsește-mă\",\"you\":\"Tu\",\"ctaBottomTitle\":\"Gata să împarți?\",\"ctaBottomSubtitle\":\"Creează un cont gratuit și biblioteca ta va fi gata cât mai repede posibil.\",\"ctaBottomButton\":\"Creează-ți biblioteca gratuită\"},\"dashboard\":{\"title\":\"Panou de control\",\"welcome\":\"Bine ai revenit, {{name}}.\",\"subtitle\":\"Gestionează cererile tale de bibliotecă de mai jos.\",\"yourLibraries\":\"Bibliotecile tale\",\"pendingRequests\":\"Cereri în așteptare\",\"underReview\":\"În curs de analiză\",\"declined\":\"Respinse\",\"requestNew\":\"Solicită o bibliotecă nouă\",\"orgName\":\"Numele organizației\",\"country\":\"Țara\",\"city\":\"Orașul\",\"description\":\"Descriere\",\"optional\":\"opțional\",\"orgPlaceholder\":\"ex. Biblioteca de Cartier Greenwood\",\"countryPlaceholder\":\"ex. România\",\"cityPlaceholder\":\"ex. Timișoara\",\"descPlaceholder\":\"Spune-ne despre comunitatea ta și ce ai vrea să împarți...\",\"slug\":\"Subdomeniu\",\"slugPlaceholder\":\"biblioteca-mea\",\"slugHint\":\"Aceasta va fi adresa web a bibliotecii tale\",\"submit\":\"Trimite cererea\",\"cancel\":\"Anulează\",\"open\":\"Deschide\",\"address\":\"Adresă\",\"addressPlaceholder\":\"Strada Principală nr. 123, Bloc A\",\"googleMapsUrl\":\"Link Google Maps\",\"googleMapsPlaceholder\":\"https://maps.google.com/...\"},\"contact\":{\"title\":\"Contactează-ne\",\"subtitle\":\"Ai o întrebare, o sugestie sau ai găsit un bug? Ne-ar plăcea să auzim de la tine.\",\"name\":\"Numele tău\",\"namePlaceholder\":\"Ion Popescu\",\"email\":\"Adresă de email\",\"emailPlaceholder\":\"ion@exemplu.ro\",\"category\":\"Categorie\",\"categoryGeneral\":\"Întrebare generală\",\"categoryFeature\":\"Sugestie funcționalitate\",\"categoryBug\":\"Raport de eroare\",\"subject\":\"Subiect\",\"subjectPlaceholder\":\"Cum te putem ajuta?\",\"message\":\"Mesaj\",\"messagePlaceholder\":\"Spune-ne mai multe...\",\"submit\":\"Trimite mesajul\",\"submitting\":\"Se trimite...\",\"successTitle\":\"Mesaj trimis!\",\"successMessage\":\"Mulțumim că ne-ai scris. Vom reveni cu un răspuns cât mai curând posibil.\",\"sendAnother\":\"Trimite alt mesaj\",\"turnstileError\":\"Te rugăm să completezi verificarea\"},\"terms\":{\"title\":\"Termeni și condiții\",\"lastUpdated\":\"Ultima actualizare: {{date}}\",\"intro\":\"Bine ai venit pe Biblio•tech•a. Prin crearea unui cont sau utilizarea platformei, ești de acord cu următorii termeni. Sunt scriși pe înțelesul tuturor — fără capcane juridice.\",\"section1Title\":\"1. Ce este Biblio•tech•a\",\"section1p1\":\"Biblio•tech•a este o platformă gratuită care permite oricui să creeze și să administreze o bibliotecă comunitară de împrumut online. Fiecare bibliotecă primește propriul subdomeniu, catalog și bază de membri. Biblio•tech•a oferă software-ul; administratorii bibliotecilor furnizează conținutul și își gestionează propriile comunități.\",\"section2Title\":\"2. Conturi și eligibilitate\",\"section2p1\":\"Trebuie să ai cel puțin 16 ani pentru a-ți crea un cont. Ești responsabil(ă) pentru păstrarea în siguranță a datelor de autentificare. O persoană poate administra mai multe biblioteci, dar fiecare cont trebuie să reprezinte o persoană reală — conturile create automat nu sunt permise.\",\"section3Title\":\"3. Crearea și administrarea unei biblioteci\",\"section3p1\":\"Când creezi o bibliotecă, devii administratorul acesteia. Ca administrator, ești responsabil(ă) pentru conținutul listat, membrii acceptați și politicile de împrumut stabilite. Biblio•tech•a nu verifică, nu validează și nu garantează acuratețea nicio intrare din catalog, starea de disponibilitate sau condiția vreunui articol.\",\"section3p2\":\"Poți personaliza numele bibliotecii, branding-ul și descrierea publică. Nu poți folosi aceste funcții pentru a te da drept altă organizație, a răspândi informații false sau a promova activități ilegale.\",\"section4Title\":\"4. Utilizare acceptabilă\",\"section4p1\":\"Te angajezi să nu: încarci conținut care încalcă drepturi de proprietate intelectuală; folosești platforma pentru a hărțui, amenința sau discrimina; încerci să accesezi neautorizat alte conturi sau biblioteci; folosești instrumente automatizate pentru a extrage date sau a supraîncărca serviciul; listezi articole al căror împrumut este ilegal în jurisdicția ta.\",\"section4p2\":\"Ne rezervăm dreptul de a suspenda sau elimina orice bibliotecă sau cont care încalcă acești termeni, cu sau fără notificare prealabilă.\",\"section5Title\":\"5. Conținut și proprietate intelectuală\",\"section5p1\":\"Păstrezi proprietatea asupra oricărui conținut pe care îl încarci (imagini de copertă, descrieri, logo-uri). Prin încărcarea conținutului, acorzi Biblio•tech•a o licență neexclusivă de a-l afișa în cadrul platformei. Nu vom vinde niciodată conținutul tău și nu-l vom folosi în afara serviciului.\",\"section5p2\":\"Software-ul, designul și branding-ul Biblio•tech•a sunt proprietatea Biblio•tech•a. Nu le poți copia, modifica sau redistribui fără permisiune.\",\"section6Title\":\"6. Confidențialitate și date\",\"section6p1\":\"Colectăm doar informațiile necesare pentru funcționarea serviciului: adresa ta de email, numele afișat și activitatea de împrumut. Administratorii bibliotecilor pot vedea numele și adresele de email ale membrilor, plus istoricul împrumuturilor din cadrul bibliotecii lor.\",\"section6p2\":\"Nu vindem date personale terților. Folosim cookie-uri doar pentru autentificare și preferințe de temă — fără cookie-uri de urmărire sau publicitate. Poți solicita ștergerea contului și a datelor asociate oricând, contactându-ne.\",\"section7Title\":\"7. Limitarea răspunderii\",\"section7p1\":\"Biblio•tech•a este furnizat «ca atare», fără garanții de nicio natură. Nu suntem responsabili pentru articolele pierdute, deteriorate sau nereturnate în timpul împrumutului. Disputele dintre membrii bibliotecii și administratori trebuie rezolvate direct între părțile implicate.\",\"section7p2\":\"Răspunderea noastră totală față de tine pentru orice pretenție legată de utilizarea serviciului este limitată la suma pe care ne-ai plătit-o — care, pentru versiunea gratuită, este zero.\",\"section8Title\":\"8. Disponibilitatea serviciului\",\"section8p1\":\"Ne propunem să menținem platforma disponibilă non-stop, dar nu garantăm funcționarea neîntreruptă. Putem efectua lucrări de mentenanță, actualiza funcționalitățile sau — în cazuri rare — întrerupe serviciul. Dacă planificăm oprirea serviciului, vom oferi un preaviz de cel puțin 30 de zile și posibilitatea de a-ți exporta datele.\",\"section9Title\":\"9. Modificarea acestor termeni\",\"section9p1\":\"Putem actualiza acești termeni periodic. Când o facem, vom revizui data «Ultima actualizare» de la începutul paginii. Utilizarea continuă a platformei după o modificare constituie acceptare. Pentru modificări semnificative, vom face eforturi rezonabile să te notificăm prin email sau un banner în aplicație.\",\"section10Title\":\"10. Contact\",\"section10p1\":\"Dacă ai întrebări despre acești termeni sau trebuie să raportezi o încălcare, scrie-ne la hello@communityshelf.org.\",\"backHome\":\"Înapoi la pagina principală\"},\"auth\":{\"welcomeBack\":\"Bine ai revenit\",\"signInSubtitle\":\"Conectează-te la contul tău\",\"email\":\"Email\",\"password\":\"Parolă\",\"signingIn\":\"Se conectează...\",\"signIn\":\"Conectează-te\",\"noAccount\":\"Nu ai cont?\",\"createOne\":\"Creează unul\",\"createAccount\":\"Creează un cont\",\"joinSubtitle\":\"Alătură-te comunității\",\"confirmPassword\":\"Confirmă parola\",\"creatingAccount\":\"Se creează contul...\",\"createAccountBtn\":\"Creează cont\",\"agreeTerms\":\"Prin crearea contului ești de acord cu\",\"termsLink\":\"Termenii și condițiile\",\"hasAccount\":\"Ai deja un cont?\",\"signInLink\":\"Conectează-te\"},\"tenantNav\":{\"browse\":\"Colecție\",\"lists\":\"Liste\",\"about\":\"Despre\",\"contact\":\"Contact\",\"myAccount\":\"Contul meu\",\"admin\":\"Administrare\",\"adminPanel\":\"Panou admin\",\"signOut\":\"Deconectare\",\"login\":\"Conectare\",\"lightMode\":\"Comută la modul luminos\",\"darkMode\":\"Comută la modul întunecat\"},\"browse\":{\"title\":\"Explorează biblioteca\",\"searchPlaceholder\":\"Ce cauți?\",\"all\":\"Toate\",\"newest\":\"Cele mai noi\",\"titleAsc\":\"A–Z\",\"available\":\"Disponibile\",\"titleCount_one\":\"{{count}} titlu\",\"titleCount_other\":\"{{count}} titluri\",\"gridView\":\"Vizualizare grilă\",\"tableView\":\"Vizualizare tabel\",\"shelfView\":\"Vizualizare raft\",\"nothingFound\":\"Nimic găsit\",\"nothingFoundHint\":\"Încearcă alt termen de căutare sau filtru.\",\"thTitle\":\"Titlu\",\"thAuthor\":\"Autor\",\"thType\":\"Tip\",\"thYear\":\"An\",\"thCopies\":\"Exemplare\",\"noCopies\":\"Fără exemplare\",\"unavailable\":\"Indisponibil\",\"of\":\"din\",\"curatedLists\":\"Colecții curatoriate\",\"handPicked\":\"Colecții alese cu grijă\",\"curatedDesc\":\"Explorează ghiduri tematice de lectură create de comunitate.\",\"viewAllLists\":\"Vezi toate listele\"},\"titleDetail\":{\"notFound\":\"Titlu negăsit\",\"backToCatalog\":\"Înapoi la catalog\",\"availableCopies\":\"Exemplare disponibile\",\"availableOf\":\"{{available}} din {{total}} disponibile\",\"condition\":\"Stare: {{condition}}\",\"available\":\"Disponibil\",\"reserved\":\"Rezervat\",\"request\":\"Solicită\",\"year\":\"An\",\"language\":\"Limba\",\"isbn\":\"ISBN / ID\",\"publisher\":\"Editură\"},\"aboutPage\":{\"aboutTitle\":\"Despre {{name}}\",\"mission\":\"Misiunea noastră\",\"missionText\":\"{{name}} conectează oamenii cu lucrurile pe care comunitatea lor le poate împărți. În loc să cumperi mereu nou, împrumută de la vecini. În loc să aduni praf, lasă cărțile să găsească noi cititori. Credem că împărțitul clădește comunități mai puternice — și salvează și câțiva copaci.\",\"howItWorks\":\"Cum funcționează\",\"step1Title\":\"Explorează colecția\",\"step1Text\":\"Descoperă ce are comunitatea ta de oferit — cărți, filme, muzică, jocuri și multe altele.\",\"step2Title\":\"Solicită un articol\",\"step2Text\":\"Ai găsit ceva care-ți place? Trimite o cerere și ți-l vom păstra.\",\"step3Title\":\"Ridică și bucură-te\",\"step3Text\":\"Ridică articolul, bucură-te de el în ritmul tău și returnează-l când ai terminat.\",\"readyToExplore\":\"Gata de explorare?\",\"browseOffer\":\"Explorează ce are de oferit comunitatea ta.\",\"browseCollection\":\"Explorează colecția\",\"visitUs\":\"Vizitează-ne\",\"viewOnMap\":\"Vezi pe Google Maps\"},\"listsPage\":{\"title\":\"Colecții curatoriate\",\"subtitle\":\"Colecții alese cu grijă și ghiduri de lectură de la comunitatea noastră.\",\"noLists\":\"Nicio listă încă\",\"noListsHint\":\"Revino curând pentru colecții curate.\"},\"listDetail\":{\"notFound\":\"Lista nu a fost găsită\",\"backToLists\":\"Înapoi la liste\"},\"account\":{\"myAccount\":\"Contul meu\",\"myRentals\":\"Împrumuturile mele\",\"myDetails\":\"Datele mele\"},\"rentals\":{\"title\":\"Împrumuturile mele\",\"subtitle\":\"Urmărește împrumuturile active și istoricul cererilor.\",\"activeLoans\":\"Împrumuturi active\",\"pendingRequests\":\"Cereri în așteptare\",\"overdueItems\":\"Articole întârziate\",\"loanHistory\":\"Istoric împrumuturi\",\"due\":\"Scadent: {{date}}\",\"cancel\":\"Anulează\",\"noInquiries\":\"Niciun împrumut încă. Începe să explorezi pentru a solicita articole!\"},\"details\":{\"title\":\"Datele mele\",\"subtitle\":\"Actualizează informațiile tale personale.\",\"personalInfo\":\"Informații personale\",\"firstName\":\"Prenume\",\"lastName\":\"Nume\",\"email\":\"Email\",\"phone\":\"Telefon\",\"address\":\"Adresă\",\"emailHint\":\"Adresa de email nu poate fi schimbată.\",\"saveChanges\":\"Salvează modificările\",\"saved\":\"Salvat!\"},\"modal\":{\"loginRequired\":\"Autentificare necesară\",\"loginMessage\":\"Trebuie să te conectezi pentru a solicita articole.\",\"close\":\"Închide\",\"logIn\":\"Conectează-te\",\"requestSubmitted\":\"Cerere trimisă!\",\"requestSubmittedMsg\":\"Cererea ta pentru <1>{{title}}</1> a fost trimisă. Vei fi notificat(ă) când va fi aprobată.\",\"requestItem\":\"Solicită articol\",\"notesLabel\":\"Observații (opțional)\",\"notesPlaceholder\":\"Cereri speciale sau observații...\",\"cancel\":\"Anulează\",\"confirmRequest\":\"Confirmă cererea\"},\"status\":{\"Pending\":\"În așteptare\",\"Approved\":\"Aprobat\",\"Active\":\"Activ\",\"Returned\":\"Returnat\",\"Overdue\":\"Întârziat\"},\"titleCard\":{\"available\":\"{{count}} disponibile\",\"unavailable\":\"Indisponibil\"},\"listCard\":{\"title_one\":\"{{count}} titlu\",\"title_other\":\"{{count}} titluri\",\"section_one\":\"{{count}} secțiune\",\"section_other\":\"{{count}} secțiuni\"},\"scanner\":{\"title\":\"Scanează codul de bare ISBN\",\"close\":\"Închide\",\"instruction\":\"Îndreaptă camera spre codul de bare de pe spatele cărții.\",\"cameraDenied\":\"Acces la cameră refuzat. Permite accesul la cameră și încearcă din nou.\",\"cameraError\":\"Nu s-a putut porni camera. Asigură-te că dispozitivul tău are cameră.\",\"lookingUp\":\"Se caută informațiile cărții...\",\"cancel\":\"Anulează\"},\"authorSelect\":{\"placeholder\":\"Filtrează după autor...\",\"search\":\"Caută autori...\",\"noResults\":\"Niciun autor găsit\"},\"confirm\":{\"cancel\":\"Anulează\",\"delete\":\"Șterge\"},\"adminNav\":{\"admin\":\"Administrare\",\"overview\":\"Prezentare generală\",\"types\":\"Tipuri\",\"titles\":\"Titluri\",\"curatedLists\":\"Colecții curatoriate\",\"inquiries\":\"Cereri\",\"siteConfig\":\"Configurare site\",\"descriptionPage\":\"Pagina Despre\"},\"adminDashboard\":{\"title\":\"Prezentare generală\",\"subtitle\":\"Administrează biblioteca ta comunitară.\",\"contentTypes\":\"Tipuri de conținut\",\"titles\":\"Titluri\",\"totalCopies\":\"Total exemplare\",\"curatedLists\":\"Colecții curatoriate\",\"pendingInquiries\":\"Cereri în așteptare\",\"siteConfig\":\"Configurare site\"},\"manageTitles\":{\"title\":\"Titluri\",\"subtitle\":\"{{count}} titluri în colecție.\",\"addTitle\":\"Adaugă titlu\",\"searchPlaceholder\":\"Caută titluri...\",\"noTitles\":\"Niciun titlu găsit.\",\"deleteTitle\":\"Șterge titlul\",\"deleteConfirm\":\"Ștergi \\\"{{title}}\\\" și toate exemplarele sale? Această acțiune nu poate fi anulată.\",\"noCopies\":\"Fără exemplare\"},\"manageLists\":{\"title\":\"Colecții curatoriate\",\"subtitle\":\"{{count}} liste publicate.\",\"newList\":\"Listă nouă\",\"noLists\":\"Nicio listă curată încă.\",\"deleteList\":\"Șterge lista\",\"deleteConfirm\":\"Ștergi \\\"{{title}}\\\"? Această acțiune nu poate fi anulată.\",\"sections_one\":\"{{count}} secțiune\",\"sections_other\":\"{{count}} secțiuni\",\"titles_one\":\"{{count}} titlu\",\"titles_other\":\"{{count}} titluri\"},\"manageInquiries\":{\"title\":\"Cereri\",\"subtitle\":\"Gestionează cererile de împrumut, împrumuturile active și returnările.\",\"pending\":\"În așteptare\",\"active\":\"Active\",\"history\":\"Istoric\",\"periodDays\":\"Perioadă (zile)\",\"accept\":\"Acceptă\",\"noPending\":\"Nicio cerere în așteptare.\",\"returned\":\"Returnat\",\"extend\":\"Prelungește\",\"due\":\"Scadent: {{date}}\",\"days\":\"{{count}}z\",\"noActive\":\"Niciun împrumut activ.\",\"requested\":\"Solicitat: {{date}}\",\"returnedDate\":\"Returnat: {{date}}\",\"noHistory\":\"Niciun articol returnat încă.\",\"markReturned\":\"Marchează ca returnat\",\"markReturnedConfirm\":\"Marchezi \\\"{{title}}\\\" ca returnat? Se va înregistra data de azi ca dată de returnare.\"},\"manageTypes\":{\"title\":\"Tipuri de conținut\",\"subtitle\":\"Definește tipurile de conținut disponibile în biblioteca ta.\",\"addType\":\"Adaugă tip\",\"namePlaceholder\":\"Nume tip (EN)\",\"nameRoPlaceholder\":\"Nume tip (RO)\",\"titleCount_one\":\"{{count}} titlu\",\"titleCount_other\":\"{{count}} titluri\",\"deleteTitle\":\"Șterge tipul\",\"deleteHasTitles\":\"\\\"{{name}}\\\" are {{count}} titluri asociate. Ștergi oricum acest tip?\",\"deleteConfirm\":\"Ștergi \\\"{{name}}\\\"? Această acțiune nu poate fi anulată.\"},\"siteConfig\":{\"title\":\"Configurare site\",\"subtitle\":\"Personalizează identitatea și tema bibliotecii tale.\",\"logo\":\"Logo\",\"uploadImage\":\"Încarcă imagine\",\"remove\":\"Elimină\",\"logoHint\":\"Încarcă o imagine pătrată (PNG, SVG sau JPG). Lasă gol pentru iconița implicită.\",\"siteTitle\":\"Titlu site\",\"siteTitleRo\":\"Titlu site (RO)\",\"siteDescription\":\"Descriere site\",\"siteDescriptionRo\":\"Descriere site (RO)\",\"roPlaceholder\":\"Traducere în română…\",\"descPlaceholder\":\"Descrie biblioteca ta comunitară...\",\"themeColors\":\"Culori temă\",\"reset\":\"Resetează\",\"quickPresets\":\"Presetări rapide\",\"presetTeal\":\"Teal clasic\",\"presetTealDesc\":\"Paleta originală de teal cald cu accente de chihlimbar\",\"presetIndigo\":\"Indigo academic\",\"presetIndigoDesc\":\"Indigo profund inspirat de coperțile de piele\",\"presetSage\":\"Salvie de pădure\",\"presetSageDesc\":\"Verde de pădure estompat, evocând natură și creștere\",\"presetBurgundy\":\"Vin burgundy\",\"presetBurgundyDesc\":\"Burgundy cald cu accente de aur pământiu\",\"presetTerracotta\":\"Teracotă caldă\",\"presetTerracottaDesc\":\"Teracotă pământească, înrădăcinată în căldură și tradiție\",\"primary\":\"Primar\",\"backgrounds\":\"Fundaluri\",\"accent\":\"Accent\",\"primaryDark\":\"Primar închis\",\"primaryDarker\":\"Primar mai închis\",\"primaryDarkest\":\"Primar cel mai închis\",\"background\":\"Fundal\",\"surface\":\"Suprafață\",\"saveConfig\":\"Salvează configurația\",\"saved\":\"Salvat!\",\"preview\":\"Previzualizare\",\"location\":\"Locație\",\"address\":\"Adresă\",\"addressPlaceholder\":\"Strada Principală nr. 123\",\"googleMapsUrl\":\"Link Google Maps\",\"googleMapsPlaceholder\":\"https://maps.google.com/...\",\"city\":\"Oraș\",\"country\":\"Țară\",\"viewOnMap\":\"Vezi pe hartă\"},\"titleForm\":{\"backToTitles\":\"Înapoi la titluri\",\"editTitle\":\"Editează titlul\",\"addTitle\":\"Adaugă titlu\",\"isbnLookup\":\"Căutare ISBN\",\"isbnPlaceholder\":\"Introdu ISBN sau scanează codul de bare...\",\"lookup\":\"Caută\",\"scan\":\"Scanează\",\"bookInfoLoaded\":\"Informațiile cărții au fost încărcate\",\"isbnDuplicate\":\"Acest ISBN există deja: {{title}}\",\"openAddCopy\":\"Deschide și adaugă exemplar\",\"title\":\"Titlu\",\"author\":\"Autor\",\"type\":\"Tip\",\"year\":\"An\",\"language\":\"Limba\",\"publisher\":\"Editură\",\"pages\":\"Pagini\",\"description\":\"Descriere\",\"cover\":\"Copertă\",\"fallbackColor\":\"Culoare de rezervă\",\"noImage\":\"Fără imagine\",\"removeImage\":\"Elimină imaginea\",\"firstCopy\":\"Primul exemplar\",\"location\":\"Locație\",\"locationPlaceholder\":\"ex. Raft A3, Sala 2\",\"condition\":\"Stare\",\"excellent\":\"Excelent\",\"good\":\"Bun\",\"fair\":\"Acceptabil\",\"cancel\":\"Anulează\",\"saving\":\"Se salvează...\",\"saveChanges\":\"Salvează modificările\",\"createTitle\":\"Creează titlu\",\"copies\":\"Exemplare\",\"add\":\"Adaugă\",\"locationPlaceholderShort\":\"ex. Raftul principal\",\"status\":\"Status\",\"statusAvailable\":\"Disponibil\",\"statusReserved\":\"Rezervat\",\"noCopiesYet\":\"Niciun exemplar încă. Adaugă unul mai sus.\",\"deleteCopy\":\"Șterge exemplarul\",\"deleteCopyConfirm\":\"Ștergi acest exemplar? Această acțiune nu poate fi anulată.\"},\"listForm\":{\"backToLists\":\"Înapoi la liste\",\"editList\":\"Editează lista\",\"newList\":\"Listă curată nouă\",\"title\":\"Titlu\",\"titlePlaceholder\":\"ex. Lecturi de vară\",\"description\":\"Descriere\",\"coverColor\":\"Culoare copertă\",\"sections\":\"Secțiuni\",\"addSection\":\"Adaugă secțiune\",\"sectionN\":\"Secțiunea {{n}}\",\"sectionHeading\":\"Titlu secțiune\",\"sectionText\":\"Textul secțiunii...\",\"linkedTitles\":\"Titluri asociate ({{count}})\",\"pickTitles\":\"+ Alege titluri\",\"noTitlesLinked\":\"Niciun titlu asociat încă.\",\"noSections\":\"Nicio secțiune încă. Apasă \\\"Adaugă secțiune\\\" pentru a începe.\",\"titleRo\":\"Titlu (RO)\",\"descriptionRo\":\"Descriere (RO)\",\"sectionHeadingRo\":\"Titlu secțiune (RO)\",\"sectionTextRo\":\"Textul secțiunii (RO)…\",\"roPlaceholder\":\"Traducere în română…\",\"cancel\":\"Anulează\",\"saveChanges\":\"Salvează modificările\",\"createList\":\"Creează lista\"},\"titlePicker\":{\"selectTitles\":\"Selectează titluri\",\"searchPlaceholder\":\"Caută titluri...\",\"selected\":\"{{count}} selectate\",\"cancel\":\"Anulează\",\"done\":\"Gata\"},\"tenantTerms\":{\"title\":\"Termeni și condiții\",\"lastUpdated\":\"Ultima actualizare: {{date}}\",\"intro\":\"Acești termeni se aplică utilizării tale de\",\"introSuffix\":\"Funcționează alături de\",\"platformTerms\":\"Termenii platformei Community Shelf\",\"introEnd\":\"care guvernează serviciul în ansamblu.\",\"section1Title\":\"1. Despre această bibliotecă\",\"section1p1\":\"{{name}} este o bibliotecă comunitară de împrumut alimentată de Community Shelf. Biblioteca este administrată independent de administratorul (administratorii) ei. Community Shelf oferă găzduirea și software-ul; administratorul gestionează catalogul, membrii și politicile de împrumut.\",\"section2Title\":\"2. Membership\",\"section2p1\":\"Prin crearea unui cont pe {{name}} ești de acord cu acești termeni și cu Termenii și Condițiile platformei Community Shelf. Contul tău este universal — același cont funcționează pe toate bibliotecile Community Shelf.\",\"section3Title\":\"3. Împrumuturi și returnări\",\"section3p1\":\"Când soliciți un articol, administratorul bibliotecii decide dacă aprobă sau respinge cererea. Împrumuturile aprobate au o dată scadentă; te rugăm să returnezi articolele la timp pentru ca și alții să se poată bucura de ele. Nereturnarea repetată poate duce la suspendarea privilegiilor de împrumut.\",\"section3p2\":\"Ești responsabil(ă) pentru articolele aflate în posesia ta. Dacă un articol este pierdut sau deteriorat, contactează direct administratorul bibliotecii pentru a găsi o soluție.\",\"section4Title\":\"4. Responsabilitățile tale\",\"section4p1\":\"Tratează biblioteca și comunitatea ei cu respect. Nu trimite cereri de împrumut false, nu falsifica starea articolelor și nu folosi platforma pentru a hărțui alți membri. Administratorul își rezervă dreptul de a elimina membrii care încalcă aceste așteptări.\",\"section5Title\":\"5. Confidențialitate\",\"section5p1\":\"Numele tău, adresa de email și istoricul împrumuturilor din cadrul acestei biblioteci sunt vizibile administratorului. Aceste informații sunt folosite exclusiv pentru gestionarea împrumuturilor și nu vor fi partajate cu terți. Pentru detalii despre cum platforma gestionează datele tale, consultă secțiunea de confidențialitate din termenii platformei.\",\"section6Title\":\"6. Limitarea răspunderii\",\"section6p1\":\"{{name}} și administratorul său oferă acest serviciu în mod voluntar și cu bună-credință. Nici administratorul bibliotecii, nici Community Shelf nu sunt responsabili pentru nicio pierdere, daună sau dispută rezultată din împrumutul articolelor. Toate articolele sunt împrumutate «ca atare», fără garanție.\",\"section7Title\":\"7. Modificări\",\"section7p1\":\"Administratorul bibliotecii sau Community Shelf pot actualiza acești termeni oricând. Utilizarea continuă după o modificare constituie acceptare.\",\"backToBrowsing\":\"Înapoi la colecție\"},\"descriptionPage\":{\"title\":\"Pagina Despre\",\"subtitle\":\"Editează conținutul paginii Despre a bibliotecii tale.\",\"pageTitle\":\"Titlul paginii\",\"pageTitleRo\":\"Titlul paginii (RO)\",\"body\":\"Conținut\",\"bodyRo\":\"Conținut (RO)\",\"missionTitle\":\"Titlu misiune\",\"missionTitleRo\":\"Titlu misiune (RO)\",\"missionText\":\"Textul misiunii\",\"missionTextRo\":\"Textul misiunii (RO)\",\"roPlaceholder\":\"Traducere în română…\",\"save\":\"Salvează\",\"saved\":\"Salvat!\"},\"tenantContact\":{\"title\":\"Contactează-ne\",\"subtitle\":\"Ai o întrebare sau un feedback? Ne-ar plăcea să auzim de la tine.\",\"name\":\"Numele tău\",\"namePlaceholder\":\"Ion Popescu\",\"email\":\"Adresă de email\",\"emailPlaceholder\":\"ion@exemplu.ro\",\"subject\":\"Subiect\",\"subjectPlaceholder\":\"Cum te putem ajuta?\",\"message\":\"Mesaj\",\"messagePlaceholder\":\"Spune-ne mai multe...\",\"submit\":\"Trimite mesajul\",\"submitting\":\"Se trimite...\",\"successTitle\":\"Mesaj trimis!\",\"successMessage\":\"Mulțumim că ne-ai scris. Vom reveni cu un răspuns în curând.\",\"sendAnother\":\"Trimite alt mesaj\",\"findUs\":\"Unde ne găsești\",\"viewOnMap\":\"Vezi pe Google Maps\"},\"tenantPrivacy\":{\"title\":\"Politica de confidențialitate\",\"lastUpdated\":\"Ultima actualizare: {{date}}\",\"intro\":\"Această politică de confidențialitate explică modul în care {{name}} gestionează datele tale personale. Biblioteca funcționează pe platforma Community Shelf; administratorul bibliotecii gestionează contul tău și activitatea de împrumut.\",\"section1Title\":\"1. Operatorul de date\",\"section1p1\":\"{{name}} (administratorul bibliotecii) este operatorul de date pentru toate datele personale colectate prin această bibliotecă. Community Shelf furnizează platforma tehnică și acționează ca persoană împuternicită în numele bibliotecii.\",\"section2Title\":\"2. Datele pe care le colectăm\",\"dataList\":[\"Numele și adresa de email (la crearea contului)\",\"Istoricul împrumuturilor (articole solicitate, împrumutate și returnate)\",\"Mesajele trimise prin formularul de contact\"],\"section3Title\":\"3. Cum folosim datele tale\",\"purposeList\":[\"Gestionarea contului și a calității de membru\",\"Procesarea cererilor de împrumut și returnare\",\"Comunicarea cu tine despre împrumuturi sau întrebări\",\"Menținerea catalogului și a disponibilității articolelor\"],\"section4Title\":\"4. Cine poate vedea datele tale\",\"section4p1\":\"Numele, email-ul și istoricul împrumuturilor sunt vizibile administratorului (administratorilor) bibliotecii. Aceste informații sunt folosite exclusiv pentru gestionarea împrumuturilor și nu vor fi partajate cu terți din afara bibliotecii.\",\"section5Title\":\"5. Cookie-uri\",\"section5p1\":\"Acest site folosește cookie-uri doar pentru autentificare (menținerea sesiunii) și stocarea preferințelor de temă și limbă. Nu se folosesc cookie-uri de urmărire sau publicitate.\",\"section6Title\":\"6. Drepturile tale\",\"rightsList\":[\"Accesarea datelor personale pe care le deținem\",\"Corectarea informațiilor incorecte\",\"Solicitarea ștergerii contului și a datelor\",\"Limitarea sau opoziția la prelucrare\",\"Solicitarea portabilității datelor\"],\"platformNote\":\"Pentru detalii despre cum platforma Community Shelf gestionează datele la nivel tehnic, consultă\",\"platformLink\":\"Politica de confidențialitate a platformei\",\"contactNote\":\"Pentru exercitarea oricăruia dintre aceste drepturi sau dacă ai întrebări, contactează-ne prin\",\"contactLink\":\"pagina de contact\",\"backToBrowsing\":\"Înapoi la colecție\"},\"tenantCopyright\":{\"title\":\"Politica privind drepturile de autor\",\"lastUpdated\":\"Ultima actualizare: {{date}}\",\"intro\":\"Această pagină prezintă responsabilitățile legate de drepturile de autor pentru materialele listate pe {{name}}.\",\"section1Title\":\"1. Conținutul catalogului\",\"section1p1\":\"Administratorul bibliotecii este responsabil pentru conformitatea tuturor articolelor din catalog — inclusiv titluri, descrieri și imagini — cu legislația privind drepturile de autor. Articolele listate sunt destinate împrumutului comunitar, nu distribuției comerciale.\",\"section2Title\":\"2. Conținut generat de utilizatori\",\"section2p1\":\"Dacă contribui cu conținut precum recenzii sau liste de lectură, rămâi proprietarul lucrării tale, dar acorzi {{name}} o licență neexclusivă de a-l afișa în cadrul bibliotecii. Ești responsabil(ă) să te asiguri că contribuțiile tale nu încalcă drepturile terților.\",\"section3Title\":\"3. Raportarea problemelor de copyright\",\"section3p1\":\"Dacă consideri că un conținut de pe această bibliotecă îți încalcă drepturile de autor, contactează administratorul bibliotecii cu următoarele detalii:\",\"reportSteps\":[\"O descriere a operei protejate\",\"Locația conținutului pe acest site\",\"Datele tale de contact\",\"O declarație de bună credință privind utilizarea neautorizată\"],\"platformNote\":\"Poți raporta problemele și direct platformei Community Shelf. Consultă\",\"platformLink\":\"Politica platformei privind drepturile de autor\",\"backToBrowsing\":\"Înapoi la colecție\"},\"privacy\":{\"title\":\"Politica de confidențialitate\",\"lastUpdated\":\"Ultima actualizare: {{date}}\",\"intro\":\"Community Shelf respectă confidențialitatea utilizatorilor și prelucrează datele personale conform GDPR.\",\"section1Title\":\"1. Introducere\",\"section1p1\":\"Această politică explică modul în care Community Shelf colectează, utilizează și protejează datele tale personale.\",\"section2Title\":\"2. Date colectate\",\"dataList\":[\"Nume\",\"Adresă de email\",\"Informații despre cont\",\"Activitate în bibliotecă (articole împrumutate, rezervări)\"],\"section3Title\":\"3. Scopul prelucrării\",\"purposeList\":[\"Furnizarea accesului la platformă\",\"Gestionarea membrilor bibliotecilor\",\"Urmărirea împrumuturilor\",\"Comunicarea cu utilizatorii\"],\"section4Title\":\"4. Rolul organizațiilor\",\"section4p1\":\"Organizațiile care folosesc platforma acționează ca operatori de date pentru membrii lor.\",\"section4p2\":\"Community Shelf acționează ca persoană împuternicită, oferind infrastructura tehnică.\",\"section5Title\":\"5. Stocarea și securitatea datelor\",\"section5p1\":\"Datele sunt păstrate doar atât timp cât este necesar. Implementăm măsuri tehnice și organizatorice pentru protejarea datelor personale.\",\"section6Title\":\"6. Cookie-uri\",\"section6p1\":\"Folosim cookie-uri doar pentru autentificare și preferințe de temă — fără cookie-uri de urmărire sau publicitate.\",\"section7Title\":\"7. Drepturile tale\",\"rightsList\":[\"Accesarea datelor\",\"Corectarea datelor incorecte\",\"Solicitarea ștergerii\",\"Limitarea prelucrării\",\"Portabilitatea datelor\"],\"contactNote\":\"Pentru exercitarea acestor drepturi sau întrebări, contactează-ne la\",\"backHome\":\"Înapoi la pagina principală\"},\"copyright\":{\"title\":\"Politica privind drepturile de autor\",\"lastUpdated\":\"Ultima actualizare: {{date}}\",\"intro\":\"Community Shelf respectă drepturile de proprietate intelectuală și așteaptă același lucru de la toți utilizatorii și organizațiile.\",\"section1Title\":\"1. Responsabilitatea conținutului\",\"section1p1\":\"Organizațiile sunt responsabile pentru legalitatea materialelor încărcate sau listate. Community Shelf nu verifică statutul juridic al materialelor.\",\"section2Title\":\"2. Raportarea încălcărilor\",\"section2p1\":\"Dacă considerați că un material protejat este distribuit fără permisiune, trimiteți:\",\"reportList\":[\"Identificarea operei protejate\",\"Locația materialului pe platformă\",\"Datele dumneavoastră de contact\",\"O declarație de bună credință\"],\"sendTo\":\"Notificările pot fi trimise la\",\"section3Title\":\"3. Acțiuni\",\"section3p1\":\"După primirea unei notificări valide, platforma poate:\",\"responseList\":[\"Elimina conținutul care încalcă drepturile\",\"Suspenda contul responsabil\"],\"backHome\":\"Înapoi la pagina principală\"}}"));}),
"[project]/i18n/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"nav\":{\"brand\":\"Community Shelf\",\"dashboard\":\"Dashboard\",\"login\":\"Log in\",\"createLibrary\":\"Create Library\",\"signOut\":\"Sign out\",\"lightMode\":\"Switch to light mode\",\"darkMode\":\"Switch to dark mode\",\"pageTitle\":\"Community Shelf — Your Neighborhood Library, Online\",\"contact\":\"Contact\"},\"footer\":{\"brand\":\"Community Shelf\",\"terms\":\"Terms & Conditions\",\"contact\":\"Contact\",\"privacy\":\"Privacy Policy\",\"copyright\":\"Copyright\",\"madeWith\":\"Made with ♥ by\"},\"landing\":{\"badge\":\"Free for every community\",\"heroTitle1\":\"Your Neighborhood\",\"heroTitle2\":\"Online\",\"heroTitleHighlight\":\"Library\",\"subtitle\":\"Share books, games, music, and more with your neighbors. Everything you need to run a beautiful lending library — no tech skills required.\",\"ctaDashboard\":\"Go to Dashboard\",\"ctaCreate\":\"Create Your Library\",\"ctaExplore\":\"See It in Action\",\"featuresTitle\":\"Built for Community Librarians\",\"featuresSubtitle\":\"Catalog your collection, manage lending, and make your library feel like home.\",\"featureCatalogTitle\":\"Catalog Management\",\"featureCatalogDesc\":\"Add books, games, music, and more — complete with cover art and details, auto-filled for you.\",\"featureIsbnTitle\":\"ISBN Scanner\",\"featureIsbnDesc\":\"Point your phone at a barcode to add a book in seconds. Got a big collection? Bulk-import it.\",\"featureTrackingTitle\":\"Availability Tracking\",\"featureTrackingDesc\":\"See which items are available, who has what, and where each copy lives — all in real time.\",\"featureLendingTitle\":\"Lending & Returns\",\"featureLendingDesc\":\"Members request a borrow, you approve it, they return it. Due date reminders happen automatically.\",\"featureListsTitle\":\"Curated Lists\",\"featureListsDesc\":\"Build reading lists, seasonal picks, or \\\"staff favorites\\\" to help members find their next read.\",\"featureBrandingTitle\":\"Custom Branding\",\"featureBrandingDesc\":\"Add your logo, pick your colors, and make the library feel like it belongs to your community.\",\"featureSpaceTitle\":\"Your Own Space\",\"featureSpaceDesc\":\"Your library is completely yours — your own catalog, members, and settings, separate from everyone else.\",\"directoryTitle\":\"Libraries Already Using Community Shelf\",\"directorySubtitle\":\"See what other communities have built.\",\"directoryEmpty\":\"No public libraries yet. Be the first to\",\"directoryEmptyLink\":\"create one\",\"mapTitle\":\"Find a Library Near You\",\"mapSubtitle\":\"Explore community libraries on the map.\",\"mapVisit\":\"Visit library\",\"locateMe\":\"Find me\",\"you\":\"You\",\"ctaBottomTitle\":\"Ready to Share?\",\"ctaBottomSubtitle\":\"Create a free account and we'll have your library up and running soon.\",\"ctaBottomButton\":\"Create Your Free Library\"},\"dashboard\":{\"title\":\"Dashboard\",\"welcome\":\"Welcome back, {{name}}.\",\"subtitle\":\"Manage your library requests below.\",\"yourLibraries\":\"Your Libraries\",\"pendingRequests\":\"Pending Requests\",\"underReview\":\"Under Review\",\"declined\":\"Declined\",\"requestNew\":\"Request a New Library\",\"orgName\":\"Organization Name\",\"country\":\"Country\",\"city\":\"City\",\"description\":\"Description\",\"optional\":\"optional\",\"orgPlaceholder\":\"e.g. Greenwood Neighborhood Library\",\"countryPlaceholder\":\"e.g. Romania\",\"cityPlaceholder\":\"e.g. Timișoara\",\"descPlaceholder\":\"Tell us about your community and what you'd like to share...\",\"slug\":\"Subdomain\",\"slugPlaceholder\":\"my-library\",\"slugHint\":\"This will be your library's web address\",\"submit\":\"Submit Request\",\"cancel\":\"Cancel\",\"open\":\"Open\",\"address\":\"Address\",\"addressPlaceholder\":\"123 Main Street, Building A\",\"googleMapsUrl\":\"Google Maps Link\",\"googleMapsPlaceholder\":\"https://maps.google.com/...\"},\"contact\":{\"title\":\"Get in Touch\",\"subtitle\":\"Have a question, suggestion, or found a bug? We'd love to hear from you.\",\"name\":\"Your Name\",\"namePlaceholder\":\"John Doe\",\"email\":\"Email Address\",\"emailPlaceholder\":\"john@example.com\",\"category\":\"Category\",\"categoryGeneral\":\"General Inquiry\",\"categoryFeature\":\"Feature Suggestion\",\"categoryBug\":\"Bug Report\",\"subject\":\"Subject\",\"subjectPlaceholder\":\"How can we help?\",\"message\":\"Message\",\"messagePlaceholder\":\"Tell us more...\",\"submit\":\"Send Message\",\"submitting\":\"Sending...\",\"successTitle\":\"Message Sent!\",\"successMessage\":\"Thank you for reaching out. We'll get back to you as soon as possible.\",\"sendAnother\":\"Send Another Message\",\"turnstileError\":\"Please complete the verification\"},\"terms\":{\"title\":\"Terms & Conditions\",\"lastUpdated\":\"Last updated: {{date}}\",\"intro\":\"Welcome to Community Shelf. By creating an account or using the platform you agree to the following terms. They are written in plain language — no legalese traps.\",\"section1Title\":\"1. What Community Shelf Is\",\"section1p1\":\"Community Shelf is a free, hosted platform that lets anyone create and run a community lending library online. Each library gets its own subdomain, catalog, and member base. Community Shelf provides the software; library administrators provide the content and manage their own communities.\",\"section2Title\":\"2. Accounts & Eligibility\",\"section2p1\":\"You must be at least 16 years old to create an account. You are responsible for keeping your login credentials secure. One person may operate multiple libraries, but each account must represent a real individual — automated or bot-created accounts are not permitted.\",\"section3Title\":\"3. Creating & Running a Library\",\"section3p1\":\"When you create a library you become its administrator. As an administrator you are responsible for the content you list, the members you accept, and the lending policies you set. Community Shelf does not verify, endorse, or guarantee the accuracy of any catalog entry, availability status, or item condition.\",\"section3p2\":\"You may customize your library's name, branding, and public description. You may not use these features to impersonate another organization, spread misleading information, or promote illegal activity.\",\"section4Title\":\"4. Acceptable Use\",\"section4p1\":\"You agree not to: upload content that infringes on intellectual property rights; use the platform to harass, threaten, or discriminate against others; attempt to gain unauthorized access to other accounts or libraries; use automated tools to scrape data or overload the service; or list items that are illegal to lend in your jurisdiction.\",\"section4p2\":\"We reserve the right to suspend or remove any library or account that violates these terms, with or without prior notice.\",\"section5Title\":\"5. Content & Intellectual Property\",\"section5p1\":\"You retain ownership of any content you upload (cover images, descriptions, logos). By uploading content you grant Community Shelf a non-exclusive license to display it within the platform. We will never sell your content or use it outside the service.\",\"section5p2\":\"Community Shelf's software, design, and branding are owned by Community Shelf. You may not copy, modify, or redistribute them without permission.\",\"section6Title\":\"6. Privacy & Data\",\"section6p1\":\"We collect only the information needed to run the service: your email address, display name, and lending activity. Library administrators can see the names and email addresses of their members, plus lending history within their library.\",\"section6p2\":\"We do not sell personal data to third parties. We use cookies only for authentication and theme preferences — no tracking or advertising cookies. You may request deletion of your account and associated data at any time by contacting us.\",\"section7Title\":\"7. Liability & Disclaimers\",\"section7p1\":\"Community Shelf is provided \\\"as is\\\" without warranties of any kind. We are not responsible for items that are lost, damaged, or not returned during lending. Disputes between library members and administrators should be resolved between those parties directly.\",\"section7p2\":\"Our total liability to you for any claim arising from your use of the service is limited to the amount you have paid us — which, for the free tier, is zero.\",\"section8Title\":\"8. Service Availability\",\"section8p1\":\"We aim to keep the platform available around the clock but do not guarantee uninterrupted service. We may perform maintenance, update features, or — in rare cases — discontinue the service. If we plan to shut down, we will give at least 30 days' notice and provide an option to export your data.\",\"section9Title\":\"9. Changes to These Terms\",\"section9p1\":\"We may update these terms from time to time. When we do, we will revise the \\\"Last updated\\\" date at the top. Continued use of the platform after a change constitutes acceptance. For material changes we will make reasonable efforts to notify you via email or an in-app banner.\",\"section10Title\":\"10. Contact\",\"section10p1\":\"If you have questions about these terms or need to report a violation, reach out at hello@communityshelf.org.\",\"backHome\":\"Back to home\"},\"auth\":{\"welcomeBack\":\"Welcome back\",\"signInSubtitle\":\"Sign in to your account\",\"email\":\"Email\",\"password\":\"Password\",\"signingIn\":\"Signing in...\",\"signIn\":\"Sign in\",\"noAccount\":\"Don't have an account?\",\"createOne\":\"Create one\",\"createAccount\":\"Create an account\",\"joinSubtitle\":\"Join the community library\",\"confirmPassword\":\"Confirm Password\",\"creatingAccount\":\"Creating account...\",\"createAccountBtn\":\"Create account\",\"agreeTerms\":\"By creating an account you agree to our\",\"termsLink\":\"Terms & Conditions\",\"hasAccount\":\"Already have an account?\",\"signInLink\":\"Sign in\"},\"tenantNav\":{\"browse\":\"Browse\",\"lists\":\"Lists\",\"about\":\"About\",\"contact\":\"Contact\",\"myAccount\":\"My Account\",\"admin\":\"Admin\",\"adminPanel\":\"Admin Panel\",\"signOut\":\"Sign out\",\"login\":\"Log in\",\"lightMode\":\"Switch to light mode\",\"darkMode\":\"Switch to dark mode\"},\"browse\":{\"title\":\"Browse the Collection\",\"searchPlaceholder\":\"What are you looking for?\",\"all\":\"All\",\"newest\":\"Newest\",\"titleAsc\":\"A–Z\",\"available\":\"Available\",\"titleCount_one\":\"{{count}} title\",\"titleCount_other\":\"{{count}} titles\",\"gridView\":\"Grid view\",\"tableView\":\"Table view\",\"shelfView\":\"Shelf view\",\"nothingFound\":\"Nothing found\",\"nothingFoundHint\":\"Try a different search term or filter.\",\"thTitle\":\"Title\",\"thAuthor\":\"Author\",\"thType\":\"Type\",\"thYear\":\"Year\",\"thCopies\":\"Copies\",\"noCopies\":\"No copies\",\"unavailable\":\"Unavailable\",\"of\":\"of\",\"curatedLists\":\"Curated Lists\",\"handPicked\":\"Hand-picked Collections\",\"curatedDesc\":\"Explore themed reading guides curated by our community.\",\"viewAllLists\":\"View all lists\"},\"titleDetail\":{\"notFound\":\"Title not found\",\"backToCatalog\":\"Back to catalog\",\"availableCopies\":\"Available Copies\",\"availableOf\":\"{{available}} of {{total}} available\",\"condition\":\"Condition: {{condition}}\",\"available\":\"Available\",\"reserved\":\"Reserved\",\"request\":\"Request\",\"year\":\"Year\",\"language\":\"Language\",\"isbn\":\"ISBN / ID\",\"publisher\":\"Publisher\"},\"aboutPage\":{\"aboutTitle\":\"About {{name}}\",\"mission\":\"Our Mission\",\"missionText\":\"{{name}} connects people with the things their community has to share. Instead of buying new, borrow from your neighbors. Instead of collecting dust, let your books find new readers. We believe that sharing builds stronger communities — and saves a few trees along the way.\",\"howItWorks\":\"How it works\",\"step1Title\":\"Browse the collection\",\"step1Text\":\"Explore what your community has to share — books, films, music, games, and more.\",\"step2Title\":\"Request an item\",\"step2Text\":\"Found something you like? Submit a request and we'll hold it for you.\",\"step3Title\":\"Pick up & enjoy\",\"step3Text\":\"Collect your item, enjoy it at your own pace, and return it when you're done.\",\"readyToExplore\":\"Ready to explore?\",\"browseOffer\":\"Browse what your community has to offer.\",\"browseCollection\":\"Browse the Collection\",\"visitUs\":\"Visit Us\",\"viewOnMap\":\"View on Google Maps\"},\"listsPage\":{\"title\":\"Curated Lists\",\"subtitle\":\"Hand-picked collections and reading guides from our community.\",\"noLists\":\"No lists yet\",\"noListsHint\":\"Check back soon for curated collections.\"},\"listDetail\":{\"notFound\":\"List not found\",\"backToLists\":\"Back to Lists\"},\"account\":{\"myAccount\":\"My Account\",\"myRentals\":\"My Rentals\",\"myDetails\":\"My Details\"},\"rentals\":{\"title\":\"My Rentals\",\"subtitle\":\"Track your active loans and request history.\",\"activeLoans\":\"Active Loans\",\"pendingRequests\":\"Pending Requests\",\"overdueItems\":\"Overdue Items\",\"loanHistory\":\"Loan History\",\"due\":\"Due: {{date}}\",\"cancel\":\"Cancel\",\"noInquiries\":\"No inquiries yet. Start browsing to request items!\"},\"details\":{\"title\":\"My Details\",\"subtitle\":\"Update your personal information.\",\"personalInfo\":\"Personal Information\",\"firstName\":\"First Name\",\"lastName\":\"Last Name\",\"email\":\"Email\",\"phone\":\"Phone\",\"address\":\"Address\",\"emailHint\":\"Email cannot be changed.\",\"saveChanges\":\"Save Changes\",\"saved\":\"Saved!\"},\"modal\":{\"loginRequired\":\"Login Required\",\"loginMessage\":\"Please log in to request items.\",\"close\":\"Close\",\"logIn\":\"Log In\",\"requestSubmitted\":\"Request Submitted!\",\"requestSubmittedMsg\":\"Your request for <1>{{title}}</1> has been submitted. You'll be notified when it's approved.\",\"requestItem\":\"Request Item\",\"notesLabel\":\"Notes (Optional)\",\"notesPlaceholder\":\"Any special requests or notes...\",\"cancel\":\"Cancel\",\"confirmRequest\":\"Confirm Request\"},\"status\":{\"Pending\":\"Pending\",\"Approved\":\"Approved\",\"Active\":\"Active\",\"Returned\":\"Returned\",\"Overdue\":\"Overdue\"},\"titleCard\":{\"available\":\"{{count}} available\",\"unavailable\":\"Unavailable\"},\"listCard\":{\"title_one\":\"{{count}} title\",\"title_other\":\"{{count}} titles\",\"section_one\":\"{{count}} section\",\"section_other\":\"{{count}} sections\"},\"scanner\":{\"title\":\"Scan ISBN Barcode\",\"close\":\"Close\",\"instruction\":\"Point your camera at the barcode on the back of a book.\",\"cameraDenied\":\"Camera access denied. Please allow camera access and try again.\",\"cameraError\":\"Could not start camera. Make sure your device has a camera.\",\"lookingUp\":\"Looking up book info…\",\"cancel\":\"Cancel\"},\"authorSelect\":{\"placeholder\":\"Filter by author…\",\"search\":\"Search authors…\",\"noResults\":\"No authors found\"},\"confirm\":{\"cancel\":\"Cancel\",\"delete\":\"Delete\"},\"adminNav\":{\"admin\":\"Admin\",\"overview\":\"Overview\",\"types\":\"Types\",\"titles\":\"Titles\",\"curatedLists\":\"Curated Lists\",\"inquiries\":\"Inquiries\",\"siteConfig\":\"Site Config\",\"descriptionPage\":\"About Page\"},\"adminDashboard\":{\"title\":\"Overview\",\"subtitle\":\"Manage your community library.\",\"contentTypes\":\"Content Types\",\"titles\":\"Titles\",\"totalCopies\":\"Total Copies\",\"curatedLists\":\"Curated Lists\",\"pendingInquiries\":\"Pending Inquiries\",\"siteConfig\":\"Site Config\"},\"manageTitles\":{\"title\":\"Titles\",\"subtitle\":\"{{count}} titles in the collection.\",\"addTitle\":\"Add Title\",\"searchPlaceholder\":\"Search titles...\",\"noTitles\":\"No titles found.\",\"deleteTitle\":\"Delete Title\",\"deleteConfirm\":\"Delete \\\"{{title}}\\\" and all its copies? This cannot be undone.\",\"noCopies\":\"No copies\"},\"manageLists\":{\"title\":\"Curated Lists\",\"subtitle\":\"{{count}} lists published.\",\"newList\":\"New List\",\"noLists\":\"No curated lists yet.\",\"deleteList\":\"Delete List\",\"deleteConfirm\":\"Delete \\\"{{title}}\\\"? This cannot be undone.\",\"sections_one\":\"{{count}} section\",\"sections_other\":\"{{count}} sections\",\"titles_one\":\"{{count}} title\",\"titles_other\":\"{{count}} titles\"},\"manageInquiries\":{\"title\":\"Inquiries\",\"subtitle\":\"Manage loan requests, active rentals, and returns.\",\"pending\":\"Pending\",\"active\":\"Active\",\"history\":\"History\",\"periodDays\":\"Period (days)\",\"accept\":\"Accept\",\"noPending\":\"No pending requests.\",\"returned\":\"Returned\",\"extend\":\"Extend\",\"due\":\"Due: {{date}}\",\"days\":\"{{count}}d\",\"noActive\":\"No active rentals.\",\"requested\":\"Requested: {{date}}\",\"returnedDate\":\"Returned: {{date}}\",\"noHistory\":\"No returned items yet.\",\"markReturned\":\"Mark as Returned\",\"markReturnedConfirm\":\"Mark \\\"{{title}}\\\" as returned? This will record today's date as the return date.\"},\"manageTypes\":{\"title\":\"Content Types\",\"subtitle\":\"Define the content types available in your library.\",\"addType\":\"Add Type\",\"namePlaceholder\":\"Type name (EN)\",\"nameRoPlaceholder\":\"Type name (RO)\",\"titleCount_one\":\"{{count}} title\",\"titleCount_other\":\"{{count}} titles\",\"deleteTitle\":\"Delete Type\",\"deleteHasTitles\":\"\\\"{{name}}\\\" has {{count}} titles assigned. Delete this type anyway?\",\"deleteConfirm\":\"Delete \\\"{{name}}\\\"? This cannot be undone.\"},\"siteConfig\":{\"title\":\"Site Config\",\"subtitle\":\"Customize your community library's identity and theme.\",\"logo\":\"Logo\",\"uploadImage\":\"Upload Image\",\"remove\":\"Remove\",\"logoHint\":\"Upload a square image (PNG, SVG, or JPG). Leave empty for the default library icon.\",\"siteTitle\":\"Site Title\",\"siteTitleRo\":\"Site Title (RO)\",\"siteDescription\":\"Site Description\",\"siteDescriptionRo\":\"Site Description (RO)\",\"roPlaceholder\":\"Romanian translation…\",\"descPlaceholder\":\"Describe your community library...\",\"themeColors\":\"Theme Colors\",\"reset\":\"Reset\",\"quickPresets\":\"Quick Start Presets\",\"presetTeal\":\"Classic Teal\",\"presetTealDesc\":\"The original warm teal palette with amber accents\",\"presetIndigo\":\"Scholarly Indigo\",\"presetIndigoDesc\":\"Rich navy-indigo inspired by leather-bound books\",\"presetSage\":\"Forest Sage\",\"presetSageDesc\":\"Muted forest green evoking nature and growth\",\"presetBurgundy\":\"Burgundy Wine\",\"presetBurgundyDesc\":\"Warm burgundy with earthy gold accents\",\"presetTerracotta\":\"Warm Terracotta\",\"presetTerracottaDesc\":\"Earthy terracotta rooted in warmth and heritage\",\"primary\":\"Primary\",\"backgrounds\":\"Backgrounds\",\"accent\":\"Accent\",\"primaryDark\":\"Primary Dark\",\"primaryDarker\":\"Primary Darker\",\"primaryDarkest\":\"Primary Darkest\",\"background\":\"Background\",\"surface\":\"Surface\",\"saveConfig\":\"Save Config\",\"saved\":\"Saved!\",\"preview\":\"Preview\",\"location\":\"Location\",\"address\":\"Address\",\"addressPlaceholder\":\"123 Main Street\",\"googleMapsUrl\":\"Google Maps Link\",\"googleMapsPlaceholder\":\"https://maps.google.com/...\",\"city\":\"City\",\"country\":\"Country\",\"viewOnMap\":\"View on Map\"},\"titleForm\":{\"backToTitles\":\"Back to Titles\",\"editTitle\":\"Edit Title\",\"addTitle\":\"Add Title\",\"isbnLookup\":\"ISBN Lookup\",\"isbnPlaceholder\":\"Enter ISBN or scan barcode...\",\"lookup\":\"Lookup\",\"scan\":\"Scan\",\"bookInfoLoaded\":\"Book info loaded\",\"isbnDuplicate\":\"This ISBN already exists: {{title}}\",\"openAddCopy\":\"Open & Add Copy\",\"title\":\"Title\",\"author\":\"Author\",\"type\":\"Type\",\"year\":\"Year\",\"language\":\"Language\",\"publisher\":\"Publisher\",\"pages\":\"Pages\",\"description\":\"Description\",\"cover\":\"Cover\",\"fallbackColor\":\"Fallback color\",\"noImage\":\"No image\",\"removeImage\":\"Remove image\",\"firstCopy\":\"First Copy\",\"location\":\"Location\",\"locationPlaceholder\":\"e.g. Shelf A3, Room 2\",\"condition\":\"Condition\",\"excellent\":\"Excellent\",\"good\":\"Good\",\"fair\":\"Fair\",\"cancel\":\"Cancel\",\"saving\":\"Saving...\",\"saveChanges\":\"Save Changes\",\"createTitle\":\"Create Title\",\"copies\":\"Copies\",\"add\":\"Add\",\"locationPlaceholderShort\":\"e.g. Main Shelf\",\"status\":\"Status\",\"statusAvailable\":\"Available\",\"statusReserved\":\"Reserved\",\"noCopiesYet\":\"No copies yet. Add one above.\",\"deleteCopy\":\"Delete Copy\",\"deleteCopyConfirm\":\"Delete this copy? This cannot be undone.\"},\"listForm\":{\"backToLists\":\"Back to Lists\",\"editList\":\"Edit List\",\"newList\":\"New Curated List\",\"title\":\"Title\",\"titlePlaceholder\":\"e.g. Summer Reading Picks\",\"description\":\"Description\",\"coverColor\":\"Cover Color\",\"sections\":\"Sections\",\"addSection\":\"Add Section\",\"sectionN\":\"Section {{n}}\",\"sectionHeading\":\"Section heading\",\"sectionText\":\"Section text...\",\"linkedTitles\":\"Linked Titles ({{count}})\",\"pickTitles\":\"+ Pick titles\",\"noTitlesLinked\":\"No titles linked yet.\",\"noSections\":\"No sections yet. Click \\\"Add Section\\\" to get started.\",\"titleRo\":\"Title (RO)\",\"descriptionRo\":\"Description (RO)\",\"sectionHeadingRo\":\"Section heading (RO)\",\"sectionTextRo\":\"Section text (RO)…\",\"roPlaceholder\":\"Romanian translation…\",\"cancel\":\"Cancel\",\"saveChanges\":\"Save Changes\",\"createList\":\"Create List\"},\"titlePicker\":{\"selectTitles\":\"Select Titles\",\"searchPlaceholder\":\"Search titles...\",\"selected\":\"{{count}} selected\",\"cancel\":\"Cancel\",\"done\":\"Done\"},\"tenantTerms\":{\"title\":\"Terms & Conditions\",\"lastUpdated\":\"Last updated: {{date}}\",\"intro\":\"These terms apply to your use of\",\"introSuffix\":\"They work alongside the\",\"platformTerms\":\"Community Shelf Platform Terms\",\"introEnd\":\"which govern the overall service.\",\"section1Title\":\"1. About This Library\",\"section1p1\":\"{{name}} is a community lending library powered by Community Shelf. The library is independently managed by its administrator(s). Community Shelf provides the hosting and software; the administrator manages the catalog, members, and lending policies.\",\"section2Title\":\"2. Membership\",\"section2p1\":\"By creating an account on {{name}} you agree to these terms and to the platform-wide Community Shelf Terms & Conditions. Your account is universal — the same login works across all Community Shelf libraries.\",\"section3Title\":\"3. Borrowing & Returns\",\"section3p1\":\"When you request an item, the library administrator decides whether to approve or decline the request. Approved loans have a due date; please return items on time so others can enjoy them. Repeated failure to return items may result in suspension of your borrowing privileges.\",\"section3p2\":\"You are responsible for items in your possession. If an item is lost or damaged, you should contact the library administrator directly to arrange a resolution.\",\"section4Title\":\"4. Your Responsibilities\",\"section4p1\":\"Treat the library and its community with respect. Do not submit fraudulent borrow requests, misrepresent item conditions, or use the platform to harass other members. The administrator reserves the right to remove members who violate these expectations.\",\"section5Title\":\"5. Privacy\",\"section5p1\":\"Your name, email address, and borrowing history within this library are visible to the library administrator. This information is used solely to manage lending and will not be shared with third parties. For details on how the platform handles your data, see the Community Shelf Privacy section in the platform terms.\",\"section6Title\":\"6. Limitation of Liability\",\"section6p1\":\"{{name}} and its administrator provide this service voluntarily and in good faith. Neither the library administrator nor Community Shelf is liable for any loss, damage, or dispute arising from the lending of items. All items are lent as-is, without warranty.\",\"section7Title\":\"7. Changes\",\"section7p1\":\"The library administrator or Community Shelf may update these terms at any time. Continued use after a change constitutes acceptance.\",\"backToBrowsing\":\"Back to browsing\"},\"descriptionPage\":{\"title\":\"About Page\",\"subtitle\":\"Edit your library's about page content.\",\"pageTitle\":\"Page Title\",\"pageTitleRo\":\"Page Title (RO)\",\"body\":\"Body\",\"bodyRo\":\"Body (RO)\",\"missionTitle\":\"Mission Title\",\"missionTitleRo\":\"Mission Title (RO)\",\"missionText\":\"Mission Text\",\"missionTextRo\":\"Mission Text (RO)\",\"roPlaceholder\":\"Romanian translation…\",\"save\":\"Save\",\"saved\":\"Saved!\"},\"tenantContact\":{\"title\":\"Contact Us\",\"subtitle\":\"Have a question or feedback? We'd love to hear from you.\",\"name\":\"Your Name\",\"namePlaceholder\":\"John Doe\",\"email\":\"Email Address\",\"emailPlaceholder\":\"john@example.com\",\"subject\":\"Subject\",\"subjectPlaceholder\":\"How can we help?\",\"message\":\"Message\",\"messagePlaceholder\":\"Tell us more...\",\"submit\":\"Send Message\",\"submitting\":\"Sending...\",\"successTitle\":\"Message Sent!\",\"successMessage\":\"Thank you for reaching out. We'll get back to you soon.\",\"sendAnother\":\"Send Another Message\",\"findUs\":\"Find Us\",\"viewOnMap\":\"View on Google Maps\"},\"tenantPrivacy\":{\"title\":\"Privacy Policy\",\"lastUpdated\":\"Last updated: {{date}}\",\"intro\":\"This privacy policy explains how {{name}} handles your personal data. This library runs on the Community Shelf platform; the library administrator manages your account and lending activity.\",\"section1Title\":\"1. Data Controller\",\"section1p1\":\"{{name}} (the library administrator) is the data controller for all personal data collected through this library. Community Shelf provides the technical platform and acts as a data processor on the library's behalf.\",\"section2Title\":\"2. Data We Collect\",\"dataList\":[\"Name and email address (when you create an account)\",\"Borrowing history (items requested, borrowed, and returned)\",\"Messages sent through the contact form\"],\"section3Title\":\"3. How We Use Your Data\",\"purposeList\":[\"Managing your library account and membership\",\"Processing borrow and return requests\",\"Communicating with you about your loans or inquiries\",\"Maintaining the library catalog and availability\"],\"section4Title\":\"4. Who Can See Your Data\",\"section4p1\":\"Your name, email, and borrowing history are visible to the library administrator(s). This information is used solely to manage lending and will not be shared with third parties outside the library.\",\"section5Title\":\"5. Cookies\",\"section5p1\":\"This site uses cookies only for authentication (keeping you logged in) and storing your theme and language preferences. No tracking or advertising cookies are used.\",\"section6Title\":\"6. Your Rights\",\"rightsList\":[\"Access the personal data we hold about you\",\"Correct any inaccurate information\",\"Request deletion of your account and data\",\"Restrict or object to processing\",\"Request data portability\"],\"platformNote\":\"For details on how the Community Shelf platform itself handles data at a technical level, see the\",\"platformLink\":\"Platform Privacy Policy\",\"contactNote\":\"To exercise any of these rights or if you have questions, reach out through our\",\"contactLink\":\"contact page\",\"backToBrowsing\":\"Back to browsing\"},\"tenantCopyright\":{\"title\":\"Copyright Policy\",\"lastUpdated\":\"Last updated: {{date}}\",\"intro\":\"This page outlines the copyright responsibilities for materials listed on {{name}}.\",\"section1Title\":\"1. Catalog Content\",\"section1p1\":\"The library administrator is responsible for ensuring that all items listed in the catalog — including titles, descriptions, and cover images — comply with applicable copyright law. Items listed are intended for community lending, not commercial distribution.\",\"section2Title\":\"2. User Content\",\"section2p1\":\"If you contribute content such as reviews or reading lists, you retain ownership of your work but grant {{name}} a non-exclusive license to display it within the library. You are responsible for ensuring your contributions do not infringe on third-party rights.\",\"section3Title\":\"3. Reporting Copyright Concerns\",\"section3p1\":\"If you believe any content on this library infringes your copyright, please contact the library administrator with the following details:\",\"reportSteps\":[\"A description of the copyrighted work\",\"The location of the content on this site\",\"Your contact information\",\"A statement of good faith belief that the use is unauthorized\"],\"platformNote\":\"You may also report concerns directly to the Community Shelf platform. See the\",\"platformLink\":\"Platform Copyright & Takedown Policy\",\"backToBrowsing\":\"Back to browsing\"},\"privacy\":{\"title\":\"Privacy Policy\",\"lastUpdated\":\"Last updated: {{date}}\",\"intro\":\"Community Shelf respects your privacy and processes personal data in accordance with the General Data Protection Regulation (GDPR).\",\"section1Title\":\"1. Introduction\",\"section1p1\":\"This policy explains how Community Shelf collects, uses, and protects your personal data when you use the platform.\",\"section2Title\":\"2. Data We Collect\",\"dataList\":[\"Name\",\"Email address\",\"Account information\",\"Library activity (borrowed items, reservations)\"],\"section3Title\":\"3. Purpose of Processing\",\"purposeList\":[\"Provide access to the platform\",\"Manage library memberships\",\"Track item borrowing\",\"Communicate with users\"],\"section4Title\":\"4. Role of Tenants\",\"section4p1\":\"Organizations using the platform act as data controllers for their members.\",\"section4p2\":\"Community Shelf acts as a data processor providing technical infrastructure.\",\"section5Title\":\"5. Data Retention & Security\",\"section5p1\":\"Personal data is stored only as long as necessary to provide the service. We implement reasonable technical and organizational measures to protect personal data.\",\"section6Title\":\"6. Cookies\",\"section6p1\":\"We use cookies only for authentication and theme preferences — no tracking or advertising cookies.\",\"section7Title\":\"7. Your Rights\",\"rightsList\":[\"Access your data\",\"Correct inaccurate data\",\"Request deletion\",\"Restrict processing\",\"Data portability\"],\"contactNote\":\"To exercise any of these rights or if you have questions about this policy, contact us at\",\"backHome\":\"Back to home\"},\"copyright\":{\"title\":\"Copyright & Takedown Policy\",\"lastUpdated\":\"Last updated: {{date}}\",\"intro\":\"Community Shelf respects intellectual property rights and expects all users and tenants to do the same.\",\"section1Title\":\"1. Content Responsibility\",\"section1p1\":\"Tenants are responsible for ensuring that materials they upload or list comply with applicable copyright law. Community Shelf does not verify copyright ownership of listed materials.\",\"section2Title\":\"2. Reporting Copyright Infringement\",\"section2p1\":\"If you believe your work has been uploaded without authorization, please provide:\",\"reportList\":[\"Identification of the copyrighted work\",\"Location of the material on the platform\",\"Your contact details\",\"A statement of good faith belief\"],\"sendTo\":\"Send notices to\",\"section3Title\":\"3. Response\",\"section3p1\":\"Upon receiving a valid complaint, the platform may:\",\"responseList\":[\"Remove the infringing content\",\"Suspend the responsible account\"],\"backHome\":\"Back to home\"}}"));}),
"[project]/context/I18nProvider.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "changeLanguage",
    ()=>changeLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next/dist/esm/i18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$I18nextProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/I18nextProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$ro$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/i18n/ro.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/i18n/en.json (json)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Initialize i18next (singleton — runs once)
if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isInitialized) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initReactI18next"]).init({
        resources: {
            ro: {
                translation: __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$ro$2e$json__$28$json$29$__["default"]
            },
            en: {
                translation: __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$en$2e$json__$28$json$29$__["default"]
            }
        },
        lng: "ro",
        fallbackLng: "ro",
        interpolation: {
            escapeValue: false
        }
    });
}
function I18nProvider(param) {
    let { initialLocale = "ro", children } = param;
    _s();
    // Sync i18next language with server-detected locale
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].language !== initialLocale) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].changeLanguage(initialLocale);
            }
        }
    }["I18nProvider.useEffect"], [
        initialLocale
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$I18nextProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I18nextProvider"], {
        i18n: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        children: children
    }, void 0, false, {
        fileName: "[project]/context/I18nProvider.jsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_s(I18nProvider, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = I18nProvider;
function changeLanguage(lng) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].changeLanguage(lng);
    document.cookie = "lang=".concat(lng, ";path=/;max-age=").concat(365 * 24 * 60 * 60, ";samesite=lax");
}
var _c;
__turbopack_context__.k.register(_c, "I18nProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "TENANT_SLUG",
    ()=>TENANT_SLUG,
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use client";
/**
 * Client-side API module.
 * For mutations and interactive data fetching from "use client" components.
 */ const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000") || "";
function resolveTenantSlug() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const host = window.location.hostname;
    const baseDomain = ("TURBOPACK compile-time value", "localhost");
    if ("TURBOPACK compile-time truthy", 1) {
        if (host === baseDomain) return null;
        if (host.endsWith("." + baseDomain)) {
            return host.replace("." + baseDomain, "");
        }
        return null;
    }
    //TURBOPACK unreachable
    ;
    // Dev fallback: subdomain.localhost
    const parts = undefined;
}
const TENANT_SLUG = resolveTenantSlug();
class ApiError extends Error {
    constructor(message, status, body){
        super(message);
        this.status = status;
        this.body = body;
    }
}
let isRefreshing = false;
async function tryRefresh() {
    if (isRefreshing) return false;
    isRefreshing = true;
    try {
        const res = await fetch("".concat(API_BASE, "/api/v1/auth/token/refresh/"), {
            method: "POST",
            credentials: "include",
            ...TENANT_SLUG && {
                headers: {
                    "X-Tenant": TENANT_SLUG
                }
            }
        });
        return res.ok;
    } catch (e) {
        return false;
    } finally{
        isRefreshing = false;
    }
}
async function apiRequest(path) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const url = "".concat(API_BASE, "/api/v1").concat(path);
    const headers = {
        ...TENANT_SLUG && {
            "X-Tenant": TENANT_SLUG
        },
        ...options.headers
    };
    // Don't set Content-Type for FormData (file uploads)
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }
    const config = {
        credentials: "include",
        ...options,
        headers
    };
    let response = await fetch(url, config);
    // If 401, try refreshing the token once
    if (response.status === 401 && !options._retried) {
        const refreshed = await tryRefresh();
        if (refreshed) {
            response = await fetch(url, {
                ...config,
                _retried: true
            });
        }
    }
    if (!response.ok) {
        var _body_non_field_errors;
        const body = await response.json().catch(()=>({}));
        const message = body.detail || ((_body_non_field_errors = body.non_field_errors) === null || _body_non_field_errors === void 0 ? void 0 : _body_non_field_errors[0]) || "Request failed";
        throw new ApiError(message, response.status, body);
    }
    if (response.status === 204) return null;
    return response.json();
}
const api = {
    get: (path)=>apiRequest(path),
    post: (path, data)=>apiRequest(path, {
            method: "POST",
            body: data !== undefined ? JSON.stringify(data) : undefined
        }),
    put: (path, data)=>apiRequest(path, {
            method: "PUT",
            body: JSON.stringify(data)
        }),
    patch: (path, data)=>apiRequest(path, {
            method: "PATCH",
            body: JSON.stringify(data)
        }),
    delete: (path)=>apiRequest(path, {
            method: "DELETE"
        }),
    upload: function(path, formData) {
        let method = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "POST";
        return apiRequest(path, {
            method,
            body: formData
        });
    }
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/endpoints.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminApi",
    ()=>adminApi,
    "authApi",
    ()=>authApi,
    "platformApi",
    ()=>platformApi,
    "publicApi",
    ()=>publicApi,
    "userApi",
    ()=>userApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.js [app-client] (ecmascript)");
"use client";
;
const publicApi = {
    getTitles: (params)=>{
        const qs = params ? "?" + new URLSearchParams(params) : "";
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/titles/".concat(qs));
    },
    getTitle: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/titles/".concat(id, "/")),
    getAuthors: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/titles/authors/"),
    getTypes: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/types/"),
    getOrganizations: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/organizations/"),
    getLists: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/lists/"),
    getList: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/lists/".concat(id, "/")),
    getSiteConfig: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/site-config/"),
    getDescriptionPage: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/description-page/"),
    submitTenantContact: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/contact/", data)
};
const authApi = {
    login: (email, password)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/auth/login/", {
            email,
            password
        }),
    register: (email, password1, password2)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/auth/registration/", {
            email,
            password1,
            password2
        }),
    logout: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/auth/logout/"),
    getUser: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/auth/user/"),
    updateUser: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/auth/user/", data)
};
const userApi = {
    getInquiries: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/my/inquiries/"),
    createInquiry: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/my/inquiries/", data),
    cancelInquiry: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete("/my/inquiries/".concat(id, "/")),
    getProfile: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/my/profile/")
};
const adminApi = {
    // Stats
    getStats: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/stats/"),
    // Types
    getTypes: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/types/"),
    createType: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/types/", data),
    updateType: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/types/".concat(id, "/"), data),
    deleteType: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete("/admin/types/".concat(id, "/")),
    // Titles
    getTitles: (params)=>{
        const qs = params ? "?" + new URLSearchParams(params) : "";
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/titles/".concat(qs));
    },
    getTitle: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/titles/".concat(id, "/")),
    createTitle: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/titles/", data),
    updateTitle: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/titles/".concat(id, "/"), data),
    deleteTitle: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete("/admin/titles/".concat(id, "/")),
    // Copies
    getCopies: (titleId)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/titles/".concat(titleId, "/copies/")),
    createCopy: (titleId, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/titles/".concat(titleId, "/copies/"), data),
    updateCopy: (titleId, copyId, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/titles/".concat(titleId, "/copies/").concat(copyId, "/"), data),
    deleteCopy: (titleId, copyId)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete("/admin/titles/".concat(titleId, "/copies/").concat(copyId, "/")),
    // Organizations
    getOrganizations: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/organizations/"),
    createOrganization: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/organizations/", data),
    updateOrganization: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/organizations/".concat(id, "/"), data),
    deleteOrganization: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete("/admin/organizations/".concat(id, "/")),
    // Curated Lists
    getLists: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/lists/"),
    getList: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/lists/".concat(id, "/")),
    createList: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/lists/", data),
    updateList: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/lists/".concat(id, "/"), data),
    deleteList: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete("/admin/lists/".concat(id, "/")),
    // Inquiries
    getInquiries: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/inquiries/"),
    updateInquiry: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/inquiries/".concat(id, "/"), data),
    acceptInquiry: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/inquiries/".concat(id, "/accept/"), data),
    returnInquiry: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/inquiries/".concat(id, "/return/")),
    extendInquiry: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/admin/inquiries/".concat(id, "/extend/"), data),
    // Site Config
    getSiteConfig: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/site-config/"),
    updateSiteConfig: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/site-config/", data),
    // Description Page
    getDescriptionPage: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/admin/description-page/"),
    updateDescriptionPage: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put("/admin/description-page/", data)
};
const platformApi = {
    getTenants: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/platform/tenants/"),
    getLibraryRequests: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/platform/library-requests/"),
    createLibraryRequest: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/platform/library-requests/", data),
    submitContact: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/platform/contact/", data)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/AuthContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$endpoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/endpoints.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            checkAuth().finally({
                "AuthProvider.useEffect": ()=>setLoading(false)
            }["AuthProvider.useEffect"]);
        }
    }["AuthProvider.useEffect"], []);
    async function checkAuth() {
        try {
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$endpoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].getUser();
            setUser(userData);
            try {
                const profile = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$endpoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userApi"].getProfile();
                setRole(profile.role);
            } catch (e) {
                setRole("member");
            }
        } catch (e) {
            setUser(null);
            setRole(null);
        }
    }
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email, password)=>{
            setError(null);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$endpoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].login(email, password);
                await checkAuth();
                return true;
            } catch (err) {
                setError(err.body || err.message || "Login failed");
                return false;
            }
        }
    }["AuthProvider.useCallback[login]"], []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[register]": async (email, password1, password2)=>{
            setError(null);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$endpoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].register(email, password1, password2);
                await checkAuth();
                return true;
            } catch (err) {
                setError(err.body || err.message || "Registration failed");
                return false;
            }
        }
    }["AuthProvider.useCallback[register]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": async ()=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$endpoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].logout();
            } catch (e) {
            // Clear state anyway
            }
            setUser(null);
            setRole(null);
        }
    }["AuthProvider.useCallback[logout]"], []);
    const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateProfile]": async (data)=>{
            const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$endpoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].updateUser(data);
            setUser(updated);
            return updated;
        }
    }["AuthProvider.useCallback[updateProfile]"], []);
    const isAuthenticated = !!user;
    const isAdmin = role === "admin";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            role,
            loading,
            error,
            isAuthenticated,
            isAdmin,
            login,
            register,
            logout,
            updateProfile,
            clearError: ()=>setError(null)
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AuthContext.jsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "ERT51Qt+uo/SnyBaa/HecuNAwYo=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_d1201832._.js.map