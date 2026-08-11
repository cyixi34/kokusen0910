/*
  Warnings:

  - You are about to drop the column `email` on the `GuestbookEntry` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `GuestbookEntry` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuestbookEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GuestbookEntry" ("createdAt", "id", "message", "name") SELECT "createdAt", "id", "message", "name" FROM "GuestbookEntry";
DROP TABLE "GuestbookEntry";
ALTER TABLE "new_GuestbookEntry" RENAME TO "GuestbookEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
