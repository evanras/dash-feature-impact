
module DashFeatureImpact
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/dashfeatureimpact.jl")
include("jl/distributionplot.jl")
include("jl/featuretable.jl")
include("jl/forceimpactplot.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_feature_impact",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_feature_impact.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_feature_impact.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
