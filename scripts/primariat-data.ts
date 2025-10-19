/**
 * Flashcard data extracted from Subiecte Primariat files
 * Organized by subject/deck
 */

export interface FlashcardData {
  front: string
  back: string
  mnemonic?: string
}

export interface DeckData {
  name: string
  description: string
  flashcards: FlashcardData[]
}

export const primatiatDecks: DeckData[] = [
  {
    name: 'Hematologie - Practic',
    description: 'Subiecte practice pentru primariat hematologie',
    flashcards: [
      {
        front: 'Pregătirea materialului și recoltarea sângelui pentru hemogramă - Sângele venos',
        back: `**Materiale necesare:**
- Seringa de plastic de unică folosință
- Ac de unică folosință (19-20 SWG = 0,9-1 mm)
- Vată, alcool, garou
- Mănuși de latex
- Vacutainere (dop mov, albastru, negru, roșu)

**Condiții generale de recoltare:**
Dimineața pe nemâncate

**Tehnica:**
Locul de puncție: o vena antecubitală la adulți (plica cotului); vena jugulară la sugari; o vena dorsală a mâinii la copii

Cu ajutorul garoului se produce o stază venoasă; recomandăm pacientului să strungă ușor pumnul. Se dezinfectează pielea, apoi se efectuează puncția.

**Obs:** Congestionarea zonei trebuie evitată pt prevenirea hemoconcentrării: garoului trebuie slăbit după ce acul pătrunde în venă. Pistonul seringii trebuie retras lent: se previne hemoliza.

Sângele trebuie repartizat cu atenție din seringa în recipiente, fără a forma spumă. Daca se folosesc anticoagulanti, amestecul cu acestia trebuie facut imediat, cu grija, fără a forma spuma.`,
        mnemonic: 'SWG 19-20 = 0.9-1mm; Antecubital (adult) / Jugular (sugar) / Dorsal (copii)',
      },
      {
        front: 'Pregătirea materialului și recoltarea sângelui - Sângele capilar',
        back: `Se folosește pt aprecierea exacta a morfologiei cel sanguine si a nr de Tr.

**Materiale:** lanteta sau ac de unica folosinta, vata, tifon sau hartie de filtru, alcool

**Tehnica:** locul de punctie: pulpa degetului inelar sau mijlociu (la adulti), supraf plantara a calcaiului sau a halucelui (la sugari)

Supraf intepata trebuie sa fie calda si bine vascularizata; daca e rece sau cianozata iar sangele apare lent, se obtin valori crescute pt Hg, nr de L si de Er

Se dezinfecteaza pielea, apoi se inteapa ferm si rapid, suficient de adanc pt ca sangele sa tasneasca de la sine.

Primele picaturi se sterg cu un tifon uscat sau o hartie de filtru, iar urmatoarele se recolteaza **evitand stoarcerea degetului**.

Picaturile de sange pot fi folosite pt obtinerea de frotiu prin depunerea lor pe lame de sticla.

**Obs:** în sangele capilar, Hg, Ht si nr Er sunt mai scazute decat in sangele venos.`,
        mnemonic: 'Capilar: deget inelar/mijlociu (adult), plantar (sugar); EVITĂ stoarcerea!',
      },
      {
        front: 'Anticoagulante pentru hemoleucogramă - Tipuri și preparare',
        back: `Pt hemoleucograma se folosesc saruri de EDTA (acid etilen diaminotetraacetic): Na₂ EDTA, K₂ EDTA și K₃ EDTA au un efect chelator asupra moleculelor de Ca din sange. Practic, EDTA impiedica formarea cheagului.

EDTA-ul e preferat altor anticoagulanti pt ca in proportie adecvata nu modifica volumul Er si nu produce alterari morfologice semnificative ale cel sanguine.

Trebuie respectata strict proportia sange – anticoagulant!

**Prepararea anticoagulantului cu EDTA:**
Se prepara solutie de Na₂ EDTA 1% în ser fiziologic; se repartizeaza în tuburi de centrifuga cate 0,2 ml ce se lasa sa se usuce la termostat (37° C) fara dop, pana la evaporarea completa a apei; se recolteaza 2 ml de sange.

**Prepararea amestecului anticoagulant Wintrobe:**
Oxalat de amoniu 1,2 g; oxalat de potasiu 0,8 g; apa distilata ad 100 ml; se repartizeaza cate 0,5 ml si se lasa sa se usuce în conditiile de mai sus; se recolteaza 5 ml de sange.`,
        mnemonic: 'EDTA = chelator Ca²⁺; 1% Na₂-EDTA: 0.2ml → 2ml sânge; Wintrobe: 0.5ml → 5ml sânge',
      },
      {
        front: 'Execuția frotiului de sânge - Tehnica și criterii de calitate',
        back: `Se pune o picatura mica de sange pe o lama-suport, la 1-2 cm distanta de unul din capete, pe linia centrala.

Se pune in contact picatura cu capatul unei lame slefuite, tinand-o la un unghi de aprox 30-45° fata de lama-suport. Picatura se va intinde de-a lungul liniei de contact dintre cele 2 lame.

Se intinde frotiul cu o miscare de translatie lina, uniforma si rapida a lamei slefuite.

Lama cu care se intinde frotiul trebuie sa fie putin mai ingusta decat lama-suport pt a se putea obtine si examina 2 margini paralele in lungime ale frotiului: se foloseste o lama slefuita cu colturi rupte.

Frotiul se usuca rapid prin agitare in aer.

**Obs: un frotiu bine executat trebuie sa indeplineasca urm conditii:**
- Lungime = 3-4 cm
- Sa fie mai ingust decat lama
- Sa aiba 2 margini drepte, paralele, si franjuri in partea terminala
- Sa aiba o grosime potrivi

ță, cu o trecere gradata de la gros la subtire
- Celulele sa fie raspindite uniform, sa nu fie distruse sau deformate`,
        mnemonic: '30-45° unghi; 3-4cm lungime; 2 margini paralele + franjuri terminale',
      },
      {
        front: 'Colorațiile uzuale - Colorația panoptică May-Grünwald-Giemsa (MGG)',
        back: `Colorarea frotiului trebuie facuta imediat sau in cel mult cateva ore dupa executarea lor.

Există: coloranți acizi (eozină), coloranți bazici (albastru/violet/azur de metilen), coloranți neutri (eozinat de albastru/azur de metilen)

Cea mai frecvent utilizata coloratie este cea **panoptica**.

Prin coloratie Romanowsky se intelege orice coloratie ce foloseste albastru de metilen si produsii lui de oxidare, pe de o parte, si eozina Y sau eozina B, pe de alta parte. Coloratiile Romanowsky includ: coloratia May-Grunwald, May-Grunwald-Giemsa, Wright, Wright-Giemsa, Leishman, Jenner etc.

**Soluție May-Grunwald:**
- Eozinat de albastru de metilen 1 g
- Glicerina neutra 50 ml
- Alcool metilic 100 ml (CH₃-OH)

**Soluție Giemsa:**
- Eozinat de azur de metilen 3 g
- Azur de metilen 0,8 g
- Glicerina neutra 250 ml
- Alcool metilic 200 ml (CH₃-OH)

Mai sunt necesare: apa distilata neutra, pipete Pasteur, pipete gradate

**Tehnica:**
A) Fixarea: se acopera frotiul cu solutia May-Grunwald si se lasa 2-3 min.
B) Colorarea: se adauga peste solutia May-Grunwald apa tamponata, si se lasa astfel 2 min.

Se varsa solutia de pe lama si se acopera lama cu solutie Giemsa diluata (o picatura sol Giemsa pt 1 ml apa tamponata), apoi repaus 20 min

Se spala lama la robinet
Se sterge dosul lamei si se lasa lama in stativ pt uscare

**Obs: un frotiu bine colorat prezinta microscopic:**
- Zonele dintre celule: clare
- Er: portocaliu-rosu`,
        mnemonic: 'MGG = May-Grunwald (2-3min) → MG+apă (2min) → Giemsa 1:1 (20min) → spală',
      },
      {
        front: 'Colorația Giemsa - Aspect microscopic după colorare',
        back: `După colorația Giemsa se observă următoarele aspecte:

**Granulațiile neutrofile:** purpuriu
**Granulațiile eozinofile:** rosu-portocaliu
**Granulațiile bazofile:** albastru-închis, negru
**Citoplasma limfocitelor (Lf):** albastru palid
**Nucleul leucocitelor (L):** albastru-violaceu

Pentru colorarea picturilor groase si evidentiera parazitilor malariei si a spirochetei Obermeier (Borrelia recurentis):

După ce picatura groasa a fost lasata la uscat cel putin 30 min la 37° C, se poate colora.

Sunt necesare: solutie Giemsa, apa neutra (pH = 7-7,2), pipete Pasteur, pipete gradate.

Se acopera frotiul cu solutie Giemsa proaspat diluata in 15-20 volume de apa neutra si se lasa 30-40 min. Pe parcurs sol se schimba de 2-3 ori pt a spala Hg provenita din liza Er. Se spala usor cu apa neutra. Se usuca.

Hematozoarele apar colorate rosu-violet, iar spirochetele violet-albastru.`,
        mnemonic: 'Neutro=purpuriu, Eozino=roșu, Bazo=negru-închis, Limfo=albastru palid',
      },
      {
        front: 'Colorații vitale - Tehnica și utilizare',
        back: `Sângele se pune în contact direct cu colorantul fără o fixare prealabilă, de ex. **colorația reticulocitelor**.

Sunt necesare: albastru briliant crezil sol 1% în alcool etilic absolut cutii Petri captușite cu hârtie de filtru umezită

Se intinde pe o lama un frotiu subtire din sol coloranta, se usuca, apoi se intinde sangele pe aceasta lama ca pt orice frotiu. Se pune in camera umeda timp de 1 min si se usuca la aer. Se examineaza cu obiectivul cu imersie.

Reticulocitele apar ca Er ce contin precipitate (pp) albastru inchis de granule sau filamente.`,
        mnemonic: 'Vital = fără fixare; Reticul = albastru briliant crezil 1% alcool',
      },
      {
        front: 'Picătura groasă - Tehnica de execuție',
        back: `Se recolteaza 3 picaturi de sange care se aplica pe lama in varfurile unui triunghi imaginar cu latura de 1 cm. Cu coltul lamei lame se omogenizeaza aceste picaturi, astfel incat picatura finala va avea diam de 1-2 cm. Preparatul e lasat sa se usuce.

Picatura groasa nu se fixeaza ci se **hemolizeaza**, urmarindu-se indepartarea hematiilor si deci evidentiera mai buna a parazitilor. Se acopera lama cu un strat de apa distilata, pana cand picatura ia un aspect cenusiu. Colorarea se face cu colorant Giemsa: dupa hemoliza, lama se acopera cu colorant Giemsa, se lasa 20-30 min si apoi se spala cu apa de robinet. Uscare si examinare la microscop.`,
        mnemonic: '3 picături → triunghi 1cm → hemolizează (nu fixează!) → Giemsa 20-30min',
      },
      {
        front: 'Valori normale - Eritrocite, Leucocite, Trombocite',
        back: `**ERITROCITE:**
- VN Femei: ♀ = 3,9 - 4,9 mil/mm³ (3,5-5 mil/mm³)
- VN Bărbați: ♂ = 4,3 - 5,5 mil/mm³ (4,5-5,5 mil/mm³)

**LEUCOCITE:**
- VN Adulți: 5000 - 9000 /mm³
- VN Sugari: 8000 - 12.000 /mm³
- VN Copii (m-m): 12.000 - 20000 /mm³

**TROMBOCITE:**
- VN: 150 000 - 350 000 /mm³

**RECOLTAREA SÂNGELUI:**
- 2-3 ml sg venos pe anticoagulant (Na₂ EDTA, K₂ EDTA, K₃ EDTA)
- Sânge capilar recoltat din pulpa degetului (pt eritrocite cu pipeta Potain cu bilă roșie)

**MATERIAL BIOLOGIC utilizat:**
- Sg integral venos sau capilar`,
        mnemonic: 'Er: ♀3.9-4.9 ♂4.3-5.5 mil; Leuco: adult 5-9k, sugar 8-12k; Trombo: 150-350k',
      },
      {
        front: 'Numărătoarea eritrocitelor, leucocitelor, trombocitelor - Metode',
        back: `Numărarea celulelor sanguine constă în numărătoarea directă la microscop a celulelor aflate într-un volum cunoscut de lichid diluat într-o proporție cunoscută.

Diluarea se face pentru a putea numără elementele figurate care sunt foarte numeroase și pentru ca sângele să nu coaguleze.

**PRINCIPII:**

**ERITROCITE:**
Se realizează o diluție a sg de cercetat într-o pipetă cu un lichid de diluție ce lizează leucocitele și lasă intacte eritrocitele.

**LEUCOCITE:**
Se realizează o diluție a sg de analizat într-o pipetă cu un lichid de diluție ce lizează eritrocitele, lăsând intacte leucocitele și păstrând doar elementele nucleate.

**TROMBOCITE:**
Se realizează o diluție a sg cu sol eritrocitolitică ce împiedică aglutinarea și conferă integritatea plachetar.

**REACTIVI:**

**Eritrocite:** soluția HAYEM
**Leucocite:** soluția TÜRCK
**Trombocit:** soluție POPA-ENACHE NICOARA

Se folosește camera de numărare BÜRKER-TÜRCK`,
        mnemonic: 'HAYEM=Er, TÜRCK=Leuco, POPA-ENACHE=Trombo; Camera BÜRKER-TÜRCK',
      },
      {
        front: 'Numărătoarea Er, Lc și Tr - Metode automate (Metoda de impedanță electrică)',
        back: `Pot fi numărate automat prin metoda de impedanță electrică și metode optice.

**1) METODA DE IMPEDANȚĂ ELECTRICĂ:**

Principiu: o suspensie de celule sanguine afl

ate într-un volum cunoscut de electrolit trece printr-un orificiu ale căror dimensiuni sunt constante, unde se aplică o diferență electrică.

Un electrod se află în afara sistemului de diluție ce conține agenți de dispergere (precum E și L). La trecerea prin orificiu cu ajutorul pompei (pompa Venturi), celula este numărată și măsurată electronic al nr/volum.

Pompa dirige celula prin conducte între electrod și celula senzorială (conform cu aparatura analitice unde modificări bruste produc erori în numărarea leucocitelor).

Trombocitele și eritrocitele sunt numărați în sângele diluat ce conține și leucocite și trombocite, pentru măsurare direct (sunt luate în considerare ca Er particulele mai mari de 36 fL).

Numărătoarea de nr modifică semnificativ nr de celulelor pentru că mult mai mic decât Er atâto timp cât nr lor le mult mai mic. Eroarea numărării cu această metodă este progresiv pe măsură cu ↑ nr și după trombocitelor sunt atât de mici încât de obicei nu produc erori în numărarea leucocitelor.

**Eritrocitele** - sunt numărații în sângele diluat ce conține și leucocite și trombocite, prim măsurare directă (sunt luate în considerare ca Er particulelor mai mari de 36 fL).

**Leucocitele** - se folosește o cameră de numărare (una pt E și T și una pt Lc), în care ± 2 cuvete de numărare.

Diluțiile - se exprimați ca Sg concentrată sau nr de celule sanguine / volum (în doze ± 2 cuvete de numărare - una pt E si T, una pt Lc).

**2) METODA OPTICE:**

Principiu: celulele pot fi numărate optic prin intermediul unui sistem în care o celulă fotoelectrică detectează lumina reflectată, difractată sau împrăștiată de celule ce trec una câte una printr-o zonă iluminată (cameră de curgere) din sistem.

Detectorul generează pulsuri electronice de mărituri proporționale cu mărimea particulelor, pulsuri ce sunt numărați.`,
        mnemonic: 'Impedanță electrică: ↑ volum = ↑ rezistență; Optică: detectează lumină reflectată',
      },
      {
        front: 'Determinarea reticulocitelor - Definiție și tehnica',
        back: `Se numără pe frotiul de sânge periferic clonele supravital prin examinare cu obiectivul de imersie al unui ×100.

În urma colorarii cu albastru briliant crezil, reticulocitele apar la microscop ca eritrocite ce conțin incluzii de culoare **ALBASTRU-VIOLACEE**.

**TEHNICA:**
Se numără reticulocitele întotlurile la 1000 de Er.

**VN:** 3-20‰ (0,3-2%)

Nr de reticulocite din sg periferic indică gradul de eficiento a activității măduvei osoase.

În anemii este necesar un indice mai exact al activității eritropoetice. Pt aceasta trebuie tinut cont de Ht pacientului.

**Nr corectat de reticulociti = (Ht pacient / Ht normal) × nr de reticulociti găsit**

Reticulocitele sunt Er imaturi, ce dimensiuni mai mari decât Er maturele, circulă 1-3 zile în sânge și prezintă o rețea reticulo-filamentoasă alcatuită din gigantă celulare restante și ribonucleotide.

Cât nr de reticulocite este un test specific de aprioare a lat medulare util pt stabilirea mecanismului de producere și urmărirea răspunsului la tratament, în diverse tipuri de anemii.`,
        mnemonic: 'VN: 3-20‰ (0.3-2%); Albastru-violet incluzii; Corecție = (Ht pacient/Ht normal) × nr reticul',
      },
      {
        front: 'Indici eritrocitari - VEM (Volum eritrocitar mediu)',
        back: `**VEM (fL) = Ht (L/L) / nr Er (×10¹²/L)**

sau

**VEM (fL) = Ht (%) / (mn Er × 10⁶/L) × 10**

Se folosește pt clasificarea Er în:

**NORMOCITE:** VEM = 80-100 fL → NORMOCITOZA
**MICROCITE:** VEM < 80 fL → MICROCITOZA
**MACROCITE:** VEM > 100 fL → MACROCITOZA

De dinci se studiază cu diametrul Er de pe froturile de sânge examinate la MO, exceptând:

**SFEROCITELE** - volum ↓, suprafață ↓
**CODOCITELE** - volum ↓, suprafață ↑`,
        mnemonic: 'VEM: Normo 80-100fL, Micro <80fL, Macro >100fL',
      },
      {
        front: 'Indici eritrocitari - CHEM (Concentrația medie de hemoglobină eritrocitară)',
        back: `**CHEM (g/dL) = Hb (g/dL) / Ht (L/L)**

sau

**CHEM (%) = Hb (g/dL) / Ht (%) × 100**

Se folosește pt clasificarea populației generale de Er ca:

**Populație NORMOCROMĂ:** CHEM = 32-36 g/dL
**Populație HIPOCROMĂ:** CHEM < 32 g/dL

**Termenul de HIPERCROMIE** nu definește o situație reală.

Singura celulă ce este hiperincr cu CHEM >36 g/dL este **SFEROCITUL**. Această valoare ↑ se datorează pierdere de elasticității a membranei și nu încarcării cu Hb (VEM normal, suprafața redusă).

**Orice valoare a CHEM >36 g/dL se repetă analiza** verificând sursa de eroare:
- Hemoliză
- Aglutinine la rece
- EDTA în exces`,
        mnemonic: 'CHEM: Normo 32-36, Hipo <32; >36 = SFEROCIT sau EROARE (hemoliză/aglut/EDTA)',
      },
      {
        front: 'Indici eritrocitari - HEM (Hemoglobina eritrocitară medie)',
        back: `**HEM (pg) = Hb (g/dL) / nr Er (×10¹²/L) × 10**

**VN: HEM = 26-34 pg**

HEM trebuie calculat împreună cu VEM și CHEM:
- Celulele mai mici conțin de obicei mai puțină Hb
- Cel mari conțin mai multă Hb
- VEM si HEM proporționale

**Anemii normocrome:** ↓VEM, ↓HEM, CHEM = normal
**Anemii hipocrome:** ↓VEM, ↓↓HEM, ↓CHEM
**Anemii macrocitare:** ↑VEM, ↑HEM, CHEM = normal
**Anemii microcitare:** ↓VEM, ↓HEM, ↓CHEM

**Un microcit cu HEM <26 pg** nu este neapărat si hipocrom
**Un macrocit cu HEM >34 pg** nu este neapărat hipercrom`,
        mnemonic: 'HEM: 26-34pg; Proporțional cu VEM; <26=micro, >34=macro (nu neapărat hipo/hiper)',
      },
      {
        front: 'Determinarea VSH (Viteza de sedimentare a hematiilor) - Metode și valori normale',
        back: `**VN:**
- ♂ = 0-10 mm/1 oră sau 0-20 mm/2 ore
- ♀ = 0-15 mm/1 oră sau 0-30 mm/2 ore

**Există 2 metode:**
- **WINTROBE**
- **WESTER GREN**

**Principiu:** În sangele recoltat pe anticoagulant și lăsat în repaus, eritrocitele sedimentează după un timp variabil.

**Materiale necesare:**
- Sg venos recoltat pe EDTA (K₂/K₃) (folosineau excelente de Hb producse vizece de sedimentare mai mare)
- Seringa și ac de puncție venoasă
- Stativ și pipetă Westergreen
- Citrat trisodic 3,8%

**Tehnica:**
- Se recoltează sg
- Se omogenizează (prin rasturnarea tubului >8 ori)
- Se plasează tubul în stativ vertical expunerea directa la lumina și vibroata la 18-25°C
- După 60' se citește distanța dintre nivelul superior al meniscului plasmei și cel mai înalt al colonei de eritrocite

Rezultatul se exprimă în mm/oră.

**↑ VSH:**
- Anemie
- Boli inflamatorii: EAR
- Boli infecțioase: TBC, septicemii
- Hemopții (leucemii, mielom, limfom Hodkim, macroglobulinemia WALDENSTRÖM)
- Hiperfibrinogenemii
- Gammapatii
- Nefropați
- Necroze

**↓ VSH:**
- Hepatită virală
- Stări alergice
- Policitemii
- ICC (insuf cardiacă cong)

**Variații fiziologice:**
- ↑ cu temp ambianta
- VSH ↑ la femei, în timpul menstruației, în sarcina mai ales în ultimele luni
- VSH ↑ la copii, la bătrâni`,
        mnemonic: 'VSH: ♂0-10/20, ♀0-15/30 mm; ↑=inflamație/infecție/anemie; ↓=hepatită/alergie',
      },
    ],
  },
]
