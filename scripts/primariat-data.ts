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
      {
        front: 'Teste citochimice - Principiu general și utilitate',
        back: `Testele citochimice au drept scop **identificarea substanțelor chimice și enzimatice** din celulă, cu ajutorul unor reacții de culoare.

Permit conservarea structurii celulare, identificarea celulelor, precum și localizarea intracelulară a componentului cercetat.

**Utilitate:**
- Identificarea substanțelor chimice și enzimatice din celule
- Conservarea structurii celulare
- Localizarea intracelulară a componentului cercetat`,
        mnemonic: 'Citochimie = identificare + conservare structură + localizare intracelulară',
      },
      {
        front: 'Test citochimie - FAL (Fosfataza alcalină leucocitară)',
        back: `**Principiu:**
Substratul FAL₃ (FOSFAT + NAFTOL AS/AS-D) (naftolamic) + H₂O

NAFTOLAMIDA + SARE DE DIAZONIU → compus azo colorat

FAL catalizează hidroliza substratului la fosfat și o naftolamidă ce se va cuplă cu o sare de diazoniu → compus azo colorat, insolubil, ce va precipita în fct de localizarea și activitatea enzimei.

**Tehnica:**
Variază în fct de kit-ul folosit și e prezentată de furnizor.

**Rezultate:**
- Seria granulocitară: ⊕ în fct de gradul de maturare
  → neutrofilul mezgem și segm: apar ⊕ (granule în citopl)
  → eozinofilul și bazofilul: ⊖ sau slab ⊕ (slab granular)
- Limfocitele, plasmocitele, monocitele și blastii: apar ⊖

La MO cu obiectivul de imersie se iau în considerare 100 de neutrofile segm și mezgem la care se obține un punctaj de la 0 la 4. Se adună punctajele.

**Valori normale:** variază în fct de reactivii folosiți.

**Fiind precisate de furnizorul kit-ului:**
- Importanța: diferențierea LMC de react leucemoide
- Valoare ↑: sarcina și primele zile postpartum, dupa corticoterapie, infecții (react leucemoide), leucemii cr cu neutrofile, sd. mieloproliferative, MM (mielom multiplu), mieloscleroza

**Valori ↓:**
- LMC netratat, SMD (sdr mielodisplazice), HPN

La MO se observă prezența de granule distincte sau compacte de culoare magică în citoplasma granulocitelor ler neutrofile mature.

Se lucrează cu frotturi de sânge periferic. Evaluarea se face în maxim 3 ori de la recoltare când se dorește examinarea directă, cu ulei de imersie.`,
        mnemonic: 'FAL: ↑=infecții/sarcină/cortico; ↓=LMC/SMD/HPN; 0-4 puncte × 100 neutrofile',
      },
      {
        front: 'Test citochimie - PEROXIDAZE (mieloperoxidază = MPO)',
        back: `**Principiu:**
Peroxidazele sunt enzime lizozomale ce transferă H de la un donor adecvat la un peroxid (H₂O₂). Donorul e oxidat și transformat într-un produs colorat, insolubil, ce poate fi luat ca indicator al activității peroxidazice la nivelul granulațiilor.

**MPO pozitivă**

**Tehnica:**
Variază în fct de reactivii folosiți și e prezentată de furnizor.

**Importanța:**
Pentru diferențierea LAM (LA mieloide) de LAL (LA limfoblastică)

**Rezultate:**
- MPO este specifică seriei granulocitare (în granulațiile primare ale staginofilelor și Eo)
- Granulatele gălbui-brune prezente intracelular → activitate peroxidazică
- Seria granulocitară are activitate peroxidazică în având cu promielocitul, intensitatea reacției ↑ progresiv cu maxim la neutrofilele mature

**Neutrofilele și Eozinofilele:** x ⊕
**Bazofieli:** x ⊖
**Monocitele adult:** slab ⊕ sau ⊖; eritroblastul: x ⊖
**Limfocitele, plasmocitele și EERITROBLASTE:** permit diferențierea tipului citochimie
**X. peroxidazelor de leucemie:**
  - Limfo blastii → x ⊖
  - Mieloblasti → x ⊕

**Corpii Auer sunt peroxidaze ⊕**

Se lucrează cu frotturi de MOH. Evaluare trebuie făcute în maxim 3-4 ori de la recoltare când se dorește exam. directe, cu ulei de imersie.`,
        mnemonic: 'MPO: Granulo ⊕, Limfo ⊖; Auer ⊕; LAM vs LAL diferențiere',
      },
      {
        front: 'Test citochimie - TEHNICA cu SUDAN negru B pt lipide',
        back: `**Principiu:**
Soluția alcoolică de Sudan negru B (colorant diazic) cu pH neutru colorează mono spre negru lipidele inclusiv grăsimile neutre, fosfolipidele și steroli.

**Tehnica:**
Variază în fct de reactivii folosiți și e prezentată de furnizor.

**Rezultate:**
- Granulatele primare și secundare de Ne și Eo dau o react intens ⊕ (+++)
- Mo dau o react slab ⊕
- Lf dau o react neg ⊖

**Importanța:**
Diferențierea LAM de LAL în paralel cu cercetarea peroxidazelor.

Se lucrează cu frotturi de MOH.`,
        mnemonic: 'Sudan negru B: Ne/Eo +++, Mo +, Lf -; Lipide colorare',
      },
      {
        front: 'Test citochimie - ESTERAZE (în fct de substratul folosit)',
        back: `**1) Esterază specifice seriei granulocitare:** naftol AS-D cloracetat esterază (NACE/CAE)

**2) Nespecifice (monocitari):** α-naftil acetat esteraza (ANAE)
α-naftil butarat esteraza (ANBE)

**3) Comune:**

**Principiu:**
Esterazele leucocitare hidrolizează cu substrat sintetic - un ester derivat de naftilen cu eliberarea unui derivat de naftol/naftol ce se cuplează rapid cu o sare de diazoniu, dând în precipitat colorat în mediu, dând un precipitat.

Colorat la locul/lângă locul de activitate enzimatică.

**Tehnica:** variază în fct de reactivii folosiți și e prezentată de furnizor.

**Importanța:**
Diferențierea granulocitelor de monocite.

Se lucrează cu frotturi de MOH (măduvă osoasă hematogă) sau de sânge periferic. Evaluarea trebuie făcută în maxim 5 zile de la recoltare și fixare dacă proba nu este imobilată în parafin și în maxim câteva ore când observ irelevă se face direct, la obiectivul cu imersie.

**Rezultate:**

**NACE:** ⊕ în granule nespecifica ale Neutrofilelor
- Ne porți veam de la promielocit
- ⊖ la Eo, Ba, Lf, Plasma, eritroblasti

**Macariocite pot fi slab ⊕ (Mo)**
**Mastocitele sunt intens ⊕**

**ANAE:** ⊕ intens în Mo, Mf, megacariocite, Tr
- ⊕ Bazofili și Plasmacit
- ⊕ slab, difuz în granulocite
- ⊕ focal în Lf T

**ANBE:** ⊕ intens în Mo și Mf
- ⊖ sau slab ⊕ în megacariocite`,
        mnemonic: 'NACE=Neutro ⊕; ANAE=Mono ⊕, Lf-T focal; ANBE=Mono ⊕',
      },
      {
        front: 'Test citochimie - Reacția PAS (periodic acid Schiff) pt glicogen',
        back: `**Principiu:**
Acidul periodic transformă prin oxidare grupările alcoolice ale hexozelor în grupuri aldehidice ce kontină în reacție și se colorează cu leucofuchsină (reactia Schiff).

Prin această reacție se pun în evidență: glicogenul, mucopolizaharidele neutre, mucoproteinsle, mucinele, glicoproteinele și lizina.

**Tehnica:**
Variază în fct de reactivii folosiți și e prezentată de furnizor.

**Rezultate:**

- Granulocitele: neutrofile → ⊕ intens, granular
  - Eozinofile → ⊕ difuz (granulația B Eo nu se colorează dar fondul citoplasmei e pozitiv difuz)
- Megacariocitele și trombocitele = ⊕ intens
- Lf și monocitele = ⊕ slab sau ⊖
- Eritroblasti și Eritrocitele = ⊖

**Obs 1)** La mieloblast și promielocit, citoplasma dă o reacție de culoare roz-palid difuză, încep cu mielocitul apar granulații roșii care devin fct mai intese cu cât elementele sunt mai mature.

**2)** O reacție PAS intens pozitivă o dă limfoblastul din LAL (apar numeroase granulații în citoplasma) putând fi astfel diferit de mitii mieloblast (citopl roz-palid difuză, fară granulații)

Se lucrează cu frotturi de MOH. Evaluare trebuie făcută în maxim 3 zile când se va observa direct, la obiectivul cu imersie.

**Importanță:**
Diferențierea LAM de LAL

**LAL:** în 50% din cazuri limfoblastii leucemoici sunt PAS ⊕ pozitivi cu granule mari, grosolane
**LAM:** mieloblastii leucemoici pot fi PAS ⊕ cu granule fine în monocitesti pot fi PAS ⊕ intens cu numeroase granule mici`,
        mnemonic: 'PAS: Glicogen; LAL=granule mari ⊕, LAM=difuz/granule fine; Neutro ⊕ intens',
      },
      {
        front: 'Test citochimie - HEMOSIDERINA MEDULARĂ (Colorația fierului cu albastru de Prussia/Perls)',
        back: `**Principiu:**
Soluția slabă de HCl dibureară Fe din complexele protece din moleculele de hemosiderină. Fe eliberat se combină cu fero cianura de potasiu formând fero cianură→ un compus de culoare verde-albastru.

**Implicații clinice:**

- Determinarea hemosiderinei medulare este cea mai simplă și sugestibilă metodă pt indicarea rezervelor de Fe medulare.

**Material biologic:**
- Frotiuni obținute prin puncțio medulară (sternală)

**Rezultate:**
- Granulele de Fe din citopl eritroflastilor și a Er apar cu nunca mici verti-albastru pe fondul roz al Hb
- Citopl macrofagilor (Mf) ce conțin hemosiderină se colorează verde-albastru palid difuză sau granular
- Nucleii celulelor de Fe petiin apar roșii

**Valori normale:**

- Că MOH (30-50‰) din eritroflastii conțin 3-5 granule de Fe (rispămulinte unifor în citoplasma (sideroblasti), majoritea Mf cu în citopl rezerve de Fe
- În sângele periferic: ⊖ - 3% din Er) conțin 3-5 granule de Fe (rispămulinte cuifrom în citoplasma (siderocite)

**Valori patologice:**

- În anemii hriperive: (în MOH Fe dispare din Mf, iar sideroblastii cad sub 10‰)
- În inflamații, infecții: Fe rămâne blocat în Mf în timp ce % de sideroblasti scade
- În SMD, intoxicații, anemii severe, apar stocări anormale de Fe în eritroblasti: numeroase granule de Fe (15-30) dispuse în jurul nucleului (sideroblas inelari)

**Importanță:**
- Diagnosticarea AN feriprive și sideroblastice, clasificarea SMD

**HEMOSIDERINURIA**

- Apare când T hemolize intravasculară
- Hb se eliberează în sânge în cantități mai mari decât poate liga hemoglobinei
- Excesul de Hb filtrat prin redochi și se reabsoarbe la nivelul tubilor cortorii proximal (în celulele tubulare), unde Fe e stocat ca hemosiderina
- Celulele TCP (tubului confort proximal) acumuleaza HS (hemosiderină), mai și se elimină în urină → culoa žełcară maronie (apare la 3-4 zile după debutul hemo-lizei)
- Si Hb-uria indică hemolire intravasculară, dar disparo mai rapide decât HS-uria (hemosiderinuria) care poate persiste câteva săpt
- Deci HS-uria e un marker mai bun al hemolizei intrave = pierdere continuă de Fe prin urină`,
        mnemonic: 'Hemosiderina: Perls (albastru Prussia); ↓=AN feriprivă; ↑=SMD/intox; Uria=hemoliză',
      },
      {
        front: 'Mielograma - Seria eritroidă: morfologia normală a componentelor',
        back: `**PRONORMOBLAST (PROERITROBLAST)**
- Citoplasmă intens bazofilă
- Nucleu: 80% din celulă, 1-2 nucleoli
- Cromatină în blocuri fine
- Ø = 20-25 μ

**NORMOBLAST BAZOFIL**
- Citoplasmă bazofilă, Ø = 10-18 μ
- Nucleu: 75% din celulă
- Aspect de "spiră de roată"
- Cromatină cea mai întinsă bazofilă a celulei

**NORMOBLAST POLICROMATOFIL**
- Citoplasmă bazofilă cu zone oxifile (Hb)
- Nucleu < 50% din celulă
- Aspect de "tablă de șah"
- Ø = 12-15 μ

**NORMOBLAST OXIFIL**
- Citoplasmă încărcată cu Hb
- Nucleu < 25% din celulă, excentric
- Cromatină deas omogenă
- Ø = 10-15 μ

**RETICULOCIT**
- Ø = 8-10 μ
- Citoplasmă policromatobilă

**ERITROCIT ADULT**
- Celulă rotundă, anucleată
- Ø = 7,5 μ
- Colorată roz-portocaliu spre roșu cu o zonă centrală mai palidă`,
        mnemonic: 'Pronormo→Bazo→Poli→Oxi→Reticulocit→Eritrocit; Nucleu: 80%→75%→50%→25%→0%',
      },
      {
        front: 'Mielograma - Seria granulocitară: morfologia normală a componentelor',
        back: `**MIELOBLAST**
- Ø = 10-18 μ
- Citoplasmă bazofilă
- Nucleu: 90% din cel, rotund
- Cromatină foarte fină
- 2-5 nucleoli

**PROMIELOCIT**
- Ø = 12-20 μ
- Citoplasmă bazofilă
- Granulații azurofile primare și posibile (NC) nucleu
- Nucleu: 50% din cel, rotund/oval/reniform
- Cromatină fină, 2-3 nucleoli

**MIELOCIT**
- Neutrofil: Ø = 12-18 μ
- Eozinofile: Ø = 12-17 μ
- Bazofil: Ø = 9-14 μ
- Citoplasmă slab bazofilă
- Granulații specifice și granulații primare reactivate la neutrofile
- Nucleu < 50% din cel, rotund/oval, excentric
- Cromatină în agregate mici

**METAMIELOCIT**
- Neutrofil: Ø = 10-18 μ
- Eozinofile: Ø = 10-16 μ
- Bazofil: Ø = 9-14 μ
- Citoplasmă azurofilă, granulații specifice primare reactivate la neutrofile
- Nucleu < 20% din cel, în curbat, reniform
- Cromatină în agregate medii

**NESEGMENTAT (BAND)**
- Ø = 10-16 μ
- Citoplasmă azurofilă, granulații
- Nucleu cu potcoavă / "S"
- Cromatină în agregate mari

**SEGMENTAT**
- Neutrofil: Ø = 10-15 μ (nucleu lobulat, 2-5 lobi)
- Eozinofile: Ø = 12-17 μ (nucleu cu 2 lobi)
- Bazofil: Ø = 8-14 μ (nucleu cu 2 lobi, mai puțin segmentat)
- Citopl cu numeroase granulații mici, roz-purpurii (neutrofil)
- Granulații mari, rotunde, roșu-portocalii (eozinofile)
- Granulații mari, rotunde, albastru-inclus, negre (bazofil)
- Cromatină în agregate mari`,
        mnemonic: 'Mielo→Promielo→Mielo→Meta→Nese→Segment; Nucleu: 90%→50%→50%→20%→potcoavă→lobi',
      },
      {
        front: 'Mielograma - Seria monocitoidă și seria limfo-plasmocitoidă: morfologie',
        back: `**SERIA MONOCITOIDĂ:**

**MONOBLAST**
- Ø = 10-20 μ
- Citopl bazofilă
- Nucleu: 80% din cel, rotund
- Cromatină fină, unicul sau mai mulți nucleoli mari

**PROMONOCIT**
- Ø = 10-20 μ
- Citopl bazofilă, posibil către granulație azurofilă
- Nucleu: rotund/ovalar/încitat
- Cromatină fină, 1-2 nucleoli

**MONOCIT**
- Ø = 15-25 μ (cea mai mare celulă din periferice)
- Forma rotundă/ovulară
- Nucleu mare, reniform/în potcoavă/rotund/oval/lobulat
- Cromatină fină
- Citoplasmă albastru-palid sau gri cu granulații fine, violacee în jurul nucleului, vacuolate

**SERIA LIMFO-PLASMOCITOIDĂ:**

**LIMFOBLAST**
- Ø = 12-18 μ
- Citopl bazofilă
- Nucleu rotund, central
- Cromatină în travee fine
- 1-2 nucleoli

**PROLIMFOCIT**
- Ø = 12-17 μ
- Citopl slab bazofilă, agranulară
- Nucleu rotund, ovalar
- Cromatină fină în agregate mici
- 1-2 nucleoli

**LIMFOCIT**
- Ø = 7-12 μ (cele de talie mică = limf mici)
- Ø = până la 20 μ (limfocit mari)
- Nucleu rotund, rar crentat
- Citoplasmă: cromatic condensată în ghemuri, neregulată (mai mult citoplasm acumulată în cromatină albastru-palid către granulații azurofile (roxii))

**LIMFOPLASMOCIT** (limfocit reactiv/virocit)
- Ø = 10-14 μ
- Citopl slab bazofilă, posibil granulații azurofile
- Granulații azurofilile posibil citoplasm
- Cromatină dispersată
- Nucleu posibil nucleol

**IMUNOBLAST**
- Ø = 12-25 μ
- Citopl intens basofilă, abundentă
- Nucleu central
- Cromatină fină, 1-2 nucleoli mari

**PLASMOCIT**
- Ø = 9-20 μ
- Citopl intens bazofilă, ovală, posibil granulații și vacuole de secreție
- Nucleu excentric, aspect de "șpițe de roată"`,
        mnemonic: 'Mono: 10-25μ, nucleu reniform/potcoavă; Limfo: 7-20μ, nucleu rotund; Plasmocit: "roată"',
      },
      {
        front: 'Mielograma - Seria megacariocitară și alte celule medulare',
        back: `**MEGACARIOBLAST**
- Ø = 15-40 μ
- Citopl redusă, intens basofilă agranulară
- Nucleu rotund/ovulară/trapezoid, retea groasă de cromatină, câțiva nucleoli

**PROMEGACARIOCIT**
- Ø = 40-50 μ
- Citopl în cantitate crescută, intens basofilă, apar zone acidofile
- Nucleu încitat, cromatină densă

**MEGACARIOCIT GRANULAR (mărombocitogen)**
- Ø = 30-160 μ
- Citopl abundentă, acidofilă, numeroase granulații acidofile
- Nucleu polilobat

**MEGACARIOCIT TROMBOCITOGEN**
- Ø = 100-160 μ
- Citopl: grupe de 10-12 granulații acidofile șiranite prin bucăți fine de citoplat hialină
- Nucleu polilobat / picnotic

**MACROFAGELE**
- Ø = 25-50 μ (celule mari)
- Citopl amplă, etalată, gri-palid cu zone rozete sau albăstriu, vacuolate
- Nucleu ovulară/reniform/rotund, excentric cu cromatină fină, cu 1-2 nucleoli

**HISTIOCITELE**
- Sunt celule mari cu citopl abundentă, neregulată cu numeroase granulații
- Nucleu oval/trapezoid, cu cromatină în bulgări

**EOZIHOCITELE**
- Sunt celuli mari cu citopl neregulată, cu prelungi cu granulații eozinofile tipice, leukea cu celule granulocitului eozinofile
- Nucleu mic, rotund, de aspect reticular

**MASTOCITELE** (bazofilele tisulare)
- Celule mari Ø = 20-30μ
- Citopl plină de granulații voluminoase, metacromatice
- Nucleu mic (7-10μ), rotund, dens, central`,
        mnemonic: 'Megacario: 15-160μ, ↑dimensiune cu maturarea; Macrofag: 25-50μ, vacuolat',
      },
      {
        front: 'Medulograma normală - Compoziția procentuală și raportul G/E',
        back: `**SERIA GRANULOCITARĂ: 65%**
- Mieloblast: 0,5-3%
- Promielocit: 1-6%
- Mielocite neutrofile: 13-20%
- Metamielocite neutrofile: 15-20%
- Polimorfonucleare neutrofile: 20-35%
- Eozinofile și bazofile: 1-7%

**SERIA ERITROIDĂ: 25%**
- Pronormoblasti: 0,5-3%
- Normoblasti bazofili: 2-6%
- Normoblasti policromatofili: 8-14%
- Normoblasti oxifili: 4-8%

**SERIA MEGACARIOCITARĂ: 1-2%**

**SCI (Sistemul celular imunocompetent): 9%**
- Limfocit: 1-8%
- Plasmocite + macrofage + histiocite + eozinocite până la 6%
- Monocite: 0-2%

**RAPORTUL G/E (granulo-eritrocitar): VN = 3-4**

**INDICELE MITOTIC** = număr de mitoze la 1000 elemente capabile de proliferare din seria respectivă:
- VN = 3-10 ‰ pentru seria granulocitară
- VN = 12-30 ‰ pentru seria eritroidă

**MITOGRAMA** = exprimarea procentuală a fazelor mitozei pentru o anumită serie`,
        mnemonic: 'G/E = 3-4; Granulo 65%, Eritro 25%, Mega 1-2%, SCI 9%; Mitotic: G 3-10‰, E 12-30‰',
      },
      {
        front: 'Mielograma - Curbe de maturație pentru seria eritroidă și seria granulocitară',
        back: `**1) SERIA ERITROCITARĂ - Curba de maturație:**

Reprezintă înscrierea grafică a nr de eritroblasti bazofile, policromatofile și ortocromatofili la 100 de eritroblasti.

**Valori normale:**
- Eritroblasti bazofili: 20%
- Eritroblasti policromatofili: 48%
- Eritroblasti oxifili: 32%

**Variații patologice:**
- ↑ procentul de eritroblasti bazofili (deviere la stânga) în:
  - Anemii feriprive
  - Anemie megaloblastică
  - Eritremii
- ↑ procentul de eritroblasti oxifili (deviere la dreapta) în:
  - Anemii hemolitice

**2) SERIA GRANULOCITARĂ - Curba de maturație:**

Reprezintă înscrierea grafică a nr de mieloblasti, promielociti, mielocite și metamielocite.

**Valori normale:**
- Mieloblasti: 3%
- Promielociti: 12%
- Mielocite: 40%
- Metamielocite: 45%

**Variații patologice:**
- Deviere la stânga = ↑ procentului de elemente tinere în detrimentul celor mature în:
  - Anemii
  - LMA (leucemie mieloidă acută)
- Deviere la dreapta = în infecții`,
        mnemonic: 'Eritro: Bazo 20%, Poli 48%, Oxi 32%; Granulo: Mielo 3%, Promielo 12%, Mielo 40%, Meta 45%',
      },
      {
        front: 'Mielograma - Modificări patologice cantitative ale medulogramei',
        back: `**HIPERPLAZIE MEDULARĂ:**
- ↑ nr de elemente nucleate medulare
- Cauze: leucemii, poliglobulia, anemii carențiale

**HIPOPLAZIE MEDULARĂ:**
- ↓ nr de elemente nucleate medulare
- Cauze: expunere la radiații, chimioterapie (Bz), otrăviri medicamentoase (cloramfenicol), virusuri (Epstein-Barr, parvuvirus hepatitice), infiltrări medulare (metastaze)

**APLAZIE MEDULARĂ:**
- ↓ marcată a mielocariocitelor
- Hiperplazie seriei eritroide → anemii carențiale → poliglobulia
- Hipoplazie seriei eritroide → anemii aplastice
- Hiperplazie S. granulocitare → infecții, LMA, LMC
- Hipoplazie S. granulocitare → ↑ în cadrul hipoplaziei medulare`,
        mnemonic: 'Hiperplazie: ↑elemente (leucemii, AN carențiale); Hipoplazie: ↓elemente (radiații, chimio)',
      },
      {
        front: 'Mielograma - Modificări patologice morfologice ale seriei eritroide',
        back: `**PRECURSORI ERITROTICI - Dimensiuni crescute:**
- Macroblaști, megaloblaști în:
  - Deficit de vit B12, acid folic

**PRECURSORI ERITROTICI - Citoplasma redusă cu zone periferice incomplet hemoglobinizate:**
- Aspect zdrobituit, franjurat în:
  - Deficit de Fe

**CRIPTE JOLLY:**
- Punctații bazofile, nuclei înmuguriți sau pe cale de distrugere (cariorrhexis)
- Celule biconcave sau bicornute
- În: anemii severe, displace

**VACUOLE CITOPLASMATICE:**
- În: stări toxice

**SERIA GRANULOCITARĂ:**

**PRECURSORI GRANULOCITARI - Dimensiuni crescute mai ales pe treapta metamielocitară:**
- Deficit de vit B12, acid folic

**CITOPL CU GRANULAȚII ÎN NR REDUCERE:**
- Anomalii megaloblastice, displace

**GRANULAȚII TOXICE ȘI VACUOLE CITOPLASMATICE:**
- În: infecții grave, stări toxice

**ANOMALII EREDITARE:**
- Pelger-Huet (deficit de segmentare)
- Alder-Reilly (granulații mari, negre în neutrofile)
- Chediak-Higashi (granulații gigante albastru în leucocite)
- May-Heggelin (incluzii mari, albastru în spaital în Neutrofile și Eozinofile)`,
        mnemonic: 'Eritro: Megaloblasti (B12/folat), zdrobire (Fe); Granulo: toxice/vacuole (infecții)',
      },
      {
        front: 'Mielograma - Modificări patologice ale seriei megacariocitare și infiltrații',
        back: `**SERIA MEGACARIOCITARĂ:**

**Megacariocite de dimensiuni mici, cu lobulație redusă (micromegacariocite):**
- În: displace
- Megacariocite cu lobulație ↑ (în "explozii"), cu aspect de nucleu "în explozii"
  - În: deficit de vit B12, acid folic
- Megacariocite hipertroombocitogene
  - În: hemagiid cronică
- Hiperpsizie granulocitară megacariocitară
  - Ad: mieloproliferative cronice
  - Hemagiid cronică

**SCI:**

- Celula Mott = plasmocit cu vacuolizare extremă a citopl (aspect de cercuri de structură)
- Celula mielomatoasă = plasmocit alterat majorfunctional, talie ↑ ne mare, nucleol vizibil, citopl cu contur neregulat, uneori acidofilă → MM
- Cel Reed-Sternberg = dimensiuni ↑ mari (30-100μ) cu 7-3 nuclei mari cromatină densă ce se suprapune dând aspect monstruos de nc înmuguriți, cu nucleoli mari (→10μ) cu citopl unuoi vacuolată → b. Hodgkin

**INFILTRĂRI MEDULARE:**

**Înfoltrării medulare - apare în urma undei proliferări maligne când MOH este invadată de celule neoplazice:**
- În LA: efectuarea mielogramei indică proliferarea unui anumit tip de celulă
  - Mieloblast: LAM tip M1, M2
  - Promielocit: LAM tip M3
  - Precursori mielo-monocitotți: LAM tip M3
  - Precursori monocitotți: LAM tip M5
  - Precursori eritroiti: LAM tip M6
  - Megacarioblast: LAM tip M7
- În LLC și limfoame limfocitare - infiltrare mod cu limfa
- În MM - ↓ cu plasmocite
- În neoplasmele organelor solide - pot apărea metastaze în MOH cu cel produzite din tumori

**UMBRE NUCLEARE GRUMPRECHT:**
- Formațiuni nucleare intense, fără citoplasmă (distrugerea ↓ în momentul întinderii frotiului)
- În: LLC

**MONOCITE:**
- Talie ↑, vacuole numeroase → b. infecțioase
- Vacuolațiere întinsă - b. Niemann-Pick
- Nucleu polilobulat - toxii infecția gravă`,
        mnemonic: 'Megacario: micro (displazie), hiperlobat (B12); Infiltrări: LAM, LLC, MM, metastaze',
      },
      {
        front: 'Examinarea și interpretarea unui frotiu sanguin - Morfologia eritrocitară',
        back: `**Sângele periferic pentru adulții normali:**
- Volum: 4,5-5 L (70-80 ml/kg cap)
- Format din: plasmă și elemente figurate (Er, Le, Tr)

**Examinarea frotiului de sânge periferic colorat MGG:**
- Permite aprecierea cantitativă și calitativă ale elementelor figurate

**MORFOLOGIA ERITROCITARĂ:**

**Eritrocitele adulte normale:**
- Ø mediu = 7,5 μ
- Anucleate, colorate roz-portocaliu spre roșu cu o zonă centrală mai palidă

**VARIAȚII DE MĂRIME = ANIZOCITOZĂ:**
- **Microcite:** Ø < 6μ → anemii feriprive, talasemii
- **Macrocite:** Ø > 9μ → anemii hemolitice, toxice, insuficiență hepatică, neoplasme, citostății după natură
- **Megalocite:** Ø > 12μ → anemii megaloblastice

**VARIAȚII DE FORMĂ = POIKIILOCITOZĂ:**
- **Ovalocite (eliptocite):** Anemii feriprive, talasemii, eliptocitoză ereditară
- **Echinocite (spicula scurtă, regulată):** Uremie, deficit de a responde în FISIC, datonice unui artefact (frotiu prea gros) sau prezența poeraproteinelor în plasmă
- **Acantocite (spicula neregulata):** Anemii severe, ciroza hepatică, alcoholism, postsplenectomie`,
        mnemonic: 'Er normal: 7.5μ, roz-portocaliu; Micro <6μ (Fe); Macro >9μ; Megalocite >12μ (B12/folat)',
      },
      {
        front: 'Concentratul leucocitar - Definiție, indicații și principiu',
        back: `**DEFINIȚIE:**
Detectia unor elemente patologice prezente în sângele periferic poate fi mărită prin prepararea unei fracțiuni concentrate a elementelor nucleate sanguine.

Când este prezent doar un nr mic de celule imature sau elemente celulare anormale, acestea pot să nu fie detectate pe frotiul de sânge obișnuit.

**Concentratul leucocitar** poate fi de ajutor în detectarea lor.

**INDICAȚII:**
- Paucitopenie fără o cauză aparentă
- **Leucemie leucopenică** → detectia de blasti
- **Identificarea de precursori mieloizi, eritroblasti, fragmente de megacariocite**
- **Anemie macrocitară** → detectia de megaloblasti și granulocite hipersegmentate
- **Mielom multiplu** → plasmocite
- **Celule tumorale circulante**
- **Prezența de paraziți sau bacterii intracelulare**

**PRINCIPIU:**
Detectia unor elemente patologice poate fi mărită prin prepararea unei fracțiuni concentrate a elementelor nucleate sanguine.`,
        mnemonic: 'Concentrat L: ↑detectie celule rare (blasti, megaloblasti, plasmocite, tumori, paraziți)',
      },
      {
        front: 'Concentratul leucocitar - Tehnica de preparare',
        back: `**TEHNICA:**

1. **Recoltare:** Se recoltează sânge venos pe K₃-EDTA sau K₂-EDTA

2. **Adăugare tuburi:** Se adaugă tuburile într-un suport cu petic ventilate și se lasă la temperatura camerei = 2-3 h

3. **Sedimentare:** Elementele celulare sanguine sedimentează separându-se de plasmă

4. **Pipetare plasmă:** Se adună cu o pipetă plasma supranatantă împreună cu stratul leuco-trombocitar situat deasupra stratului eritrocitar și o mică porțiune din stratul eritrocitar

5. **Centrifugare:** Se trece plasma într-o eprubetă și se centrifugază la această (10 min la 2000 rpm)
   - Leucocitele și trombocitele depunându-se pe fundul epruvetei

6. **Îndepărtare plasmă:** Plasma supranatantă se îndepărtează

7. **Colorare:** Din sediment se întinde un frotiu colorat MGG

**EXAMINARE:**
- Inițial se examinează frotiul cu obiectiv de 20×
- Apoi cu 100× cu imersie
- Se examinează cu atenție marginile și franjurile frotiului unde se depun precursorii eritroizi și eritroblasti

**VALORI NORMALE:**
- Absența elementelor celulare anormale

**INTERPRETARE:**
- Pe lamele de concentrat leucocitar pot fi prezente formule celule sanguine care nu apar în mod obișnuit în formula leucocitară curentă (mielocite, metamielocite)
- Froturile bine efectuate sunt reprezentative pentru populația generală de celule medulare prezente în sânge`,
        mnemonic: 'Tehnica: K₃-EDTA → 2-3h sedimentare → centrifugare → frotiu sediment → MGG',
      },
      {
        front: 'Concentratul leucocitar - Interpretare și imagini patologice',
        back: `**CONȘTIENTAREA TEHNICII:**
Constă în obținerea unui nr mai mare de L de din ∅ pentru a întări o frottare ce se colorează panoptic.

**Recoltare:** Puncte neviable, pe anticoagulant Na₂-EDTA sau K₃-EDTA
- Material biologic: sg venos pe anticoagulant

**După recoltarea sg în avansă ce conține anticoagulant, pe bacdizare:**
- Această proba se realizează amestecarea sg cu anticoagulantul
- Se așează apoi într-o în portier verticală și se lasă 2-3 ore la temperatura laboratorului

**Procesare:**
- După o elem cu sedimentat, se împinge plotonul până la nivelul Er
- Transferând plasma + Le + Tr în epruvetă de centrifugare
- Se centrifughează 10min la 2000 rot/min → Le + Tr se depun la fundul epruvetei ca un burete gri-rozatic
- Se decantează plasma, lăsând o cantitate mică pt diluarea sedimentului
- Se întoarce frotiu subțire, se colorează panoptic

**IMAGINI NORMALE:**
- Nr ↑ de granulocite și mononucleare normale (limfocite, și unori mielocite, metamielocite, ca histiomonocitaje)

**IMAGINI PATOLOGICE:**

**În leucemii acute:**
- Leucoblasti, facând de și cu agranulocitoza sau pancitopenie

**În mieloscleloze cu metaplazie mieloido:**
- Mieloblasti, eritroblasti, megacariocite

**În mielom:**
- Plasmocite atipice

**În limfosarcom:**
- Limfoblasti atipici

**În b. Hodgkin:**
- Celule Sternberg (și roz)

**În anemii megaloblastice:**
- Megaloblasti`,
        mnemonic: 'Patologie: LA (blasti), Mieloscleroză (meta mieloide), Mielom (plasmocite), Hodgkin (Sternberg)',
      },
      {
        front: 'Rezistența osmotică globulară (osmotică) a eritrocitelor - Principiu și valori normale',
        back: `**DEFINIȚIE:**
Reprezintă rezistența Er în soluții hipotone.

**PRINCIPIU:**
Metoda se bazează pe comparamentul Er în soluție NaCl de diferite concentrații hipotone, indicând concentrația la care apare hemoliza (unde începe) și unde hemoliza este totală.

**VALORI NORMALE:**

**Hemoliza inițială:** 0,46-0,42% NaCl
**Hemoliza totală:** 0,38-0,36% NaCl

**Recoltarea sg:** 1,6 ml sg venos recoltat pe 0,4 ml citrat trisodic
**Material biologic:** sg integral recoltat pe anticoagulant

**REZULTATE:**

**Hemoliza inițială:** prima eprubetă care prezintă supranatant hemolizat

**Hemoliza totală:** prima eprubetă care nu prezintă sediment de Er (toate fiind hemolizate)

- Când hemoliza apare la conc mai mari de NaCl, rezistența osmotică este ↓
- Când hemoliza apare la conc mai mici, rezistența osmotică este ↑

**↓ REZISTENȚEI OSMOTICE:**
- Sferocitoza ereditară
- Intoxicații cu benzen
- Anemie hemolitică autoimună
- Hepatită epidemică

**↑ REZISTENȚEI OSMOTICE:**
- Talasemie heterozigote și homozigote
- Anemii feriprive
- Sferocitomie
- Hemoragii acute
- Icterul mecanic
- Anemiile BIERMER`,
        mnemonic: 'RO: NaCl 0.46-0.42% (inițial), 0.38-0.36% (total); ↓=sferocitoza; ↑=talasemie, Fe↓',
      },
      {
        front: 'Testul de autohemolize - Principiu, tehnica și interpretare',
        back: `**UTILITATE:**
Pentru depistarea sferocituzei ereditare.

**VALORI NORMALE:**
- Autohemoliza la 48ore: în absența glucozei = 0,5-3,6%
- În prezența glucozei = 0,1-2,9%

**RECOLTARE:**
10 ml sg defiibrinat, recoltat în condiții sterile, pe perie de 3/4 din

**Material biologic:** sg integral defiibrinat

**PRINCIPIUL METODEI:**
Incubarea Er (în ser) autolog timp de mai multe zile e urmată de 3 hemoliză treptată, mult accentuată în caz de sferocitoza ereditară.

**TEHNICA:**
Autohemoliza se crește în sferocitoza ereditară (b. MINKOWSKI-CHAUFFARD) → defect consecutiv prin glucoză.

Autohemolize crește cu corecrarea prin glucoză: anemie hemolitica autoimune, enzimopatii eritrocitare.

**DETERMINAREA CORPILOR HEINZ (col. supravitală):**

Se determina unei denaturare a Hb.

**Recoltare sg:** 1,5 ml sg venos + 0,5 ml citrat sau oxalat de Na
- Punctia pulpei degetului

**Material biologic:** frotiu din sg venos sau capilar

**Principiul determinării:**
Cu excepție Hb F, toate Hb normale și/sau patologice se denaturează în mediu puternic alcalin.

**Valori ↑ HbF în:**
- Sarcină
- Anemii severe de rene
- Anemii BIERMER
- Leucemii
- Parcitidată ereditară HbF
- Talasemii hetero și homozigote
- Siclumii hemozigote, HbC, HbE homozigote

**Corpi Heinz apar:**

Detectia unei Hb instabil = Hb la care anomalia structurală duce la disocierea și precipitarea întravelirocitare a subunităților componente → corpii Heinz: Hb KOLN, Hb HAMMERSMITH, Hb BUCURESTI

În intoxicații cu substanțe methemoglobinizante: nitriți, nitrați, naftochinone, nitroglicerină, lidocaine, benzilidinace, fenacetina, vitamine K`,
        mnemonic: 'Autohemoliza: 0.5-3.6% (48h); ↑=sferocitoza (↓cu glucoză); Corpi Heinz: Hb instabile',
      },
      {
        front: 'Determinarea Hb alcalino-rezistente (HbF) - Principiu, tehnica și interpretare',
        back: `**DEFINIȚIE:**
Este un test specific pentru detectia HbF.

HbF (α₂γ₂) este componența majore a Hb în prezența fetală (70-80%), detectată structura rămânută la lăutorilor cu însăturarea dintre lăuturile α și γ.

HbF prezintă rezistență crescută la alcali, prezintă afloritate crescută pt O₂.

**RECOLTARE:**
8 ml sg + 2 ml citrat de sodiu 3,8%

**Material biologic:** Er din sg recoltat anterior
- Ne poate perturbare imediat sau perioada 1-3 zile la frigider

**PRINCIPIUL DETERMINĂRII:**
Cu excepției Hb F, toate Hb normale și/sau patologice se denaturează în mediu puternic alcalin.

**Valori ↑ HbF în:**
- Sarcină
- Anemii severe de rene
- Anemii BIERMER
- Leucemii
- Parcitidată ereditară HbF
- Talasemii hetero și homozigote
- Siclumii hemozigote, HbC, HbE homozigote`,
        mnemonic: 'HbF: rezistentă alcali; ↑=talasemie, AN severe, BIERMER, leucemii, sarcină',
      },
      {
        front: 'Testul Brewer (deficit de G-6-PD) - Principiu și interpretare',
        back: `**UTILIZAT PT:**
Depistarea deficitului de glucozo-6-fosfat dehidrogenază, afecțiune eritrocitară caracterizată prin rezidura în grade varies a activității enzimei.

**VN: TEST NEGATIV**

**RECOLTARE:**
9 ml sg + 1 ml heparină

**Material biologic:** sg integral

**PRINCIPIUL ELT:**
Hb eritrocitară este oxidată cu ajutorul nitratului de Na și transformată în met-Hb; prin adăugarea "albastru lui de met-Hb este reversibilă cu Hb, situație care nu se întamplă în cazul deficitului de G-6-PBH.

**G-6-PBH** aare rost să izocenzime:

• 50 izocenzime cu activitate manuală sau foarte scăzute (nu produc many cluice)

• 20 izocenzime manualmente deficit enzimatic doar în cazuri speciali: ingerare de ajutei reducătoare - nitriți, aspirină, sulfonide

• 20 izocenzime manifestă deficit enzimatic în mod spontan

**INTERPRETARE:**

Defectul G-6-PBH face imposibilă jumătatea manuala a teste sustului pentru-butatula Dotania activului delict examatic ia curațed sportea acii ne imai preducă sufficent NADPH + H⁺ (cu rol in menținerea integrității membranei Er și reducerea metHb la Hb)

Acest deficit a apareut în torinul nucleierean ca reactie la prezența plasmoldien malariei (parazitul nucișită mari castități de NADPH + H⁺ pt devoltter)`,
        mnemonic: 'Brewer: deficit G-6-PD; oxidare met-Hb; ↓albastru=deficit; hemoliză cu oxidanți',
      },
      {
        front: 'Testul de siclizare (Hb S) - Principiu și interpretare',
        back: `**UTILIZAT PT:**
Evidențierea Hb S, Hb patologică ce determină siclemie sau hemoglobinopatie S.

**VN: TEST NEGATIV**

**Recoltarea sg:** sg de bolnav recoltat pe anticoagulant (1:10 pt citrat trisodic), 3,2° sg normal, recoltat pe anticoagulant (-//-)

**Material biologic:** frotiul proaspete

**Principiul elt:**
În prezenta unui agent reductor, Er care conțin Hb în forma, transformându-se cu Er în secera.

**REZULTATE:**
- În condiții normale, forma Er nu se modifică în timp
- În cazul prezenței HbS, Er iau forma de secerea sau franjuri de artar (drepanoidcite)

**INTERPRETARE:**

- Siclizarea marcată, în mai puțin de o oră = drepanocitoză în formă homozigotă
- Siclizare lentă, până la 12 ore = drepanocitoză forme heterozigote

Procentul de drepanoci variază între 40-50%, până la 100% în funcție de cantitatea de Hb S conținută în Er.`,
        mnemonic: 'Siclizare: Hb S + reducător → Er seceriformi; <1h=homozigot, <12h=heterozigot',
      },
      {
        front: 'Testul Ham (cu ser acidificat) și testul cu sucroză - HPN',
        back: `**TESTUL HAM (TESTUL CU SER ACIDIFICAT):**

**UTILIZAT PT:**
Diagnosticarea hemoglobinuriei paroxistice nocturne - HPN (od: MARCHIAFAVA-MICHELI).

HPN este o boală idiopathică caracterizată pentru defect membranare al elementelor mieloide din MO, defectul se traduce prin vulnerabilă la acțiunea complementului de plasmă.

Minimum un proces continuu de hemoliză intravasculară pentru acesta. acute hemolitica caracterizată de hemoglobinurie.

**VN: TEST NEGATIV**

**Recoltarea sg:**
- 7 ml sg de cercetat fără anticoagulant
- 4,5 ml sg de cercetat + 0,5 ml citrat trisodic
- 6,5 ml sg normal, grup O și + 0,5 ml citrat trisodic
- 7 ml sg normal, grup AB IV, fără anticoagulant

**Material biologic:** ser de la bolnav, separat imediat după forma cheagului
- Plasma de la bolnav (sg recoltat pe citrat)
- Er normali de grup O†
- Ser normal, grup AB IV (sursă de complement)

**Principiul elt:**
Serul normal, acidifiat, la pH 6,5-7,0, hemolize în mod constant Er HPN, datorit pe cele normale, folosit ca martor. S-a următut cu HPN.

Este cel mai valoros test pentru dg HPN.

**TESTUL DE HEMOLIZA LA SUCROZA:**

Este un test de screening în diagnosticarea HPN.

**VN: TEST NEGATIV**

**Recoltarea sg:** sg de cercetat 2-3 ml (recoltat pe K₃-EDTA)
- sg normal izogrup cu cel de cercetat 2-3 ml (recoltat pe K₃-EDTA)
- sg recoltat simplu, izogrup cu cel de cercetat

**Principiul elt:**
Er bolnavilor cu HPN prezintă o anomalie membranară și sunt hemolitică în prezenta complementului nivel și a unei soluții cu forță ionică mică (sucroza - cu 7 oră simpla).

**REZULTATE:**

- Martor: supranatant incolor
- Sg de cercetat: supranatant incolor ca martorul = negativ
  - Supranatant cu diferite nuanțe de culoare roșu → roșu în tot de procesului de Er lizate (grade de hemolize) =`,
        mnemonic: 'Ham: HPN, ser acid pH 6.5-7→hemoliză Er; Sucroză: forță ionică mică→hemoliză HPN',
      },
      {
        front: 'Testul Sia - Principiu și interpretare',
        back: `**VN:** 150-420 mg%

**Recoltarea sg:** punctie venoasă - recoltat simplu

**Material biologic:** ser

**Principiul elt:**
Se bazează pe precipitarea (cu HgOllhdri, iMcat2, lipositei complex de jocul) macroglobulinelor din ser (când 7 în cantitate mare).

Este un test orientativ și pentru renușibil.

**REZULTATE:**
- Test negativ = serul se amestecă cu apă, fără opacify
- Test pozitiv = se formează un precipitat albicior, uh reprezentă crescătă macroglobulinelor > 25%

**VALORI NORMALE:**
- Pancreatită acută
- Stări fibrinolitice
- Poliartrite reumatoide

**VALORI CRESCUTE:**
- Ad. Nefrotei
- Diabet Saharat
- LES
- Dermatită atopice
- Sarcină`,
        mnemonic: 'Sia: 150-420mg%; ↑macroglobuline→precipitat; ↑=nefroze, diabet, LES, dermatită',
      },
      {
        front: 'Sistemul de grupă sanguină ABO - Structură și determinare',
        back: `**EXISTĂ:**
- Substanțe antigenice specifice de grupă = **IZOAGLUTINOGENI** (pe eritrocite)
- Anticorpi specifici = **IZOAGLUTININE** (în plasmă sau ser)

**STRUCTURA SISTEMULUI ABO:**

| Grupa sanguină | Aglutinogene pe eritrocite | Aglutinine în ser |
|----------------|---------------------------|-------------------|
| O              | -                         | anti-A și anti-B  |
| A              | A                         | anti-B            |
| B              | B                         | anti-A            |
| AB             | A, A', B                  | -                 |

**DETERMINAREA GRUPELOR SANGUINE ABO:**

Se face pe lamă sau în tub prin două probe obligatorii:

**1. Determinarea aglutinogenelor (proba BETH-VINCENT):**
- Se folosesc seruri hemolizate: O (anti-A, anti-B), A (anti-B), B (anti-A)

**2. Determinarea aglutininelor (proba SIMONIN):**
- Se folosesc eritrocite test cunoscute de grupa O, A și B

**1. Determinarea aglutinogenelor (Beth-Vincent):**

**METODĂ PE LAMĂ:**
- Pe lamă se pun succesiv, cu pipete diferite, câte o picătură de ser hemotest în ordinea următoare: O la stânga, A la mijloc, B la dreapta
- Cu totul unei lame se adaugă o mică cantitate de sânge pe fiecare picătură de ser
- Picătură de ser se prelimbând totului lamei pt fiecare picătură de ser hemolizată, amestecându-se pt omogenizare (picătură de sânge cau de 10× mică decât cea de ser)
- Lama se ia în mână și se împrămă o mișcare lentă rotatorie
- Citirea se face cu primul 2-3 min cu ochiul liber

**INTERPRETAREA REZULTATELOR:**

1. Dacă în toate 3 picăturile nu apare nici o aglutinare, amestecul rămânând uniform, colorate în roșu, sângele de cercetat aparține grupei **O**

2. Dacă apare aglutinare cu serurile O și B și lipsa de aglutinare cu serul A, sângele aparține grupei **A**

3. Dacă apare aglutinare cu serurile O și A și lipsa de aglutinare cu serul B, sângele de cercetat aparține grupei **B**

4. Dacă apare aglutinare cu toate cele 3 seruri, sângele de cercetat aparține grupei **AB**`,
        mnemonic: 'ABO: O(anti-A,B), A(anti-B), B(anti-A), AB(fără); Beth-Vincent=aglutinogene',
      },
      {
        front: 'Determinarea aglutininelor (proba Simonin) - Tehnica și interpretare',
        back: `**DETERMINAREA AGLUTININELOR (PROBA SIMONIN):**

**ERITROCITE TEST:**
Se folosește punând în contact serul de cercetat cu eritrocite test cunoscute de grupa O, A și B.

**METODĂ PE LAMĂ:**
- Pe o lamă se pun 3 picături din serul de cercetat
- Pe prima picătură de la marginea stângă se adaugă Er O
- Pe picătura din mijloc se adaugă Er A
- Pe cea din dreapta Er B
- Adaosul și amestecul pt fiecare picătură se face cu colțul unei lame, schimbându-se la fiecare picătură
- Citirea se face prin rotația lentă a lamei cu primul 2-3 min, cu ochiul liber

**INTERPRETAREA:**

- Determinarea se face punând în contact serul de cercetat cu eritrocitelor test cunoscute de grupa O, A și B

| Ser/Test | O | A | B |
|----------|---|---|---|
| O I      | O | ⊕ | ⊕ |
| A II     | O | O | ⊕ |
| B III    | O | ⊕ | O |
| AB IV    | O | O | O |

⊕ = Det. aglutinogenelor. Test Beth-Vincutt

**REGULI:**
- Reacția trebuie să fie negativă cu Er O pt toate cele 4 posibilități
- Aglutinare cu Er A și B = serul conține aglutinine anti-A și anti-B și aparține grupei **O**
- Aglutinarea cu Er B = serul conține aglutinine anti-B și aparține grupei **A**
- Aglutinarea cu Er A = serul conține aglutinine anti-A și aparține grupei **B**
- Nu apare aglutinare nici cu Er A nici cu Er B = serul nu conține aglutinine anti-A și anti-B și aparține grupei **AB**

Nu se admite determinarea grupei decât prin aplicarea obligatorie a celor 2 probe: Beth-Vincent și Simonin.

Când există un dubiu trebuie să se repete dg grupei, cu un alt lot de seruri hemotest și cu alte eritrocite test.`,
        mnemonic: 'Simonin: ser + Er test (O,A,B); verifica aglutinine; ambele probe obligatorii!',
      },
      {
        front: 'Sistemul Rh - Factorul Rh, determinare și importanță',
        back: `**SISTEMUL Rh:**

**Def:** Factorul Rh este un antigen specific de grupă sanguină prezent pe eritrocite omului și ale maimuței MACACCUS RHESUS:
- **Prezența factorului pe eritrocite** = indivizi Rh ⊕
- **Absența lui** = indivizi Rh ⊖

Factorul Rh nu e prezent la toți oamenii = **85% Rh ⊕** / **15% Rh ⊖**

**IMPORTANȚA FACTORULUI Rh:**

Apare deosebire de sistemul ABO, la care se găsesc în mod natural aglutininele α sau β, pt factorul Rh nu ∃ în mod spontan o aglutinine anti-Rh.

Anticorpii anti-Rh apar numai prin izoimunizare, în următoarele condiții:

1. Prin transfuzia de sânge Rh ⊕ individului Rh neg ⊖
2. Prin sarcină, când o mamă Rh ⊖ naște
3. Prin greifă timulare izologă

**DETERMINAREA PE LAMĂ A FACTORULUI Rh:**

**OBSERVAȚII:**
- Sângele de cercetat se recoltează din pulpa degetului
- Pe o lamă se pune o picătură mare de ser anti-Rh care se amestecă cu o picătură din sângele de cercetat, ne omogenizează cu colțul unei lame
- Pe o a doua lamă se repetă acum operațiile cu eritrocite cunoscute Rh ⊕ și Rh ⊖
- Lamele se arăsază într-o cutie PETRI, pe 2 baghete de sticlă. Pe fundul cutiei PETRI se află o hârție umedă cu apă, rezultând o cameră umidă care evită uscarea picăturilor de sânge.
- Totul se pune în termostat și reacția se citește după **1-2 ore la 37°C**

**INTERPRETAREA REZULTATELOR:**
- Dacă sângele de cercetat este aglutinant, este Rh ⊕
- Dacă nu este aglutinant, absența este Rh ⊖
- În picătura de control, eritrocite ⊕ pot ⊕ trebuie să fie aglutinate / ⊖ - nu trebuie să fie aglutinate`,
        mnemonic: 'Rh: 85% ⊕, 15% ⊖; anti-Rh doar prin izoimunizare; test 37°C, 1-2h',
      },
      {
        front: 'Reguli importante privind transfuzia de sânge și teste de compatibilitate',
        back: `**REGULI IMPORTANTE PRIVIND TRANSFUZIA DE SÂNGE:**

Trebuie să ne asigurăm că și compatibilitatea de grupă între primitor și donator:

1. **Determinarea grupei ABO și a factorului Rh (Δ)**
2. **Transfuzia se face obligatoriu izogrup**
3. **Cercetarea Ac iregulari în sângele primitorului este obligatorie** în următoarele situații:
   - Bolnavi Rh negativi
   - Femei multigeste sau multigeste
   - Bolnavi care au prezentat reacții după transfuzii anterioare
   - Bolnavi care cu primuit transfuze în trecut
   - Bolnavi la care se practică exsanguinotransfuzie sau circulația extracorporeală

**VERIFICARE COMPATIBILITATE:**

4. **Bolnavi Rh negativ primesc sânge Rh negativ**
5. **Efectuarea probei de compatibilității clasice cu ajutorul eritrocitelor preparate incubate** (preluării la **37°C să facult boicareului** cu ajutorul)
6. **Ultimul control obligatoriu la patul bolnavului** cu ajutorul următoarelor **sereurilor** hamoteste, să se facă înacurata înastălării perfuziei, a recenzilor hemotest, sau a sângelei din placeniul donori.

**TESTE DE COMPATIBILITATE:**

Testul Coombs e testul ideal pt compatibilității transfuziu-zională cuprinzând toți izoanticopii cu importanță clinică.

**A. Testul cu papaină:**
- Serul primitorilor - 3 picături
- Suspensie 5% din fiziologic de eritrocite de donatori - 3 picături
- Centrifugarea 1 min la 1000 rpm
- Se citeste aglutinarea

**B. Testul Coombs:**
- Serul primitorilor - 3 picături
- Suspensie 5% de eritrocite de donatori - 3 picături
- Incubate 30 min la 37°C
  1. Se spală de 3× cu ser fiziologic
  2. După ultima spălare se adaugă peste sedimentul eritrocit 2 picături de ser antiglobulinic cu aglutină mare și se omogenizează
  3. Se centrifughează 1 min la 1000 rpm
  4. Se a citeste aglutinarea

Orice transfuzie nouă trebuie să fie precedat de nrototesta de compatibilitate cu serul primitor a represtat după transfuzie anterioară și către dacă bolnavul a represtat îllre transfuze, să citeste sângele de la același donatori.`,
        mnemonic: 'Transfuzie: izogrup obligatoriu; Rh⊖→Rh⊖; teste: papaină + Coombs (37°C)',
      },
      {
        front: 'Testul rozetelor E și EAC - Principiu, tehnica și interpretare',
        back: `**DEFINIȚIE:**
Testul face parte din metodele de identificare celulară prin fenot

ipare imun este limitat la linia limfocitară.

**PRINCIPIU:**
Celulele B au receptori pt C3 și Fc a molec de Ac și pot forma rozete cu Er de oaie/berbec imbricate cu Ac boi (EA).

De asemenea pot forma rozete cu Er de oaie/berbec imbricate cu Ac și complement (EAC) și pot fi numărate la microscop (microscop).

**MATERIALE:**
- Eritrocite de berbec pe sol ALSEVER
- Eprubete cu heparină (100 U)
- Anemie ODISTON-FICOLL
- Sol HANKS
- Sol bicarbonat de Na 4,8%

**TEHNICA:**

**Preparare Er:**
- Er berbec se spală de 3× cu ser fiz. Se pregătește o suspensie 1% Er cu sol Hanks

**Preparare limfocite:**
- Limfocitele de bolnav recoltarea 3 ml sg pe heparină
- Limfocitelor se amestecă cu 3 ml de sg heparinizat cu 3m ser fiziologic și se pune cu 5 ml peste 3 ml anostec Odiston-Ficoll
- Se centrifughează 2000 rpm, 15 min, se obține un inel albicior de mononucleare la suprafață de separare. Se decantează supranatantul cu o pipetă până la nivelul albicior. Se culege stratul de limfocite cu 5 ml sol Hanks
- Se centrifughează din nou, 1000 rpm, 10 min
- Se decantează supranatantul prin turmare, se reia sedimentul în 2-3 pic sol Hanks

**ROZETARE:**
- Se pun 2-3 pic suspensie Er 1% pste 2-3 pic suspensie de limfocit
- Se incubează la 37°C, 10 min
- Se centrifug 1000 rpm, 5 min
- Se păstrează la frigider pesti magaztt
- Din sediment se face un preparat între lamă și lamelă

**EXAMINAREA MICROSCOPICĂ - cu obiectiv 40×:**

- **Rozetă** = limfocit care fixează cel puțin 3 Er
- Limfocitele libere se renumeză prin aspect albicior
- Se numără rozele și limfocitele libere - în total 100 elemente
- Rezultatul se exprimă în procente

**VN: 65-70% rozete E**

**DIAGNOSTICAREA:**
Lipsa de stabilitati a rozetelor (și deficit la centrifugare)

**Panciți:** T de rozeau - se practică în vederea separării sub pop. LT = 70-80% din Lf circulante, având sub control umul mecanisme imune mediate celular.

- Prin acest test se apreciază nr LT pe baza prop. acestea de a forma spontan rozete când sunt incubate la temp. joase, în prezența hematiilor de berbec

**Aplicații experimentale:**
- Leishmaniază
- Toxoplamoză
- Filatrioză`,
        mnemonic: 'Rozete E: limfocit + ≥3 Er berbec; VN 65-70%; T limfocite; 37°C apoi 4°C',
      },
    ],
  },
  {
    name: 'Biochimie - Practic',
    description: 'Subiecte practice pentru primariat biochimie',
    flashcards: [
      {
        front: 'Determinarea bilirubinei în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**

- **Bilirubină totală:** 0,2-1,3 mg/dl
- **Bilirubină neconjugată:** 0-1,1 mg/dl
- **Bilirubină conjugată:** 0-0,3 mg/dl
- **Bilirubină delta:** 0-0,4 mg/dl
- **Bilirubină neonatală:** 1-10,5 mg/dl

**IMPLICAȚII CLINICE:**

Prin degradarea Hb cu SRE → Bi prehematică (neconjugată) care este transportată de sânge (legată de albumină) la ficat unde este desfăcută de alburnină și conjugată cu enzima GLUCURONIL TRANSFERAZA → BD postphepathă (conjugată) care este excretată prin bilă în intestin unde este transformată cu STERCOBILINOGEN, din care o parte se elimină prin fecale și altă parte prin rinichi (urină) sub formă de UROBILINOGEN.

**Bilirubină directă** = bilirubină conjugată + bilirubină delta

**VALORI ↑ Bi:**
- Anemii hemolitice (↑ Bi până la 2-3 mg/dl)
- Anemii Biermer
- Icter neonatal (icter fiziologic, hemoragii, hematom, lipatiroidism, icter obstructiv)
- Infarct pulmonar hemoragic
- Ciroză
- Administrare de medicamente
- Defecte enzimatice cu caracter familial: b. Gilbert, sd Crigler-Najjar
- La premature și nou-născut

**BD** - este utilizată pentru evaluarea afecțiunilorilor ficat și ale fluidului

**VALORI ↑ BD:**
- Icter obstructiv (BD/Bi > 2) pentru:
  - Calculi biliari
  - Tumori
  - Paraziti
  - Neoplasm de cap de pancreas
  - Cauze hepatocelulare: hepatită, ciroză, stări neoplazice
  - Narcină extrauterina

**VALORI ↑ Bi și BD:**
- Ictere hepatocelulare (BT > 20 mg/dl, BD > 13i)
  - Hepatită malță
  - Ciroză
  - Metastaze hepatice
  - Mononucleoză infecțioasă
  - Limfoame
  - Invaj cardiacă dreaptă
  - Administrare de CLORPROMAZINA

**Recoltarea sg:** Fără anticoagulant, pe heparină

**Material biologic:** Ser HE mehemolizat, plasmă + heparină

**Conservare:**
- Temp. camerei: 4h
- Refrigerare: 1 naptămână
- Congelate: 6 luni

**Se va evita lumina solară directă asupra probei**`,
        mnemonic: 'Bi: 0.2-1.3 mg/dl; ↑Bi=hemoliză; ↑BD=obstructiv; BD/Bi>2=litiază/tumori',
      },
      {
        front: 'Metoda Jendrassik-Grof pentru determinarea bilirubinei - Principiu',
        back: `**METODA JENDRASSIK-GROF:**

**PRINCIPIU:**

**Pentru BD (pathopatică, conjugată):**
BD + acid sulfanilic diazotat → azopigment întruns colorat (azobilirubină) = **fotoetabutil**

(A cărui absorbție de lumină este proportională cu conc. de BD din ser)

**Formule:**
- **BT = BD + Bi**
- **Bi = BT - (Bi + BD)**
- **B delta = BT - (Bi + BD)**

Lₛ se determină după ados de cofeină-benzoat → care solubilizează Bi și care poate să reacționeze cu acidul sulfanilic diazotat → compus colorat (azopigment) fotometribil

**PENTRU TOTALUL (BT):**

Să Bi + reactorul diazo → iar absorbția de lumină este echivalentă cu concentrația de BT

**PENTRU Bi (neconjugată):**

Bi + reactorul diazo → jar absorbția de lumină este echivalentă cu concentrația de Bi reactionar cu n. diazo → un azopigment (azobliracbina) fotometribil`,
        mnemonic: 'Jendrassik-Grof: BD + diazo → azopigment; BT = BD + Bi; cofeină solubilizează Bi',
      },
      {
        front: 'Metode alternative pentru determinarea bilirubinei - Metanol, dimetil sulfoxid, climuiu uscată',
        back: `**METODA CU METANOL:**

**Principiu:**
Acidul sulfanilic (cu HCl) + NaNO₂ (nitrit de Na) → acid sulfanilic diazotat (n.diazo) + BD (conjugată, hidrosolubilă)

Dacă serul se tratează cu metanol, este posibilă și reacția Bi + reactoriul diazo → iar absorbția de lumină este echivalentă cu concentrația de BT

**METODA CU DIMETIL SULFOXID:**

**Principiu:**
Acid sulfanilic + Nitrit de Na → acid sulfanilic diazotat

În absența dimetilsulfoxidului numai BD reacționează pt a azobilirubină

În prezență dimetil sulfoxidului se det. BT doarce și Bi reacționare cu n. diazo → un azopigment (azobilirubina) fotometribil

**METODA CHIMIC USCATĂ PT BD și Bi:**

Bi (neconjugată, solubilă zeta de cofeina și benzoat de Na) cu stratului de imprantare → disociare din albumina → și migrare împreună cu BD către stratului de reactiv

Bid neconjugată și BiP conjugată cu absoluti diferit, respectiv:
- λ = 400 nm și λ = 460 nm

**METODA CLIMUIU USCATĂ PT DETERMINARE BT:**

Inițial diacizant Bil/urubina neconjugată de albumină →
→ B neconi, B conj, fractiunare delta (legată de albumină) + zone diacrivum → cremofori de azobilirubina (absorbția la λ=520nm) → conc BT și determina prin măsurarea cromofourier de azobiliurobina, printru-un report transparent la 2 lungimi de undă`,
        mnemonic: 'Metanol: BT total; Dimetil sulfoxid: BT cu DMSO; Uscată: λ=400nm (Bi), 460nm (BD)',
      },
      {
        front: 'Glucoza în LCR - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **VN = 50-70 mg % (2,78-3,89 mmol/l)**

**IMPLICAȚII CLINICE:**

**Glicorahia prezintă:**

**Valori ↑:**
- Encefalită
- Tumori cerebrale
- Diabet zaharat (Dz)

**Valori ↓:**
- Meningită TBC
- Meningită meningococică
- Meningită fungică
- Sindroame cu extindere meningeană
- Leucemie
- Hipoglicemie

**RECOLTAREA LCR:**
Nu poate face prin puncție:
- Lombară
- Suboccipitală
- Ventriculară

**METODE DE DETERMINARE:**
1. Metoda enzimică cu glucooxidază (GOD)
2. Varianta colorimetrică cu orto-toluidină
3. Metoda colorimetrică Haimes
4. Metoda colorimetrică Fehling`,
        mnemonic: 'VN: 50-70 mg/dl; ↓=meningită (TBC, fungică); ↑=tumori, Dz; Puncție: lombară/suboccipital',
      },
      {
        front: 'Cloruri în LCR - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **VN = 6,1-6,4 mmol/l**
- **VN = 118-132 mEq/l**
- **VN = 7,2-7,5 g %**

**IMPLICAȚII CLINICE:**

**Valori ↓ Cl:**
- Meningită TBC
- Ocluzie intestinală
- Glicemie febrile
- IC (insuficiență cardiacă)
- IR (insuficiență renală)
- Regim fără sare

**Valori ↑ Cl:**
- Tumori cerebrale
- Abcese cerebrale
- Melifita
- Poliurie
- Regim hiperclorurat

**METODE DE DETERMINARE:**
1. Metoda de titrare mercurimetrică (cu ioni de mercur Hg²⁺)
2. Metoda Volhard`,
        mnemonic: 'VN: 118-132 mEq/l sau 7.2-7.5 g%; ↓=meningită TBC; ↑=tumori cerebrale',
      },
      {
        front: 'Proteine în LCR - Determinare calitativă (Reacția Pandy)',
        back: `**I) DETERMINARE CALITATIVĂ - Reacția PANDY:**

**VN:** react NEGATIV

**IMPLICAȚII CLINICE:**

**Reacția negativă** NU exclude leziuni cerebrale (encefalită, encefalită, leucemie, tumori cerebrale) deoarece concentrația de albumină din LCR poate să fie normală

**Reacția pozitivă în:**
- Meningită
- Afloză
- Pneumonie
- Tumori ale măduvei spinării
- Paralizie progresivă

**PRINCIPIU:**
- Concentrația ↑ de proteine din LCR precipită cu soluția naturel de fenol
- Reacția se citește pe fond întunecate

**INTERPRETARE:**
- Negativ = limpid clar
- Olig pozitiv (opalescent slab) = +/-
- Pozitiv (+)
- Pozitiv (++)
- Pozitiv (+++)
- Pozitiv (++++) = precipitat

**METODA HELLER:**
Albuminile runt precipitate de acid nitric-nitros`,
        mnemonic: 'Pandy: proteine LCR + fenol → precipitat; VN=negativ; pozitiv=meningită, tumori',
      },
      {
        front: 'Proteine în LCR - Determinare cantitativă',
        back: `**II) DETERMINARE CANTITATIVĂ:**

**VN < 0,6 g ‰**

**IMPLICAȚII CLINICE:**

**Valori ↑ proteine în LCR:**
- Meningită
- Meningoencefalită
- Tumori extramedulare
- Hemoragii meningoare
- Infecții și intoxicații grave

**CONSERVAREA MATERIALULUI BIOLOGIC:**
- Temp. camerei: 4 ore
- Refrigerare: 3 zile
- Congelate: -20°C → 6 luni
           -70°C → indefinit

**METODE DE DETERMINARE:**

**1) Metoda biuretului:**
**Pp:** Proteinele runt precipitate cu acid tricloroaceitic după care precipitatul este dizolvat cu reactiv biuret și rezultată oxid cupros rosu-cărămiziu

