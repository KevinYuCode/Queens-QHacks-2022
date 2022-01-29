# file which initializes flask server, returns Mongodb query to React

# Virtual Environment guide:
# initialize virtual env called flask: python -m venv flask
# .\flask\Scripts\activate to initialize virtual environment
# install flask: pip install flask pandas pymongo dnspython

# runs on local port 5000: proxy set up with react for testing in package.json

from flask import Flask
import query

# flask app instance
app = Flask(__name__)


@app.route("/data")
def test():

    # note to self: can return multiple queries in a single api request:
    # would need to modify react script to accomodate the extra data for it to work

    # query.GETbyIngredient("yellow onions")
    return query.GETall("recipes_reduced")
    # query.POSTuser("encore des raisins")
    # query.GETall("recipes_reduced")


if __name__ == "__main__":

    app.run()  # start flask app