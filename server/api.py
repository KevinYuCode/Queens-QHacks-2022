# file which initializes flask server, returns Mongodb query to React

# Virtual Environment guide:
# initialize virtual env called flask: python -m venv flask
# .\flask\Scripts\activate to initialize virtual environment
# install flask: pip install flask pandas pymongo dnspython
# Py
# runs on local port 5000: proxy set up with react for testing in package.json

from flask import Flask, jsonify, request
import query
from flask_cors import CORS
import json

# flask app instance
app = Flask(__name__)
CORS(app)

# to store user email between functions
class email:
    email = ""


x = email()

# Route calls the "test" function
@app.route("/data")
def test():

    # note to self: can return multiple queries in a single api request:
    # would need to modify react script to accomodate the extra data for it to work

    # query.GETbyIngredient("yellow onions")
    # query.GETall("user")
    return query.GETall("recipes_reducedv3")
    # query.POSTuser("test123@gmail.com", ["kale", "salad", "cucumbers"])
    # query.POSTrecipe("description", "random url", "['insert random ingredients here']", 60, "test recipe yummy yummy good", "['do some steps', 'do some more steps']")


# Route posts new recipe document to recipes_reducedv3 collection
@app.route("/post")
def postRecipe(description, image, ingredients, minutes, name, steps):
    return query.POSTrecipe(description, image, ingredients, minutes, name, steps)


# Route posts user email and ingredients list to user collection
@app.route("/result", methods=["POST"])
def result():
    result = request.get_json()

    query.POSTuser(result["email"], result["ingredients"])
    query.GETuserList(result["email"])
    x.email = result["email"]
    print(result)
    return "success"


# route passes in user email and returns his list of ingredients
@app.route("/availability", methods=["GET"])
def getUserRecipes():
    # email = request.get_json()
    # return query.GETuserList(email["email"])
    return query.GETuserList(x.email)


if __name__ == "__main__":

    app.run()  # start flask app


# when user logs in: check to see if email is in db
# return recipes array associated with that email
# check to see if you can return a list of all the unique ingredients


# this is the user, send the the ingredients he has