**2) Metoda chimie uscată:**
- Proteinele (LCR) formează cu complex cu ionul de Cu → disocierea ionului cupric din complexul colorat cupro-azo
- Reducerea complexului cupro-azo este măsurată spectrofotometric (670 nm) și este prop. cu conc de-tox de proteine din probe (echivalentul de concentrat)`,
        mnemonic: 'VN<0.6 g‰; ↑=meningită, tumori; Metode: biuret, chimie uscată (Cu²⁺)',
      },
      {
        front: 'Determinarea glicemiei - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**

**Metoda cu glucooxidază (chimie umidă):**
- **70-105 mg/dl** (sânge total) → 3,9-5,8 mmol/l
- **75-115 mg/dl** (ser, plasmă) → 4,1-5,9 mmol/l

**Metoda cu orto-toluidină:**
- 65-110 mg/dl → 3,6-6,1 mmol/l

**Metoda cu hexokinază:**
- 65-110 mg/dl → 3,6-6,1 mmol/l

**Chimie uscată:**
- 65-115 mg/dl

**IMPLICAȚII CLINICE:**

**Hiperglicemiant cu participarea unui hormon:**

**(1) Glucagonului:** sintetizat la nivelul celulelor α pancreatice ale insulelor Langerhans
- Hiperglicemiant prin:
  - Accelerarea degradării hepatice a glicogenului
  - Stimularea gluconeogenezei

**(2) ACTH-ului:** glucocorticoizi, catecolamine, β-tiroxidezi

**(3) Lipoglicemiant cu participarea insulinei:**
- Sintetizată la nivelul celulelor β-pancreatice ale insulelor Langerhans
- Acțiune: fixare și receptori, suprafața celulelor → deschiderea canalelor pt glucoză (↑ permeabilitatea membranei celulare pt glucoză)
- Stimularea transportului intracelular de glucoză
- Unde este utilizată în scop energetic sau sinteza de glicogen
- Scăderea nivelului sanguin al glucozei

**VALORI ↑ ale glicemiei:**
- DZ insulino-dependent Tip I
- DZ neinsulino-dependent Tip II
- Perfuzie cu glucoză
- Administrare de contraceptive și diuretice
- Tumori (adenom pancreatic hipersecretant de glucagon, adenom pituitar hipersecretant de STH, feocromocitom, tumori SU)
- Hipertiroidism
- Administrare catecolamine
- Postprandial
- Semiții (↑ conț. dol)
- Sd. Cushing (exces de corticoizi)
- Accidente cerebrovasculare
- IMA
- IR (imuf. renală)
- Neoplasm de pancreas

**VALORI ↓ ale glicemiei:**
- Insulinom (nu produce insulină în exces)
- Malnutriție
- După administrare de doze mari de insulină și betablocante
- Malarie (parazitul consumă glucoză)
- Insuficiență hipofizară
- Insuficiență tiroidiană
- Insuficiență corticosuprarenală
- Insuficiență hepatică (incapacitatea ficatului de a elibera glucoză prin glicogenoliză)`,
        mnemonic: 'VN: 70-105 mg/dl (total), 75-115 mg/dl (ser); ↑=DZ, tumori, Cushing; ↓=insulinom, malnutriție',
      },
      {
        front: 'Determinarea glicemiei - Metode enzimatice (Glucooxidază chimie umidă și uscată)',
        back: `**I) METODE ENZIMATICE:**

**1) Metoda cu GLUCOOXIDAZĂ - chimie umidă:**

**Pp:** Glucooxidaza (GOD) oxidează glucoza la acid gluconic și apă oxigenată (H₂O₂); H₂O₂ în prezența peroxidazei reacționează cu 4-aminoantipirina și fenol → un compus colorat (CHINONIMINĂ) fotometrabil la 436 nm sau 505 nm

**Reacția:**
GLUCOZĂ + O₂ --GOD--> ACID GLUCONIC + H₂O₂ (apă oxigenată sau peroxid de hidrogen)

H₂O₂ + 4-amino ANTIPIRINA + FENOL --POD--> CHINONIMINĂ

Deproteinizarea se face în carul serului/plasmei medare (3 haustipa), utilizând zg. Integrat

**2) Metoda cu GLUCOOXIDAZĂ - chimie uscată:**

**Pp:** Glucoza din ser este oxidată → ACID GLUCONIC și H₂O₂ (peroxid de hidrogen), reacție fiind catalizată de GLUCOOXIDAZA

Această reacție este urmată de o cuplare oxidativă catalizată de peroxidaza în prezența precursorilor unui colorant → formarea unui compus colorat roșu, intensitatea fiind măsurată la 540 nm`,
        mnemonic: 'GOD: glucoză + O₂ → acid gluconic + H₂O₂; H₂O₂ + 4-AA + fenol → chinonimină (436/505nm)',
      },
      {
        front: 'Determinarea glicemiei - Metoda cu Hexokinază',
        back: `**3) Metoda cu HEXOKINAZĂ cu sau fără deproteinizare:**

**Pp:** Hexokinarea (în prezența ATP) acționează asupra glucozei cu formare de glucoză-6-fosfat, care sub acțiunea glucozei-6-fosfat dehidrogenazei (în prezența de NADP) formează 6-fosfo-gluco-nat și NADPH a cărui absorbantă se măsoară la 334 mm.

**Reacția:**
- 340 mm sau 365 mm - lungimea de undă este echivalentă cu cantitatea de glucoză introdusă în reacție`,
        mnemonic: 'Hexokinază: glucoză + ATP → G-6-P; G-6-P + NADP → 6-fosfo-gluconat + NADPH (λ=334nm)',
      },
      {
        front: 'Determinarea glicemiei - Metode neenzimatice',
        back: `**II) METODE NEENZIMATICE:**

**1) Metoda colorimetrică cu ORTO-TOLUIDINĂ:**

**Pp:** Hexozele (glucoza) prin încălzire în mediu acid formează derivați FURFUROLICI care se condensează cu diverse substanțe (aniline ciclice = orto-toluidină) formând compuși colorați (verzi-albastru) care se fotometrează la 630 nm, intensitatea culorii fiind proporțională cu conc. de glucoză

**2) Metoda cu ANTRONĂ:**

**Pp:** Glucoza este deshidratată cu acid sulfuric → HIDROXIMETIL-FURFUROL care formează cu ANTRONĂ un complex colorat a cărui absorbantă se citește la 620 μm

**3) Metoda NELSON (nespecifică):**

**Pp:** Glucoza reduce ionul cupros (în mediu alcalin la cald) care la rândul lui reduce reactivul arsenomolibdic și formează un complex de culoare albastră fotometrabil la 740 nm

**4) Metoda Creallus (orientativă):**

**Pp:** Se bazează pe capacitatea glucozei de a reduce ACIDUL PICRIC la ACID PICRAMIC (roșu cărămiziu) în mediu alcalin, citirea făcându-se la aparatul CRESELIUS

**5) Metoda titrimetrică HAGEDORN-JENSEN (nespecifică):**

**Pp:** Glucoza din sânge (deproteinizată prin încălzire cu NaOH și Sulfat de Zn) reduce FERICIANIURA DE POTASIU la FEROCIANIURĂ de potasiu care se precipită cu sulfat de zinc; excesul de fericianiură de potasiu va reacționa cu iodura de potasiu (în mediu acid) eliberând iodul care va fi titrat titrat cu o soluție de tiosulfat de sodiu până la dispariția culorii albastru`,
        mnemonic: 'Orto-toluidină: hexoze+acid→furfurol (630nm); Nelson: reduce Cu²⁺; Hagedorn: titrimetric',
      },
      {
        front: 'Testul standard de toleranță la glucoză (OGTT) - Procedură și interpretare',
        back: `**TESTUL STANDARD DE TOLERANȚĂ LA GLUCOZĂ:**

**VN < 140 mg %**

**PROTOCUL:**

**La 90 min** → este apropriată de valoarea de la momentul zero

**La 30 min** → valoarea cea mai mare (detruite faptului care se absorbe intestinal, apoi ajunge în sânge)

**La 60 min** → devenești (datorită secreției de insulină)

**La 120 min** → revenire la normal

**Clinic:**
- La 2h → nu valoarea de plecare (datorită secretiei de insulină)

**Nu efectuarea** diminuată pe nemâncate în acele cazuri suspecte de Dz

**Testul declară Dz când:**
- Valoarea glicemiei >140 mg %, iar la 2h nu revine la normal
- Valoarea glicemiei la 60 și 30 min crește ↑ la fel ca și la 30 min

**Recoltarea sg:**
- 1 ml sânge pe 0,01 g fluorură de sodiu (NaF) sau
- Sânge fără anticoagulant

**Material biologic:**
- Plasmă sau ser (nehemolizat)
- Plasmă - se obține prin centrifugare sg timp de 5 min la 3000 rpm
- Serul - nu lăsă la temperătutră pt coagulare sg

**Principiul det:**
Consta în determinarea glicemiei atât înainte cât și după administrarea pe cale orală a unei doze de glucoză de 1g/kg, ajustată corespunzător cu aproximativ 500 mil de apă

**CONSERVARE:**
- Temp. camerei: 4 ore (la 4°C - 5 zile)
- Sânge total deproteinizat: la 4°C - 5 zile
- Congelate: -20°C → 6 luni, -70°C → indefinit`,
        mnemonic: 'OGTT: VN<140 mg%; 30min=max; 120min=normal; >140 la 2h=DZ; Material: NaF sau ser',
      },
      {
        front: 'Determinarea ureei în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **VN în ser = 15-42 mg/dl**
- **VN = 2,5-7 mmol/l**

**IMPLICAȚII CLINICE:**

Ureea este produsul final excrețor al catabolismului protelic, sintetizată în ficat și eliminată de rinichi prin urină.

Determinarea ureei evaluează producția (la nivelul ficatului) și excreția de uree (pt de filtrare glomerulară).

Fotusul simplu dozare a ureei în urină (măsoarbă de alt dosar) nu are semnificație clinică; eliminarea ei variază în fct de regimul alimentar.

**VALORI ↑ ale ureei în ser:**
- Aport proteic crescut
- Catabolism proteic crescut (afecțiuni infecțioase febrite, tumori, hemoragii post arsure)
- Tratament cu tetraciclene, citostațice, corticosteroizi
- Inadiure
- Boli renale ac. și cr.
- IMA (necroză tubulară)
- Deshidratare
- Diabet
- Hemoragic gastrointestinală

**VALORI ↓ ale ureei în ser:**
- Afecțiuni hepatice (hepatită acută sau cronică, ciroză, atrofie galbenă a ficatului, necroză hepatică)
- Ad. microbic
- Administrare de lichide intravenoare (hemodiluție)
- Narcină
- Perioada de creștere, b. celiacă (malabsorbtie)

**RECOLTAREA SÂNGELUI:**
- Fără anticoagulant
- Cu anticoagulant (heparină sau EDTA)
- Nu se utilizează anticoagulante ce conțin fluorură sau ioni de amoniu

**MATERIAL BIOLOGIC:**
- Ser nehemolizat
- Plasmă

**CONSERVARE:**
- 3 zile la 4°C`,
        mnemonic: 'VN: 15-42 mg/dl; ↑=IR, catabolism proteic, deshidratare; ↓=hepatită, ciroză',
      },
      {
        front: 'Determinarea ureei - Metode enzimatice',
        back: `**I) METODE ENZIMATICE:**

