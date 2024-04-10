SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS item (
  name varchar(100) NOT NULL,
  id int(11) NOT NULL,
  price double NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (id,name)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  id int(11) NOT NULL AUTO_INCREMENT,
  date_created timestamp NOT NULL DEFAULT current_timestamp(),
  name tinytext NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

ALTER TABLE item
  ADD CONSTRAINT item_ibfk_1 FOREIGN KEY (id) REFERENCES `user` (id) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

INSERT INTO `user` (id, date_created, `name`) VALUES
(1, '2024-04-07 21:36:55', 'Daniel');

INSERT INTO item (`name`, id, price, description) VALUES
('Hyra', 1, 9000, 'Hyra beskrivning'),
('Spotify', 1, 105.43, 'Test för spotify');


