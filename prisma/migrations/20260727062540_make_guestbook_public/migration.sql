-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuestbookEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GuestbookEntry" ("createdAt", "email", "id", "isPublic", "message", "name") SELECT "createdAt", "email", "id", "isPublic", "message", "name" FROM "GuestbookEntry";
DROP TABLE "GuestbookEntry";
ALTER TABLE "new_GuestbookEntry" RENAME TO "GuestbookEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
