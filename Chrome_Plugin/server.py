def do_post(self):
   request_headers = self.headers
   content_length = request_headers.getheaders('content-length')
   length = int(content_length[0]) if content_length else 0

jsonData = self.rfile.read(length)
record = jsonData
data = json.loads(record)


#Connect to database file
conn = sqlite3.connect("database name goes here.db")
try:
    cur = conn.cursor()
    message = data['message']
    cur.execute['INSERT INTO Log(log_messafe)Value(?)',[message]]
    conn.commit()


except Exception as e:
    print('There was some kind of error:\n\n' + str(e))
finally:
    conn.close()

self.send_response(200)
self.end_headers()