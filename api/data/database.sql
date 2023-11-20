CREATE SCHEMA IF NOT EXISTS projet;

CREATE TABLE IF NOT EXISTS projet.users(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS projet.scores(
    id_user INTEGER REFERENCES projet.users(id_user) PRIMARY KEY ,
    score INTEGER NOT NULL,
    CHECK ( score >= 0 )
);

CREATE OR REPLACE VIEW  projet.display_scores AS
    SELECT u.username, s.score
    FROM projet.scores s, projet.users u
    WHERE u.id_user = s.id_user
    ORDER BY 2 DESC;

CREATE OR REPLACE FUNCTION projet.user_change_score(
    _user INT,
    _score INT
) RETURNS VOID AS $$
DECLARE
BEGIN
    IF (EXISTS(SELECT * FROM projet.scores WHERE id_user = _user )) THEN
        UPDATE projet.scores SET score =_score WHERE id_user = _user;
    ELSE
        INSERT INTO projet.scores (id_user, score) VALUES (_user, _score);
    end if;
RETURN;
END;

$$ LANGUAGE plpgsql;





/*INSERT INTO projet.users (username, password) VALUES ('xavier.massart', 'mdp1');
INSERT INTO projet.users (username, password) VALUES ('thibaut.devos', 'mdp2');

SELECT projet.user_change_score(1, 120);*/



