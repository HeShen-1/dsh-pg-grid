CREATE TABLE customers (id integer PRIMARY KEY, name text, region text);
INSERT INTO customers VALUES (1,'华东客户','华东'),(2,'华南客户','华南'),(3,'无订单客户',NULL);
CREATE TABLE orders (id integer PRIMARY KEY, customer_id integer, category text, amount numeric(24,4), quantity integer, cost numeric(24,4), booked_at timestamptz, note text, active boolean, big_id bigint, blank text, payload jsonb, tag text, score numeric, discount numeric, country text, city text, created_on date, ratio numeric, code text);
INSERT INTO orders SELECT i, CASE WHEN i%10=0 THEN 99 ELSE 1+i%2 END, CASE WHEN i%7=0 THEN NULL WHEN i%2=0 THEN '设备' ELSE '服务' END,
 i::numeric/10, CASE WHEN i%20=0 THEN 0 ELSE 1+i%5 END, i::numeric/20,
 '2026-10-01 00:00:00+08'::timestamptz+(i%31)*interval '1 day', CASE WHEN i=50000 THEN '末页命中,中文"与换行'||chr(10)||'第二行' ELSE '记录'||i END,
 i%2=0,9007199254740993::bigint+i,CASE WHEN i%2=0 THEN '' ELSE NULL END,'{"large":9007199254740993}'::jsonb,'tag'||i%3,i%100,i::numeric/1000,'中国','上海','2026-10-01'::date,i::numeric/3,'C'||i FROM generate_series(1,50000) i;
CREATE INDEX ON orders(customer_id);
CREATE TABLE precision_cases (id int, value numeric(30,8), zero int, empty text);
INSERT INTO precision_cases VALUES (1,9007199254740993.12345678,0,''),(2,NULL,1,NULL),(3,0,1,'=SUM(A1:A2)');
CREATE VIEW order_summary AS SELECT category,sum(amount) AS amount FROM orders GROUP BY category;
