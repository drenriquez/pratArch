// ldapService.js
require('dotenv').config(); // Carica le variabili d'ambiente dal file .env

const ldap = require('ldapjs');
//console.log(process.env)
class LDAPService {
  constructor() {
    this.client = ldap.createClient({
      url: 'ldap://vfdipdc5.dipvvf.it',
      tlsOptions: {
        rejectUnauthorized: false, // Disabilita la verifica del certificato (solo per sviluppo)
      },
    });

  }

  authenticate(username, password, callback) {
    //const bindDN = `uid=${username},ou=users,dc=example,dc=com`; // Adjust based on your LDAP structure

    this.client.bind(username, password, (err,res) => {
      if (err) {
        // Failed authentication
        console.error('LDAP bind error:', err);
        callback(err, false);
      } else {
        // Successful authentication
        console.log('LDAP bind successful');
        callback(null, true);
      }
    });
  }

  closeConnection() {
    this.client.unbind();
  }
}

module.exports = LDAPService;


const ldapService = new LDAPService();
ldapService.authenticate('enrico.notaro@dipvvf.it', 'U2164+m2713', (err, success) => {
    if (err || !success) {
      // Autenticazione fallita
     console.log('Autenticazione fallita.' );
    }

    // Autenticazione riuscita
    console.log('Autenticazione riuscita' );
    console.log(success)
    // Esempio di utilizzo della funzione search
// const searchOptions = {
//  // filter: '(sAMAccountName=username)', // Modifica il filtro in base al tuo schema LDAP
//   scope: 'base', // Puoi cambiare il valore in 'base', 'one', o 'sub' in base alle tue esigenze
// };

// const baseDN = 'ou=users,dc=example,dc=com'; // Adatta il DN in base alla tua struttura LDAP

// ldapService.client.search(baseDN, searchOptions, (err, res) => {
//   if (err) {
//     if (err instanceof ldap.ReferralError) {
//       // Gestisci l'errore di riferimento
//       console.error('Errore di riferimento LDAP:', err.referrals.join(', '));
      
//       // Puoi gestire i riferimenti qui, se necessario
      
//       // Ad esempio, puoi chiamare nuovamente la ricerca con il riferimento
//       // this.client.search(err.referrals[0], searchOptions, (err, res) => { ... });

//     } else {
//       // Gestisci altri tipi di errori qui
//       console.error('Errore LDAP generico:', err);
//     }

//     // Puoi gestire ulteriori azioni in caso di errore durante la ricerca
//   } else {
//     // Altrimenti, gestisci i risultati della ricerca come prima
//     res.on('searchEntry', (entry) => {
//       console.log('Record trovato:', entry.object);
//       // Puoi gestire il record qui
//     });

//     res.on('searchReference', (referral) => {
//       console.log('Riferimento LDAP:', referral.uris.join(', '));
//       // Puoi gestire i riferimenti qui, se necessario
//     });

//     res.on('end', () => {
//       console.log('Ricerca LDAP completata');
//       // Puoi eseguire ulteriori azioni qui, se necessario
//     });
//   }
// });
    ldapService.closeConnection();
  })

   