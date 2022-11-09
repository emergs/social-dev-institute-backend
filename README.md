<h1>Documentação da Api</h1>

<h2>Login<h2>

POST base_url/login

### Todos os campos de envio são obrigatórios

- email - deve ser do tipo string
- password - deve ser do tipo string

### Essa rota não necessita de autenticação

### Retorno esperado de um login com sucesso para voluntário ou instituição

**Status 200**

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdHJpY2suY29yZGVpcm9AZW1haWwuY29tIiwiaWQiOiI2OTRmOWU4NC1lMmYxLTQ3NTItOTVhMS0zMTZlYWQ3NmFjNWUiLCJpYXQiOjE2Njc5MjYyMjUsImV4cCI6MTY2ODAxMjYyNSwic3ViIjoiNjk0ZjllODQtZTJmMS00NzUyLTk1YTEtMzE2ZWFkNzZhYzVlIn0.2lxFmaaFOuGyMVcJh9ceJf8NG_W6A3tgwxfpayER9Ew"
}
```

### Erro - Email não cadastrado

**Status 403**

```
{
	"status": "error",
	"statusCode": 403,
	"message": "Account not found"
}
```

### Erro - Email ou Senha não informados

**Status 403**

```
{
	"status": "error",
	"statusCode": 403,
	"message": "Email and password are required"
}
```

### Erro - Email ou Senha incorretos

**Status 403**

```
{
	"status": "error",
	"statusCode": 403,
	"message": "Wrong email/password"
}
```

<h2>institution<h2>

Listar o perfil da instituição logada

## base_url/register/institution/profile

### Listar instituições logada

- A rota requer autenticação

### Dados necessários

- Não requer corpo de requisição

### Retorno esperado

#### Status 200

- dados da instituição logada

```
{
	"id": "88b086a5-b259-4356-b00d-4f79358bb6e7",
	"name": "Recanto Paz e Luz",
	"cnpj": "123123123123123",
	"address": "Rua antonio lacerda, 555",
	"phone": "5125522555",
	"email": "recantopazeluz@mail.com",
	"isActive": true
}
```

Listar todas instituições

## base_url/register/institution

### Listar todas instituições cadastradas

- A rota não requer autenticação

### Dados necessários

- Não requer corpo de requisição

### Retorno esperado

#### Status 200

- instituição criada com sucesso

```
[
	{
		"id": "c3543dc3-32ba-4bcc-87cb-d3972801857f",
		"name": "Recanto Esperança II",
		"cnpj": "12345678912351",
		"address": "Rua das Laranjeiras, 271",
		"phone": "4452258998",
		"email": "reacantoesperanca2@mail.com",
		"isActive": true
	},
	{
		"id": "fc78fac9-0877-4a67-b2d7-68a824718c5d",
		"name": "Instituto Velho Amigo",
		"cnpj": "04589879/000100",
		"address": "Estrada das Lágrimas, 2317- 2º andar Heliópolis – São Paulo, SP 04232-000",
		"phone": "1130714040",
		"email": "contata123@velhoamigo.org.br",
		"isActive": true
	}
]
```

### Erros

#### Status 400

- Nenhuma instituição cadastrada

```
{
	"message": "No registered institution"
}
```

Deletar um instituição

## base_url/register/institution/profile

### Deletar uma instituição

- A rota requer autenticação
- Não é possivel deletar outra instituição a não ser a que está logada
- E realizado um soft-delete

### Dados necessários

- Não requer corpo de requisição

### Retorno esperado

#### Status 204

- instituição deletada com sucesso

```
[]
```

### Erros

#### Status 400

- token inválido

```
{
	"message": "Invalid Token"
}
```

#### Status 400

- A instituição ja foi deletada

```
{
	"message": "Institution already isActive = false"
}
```

Editar uma instituição

## base_url/register/institution/profile

### Editar uma instituição

- A rota requer autenticação
- Não é possivel atualizar outra instituição a não ser a que está logada

### Dados necessários

- Todos os dados podem ser editados menos o id

### Retorno esperado

#### Status 200

- instituição editada com sucesso

```
{
	"name": "Recanto Esperança II",
	"cnpj": "12345678912351",
	"address": "Rua das Laranjeiras, 271",
	"phone": "4452258998",
	"email": "reacantoesperanca2@mail.com",
	"id": "c3543dc3-32ba-4bcc-87cb-d3972801857f",
	"isActive": true
}
```

### Erros

#### Status 400

- token inválido

```
{
	"message": "Invalid Token"
}
```

Criar institution

## base_url/register/institution

### Criar uma instituição

A rota não requer autenticação

### Dados necessários

- name: string(50)
- cnpj: string(18)
- address: string(150)
- phone: string(11)
- email: string(60)
- password: string(60)

### Retorno esperado

#### Status 201

- instituição criada com sucesso

```
{
	"name": "Recanto Esperança II",
	"cnpj": "12345678912351",
	"address": "Rua das Laranjeiras, 271",
	"phone": "4452258998",
	"email": "reacantoesperanca2@mail.com",
	"id": "c3543dc3-32ba-4bcc-87cb-d3972801857f",
	"isActive": true
}
```

### Erros

#### Status 400

- email já cadastrado

```
{
	"message": "E-mail already registered"
}
```

#### Status 400

- cnpj já cadastrado

```
{
	"message": "CNPJ already registered"
}
```

#### Status 404

- CNPJ com formato inválido

```
{
	"message": "Invalid CNPJ"
}
```

<h2>Homeless</h2>

1. Adição de um morador de rua

POST /homeless/register

Exemplo de corpo da requisição:

```
{
  "name": "José da Silva",
  "age": "35",
  "institution": "Amigos da rua", (deve ser uma instituição válida já cadastrada no banco de dados)
  "picture": "url da imagem", (se não for passado, terá seu valor definido como NULL no banco de dados)
}
```

Exemplo de response:

201 created

```
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
```

Possíveis erros:

```
Status code 400 - name/age/institution is missing;
Status code 404 - Institution not found
```

2. Listagem de todos os homeless

GET /homeless

Exemplo de resposta:

200 OK

```
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
```

3. Busca de um homeless por ID

GET /homeless/:id

Exemplo de resposta:

200 OK

```
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
```

Possíveis erros:
Status code 400 - ID required;
Status code 404 - Person not found

4. Update de um homeless

PATCH /homeless/:id

Exemplo de resposta:

200 OK

```
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
```

Possíveis erros:

```
Status code 404 - Person not found
```

5. Delete de um homeless

DELETE /homeless/:id

```
204 No Content
No body returned for response
```

```
Status code 404 - Person nor found;
Status code 400 - ID required;
```

<h2>Campaign<h2>

base_url/campaign

## Criar uma campanha

- Necessita de autentificação
- Necessita de ser uma instituição
- Uma mesma instituição não pode ter duas campanha com o mesmo nome

## Dados necessario

    - nome: string(100)
    - address: pode ser mais de um endereçõ
    	- road: string(100)
    	- number: string(50) || null
    	- complement: string(120) || null
    	- city: string(50)
    	- state: string(2)
    -institutionId: id da intituição

### Dados enviados

```
{
	"name": "nome da campanha 2",
	"isAlive": true,
	"address": [
		{
		 "road": "Travessa Municipalista",
		 "number": 21,
		 "complement": null,
		 "city": "Macapá",
		 "state": "AP"
    },{
		 "road": "Travessa Municipalista",
		 "number": 21,
		 "city": "Macapá",
		 "state": "AP"
    }
	],
	"institutionId": "4b5835a9-28a9-45aa-964a-fc5eb0a65972"
}
```

### Retorno esperado

**Status 201**

```
{
	"name": "nome da campanha 2",
	"isActive": true,
	"institution": {
		"id": "4b5835a9-28a9-45aa-964a-fc5eb0a65972",
		"name": "Instituto Velho Amigo",
		"cnpj": "04589879/000300",
		"address": "Estrada das Lágrimas, 2317- 2º andar Heliópolis – São Paulo, SP 04232-000",
		"phone": "1130714040",
		"email": "contata@velhoamigo.org.br",
		"isActive": true,
		"password": "$2b$10$nHWwwqzAEpkn8RzhCoiFJOuMj5hHJsS3yQo.Rqw5MLxrrGoqinlMu",
		"campaigns": [
			{
				"id": "79af81a0-e132-47c0-ba93-7688aa1f8e94",
				"name": "nome da campanha 21",
				"isActive": true,
				"date_creation": "2022-11-09T10:25:27.938Z",
				"date_update": "2022-11-09T10:25:27.938Z"
			}
		]
	},
	"date_creation": "2022-11-09T10:26:41.347Z",
	"date_update": "2022-11-09T10:26:41.347Z",
	"id": "61d9aacf-b40d-4866-997e-8857db143fa0",
	"address": [
		{
			"city": "Macapá",
			"road": "Travessa Municipalista",
			"state": "AP",
			"complement": null,
			"number": 21
		},
		{
			"city": "Macapá",
			"road": "Travessa Municipalista",
			"state": "AP",
			"number": 21
		}
	]
}
```

### Erros

**Status 401**

```
{
	"message": "Invalid token"
}
```

**Status 400**

```
{
	"status": "error",
	"statusCode": 400,
	"message": "institution does not exist"
}
```

**Status 400**

```
{
	"status": "error",
	"statusCode": 400,
	"message": "Campaign already exists"
}
```

base_url/campaign

## Lista todas as campanhas

```
[
	{
		"id": "9550acdf-b22f-4dbe-9a40-37275f5ff1eb",
		"name": "nome da campanha 2",
		"isActive": true,
		"date_creation": "2022-11-09T08:44:36.681Z",
		"date_update": "2022-11-09T08:44:36.681Z",
		"address": [
			{
				"id": "3e1655cd-780f-4986-aeea-0b2e3b4054d2",
				"road": "Travessa Municipalista 2",
				"number": "21",
				"complement": "rua c2",
				"city": "Macapá",
				"state": "ap"
			},
			{
				"id": "d66d86bb-e1ba-4cf5-acd9-0df2dcd3d18b",
				"road": "Travessa Municipalista",
				"number": "21",
				"complement": null,
				"city": "Macapá",
				"state": "AP"
			}
		],
		"institution": {
			"id": "d5cae1c9-68f2-4652-9c00-c70f57c62003",
			"name": "Instituto da criança",
			"cnpj": "04589879/000101",
			"address": "Estrada das Lágrimas, 2318- 2º andar Heliópolis – São Paulo, SP 04242-000",
			"phone": "1130714040",
			"email": "contata123@instcrianca.org.br",
			"isActive": true,
			"password": "$2b$10$rjZT8lLZSw02c/SQit3QROC8eggp2La3dofJbqJAqNqb9iqF3q3ba"
		}
	}
]
```

base_url/campaign/:id

## Pegar uma campanha especifica

### Retorno esperado

**Status 200**

```
{
	"id": "9550acdf-b22f-4dbe-9a40-37275f5ff1eb",
	"name": "nome da campanha 2",
	"isActive": true,
	"date_creation": "2022-11-09T08:44:36.681Z",
	"date_update": "2022-11-09T08:44:36.681Z",
	"address": [
		{
			"id": "d66d86bb-e1ba-4cf5-acd9-0df2dcd3d18b",
			"road": "Travessa Municipalista",
			"number": "21",
			"complement": null,
			"city": "Macapá",
			"state": "AP"
		},
		{
			"id": "3e1655cd-780f-4986-aeea-0b2e3b4054d2",
			"road": "Travessa Municipalista 2",
			"number": "21",
			"complement": "rua c2",
			"city": "Macapá",
			"state": "ap"
		}
	],
	"institution": {
		"id": "d5cae1c9-68f2-4652-9c00-c70f57c62003",
		"name": "Instituto da criança",
		"cnpj": "04589879/000101",
		"address": "Estrada das Lágrimas, 2318- 2º andar Heliópolis – São Paulo, SP 04242-000",
		"phone": "1130714040",
		"email": "contata123@instcrianca.org.br",
		"isActive": true,
		"password": "$2b$10$rjZT8lLZSw02c/SQit3QROC8eggp2La3dofJbqJAqNqb9iqF3q3ba"
	}
}
```

**Status 404**

```
{
	"status": "error",
	"statusCode": 404,
	"message": "id not found"
}
```

base_url/campaign/:id

## Atualizar uma campanha

- Necessita de autentificação

## Dados possiveis para atualização

    - nome: string(100)
    - institution: ID

### Retorno esperado

**Status 200**

```
{
	"id": "9550acdf-b22f-4dbe-9a40-37275f5ff1eb",
	"name": "Teste2",
	"isActive": true,
	"date_creation": "2022-11-09T08:44:36.681Z",
	"date_update": "2022-11-09T10:33:16.811Z",
	"address": [
		{
			"id": "d66d86bb-e1ba-4cf5-acd9-0df2dcd3d18b",
			"road": "Travessa Municipalista",
			"number": "21",
			"complement": null,
			"city": "Macapá",
			"state": "AP"
		},
		{
			"id": "3e1655cd-780f-4986-aeea-0b2e3b4054d2",
			"road": "Travessa Municipalista 2",
			"number": "21",
			"complement": "rua c2",
			"city": "Macapá",
			"state": "ap"
		}
	],
	"institution": {
		"id": "d5cae1c9-68f2-4652-9c00-c70f57c62003",
		"name": "Instituto da criança",
		"cnpj": "04589879/000101",
		"address": "Estrada das Lágrimas, 2318- 2º andar Heliópolis – São Paulo, SP 04242-000",
		"phone": "1130714040",
		"email": "contata123@instcrianca.org.br",
		"isActive": true,
		"password": "$2b$10$rjZT8lLZSw02c/SQit3QROC8eggp2La3dofJbqJAqNqb9iqF3q3ba"
	}
}
```

### Erros

**Status 401**

```
{
	"message": "Invalid token"
}
```

**Status 400**

```
{
	"status": "error",
	"statusCode": 400,
	"message": "institution does not exist"
}
```

base_url/campaign/:id

## Deletar uma campanha

- Necessita de ser autentificação

### Retorno esperado

**Status 204**

```

