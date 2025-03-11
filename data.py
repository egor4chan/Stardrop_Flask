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
        
    def CreateDataTable(self):
        with self.connection.cursor() as cursor:
            create_table_query = "CREATE TABLE `data` (user_id varchar(32) UNIQUE, refer_id varchar(32), income varchar(32))"

            cursor.execute(create_table_query)
            print('Success')

    def PrintAllData(self):
        with self.connection.cursor() as cursor:
            print("-" * 20)
            select_all_rows = "SELECT * FROM `data`"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for row in rows:
                print(row)
            print("-" * 20)

    def Auth(self, user_id, refer_id, income=0):
        try:
            with self.connection.cursor() as cursor:
                insert_query = f"INSERT INTO `data` (user_id, refer_id, income) VALUES ({user_id}, '{refer_id}', {income});"
                cursor.execute(insert_query)
                self.connection.commit()
                return True
        except:
            return False
        
    def GetUserIncome(self, user_id):
        with self.connection.cursor() as cursor:
            query = f"SELECT income FROM `data` WHERE user_id = {user_id}"
            cursor.execute(query)

            response = cursor.fetchone()
            if response == None:
                return False
            else:
                print(response['income'])
                return response['income']
        
    def GetReferralsCount(self, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT user_id FROM `data` WHERE refer_id = {user_id}"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            print(len(rows))
            return len(rows)
        
    def DeleteUser(self, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"DELETE FROM `data` WHERE user_id = {user_id}"
            cursor.execute(select_all_rows)
            self.connection.commit()
            self.connection.close()
            print(True)
            
        

