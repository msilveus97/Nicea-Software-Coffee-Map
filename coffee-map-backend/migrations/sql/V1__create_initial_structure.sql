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