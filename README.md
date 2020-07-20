# bitko
Online Chat Rooms For Everyone.
<br />
Bitko, where people talk online with each other on various topics.

![Alt text](https://img.techpowerup.org/200720/chat.png "Chat Room")
![Alt text](https://img.techpowerup.org/200720/guest.png "Guest User")
![Alt text](https://img.techpowerup.org/200720/logged.png "Logged User")

# To run the backend:
```
git clone https://github.com/erfanhs/bitko.git
pip3 install virtualenv
virtualenv venv
source venv/bin/activate
cd bitko
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
Make sure you have an instance of redis running.

# To run the frontend:
```
cd bitko/frontend
sudo npm i
sudo npm start
```

# To build for deployment:
```
cd bitko/frontend
sudo npm run-script build
```
