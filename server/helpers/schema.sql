CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(24) NOT NULL,
  username VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(128) NOT NULL,
  company VARCHAR(128) NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  logged DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY username (`username`),
  UNIQUE KEY email (`email`),
  KEY created (created),
  KEY logged (logged)
);

CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(12) NOT NULL,
  value TEXT NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
);

CREATE TABLE IF NOT EXISTS reports (
  user_id VARCHAR(24) NOT NULL,
  report_id VARCHAR(24) NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  emailed INT(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `report_id`)
);


INSERT INTO users (id, username, email, password, company, meta) VALUES ('1', 'burak', 'burak@burak.burak', 'password', 'futureshock', '{"cover":"url","avatar":"url"}'); /* */
