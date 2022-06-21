/* Replace with your SQL commands */
CREATE TABLE public."Users"
(
    id SERIAL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    creation_date date NOT NULL,
    bio text,
    photo varchar(255),
    PRIMARY KEY (id)
); 

CREATE TABLE public."Novels"
(
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    creation_date date NOT NULL,
    update_date date,
    summary text,
    author_id int,
    FOREIGN KEY(author_id) REFERENCES public."Users"(id)
); 


