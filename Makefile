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

check:
	npm run format && npm run lint && npm run build

docker-reset:
	docker volume prune && docker builder prune && docker container prune && docker image prune && docker network prune && docker system prune
