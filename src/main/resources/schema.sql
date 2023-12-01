CREATE TABLE IF NOT EXISTS users
(
    uuid     uuid         NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name     varchar(255) NULL,
    password varchar(255) NULL,
    UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS dietaryrestrictions
(
    uuid   uuid         NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    active boolean      NULL DEFAULT true,
    count  integer      NULL DEFAULT 0,
    label  varchar(255) NULL,
    color  varchar(255) NULL,
    UNIQUE (label)
);