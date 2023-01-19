async function apiCall(url,body){
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Basic TlQ3N3JvVXpPelRkd2k3Z1NEYVk6MDJFaU1vSkJkanlqOVllVlZHeEhoRThRQnJFMksxd0c=",
        },
        body: JSON.stringify({'username' : body.email,'password':body.password,"deviceId" : "cae23720-0a19-444c-a7fb-709c96ae9b75",
            "deviceKey" : "WEB",
            "deviceToken" : body.deviceToken,
            "grantType" : "password",
            "userActor" : "EMPLOYER", }),
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return response;
}
export {
    apiCall,
}