import dash_feature_impact
from dash import Dash, html


# Sample data
features = [
    {
        "name": "Gas Price",
        "value": 4.24,
        "contribution": -23.12
    },
    {
        "name": "Sales Lags",
        "value": "-",
        "contribution": -37.65
    },
    {
        "name": "Half Day",
        "value": 1,
        "contribution": -79.28
    },
    {
        "name": "Day of Week",
        "value": "Sunday",
        "contribution": -157.59
    },
    {
        "name": "Month of Year",
        "value": 4,
        "contribution": 44.15
    },
    {
        "name": "Unemployment Rate",
        "value": 0.06,
        "contribution": 37.02
    }
]

# Sample distribution data (random values around base prediction)
import numpy as np
np.random.seed(42)
distribution_data = np.random.normal(89.24, 20, 1000).tolist()

app = Dash(
    __name__,
    external_stylesheets=[
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
    ]
)

app.layout = html.Div(
    children=[
        dash_feature_impact.DashFeatureImpact(
            id='feature-impact',
            baseValue=89.24,  # Starting prediction value
            features=features,
            distributionData=distribution_data,
            finalPrediction=74.2,  # Final prediction after all contributions
            colors={
                'positive': '#1f77b4',  # Blue
                'negative': '#ff7f0e',  # Orange
                'distribution': '#808080'  # Gray
            },
            height=600,
            width='100%'
        )
    ],
    style={"width": "100%"}
)


if __name__ == '__main__':
    app.run(debug=True)