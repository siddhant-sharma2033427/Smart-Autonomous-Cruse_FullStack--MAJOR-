import pymongo
import time
import RPi.GPIO as GPIO
import threading
from picamera2 import Picamera2, Preview

class Database_mongo:
    def __init__(self):
        
        Connection_string = "mongodb+srv://user:User@major-project.8kkxvv2.mongodb.net/?retryWrites=true&w=majority"
        myclient = pymongo.MongoClient(Connection_string)
        db = myclient["RawData"]
        collist = db.list_collection_names()
        self.imageDataBase = db["imagedatas"]
        self.collection = db["sensor datas"]
        self.relayflag = True
        
        self.stop_threads = False
        
        self.lock = threading.Lock()  # Create a lock
        
        self.getRelay_thread = threading.Thread(target=self.getRelay)
        self.capture_thread = threading.Thread(target=self.capture_and_upload)
        self.moisture_thread = threading.Thread(target=self.getMoisture)
        self.capture_and_upload_thread = threading.Thread(target=self.capture_and_upload)
        
        self.getRelay_thread.start()
        self.capture_thread.start()
        self.moisture_thread.start()
        self.capture_and_upload_thread.start()
        
    def insert(self):
        mydict = { "relay": True, "temprature": 56, "Moisture":300 }
        x = self.collection.insert_one(mydict)
        print(x.acknowledged)
        return x.acknowledged
    
    def updateRelay(self, value):
        result = self.collection.find({"relay": {"$exists": True}})
        for document in result:
            newvalues = { "$set": { "relay": value } }
            self.collection.update_one({"_id": document["_id"]}, newvalues)
        print("Update completed")
        
    def getRelay(self):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setwarnings(False)
        Relay_pin = 8
        GPIO.setup(Relay_pin, GPIO.OUT)
        try:
            while not self.stop_threads:
                result = self.collection.find({"relay": {"$exists": True}})
                for x in result:
                    relay_state = x["relay"]
                if relay_state == True:
                    GPIO.output(Relay_pin, GPIO.LOW)
                    print("Grow light inisiated")
                else:
                    GPIO.output(Relay_pin, GPIO.HIGH)
                    print("Grow light closed")
                time.sleep(2)
        except KeyboardInterrupt:
            print("Keyboard interrupt received, stopping getRelay thread")
            GPIO.cleanup()
    def updateIdStr(self,val):
        val = str(val)
        result = self.collection.find({"imageIdStr": {"$exists": True}})
        ack = ""
        
        for document in result:
            '''print("doc")
            print(document)'''
            newvalues = { "$set": { "imageIdStr": val } }
            ack = self.collection.update_one({"_id": document["_id"]}, newvalues)
            
        #ack.acknowledged    
        print("id in string updated")
            
    def capture_and_upload(self):
        try:
            while not self.stop_threads:
                with self.lock:  # Acquire the lock
                    result = self.collection.find({"captureImage": {"$exists": True}})
                    temp=""
                    print("camera is closed")
                    for document in result:
                        temp = document["captureImage"]
                        if temp == True:
                            print("Capturing the image")
                            self.collection.update_one({"_id": document["_id"]}, {"$set": {"captureImage": False}})
                            picam2 = Picamera2()
                            camera_config = picam2.create_still_configuration(main={"size": (1920, 1080)}, lores={"size": (640, 480)}, display="lores")
                            picam2.configure(camera_config)
                            picam2.start_preview(Preview.QTGL)
                            picam2.start()
                            time.sleep(2)
                            image_file = "test.jpg"
                            picam2.capture_file(image_file)
                            with open(image_file, "rb") as f:
                                image_data = f.read()
                                
                                result = self.imageDataBase.insert_one({"image": image_data})
                                print("Image uploaded with ObjectID:", result.inserted_id)
                                self.updateIdStr(result.inserted_id)
                            picam2.stop()
                            picam2.stop_preview()
                        time.sleep(2)
        except Exception as e:
            print("Exception in capture_and_upload thread:", e)
            
    def updateTemp(self, value):
        result = self.collection.find({"temprature": {"$exists": True}})
        ack = ""
        for document in result:
            newvalues = { "$set": { "temprature": value } }
            ack = self.collection.update_one({"_id": document["_id"]}, newvalues)
        print("Update completed")
        return ack.acknowledged
    
    def getTemp(self):
        result = self.collection.find({"temprature": {"$exists": True}})
        for x in result:
            temp = x["temprature"]
        return temp
    
    def updateMoisture(self, value):
        result = self.collection.find({"moisture": {"$exists": True}})
        ack = ""
        for document in result:
            newvalues = { "$set": { "moisture": value } }
            ack = self.collection.update_one({"_id": document["_id"]}, newvalues)
        ack.acknowledged
    
    def getMoisture(self):
        moisture_pin = 40
        GPIO.setup(moisture_pin, GPIO.IN)
        try:
            while not self.stop_threads:
                moisture_val = GPIO.input(moisture_pin)
                #print("Moisture level:", moisture_val)
                if(moisture_val == 0):
                    print("need water")
                else:
                    print("sufficient water")
                self.updateMoisture(moisture_val)
                time.sleep(3)
                self.updateMoisture(moisture_val)
        except KeyboardInterrupt:
            print("Keyboard interrupt received, stopping getMoisture thread")
            GPIO.cleanup()

class sensorCode:
    def __init__(self):
        pass

cloud = Database_mongo()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Keyboard interrupt received, stopping program")
    cloud.stop_threads = True
    cloud.getRelay_thread.join()
    cloud.capture_thread.join()
    cloud.moisture_thread.join()
    cloud.capture_and_upload_thread.join()
    GPIO.cleanup()

