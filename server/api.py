# file which initializes flask server, returns Mongodb query to React

# Virtual Environment guide:
# initialize virtual env called flask: python -m venv flask
# .\flask\Scripts\activate to initialize virtual environment
# install flask: pip install flask pandas pymongo dnspython
# Py
# runs on local port 5000: proxy set up with react for testing in package.json

from flask import Flask
import query

# flask app instance
app = Flask(__name__)

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


if __name__ == "__main__":

    app.run()  # start flask app


# when user logs in: check to see if email is in db

# return recipes array associated with that email

