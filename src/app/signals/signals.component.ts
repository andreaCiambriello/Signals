import { NgFor } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);         // creazione di un signal object

  // Il metodo computed consente di effettuare delle operazioni su valori che dipendono da altri signals.
  // Necessita di una funzione che non prende nulla in input.
  doubleCounter = computed(() => this.counter() * 2)

  constructor() {
    // Il metodo effect consente di eseguire del codice quando i valori di un signals cambiano.
    // In questo caso stampiamo i valori di counter ogni volta che questi cambiano.
    // Lo eseguiamo nel constructor per convenzione. Può essere visto come lo useEffect di Angular
    effect(() => console.log(this.counter()))
  }

  increment() {
    //    UPDATE
    //    Il metodo update "genera" un nuovo valore sulla base di quello vecchio, necessita una funzione 
    //    per poter appunto aggiornare il valore che sta guardando
    this.counter.update((oldCounter) => oldCounter + 1);
    //    SET
    //    Il metodo set dà un nuovo valore al signals sulla base di nulla, infatti non prende un funzione
    //    come parametro, ma un valore secco, se vogliamo usarlo per aggiornare un valore nel tempo, 
    //    dobbiamo richiamare al suo interno il signals come funzione e aggiornarlo
    this.counter.set(this.counter() + 1);
    //    MUTATE
    //    Il metodo mutate ci consente sempre di cambiare il valore a cui si riferisce sostituendo il 
    //    vecchio con un nuovo valore, necessita come update di una funzione. ATT: in Angular 17 non esiste più
    this.actions.mutate((oldActions) => oldActions.push('INCREMENT'))
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    // In alternativa al mutate possiamo usare l'update in questo modo, ha lo stesso effetto del mutate sopra.
    // E' importante conoscere questa alternativa per la versione 17 di Angular che non ha mutate.
    // Particolare attenzione va posta alla sintassi diversa, usare per l'update direttamente il metodo push 
    // sul valore non funziona, ma bisogna creare un nuovo array a cui diamo tutti i valori di quello vecchio
    // tramite lo spread e poi aggiungiamo quello nuovo
    this.actions.update((oldActions) => [...oldActions, 'DECREMENT'])
  }
}
