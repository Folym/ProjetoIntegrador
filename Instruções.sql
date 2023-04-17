create table Funcionario(
func_codigo integer NOT NULL,
func_nome varchar(50) not null,
func_cpf varchar(11) not null,
func_cel varchar(11),
func_email varchar(100),
func_end varchar(30),
func_numend integer,
func_cep integer,
constraint pk_func primary key(func_codigo)
);

create table Pretendente(
pret_codigo integer not null,
pret_nome varchar(50) not null,
pret_cpf varchar(11) not null,
pret_cel varchar(11),
pret_email varchar(100),
pret_end varchar(30),
pret_numend integer,
pret_cep integer,
pret_status varchar(20),
constraint pk_pret primary key (pret_codigo)
);

create table Jovem(
jov_codigo integer not null,
jov_nome varchar(50) not null,
jov_cpf varchar(11) not null,
jov_nomepai varchar(100),
jov_nomemae varchar(100),
jov_idade integer,
jov_sexo varchar(1),
jov_status varchar(30),
constraint pk_jov primary key(jov_codigo)
);

create table campanhadoacao(
camp_codigo integer NOT NULL,
camp_nome varchar(50) not null,
camp_desc varchar(500) not null,
camp_finalizado varchar(1) not null,

constraint pk_campdoacao primary key(camp_codigo)
);

create table DoacProd(
    prod_codigo integer not null,
    doac_codigo integer not null,
    proddoac_quant integer not null,
    constraint pk_dc primary key (prod_codigo,doac_codigo),
    constraint fk_dprod foreign key(prod_codigo) references produto(prod_codigo),
    constraint fk_pdoac foreign key(doac_codigo) references doacao(doac_codigo)
);

create table Produto(
    prod_codigo integer not null,
    prod_nome varchar(50) not null,
    prod_desc varchar(200),
    constraint pk_prod primary key (prod_codigo)
);

create table Doacao(
doac_codigo integer not null ,
prod_codigo integer not null,
doac_tipo varchar(1) not null,
doac_end varchar(50),
doac_numend integer,
doac_cep integer,
doac_valor decimal(8,2),
doac_data date,
doac_desc varchar(200),
camp_codigo integer,
constraint pk_doac primary key(doac_codigo),
constraint fk_prod foreign key(prod_codigo) references produto(prod_codigo),
constraint fk_campDaocao foreign key(camp_codigo) references campanhadoacao(camp_codigo)
);

create table Adocao(
adoc_codigo integer not null,
pret_codigo1 integer not null,
pret_codigo2 integer,
jov_codigo integer not null,
adoc_status varchar(30) not null,
constraint pk_adoc primary key(adoc_codigo),
constraint fk_pret1 foreign key(pret_codigo1) references Pretendente(pret_codigo),
constraint fk_pret2 foreign key(pret_codigo2) references Pretendente(pret_codigo)
);


create table AgendaAdocao(
aga_codigo integer not null,
adoc_codigo  integer not null,
aga_data date not null,
aga_relatorio varchar(1000) not null,
constraint pk_agendaAdocao primary key(aga_codigo,adoc_codigo),
constraint fk_adoc foreign key(adoc_codigo) references Adocao(adoc_codigo)
);

create table AgendaDoacao(
agd_codigo integer not null ,
doac_codigo integer not null,
agd_data date not null,

constraint pk_agendaDoacao primary key(agd_codigo),
constraint fk_doac foreign key(doac_codigo) references Doacao(doac_codigo)
);


CREATE SEQUENCE seq_doacprod INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE doacprod ALTER COLUMN doacprod_codigo SET DEFAULT NEXTVAL('seq_doacprod');

CREATE SEQUENCE seq_adocao INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE adocao ALTER COLUMN adoc_codigo SET DEFAULT NEXTVAL('seq_adocao');

CREATE SEQUENCE seq_agadocao INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE agendaadocao ALTER COLUMN aga_codigo SET DEFAULT NEXTVAL('seq_agadocao');

CREATE SEQUENCE seq_agddocao INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE agendadoacao ALTER COLUMN agd_codigo SET DEFAULT NEXTVAL('seq_agddocao');

CREATE SEQUENCE seq_doacao INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE doacao ALTER COLUMN doac_codigo SET DEFAULT NEXTVAL('seq_doacao');

CREATE SEQUENCE seq_funcionario INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE funcionario ALTER COLUMN func_codigo SET DEFAULT NEXTVAL('seq_funcionario');

CREATE SEQUENCE seq_jovem INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE jovem ALTER COLUMN jov_codigo SET DEFAULT NEXTVAL('seq_jovem');

CREATE SEQUENCE seq_pretendente INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE pretendente ALTER COLUMN pret_codigo SET DEFAULT NEXTVAL('seq_pretendente');

CREATE SEQUENCE seq_produto INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE produto ALTER COLUMN prod_codigo SET DEFAULT NEXTVAL('seq_produto');

CREATE SEQUENCE seq_campanhadoacao INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE campanhadoacao ALTER COLUMN camp_codigo SET DEFAULT NEXTVAL('seq_campanhadoacao');

create table login(
log_codigo integer NOT NULL,
log_nome varchar(50) not null,
log_senha varchar(10) not null,
log_cpf varchar(11) not null,
log_cel varchar(11),
log_email varchar(100) not null,

constraint pk_log primary key(log_codigo)
);

CREATE SEQUENCE seq_login INCREMENT 1 MINVALUE 1 MAXVALUE 9999 START 1 CACHE 1;
ALTER TABLE login ALTER COLUMN log_codigo SET DEFAULT NEXTVAL('seq_login');