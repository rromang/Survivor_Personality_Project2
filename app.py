# import necessary libraries
# import os
# from flask import (
#     Flask,
#     render_template,
#     jsonify,
#     request,
#     redirect)

# import pandas as pd
# import matplotlib.pyplot as plt
# from config2 import username, password
# from sqlalchemy import create_engine
# import numpy as np
# import datetime as dt
# # Import Python SQL Toolkit
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func, inspect
# # Import flask, jsonify
# from flask import Flask, jsonify
# from sqlalchemy.ext.declarative import declarative_base
# Base = declarative_base()



# database_path = f"{username}:{password}@ec2-52-45-179-101.compute-1.amazonaws.com:5432/d52f4bpmrc2lpv"
# engine = create_engine(f'postgresql://{database_path}')
# connection = engine.connect()
# Base.metadata.create_all(engine)

# castaways = pd.read_sql('select * from "Castaways"', connection)

# print(castaways)

# # Reflect database and tables

# Base = automap_base()
# Base.prepare(engine, reflect=True)
# print(Base.classes.keys())

# Castaways = Base.classes.Castaways

# # Create session
# session = Session(bind=engine)


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
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://waljilkidydguz:689b06ad421784ad4ea17abfa4d649ffe291a27c691edc52169cf33b166ffc3e@ec2-52-45-179-101.compute-1.amazonaws.com:5432/d52f4bpmrc2lpv'


# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

castaways = create_classes(db)
########################

# Save references as variables
# age = session.query(Castaways.age).all()
# season = session.query(Castaways.season).all()
# age_group = session.query(Castaways.age_group).all()
# full_name = session.query(Castaways.full_name).all()
# city = session.query(Castaways.city).all()
# state = session.query(Castaways.state).all()
# lat = session.query(Castaways.Lat).all()
# lon = session.query(Castaways.Lon).all()
# personality_type = session.query(Castaways.personality_type).all()
# personality_name = session.query(Castaways.personality_name).all()
# result = session.query(Castaways.result).all()
# total_votes_received = session.query(Castaways.total_votes_received).all()
# immunity_idols_won = session.query(Castaways.immunity_idols_won).all()
# print(age[0])
# # Setup Flask app
# app = Flask(__name__)

# # create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

# @app.route("/api/pals")
# def pals():

#     castaway_data = [{
#         "age": age,
#         "season" : season,	
#         "full_name" : full_name,	
#         "age_group"	: age_group,
#         "city" : city,	
#         "state" : state,	
#         "lat" : lat,
#         "lon" : lon,	
#         "personality_type" : personality_type,	
#         "personality_name" : personality_name,
#         "result" : result,	
#         "total_votes_received": total_votes_received,	
#         "immunity_idols_won" : immunity_idols_won

#     }]

#     return jsonify(castaway_data)

@app.route("/api/castaways.json")
def survivor():
    results = db.session.query(castaways.full_name, castaways.age, castaways.age_group, castaways.Lat, castaways.Lon, castaways.city, castaways.state,castaways.personality_type, castaways.personality_name, castaways.result,  castaways.immunity_idols_won,castaways.total_votes_received).all()
    # results = db.session.query(castaways.age)

    name_text = [result[0] for result in results]
    age = [result[1] for result in results]

    personality_name = [result[2] for result in results]

    castaways_data = [{
        "name": name_text,
        "age": age,
        "personality_name": personality_name
    }]

    return jsonify(castaways_data, orient='records')

# @app.route("/api/castaways.json")
# def survivor():
#     results = db.session.query(castaways.full_name, castaways.age, castaways.age_group, castaways.Lat, castaways.Lon, castaways.city, castaways.state,castaways.personality_type, castaways.personality_name, castaways.result,  castaways.immunity_idols_won,castaways.total_votes_received).all()
#     # results = db.session.query(castaways.age)


#     name_text = [result[0] for result in results]
#     age = [result[1] for result in results]
#     age_group = [result[2] for result in results]
#     lat = [result[3] for result in results]
#     lon = [result[4] for result in results]
#     city = [result[5] for result in results]
#     state = [result[6] for result in results]
#     personality_type = [result[7] for result in results]
#     personality_name = [result[8] for result in results]
#     survivor_result = [result[8] for result in results]
#     idols_won = [result[9] for result in results]
#     total_votes_received = [result[10] for result in results]

#     castaways_data = []
    
#     keys = ['name', 'age', 'age_group']
#     # castaways_data = []
#     # castaways_dict = dict(zip())
#     list_of_list = list(zip(name_text, age, age_group))
#     castaways_d = {}

   

#     return jsonify(castaways_d)

# @app.route("/api/castaways.json")
# def survivor():
#     castaways_df = pd.read_sql("SELECT * FROM 'Castaways'")


#     return jsonify(castaways_d)

