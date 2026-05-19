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
    tempExpMeses int not null,
    maxDistancia decimal (4,2),
    freqSemanal int not null,
    objetivo varchar(60),
    perfil varchar(15) not null,
    fkUsuario int unique,
    constraint cFrequencia 
		check(freqSemanal >= 1 and freqSemanal <= 7),
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

