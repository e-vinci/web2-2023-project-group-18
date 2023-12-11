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
    RETURNING id_user INTO  id;
    
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







-- DROP TABLE IF EXISTS projet.users_skins;
-- DROP TABLE IF EXISTS projet.users_themes;
-- DROP TABLE IF EXISTS projet.skins CASCADE;
-- DROP TABLE IF EXISTS projet.themes CASCADE;

CREATE TABLE IF NOT EXISTS projet.skins(
    id_skin SERIAL PRIMARY KEY,
    name_skin VARCHAR(255) UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    CHECK(price >= 0)
);
CREATE TABLE IF NOT EXISTS projet.themes(
    id_theme SERIAL PRIMARY KEY,
    name_theme VARCHAR(255) UNIQUE NOT NULL,
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
    SELECT s.id_skin, s.name_skin, s.price
    FROM projet.skins s
    ORDER BY s.price;

CREATE OR REPLACE VIEW  projet.get_all_themes AS
    SELECT t.id_theme, t.name_theme, t.price
    FROM projet.themes t
    ORDER BY t.price;

CREATE OR REPLACE FUNCTION projet.add_user_skin(
    _user INT,
    _skin INT
) RETURNS VOID AS $$
DECLARE
BEGIN
    INSERT INTO projet.users_skins(id_user, id_skin) VALUES (_user, _skin);
RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION projet.add_user_theme(
    _user INT,
    _theme INT
) RETURNS VOID AS $$
DECLARE
BEGIN
    INSERT INTO projet.users_themes(id_user, id_theme) VALUES (_user, _theme);
RETURN;
END;
$$ LANGUAGE plpgsql;

/*
INSERT INTO projet.skins (name_skin, price) VALUES ('dragon', 100);
INSERT INTO projet.skins (name_skin, price) VALUES ('phoenix', 200);
INSERT INTO projet.skins (name_skin, price) VALUES ('spectre', 300);
INSERT INTO projet.skins (name_skin, price) VALUES ('viper', 400);
INSERT INTO projet.skins (name_skin, price) VALUES ('raven', 500);
INSERT INTO projet.skins (name_skin, price) VALUES ('hydra', 600);
INSERT INTO projet.skins (name_skin, price) VALUES ('banshee', 700);
INSERT INTO projet.skins (name_skin, price) VALUES ('serpent', 800);
INSERT INTO projet.skins (name_skin, price) VALUES ('gorgon', 900);
INSERT INTO projet.skins (name_skin, price) VALUES ('chimera', 1000);
INSERT INTO projet.skins (name_skin, price) VALUES ('wyvern', 1250);
INSERT INTO projet.skins (name_skin, price) VALUES ('harpy', 1500);

INSERT INTO projet.themes (name_theme, price) VALUES ('snow', 100);
INSERT INTO projet.themes (name_theme, price) VALUES ('meadow', 200);
INSERT INTO projet.themes (name_theme, price) VALUES ('desert', 300);
INSERT INTO projet.themes (name_theme, price) VALUES ('taiga', 400);
INSERT INTO projet.themes (name_theme, price) VALUES ('forest', 500);
INSERT INTO projet.themes (name_theme, price) VALUES ('tundra', 600);
INSERT INTO projet.themes (name_theme, price) VALUES ('ocean', 700);
INSERT INTO projet.themes (name_theme, price) VALUES ('swamp', 800);
INSERT INTO projet.themes (name_theme, price) VALUES ('mountain', 900);
INSERT INTO projet.themes (name_theme, price) VALUES ('plain', 1000);
INSERT INTO projet.themes (name_theme, price) VALUES ('rock', 1250);
INSERT INTO projet.themes (name_theme, price) VALUES ('jungle', 1500);
*/

--DROP TABLE projet.collectible;
CREATE TABLE IF NOT EXISTS projet.collectibles(
    id_collectible SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES projet.users,
    nbre_collectible INTEGER NOT NULL
    CHECK ( nbre_collectible >= 0 )
);

SELECT c.nbre_collectible FROM projet.collectibles c WHERE c.user_id = 1;

CREATE OR REPLACE FUNCTION projet.add_collectible(id_user INTEGER, _collectible INTEGER)
RETURNS VOID AS $$
    DECLARE
    BEGIN
    IF (EXISTS(SELECT * FROM projet.collectibles WHERE user_id = id_user )) THEN
        UPDATE projet.collectibles SET nbre_collectible = (nbre_collectible + _collectible) WHERE user_id = id_user;
    ELSE
        INSERT INTO projet.collectibles (user_id, nbre_collectible) VALUES (id_user, _collectible);

    end if;
    RETURN;
    END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION projet.supp_collectible(id_user INTEGER, _collectible INTEGER)
RETURNS VOID AS $$
    DECLARE
    BEGIN
    IF (EXISTS(SELECT * FROM projet.collectibles WHERE user_id = id_user )) THEN
        UPDATE projet.collectibles SET nbre_collectible = (nbre_collectible - _collectible) WHERE user_id = id_user;
    ELSE
        RAISE NOTICE 'No user found with this id_user';
    end if;
    RETURN;
    END;

$$ LANGUAGE plpgsql;



--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (1,100);
--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (2,215);
