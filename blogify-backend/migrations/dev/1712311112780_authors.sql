BEGIN;

INSERT INTO blogify_authors ("id", "displayName", "mappedIamId", "createdAt", "updatedAt")
VALUES
('c8093345-5888-4686-8e0e-b56c201ff40c', 'felix.schnellert', 'fhFBEmzmsfai3tNzLYy6AVhZ3t63', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('6d03e6ee-5962-47ff-bf86-df89c332cc7a', 'davide.dignoti', 'N2HbiOholLROYRw94QZejKSHkmz2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

COMMIT;