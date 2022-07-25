CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

CREATE TABLE "terms"(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "number" INTEGER UNIQUE NOT NULL
);

CREATE TABLE "disciplines"(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "termId" INTEGER NOT NULL REFERENCES terms(id)
);

CREATE TABLE "teachers"(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL
);

CREATE TABLE "teachersDisciplines"(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "teacherId" INTEGER NOT NULL REFERENCES teachers(id),
    "disciplineId" INTEGER NOT NULL REFERENCES disciplines(id)
);

CREATE TABLE "categories"(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL 
);

CREATE TABLE "tests"(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL REFERENCES categories(id),
    "teacherDisciplineId" INTEGER NOT NULL REFERENCES "teachersDisciplines"(id)
);