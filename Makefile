.PHONY: help build up down restart logs clean mysql migrate migrate-fresh prune

help:
	@echo "Comandos disponíveis:"
	@echo "  make build    - Constrói a imagem Docker"
	@echo "  make up       - Sobe o container"
	@echo "  make down     - Para o container"
	@echo "  make restart  - Reinicia o container"
	@echo "  make logs     - Exibe os logs do container"
	@echo "  make mysql    - Conecta no MySQL"
	@echo "  make migrate  - Roda as migrations"
	@echo "  make migrate-fresh - Dropa o banco e recria tudo"
	@echo "  make clean    - Remove container e imagem"
	@echo "  make prune    - Remove tudo do Docker (containers, volumes, imagens)"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

mysql:
	docker exec -it guardia-mysql mysql -uroot -proot guardia

migrate:
	npm run migrate

migrate-fresh:
	docker exec -i guardia-mysql mysql -uroot -proot -e "DROP DATABASE IF EXISTS guardia; CREATE DATABASE guardia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
	npm run migrate

clean:
	docker-compose down -v
	docker rmi guardia-q-webhook-api 2>/dev/null || true

prune:
	docker-compose down -v --rmi all
	docker system prune -af --volumes
