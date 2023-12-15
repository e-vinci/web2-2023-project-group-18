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
    id_current_user INTEGER := NULL;
BEGIN
    id_current_user := (SELECT s.id_user FROM projet.scores s, projet.users u WHERE s.id_user = u.id_user AND u.username = _user);

    IF (id_current_user IS NOT NULL) THEN
        UPDATE projet.scores SET score =_score, score_date = CURRENT_DATE WHERE id_user = id_current_user;
        RETURN;

    END IF;

     id_current_user := (SELECT u.id_user FROM projet.users u WHERE  u.username = _user);

    INSERT INTO projet.scores (id_user, score) VALUES (id_current_user, _score);

RETURN;
END;
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
    RETURNING id_user INTO id;

    INSERT INTO projet.users_skins(id_user, id_skin) 
    VALUES (id, 1);

    INSERT INTO projet.users_themes(id_user, id_theme) 
    VALUES (id, 1);

RETURN id;
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






/*
DROP TABLE IF EXISTS projet.users_skins;
DROP TABLE IF EXISTS projet.users_themes;
DROP TABLE IF EXISTS projet.skins CASCADE;
DROP TABLE IF EXISTS projet.themes CASCADE;
*/

CREATE TABLE IF NOT EXISTS projet.skins(
    id_skin SERIAL PRIMARY KEY,
    name_skin VARCHAR(255) UNIQUE NOT NULL,
    label_skin VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    CHECK(price >= 0)
);
CREATE TABLE IF NOT EXISTS projet.themes(
    id_theme SERIAL PRIMARY KEY,
    name_theme VARCHAR(255) UNIQUE NOT NULL,
    label_theme VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    CHECK(price >= 0)
);

CREATE TABLE IF NOT EXISTS projet.users_skins(
    id_user INTEGER REFERENCES projet.users(id_user),
    id_skin INTEGER REFERENCES projet.skins(id_skin),
    PRIMARY KEY (id_user, id_skin)
);
CREATE TABLE IF NOT EXISTS projet.users_themes(
    id_user INTEGER REFERENCES projet.users(id_user),
    id_theme INTEGER REFERENCES projet.themes(id_theme),
    PRIMARY KEY (id_user, id_theme)
);

CREATE OR REPLACE VIEW  projet.get_all_skins AS
    SELECT s.id_skin, s.name_skin, s.label_skin, s.price
    FROM projet.skins s
    ORDER BY s.price;

CREATE OR REPLACE VIEW  projet.get_all_themes AS
    SELECT t.id_theme, t.name_theme, t.label_theme, t.price
    FROM projet.themes t
    ORDER BY t.price;

CREATE OR REPLACE FUNCTION projet.add_user_skin(
    _user INT,
    _skin INT
) RETURNS VOID AS $$
DECLARE
    _price INT;
    _coins INT;
BEGIN
    SELECT price FROM projet.skins WHERE id_skin = _skin INTO _price;
    SELECT nbre_collectible FROM projet.collectibles WHERE user_id = _user INTO _coins;

    IF(_coins >= _price) THEN
        INSERT INTO projet.users_skins(id_user, id_skin) VALUES (_user, _skin);
        UPDATE projet.collectibles SET nbre_collectible = (nbre_collectible - _price) WHERE user_id = _user;
    END IF;
RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION projet.add_user_theme(
    _user INT,
    _theme INT
) RETURNS VOID AS $$
DECLARE
    _price INT;
    _coins INT;
BEGIN
    SELECT price FROM projet.theme WHERE id_theme = _theme INTO _price;
    SELECT nbre_collectible FROM projet.collectibles WHERE user_id = _user INTO _coins;

    IF(_coins >= _price) THEN
        INSERT INTO projet.users_themes(id_user, id_theme) VALUES (_user, _theme);
        UPDATE projet.collectibles SET nbre_collectible = (nbre_collectible - _price) WHERE user_id = _user;
    END IF;
RETURN;
END;
$$ LANGUAGE plpgsql;

/*
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('santa', 'Santa', 0);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('redhat', 'Red Hat', 100);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('jack', 'Jack', 200);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('cat', 'Cat', 300);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('dog', 'Dog', 400);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('explorer', 'Explorer', 500);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('adventurer', 'Adventurer', 600);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('ninjaboy', 'Ninja Boy', 700);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('ninjagirl', 'Ninja Girl', 800);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('robot', 'Robot', 1000);

INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('snow', 'Snow', 0);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('meadow', 'Meadow', 100);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('desert', 'Desert', 200);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('taiga', 'Taiga', 300);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('forest', 'Forest', 400);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('tundra', 'Tundra', 500);
*/

--DROP TABLE projet.collectible;
CREATE TABLE IF NOT EXISTS projet.collectibles(
    user_id INTEGER PRIMARY KEY NOT NULL REFERENCES projet.users(id_user),
    nbre_collectible INTEGER NOT NULL
    CHECK ( nbre_collectible >= 0 )
);
--DROP FUNCTION projet.get_collectible;

CREATE OR REPLACE FUNCTION projet.get_collectible(_user VARCHAR(255))
RETURNS INTEGER AS $$
DECLARE
    id_current_user INTEGER := NULL;
    collectibles_count INTEGER := 0;
BEGIN
    id_current_user := (SELECT c.nbre_collectible FROM projet.collectibles c, projet.users u WHERE c.user_id = u.id_user AND u.username = _user);

    IF (id_current_user IS NOT NULL) THEN
        collectibles_count := id_current_user;
    END IF;

    RETURN collectibles_count;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION projet.add_collectible(_user VARCHAR(255), _collectible INTEGER)
RETURNS VOID AS $$
    DECLARE
        id_current_user INTEGER := NULL;
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
        id_current_user INTEGER := NULL;
    BEGIN

        id_current_user := (SELECT c.user_id FROM projet.collectibles c, projet.users u WHERE c.user_id = u.id_user AND u.username = _user);
    
        IF (id_current_user IS NOT NULL) THEN
            UPDATE projet.collectibles SET nbre_collectible = (nbre_collectible - _collectible) WHERE user_id = id_current_user;
            RETURN;
        end if;  

            RAISE NOTICE 'No user found with this id_user';
        
    RETURN;
    END;

$$ LANGUAGE plpgsql;



--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (1,100);
--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (2,215);