# enpoints

## Instruktioner:

### Endpoints som krävs:

**Auth endpoints**
1. post /auth/register (registrera ny användare, ange användarnamn och lösenord som hashas och saltas innan lagring)
2. post /auth/token (generar jwt token för inloggade användare)

**Users endpoints**
3. get /users (hämtar en lista på alla användare, endast tillgänglig för autentiserade användare)
4. get /users/{userId} (hämtar detaljer om en specifik användare baserat på användare-ID)
5. delete /users/{userId} (tar bort en användare, endast tillgänglig för admin eller den specifika användaren)
6. put /user (uppdaterar användarens info, kräver autentisering)
7. post /invite/{userID} (skickar en inbjudan till en annan användare att delta i en konversation)

**Messages endpoints**
8. get /conversations (hämta alla konversations-id:n för den autentiserade användaren)
9. get /messages (hämtar meddelanden för den autentiserade användaren baserat på `userid` eller `conversationId`)
10. post /messages (skapar nytt meddelande, innehåller bl.a. avsändare, mottagare och innehåll)
11. delete /messages/{message id}

**Övriga endpoints**
12. get /env (hämtar miljövariablerna för systemet)
13. patch /csrf (hämtar csrf token)

### Säkerhetsfunktioner
1. SSL med självsignerat certifikat
2. Hashing och salting av lösenordet
3. CSRF-skydd
4. Rudimentära säkerhetsrubriker (så som Content Security Policy och X-content-type-options)