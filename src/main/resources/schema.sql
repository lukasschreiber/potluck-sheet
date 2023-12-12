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
    active boolean      NULL                 DEFAULT true,
    count  integer      NULL                 DEFAULT 0,
    label  varchar(255) NULL,
    color  varchar(255) NULL,
    UNIQUE (label)
);

CREATE TABLE IF NOT EXISTS tables
(
    uuid        uuid         NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name        varchar(255) NULL,
    active      boolean      NULL                 DEFAULT true,
    description varchar(255) NULL,
    UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS entries
(
    uuid     uuid         NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    value     varchar(255) NULL,
    user_id  uuid         NOT NULL,
    table_id uuid         NOT NULL,
    FOREIGN KEY (table_id) REFERENCES tables (uuid),
    FOREIGN KEY (user_id) REFERENCES users (uuid),
    UNIQUE (user_id, table_id)
);