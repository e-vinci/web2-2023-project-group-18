CREATE SCHEMA IF NOT EXISTS projet;

CREATE TABLE IF NOT EXISTS projet.users(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS projet.scores(
    id_user INTEGER REFERENCES projet.users(id_user) PRIMARY KEY,
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
    _user VARCHAR(255),
    _score INT
) RETURNS VOID AS $$
DECLARE
    id_current_user INTEGER;
BEGIN
    id_current_user := (SELECT s.id_user FROM projet.scores s, projet.users u WHERE s.id_user = u.id_user AND u.username = _user);

    IF (FOUND) THEN
        UPDATE projet.scores SET score =_score, score_date = CURRENT_DATE WHERE id_user = id_current_user;
    ELSE
        INSERT INTO projet.scores (id_user, score) VALUES (id_current_user, _score);
    end if;
RETURN;
END
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION projet.insert_user(
    _username VARCHAR(255),
    _password VARCHAR(255)
) RETURNS INTEGER AS $$
DECLARE
    id INTEGER;
BEGIN
    INSERT INTO projet.users (username, password) 
    VALUES (_username, _password)
    RETURNING id_user INTO  id;
    
RETURN id;
END
$$ LANGUAGE plpgsql;

/*INSERT INTO projet.users (username, password) VALUES ('GoldKing', 'mdp1');
INSERT INTO projet.users (username, password) VALUES ('WitcherGood', 'mdp1');
INSERT INTO projet.users (username, password) VALUES ('WarSteel', 'mdp1');
INSERT INTO projet.users (username, password) VALUES ('RushRonin', 'mdp1');

SELECT projet.user_change_score(1, 120);
SELECT projet.user_change_score(2, 300);
SELECT projet.user_change_score(3, 120);
SELECT projet.user_change_score(4, 150);*/


--DROP TABLE projet.collectible;
CREATE TABLE IF NOT EXISTS projet.collectibles(
    user_id INTEGER PRIMARY KEY NOT NULL REFERENCES projet.users(id_user),
    nbre_collectible INTEGER NOT NULL
    CHECK ( nbre_collectible >= 0 )
);


CREATE OR REPLACE FUNCTION projet.add_collectible(_user VARCHAR(255), _collectible INTEGER)
RETURNS VOID AS $$
DECLARE
    id_current_user INTEGER :=NULL;
BEGIN
    id_current_user := (SELECT c.user_id FROM projet.collectibles c, projet.users u WHERE c.user_id = u.id_user AND u.username = _user);

    IF (id_current_user IS NOT NULL) THEN
        UPDATE projet.collectibles SET nbre_collectible = (nbre_collectible + _collectible) WHERE user_id = id_current_user;
        RETURN;
    END IF;

    id_current_user := (SELECT u.id_user FROM projet.users u WHERE  u.username = _user);
    INSERT INTO projet.collectibles (user_id, nbre_collectible) VALUES (id_current_user, _collectible);
    RETURN;
END;

$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION projet.supp_collectible(_user VARCHAR(255), _collectible INTEGER)
RETURNS VOID AS $$
    DECLARE
        id_current_user INTEGER;
    BEGIN

        id_current_user := (SELECT c.user_id FROM projet.collectibles c, projet.users u WHERE c.user_id = u.id_user AND u.username = _user);
    
        IF (FOUND) THEN
            UPDATE projet.collectibles SET nbre_collectible = (nbre_collectible - _collectible) WHERE user_id = id_current_user;
        ELSE
            RAISE NOTICE 'No user found with this id_user';
        end if;
    RETURN;
    END;

$$ LANGUAGE plpgsql;



--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (1,100);
--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (2,215);