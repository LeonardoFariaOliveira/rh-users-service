-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "countryArea" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighboor" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "companyId" TEXT,
    "employeeId" TEXT,
    CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Address_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "companyId", "country", "countryArea", "employeeId", "id", "neighboor", "number", "street") SELECT "city", "companyId", "country", "countryArea", "employeeId", "id", "neighboor", "number", "street" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_companyId_key" ON "Address"("companyId");
CREATE UNIQUE INDEX "Address_employeeId_key" ON "Address"("employeeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
