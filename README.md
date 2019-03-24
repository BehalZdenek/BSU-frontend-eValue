## ÚKOL PRO UCHAZEČE O POZICI FRONTEND DEVELOPER V BSC

### Úvodem

-   Tato aplikace funguje na základě zobrazení tabulky na hlavní stránce. V tabulce je seznam poznámek a na posledním řádku je možnost přidání poznámky. Veškerá práce s poznámkami spočívá v ovládání tabulky (pro každou akci jsou tlačítka a v hlavičce tabulky je akce popsána).

-   V aplikaci je možné si přepnout český a anglický jazyk tím, že se do url na konec zadá "/en" nebo "/cz".

### Pro spuštění je nutné

V terminálu/příkazové řádce spustit příkaz `npm start`.

Ihned po spuštění se načte úvodní stránka na localhostu na portu 9000, kde se vykreslí tabulka s daty z API /GET Notes.

#### V tabulce je možno

-   zobrazit detail poznámky - Po kliknutí na tlačítko "informace" se stránka přesměruje na stránku s detailní informací nakliknutého řádku (na nové stránce se zavolá API /GET Notes/{id} a zobrazí se data z tohoto API).
-   upravit poznámku - Po kliknutí na tlačítko "editovat" se otevře modální okno s možností editace dané poznámky (v modálu po přepsání texu a klinutí na tlačítko "Editovat/Submit" se zavolá API /PUT Notes/{id}, při kliknutí mimo modální okno nebo na tlačítko "Zrušit/Cancel" se modální okno zavře).
-   smazat poznámku - Po kliknutí na tlačítko "smazat" se zavolá API /DELETE Notes/{id} a "smaže" danou poznámku.
-   přidat poznámku - po kliknutí na řádek "Přidat poznámku" se otevře modální okno s textfieldem a dvěmi tlačítky. Po napsání poznámky a kliknutí na tlačítko "Přidat/Submit se zavolá API /POST Notes, pokud se poznámka přidá na straně serveru, přidá se i do reduxu. Následně se modální okno zavře. Modální okno lze opět zavřít kliknutím mimo "bílý prostor" nebo na tlačítko "Zrušit/Cancel"
