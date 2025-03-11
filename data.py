import pymysql

class Data:
    def __init__(self):
        self.connection = pymysql.connect(
            host="217.25.89.35",
            user="gen_user",
            passwd="Y=44sQFr0U}Tz{",
            db="default_db",
            port=3306,
            cursorclass=pymysql.cursors.DictCursor
    ) 
        
db = Data()