```

### Erros

**Status 401**

```
{
	"message": "Invalid token"
}
```

**Status 400**

```
{
	"status": "error",
	"statusCode": 400,
	"message": "User is already inactive"
}
```

**Status 404**

```
{
	"status": "error",
	"statusCode": 404,
	"message": "id not found"
}
```

<h2>address<h2>

base_url/address

### Pegar todos os endereços

### Não necessita de autentificação

### Retorno esperado

**Status 200**

```
[
	{
		"id": "a1e18314-7a15-4c3b-8e54-2c3e8bdb158d",
		"road": "Travessa Municipalista",
		"number": "21",
		"complement": null,
		"city": "Macapá",
		"state": "AP",
		"campaigns": {
			"id": "9b829a03-fd5c-4950-ad8a-10cb4f74f51e",
			"name": "Instituto da Criança",
			"isActive": false,
			"date_creation": "2022-11-09T08:37:27.031Z",
			"date_update": "2022-11-09T08:46:16.212Z"
		}
	}
]
```

base_url/address/:id

### Pegar um endereço

### Não necessita de autentificação

### Retorno esperado

**Status 200**

```
{
	"id": "a1e18314-7a15-4c3b-8e54-2c3e8bdb158d",
	"road": "Travessa Municipalista",
	"number": "21",
	"complement": null,
	"city": "Macapá",
	"state": "AP",
	"campaigns": {
		"id": "9b829a03-fd5c-4950-ad8a-10cb4f74f51e",
		"name": "Instituto da Criança",
		"isActive": false,
		"date_creation": "2022-11-09T08:37:27.031Z",
		"date_update": "2022-11-09T08:46:16.212Z"
	}
}
```

### Erros

**Status 404**

```
{
	"status": "error",
	"statusCode": 404,
	"message": "id not found"
}
```

base_url/address/:id

### Atualiza um endereçõ

### Necessita de autentificação

### Dados atualizaveis

    - road: string(100)
    - number: string(50)
    - complement: string(120)
    - city: string(50)
    - state: string(2)

### Retorno esperado

**Status 200**

```
{
	"id": "a1e18314-7a15-4c3b-8e54-2c3e8bdb158d",
	"road": "Travessa Municipalista 2",
	"number": "21",
	"complement": "rua c2",
	"city": "Macapá",
	"state": "ap",
	"campaigns": {
		"id": "9b829a03-fd5c-4950-ad8a-10cb4f74f51e",
		"name": "Instituto da Criança",
		"isActive": false,
		"date_creation": "2022-11-09T08:37:27.031Z",
		"date_update": "2022-11-09T08:46:16.212Z"
	}
}
```

### Erros

**Status 404**

```
{
	"status": "error",
	"statusCode": 404,
	"message": "id not found"
}
```

**Status 401**

```
{
	"message": "Invalid token"
}
```
