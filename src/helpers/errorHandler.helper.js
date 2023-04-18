const errorHandler = (response, e) => {
    if(e?.message?.includes("not_found")){
        return response.status(400).json({
            success: false,
            message: "Error , data is not found"
        })
    } else if(e?.message?.includes("wrong_credentials")){
        return response.json({
            success: false,
            message: "Wrong credentials"
        })
    } else if (e?.message?.includes("authorization")){
        return response.json({
            success: false,
            message: "Wrong authorization"
        })
    } else if (e?.message?.includes("jwt malform")){
        return response.json({
            success: false,
            message: "Token is invalid"
        })
    } else if (e?.message?.includes("invalid signature")){
        return response.json({
            success: false,
            message: "Token signature is invalid"
        })
    } else {
        console.log(e)
        return response.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = errorHandler