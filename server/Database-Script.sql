create type role as enum ('USER', 'ADMIN');

alter type role owner to postgres;

create table "user"
(
    id       serial
        constraint user_pk
            primary key,
    username varchar,
    password varchar,
    role     role
);

alter table "user"
    owner to postgres;

INSERT INTO public.users (id, username, password, role) VALUES (1, 'no92one', 'abc123', 'USER');
INSERT INTO public.users (id, username, password, role) VALUES (2, 'master', 'abc123', 'ADMIN');
