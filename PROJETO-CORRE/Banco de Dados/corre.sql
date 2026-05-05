create database projetocorre;
use projetocorre;

create table usuario(
	id int primary key auto_increment,
    nome varchar(50) not null,
    email varchar(50) not null unique,
    senha varchar(50) not null
);

create table questionario(
	id int primary key auto_increment,
    freqSemanal int not null,
    tempExpMeses int not null,
    maxDistancia decimal (4,2),
    objetivo varchar(60),
    fkUsuario int unique,
    constraint cFrequencia 
		check(freqSemanal >= 0 and freqSemanal <= 7),
    constraint cFkUser foreign key (fkUsuario)
    references usuario (id)
);

create table corrida(
	id int primary key auto_increment,
    distancia decimal(4,2) not null,
    tempMinutos int not null,
    dtCorrida datetime not null default now(),
    fkUsuario int not null,
    constraint cFkUsuario foreign key (fkUsuario)
    references usuario(id)
);

select * from usuario;
truncate table usuario;