**1) Metoda enzimației cinețică cu UV:**

**Pp:** Ureaza în prezența H₂O descompune UREEA → CO₂ + NH₃ (amoniac)

NH₃ + OXOGLUTARAT + NADH --în prezența--> L-GLUTAMAT + NAD
                              GLUTAMAT
                              DEHIDROGENAZĂ

λ = 340 nm

**2) Metoda colorimetrică cu ureaza:**

**Pp:**
UREEA --UREAZA--> CO₂ + NH₃

NH₃ + fenol + hipoclorit de Na → p-chinonclonimina + fenol
→ INDOFENOL (culoare albastră), fotometrabil

**3) Metoda Friedlander:**

**Pp:** Ureea din sângele deproteinizat se titrează cu o soluție de clorură mercurica (HgCl₂) → complex stabil care nu se descompune în prezența de carbonat de Na (Na₂CO₃)

Excesul de HgCl₂ participă la uree + Na₂CO₃ → colorant basic de mercur → precipitat galben tern

**4) Metoda colorimetrică cu diacetilmonoxima:**

**Pp:**
UREEA (ser) + DIACETILMONOXIMA --mediu acid--> complex colorat ROȘU fotometrabil
                                 TIOSEMICARBAZIDEI    λ = 525 nm

**5) Metoda gravimetrică cu XANTHHYDROL:**

