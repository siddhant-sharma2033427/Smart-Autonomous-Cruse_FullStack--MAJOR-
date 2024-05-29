import pymongo
import threading as th
import time
class Database_mongo:
    def __init__(self):
        
        Connection_string = "mongodb+srv://user:User@major-project.8kkxvv2.mongodb.net/?retryWrites=true&w=majority"
        myclient = pymongo.MongoClient(Connection_string)
        db = myclient["RawData"]
        collist = db.list_collection_names()
        self.collection = db["sensor datas"]
        self.getRelayThread = th.Thread(target=self.getRelay,args=(10,))
        self.getRelayThread.start()
    def insert(self):
        mydict = { "relay": True, "temprature": 56, "Moisture":300 }
        x = self.collection.insert_one(mydict)
        print(x.acknowledged)
        return x.acknowledged
    def updateRelay(self,value):
        result = self.collection.find({"relay": {"$exists": True}})
        for document in result:
            # print(document)
            newvalues = { "$set": { "relay": value } }
            self.collection.update_one({"_id": document["_id"]}, newvalues)
        print("Update completed")
    def getRelay(self,args):
        try:
            while(1):
                result = self.collection.find({"relay": {"$exists": True}})
                str = ""
                for x in result:
                    print(x["relay"])
                    str = x["relay"]
                print(str)
                time.sleep(3)
        except KeyboardInterrupt:
            self.getRelayThread.join()
    def updateTemp(self,value):
        result = self.collection.find({"temprature": {"$exists": True}})
        ack = ""
        for document in result:
            print(document)
            newvalues = { "$set": { "temprature": value } }
            ack = self.collection.update_one({"_id": document["_id"]}, newvalues)
        print("Update completed")
        return ack.acknowledged
    def getTemp(self):
        result = self.collection.find({"temprature": {"$exists": True}})
        str = ""
        for x in result:
            str = x["temprature"]
        return str
    def updateMoisture(self,value):
        result = self.collection.find({"moisture": {"$exists": True}})
        ack = ""
        for document in result:
            print(document)
            newvalues = { "$set": { "moisture": value } }
            ack = self.collection.update_one({"_id": document["_id"]}, newvalues)
        ack.acknowledged
    def getMoisture(self):
        result = self.collection.find({"moisture": {"$exists": True}})
        str = ""
        for x in result:
            str = x["moisture"]
        return str

class sensorCode:
    def __init__(self):
        pass
cloud = Database_mongo()
# cloud.insert()
# cloud.updateRelay(True)
cloud.getRelay()
# cloud.updateTemp(500)
# cloud.getTemp()
