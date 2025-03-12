import pymysql
from random import randint

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
            
    def GetRefer(self, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT refer_id FROM `data` WHERE user_id = {user_id}"
            cursor.execute(select_all_rows)

            rows = cursor.fetchone()
            print((rows['refer_id']))
            return rows['refer_id']
        
    def GetReferralsCount(self, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT user_id FROM `data` WHERE refer_id = {user_id}"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            print(len(rows))
            return len(rows)
        
    def RewardUser(self, user_id, prize):
        total = int(self.GetUserIncome(user_id)) + prize
        try:
            with self.connection.cursor() as cursor:
                insert_query = f"UPDATE `data` SET income = {total} WHERE user_id = {user_id}"
                cursor.execute(insert_query)
                self.connection.commit()
                return True
        except:
            return False
        
    def DeleteUser(self, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"DELETE FROM `data` WHERE user_id = {user_id}"
            cursor.execute(select_all_rows)
            self.connection.commit()
            self.connection.close()
            print(True)
            
        

class Payments:

    def __init__(self):
        self.connection = pymysql.connect(
            host="217.25.89.35",
            user="gen_user",
            passwd="Y=44sQFr0U}Tz{",
            db="default_db",
            port=3306,
            cursorclass=pymysql.cursors.DictCursor
    ) 
        
    def generate_id(self):
        symbols = 'qwertyuiopasdfghjklzxcvbnm1234567890'
        length = 0
        gen = ''
        while length != 10:
            gen = gen + symbols[randint(0, len(symbols)-1)]
            length += 1
        return gen
        
    def CreateDataTable(self):
        with self.connection.cursor() as cursor:
            create_table_query = "CREATE TABLE `pay` (payment_id varchar(32) UNIQUE, user_id varchar(32), type varchar(32), amount varchar(32), status varchar(32))"

            cursor.execute(create_table_query)
            print('Success')

    def PrintAllData(self):
        with self.connection.cursor() as cursor:
            print("-" * 20)
            select_all_rows = "SELECT * FROM `pay`"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for row in rows:
                print(row)
            print("-" * 20)

    def NewPayment(self, user_id, type, amount):
        payment_id = str(self.generate_id())
        status = 1
        try:
            with self.connection.cursor() as cursor:
                insert_query = f"INSERT INTO `pay` (`payment_id`, user_id, `type`, amount, status) VALUES ('{payment_id}', {user_id}, '{type}', {amount}, {status});"
                cursor.execute(insert_query)
                self.connection.commit()
                return True
        except Exception as ex:
            return ex
        
    def GetHistory(self, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT * FROM `pay` WHERE user_id = {user_id}"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            return rows
        
    def GetHistoryLen(self, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT * FROM `pay` WHERE user_id = {user_id}"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            return len(rows)
        
    
class Draws:

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
            create_table_query = "CREATE TABLE `draws` (draw_id varchar(32), user_id varchar(32))"

            cursor.execute(create_table_query)
            print('Success')

    def TakePart(self, draw_id, user_id):
        try:
            with self.connection.cursor() as cursor:
                insert_query = f"INSERT INTO `draws` (draw_id, user_id) VALUES ({draw_id}, '{user_id}');"
                cursor.execute(insert_query)
                self.connection.commit()
                return True
        except:
            return False
        
    def PrintAllData(self):
        with self.connection.cursor() as cursor:
            print("-" * 20)
            select_all_rows = "SELECT * FROM `draws`"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for row in rows:
                print(row)
            print("-" * 20)

    def IsMember(self, user_id, draw_id): # returned 1 if IsMember
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT draw_id FROM `draws` WHERE user_id = {user_id} "
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            
            status = 0
            for i in rows:
                if str(draw_id) == str(i['draw_id']):
                    status = 1
                else:
                    pass
            return status
        
    def GetMembersCount(self, draw_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT user_id FROM `draws` WHERE draw_id = {draw_id}"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            print(len(rows))
            return len(rows)

payment = Payments()
db = Data()
draw = Draws()

draw.PrintAllData()
draw.GetMembersCount('120325')




