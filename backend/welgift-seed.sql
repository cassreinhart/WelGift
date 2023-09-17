-- all test users have the password "password"

INSERT INTO users (username, hashed_password, first_name, last_name)
VALUES ('testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User1'),
       ('testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User2'),
        ('testuser3',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User3'),;

INSERT INTO friendships (request_from_username, request_to_username, approved)
VALUES ('testuser1', 'testuser2', true),
       ('testuser2', 'testuser3', false);

INSERT INTO wishlists (wishlist_id, username, item_name, link_to_item)
VALUES (1, 'testuser1', 'Coding Interview Book', 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850?ie=UTF8&linkCode=sl1&tag=laurebradf-20&linkId=848241c34bf842319b337a9a41244c74&language=en_US&ref_=as_li_ss_tl'),
       (1, 'testuser1', 'Coffee Canister', 'https://www.amazon.com/dp/B09FLDY8WL/?coliid=I10AVXOEAML0Q8&colid=2K9L144ACU5S0&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (1, 'testuser1', 'Wooden Cooking Utensils', 'https://www.amazon.com/dp/B096ZK5JDD/?coliid=I19IN9QI6AUAC7&colid=2K9L144ACU5S0&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (1, 'testuser1', 'Eco-Friendly Dishcloths', 'https://www.amazon.com/dp/B07NZXC7WJ/?coliid=I2DDYHN9QAXBGJ&colid=2K9L144ACU5S0&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (1, 'testuser1', 'Silk Scrunchies', 'https://www.amazon.com/dp/B07VWL6SV6/?coliid=I3M3H6P6IB0KVN&colid=17H193AI0JGKJ&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (2, 'testuser2', 'Blender Bottle', 'https://www.amazon.com/dp/B081SNV27Y/?coliid=IUZYI19ZBJJXJ&colid=20EG69PJHIWDN&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (2, 'testuser2', 'Programming Book', 'https://www.amazon.com/dp/B0833FBNHV/?coliid=I3ND9DMSHR7OKA&colid=36CCG0DV41JYP&psc=0&ref_=list_c_wl_lv_ov_lig_dp_it'),
       (2, 'testuser2', 'Herb Garden Seeds', 'https://www.amazon.com/dp/B08KFP3LH9/?coliid=I1PJJMBYSWOGPO&colid=LVHASKNOX6R&psc=0&ref_=list_c_wl_lv_ov_lig_dp_it'),
       (2, 'testuser2', 'Pocket Herb Garden', 'https://www.amazon.com/dp/B07492P857/?coliid=I3OI6WVL5K7CAL&colid=LVHASKNOX6R&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (3, 'testuser3', 'Wok', 'https://www.amazon.com/dp/B00PUZT9MU/?coliid=I114U1A8T78EIP&colid=1HSHDIL50S8C&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (3, 'testuser3', 'Glass Coffee Mug', 'https://www.amazon.com/dp/B01N5NUN4D/?coliid=I3MVM95YKHD7XU&colid=1HSHDIL50S8C&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (3, 'testuser3', 'Cat Mom Mug', 'https://www.amazon.com/dp/B06XVR167M/?coliid=I2EHQHEAW95I9A&colid=2WIOXEAYGWNSR&psc=0&ref_=list_c_wl_lv_ov_lig_dp_it'),
       (3, 'testuser3', 'Mason Jar Straw Cups', 'https://www.amazon.com/dp/B07VYYTD3L/?coliid=I2N3HQ7L61B2XX&colid=2WIOXEAYGWNSR&ref_=list_c_wl_lv_ov_lig_dp_it&th=1'),
       (3, 'testuser3', 'Compact Espresso Machine', 'https://www.amazon.com/Espresso-Professional-Removable-Cappuccino-Macchiato/dp/B09X3WGJ3R/ref=sr_1_5?crid=100HF625AV1RH&keywords=espresso%2Bmachine%2Bcompact&qid=1694983024&s=home-garden&sprefix=espresso%2Bmachine%2Cgarden%2C136&sr=1-5&ufe=app_do%3Aamzn1.fos.f5122f16-c3e8-4386-bf32-63e904010ad0&th=1');
