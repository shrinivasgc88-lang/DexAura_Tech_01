import requests
from dotenv import load_dotenv

load_dotenv('backend/.env')
url = 'http://127.0.0.1:8000/api'

resp = requests.post(f'{url}/auth/login', json={'email': 'admin@dexaura.com', 'password': 'admin123'})
print('login', resp.status_code, resp.text)
if resp.status_code != 200:
    raise SystemExit('Login failed')

token = resp.json().get('access_token')
headers = {'Authorization': f'Bearer {token}'}

resp2 = requests.get(f'{url}/admin/contact-submissions?status=new', headers=headers)
subs = resp2.json().get('submissions', [])
print('new count', len(subs))

if subs:
    sid = subs[0]['id']
    resp3 = requests.post(f'{url}/admin/contact-submissions/{sid}/qualify', headers=headers)
    print('qualify', resp3.status_code, resp3.text)
    resp4 = requests.get(f'{url}/admin/contact-submissions?status=Qualified', headers=headers)
    print('qualified count', len(resp4.json().get('submissions', [])))
else:
    print('no new submissions')
