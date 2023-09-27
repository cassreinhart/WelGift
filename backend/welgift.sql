\echo 'Delete and recreate welgift db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE welgift;
CREATE DATABASE welgift;
\connect welgift

\i welgift-schema.sql


\echo 'Delete and recreate welgift_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE welgift_test;
CREATE DATABASE welgift_test;
\connect welgift_test

\i welgift-schema.sql
\i welgift-seed.sql