# Face-API Models Directory

Ovaj folder je namenjen lokalnom skladištenju face-api.js modela.

## Trenutno Stanje
- ✅ Models se učitavaju sa **CDN-a** (GitHub raw content)
- 📍 URL: `https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights`

## Modeli koji se koriste
1. **tinyFaceDetector** - Detekcija lica
2. **faceExpressionNet** - Analiza emocija (7 kategorija: angry, disgusted, fearful, happy, neutral, sad, surprised)

## Lokalna Migracijska Verzija
Kada budeš želi da iskoristeš lokalne modele umesto CDN-a:

1. Preuzmi modele sa: https://github.com/justadudewhohacks/face-api.js
2. Stavi `.bin` i `.json` fajlove u ovaj folder
3. U `ScanButton.tsx`, promeni `MODEL_URL` na:
   ```typescript
   const MODEL_URL = '/models';
   ```

## Prednosti Lokalne Verzije
- ⚡ Brže učitavanje (bez mrežnog odloženja)
- 🔒 Offline rad bez interneta
- 📉 Bolje performanse na sporoj konekciji

## Prednosti CDN Verzije (Trenutna)
- ✅ Automatski ažuriranja modela
- 📦 Manja veličina deployment paketa
- 🌍 Globalna distribucija

---

**Status**: CDN je dovoljno brz za production. Lokalna verzija je opcija za budućnost.