**Pp:**
UREEA + XANTHHYDROL --mediu acid--> DIXANTHYLUREE (G > 7x decât a UREEI) gravitate

**6) Metoda giovaninska KOWARSKI:**

**Pp:** UREEA este descompusă de hipobromitul de Na în mediu alcalin →
CO₂ + H₂O + N (azot)`,
        mnemonic: 'Ureaza: UREEA → CO₂ + NH₃; Indofenol (albastru); UV: λ=340nm; Diacetil: roșu λ=525nm',
      },
      {
        front: 'Determinarea creatininei în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE - metoda Jaffe:**
- **Femei:** < 1,1 mg/dl
- **Bărbați:** < 50 ani: < 1,3 mg/dl
- **Bărbați:** >50 ani: < 1,4 mg/dl
- **M-m:** < 1,3 mg/dl

**Chimie uscată:**
- **Femei:** 0,7-1,2 mg/dl
- **Bărbați:** 0,8-1,5 mg/dl

**IMPLICAȚII CLINICE:**

Creatinina este produsul de excreție al creatinei și este sintetizată prin degradarea fosfocreatinei musculare și eliminată pe cale renală.

Creatinina este dependentă doar de masa musculară. Dieta nu diverse afectează nesemnificativ det. creatininei, în schimb, efortul fizic exacurat determină ↑ nesemnificativ.

Determinarea creatininei oferă date asupra fct renale (ca urmare în mod direct despre filtrarea glomerulară).

Dacă ↑ a disfunctie renală → afectate excreția creatininei

Clearance-ul creatininei se modifică doar în afecțiunea ↑ 50% mg/om

**VALORI ↑ creatininei serice:**
- IRA
- IRC (↓ fct renală <50%)
- Hipertiroidism
- Acidoză diabetică
- Poliomozită
- Distrofii musculare
- Miastenii
- Dermatomozite
- Acromegalie
- IC (imuf cardiacă)
- Afecțiuni hepatice
- Hemoragii gastro-intestinale

**VALORI ↓ creatininei serice:**
- Malnutriție
- Miopații
- Hemodiliutie

**RECOLTAREA sg:** fără anticoagulant sau pe heparină Li, Na

**MATERIAL BIOLOGIC:** ser nehemolizat sau plasmă heparinată

**CONSERVARE:**
- La temp. camerei: 5 zile
- Refrigerare: 1 lună
- Congelate: peste 30 de zile`,
        mnemonic: 'VN<1.3 mg/dl; ↑=IR (clearance ↓>50%), acidoză diabetică; ↓=malnutriție, miopații',
      },
      {
        front: 'Determinarea creatininei - Metode de laborator',
        back: `**METODE DE DETERMINARE:**

**1) Metoda enzimația:**

Sub acțiunea CREATININAZEI, CREATININA → CREATINĂ

CREATINĂ + ATP + CREATIN KINAZA → CREATINFOSFAT + ADP

ADP + FOSFOENOL PIRUVAT --PIRUVAT KINAZEI--> ATP + PIRUVAT

PIRUVAT + NADPH₂ --LACTAT DEHIDROGENAZEI (LDH)--> L-LACTAT + NAD

NADPH₂ = λ = 340 nm - direct prop. cu conc. creatininei

**2) Metoda colorimetrică JAFFE cu acid picric:**

**Pp:** Creatinina din ser reduce în mediu alcalin acid picric la acid picramic (galben-portocaliu, fotometrabil λ = 530 μm)

**CLEARENCE-ul de creatinină:**

**Rolul:** det. nitera de filtrare glomerulară, creatinina este filtrată de glomeric, dar nu este reabsorbită la nivel tubular

**Calcul:**

\`\`\`
         CREATININĂ URINARĂ × vol urină/24 h
    = ─────────────────────────────────────────
      CREATININĂ PLASMĂTICĂ × 1440
\`\`\`

1440 = nr minute în 24 h
VN = 95-150 ml/min

**3) Metoda colorimetrică (det. creatininei totale):**

**Pp:** Creatinina este distribuită uniform de strated de împrăștiere în strated de reacție unde este hidrolizată la creatină care va fi transformată de către creațin aminohidrolază în UREE + SARCOZINĂ

SARCOZINA este oxidată --SARCOZIN OXIDAZEI--> GLICINĂ + FORMALDEHIDĂ + PEROXID DE HIDROGEN

PEROXID DE HIDROGEN oxideaza un colorant LEUCO → compus colorat λ = 670 μm

**4) Metoda colorimetrică (det. creatininei totale):**

**Pp:** Creatina din ser prin încălzire în prezența HU trece în creatinină totală, iar diferința dintre creatinină totală și cea dorută după valoarea creatinei serice`,
        mnemonic: 'Jaffe: creatinină + acid picric (alcalin) → picramic (galben λ=530nm); Clearance: VN=95-150 ml/min',
      },
      {
        front: 'Determinarea acidului uric în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **♀** 12-34 ani: 2,5-6,2 mg/dl
- **♀** 35-44 ani: 2,5-7 μg/dl
- **♀** >44 ani: 2,5-7,5 μg/dl
- **♂** 3,5-8,5 mg/dl

**IMPLICAȚII CLINICE:**

Acidul uric este rezultatul final al catabolismului bazelor purinice (ADENINĂ, GUANINĂ) din acțiul nucleice.

**Dat acidului uric înmând sau drept său:**
- Excluarea gutei
- Managementul eclampției (ac. uric reflectă extinderea afectării hepatice)
- Leucemie (↑ ac uric în se deoarece ↑ o productiv și o degradare a unei celule)
- Insuficiență renală (încuună ↑ deoarece sumul bruit a incapabil să elimine ac. uric)

**VALORI ↑ (1) prin catabolism ↑ al nucleoproteinelor:**
- Alimentație bogată în purine
- Alimentație hipoalorică, hipolipidică
- Leucemii și limfoame
- Mielom multiplu
- Psoriază
- Hemoglobinopații
- Policitemia
- Intoxicație cu Pb și Hg (mercur)
- Chimioterapia și radioterapia
- Obezitate
- Cetoacidoză diabetică
- Alcoolism
- Arsuri severe

**VALORI ↑ (2) prin defect de eliminare:**
- Insuf. renală cronică (IRC)
- Leziuni tubulare distale
- Decompenare cardiacă
- Alcoolism
- Adm. diuretice
- Acidoză lactică
- Adenom de prostată

**VALORI ↑ (3) tulburări în metabolismul purinice:**
- Guta

**VALORI ↓:**
- Hemodiluție
- Defecte enzimatice (defect de xantinoxidază)
- Administrare de medicamente uricosurice (PROBENECID, ALOPURINOL, STEROIZI)
- Les. tubulară proximală
- Sd. FANCONI
- Necrose hepatică
- B. Wilson

**RECOLTAREA sg:** fără anticoagulant sau pe heparină Li, Na

**MATERIAL BIOLOGIC:** ser nehemolizat sau plasmă heparinată

**CONSERVARE:**
- La temp. camerei: 3 zile
- Refrigerare: 5 zile
- Congelate: 6 luni`,
        mnemonic: 'VN: ♂ 3.5-8.5 mg/dl, ♀ 2.5-7 mg/dl; ↑=gută, leucemie, IRC; ↓=defect xantinoxidază, Wilson',
      },
      {
        front: 'Determinarea acidului uric - Metode de laborator',
        back: `**METODE DE DETERMINARE:**

**1) Metoda colorimetrică HEIL MEYER:**

**Pp:** Acidul uric din ser reduce acidul fosfowolframic (în mediu alcalin) la albastru de wolfram; intensitatea culorii fiind proporționată cu conc de acid uric din ser

**2) Metoda enzimației:**

**Pp:**
Acidul uric --URICAZEI--> ALANTOINĂ + CO₂ + H₂O₂ (apă oxigenată)

H₂O₂ sub acțiunea PEROXIDAZEI realizează 2 oxidări și → un compus de culoare roșu-violet

H₂O₂ - oxidează → acid 3,5 dicloro - 2 hidroxibenzen sulfonic
O₂clean → 4- amino fenazină

**3) Metoda colorimetrică (acid uric din ser formează liganți cu ioni metalici, ionul feric este redus în ion feros care se evidențiază prin reacția de culoare cu ortofenantrolină):**

**Pp:** Acidul uric din ser formează liganți cu ioni metalici, ionul feric este redus în ion feros care se evidențiază prin reacția de culoare cu ortofenantrolină

**4) Metoda chimie uscată:**

**Pp:** Acid uric din ser este oxidat în prezența URICAZEI cu formare de ALANTOIDĂ și PEROXID DE HIDROGEN

PEROXIDUL DE HIDROGEN + colorant leuco → compus colorat care se măsoară prin spectrofotometrie de reflexe`,
        mnemonic: 'Uricază: ac. uric → alantoimă + CO₂ + H₂O₂; Heil Meyer: reduce acid fosfowolframic (albastru)',
      },
      {
        front: 'Determinarea amoniacului în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **60-180 μg** azot amoniacal/dl
- sau **10-70 μg NH₃ /100 ml**

**IMPLICAȚII CLINICE:**

În lichidele biologice amoniacul se găsește sub forma ionizată (NH₄⁺) și neionizată (NH₃), existând echilibru între cele 2 forme.

Amoniacul rezultă din degradarea produși azotați:
- Proteine, AA (aminoacizi)
- Baze purinice și pirimidinice

NH₃ - este substanță foarte toxică, mai ales pt SNC
- Simptomele intoxicației cu NH₃: tremor, vorbire neclară, vedere difuză → coma, moarte

- În organism mecanism de neutralizare a NH₃:
  - (a) Formarea glutaminei (pt refolosirea NH₃)
  - (b) Formarea ureei (pt eliminarea NH₃) prin ciclul ureogenezei Krebs-Hensleit

**VALORI ↑ - amonalie congentale prin afectarea unui enzimelor implicate în ciclul ureogenezei (deficit de carbamul fosfat sinteza sau ornitsină carbamul transfoază):**
- Hemoragii digestive
- Afecțiuni hepatice - ciroză în stadii terciuturală
  - comă hepatică
  - hepatită ac și cr
  - ciroza porto-cave
- Afecțiuni cardiacă: IC dreaptă sau globală
- Afecțiuni neuro-patrice: convulsii, epilepsie

**MATERIAL BIOLOGIC:**
Plasmă rezultată din sg recoltat pe heparină, fără hemoliza (în ser hemolizat → nivel ↑ de NH₃)

Rămânând sțabil timp de 3 ore de la rod. recoltare; la temp ↓ (4°C) dar după 7 au de la recoltare NH₃ ↑ considerabil

**PRINCIPIU:**
NH₃ + 2-oxoglutarat + NADH₂ → GLUTAMAT + NAD+
                                 GAH = glutamat dehidrogenaza

λ = 340 nm

**1) Metoda colorimetrică clasică BERTHELOT (microdifuziune):**

**Pp:** Amoniacul din probă este eliberat de un alcaol și captat într-un dispozitiv special de microdifuziune;

NH₃ captat este combinat apoi cu:
- În mediu alcalin: FENOLAT de Na
                    HIPOCLORIT DE NA
                    NITROPRUSIAT DE NA
→ formază → produs de culoare albastră fotometrabil`,
        mnemonic: 'VN: 60-180 μg/dl; ↑=ciroză, comă hepatică, hemoragii digestive; NH₃ toxic pt SNC',
      },
      {
        front: 'Determinarea lipidelor totale în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **VN = 500-800 mg/dl**

**IMPLICAȚII CLINICE:**

**VALORI ↑ (Hiperlipiemii):**
- Aport crescut: alientă crescută (ficăt)
- Degradare deficitară + utilizare scăzută (la nivelul tesuturilor)
- Eliminare deficitară
- Tratament cu contraceptionale orale
- Hipotiroidism
- Acromegalie
- Hipercorticism
- Diabet zaharat
- IRC

**VALORI ↓ (Lipolipiemie):**
- Desnutriție
- Ciroză
- Hipertiroidism
- Acar toxicoză

**RECOLTAREA SÂNGELUI:**
- Cu sau fără anticoagulant

**MATERIAL BIOLOGIC:**
- Ser, plasmă

**METODE DE DETERMINARE:**

**1) Metoda colorimetrică:**

**Pp:** Acizii grași din componența lipidelor serice sunt esterificați și eliberați cu acid sulfuric (H₂SO₄) la cald → un compus colorat violet cu reactivul vanilină-fosfat monopotasic. Intensitatea culorii este proporțională cu conc. de lipide din ser (530 nm)

**2) Metoda turbidimetrică:**

**Pp:** Lipidele din-run ser deproteinizat cu alcool izopropilic formează cu acidul tricloacetic 10% o turbiditate care este direct prop. cu conc. de lipide din ser

**3) Metoda gravimetrică:**

**Pp:** Lipidele totale din sânge sunt extrase cu un amestec de solvent, apoi se evaporă solventul și se cântărește rezidual care scapă. Lipidele din ser.`,
        mnemonic: 'VN: 500-800 mg/dl; ↑=hipotiroidism, DZ, IRC; ↓=desnutriție, hipertiroidism, ciroză',
      },
      {
        front: 'Determinarea colesterolului total în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **< 29 ani:** < 200 mg/dl sau < 5,15 mmol/l
- **30-39 ani:** < 225 mg/dl < 5,80
- **40-49 ani:** < 225 mg/dl < 6,35
- **> 50 ani:** < 265 mg/dl < 6,85

**IMPLICAȚII CLINICE:**

Clinic scopul det. valorii colesterolului:
- Declarea tulburările fct tiroidei
- Declarea tulburările lipidelor sanguine
- Declarea tulb. fct hepatice
- Declarea riscului de ATS și boli coronariene

Colestrolul este prezent în membranele celulare (compune esențial), în mușchi, în eritrocite, în stratul exterior al proferinelor plasmatice nu formă de colesterol sau ester ai colesterolului.

Colestrolul est precursor pt b. sexuale, adreneliznă, acizi biliari, vitamina D.

**VALORI ↑ colesterol:**
- Hipercolestrolemiîle ereditare II, III, V (se adaugă și creșterea trigliceridelor, fosfolipidelor și a β-lipoproteinelor)
- Hipuncolestrolemiîle secundare:
  - Aport alimentar crescut
  - Hipotiroidism
  - Ateroclerozâ
  - Ictre mecanic
  - Ciroză biliară primară
  - Colostază
  - Dz (diabet zaharat)
  - SN (sd. nefrotic)
  - Alcoolism
  - Narcină

**VALORI ↓ colesterol:**
- Hipertiroidism
- Aport alimentar ↓ de colesterol, acizi grași nesaturați și saturați
- CH (ciroză hepatică)
- Tratament lipurăducant
- Hipoalfalipoproteinemie
- Anemii severe

**RECOLTAREA sg:** fără anticoagulant sau cu anticoagulant (heparină)

**MATERIAL BIOLOGIC:** ser nehemolizat sau plasmă heparinată

**CONSERVARE:**
- Temp. camerei: 7 zile
- Refrigerare: 7 zile
- Congelate: 3 luni`,
        mnemonic: 'VN<200 mg/dl (<29ani); ↑=hipotiroidism, DZ, ateroscleroză, SN; ↓=hipertiroidism, malnutriție',
      },
      {
        front: 'Determinarea colesterolului - Metode enzimații și colorimetrice',
        back: `**METODE DE DETERMINARE:**

**1) Metoda enzimației colorimetrică:**

**Pp:**
Colesterol esterificat + H₂O --COLESTEROL ESTERAZĂ--> COLESTEROL + AG (acizi grași)

COLESTEROL + O₂ --se oxidat de COLESTEROL OXIDAZĂ--> Δ-4-COLESTEN ONA + H₂O₂

H₂O₂ (peroxid de hidrogen) + FENOL + 4-AMINO ANTIPIRINA --în prezența PEROXIDAZEI--> un produs roșu de CHINONA + 4 H₂O

λ = 505 nm ~ conc de colesterol

**2) Metoda chimie uscată:**

**Pp:** Există un surfactant în stratul de împrăștiere, care ajută la disocierea colesterului și a esterilor de colesterol. Hidroliza esterelor de colesterol este catalizată de colesterol hidrolază → colesterol liber care urmează aceeași reacție ca la metoda enzimația-colorimetrică

În final H₂O₂ oxidează un colorant leuco sub acțiunea peroxidazei → un compus colorat cu lungimea de undă λ = 540 nm

**3) Metoda colorimetrică RATTON (RAITION):**

**Pp:** Colesterolul liber și cel rezultat din complexele lipoproteine formează cu anhidrida acetică și acidul sulfuric concentrat compuși inteuse colorați în verde care se fotometrează, intensitatea culorii fiind prop. cu conc. de colesterol din probă

**4) Metoda colorimetrică Watson:**

**Pp:** Colesterolul în prezența de anhidrida acetică și a acidului sulfuric concentrat → compus colorat stabilizat cu acid 2,5 dimetil benzen sulfonic

**5) Metoda colorimetrică Zlatkis-Zak-Boyle:**

**Pp:** Colesterolul dă o reacție de culoare roză cu clorura ferică în prezența acidului sulfuric concentrat și a acidului acetic glacial`,
        mnemonic: 'Enzimația: colesterol + O₂ → Δ-4-colestenona + H₂O₂; H₂O₂ + fenol + 4-AA → chinona (λ=505nm)',
      },
      {
        front: 'Determinarea trigliceridelor serice - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **Metoda colorimetrică:** 60-140 mg/dl sau 0,45-1,6 mmol/l
- **Metoda enzimații:** < 200 mg/dl < 2,3 mmol/l

**IMPLICAȚII CLINICE:**

Trigliceridele sunt (după) disponibile în țesutul adipos sub formă de glicerol, acizi grasi și monogliceride care pot fi oxidate și reconvertite în trigliceride (care au ± 95% din lipidele de depozit).

Det. TGL are drept scop evaluarea:
- Capacității organismului de a metaboliza lipidele
- Riscului de boală aterosclerotică
- Fct tiroidei

**VALORI ↑ ale TGL:**
- Nerespectare postului de 12 h. Înainte de recoltare
- Aport ↑ de grăsimi
- Tratament cu contraceptive orale, estrogeni, corticoli, diuretice
- Narcină
- Hipotiroidism
- IMA
- SN (sd nefrotic)
- Hepatită
- Icter obstructiv
- Obezitate
- Hiperlipo preteinemii ereditare (exceptând tipul Ia)

**VALORI ↓ TGL:**
- Hipertiroidism
- Alimentație scracă în grăsimi
- Inanițiv
- Medicamente hipolipemiante

**RECOLTAREA sg:** fără anticoagulant sau cu anticoagulant (heparină sau EDTA)

**MATERIAL BIOLOGIC:** ser nehemolizat sau plasmă

**CONSERVARE:**
- Temp. camerei: 3 zile
- Refrigerare: 7 zile
- Congelate: 6 luni; fără congelări repetate`,
        mnemonic: 'VN: 60-140 mg/dl; ↑=hipotiroidism, IMA, SN, DZ, obezitate; ↓=hipertiroidism, inanițiv',
      },
      {
        front: 'Determinarea trigliceridelor - Metode enzimații',
        back: `**METODE DE DETERMINARE:**

**1) Metoda enzimații cu LPL, GK, GPO, PAO:**

