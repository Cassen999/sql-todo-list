CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task varchar(100),
	complete BOOLEAN DEFAULT 'false'
);