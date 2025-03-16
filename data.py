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
            
    def GetTopIncome(self):
        with self.connection.cursor() as cursor:
            query = f"SELECT * FROM `data` ORDER BY income DESC LIMIT 3"
            cursor.execute(query)

            response = cursor.fetchall()
            return response
            
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

    def SetSuccessPayment(self, payment_id):
        try:
            with self.connection.cursor() as cursor:
                insert_query = f"UPDATE `pay` SET status = '0' WHERE `payment_id` = '{payment_id}'"
                cursor.execute(insert_query)
                self.connection.commit()
                return True
        except Exception as ex:
            return ex

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
        self.connection = pymysql.connect(
            host="217.25.89.35",
            user="gen_user",
            passwd="Y=44sQFr0U}Tz{",
            db="default_db",
            port=3306,
            cursorclass=pymysql.cursors.DictCursor
        ) 
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
        
    def GetTotalDeposits(self, user_id):
        total = 0
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT * FROM `pay` WHERE user_id = {user_id} AND type = 'deposit'"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for transaction in rows:
                total += int(transaction['amount'])
            return total
    
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

class Promocode:

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
            create_table_query = "CREATE TABLE `promousers` (promo_code varchar(32), user_id varchar(32))"

            cursor.execute(create_table_query)
            print('Success')

    def PrintAllData(self):
        with self.connection.cursor() as cursor:
            print("-" * 20)
            select_all_rows = "SELECT * FROM `promos`"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for row in rows:
                print(row)
            print("-" * 20)

    def CreatePromocode(self, promo_code, award, activations):
        try:
            with self.connection.cursor() as cursor:
   
                insert_query = f"INSERT INTO `promos` (promo_code, award, activations) VALUES ('{promo_code}', '{award}', '{activations}');"
                cursor.execute(insert_query)
                    
                self.connection.commit()
                return True
        except Exception as ex:
            print(ex)
            return False
        


    def ReturnPromoStatus(self, promo_code): # есть ли такой промо и сколько активаций
        with self.connection.cursor() as cursor:
            try: 
                select_all_rows = f"SELECT `activations` FROM `promos` WHERE `promo_code` = '{promo_code}'"
                cursor.execute(select_all_rows)

                rows = cursor.fetchone()['activations']
                return rows
            except:
                # если нет такого промо
                return False

    def UpdateActivations(self, promo_code, act):
        try:
            with self.connection.cursor() as cursor:
                insert_query = f"UPDATE `promos` SET `activations` = '{act}' WHERE `promo_code` = '{promo_code}'"
                cursor.execute(insert_query)
                self.connection.commit()
                return True
        except:
            return False

    def MinusActivate(self, promo_code):
        activations = self.ReturnPromoStatus(promo_code)
        new = int(activations) - 1
        if int(activations) >= 1:
            # если остались акцивации
            try:
                with self.connection.cursor() as cursor:
                    insert_query = f"UPDATE `promos` SET `activations` = '{new}' WHERE `promo_code` = '{promo_code}'"
                    cursor.execute(insert_query)
                    self.connection.commit()
                    return True
            except:
                return False
            pass
        else:
            pass
            # удалить промо

    def DeletePromo(self, promo_code):
        with self.connection.cursor() as cursor:
            select_all_rows = f"DELETE FROM `promos` WHERE `promo_code` = '{promo_code}'"
            cursor.execute(select_all_rows)
            self.connection.commit()
            self.connection.close()
            print(True)
            
    
    def ReturnAwardPromo(self, promo_code):
        with self.connection.cursor() as cursor:
            try: 
                select_all_rows = f"SELECT `award` FROM `promos` WHERE `promo_code` = '{promo_code}'"
                cursor.execute(select_all_rows)

                rows = cursor.fetchone()['award']
                return rows
            except:
                # если нет такого промо
                return False

    # table promousers
    def CheckUniqe(self, promo, user_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT `user_id` FROM `promousers` WHERE `promo_code` = '{promo}' AND `user_id` = '{user_id}'"
            cursor.execute(select_all_rows)

            rows = cursor.fetchone()
            return rows # None если не активировал

    def ActivatePromocode(self, promo, user_id):
        if self.ReturnPromoStatus(promo) != False: # если промокод существует
            if int(self.ReturnPromoStatus(promo)) > 0:
                if self.CheckUniqe(promo, user_id) == None: # если чел не вводил
                    try:
                        with self.connection.cursor() as cursor:
                            insert_query = f"INSERT INTO `promousers` (`promo_code`, `user_id`) VALUES ('{promo}', '{user_id}');"
                            cursor.execute(insert_query)
                            self.connection.commit()
                            self.MinusActivate(promo) # снять 1 активацию
                            return int(self.ReturnAwardPromo(promo))
                    except Exception as ex:
                        return ex
                else:
                    return 'activated' # уже активирован юзером
            else:
                return 'notactive' # закончился
        else:
            return 'nopromo' # нет такого нахуй
        
    def PrintPromousers(self):
        with self.connection.cursor() as cursor:
            print("-" * 20)
            select_all_rows = "SELECT * FROM `promousers`"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for row in rows:
                print(row)
            print("-" * 20)

    def DeletePromousers(self):
        with self.connection.cursor() as cursor:
            select_all_rows = f"DELETE FROM promousers"
            cursor.execute(select_all_rows)
            self.connection.commit()
            self.connection.close()

class Vouchers:

    def __init__(self):
        self.connection = pymysql.connect(
            host="217.25.89.35",
            user="gen_user",
            passwd="Y=44sQFr0U}Tz{",
            db="default_db",
            port=3306,
            cursorclass=pymysql.cursors.DictCursor
        ) 
        print('CONNECTED')
        
    def CreateDataTable(self):
        with self.connection.cursor() as cursor:
            create_table_query = "CREATE TABLE `vouch` (user_id varchar(32), voucher_id varchar(32))"

            cursor.execute(create_table_query)
            print('Success')

    def PrintAllData(self):
        with self.connection.cursor() as cursor:
            print("-" * 20)
            select_all_rows = "SELECT * FROM `vouch`"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for row in rows:
                print(row)
            print("-" * 20)

    def AddVoucher(self, user_id):
        try:
            with self.connection.cursor() as cursor:
   
                insert_query = f"INSERT INTO `vouch` (user_id, voucher_id) VALUES ('{user_id}', '1');"
                cursor.execute(insert_query)
                    
                self.connection.commit()
                return True
        except Exception as ex:
            print(ex)
            return False
        
    def DeleteVoucher(self, user_id):
        self.connection = pymysql.connect(
            host="217.25.89.35",
            user="gen_user",
            passwd="Y=44sQFr0U}Tz{",
            db="default_db",
            port=3306,
            cursorclass=pymysql.cursors.DictCursor
        ) 

        with self.connection.cursor() as cursor:
            select_all_rows = f"DELETE FROM `vouch` WHERE `user_id` = '{user_id}' LIMIT 1"
            cursor.execute(select_all_rows)
            self.connection.commit()
            self.connection.close()
            print(True)

    def GetVouchCount(self, user_id):
        self.connection = pymysql.connect(
            host="217.25.89.35",
            user="gen_user",
            passwd="Y=44sQFr0U}Tz{",
            db="default_db",
            port=3306,
            cursorclass=pymysql.cursors.DictCursor
        ) 

        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT user_id FROM `vouch` WHERE user_id = {user_id}"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            print(len(rows))
            return len(rows)

#db = Data()
