CREATE SCHEMA IF NOT EXISTS projet;

CREATE TABLE IF NOT EXISTS projet.users(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS projet.scores(
    id_user INTEGER REFERENCES projet.users(id_user) PRIMARY KEY ,
    score INTEGER NOT NULL,
    score_date DATE NOT NULL DEFAULT CURRENT_DATE
    CHECK ( score >= 0 )
);

CREATE OR REPLACE VIEW  projet.display_scores AS
    SELECT u.username, s.score, s.score_date
    FROM projet.scores s, projet.users u
    WHERE u.id_user = s.id_user
    ORDER BY 2 DESC, 3 DESC;

CREATE OR REPLACE FUNCTION projet.user_change_score(
    _user INT,
    _score INT
) RETURNS VOID AS $$
DECLARE
BEGIN
    IF (EXISTS(SELECT * FROM projet.scores WHERE id_user = _user )) THEN
        UPDATE projet.scores SET score =_score, score_date = CURRENT_DATE WHERE id_user = _user;
    ELSE
        INSERT INTO projet.scores (id_user, score) VALUES (_user, _score);
    end if;
RETURN;
END;

$$ LANGUAGE plpgsql;




/*INSERT INTO projet.users (username, password) VALUES ('GoldKing', 'mdp1');
INSERT INTO projet.users (username, password) VALUES ('WitcherGood', 'mdp1');
INSERT INTO projet.users (username, password) VALUES ('WarSteel', 'mdp1');
INSERT INTO projet.users (username, password) VALUES ('RushRonin', 'mdp1');

SELECT projet.user_change_score(1, 120);
SELECT projet.user_change_score(2, 300);
SELECT projet.user_change_score(3, 120);
SELECT projet.user_change_score(4, 150);*/


