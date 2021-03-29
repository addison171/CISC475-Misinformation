import requests
import json

x = requests.get('http://localhost:')
print("Get Request Completed with Status-Messages:" + str(x.status_code)+"-" + str(json.loads(x.content)['message']))

data = {'message':'Try post some message'}
x= requests.post('link goes here', json=data)
print('Post Request Completed with Status'+str(x.status_code))