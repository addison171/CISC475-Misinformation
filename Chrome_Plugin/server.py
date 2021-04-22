from flask import Flask
from flask import render_template
from flask import request
from flask import make_response

import sqlite3
import json

app  =  Flask(__name__)

@app.route('/', methods=['POST'])
def save():
    result_data = {"status":-1, "msg":"error"}
    if  not request.get_data():
        result_data["msg"] = "fail"
    else:
        post_data = request.data.decode('utf-8')
        post_data_json = json.loads(post_data)

        sql_key_arr = []
        sql_value_arr = []
        for post_data_json_key in post_data_json.keys():
            sql_key_arr.append(post_data_json_key)
            sql_value_arr.append(post_data_json[post_data_json_key])

        sql_key = ",".join(post_data_json)
        sql_value = "\",\"".join(sql_value_arr)


        sql_value = "\"" + sql_value + "\""
        

        # Connect to the database file
        conn = sqlite3.connect("sample.db")
        try:
            cur = conn.cursor()
        

            sql = 'INSERT INTO DATA('+sql_key+') VALUES ('+sql_value+')'
            print sql
            cur.execute(sql)

            
            conn.commit()
            result_data["status"] = 0
            result_data["msg"] = "save data success"            
        except Exception as e:
            print('There was some kind of error:\n\n' + str(e))
            result_data["msg"] = "save data error"
            return json.dumps(result_data)        
        finally:
            conn.close()

    res = make_response(json.dumps(result_data))
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Content-Type'] = 'application/json'

    return res    
  


@app.route('/api/v1/attitude', methods=['GET'])
def attitude():
    result = {"status":-1, "msg":"error", "data": []}
    if request.method == 'GET':
        start_time = request.args.get('start_time', '')
        end_time = request.args.get('end_time', '')
        if("" == start_time or "" == end_time):

            result["msg"] = "param error"
        else:

            
            conn = sqlite3.connect("sample.db")
            try:
                cur = conn.cursor()
                sql = 'select attitude, count(id) as data_count from DATA where time>=\"' + start_time+ '\" and time<=\"' + end_time + '\" group by attitude'
                print sql
                cursor = cur.execute(sql)
                for row in cursor:
                    print row
                    temp = {}
                    temp["key"] = row[0]
                    temp["value"] = row[1]
                    result["data"].append(temp)
                result["status"] = 0
                result["msg"] = "success"                
            except Exception as e:
                print('There was some kind of error:\n\n' + str(e))
                result["msg"] = "search db error"
            finally:
                conn.close()

    else:

        result["msg"] = "not support POST"

    res = make_response(json.dumps(result))
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Content-Type'] = 'application/json'

    return res



@app.route('/api/v1/learning', methods=['GET'])
def learning():
    result = {"status":-1, "msg":"error", "data": []}
    if request.method == 'GET':
        start_time = request.args.get('start_time', '')
        end_time = request.args.get('end_time', '')
        if("" == start_time or "" == end_time):

            result["msg"] = "param error"
        else:

            
            conn = sqlite3.connect("sample.db")
            try:
                cur = conn.cursor()
                sql = 'select learning, count(id) as data_count from DATA where time>=\"' + start_time+ '\" and time<=\"' + end_time + '\" group by learning'
                print sql
                cursor = cur.execute(sql)
                for row in cursor:
                    print row
                    temp = {}
                    temp["key"] = row[0]
                    temp["value"] = row[1]
                    result["data"].append(temp)
                
                result["status"] = 0
                result["msg"] = "success"

            except Exception as e:
                print('There was some kind of error:\n\n' + str(e))
                result["msg"] = "search db error"
            finally:
                conn.close()

    else:

        result["msg"] = "not support POST"

    res = make_response(json.dumps(result))
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Content-Type'] = 'application/json'

    return res




@app.route('/api/v1/hostinfo', methods=['GET'])
def hostinfo():
    result = {"status":-1, "msg":"error"}
    if request.method == 'GET':
        host = request.args.get('host', '')
        if("" == host):

            result["msg"] = "param error"
        else:

            
            conn = sqlite3.connect("sample.db")
            try:
                


                cur = conn.cursor()

                sql = "select count(id) from DATA"
                cursor = cur.execute(sql) 
                for row in cursor:
                    result["allcount"] = row[0]   
                    break         

                sql = 'select attitude, learning, count(id) from DATA where host=\"' + host+ '\"'
                print sql
                cursor = cur.execute(sql)
                for row in cursor:
                    print row
                    result["status"] = 0
                    result["msg"] = "success"
                    result["attitude"] = row[0]
                    result["learning"] = row[1]
                    result["count"] = row[2]
                    break
               
            except Exception as e:
                print('There was some kind of error:\n\n' + str(e))
                result["msg"] = "search db error"
            finally:
                conn.close()

    else:

        result["msg"] = "not support POST"

    res = make_response(json.dumps(result))
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Content-Type'] = 'application/json'

    return res





if  __name__  ==  '__main__':

    app.run(host='0.0.0.0', port=3001, debug=True)