**Reacții:**

1) TGL + H₂O --LPL--> GLICEROL + AC. GRAȘI

2) GLICEROL + ATP --GK--> GLICEROL 3-FOSFAT + ADP

3) GLICEROL-3-FOSFAT + O₂ --GPO--> DIHIDROXI ACETON FOSFAT + H₂O₂

4) 2 H₂O₂ + 4-AMINO ANTIPIRINA + 4 CLORFENOL --PAO--> DERIVAT ROȘU DE CHINONA + H₂O

λ = 505 nm - intensitatea culorii este prop. cu conc. totală de trigliceride din ser

**Abrevieri:**
- TGL = trigliceride
- LPL = lipoprotein lipază
- GK = glicerol kinază
- GPO = glicerol-3-fosfatoxidază
- PAO = peroxidază

**2) Metoda enzimații cu LPL, GK, PK și LDH:**

**Reacții:**

1) TGL + H₂O --LPL--> GLICEROL + ACIZI GRAȘI

2) GLICEROL + ATP --GK--> GLICEROL-3-FOSFAT + ADP

3) ADP + FOSFOENOL PIRUVAT --PK--> PIRUVAT + ATP

4) PIRUVAT + NADH₂ --LDH--> LACTAT + NAD+

λ ~ mop cu conc TGL - este fotometrabil

**Abrevieri:**
- PK = piruvat kinaza
- LDH = lactat dehidrogenază`,
        mnemonic: 'LPL: TGL → glicerol + AG; GK: glicerol + ATP → G-3-P; GPO: G-3-P → H₂O₂; λ=505nm',
      },
      {
        front: 'Tipuri de hiperlipidemii - Clasificare Fredrickson',
        back: `**EVALUAREA VALORILOR PATOLOGICE ALE TGL:**

**Comparații între tipurile clasice de hiperlipoproteinemie:**

**TIP I: HIPERLIPIDEMIE EXOGENĂ** - datorită deficității de LPL
- Colesterol serice: N sau usor ↑
- LDL: N
- HDL: N sau ↓
- TGL serice: mult ↑ (de obicei > 2000 mg/dl)
- Alt. modificări de lab: tolerantă la glucoză, de obicei N

**TIP IIA: HIPER BETA LIPOPROTEINEMIE (hipercolestrelemie)**
- Colestrol: mult ↑ (300-600 mg/dl)
- LDL: ↑
- HDL: N sau ↓
- TGL: N
- Alt. modificări de lab: -

**TIP IIb: LIPIDEMIE prin aport crescut (hiperlipîdemie mixtă, combinată)**
- Colesterol: mult ↑ (300-600 mg/dl)
- LDL: ↑
- HDL: ↑
- TGL: ↑ dar ≤ 400 mg/dl
- Alt. modif. lab: -

**TIP III: HIPERGLICERIDEMIE indusă de glucoză, cu hipercolesteroleme**
- Colesterol: mult ↑ (300-600 mg/dl)
- LDL: ↑
- HDL: N sau ↓
- TGL: mult ↑ (200-1000 mg/dl)
- Alt. modif de lab: - hiperglicemie
  - tolerantă la glucoză adesea anormală
  - acid uric seră ↑

**TIP IV: HIPERLIPDEMIE endogenă (hipergliceridemie indusă de glucoză fără colesterol ↑)**
- Colesterol: N sau usor ↑
- LDL: N
- HDL: N sau ↓
- TGL: mult ↑ (500-1500 mg/dl)
- Alt. modif de lab: - tolerantă la glucoză de obicei anormală
  - acid uric ↑

**TIP V: HIPERLIPDEMIE MIXTĂ ENDO și EXOGENĂ (tipurile I și IV combinată) (hipergliceridemie combinată, indusă de grăsimi și glucide)**
- Colesterol: ↑ (250-500 mg/dl)
- LDL: N
- HDL: N sau ↓
- TGL: mult ↑ (500-1500 mg/dl)
- Alt. modif de lab: - tolerantă la glucoză de obicei anormală
  - acid uric ↑`,
        mnemonic: 'Tip I: ↑↑TGL; Tip IIA: ↑↑colesterol; IIB: ↑colest+TGL; III: ↑↑ambele+glucoză; IV: ↑↑TGL endogen; V: mixtă',
      },
      {
        front: 'Determinarea acizilor grași în ser - Valori normale și metode',
        back: `**VALORI NORMALE:**
- **Met spectrofotometric cu săruri de Cu/co:** 14-16 mg/dl
- **Alt. metode de dozare:** volumetric, cromatografic, radiochimică: 0,25-0,75 mEq/L sau 9,5-18 mg/dl

**IMPLICAȚII:**

Frigul, nicotina, alcolului, stările de stres cresc concentrația sanguină de acizi grași liberi

**Fiziologic, nivelul AGL ↑:**
- Copii în perioada prepubertară
- La femei în ultimul trimestru de sarcină
- (și revine la normal imediat după naștere)

**Patologic, nivelul AGL ↑:**
- Dz (diabet zaharat)
- Dezotatc
- Feocromocitom
- Hipertiroidism, b. Basedow
- Glicogenoze

**RECOLTAREA sg:** sg fără anticoagulant

**MATERIAL BIOLOGIC:** ser

**METODE:**

**1) Metoda COLORIMETRICĂ:**

**Pp:** Acizi grași liberi din ser dau cu sărurile de cupreu săpunuri de cupreu, care se extrag cu cloroform. Ionii de cupreu din extract reacționează cu dietilditiocarbonatul de sodiu formând un compus colorat în galben, care se dozează fotometric la 440 nm.

**2) Metoda VOLUMETRICĂ (METODA DOLE, MODIFICATĂ DE TROUT):**

**Pp:** Acizi grasi liberi se extrag cu un amestec format din izopropanol, heptan și acid sulfuric, după care se titrează cu hidroxid de sodiu, în atmosferă de azot și în prezența timolftaleei ca indicator

**3) Metoda extragere FGL:**

**Pp:** AGL se extrag cu amestec de solvent → se formează un complex cu Co (AGL-Co) și se dozează prin reacție de culoare cu α-nitroso-β-naftol`,
        mnemonic: 'VN: 14-16 mg/dl; ↑=DZ, hipertiroidism, feocromocitom; Metode: colorimetrică Cu, volumetrică, extragere',
      },
      {
        front: 'Determinarea proteinelor totale în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **Adulți:** 6,6-8,6 g/dl sau 66-86 g/L
- **Nou-născuți:** 5,2-9 g/dl sau 52-90 g/L

**IMPLICAȚII CLINICE:**

Diagnosticarea:
- Cirozei hepatice (CH)
- Mielomului multiplu (MM)
- Controlului inflamei (SM)

Proteinele sunt formate din aminoacizi (AA) și nu pot funcționa ca enzime, hormoni sau pot fi constituente ai cromosomilor.

**VALORI ↑ ale proteinemiei:**
- Deshidratare
- MM (mielom multiplu)
- Inflamații cronice
- Macroglobulinemie Waldenstrom
- Leucemii
- Colageneze

**VALORI ↓ proteine:**
- Hiperhidratare
- Deficit de aport
- Deficit de absorbție
- Deficit de sinteză: CIROZĂ HEPATICĂ, MESURI, HEMORAGII ACUTE
- Pierderi: SN, NEFROTIC, HEMORAGII ACUTE

**RECOLTAREA sg:** fără anticoagulant

**MATERIAL BIOLOGIC:** ser nehemolizat

**CONSERVARE:**
- La temp camerei: până la 4 ore
- Refrigerare: până la 3 zile
- Congelate: până la 6 luni`,
        mnemonic: 'VN: 6.6-8.6 g/dl; ↑=deshidratare, MM; ↓=ciroză hepatică, SN, malnutriție, hemoragii',
      },
      {
        front: 'Determinarea proteinelor totale - Metode de laborator',
        back: `**METODE DE DETERMINARE:**

**1) Metoda Biuret:**

**Pp:** Legăturile peptidice ale proteinelor din ser reacționează cu ionii de Cu (din reactivul biuret) în soluție alcalină și formează săruri complexe de culoare albastră-violet, intensitatea culorii fiind proporțională cu nr de legături peptidice deci cu cantitatea de proteine din ser

**2) Metoda cu colorantul Coomassie Brilliant Blue:**

**Pp:** Proteinele din ser se leagă de colorantul Coomassie Brilliant Blue și formează un compus colorat care se fotometrează, intensitatea culorii fiind direct prop. cu cantitatea de proteine din probă

**3) Metoda WEICHSELBAUM:**

**Pp:** Proteinele din ser + reactivul Weichselbaum → o culoare albastră fotometrabilă

**4) Metoda LOWRY:**

**Pp:** Tirozina și triptofanul din proteine serice reduce reactivul fosfomolibdic Wolfram

**5) Metoda Refractometrică:**

**Pp:** Diferită medii au capacitatea de a refracta (devia) razele de lumină ce le străbat când trec dintr-un mediu de o anumita densitate în altul de o altă densitate. Proteinele din ser se determină cu ajutorul refractometrului care măsoară refracția luminii prin proteine (nu clar)

**6) Metoda gravimetrică:**

**Pp:** Proteinele din ser precipită cu sulfatul de amoniu; iar precipitatul se usucă și se cântărește

**7) Metoda absorbției în UV:**

**Pp:** Proteinele sanguine prezintă o absorbție maximă a luminii UV la 280 nm datorită TYR, TRF, FHE; det. cantității de proteine sub 100 μg/ml

**8) Metoda chimie uscată:**

**Pp:** Proteinele din ser formează cu ionul trofenol de Cu un complex colorat prop. cu cantitatea totală de proteine din probă și care se măsoară prin spectrofotometrie de reflexe la 540 nm`,
        mnemonic: 'Biuret: proteine + Cu → complex albastru-violet; Lowry: tirozină reduce fosfomolibdic; UV: λ=280nm',
      },
      {
        front: 'Determinarea raportului ALBUMINE/GLOBULINE - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **ALBUMINE/GLOBULINE = 1,13-1,75**
- **Albumine:** 3,5-5g/dl
- **Globuline:** 2,5-3,5 g/dl

**IMPLICAȚII CLINICE:**

**Albumina** - reprezintă 52-60% din totalul proteinelor, este sintetizată în ficat

**Rolul albuminei:**
- Det ± 80% din presiunea coloid-osmotică, contribuind la menținerea mantelei de distribuție aprei în organism
- Transportă constituenți sanguini (bilirubină, ioni, hormoni, ac.grași, cusotme, medicamente)

**Globulinele:**
- Sunt proteine care funcționează ca anticorpi, dar participă și la menținerea presiunii coloid-osmotică

La o scădere a albuminelor corespunde o creștere a globulinelor și invers.

De obicei, creșterea globulinelor și scăderea albuminelor determină o accelerare a VSH (↑G ↑↓ Allbum → ↑ VSH)

**VALORI ↑ ale albuminei serice:**
- Deshidratare
- Hipoinfecție cu albumină

**VALORI ↓ ale albuminei serice:**
- Hidratare rapidă
- Nupralihidratare
- Necroze severe a ficatului, hepatită cronică virală sau alcoolică neoplasm (sindrom deficitar)
- Narcină
- Pierdere de proteine (sd nefrotic, diaree, tumori, intoxicații cronice)
- Disfuncții tiroidiene

**VALORI ↑ ale ↑ globulinelor serice:**
- Ulcer gastroduodenal
- Afecțiuni cr. inflamatorii
- Malnutriție severe
- Malabsorbție

**VALORI ↑ globulinelor serice:**
- Nefroze (sd nefrotic: ↑ α₂-globulinele)
- Tumori maligne
- Inflamații și infecții acute și cronice
- Colageneze

**Det albuminei serice:**

**Material biologic:** ser nehemolizat diluat 1/50 cu ser fiziologic sau plasmă + heparină Na și Li

**CONSERVARE:**
- La temp. camerei: până la 7 zile
- Refrigerare: 1 lună
- Congelate: 1 lună`,
        mnemonic: 'VN Alb/Glob: 1.13-1.75; Alb: 3.5-5 g/dl; Glob: 2.5-3.5 g/dl; ↓Alb=ciroză, SN; ↑Glob=inflamații',
      },
      {
        front: 'Determinarea raportului albumine/globuline - Metode de laborator',
        back: `**METODE DE DETERMINARE:**

**1) Metoda cu verde de brom crezol:**

**Pp:** Albumina serică + colorantul verde de brom crezol → complex colorat gra verde fotometrabil, a cărui absorbție este mai mare decât a colorantului liber, diferența dintre absorbție probit și absorbția colorantului liber e direct proporțională cu albumina din probă

**Globuline = proteine totale - albumina**

**2) Metoda gravimetrică:**

**Pp:** Albuminele din ser precipită cu sulfatul de amoniu, iar precipitatul se usucă și se cântărește

**3) Metoda chimie uscată:**

**Pp:** Albumina serică se leagă cu colorantul BCG, iar complexul de culoare ce se formează este măsurat la 630 μm

Cantitatea de albumină fixată de colorant este proporțional cu concentrația albuminei din probă`,
        mnemonic: 'Verde brom crezol: albumină + colorant → complex verde (630nm); Globuline = PT - Albumină',
      },
      {
        front: 'Teste de disproteinemie - Clasificare și semnificație',
        back: `**TESTE DE DISPROTEINEMIE:**

**VN = 1-4 UML (Unități Mac Lagan)**

**IMPLICAȚII CLINICE:**

Testele de disproteinemia au valoare calitativă.

Ficarea test nu poate indica care fracțiune este modificată (albumine, β-globuline, ɣ-globuline). Aceste teste nu dau informații despre fct. proteinoformatoare a tesutului retículo-histiocitar care reacționează prin zxcel modificări nespecifica în multiple afecțiuni.

**VALORI ↑:**
- Leziuni hepatice (test defecțuos între icterul hepatic = reacție A" și icterul prin obstrucție = reacție B")
- Cancer
- Tuberculoză
- Malarie
- Endocardită subacută
- RAA (reumatism articular acut)

**RECOLTAREA sg:** fără anticoagulant

**MATERIAL BIOLOGIC:** utilizat - ser proapăt nehemolizat

**TESTE:**

**1) Metoda TIMOL (Mac-Lagan):**

**Pp:** O soluție saturată de timol tamponată la pH=7,5 determină precipitarea serurilor disproteinemice în cazul în care ↑ o labilitate a echilibrului colorat datorită creșterii globulinelor sau scăderea albuminelor și creșterei gama- și beta-globulinelor în diverse boli.

**2) TESTUL TAKATA-ARA:**

**Pp:** Sublimatul (HgCl₂) în prezența carbonatului de Na și a clorurii de Na produce precipitarea proteinelor serice în cazul în care există o labilitate a echilibrului colorat datorită creșterii globulinelor sau scăderii albuminelor.

**3) TESTUL KUNKEL:**

**Pp:** Creșterea ɣ-globulinelor determină precipitarea serului prin tratare cu o soluție diluată de sulfat de Zn la un pH=7,5

**4) TESTUL cu APA DISTILATĂ:**

**Pp:** Creșterea β și ɣ-globulinelor det. precipitarea serului prin tratare cu apă distilată

**5) TESTUL GROSS MODIFICAT:**

**Pp:** Creșterea globulinelor și scăderea albuminelor det. precipitarea serului prin tratare cu o soluție HAYEM

**6) TESTUL WUNDERLY:**

