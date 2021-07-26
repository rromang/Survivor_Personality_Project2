# import necessary libraries

from config2 import username, password

from sqlalchemy import create_engine, func, inspect




database_path = f"{username}:{password}@ec2-52-45-179-101.compute-1.amazonaws.com:5432/d52f4bpmrc2lpv"
engine = create_engine(f'postgresql://{database_path}')
connection = engine.connect()

############################ From Han-se's file
# import necessary libraries
from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pandas as pd

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace("://", "ql://", 1)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://waljilkidydguz:689b06ad421784ad4ea17abfa4d649ffe291a27c691edc52169cf33b166ffc3e@ec2-52-45-179-101.compute-1.amazonaws.com:5432/d52f4bpmrc2lpv'


# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

castaways = create_classes(db)
########################


if __name__ == "__main__":
    app.run()

# # create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/castaways.json")
def survivor():
    
    # Query all columns in class

    results = db.session.query(castaways).all()
    all_castaways = []
    # Loop through all records and add to dict
    for result in results:
        castaway_dict = {}
        castaway_dict["id"] = result.id
        castaway_dict["season_name"] = result.season_name
        castaway_dict["season"] = result.season
        castaway_dict["full_name"] = result.full_name
        castaway_dict["castaway"] = result.castaway
        castaway_dict["age"] = result.age
        castaway_dict["age_group"] = result.age_group
        castaway_dict["city"] = result.city
        castaway_dict["state"] = result.state
        castaway_dict["Lat"] = result.Lat
        castaway_dict["Lon"] = result.Lon
        castaway_dict["personality_type"] = result.personality_type
        castaway_dict["personality_name"] = result.personality_name
        # castaway_dict["day"] = result.day
        # castaway_dict["order"] = result.order
        castaway_dict["result"] = result.result
        castaway_dict["total_votes_received"] = result.total_votes_received
        castaway_dict["immunity_idols_won"] = result.immunity_idols_won
        all_castaways.append(castaway_dict)
    json_castaways = {"castaways": all_castaways}

    return jsonify(json_castaways)

# if __name__ == "__main__":
#     app.run()
