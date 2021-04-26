CREATE TABLE Post (
  id              BIGINT          NOT NULL          AUTO_INCREMENT        COMMENT '게시글식별자',
  title           VARCHAR(50)     NOT NULL                                COMMENT '제목',
  content         TEXT            NOT NULL                                COMMENT '내용',
  author          VARCHAR(30)     NOT NULL                                COMMENT '작성자',
  reg_date        DATETIME                                                COMMENT '작성일시',
  mod_date        DATETIME                                                COMMENT '수정일시',
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=UTF8mb4 COMMENT '게시글';