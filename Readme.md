# Website traffic meter
## API
### `PUT /traffic?url=irodalomerettsegi.hu/szokartyak`
Eltárolja a lekérdezett url, amit az url paraméternek kell megadni.
### `GET /traffic`
Megadja, hogy hány különböző sessionId-t tárolt el eddig az adatbázisban

A headerben kell a jwt tokent küldeni

Visszatérés:
```
{
    "traffic": 2
}
```