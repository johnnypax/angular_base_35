# Il museo intelligente

Un cliente vuole realizzare una piccola applicazione web dedicata alla scoperta dei musei di una città.

L’idea è permettere all’utente di scegliere un percorso museale in base a una determinata tematica, ad esempio arte moderna, archeologia, storia o scienza. Ogni percorso è composto da più musei e il cliente vuole che questi vengano mostrati su una mappa basata su OpenStreetMap.

I musei devono essere rappresentati come punti di interesse sulla mappa e devono seguire un ordine preciso, in modo che l’utente possa capire quale museo visitare per primo, quale per secondo e così via. Oltre ai singoli punti, il cliente vuole visualizzare anche il percorso che collega i vari musei direttamente sulla mappa.

Quando l’utente seleziona una tematica, deve poter vedere i percorsi disponibili e scegliere quello che preferisce. Una volta selezionato il percorso, la mappa deve aggiornarsi mostrando i musei coinvolti e la relativa sequenza.

Per ogni museo il cliente vorrebbe visualizzare almeno il nome e alcune informazioni di base.

Il cliente vuole inoltre integrare in futuro un sistema di Intelligenza Artificiale in grado di suggerire o generare percorsi personalizzati. Per questo motivo l’applicazione dovrà prevedere un endpoint che permetta di scambiare informazioni con il servizio AI utilizzando JSON. Dovrà quindi essere definito il formato dei dati inviati alla AI e quello della risposta attesa, ad esempio contenente la tematica richiesta, i musei suggeriti e l’ordine con cui visitarli.

L’applicazione dovrà essere sviluppata in Angular e il cliente lascia al team di sviluppo la scelta dell’organizzazione dei componenti, dei servizi, della struttura dei dati e del formato JSON utilizzato per comunicare con la AI.

Partendo da questa intervista, individuate e scrivete i requisiti funzionali e non funzionali dell’applicazione, definite le principali entità da gestire, progettate una possibile architettura Angular e descrivete il contratto JSON dell’endpoint dedicato alla comunicazione con la AI prima di iniziare lo sviluppo.
