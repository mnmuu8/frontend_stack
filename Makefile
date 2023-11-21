openapi:
	openapi-generator generate -i openapi.yml -g typescript-fetch -o generated-api/

build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

ps:
	docker-compose ps

make check:
	npm run format && npm run lint && npm run build
