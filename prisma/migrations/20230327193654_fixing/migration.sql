/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PasswordResetRequest` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryArea` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admissionDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `PasswordResetRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "corporateName" TEXT NOT NULL,
    "popularName" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "photoUrl" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true
);

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
    "companyId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Address_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "country", "employeeId", "id", "neighboor", "number", "street") SELECT "city", "country", "employeeId", "id", "neighboor", "number", "street" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_companyId_key" ON "Address"("companyId");
CREATE UNIQUE INDEX "Address_employeeId_key" ON "Address"("employeeId");
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "CTPS" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "photoUrl" TEXT,
    "salary" DECIMAL NOT NULL,
    "admissionDate" DATETIME NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("CPF", "CTPS", "active", "createdAt", "id", "job", "name", "photoUrl", "salary", "sector", "updatedAt") SELECT "CPF", "CTPS", "active", "createdAt", "id", "job", "name", "photoUrl", "salary", "sector", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_PasswordResetRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,
    "companyId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    CONSTRAINT "PasswordResetRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PasswordResetRequest_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PasswordResetRequest" ("adminId", "createdAt", "id", "status") SELECT "adminId", "createdAt", "id", "status" FROM "PasswordResetRequest";
DROP TABLE "PasswordResetRequest";
ALTER TABLE "new_PasswordResetRequest" RENAME TO "PasswordResetRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
