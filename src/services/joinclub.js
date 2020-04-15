import axios from "axios";

export function getStatus(clubdId, senderId){
    return new Promise((resolve, reject)=>{        
        let status = "";
        let query = `
        query{
            status:joinStatus(clubId:${clubdId}, senderId:${senderId}){
                status
            }
        }
        `
        axios({
            method:"post",
            url:"http://localhost:8000/graphql",
            data:{"query":query}
        })
        .then((response)=>{  
            console.log("GETStatus Response : ", response);
            status = response.data.data.status.status;        
            return resolve(status);
        })
        .catch((error)=>{
            console.log(error)
            reject(error);
        });
    })    
}