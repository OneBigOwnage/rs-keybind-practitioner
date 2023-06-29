up:
	@docker-compose up -d

interact:
	@docker-compose exec app bash

serve:
	@docker-compose exec app ng serve