**Pp:** Creșterea globulinelor și scăderea albuminelor det. o reacție de turbiditate prin tratarea serului cu sulfatiazet de Cadmiu`,
        mnemonic: 'VN: 1-4 UML; Timol (Mac-Lagan): pH=7.5; Takata: HgCl₂; Kunkel: Zn la pH=7.5; ↑=hepatită',
      },
      {
        front: 'Determinarea fibrinogenului - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **VN = 200-400 mg %**

Fibrinogenul este o glicoproteinâ ce conține 3-5% glucide

**RECOLTAREA sg:** 5 ml sg + 0,5 ml citrat de Na 38,5%

**MATERIAL BIOLOGIC:** plasmă citrată (dop albastru)

**VALORI ↑:**
- RAA
- Inflamații
- b. Hodgkin
- Neoplasm
- Pancreatită

**VALORI ↓:**
- Congenital → afibrinogenemie
- Leucemii
- Hepatonații severe (ciroză, hepatită cr.)

**METODE DE DETERMINARE:**

**1) Metoda GRAVIMETRICĂ:**

**Pp:** În prezența Ca Cl₂ fibrinogenul din plasmă este transformat în fibrină și detrunchat cantitativ prin centrifuge

**2) Metoda TURBIDIMETRICĂ:**

**Pp:** Prin tratarea plasmei cu Na₂SO₄ se produce o turbiditate proporțională cu cantitatea de fibrinogu.

Alt metod: - precipitare la 56°C
          - colorimetrică

**3) Metoda modificată Clauss:**

**Pp:** Plasma citrată se diluează și se amestează cu exces de trombină și cu accelerator de reacție → se determină timpul de coagulare`,
        mnemonic: 'VN: 200-400 mg%; ↑=RAA, inflamații, neoplasm; ↓=afibrinogenemie, ciroză, leucemii',
      },
      {
        front: 'Determinarea aminoacizilor totali - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**
- **VN: 4-6 mg %**

În structura proteinelor aminoacizii sunt legați între ei prin legături peptidice între gruparea amino a unui aminoacid și gruparea carboxilică a altui. Pentru determinarea cantitativă este necesară punerea în libertatea a aminoacizilor din macromolecula proteică, prin hidroliză alcalină.

**PRINCIPIUL det:**
- În mediu alcalin aminoacizii formează cu ionii de Cu un complex solubil care se poate doza colorimetric. Pt determinare este utilizat nu deproteinizat?

**VALORI ↓ AA în ser:**
- SN (sd. nefrotic)
- Stări febrile
- Malnutriție
- Artrită reumatoidă
- b. Hartrup
- Coreea Huntington
- Hipofuncție corticosuprarenaliană

**VALORI ↑ AA în ser:**
- Aport ↑↑
- Distrucția proteine mari
- Deficit de sinteză
- Insuficiență renală cronică (IRC)
- Insuficiență renală acută (IRA)
- Eclampsie

**Hiper aminoacidemie apare în:**
- Mase traumatisme
- Ciroză hepatică (CH) cu insuficiență hepatică
- Stări febrile
- Leucemii acute
- Stări carenț

**Investigarea metabol AA este complexă:**

Pt identificarea și dozarea α-AA se utilizează:
- (a) Reacția de culoare (ex. cu ninhidrina)
- (b) Spectroscopie de absorbție în mediu UV care permite identificarea și dozarea AA aromatici
- (c) Metode cromatografice:
  - Cromatografie de partitie
  - Cromatografie cu trasimi schimbători de ioni
  - Cromatografie de chiferie în gel
- (d) ELFO
- (e) Diluție izotopică`,
        mnemonic: 'VN: 4-6 mg%; ↑=IRC, IRA, malnutriție, traumatisme; ↓=SN, malnutriție; Met: ninhidrină, UV, cromato',
      },
      {
        front: 'Electroforeza proteinelor serice (ELFO) - Valori normale și semnificație',
        back: `**ELECTROFOREZA PROTEINELOR SERICE (ELFO):**

**VN ale proteinelor serice determinate prin ELFO pe gel de agaroză:**
- **Albumine:** 60-71%
- **(alfa) α₁ globuline:** 1,4-2,9%
- **α₂ globuline:** 7-11%
- **(beta) β globuline:** 8-13%
- **(gama) ɣ² globuline:** 9-16%

Pt a obține valori absolute ale fracțiunilor proteice electroforetice o se determină proteinele totale din ser, VN=60-80g/l și se calculează frecară fracțiune în parte. Din valoareo obținute pt frecară fracțiune, se poate calcula raportul albumine/globuline (VN = 1,6-2,2)

Electroforeza este rapid metoda de separare și identificare a diferitelor fracțiuni proteice, prin migrarea diferențiată a particulelor coloidale în camp electric.

**IMPLICAȚII CLINICE:**

**Hiperproteinemie (↑ ale proteinelor totale):**

**Aparente:**
- Deshidratare
- Reali: inflamații cronice
  - Leucemii
  - Macroglobulinemie Waldenstrom
  - Mielom multiplu (MM)
  - Colagenore

**Hipoproteinemie (↓ proteinelor serice):**

**Aparente:**
- Hiperhidratare
- Reali: deficit de aport
  - Deficit de absorbție (malabsorbție)
  - Deficit de sinteză (ciroză hepatică)
  - Pierderi (SN-sd nefrotic, ciroza, leucogii acute)

**Disproteinemia** - modificare patologică a raportului diferitelor fracțiuni proteice

**VALORI ↓ albumine:**
- Deficit de aport, deficit de absorbție (malabsorbție)
- Deficit de sinteză
- Pierderi proteice (albuminurie)

**VALORI ↑ α₁ și α₂ globuline:**
- Inflamații acute
- Colagenore
- Neoplasme
- SN (sd. nefrotic, ↑ α₂)

**VALORI ↑ ɣ² globuline:**
- Proliferare reactivă / tumorală a plasmocitelor producătoare de Ig (MM - mielom multiplu)
- Inflamații cronice
- Endocardită bacterică
- Ciroza hepatică (CH)

**VALORI ↓ ɣ globuline:**
- Malnutriție
- SN (sd. nefrotic)

**MATERIAL BIOLOGIC:**
- Ser proapăt, neduluat, nehemolizat
- Conservare: 2-8°C, 7 zile

**ELFO PRINCIPIU:**

Principiu - se bazează pe proprietatea particulelor încărcate electric de a migrează prin unui mediu curent electric - se utilizează suporturi și seilde - hârtie, gel agaroză, acetat de celuloză
- pH-ul de lucru = 8,6 la acest pH toate componenele proteice sunt încărcate - negative și migrează spre anod
- după colorare și proteinele apar ca benzi colorate, prin măsurarea densității optice, frecară bandă din maxim de absorbție
- prin ELFO → 5 frecări: albumina, α₁, α₂, β și ɣ² globulinele`,
        mnemonic: 'Alb: 60-71%; α₁: 1.4-2.9%; α₂: 7-11%; β: 8-13%; ɣ: 9-16%; pH=8.6; Gel agaroză',
      },
      {
        front: 'Determinarea Calciului în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**

**Metoda o-cresolftaleină (colorimetrică):**
- **Adulți:** 9-11 mg/dl sau 2,2-2,7 mmol/l
- **Chimie uscată:** 8,6-10,2 mg/dl sau 2,1-2,5 mmol/l

**Ca²⁺ ionic (calciu ionic):**
- **VN = 4,7-5,2 mg/dl**

**IMPLICAȚII CLINICE:**

**Distribuție Ca în organism:**
- ~98% din Ca din organism se găsește în miezul osos, restul în cavitățile extracelulare
- Ca este predominant extracelular și se prezintă sub forma de:
  - Ca ionic sau liber (legat de proteine plasmatice → albumine)
  - Ca reac total (fără să afecteze Ca²⁺ ionic)

**Ca²⁺ (calciu ionic):**
- ↑ în acidoză
- ↓ în alcaloză

**Rolul Ca ionic în organism:**
- Contribuie la reglarea excitabilității neuro-musculare
- Activează unele enzime în procesul de coagulare

**Reglarea calcemiei:**
- Glucidele → cresc absorbția intestinală a Ca
- Parathormonul → stimulează absorbția intestinală a Ca
  - Det reabsorbția Ca la nivelul tubilor renali proximale
- Vitamina D (calcitriol 1,25 mg)
  - Reglarea presiunii osmotice
  - Reglarea EAB (echilibru acido-bazic)
  - Fenomen de polarizare-depolarizare a mb celulare
  - Excitabilitatea neuro-musculară

**VALORI ↑ ale Ca reac (Hipercalcemie):**
- Aport excesiv de Vit D, cantități mari de preparate de Ca
- Tratament îndelungat cu diuretice tiazidice (↓ excreția renală de Ca)
- Hiperparatiroidism
- Leucemie, mielom multiplu
- Hodgkin, limfosarcom
- b. Addison
- b. Paget
- IRL (ins. renală cronică)

**Valori ↓ ale Ca reac (Hipocalcemie):**
- Pseudohipoparatiroidism (↓ hipercalcemie)
- Malabsorbtție
- Administrare de furosemid, steroizi, antiepileptice
- Pancreatită acută necrotico-hemoragică
- Diaree
- Alcaloză
- Insuf. renală
- Hipoparatiroidism primar sau secundar
- Fracturi osoase + imobilizare prelungite la pat
- b. Addison
- b. Paget
- IRL

**Material biologic utilizat:**
- Ser, nehemolizat, plasmă
- Conservare: -4°C la +8°C până la 6 săpt.; până la -18°C

**Recoltarea sg:** fără anticoagulant, pe heparină`,
        mnemonic: 'VN: 9-11 mg/dl (2.2-2.7 mmol/l); Ca²⁺ ionic 4.7-5.2; PTH ↑ Ca; ↑=hiperparatiroidism; ↓=hipoparatiroidism',
      },
      {
        front: 'Metode de determinare a Calciului - Principii și tehnici',
        back: `**METODE DE DETERMINARE A Ca:**

**1) Metoda complexometrică (ELIOT):**

**Principiu:** Ca din probă formează în mediu alcalin cu sarea sodica a acidului efilendiamintetraacetic (Na₂EDTA), un complex chelatec

Ionul excesul de EDTA dă un complex de culoare albastră

**2) Metoda colorimetrică cu o-cresolftaleină:**

**Principiu:** Ca din probă formează cu cresolftaleina, în mediu alcalin, un complex de culoare violet (colorimetricbel la 550-590 mm)

A cărui intensitate este direct proporționată cu Ca din probă

**3) Metoda Wood cu oxalat de amoniu:**

**Principiu:** Oxalatul de amoniu precipită Ca → oxalat de Ca care se dizolvă în acid sulfuric și se eliberează acid oxalic, care este tratat cu o soluție de permanganat de K → culoare roz ce trebuie nu persistă 30 min

**4) Metoda flam-fotometrică:**

**Principiu:** Ca din ser trece în flacăra din sticlă breindă (probă) și sfere gazoase, transformare împotriva de o cursura de radiații specifice Ca (intensitatea luminiscenței radiației emise este direct proportională cu conc la din probă)

**5) Metoda chimie uscată:**

**Principiu:** Ca din ser: - disociază proteinele de care este legat
- penetrează stratului de impriantare și se distribuie uniform în stratului de reactiv, unde Ca formează cu colorantul ARSENATO III → complex colorat care e fotometrul rotund (λ = 600 mm)`,
        mnemonic: 'Metode: EDTA complex, o-cresolftaleină, Wood oxalat, flam-fotometrie, chimie uscată (λ=600nm)',
      },
      {
        front: 'Determinarea Fosforului anorganic în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**

**Metoda cu molibdat (NH₄) de amoniu:**
- **Adulți:** 3-4,5 mg/dl
- **Copii:** 4-7 mg/dl

**Chimie uscată:**
- **Adulți:** 2,5-4,5 mg/dl
- **Copii:** 3,4-6,2 mg/dl

**IMPLICAȚII CLINICE:**

**P în organism:**
- P în organism: F combinat cu Ca
- Localizat intracelular

**Combinații chimice principale prezente în organism:**
- Fosfați, estru

**Rolul P în org:**
- în formarea testut osos
- depozitarea și transferul de energie din organisme
- în metabolismul glucidic, lipidic
- în menținerea EAB (echilibru acido-bazic)

**Reglarea conc de P în sg (fosforemia) este realizată de PTH (parathormon):**
- Între P și Ca F și o relație invers proporțională
- ⇒ (↓) conc de Ca duce la (↑) P nu invers

**Variații fiziol:**
- P (↑) în primele 2/3 de viață, la copii > adulți
  - (reținerea fosforicului în neutra metabolică căștit timp cât durează procesul de "a organizmului")
- P (↓) la gravidă

**VALORI ↑ ale P în ser (Hiperfosfatemie):**
- Distrucția celulară, acidoză
- când P iese din celule cu viteza mai mare decât eliminarea
- ulcer gastric și duodenal
- IRA, IRL, (>7 mEq/l) detentă obligație, anestiei
- b. Addison
- Valoare ↓ ale P (Hipofosfatemie)**
- Tratam cu medicamente ce conțin fosfați
- Acromegalie (exces STH inhibită PTH)
- Fractură multiplă

**VALORI ↓ ale P (Hipofosfatemie):**
- Hiperparatiroidism
- Tratam îndelungat cu diuretice trebuie (↓ excreția renală de Ca)
- Malabsorbtție
- Diaree
- Rahitism, osteom
- Anorexie nervors
- Acidoza respiratorie
- Medica cu antagoni pe bază de Mg, și Al (aluminium)
- b. Addison

**Recoltarea ng:** fără anticoagulant, pe heparină - Li

**Material biologic:**
- Ser, nehemolizat
- Plasmă (anticoagulantul nu mu conține Na), ne utilizează heparinată de Li

**Conservare:**
- Temp. camerei - 4 săpt
- Refrigerare - 1 săptămână
- Congelate - până la 1 lună`,
        mnemonic: 'VN adulți: 3-4.5 mg/dl; copii: 4-7 mg/dl; P + Ca = relație inversă; PTH ↑ Ca, ↓ P',
      },
      {
        front: 'Metode de determinare a Fosforului - Principii',
        back: `**METODE DE DETERMINARE A P:**

**1) Metoda cu molibdat NH₄ (fără deproteinizare):**

**Principiu:** Ionul fosforic din ser formează cu molibdat → fosfomolibdat → care e redus de catră indrochinona la albastru de molibden, a cărui absorbție este proporțională cu conc de fosfor din probă

**2) Metoda Raabe (fără precipitarea proteinelor):**

**Principiu:** Acidul molibdenic formează cu ionul fosfat un complex fotomolibdic, care este redus de acidul ascorbic la albastru de molibden a cărui intensitate este proporțională cu conc de fosfat din probă

**3) Metoda chimie uscată:**

**Principiu:** Fosforul anorganic din ser formează fosfomolibdat de NH₄ cu molibdatul NH₄ la un ph acid

Sulfatul de p-nitilaminofenol reduce fosfomolibdatul NH₄ la un complex albastru (heteropolimolibdenin) măsurat prin spectrofotometrie de reflexie (la 670-680 mm)`,
        mnemonic: 'Metode: molibdat NH₄, Raabe, chimie uscată; fosfomolibdat → albastru (λ=670-680nm)',
      },
      {
        front: 'Determinarea Fierului în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**

**VN - metoda colorimetrică cu orto- și batofenanrtolină cu deproteinizare:**
- **VN = 50-180 µg/dl**
- **VN = 8,9-32,2 µmol/l**

**Chimie uscată:**
- **Femei:** VN = 37-170 µg/dl sau 6,6-30,4 µmol/l
- **Barbeti:** VN = 65-191 µg/dl sau 8,8-32,4 µmol/l

**IMPLICAȚII CLINICE:**

**Fe este prezentau în principal în Hb, mirosiea feului și utiliză în diagnostic diferențial al anemiei**

**Valori ↓ Fe (siderenemie):**
- Aport exogenou scăzut (malnutriție)
- Anemii feriprive (insuficiență alimentară de Fe, hemoragii cronice, absorbtie medecavată de Fe, pierderea Fe stocat)
- Infecții cronico
- boli cr. (inflamați cronice)
- Diaree cronică (absorbtie acuității)
- Gastrita cronică (absorbtite ↓)
- Parazitoze (absorbtite ↓)
- Tumori maligne
- Hemoragie (pierdere ↑)
- Narcința, meustruație, cerptez (consum ↑)

**Valori ↑ Fe:**
- Anemie aplastică
- Anemie megaloblastică
- Talasemie
- Porfiria
- Anturie hemolitică
- Terapie neadecvată cu Fe

**Recoltarea ng:** în recipent fără anticoagulant (de unică folosință)

**Puncție venoasă fără stază**

**Material biologic utilizat:**
- Ser, nehemolizat
- Plasmă + heparină

**Conservare:**
- la temp. camerei - 4 zile
- refrigerare (2-8°C) = 7 zile
- congelate - până la 6 săpt la -18°C`,
        mnemonic: 'VN: 50-180 µg/dl; ↓Fe=anemie feriprivă, hemoragii; ↑Fe=hemoliză, talasemie; FĂRĂ STAZĂ!',
      },
      {
        front: 'Metode de determinare a Fierului - Principii și tehnici',
        back: `**METODE DE DETERMINARE A Fe:**

**1) Metoda colorimetrică cu batofenanrtolină după deproteinare:**

**Principiu:** HCl eliberează Fe seric (Fe³⁺) din fe legătură cu proteinele (Complexul Fe-transferină) care rela fi' precipitati cu acid tricloacetic. Fe³⁺ eliberă → se fie redus la Fe²⁺ (bivalut) care formează cu batofenanrtolină un complex de culoare roză fotometribil la λ = 535 mm

**2) Metoda Heilmayer modificată (colorimetrică cu orto-fenanrtolină):**

**Principiu:** Acelați principiu ca la metoda anterioarei, doar că complexul format este fotometribil la λ = 510 mm

**3) Metoda cu cromazurol B:**

**Principiu:** Fe²⁺ (bivalut) + Fe³⁺ (trivalut) + cromazurol B + cetiltrimetil amonium → formează un complex colorat a cărui intensitate este direct proporțional cu conc Fe din probă

**4) Metoda chimie uscată:**

**Principiu:** Fe³⁺ (feric) la pH acid = 4 este eliberat de pe transferina și migrează pe stratului de reducere unde este redus de acidul ascorbic rezultând Fe²⁺ (feros) care este ligat de un colorant și formează un complex colorat fotometribil (λ = 600 mm)

**Metoda cu ferozină:**

Fe³⁺ (transferină) - pH = 4,8 → Fe²⁺ + ferrozina → complex roză`,
        mnemonic: 'Metode: batofenanrtolină (λ=535nm), Heilmayer (λ=510nm), cromazurol B, chimie uscată (λ=600nm)',
      },
      {
        front: 'Determinarea Magneziului în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**

**VN - metoda colorimetrică cu galbeu titau:**
- **Adulți:** 1,5-3,5 mg/dl
- **Copii:** <10 ani: 1,6-2,4 mg/dl

**Chimie uscată:** 1,6-2,3 mg/dl

**IMPLICAȚII CLINICE:**

**Mg este un indicator al fletă renale și al activității metabolice a organizmului**

**Rolul Mg:**
- Activator al unei enzime (FAL) ATPaza și inhibitor pt altele
- Intervine în reglarea excitabilității neuro-musculară (împreună cu Na⁺, K⁺, Ca²⁺)
- Indicator al activitații metabolică
- Indicator al flet renale (Mg sau se filtrnează glomerular → se reabsorbă tubular → dacă flet renale = deficitară → are loc o reabsorbție ↑ Mg → ↑ reabsorbția al căror ↑ Mg în sânge)
- Mecanic pt utilizarea ATP ca sursă de energie
- Mecanic pt jet normale a metabolismului glucidic
- Mecanic pt sinteza de proteine și acizi nucleici

**Reglarea magnezamia:**
- Impactul de Mg ⇒ ↑ absorbția intestinală de Mg și de Ca
- Dieta bogată în fosfați ⇒ inhibită absorbția intestinală de Mg și C

**Recoltarea ng.:** fără anticoagulant

**Material biologic:**
- Ser, nehemolizat, plasmă
- Conservare - la temp camerei - 1 săptămână
  - refrigerare - 4 săpt
  - congelate (refrigerați/(-20°/-18°C) - până la 1 lună`,
        mnemonic: 'VN: 1.5-3.5 mg/dl (adulți), 1.6-2.4 (copii <10); Mg = activator FAL, ATP; ↑=insuf renală',
      },
      {
        front: 'Metode de determinare a Magneziului - Principii',
        back: `**METODE DE DETERMINARE A Mg:**

**1) Metoda colorimetrică cu galbeu titau:**

**Principiu:** Colorant orgănic galbeu titau (galbeu de tiazol) + Mg → complet complex rosu-portocaliu (λ = 540 mm) (a cărui intensita este prop. cu conc de Mg din ser/ul analizat)

(A cărui intensitate este proporț cu conc de Mg din probă)

Pt stabilizarea culorii se adaugă soluție macromoleculară de gumă arabică sau alcohol polivinil

**2) Metoda colorimetrică Mann și Yoe:**

**Principiu:** Mg + colorantul Mann și Yoe → complex de culoare roșu (a cărui intensit éste prop. cu conc de Mg din ser/ul analizat)

**3) Metoda chimie uscată:**

**Principiu:** Mg liber / legat de proteine + formează (din stratul de reactiv) → complexul Mg-colorat → det depletorea maximului de absorbție al colorantului la λ = 630 mm

Cantitatea de complex este de proporțională cu conc Ca nu se mărcarea prin spectrofotometrie de reflexie

**4) Metoda colorimetrică cu albastru xylidyl:**

**Principiu:** Mg + albastru xylidyl → complex solubil rosu + tampon (pH = 10) → culoare albastră și conc Mg

**Valori ↑ Mg:** - terapie cu salicilați, diuretice tiazidice, antiacidele Mg
- hipoparatiroidism, IRA, IRL, acidoză diabetică
- b. Addison

**Valori ↓ Mg:** - ciroză hepatică (alcaloză)
- comă diabetică
- boli trepăinție cu ascite
- hiperparatiroidism şi aproprită de unde U
- Recoltarea ng.: fană anticoagulant, cu heparinat de Li

**Material biologic:** - ser, nehemolizat
- plasmă (anticoagulantul nu mu conține Na, ne utilizează heparinată de Li)

**Conservare:**
- temp. camerei - 4 până
- refrigerare - 1 năpt`,
        mnemonic: 'Metode: galbeu titau (λ=540nm), Mann-Yoe, xylidyl (λ=630nm); Mg + colorant → complex roșu',
      },
      {
        front: 'Determinarea Clorului în ser - Valori normale și semnificație clinică',
        back: `**VALORI NORMALE:**

**VN - metoda prin titrare mercurimetrică:**
- **VN = 94-111 mEq/l**
- **VN = 94-111 mmol/l**

**Chimie uscată:**
- **Adulți:** VN = 98-107 mEq/l = mmol/l
- **17zi-10 opt:** VN = 95-116 mEq/l
- **2-12 luni:** VN = 93-112 mEq/l
- **31ani:** VN = 92-111 mEq/l

**IMPLICAȚII CLINICE:**

**Diagnostic tulburărilor EAB și balantei hidrice**

**Valori ↑ Cl:** - deshidratare
- alimentație hipoclourată =dică fără sare
- administrare inelângătă de bicarbonat, diuretice mercurice și elastazid
- stenază pilorică
- diaree
- fistule intestinale
- cansere ț, tumor prelutoare de paratihormon (plămân, rinichhi, muanere intestinale, steroizi, estrogenți, digitale)
- b. Addison

**Valori ↓ Cl:** - alimentație lupoclourată = dică fană sare
- pierdere: gastri intestimale (diaree, vărsături, malabsorbtție)
- Firam transportații excessive
- anemie - ciustohe ↓ renale; nefrita severe, IRL
- deficit de bicarbonată în perioado polivrica cu relevato reductei și în organizmini
- deficit b. cusitrug, insuf renareneulată hipoaldesteronism

**Distribuție Cl în org:**
- majoritatea extracelular
- măi puțin intravascular și intracellular

**Rolul Cl în org:**
- menținerea integrității celulare prin influențarea presiunii osmotice
- menținerea EHB
- neutromerca balantei hidrice (menținerea distibutiei optima a apei în corp)
- formarea HCl din nucleu gastric
- eliminarea la nivel renală a produselor azotate => din metabolism (acid uric, uree)

**Combinații chimice principale în org:** - clorura de Na (NaCl)
- acidul clorăidric (HCl)

**Reglarea conc neun a Cl se faze sub astruma aldosteronul care ↑ reabsorbția Na și Cl

**Recoltarea ng:** fără anticoagulant
- pe heparinat 2i

**Material biologic:**
- ser nehemolizat
- plasmă (anticoagulantul nu mu contină Na, ne utilizează heparinată de 2i)

**Conservare:**
- temp. camerei - 4 și 6
- refrigerare - până la 3 și 6
- congelate - 4 dan`,
        mnemonic: 'VN: 94-111 mEq/l; ↑Cl=deshidratare; ↓Cl=vărsături, diaree, alcaloză; Reglat de aldosteron',
      },
      {
        front: 'Metode de determinare a Clorului - Principii',
        back: `**METODE DE DETERMINARE A Cl:**

**1) Metoda de titrare mercurimetrică (SCHALES, SCHALES):**

**Principiu:** Ionii de Hg (di-mercur) din soluția nitrat mercuric → precipită Cl din probă sub formă de HgCl₂ (clorura de mercur), iar excesul de ion de Hg (nu mai au Cl pe care l-au) → cu compus de culcare violet

**2) Metoda argentometrică (MOHR) - cu Cl:**

**Principiu:** Cl (probă) + AgNO₃ (azotatul de Ag) precipită sub formă de AgCl (clorură de Ag)

Excesul AgNO₃ + (indicator) cromat de K → cromat Ag ⇒ culoare roșie - cănăriiie

**3) Metoda fotometrică cu cloraniilat de mercur:**

**Principiu:** Cl + cloraniilat de Hg → HgCl₂ + acid clorauilic (rosu-violet) (intrust culori și conc Cl)

**4) Metoda spectrofotometrică ultravioletocuantitată:**

**Principiu:** Cl + thiocianat Hg → HgCl₂ + thiocianat Fe

**5) Metoda chimie uscată:**

**Principiu:** - pt măsurarea ionilor de Cl utilizare potențiometrie directă
- lamela pt determinarea consta din 2 electroni selectivi pt ioni, ficaire continând (un ionofor pt-Na, un striat de referință și un socat de Ag sau clorura de Ag)

Fiecare electrode produce un potențiol electric
Diferența de potențial dintre eu 2 electroni este prop. cu conc ioni de Na`,
        mnemonic: 'Metode: mercurimetrică (Schales), argentometrică (Mohr-AgNO₃), cloraniilat Hg, chimie uscată',
      },
      {
        front: 'Determinarea Sodiului și Potasiului - Valori normale și semnificație clinică',
        back: `**DETERMINAREA SODIULUI (Na):**

**VN - metoda flamfotometrică:**
- **VN = 137-152 mmol/l**

**Chimie uscată:**
- **VN = 135-145 mmol/l (mEq/l)**

**IMPLICAȚII CLINICE:**

**Detectarea tulburărilor hidroelectrolitice:**
- Sodiul este ionul predominant osmotic din mediul extracelular important în repartiliea apei prin:
  - Reglarea presiunii osmotic
  - Reglarea EAB (echilibru acido-bazic)
  - Fenomen de polarizare-depolarizare a mb celulare
  - Excitabilitatea neuro-musculară

**Rolurile Na în org. cuneai:**
- Reglarea presiunii osmotice a lichidului extracelular
- Reglarea EAB 3, sodiul are efect alcalinizant
- Transmiterea impulsului nervos (menținerea diferenței de potențial de o parte și de alta a amb celulele destoritó diferențier concentrației Na între interiosal și exterioral celulei)
- Influența secrețio salitare și intestinale
- Influențarea reabsorbițio tubuiare a apui și favorizează reducia ei în organizmini

**Reglarea concentrației secutorie a Na:**
- Funcția renală: ↑ filexului sangvin renaal ⇒ ↑ eliminarea de Na și Cl
  - ↓ filexului sangvin renaal ⇒ reducia de Na și Cl ⇒ edeme
- Funcția sudoripară: ne elimina Na trancut amont ⇒ ↓ eliminarea semită
- Acidoza carbonică: deterioară eliminara urinară de Na (dacă e inhibată ⇒ ↑ reabsorbția de Na
- ↑ osmolaritatea plasmatică → stimulează secretia de ADH (h. antidiuretice lupofiză)
- ↓ osmolaritatea plasmatică → inhibă eliberarea de ADH

**Extragen't procesfornicd ⇒ reducia de apă și Na în perentala premenstruală**

**Valori ↑ ale Na în ser (Hipernatrurie):**
- Aport insuficient de apă
- Pierdere hidrice extrarenaie (vărsături, diaree, transpirații) ⇒
⇒ ↑ Na prin deshidratare
- Manifestări care au inhibitat apă de mase
- După Cl, aplicații de sodă la 6 cu GNA
- Adm. IV de soluri hiperotonic de bicarbonat de Na la pacient cu de (digestă) hiperotonic
- I CC (însuf. cardiacă congectivă)
- I Renală (însuf. renală)
- Tratsfironait
- Sucifoliți
- Hiperaldosteronism primar (ț reșești de Na⁺, deficit de K⁺)
- comă
- Sd Conn (hiperaldesteronizm primar)
- b. Cushung

**Valori ↓ Na (Hiponatrurie):**
- Aport salin insuficient
- Pierderi: gastri gastimale (diaree, vărsături, malabsorbtție)
  - Firam transpiratii excessive
  - anemie - Cistovhe ↓ renale; nefrita severe, IRC
- Acidosa diabetică
- Edeme
- Exces de diuretică transițică și mercuriale
- Intoxicații cu elimină de merear`,
        mnemonic: 'Na VN: 137-152 mmol/l; ↑Na=deshidratare, Cushing; ↓Na=vărsături, IRC; Reglat: ADH, aldosteron',
      },
      {
        front: 'Determinarea Potasiului și metode de dozare Na/K - Principii',
        back: `**DETERMINAREA POTASIULUI (K):**

**VN - flamfotometrie:**
- **VN = 3,9-5,1 mmol/l**

**Chimie uscată:**
- **VN = 3,5-5 mmol/l**

**IMPLICAȚII CLINICE:**

**Dg. tulburărilor EAB, balanței hidrice:**
- Distribuția K:
  - Predominantly intraceluiar (90%) - ligar de proteinu, glucide oso
  - Săuvorm
  - Căzat are loc o distructie celulară ⇒ celulele distruase elibereaza K în sânge

**Rolul K:**
- În conducerea nervoasă (realiază o diferență de potențial transmembranare)
- În funcția musculară (în contracția musculară k trece extrace și Na intracluiar)
  - împreună cu Ca și Mg are K contral anumina defibilități cardiac
- În menținerea EAB
- În menținerea presiunii osmotice
- Reglarea concentratiei k în org

**Aldosteron:** ↑ potassemia + ↓ nel plasmatic + ↓ presiunea în artereilelor renale ⇒ stimularea secretiei aldosteronului la nivelul rinichivilor unde K este eliminat prism urina la scniimbi cu Na și în como competive cu elbrombanto de hidrogon

**Contrah:** ↑ elininarea urinară a k

**VALORI ↑ K în ser (hiperkaliemia):**
- Distrucție celulară, acidoză
- când k iese din celule cu vitero mai mare decât eliminarea
- IRA (>7 mEq/l) detentă obligație, anestési
- insuf hepatică
- I hematică, I BA, ΔЄ, hiporadosteronizm Δ
- b. Addison

**Valori ↓ K (hipokalemia):**
- Terapie cu insulin și calcutate (stimulează elim urinară de k+)
- Administrare de diuretice mnecuriale, steroizi, estrogeni, digitale)
- Nefropatii tubulare
- Malabsoritie
- Vănsături (pierderi de K și Hl)
- Sd cushing, insuf renareneulată hipoaldesteronism

