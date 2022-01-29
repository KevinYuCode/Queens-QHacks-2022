# query functions called by api.py

import json
from flask import jsonify
from pandas import DataFrame
from pymongo import MongoClient

# to connect flask to mongo qhacks db
def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://sam5thibault:81758@cluster0.l6txl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    client = MongoClient(CONNECTION_STRING)
    # where 'qhacks' is the database name
    return client["qhacks"]




# ====================== REQUESTS THAT RETRIEVE DATA FROM MONGODB ===============================

# query test to get all the elements from db
def GETall(dbName):
    db = get_database()  # get qhacks db
    collection_name = db[dbName]  # specify collection using parameter name

    # GET all (except id : not needed for use case)
    item_details = collection_name.find({}, {"_id": 0})
    items_df = DataFrame(
        item_details
    ).to_json()  # format to dictionnary to output to React in JSON FORMAT
    print(items_df)  # print to cmd line for testing
    return items_df


# query test to get elements of db by ingredient search
def GETbyIngredient(ingredient):
    db = get_database()
    recipes_reduced = db["recipes_reduced"]  # specify collection name
    # query using ingredient parameter, exclude id field for cleaner output
    item_details = recipes_reduced.find({"Ingredients": ingredient}, {"_id": 0})
    items_df = DataFrame(item_details).to_json()  # format output to dictionnary
    print(items_df)  # print output to cmd line
    return items_df


# query test to get elements of db by name search
def GETbyName(name):
    db = get_database()
    recipes_reduced = db["recipes_reduced"]  # go to recipe_info collection
    # query with name parameter, exclude id for cleaner output
    item_details = recipes_reduced.find({"name": name}, {"_id": 0})
    items_df = DataFrame(item_details).to_json()  # format output to dictionnary
    print(items_df)
    return items_df


# test to add ingredient to user ingredient list
def POSTuser(email, ingredients):
    db = get_database()
    user = db["user"]
    # insert ingredient document to user collection
    user.insert_one({"user": email, "ingredients": ingredients})
    print("User POST Successful")
    return {"User POST Successful": 0}  # return msg in json format for confirmation


# function which adds recipe with the given parameters to the recipes_reduces collection (mongo)
def POSTrecipe(name, minutes, steps, description, ingredients, image):
    db = get_database()
    recipes_reduced = db["recipes_reduced"]
    recipes_reduced.insert_one(
        {
            "name": name,
            "minutes": minutes,
            "steps": steps,
            "description": description,
            "ingredients": ingredients,
            "image": image,
        }
    )
    print("Recipe POST Successful")
    return {"Recipe POST Successful": 0}
