--DROP TABLE projet.collectible;
CREATE TABLE IF NOT EXISTS projet.collectible(
    id_collectible SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES projet.users,
    nbre_collectible INTEGER NOT NULL
    CHECK ( nbre_collectible >= 0 )
);

SELECT c.nbre_collectible FROM projet.collectible c WHERE c.user_id = 1;

CREATE OR REPLACE FUNCTION projet.add_collectible(id_user INTEGER, _collectible INTEGER)
RETURNS VOID AS $$
    DECLARE
    BEGIN
    IF (EXISTS(SELECT * FROM projet.collectible WHERE user_id = id_user )) THEN
        UPDATE projet.collectible SET nbre_collectible = (nbre_collectible + _collectible) WHERE user_id = id_user;
    ELSE
        INSERT INTO projet.collectible (user_id, nbre_collectible) VALUES (id_user, _collectible);
    end if;
    RETURN;
    END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION projet.supp_collectible(id_user INTEGER, _collectible INTEGER)
RETURNS VOID AS $$
    DECLARE
    BEGIN
    IF (EXISTS(SELECT * FROM projet.collectible WHERE user_id = id_user )) THEN
        UPDATE projet.collectible SET nbre_collectible = (nbre_collectible - _collectible) WHERE user_id = id_user;
    ELSE
        RAISE NOTICE 'No user found with this id_user';
    end if;
    RETURN;
    END;

$$ LANGUAGE plpgsql;



--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (1,100);
--INSERT INTO projet.collectible(user_id, nbre_collectible) VALUES (2,215);