**METODE DE DETERMINARE A Na/K:**

**1) Metoda flam-fotometrică:**

**Principiu:** Pulverizate fiomi de soluție de ser/plasmă prin flacără → atomii de Na emit radiații cu λ (lungimi de undă) a cáran întensitate este eclivaluită cu cu de atomi de Na excitați și flacăra la culoarea caracteristică

**2) Metoda Kramer-Tisdall:**

**Principiu:** Cotablonitriul de Na precipită K (ser/plasmă → un complex de cobaltornitrit de Na și K a cărui grupare mihrit este excidat de k mm O₄ (permanganate de K), iar excesul acestuia se fi tirsaf cu bisuifat de Na (Na₂S₂O₃)

**3) Metoda fotometrică cu deputenzare:**

**Principiu:** K din probă este precipitat cu tetrafenilborat Na după deputenzare probă, concentrația di K fiind draat proportională cu turbiditativa suspusiei care s-a formează

**4) Metoda chimie uscată:**

**Principiu:** - măsurarea ionilor de K utilizare potențiometrie directă
- lamela pt determinara constă din 2 electroni selectivi pt ioni, ficaire continând (un ionolor pt-K, un striat de referință și un socat de Ag/Cl)

Striat de de Ag ni clorura de Ag)

Fiecare electrode produce un potențiol electric

Diferenț de potențial dintre eu 2 electroni est prop. cu conc ioni de K`,
        mnemonic: 'K VN: 3.9-5.1 mmol/l; ↑K=IRA, acidoză, Addison; ↓K=diuretice, vărsături, Cushing; Metode: flam-fotometrie, Kramer-Tisdall',
      },
      {
        front: 'Determinarea Rezervei Alcaline (bicarbonat) - Valori normale și principiu',
        back: `**DETERMINAREA REZERVEI ALCALINE (Bicarbonat):**

**VN = 22-30 mmol/l**
- **pH-ul sg = 7,35-7,45**

**VN raport bicarbonat / ac.carbonic = 20/1**

**IMPLICAȚII CLINICE:**

**↓ raportului bicarbonat / ac.carbonic = acidoză**
**↑ raportului = alcaloză**

**Dacă pH-ul nu este modificat ⇒ acidoza sau alcaloză e compensată**
**Dacă pH-ul est modificat ⇒ acidoza (pH<7,35) sau alcaloză (pH>7,45) decompensată**

**↓ numărătorului ⇒ ALR (acidoză reap)**
**↓ numitorului ⇒ ALR (alcaloză reap)**
**↑ numărătorului ⇒ ALM (alcaloză metab)**

**Recoltarea ng:** fără anticoagulant

**Material biologic:** ser, nehemolizat

**Conservare:** la temp camerei - până la 24h (flacon etanș)
- refrigerare - până la 3 zile
- congelate - până la 4 săpt

**METODE DE DETERMINARE:**

**1) Metoda climuiu uscată:**
- în stratului de impactare îndepărta pH-ului face ca întaaga
cantității di CO₂ din probă să fie sub formă de bicarbonat
- bicarbonatul diferenală în striat de sal și este utilizat la
carboxilarea FOSFOENOLPIRUVAT → OXAL ACETAT + FOSFAT ANORGANIC

- reacția limală implică oxidarea NADH (catalizat cu malat-dehidrogenază) și reducerea OXALACETAT → NAD⁺ + malat
- măsurarea absorbtiei NADH nitolorit (λ = 340 mm) det conc CO₂ din probă

**2) Metoda tritrimetrică:**

**Principiu:** Carbonații acuzi din ser/plasmă oxalează sent decomipa de HNO₃ (acidul azotic) și acest acid HNO₃ → formeze în prezența iondicatorului sau NaOH (galont pt titrare) o culoare portocaliu-rosu (potocaliu-roz) carbonatelarea`,
        mnemonic: 'VN: 22-30 mmol/l; raport HCO₃/H₂CO₃=20/1; ↓=acidoză; ↑=alcaloză; pH=7.35-7.45',
      },
      {
        front: 'Transaminaze (GOT/ASAT și GPT/ALAT) - Valori normale și semnificație clinică',
        back: `**TRANSAMINAZELE:**

**GOT = ASAT (Transaminaza glutam-oxalacetică sau aspartat aminotransferază):**

**VN ale GOT:**
- **Metoda fără piridoxalfosfat la 37°C (IFCC):**
  - ♀ < 32 U/L sau < 0,50 µkat/L
  - ♂ < 38 U/L sau < 0,60 µkat/L
- **Metoda chimie uscată:**
  - ♀ 14-36 U/L sau 0,23-0,60 µ kat/L
  - ♂ 17-59 U/L sau 0,28-0,98 µ kat/L

**GPT = ALAT (Transaminaza glutam-piruvică sau alanin aminotransferază):**

**VN ale GPT:**
- **Metoda IFCC:**
  - ♀ < 30 U/L sau < 0,50 µ kat/L
  - ♂ < 41 U/L sau < 0,70 µ kat/L
- **Metoda chimie uscată:**
  - ♀ 9-52 U/L sau 0,15-0,86 µ kat/L
  - ♂ 21-72 U/L sau 0,35-1,2 µ kat/L

**IMPLICAȚII CLINICE:**

**Det ASAT (GOT) este utilă în:**
- Diag. motricul afectiunilor musculare și miocardice
- Are specificitate pt celulele din miocard, mușchi scheletic, plămân, rinichi, creier, pancreas, splină și ficat
- În cazul distrugerii celulelor acestor organe ⇒ conc. creștere de ASAT în circulație
- Concentrare: ASAT ↑ în decurs de 12 ore și se menține la valorii ridicate ≈ 5 zile

**↑ marcate GOT (10-100 x VN):**
- Infarct miocardic recent (GOT/GPT > 1)
- Hepatită virală acută sau necroză toxică a ficatului (GOT/GPT < 1)
- Embolie cerebrală

**↑ moderate GOT:**
- Hepatită cronică
- Ictere mecanice
- Ficat de stază
- Mononucleoză infecțioasă
- Anemii hemolitice
- SOC
- Pancreatită acută
- Boli ale musculaturii striate
- Hipotiroidism

**Det ALAT (GPT) este utilă în diag. motricul afectiunilor hepatic:**
- Are specificitate hepatică
- Nu mai găsită în mușchi, cord, rinichi

**↑ marcate GPT (100 x VN):**
- Hepatită virală acută (distrugătare icterică/hepatite de cel hepatic)
- Necroză toxică a ficatului
- Infarct miocardic (GOT/GPT > 1)

**↑ moderate GPT:**
- Hepatită cronică
- Ciroză
- Ficatul de stază cardiacă
- Hipotiroidism
- Mononucleoză
- Deficit de carnitină

**Recoltarea sg:**
- Fără anticoagulant
- Pe EDTA sau heparină

**Material biologic:**
- Ser nehemolizat
- Plasmă pe EDTA sau heparină
- Determinarea se va face în max 4h de la recoltare

**Conservare:**
- La temp. camerei - până la 3 zile
- Refrigerare - 1 săpt
- Congelate - 3 luni
- NU se evită lumina!`,
        mnemonic: 'GOT (ASAT): miocard+ficat; GPT (ALAT): specific hepatic; IMA: GOT/GPT>1; Hepatită: GOT/GPT<1',
      },
      {
        front: 'Metode de determinare a Transaminazelor - Principii',
        back: `**METODE DE DETERMINARE A TRANSAMINAZELOR:**

**1) Metoda colorimetrică cu 2,4-dinitrofenilhidrazina:**

**VN:**
- GOT = TGO = ASAT = 2-20 U/l
- GPT = TGP = ALAT = 2-16,5 U/l

**Principiu:**
- TGO și TGP transferă gruparea (NH₂) amino (NH₂) a unui acid glutamic + cetoacid pe un cetoacid = acid α-ceto-glutaric ⇒
  - acid glutamic + cetoacizi
- ASP = aspartat sau ALH = alanină

**Reacție:**
- ↓+ dinitrofenilhidrazina
- dinitrofenilhidrazona (galbeu)
- ↓+ NaOH 0,4 N
- culoare brun-roșcat (a cărui intensitate est prop cu activitatea enzimelor TGO și TGP)

**2) Metoda enzimatică:**

**Principiul det GOT (cu malateldhidrogenază - MDH ca enzimă auxiliară):**

Activitatea GOT se det prin măsura eliberării oxalacetatului care sub acțiunea MDH (în prezența NADH₂) e transformat în malat și NAD⁺

Rata consumului de NADH₂ e măsurată fotometric la λ = 340 mm și este direct proporțională cu activitatea (GOT) ASAT din probă

L-aspartat + α-cetoglutarat →GOT→ oxalacetat + L-glutamat
oxalacetat + NADH₂ →MDH→ malat + NAD⁺

**Principiul det GPT (cu lactatldhidrogenază LDH ca enzimă auxiliară):**

Activitatea GPT se det prin măsura eliberării piruvatului care sub acțiunea LDH (în prezența NADH₂) e transformat în lactat și NAD⁺

Rata consumului de NADH₂ este măsurată fotometric la λ=340mm și esti direct proporțională cu activitatea GPT (ALAT) din probă

L-alanină + α-cetoglutarat →GPT→ piruvat + L-glutamat
piruvat + NADH₂ →LDH→ lactat + NAD⁺`,
        mnemonic: 'Metode: 2,4-dinitrofenilhidrazina (colorimetric), enzimătică cu MDH (GOT), LDH (GPT); λ=340nm',
      },
      {
        front: 'Principiul determinării pt ALAT - Metoda enzimatică detaliată',
        back: `**PRINCIPIUL DET PT ALAT:**

ALAT din probă pacientului catalizează transferul grupării amino a L-alaninnei la α-ketoglutarat ⇒ piruvat + glutamat, iar lactat-dehidrogenaza (LDH) catalizează conversia piruvatului și NADH-ul în lactate și NAD⁺

Rata de oxidare a NADH-ului este măsurată la 340 mm

**PRINCIPIUL DET PT ASAT:**

ASAT transferă gruparea amino de L-aspartat către α-keto-glutarat în prezența pyridoxal-5-fosfat (P-S-P) ⇒
⇒ glutamat + oxalacetat

oxalacetatdicarboxilana
↓
CO₂ + piruvat
↓
oxidat prin PIRUVAT OXIDAZĂ
↓
ACETILFOSFAT + H₂O₂ (peroxid de hidrogon)

Etapa finală a reacției include oxidarea catalizată de peroxidază a colorantului leuco ⇒ compus colorat (λ = 670 mm)`,
        mnemonic: 'ALAT: alanină → piruvat (LDH); ASAT: aspartat → oxalacetat → piruvat (oxidază); λ=340mm (ALAT), 670mm (ASAT)',
      },
      {
        front: 'Fosfatază Alcalină (FAL) - Valori normale și semnificație clinică',
        back: `**FOSFATAZA ALCALINĂ (FAL):**

**VN - Metoda cinetic-colorimetrică cu paranitrofenilfosfat:**
- **Femei:** < 240 U/L sau < 4 µkat/L
- **Bărbați:** < 270 U/L sau < 4,15 µkat/L

**VN de funcție de vârstă:**
- **< 1 an:** < 600 U/L
- **2-5 ani:** < 553 U/L
- **6 ani-6 luni:** < 1026 U/L
- **7-12 luni:** < 1107 U/L
- **1-3 ani:** < 673 U/L
- **4-6 ani:** < 644 U/L
- **7-12 ani:** < 720 U/L
- **13-17 ani (fete):** < 448
- **13-17 ani (băieți):** < 936

**Chimie uscată:** VN adulți 38-278 U/L

**Metoda standard DGKC:**
- **Femei:** < 145 U/L
- **Bărbați:** < 155 U/L
- **Copii:** < 480 U/L
- **Nou-născuți:** < 920 U/L

**Metoda IFCC:** VN < 113 U/L

**Metoda Bodansky:**
- **VN adulți:** 2-6 u. Bodansky
- **Copii:** 6-16 u. Bodansky

**Metoda King-Armstrong:**
- **VN adulți:** 4-12 u. King
- **Copii:** până la 20 u. King

**IMPLICAȚII CLINICE:**

**Det fosfatazei alcaline și are este utilă pt diagn. afecțiunilor osoase și hepato-biliare.**

**Fosfataza alcalină hidrolizează difosfil esteri organici și fosfatele:**
- Are o activitate maximă la pH=8,5-10 și este produsă în:
  - Osteoblaste
  - Hepatocite
  - Celulele canaliculelor biliare
  - Rinichi
  - Intestin
  - Placentă

**Valori ↑:**
- Afecțiuni hepato-biliare (↑ FAL ⇒ ↑ GOT/GPT)
- Ciroză hepatică
- Ciroză biliană
- Metastaze hepatice
- Ictru mecanic (obstructiv)
- Afecțiuni osoase:
  - Rahitism
  - b. Paget (context de fracturi)
  - b. Recklinghausen (osteită fibroasă)
  - Tumori osoase → carcinom metastatic al oaselor
  - Sarcgm osteogenic
- b. Hodgkin
- Spondilită ankilopoietică
- Hiperparatiroidism primar
- În perioada de creștere creștere
- În perioada înoaimărnii până o fractură și în adolescență (↑ metab. osos)
- Alte afecțiuni: (↑ metab. osos)
  - Infarct renal
  - În complicațiile sarcoinii
  - Afecțiuni hepatocelulare
  - Rar cu hipertiroidism

**Valori ↓:**
- Hipotiroidism
- Carență de proteine
- Nanizm hipofizar
- Anemie gravă
- După tratament cu vit D (în cazurina vindecărio rahitismului)`,
        mnemonic: 'VN adulți: ♀<240, ♂<270 U/L; ↑FAL=afecțiuni osoase+hepato-biliare; Copii: valori mult ↑ (creștere)',
      },
      {
        front: 'Metode de determinare a Fosfatazei Alcaline - Principii',
        back: `**METODE DE DETERMINARE A FAL:**

**Material biologic:**
- Ser, nehemolizat
- Plasmă

**Conservare:**
- La temp. camerei sau temp. mai joară - 4 zile

**1) Metoda chimie uscată:**

**Principiu:** FAl (Fosfataza alcalină) din probă catalizază (la un pH alcalin) hidroliza p-nitrofeuil fosfatului la p-nitrofenyl care prezintă un maxim de absorbție al luminii la 400 mm

**2) Metoda Kaabe și Brock:**

**Principiu:** Fosfataza alcalină din ser acționează asupra substratului dinatrium-phenyl-fosfat și eliberează fosfr anorganic care dece o mearca pt o activitatea enximei din probă

**3) Metoda cinetic-colorimetrică cu PARANITROFENILFOSFAT:**

**Principiu:** Fosfataza alcalină din ser catalizează hidroliza substratului paranitro-phenyl-fosfatului (în mediu alcalin) și eliberează ion fosfat și paranitrofeuof de culoare galbuie care se fotometrează la 405 mm, ionii de Mg²⁺ sporesc activitatea enzimei

**4) Metoda King-Armstrong (fără fosfat dizodic):**

**Principiu:** Fosfataza alcalină din ser catalizează hidroliza substratului fenil-fosfatdizodic și eliberează fenol care det o reacție de culoare cu reactivul FOLIN CIOCALTEU

**5) Metoda BODANSKI (beta-glicerofosfat de sodiu):**

**Principiu:** Fosfataza alcalină din ser catalizează hidroliza substratului β-glicerofosfat de Na și eliberează fosfat anorganic care se dozează`,
        mnemonic: 'Metode: chimie uscată (λ=400mm), Kaabe-Brock, paranitrofenilfosfat (λ=405mm), King-Armstrong (Folin), Bodanski (β-glicerofosfat)',
      },
      {
        front: 'Fosfatază Acidă (FAC) - Valori normale și semnificație clinică',
        back: `**FOSFATAZA ACIDĂ (FAC):**

**VN - metoda colorimetrică HILLMANN:**
- **FAC totală:**
  - Femei < 10 U/L
  - Bărbați < 7,8 U/L
- **FAC prostatică:** < 4,3 U/L

**Metoda PARANITROFENILFOSFAT:**
- **FAC totală:**
  - Femei: 5-10 U/L
  - Bărbați: 4,7-13,5 U/L
- **FAC prostatică:** < 3,6 U/L

**IMPLICAȚII CLINICE:**

**Fosfataza acidă este numele dat unui grup de fosfataze cu activitate optimă sub pH=7 și care sunt prezente în:**
- Prostată
- Ficat
- Splină
- Endocratic
- Trombocite

**Det fracțiunii prostatice vizează:**
- Diagnl. cancerului de prostată și a metastazelor osoase de la nivelul prostatic (prostata eliberează fosfataza acida în circulația în momentul când a început metaștarea)
- Urmărirea evolutiei sub tratament (chirurg sau extragenic) a cancerului de prostată (trebuie sa ↓ FAC)

**Valori ↑ ale FAC totală:**
- Cancinom de prostată (↑↑↑ mult) (mai ales prin metastază)
- Adenom de prostată (↑ ușor)
- Mițiunea osoase și hepatice
- Embolie pulmonară
- Hemoliză
- CID
- Boala Paget
- Boală Gaucher

**Valori ↑ ale FAC (valori ↑ ușor):**
- Hiperparatiroidism
- Mielom multiplu
- Ictre obstructiv
- IRA

**În carcinom de prostată = PSA este mai specific decât FAC**

**Reglarea sg:**
- Fără anticoagulant
- Pe heparină sau Na/Li

**Material biologic:**
- Ser, nehemolizat
- Plasmă

**Conservare:**
- La temp. camerei = până 24h
- Refrigerare → 1 săpt
- Congelate → 3 luni`,
        mnemonic: 'VN ♂<7.8, ♀<10 U/L; FAC prostatică <3.6; ↑↑↑=carcinom prostată; PSA mai specific decât FAC',
      },
      {
        front: 'Metode de determinare a Fosfatazei Acide - Principii',
        back: `**METODE DE DETERMINARE A FAC:**

**1) Metoda colorimetrică HILLMANN (α-naftilfosfat):**

**Principiu:** Fosfataza acidă din ser catalizează transformarea α-naftilfosfatului → fosfor anorganic + 1 naftol

1 naftol + 4-cloro-2-metilfeuil-diazoniu-sare ⇒ azoderinat colorat fotometribil la 405 mm

Fosfataza acidă prostatică (inhibitor de tartrat) = FAC totală - FAC neprostatică (neînhibată de tartrat)

**2) Metoda cu paranitrofenilfosfat:**

**Principiu:** FAC din ser catalizează hidroliza paranitrofenilfosfatului de Na (la pH=4,9) → ion fosfat + paranitrofe

care în mediu alcalin este colorat în galbren

Se det: FAC prostatică = FAC totală - FAC neprostatică

**3) Metoda chimie uscată:**

**Principiu:** - FAC din probă hidrolizează (la pH = 5,5) α-naftil fosfatul cu formoare de α-naftol

- 4,5 pentanodiol și 4,4 liutanodiolul servesc drupe acceptori de fosfat pt a activa preferential fractiunea prostatică a fosfatazei acide

- α naftolul ne leagă de sare divto a 4 cloro-2-metilfeuridiazonin cu formarea unui compus colorat; intensitatea culori citindieu la 600 mm

- Rata de formare a complexului colorat este proporțională cu cantitatea de fosfatază acidă prezentă în secințiuri`,
        mnemonic: 'Metode: Hillmann (α-naftilfosfat, λ=405mm), paranitrofenilfosfat (pH=4.9), chimie uscată (λ=600mm); Tartrat inhibă FAC prostatică',
      },
      {
        front: 'Alfa-Amilaza din sânge - Valori normale și semnificație clinică',
        back: `**DETERMINAREA ALFA-AMILAZEI DIN SÂNGE:**

**VN - metoda chimie uscată:**
- **VN = 30-110 U/L**

**Metoda clor-iodinfoeuil malto heptaozida:**
- **VN < 100 U/L**

**Metoda Wohlgemuth:**
- **VN = 8-32 U Wl /ml**

**Metoda Richterich:**
- **VN = 230-2730 UI**

**IMPLICAȚII CLINICE:**

**Amilaza este o enzimă digestivă ce realizează conversia amidonului în glucoză:**
- Este produsă din celulele pancreasului exocrim, glandele salivare
- Dacă se produce o inflamație pancreatică sau a glandelor salivare valorile în sânge o cantitate crescută de amilară
- Utilă în dg. pancreatitei și a inflamațiilor glandelor salivare

**↑↑ marcate ale amilazei:**
- Pancreatită acută nehemoragică
- Criserie

**↑ moderate:**
- Cancen de cap de pancreas
- Afecțiuni ale glandelor salivare (parotidită acută, calculi salvari)
- Obstrucția intestinului
- Narcință tulureri ruptă
- Hipertiroidizm
- Rupbură de anevrism aortic
- Tratament cu clortiazidă`,
        mnemonic: 'VN: 30-110 U/L; ↑↑=pancreatită acută; ↑=parotidită, obstrucție intestinală; Amilază digestivă (amidon→glucoză)',
      },
      {
        front: 'Metode de determinare a Alfa-Amilazei - Principii',
        back: `**METODE DE DETERMINARE A ALFA-AMILAZEI:**

**Recoltarea sg:** fără anticoagulant, pe heparină

**Material biologic:**
- Ser, nehemolizat
- Plasmă (are o activit enzimatică cu 20 U/L mai mare decât ser)

**Mod de conservare:**
- La temp. camerei - 7 zile
- Refrigerare - 1 lună
- NU evită congelarea!

**1) Metoda chimie uscată:**

**Principiu:** Amilaza din ser este distribuită uniform de stratul de imprastere care conține un substrat de amidon pt reacție și catalizează hidroliza acestuia la zaharide puțin colorate; care defirează în stratului uruetor de reactiv

Deosebițarea de reflecțio la zaharidelo colorate în stratului de reactiv fiind măsurate prinn spectrofotometrie (540mm la 2,3 și 5 min), schimbarea densitatii de reflectio între cel 2 citiri fiind prop. cu activitatea amilazei din probă

**2) Metoda Wohlgemuth:**

**Principiu:** Alfa-amilare catalizează degradarea

AMIDONULUI → DEXTRINE + MALTOZĂ

Amidonul ramas + IOD → compus colorat în albastru

Se citește ultima epruhetă cu continut încolor în care enxoma încă mai este suficientă pt a hidroliza întreg amidonul

**3) Metoda colorimetrică Richterich:**

**Principiu:** Alfa-amilare catalizează degradarea amidonului, iar

AMIDONUL ramas + iod → compus colorat în albastru, care se fotometrează și care este invers prop. cu activitatea enzimei din materialul analizat`,
        mnemonic: 'Metode: chimie uscată (λ=540mm), Wohlgemuth (amidon+IOD→albastru), Richterich (colorimetric); Conservare: 7 zile (temp), 1 lună (frigider)',
      },
      {
        front: 'Lactat Dehidrogenaza (LDH) - Valori normale și izoenzime',
        back: `**DETERMINAREA LACTAT DEHIDROGENAZEI ÎN SER:**

**VN - metoda chimie uscată (U/L sau µkat/l):**
- **VN = 312-617 U/L sau 5,2-10,3 µkat/l**

**Metoda IFCC:**
- **VN = 230-460 U/L sau 3,84-7,67 µkat/l**

