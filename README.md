DURGOSH NATIONAL BANK
===

### Project Setup
---

- cd app/services/web
- python -m venv venv / virtualenv env 
- source venv/bin/activate / env/Source/activate
- (optional) pip install -r requirements.txt
- (optional) docker-compose build
- docker-compose up -d
  - `-d` stands for `daemon` and just runs it in background

If not running
- Make sure entrypoint.sh is LF and not CRLF End of line sequence

### To access database:
- docker-compose exec db psql --username=[user] --dbname=[db_name]

### To shell into the Python container:
- `docker-compose exec web bash`

After shelling you can do:
- `python manage.py create_db` to reset and re-create the Postgres DB
- `python manage.py seed_db` to generate some dummy data


