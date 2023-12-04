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







DROP TABLE IF EXISTS projet.users_skins;
DROP TABLE IF EXISTS projet.users_themes;
DROP TABLE IF EXISTS projet.skins CASCADE;
DROP TABLE IF EXISTS projet.themes CASCADE;

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

INSERT INTO projet.skins (name_skin, price) VALUES ('Dragon', 100);
INSERT INTO projet.skins (name_skin, price) VALUES ('Phoenix', 200);
INSERT INTO projet.skins (name_skin, price) VALUES ('Spectre', 300);
INSERT INTO projet.skins (name_skin, price) VALUES ('Viper', 400);
INSERT INTO projet.skins (name_skin, price) VALUES ('Raven', 500);
INSERT INTO projet.skins (name_skin, price) VALUES ('Hydra', 600);
INSERT INTO projet.skins (name_skin, price) VALUES ('Banshee', 700);
INSERT INTO projet.skins (name_skin, price) VALUES ('Serpent', 800);
INSERT INTO projet.skins (name_skin, price) VALUES ('Gorgon', 900);
INSERT INTO projet.skins (name_skin, price) VALUES ('Chimera', 1000);
INSERT INTO projet.skins (name_skin, price) VALUES ('Wyvern', 1250);
INSERT INTO projet.skins (name_skin, price) VALUES ('Harpy', 1500);

INSERT INTO projet.skins (name_skin, price) VALUES ('Snow', 100);
INSERT INTO projet.skins (name_skin, price) VALUES ('Meadow', 200);
INSERT INTO projet.skins (name_skin, price) VALUES ('Desert', 300);
INSERT INTO projet.skins (name_skin, price) VALUES ('Taiga', 400);
INSERT INTO projet.skins (name_skin, price) VALUES ('Forest', 500);
INSERT INTO projet.skins (name_skin, price) VALUES ('Tundra', 600);
INSERT INTO projet.skins (name_skin, price) VALUES ('Ocean', 700);
INSERT INTO projet.skins (name_skin, price) VALUES ('Swamp', 800);
INSERT INTO projet.skins (name_skin, price) VALUES ('Mountain', 900);
INSERT INTO projet.skins (name_skin, price) VALUES ('Plain', 1000);
INSERT INTO projet.skins (name_skin, price) VALUES ('Rock', 1250);
INSERT INTO projet.skins (name_skin, price) VALUES ('Jungle', 1500);