**Metoda standard (DGKC):**
- **Femei:** < 215 U/L sau < 3,5 µkat/l
- **Bărbați:** < 225 U/L sau < 3,75 µ kat/l
- **Copii:** < 300 U/L sau < 5 µ kat/l
- **(m-m) Nou-născuți:** Nou-născuți < 600 U/L; < 10 µkat/l

**IMPLICAȚII CLINICE:**

**Determinarea enzimei are drept scop:**
- Confirmarea diagn. de infarct miocardic sau infarct pulmonar
- Diagnostic diferențial dintre distrofia musculară și aneuzia pernicioasă
- Diagn. seminoamelor, LDH-ul fiind un marker tumoral în acești tumori

**LDH-ul este o enzimă prezentă în majoritatea terodurilor organismului, mai ales:**
- Cord
- Cor
- Rinichi
- Plămâni
- Ficat
- Mușchi scheletic
- Creier

**Se cunosc 5 izoenzime LDH formatie din asocieri de toue tetrameră a subunițelor 4 de origine miocardică și a subunitățiilor M de origine musculară sau hepatică:**
- LDH₁ (sau 4H)
- LDH₂ (3H + 1 M)
- LDH₃ (2H + 2 M)
- LDH₄ (1H + 3 M)
- LDH₅ (4 M)

În proporții: 20:34:23:12:11`,
        mnemonic: 'VN: 312-617 U/L; 5 izoenzime (LDH₁-₅); LDH₁,₂=miocard; LDH₄,₅=ficat+mușchi; IMA: LDH₁>LDH₂',
      },
      {
        front: 'LDH - Semnificație clinică a izoenzimelor și metode de determinare',
        back: `**IZOENZIME LDH - SEMNIFICAȚIE CLINICĂ:**

**Valori ↑ LDH acute (iaraste procesie de necroze cu elibereaze LDH extracelular):**

- **IMA la 6-12 ore (LDH-ul se menține ↑ mai mult timp decât CK):**
  - Activitatea LDH₁ și LDH₂ ↓ după 4-5 zile și revin la normal și 8-14 zile
- **Infarct pulmonar**
- **Infarct renal acutt**
- **Anemiile pernicioare (LDH₁ și LDH₂)**
- **Hepatită epidemică (repatrarea izoenzimelor LDH este cu ttant mai sevitol înainte de apariția anumelor clinice ale od icteice)**
- **Tumori maligne (seminoame)**
- **Necroză hepatică (LDH₅)**
- **Traumatizam mușchi striați**
- **Trombază cerebrală**
- **Leucemie acută**
- **Mononucleoză infecțioasă**

**Recoltarea sg:**
- Fără anticoagulant
- Pe heparină

**Material biologic:**
- Ser, nehemolizat
- Plasmă

**Conservare:**
- La temp. camerei = până la 2 zile
- NU se recomandă refrigerare sau congelate

**AFECȚIUNI CLINICE ↑ IZOENZIME:**

**↑ izoenzimale:**

- **IMA:** LDH₁ > LDH₂
- **Infarct cerebral renal:** LDH₁ > LDH₂
- **Anemie pernicioasă:** LDH₁, LDH₂
- **Criză de riclenii:** LDH₁, LDH₂
- **Arsuri electrice și traude:** LDH₅
- **Traumatizm:**
- **IMA cu congeptie hepatică:** LDH₁, LDH₅
- **Limfoarre maligne:** LDH₃, LDH₄
- **LMC în puseu:** LDH₃ (la > 90% din cazuri)
- **Carcinom de prostată:** LDH₅, LDH₄ > 1
- **Dermatomioazită:** LDH₅
- **LES:** LDH₃, LDH₄
- **Colagenaze:** LDH₂, LDH₃, LDH₄
- **Embolievni infarct pulmonar:** > LDH₂, LDH₃, LDH₄
- **ICC:** LDH₂, LDH₃, LDH₅
- **Infecții virale:** LDH₂, LDH₃, LDH₅
- **Neoplagma:** LDH₂, LDH₃, LDH₅
- **Tumori maligne SNC:** LDH₅
- **Efortuti fizice epuizante:** LDH₄, LDH₅

**METODE DE DETERMINARE A LDH:**

**1) Metoda enzimatică cu clor-nitroteluil maltoheptaozida:**

**Principiu:** Alfa-hidruxibutirat dehidrogenoza din ser catalizează transformarea alfa-catolitritratul (cu consum NADH₂) în alfa-hidroxibutirat (cu producere de NAD⁺)

Rata consumului de NADH₂ se det fotometric la 340 mm și este direct prop. cu activitatea enzimei din probă

**4) Metoda electroforutică de separare a izoenzimelor LDH:**

**Principiu:** Izoenzimele LDH ne separă prin electroforeză pe acetat de cehi celulară transforma LACTATIRE în PIRUVAT (cu concem de NAD⁺ și producere de NADH₂), iar METASULFATUL DE FENOZINA incu atoma de H de la NADH₂ la albastru de tetrazolium ⇒ FORMAZAN VIOLET`,
        mnemonic: 'IMA: LDH₁>LDH₂ (6-12h, revine 8-14 zile); Hepatită: LDH₅; Anemie: LDH₁,₂; Electroforeză separă izoenzimele',
      },
      {
        front: 'Creatinfosfokinaza (CPK/CK) - Valori normale și izoenzime',
        back: `**DETERMINAREA CREATIN FOSFOKINAZEI TOTALE ÎN SER (CPK):**

**VN - metoda chimie uscată:**
- **30-170 U/L**

**Metoda standard DGKC:**
- **Femei:** < 145 U/L
- **Bărbați:** < 170 U/L

**Metoda IFCC:**
- **Femei:** < 167 U/L
- **Bărbați:** < 170 U/L
- **m-m:** < 712 U/L

**IMPLICAȚII CLINICE:**

**Det CPK în ser vizează:**
- dg. infarctului miocardic și a distrofiei musculare
- Urmărirea evolutiei afecțiunilor inflamatorii ale muschiului
- sd Reye

**CPK este prezentă în:**
- Miocard, mușchi scheletic (în cantități mari)
- Creier (în cantități reduse)

**CPK are 3 izoenzime:**
- **Izoenzima MB** → în miocard
- **Izoenzima MM** → predominant în m. scheletic (dar și în miocard)
- **Izoenzima BB** → în creier, tract gro gastro-intestinal și genito-urinar

**Valori ↑ CK (=CPK):**
- Infarct miocardic (↑ izoenzima MB = indicator cu specificitate mai ridicultats decât CK totală)
- După defibrillare
- După manag cardiac extern
- După angiografie coronariană
- Distrofie musculară Duchenne
- Afecțiuni ale sist. nervors
- Șot fizic acut`,
        mnemonic: 'VN: 30-170 U/L; 3 izoenzime: MB (miocard), MM (scheletic), BB (creier); IMA: ↑CK-MB (6-12h, revine 48-72h)',
      },
      {
        front: 'Metode de determinare a CPK și izoenzima CK-MB - Principii',
        back: `**METODE DE DETERMINARE A CPK:**

**Recoltarea sg:** fără anticoagulant, pe heparină sau EDTA

**Material biologic:**
- Ser, nehemolizat
- Plasmă

**Mod de conservare:**
- La temp. camerei → până la 4 ore
- Refrigerare → 5 zile
- Congelate → 1 an

**1) Metoda chimie uscată:**

**Principiu:** N-acetilcisteina activează CPK din probă, care este distribuită uniform de stratul de imprestare către stratul-cuale măsulre

unde catalizează conversia:
- creatinin fosfat + ADP → creatină + ATP
- În prezență glucerol kimarei (GK), glucotul este fosforilut de către ATP cu formarea de 1-α-gluceolfosfat
- sub acțiunea 1-α-gluceolfosfat oxidărei (α-GPO) are loc oxidarea 1-α-gluceolfosfatului la dehidroxiaceton fosfat și peroxid de hidrogen (H₂O₂)
- H₂O₂ oxidează un coloraut leuco în prezența PEROXIDAZEI cu formarea unui compus colorat (λ = 670 mm)

**2) Metoda cinetică cu N-acetilcisteină (NAC):**

**Principiu:** CPK catalizează reacția dintre FOSFATUL DE CREATINĂ + ADP → CREATINĂ + ATP

hexokinaza catalizează reacția
- ATP + glucoză → ADP + glucoză-6-fosfat
- glucoză-6-fosfat-dehidrogenaza transformă
  - glucoză-6-fosfat + NADP → 6-fosfo gluconat + NADPH₂

al cărui consum este măsurată la 340mm și este direct prop. cu activitatea CPK din probă

**DETERMINAREA CPK-MB ÎN SER:**

**VN:** - metoda chimie uscată: 0-16 U/L
- metoda standard DGKC:
  - Femei < 15 U/L
  - Bărbați < 20 U/L
- metoda cinetică cu NAC (N-acetilcisteină): 0-24 U/L

**IMPLICAȚII CLINICE:**

- Izoenzima CPK-MB se găsește în mușchiul cardiac și în concentrații mică în m. scheletic
- Este importantă în înfarctul miocardico (IM) unde atinge voia cea mai înaltă între 20i 24 ore după IM și revine la normal în 48-78 h și cazurile fără complicații
- CK-MB ↑ → miocardită
  - Distrofie musculară Duchenne
  - Poliomiozită

**Recoltarea sg:** fără anticoagulant, pe heparină sau EDTA

**Material biologic:**
- Ser nehemolizat
- Plasmă

**Conservare:**
- La temp. camerei = până la 4 ore
- Refrigerare = 2 zile
- Congelate = 1 an

**METODE:**

**1) Metoda imunologică-cinetică cu NAC (N-acetilcisteină):**

**Principiu:** Anticorpi policlonali anti-umani din reactive inhibă activitátei subunitățti CK-M din izoenzima CK-MB, care se găsește în probă fară să afecteze activitatea subunității CK-B și prin urmare se va determine numai activitatea subunității CK-B

- CK-B catalizează reacția: fosfatul de creatină + ADP → creatină + ATP
- hexokinaza catalizează reacția: ATP + glucoză → ADP + glucoză-6-fosfat
- glucoză-6-fosfat-dehidrogenaza transformă glucoză-6-fosfat + NADP → 6-fosfo-gluconat + NADPH₂

al cărui consum este măsurată la 340 mm și este direct prop. cu activitatea CK-B din probă

- activitatea enzimei CK-MB = CK-B (U/L) x 2
- metoda det și activit izoenzimei CK-BB împreună pentru că urmeară regulatetul exprimă doar activitațtea CK-B

**2) Metoda chimie uscată:**

**Principiu:** - N-acetilcisteina (NAC) activează CK
- CK din probă distribuită uniform de stratul de imprastere către stratul cu reactiv nutricand, unde catalizează conversia
- creatin fosfat + ADP → creatină + ATP
- În prezență glucerol kimarei (GK), glucotul este fosforulat de ATP → 1-α-gluceolfosfat
- 1-α-gluceolfosfat este oxidat → 1-α-glucerolfosfatoxidaza
  - α GPO → dehidroxiaceton fosfat + H₂O₂
- H₂O₂ oxidează un coloraut leuco în prezența peroxidazei (POB) → compus colorat (citrire la 670 mm)`,
        mnemonic: 'Metode: chimie uscată (λ=670mm), NAC (λ=340mm); CK-MB = CK-B x 2; Inhibă CK-M cu anticorpi → măsoară CK-B',
      },
      {
        front: 'Examenul de urină - Recoltarea probei şi condiții generale',
        back: `**RECOLTAREA URINEI:**

**Modalități de recoltare:**
1. Urină proaspătă "de dimineață" - probă suveră de urină
2. Urină recoltată pe interval prelungit de timp (12 ore, 24 ore)
3. Urină recoltată pe un anumit interval redus de timp (3 ore)
4. Probă de urină recoltată prin cateterizarea vezicii urinare
5. Recoltarea oferită prin înjumămțirea urinei şi analiza ei citologică

**URINĂ PROASPĂTĂ "DE DIMINEAȚĂ":**
- Ideală pentru examenul sumamului de urină
- Reduce riscul contaminării: se spală mâinile şi organele genitale cu apă şi săpun (fără substanțe dezinfectante)

**RECOLTAREA JETULUI MIJLOCIU:**
- Primul jet şi ultimul jet NU se recoltează
- Se recoltează doar jetul mijlociu urinar
- Jetul primar poate fi contaminat cu elemente celulare şi bacteriene

**Note importante:**
- Pacientul urinează direct în recipientul de urină recomandat
- Când urină se obține prin cateter vezical, se clampează cateterul ~15 min înainte de recoltare
- Urină de dimineață este lipsită de influențe alimentare, de influența efortului fizic
- Urină dimineață e mai concentrată
- NU se recoltează la femei în perioada menstruală
- NU se recoltează la copii din scutec`,
        mnemonic: 'Recolt: dimineață, nemâncate; jet mijlociu; evită menstruație; cateter: clampează 15min',
      },
      {
        front: 'Examenul fizic al urinei - Volumul, densitatea şi pH-ul urinar',
        back: `**I. EXAMENUL FIZIC:**

**1) Volumul urinei (VN):**
- **Adulți:** 1200-1600 ml/24h (1/2-3/4 din lichide eliminate)
- **Nou-născuți:** 30-60 ml/24h
- **3-70 zile:** 180-300 ml/24h
- **1 an:** 400-500 ml/24h
- **8 ani:** 1000 ml/24h

**Oligur ie** = < 800 ml/24h (vărsături, diabet, b. renale, GNA)

**Poliurie** = > 2000 ml/24h:
- Fiziologică: frig, umorescat, apor mare de lichide
- Patologică: diabet zaharat, epilepsie, GN, TBC renal, Cushing

**2) Densitatea urinară:**
- **VN = 1015-1025 (1003-1035)**
- **Isostenurie:** densitate < 1010
- **Hipostenurie:** densitate < 1008
- Pierderea capacității de concentrare nu indică disfuncție renală

**3) Osmolaritatea urinară:**
- Riniclul N concentrează U la 500-1400 mosm/kg
- În exces renal = 40-80 mosm/kg

**4) pH-ul urinar = H⁺:**
- **VN = 5,8-7,8** (val extrem = 4,7-8,2)
- Diagnosticul afecțiilor renale: indicator al capacității tubilor renali de a menține concentrația H⁺
- Monitorizarea terapiei sau regimului alimentar

**pH urinar:**
- **Urină alcal ină:** vărsături, infecții tract urinar, metabolice, bicarbonat Na
- **Urină acidă:** diabet, febră, acidoză, IRC`,
        mnemonic: 'Vol: 1200-1600ml/24h; Dens: 1015-1025; pH: 5.8-7.8; Oligu<800ml; Poliu>2000ml',
      },
      {
        front: 'Examenul fizic al urinei - Culoarea şi aspectul (turbiditatea)',
        back: `**5) Culoarea urinei:**

**Normal:** galben-topazică (pigmentație: UROCROM, UROBILIN, PORFIRINĂ)

**Modificări de culoare:**
- **Incoloră:** poliurie foarte diluată
- **Galben-închisă:** urină concentrată, bilirubină, febră
- **Galben-portocaliu:** bilirubină crescută, rifampicină
- **Brun-închis:** pigmenți biliari (bilirubin, biliverdină)
- **Roșu:** sânge, Hb, consumul sfecla roșie
- **Alb-lăptoasă:** chilurie, leucurie
- **Verde-albastru:** albastru de metil

**6) Turbiditatea:**

**Normal:** urină proaspătă = uşor limpede, nu are semnificație clinică

**După câteva ore:**
- Turbiditatea apare din precipitații (nu precipită din urină pe cale descenză)
- Excretică oferită prin înjumămțirea urinei şi analiza ei citologică

**Cauze turbiditate:**
- Bacterii (infecții tract urinar)
- Leucocite (piurie)
- Eryitrocite (hematuria)
- Cristale (fosfaţi, uraţi, oxalați)
- Mucus
- Celule epiteliale`,
        mnemonic: 'Culoare N: galben-topazic; Roșu=sânge/Hb; Lăptos=chilurie; Turbid=bacterii/leucocite/cristale',
      },
      {
        front: 'Determinarea Sodiului (Na) în urină - Valori normale şi semnificație',
        back: `**DOZAREA Na ÎN URINĂ:**

**VALORI NORMALE:**
- **Flamfotometrie:** 40-220 mEq/24h (mmol/24h)
- **Chimie uscată:** 54-150 mEq/l urină spontană

**IMPLICAȚII CLINICE:**

**Na apreciază:**
- Echilibrul ionic (pompa Na/K intravină menține balanta ionică)
- EAB (echilibrul acido-bazic) prin combinare cu Cl sau bicarbonat
- Funcția tubulurilor renale şi glandelor suprarenale

**Valori ↑ Na urinar:**
- Aport mai crescut
- Administrare diuretice (mercuriale, clortiazol) → urină bogată Na, Cl, K
- Dehidratare
- Insuficiență renală cronică (IRC)
- Nefropatii

**Valori ↓ Na urinar:**
- Aport scăzut
- Insuficiență cardiacă
- Insuficiență hepatică
- Sindrom nefrotic

**Material biologic:** Urină /24h

**Conservare:**
- Temp. camerei: până la 4 zile
- Refrigerare: 7 zile
- Congelare: 6 luni`,
        mnemonic: 'Na: 40-220 mEq/24h; ↑=diuretice/IRC; ↓=insuf.cardiac/hepatic; Conserv: 4z camera/7z frigider',
      },
      {
        front: 'Determinarea Calciului (Ca) urinar - Metoda Sulkovitch',
        back: `**DOZAREA Ca URINAR:**

**VALORI NORMALE:**
- **VN = 100-300 mg/24h**
- **VN = 2,5-7,5 mmol/24h**

**IMPLICAȚII CLINICE:**

**Determinare Ca în urină de 24h:**
- Evaluarea glandelor paratiroide
- Paratiroidism = principal factor reglator al echilibrului fosfo-calcic

**Hiperparatiroidism:**
- ↑ excretția urinară de Ca (detecte hipersecreție paratiroidului)

**Hipoparatiroidism:**
- ↓ excretția urinară de Ca

**Eliminarea Ca:** în cea mai parte pe calea digestivă (fecale)

**Valori ↑ Ca urinar:**
- Administrare glucocorticoizi şi vit D
- Hiperparatiroidism
- Acidoză tubulară renală
- Sd. Fanconi
- Sarcoidoză
- B. Wilson
- Mielom cu invaziei osoasă
- Neoplasm pulmonar
- Metastaze

**Material biologic:** Urină /24h

**Conservare:** Temp. camerei 5 zile / Refrigerare săptămâni / Congelare 6 luni

**METODA SULKOVITCH:**

**Principiu:** Ca din urină precipitat cu amestec de oxalați (acid oxalic + oxalat de NH₄)

**Interpretare:** Intensitatea precipitatului şi turbidității indică gradul Ca-ureic

**Metoda colorimetrică cu o-cresolftaleină:**
- Ca + o-cresolftaleină în mediu alcalin → complex colorat
- Măsurat la λ = 520 nm`,
        mnemonic: 'Ca: 100-300mg/24h; Sulkovitch: precipitat oxalați; ↑=hiperparatir/sarc; ↓=hipoparatir',
      },
      {
        front: 'Determinarea Fosforului (P) şi Magneziului (Mg) urinar - Metode',
        back: `**DOZAREA P URINAR:**

**METODA MOLIBDAT DE AMONIU:**

**VN = 0,3-1 g/24h** sau **VN = 11-32 mmol/24h**
**VN = 40-440 mg/dl** (prima urină de dimineață)

**Chimie uscată:** VN = 0,4-4,3 g/24h sau 12,9-41,9 mmol/24h

**IMPLICAȚII:**
- Estimează nivelul PTH din sânge
- Are valoare diagnostică pentru hiperparatiroidism

**Valori ↑ P urinar:**
- Hiperparatiroidism
- Osteomalacie
- Leucemie

**Valori ↓ P urinar:** ↑ P sânge = nefrite

**PRINCIPIU:** P urinar + molibdat NH₄ în pH acid → fosfomolibdat NH₄
- Reducere cu sulfat → complex albastru (λ=730 nm)

**DOZAREA Mg URINAR:**

**VN adulți = 50-100 mg/24h** sau **2-4 mmol/24h**

**IMPLICAȚII:**
- Util în evaluarea deficitului de Mg
- Afecțiuni renale

**METODA CU ALBASTRU DE XILIDINĂ:**

**Principiu:** Mg + albastru xilidină → complex solubil roșu (proporțional cu conc Mg)

**Metoda cu galbeu titan:**
Galbeu titan + Mg în mediu alcalin → complex roșu-portocaliu

**Material:** Urină 24h acidificată (precipitarea Mg)

**Conservare:** Refrigerare 72h`,
        mnemonic: 'P: 0.3-1g/24h; Molibdat→albastru (λ=730nm); Mg: 50-100mg/24h; Xilidină→roșu; Acidifiere necesară',
      },
      {
        front: 'Determinarea Clorurii (Cl) în urină - Titrare mercurimetrică',
        back: `**DOZAREA Cl URINAR:**

**VALORI NORMALE:**
- **Titrare mercurimetrică:** 165-250 mmol/24h
- **Chimie uscată:** 110-250 mmol/24h

**IMPLICAȚII CLINICE:**

- Evaluarea echilibrului ionic
- Evaluarea standard de dehidratare
- Monitorizarea eficității restricției de NaCl la bolnavi cu afecțiuni CV, renale, hepatice

**Valori ↓ Cl urinar:**
- ↓ aport
- Malabsorbție
- Transpirație excesivă
- Diaree
- Vărsături (stenoză pilorică)
- Nefrit
- Enteritis
- ICC (insuficiență cardiacă congestivă)

**Valori ↑ Cl urinar:**
- Deshidratare
- Diuretice
- Sindrom Addison

**METODA DE TITRARE MERCURIMETRICĂ:**

**Principiu:**

1) Ionii de Hg (din nitrat mercuric) precipită Cl urinar → HgCl (clorură de mercur)

2) Excesul de ioni Hg (fără Cl de precipitat) + difenilcarbazona → formează complex violet

(Reactorul difenilcarbazona se oxidează şi devine colorat roșu-violet)

**Material:** Urină /24h

**Conservare:** Temp camerei 3 zile / Refrigerare 5 zile / Congelare 6 luni`,
        mnemonic: 'Cl: 165-250 mmol/24h; Titrare Hg: Hg+Cl→precipitat+difenilcarb→violet; ↓=vărsături/diaree; ↑=deshidrat',
      },
      {
        front: 'Examenul chimic al urinei - Proteinurie: Metode şi semnificație',
        back: `**PROTEINURIA - Determinarea proteinelor în urină:**

**VALORI NORMALE:**
- **Metoda turbiditate termică:** < 10 mg/dl
- **Chimie uscată:** 0-8 mg/dl

**IMPLICAȚII CLINICE:**

**Proteinuria poate apare:**
- Datorită unei secretii prelungă sau a unei simptom
- Din scurgerea vaginală
- În stări febri le sau convulsive
- În intoxicații medicamentoase (acid salicilic, chimieă etc)
- Afecțiuni renale
- După eforturi fizice

**Ex: în nefrita acută:** ↓ albuminurei împlică progress benignă

**Proteinurie NON-PATOLOGICĂ (funcțională):**
- Efort fizic
- Stres emoțional
- Expunere la frig
- Postură ortostatică

**Proteinurie PATOLOGICĂ:**
- Boli renale: glomerulonefrită, nefroză
- Infecții tract urinar
- Diabet zaharat
- Afecțiuni hepatice
- Tulburări cardiovasculare

**METODA CU ACID SULFOSALICILIC:**

**Principiu:** Proteine urinare + acid sulfosalicilic → turbiditate (precipitat)

**Interpretare:**
- (U) înnoire dată = P absent C
- Creştere uşoară = urină de Pi (↓)
- Opalesceță uşoară = 1+ (10-30 mg/dl)
- Turbiditate netă = 2+ (30-100 mg/dl)
- Turbiditate marcată cu proteine = 3+ (100-300 mg/dl)
- Turbiditate cu floculenți = 4+ (300-1000 mg/dl)

**Material:** Urină proaspătă

**Conservare:** Temp camerei 3 zile / Refrigerare 7 zile / Congelare metodinfinat`,
        mnemonic: 'Proteinurie N:<10mg/dl; Acid sulfosalicilic→turbiditate; 1+=10-30; 2+=30-100; 3+=100-300; 4+>300mg/dl',
      },
    ],
  },
]
