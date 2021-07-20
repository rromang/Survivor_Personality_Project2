# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import pandas as pd
import matplotlib.pyplot as plt
from config2 import username, password
from sqlalchemy import create_engine
import numpy as np
import datetime as dt
# Import Python SQL Toolkit
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
# Import flask, jsonify
from flask import Flask, jsonify
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()



database_path = f"{username}:{password}@ec2-52-45-179-101.compute-1.amazonaws.com:5432/d52f4bpmrc2lpv"
engine = create_engine(f'postgresql://{database_path}')
connection = engine.connect()
Base.metadata.create_all(engine)

castaways = pd.read_sql('select * from "Castaways"', connection)

print(castaways)

# Reflect database and tables

Base = automap_base()
Base.prepare(engine, reflect=True)
print(Base.classes.keys())

Castaways = Base.classes.Castaways

# Create session
session = Session(bind=engine)

# Save references as variables
age = session.query(Castaways.age).all()
season = session.query(Castaways.season).all()
age_group = session.query(Castaways.age_group).all()
full_name = session.query(Castaways.full_name).all()
city = session.query(Castaways.city).all()
state = session.query(Castaways.state).all()
lat = session.query(Castaways.Lat).all()
lon = session.query(Castaways.Lon).all()
personality_type = session.query(Castaways.personality_type).all()
personality_name = session.query(Castaways.personality_name).all()
result = session.query(Castaways.result).all()
total_votes_received = session.query(Castaways.total_votes_received).all()
immunity_idols_won = session.query(Castaways.immunity_idols_won).all()
print(age[0])
# # Setup Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/pals")
def pals():

    castaway_data = [{
        "age": age,
        "season" : season,	
        "full_name" : full_name,	
        "age_group"	: age_group,
        "city" : city,	
        "state" : state,	
        "lat" : lat,
        "lon" : lon,	
        "personality_type" : personality_type,	
        "personality_name" : personality_name,
        "result" : result,	
        "total_votes_received": total_votes_received,	
        "immunity_idols_won" : immunity_idols_won

    }]

    return jsonify(castaway_data)



if __name__ == "__main__":
    app.run()
