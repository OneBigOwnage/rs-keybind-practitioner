up:
	@docker-compose up -d

interact:
	@docker-compose exec app bash

serve:
	@docker-compose exec -d app ng serve
