
export const userConfig=()=>{
 const token = localStorage.getItem("token");
const  configWithJWT={ headers: {
          Authorization: `Bearer ${token}`,  // pass the token in header
        },
    }
    return (configWithJWT);
}