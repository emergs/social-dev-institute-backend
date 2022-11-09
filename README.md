1. Adição de um morador de rua

POST /homeless/register

Exemplo de corpo da requisição:

{
  "name": "José da Silva",
  "age": "35",
  "institution": "Amigos da rua", (deve ser uma instituição válida já cadastrada no banco de dados)
  "picture": "url da imagem", (se não for passado, terá seu valor definido como NULL no banco de dados)
}

Exemplo de response:

201 created
{
	"name": "José da Silva",
	"age": "35",
	"picture": "url da imagem ou NULL",
	"institution": {
		"id": "b8a8d21a-a6ba-41ef-98bc-ed17fd208a54",
		"name": "Amigos da rua",
		"cnpj": "70.158.970/0001-97",
		"address": "Av. 9 de julho, 135 – Jundiaí, SP",
		"phone": "11970707070",
		"email": "amigosdarua@email.com",
	},
	"id": "b43fee93-2b90-483a-9348-35b820b0d594",
	"created_at": "2022-11-07",
	"updated_at": "2022-11-07"
}

Possíveis erros:
Status code 400 - name/age/institution is missing;
Status code 404 - Institution not found

2. Listagem de todos os homeless

GET /homeless

Exemplo de resposta:

200 OK
[
	{
		"id": "4e2867c0-105e-448f-afa3-e684598fcf41",
		"name": "José da Silva",
		"age": "35",
		"created_at": "2022-11-09",
		"updated_at": "2022-11-09",
		"picture": null,
		"institution": {
			"id": "b8a8d21a-a6ba-41ef-98bc-ed17fd208a54",
			"name": "Novo dia",
			"cnpj": "70.158.970/0001-97",
			"address": "Av. 9 de julho, 135 – SP",
			"phone": "11970707070",
			"email": "novodia@email.com",
			"isActive": true,
		}
	},
	{
		"id": "29a1159b-8896-4227-ab07-0e19439a8cbd",
		"name": "Roberto Firmino",
		"age": "28",
		"created_at": "2022-11-09",
		"updated_at": "2022-11-09",
		"picture": null,
		"institution": {
			"id": "b8a8d21a-a6ba-41ef-98bc-ed17fd208a54",
			"name": "Novo dia",
			"cnpj": "70.158.970/0001-97",
			"address": "Av. 9 de julho, 135 – SP",
			"phone": "11970707070",
			"email": "novodia@email.com",
			"isActive": true,
		}
	}
]

3. Busca de um homeless por ID

GET /homeless/:id

Exemplo de resposta:

200 OK
{
	"id": "4e2867c0-105e-448f-afa3-e684598fcf41",
	"name": "José da Silva",
	"age": "35",
	"created_at": "2022-11-09",
	"updated_at": "2022-11-09",
	"picture": null,
	"institution": {
		"id": "b8a8d21a-a6ba-41ef-98bc-ed17fd208a54",
		"name": "Novo dia",
		"cnpj": "70.158.970/0001-97",
		"address": "Av. 9 de julho, 135 – SP",
		"phone": "11970707070",
		"email": "novodia@email.com",
		"isActive": true,
	}
}

Possíveis erros:
Status code 400 - ID required;
Status code 404 - Person not found

4. Update de um homeless

PATCH /homeless/:id

Exemplo de resposta:

200 OK
{
	"id": "4e2867c0-105e-448f-afa3-e684598fcf41",
	"name": "José da Silva Ramos",
	"age": "40",
	"created_at": "2022-11-09",
	"updated_at": "2022-11-09",
	"picture": null,
	"institution": {
		"id": "b8a8d21a-a6ba-41ef-98bc-ed17fd208a54",
		"name": "Novo dia",
		"cnpj": "70.158.970/0001-97",
		"address": "Av. 9 de julho, 135 – SP",
		"phone": "11970707070",
		"email": "novodia@email.com",
		"isActive": true,
	}
}

Possíveis erros:
Status code 404 - Person not found

5. Delete de um homeless

DELETE /homeless/:id

204 No Content
No body returned for response

Status code 404 - Person nor found;
Status code 400 - ID required;