DURGOSH NATIONAL BANK
===

Project Setup
---

- cd app/services/web
- python -m venv venv / virtualenv env 
- source venv/bin/activate / env/Source/activate
- pip install -r requirements.txt
- docker-compose build
- docker-compose up -d

To access database:
- docker-compose exec db psql --username=[user] --dbname=[db_name]

If not running
- Make sure entrypoint.sh is LF and not CRLF End of line sequence
