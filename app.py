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
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://waljilkidydguz:689b06ad421784ad4ea17abfa4d649ffe291a27c691edc52169cf33b166ffc3e@ec2-52-45-179-101.compute-1.amazonaws.com:5432/d52f4bpmrc2lpv'


# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

castaways = create_classes(db)
########################



# # create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")



@app.route("/api/castaways.json")
def survivor():
    castaways_df = pd.read_sql('SELECT * FROM "Castaways"', connection)
    jsoncast = castaways_df.to_json(orient='records')
    # print(jsoncast)

    return jsoncast

