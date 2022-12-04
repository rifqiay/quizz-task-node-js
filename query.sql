-- Active: 1669293785404@@localhost@5432@mrifqi
CREATE Table users(
    id INT PRIMARY KEY,
    userName VARCHAR,
    accountNumber INT,
    emailAddress VARCHAR,
    identityNumber INT
);

CREATE Table admin(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(10),
    password VARCHAR(255) 
);