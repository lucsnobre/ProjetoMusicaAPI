#cria um database

create table tb_musica (
   id_musica int auto_increment primary key,
   nome_musica varchar(80) not null,
   link varchar(200),
   duracao time not null, 
   data_lancamento date not null,
   foto_capa varchar(200),
   letra text
);

#criação de tabela para o banco de dados
ALTER TABLE tb_musica 
MODIFY COLUMN id_musica varchar(200) NOT NULL;

show tables;
desc tb_musica;

ALTER TABLE tb_musica 
MODIFY COLUMN id_musica INT NOT NULL AUTO_INCREMENT;
