CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS coffee_countries (
    country_name VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS coffee_regions (
    country_name VARCHAR(255) NOT NULL REFERENCES coffee_countries(country_name),
    region_name VARCHAR(255) NOT NULL PRIMARY KEY,
    region_geometries geometry
);

CREATE TABLE IF NOT EXISTS coffee_region_metadata (
    region_name VARCHAR(255) NOT NULL REFERENCES coffee_regions(region_name),
    region_description TEXT,
    coffee_species text[],
    coffee_varietals text[],
    PRIMARY KEY (region_name)
);


DROP TABLE IF EXISTS files;
CREATE TABLE files(filename text, country text);
COPY files (filename) FROM PROGRAM 'find /tmp/geojson/Ethopia -maxdepth 1 -type f -not -name "FileMetaData.json" -printf "%f\n" | tail -n +2';

UPDATE files
SET country = 'Ethopia'
WHERE country IS NULL;

COPY files (filename) FROM PROGRAM 'find /tmp/geojson/Nepal -maxdepth 1 -type f -not -name "FileMetaData.json" -printf "%f\n" | tail -n +2';

UPDATE files
SET country = 'Nepal'
WHERE country IS NULL;

SELECT * FROM files ORDER BY filename ASC;


INSERT INTO coffee_countries (country_name) 
VALUES('Ethopia'), ('Nepal');

INSERT INTO coffee_regions (country_name, region_name, region_geometries)
SELECT
    country,
    replace(filename, '.json', ''),
    ST_GeomFromGeoJSON(pg_read_file(format('/tmp/geojson/%s/%s', country, filename))::jsonb -> 'features')
FROM files;



-- DO $$
-- DECLARE
--     f RECORD;
-- BEGIN
--     FOR f IN SELECT country, filename FROM files LOOP
--         BEGIN
--             RAISE NOTICE 'Processing file: %/%', f.country, f.filename;

--             INSERT INTO coffee_regions (country_name, region_name, region_geometries)
--             VALUES (
--                 f.country,
--                 replace(f.filename, '.json', ''),
--                 ST_GeomFromGeoJSON(
--                     pg_read_file(format('/tmp/geojson/%s/%s', f.country, f.filename))::jsonb -> 'features'
--                 )
--             );
--         EXCEPTION WHEN OTHERS THEN
--             RAISE EXCEPTION 'Failed on file %/%: %', f.country, f.filename, SQLERRM;
--         END;
--     END LOOP;
-- END
-- $$;