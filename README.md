# Progetto di ingegneria informatica [5 CFU]

## Scopo del progetto

L’insegnamento ha lo scopo di consentire agli allievi di sperimentare praticamente alcune delle conoscenze apprese nel corso di studi, mediante la realizzazione di un progetto pratico, sotto la guida di un docente responsabile. I prerequisiti sono indicati progetto per progetto; in generale, è richiesta la conoscenza di almeno un linguaggio di programmazione tra quelli usati nei corsi (o la disponibilità ad apprenderlo durante il progetto).

## Descrizione della tarccia

Il progetto ha l’obiettivo di migliorare la percezione e consapevolezza dell’utente relativa ai consumi energetici e del costo di essi.
Si dispone di sensori che collezionano i dati relativi ai consumi elettrici (alimentazione di dispositivi, luci, condizionamento/riscaldamento) e si vuole realizzare interfacce web e per dispositivi mobili che consentano di visualizzare in modo immediato tramite l'utilizzo di grafici dei consumi effettuati e dei costi previsti.

## Componenti del gruppo

-   [**Arbi Demiraj**](https://github.com/Arbidemiraj)
-   [**Samuele Scherini**](https://github.com/ScheriniSamuele)

## Linguaggi, librerie e framework utilizzati

Abbiamo deciso di realizzare una WebApp utilizzando JavaScript sia come linguaggio front-end (utilizzando React) che come linguaggio lato back-end sfruttando Node.js, la decisione è stata presa per due motivi principali, ovvero la popolarità dello stack MERN (MongoDB, Express, React, Node.js) nel mondo del lavoro e la semplicità di utilizzare un solo lingauggio nonostate tutte le sue sfumature.

### Server

| Libreria          | Descrizione                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| **Express**       | Framework per applicazioni Node.js, utile per la creazione e gestione del server. |
| **Cors**          | Libreria per permettere lo sharing tra browser e server.                          |
| **DotEnv**        | Libreria che permette la creazione e l'utilizzo di variabili d'ambiente.          |
| **Fs**            | Libreria che permette la gestione del file system.                                |
| **EditJsonFiles** | Libreria che permette l'update semplificato di file .json.                        |
| **Tidyjs**        | Libreria che permette il trattamento semplificato di dati aggregati.              |
| **Moment**        | Libreria che permette una migliore gestione delle date.                           |

### Client

| Libreria           | Descrizione                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| **React**          | Framework lato front-end per la realizzazione di single page applications. |
| **Axios**          | Libreria utile per l'utilizzio delle API realizzate lato back-end.         |
| **Framer-Motion**  | Libreria utilizzata per realizzare animazioni e transizioni.               |
| **Yup**            | Libreria utilizzata per la validazione di form lato client.                |
| **Chartjs**        | Libreria utilizzata per la visualizzazione grafica dei dati.               |
| **React-spinners** | Libreria utilizzata per i loading screens                                  |

## Struttura delle cartelle

In questa sezione viene spiegata la struttura interna del progetto per rendere più chiara la comprensione
e navigazione del codice sorgente.

### Server

| Cartella        | Descrizione                                                       |
| --------------- | ----------------------------------------------------------------- |
| **routes**      | Contiene le routes del progetto con relative funzioni get e post. |
| **models**      | Contiene le entità presenti lato DB e il loro schema.             |
| **controllers** | Contiene le funzioni chiamate dalle routes.                       |

### Client

Le cartelle seguenti si trovano tutte sotto client/src.

| Cartella       | Descrizione                                                                |
| -------------- | -------------------------------------------------------------------------- |
| **Components** | Contiene i vari componenti jsx chiamati poi nella pagine.                  |
| **Pages**      | Contiene le routes lato front-end che vengono gestite da react-router-dom. |
| **Styles**     | Contiene gli stili css delle pagine e componenti.                          |
| **Helpers**    | Contiene generiche funzioni utili in vari punti del codice                 |
