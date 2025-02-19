import dash
from dash import html
import dash_feature_impact
import numpy as np
from datetime import datetime

# Create the Dash app
app = dash.Dash(__name__)

# Sample contributions data with IDs
contributions = [
    {"id": "gp1", "value": -23.12},
    {"id": "sl1", "value": -37.65},
    {"id": "hd1", "value": -79.28},
    {"id": "dw1", "value": -157.59},
    {"id": "pop1", "value": 83.15},
    {"id": "my1", "value": 44.15},
    {"id": "ur1", "value": 37.02},
    {"id": "gdp1", "value": 28.1},
    {"id": "aof1", "value": 20.80},
    {"id": "ur2", "value": 16.4},
    {"id": "ur3", "value": 12},
    {"id": "ur4", "value": 6},
]

# Sample table data with matching IDs
table_data = [
    {"id": "gp1", "name": "Gas Price", "value": 4.24},
    {"id": "sl1", "name": "Sales Lags", "value": None},
    {"id": "hd1", "name": "Half Day", "value": 1},
    {"id": "dw1", "name": "Day of the Week", "value": "Sunday"},
    {"id": "pop1", "name": "Population", "value": 4578213},
    {"id": "my1", "name": "Month of Year", "value": 4},
    {"id": "ur1", "name": "Unemployment Rate", "value": 0.06},
    {"id": "gdp1", "name": "GDP", "value": 1.4},
    {"id": "aof1", "name": "All Other Features", "value": None},
    {"id": "ur2", "name": "2 Unemployment Rate  ", "value": 0.65},
    {"id": "ur3", "name": "3 Unemployment Rate", "value": 13.6},
    {"id": "ur4", "name": "4 Unemployment Rate", "value": 4.06}
]

predict_val = 312.4

# KDE plot data
kde_data = {
    "points": [
        [0, 0],
        [100, 0.5],
        [200, 0.8],
        [300, 0.6],
        [400, 0.3],
        [500, 0]
    ],
    "prediction": predict_val,
    # "predictionDate": datetime(2024, 4, 14)
}

# Style configuration
style = {
    "colors": {
        "positive": "#4299E1",  # Blue
        "negative": "#F56565",  # Red
        "connecting": "#666666",
        "background": "#FFFFFF",
        "text": "#333333",
        "predictionColor": "gray"
    },
}

# Dimensions configuration
width = 800
dimensions = {
    "width": width,
    "height": 300,
    "kdePlotWidth": width * 0.25,
    "forcePlotWidth": width * 0.2,  # proportions other than these can cause breaks in lines 
    "margins": {
        "top": 20,
        "right": 30,
        "bottom": 20,
        "left": 60
    }
}

# App layout
app.layout = html.Div([
    # html.H1("Feature Impact Visualization Example"),
    html.Div(
        children=[
            html.Div("Hello there"),
            dash_feature_impact.DashFeatureImpact(
                # id='feature-impact-1',
                contributions=contributions,
                tableData=table_data,
                idColumn="id",
                kdeData=kde_data,
                predictionTooltip=f"Predicted value of {predict_val} on April 25th, 2024",
                style=style,
                # dimensions=dimensions
            ),
        ]
    ),
    # dash_feature_impact.DashFeatureImpact(
    #     # id='feature-impact-1',
    #     contributions=contributions,
    #     tableData=table_data,
    #     idColumn="id",
    #     kdeData=kde_data,
    #     predictionTooltip=f"Predicted value of {predict_val} on April 25th, 2024",
    #     style=style,
    #     dimensions=dimensions
    # ),
])

if __name__ == '__main__':
    app.run_server(debug=True)