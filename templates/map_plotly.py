import json 
import pandas as pd 
from pandas.io.json import json_normalize #package for flattening json in pandas df

# from https://www.kaggle.com/jboysen/quick-tutorial-flatten-nested-json-in-pandas
#load json object
# url = "https://survivor-project2.herokuapp.com/api/castaways.json"

with open('templates/castaways.json') as f:
    d = json.load(f)

df = pd.json_normalize(d["castaways"])

import plotly.express as px
import plotly
import plotly.graph_objs as go

fig = px.scatter_mapbox(df, lat="Lat", lon="Lon", hover_name="full_name", hover_data=["city", "state", 'personality_name', "result"],
                        color_discrete_sequence=["#FF9900"], zoom=3, height=600)
fig.update_layout(mapbox_style="open-street-map")
fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
fig.show()
fig.write_html("templates/map_survivor.html")
