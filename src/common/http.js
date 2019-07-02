import Axios from "axios";

export default{
   requestGet(url,params={},callback){
       Axios.get(url,params).then(callback);
   } ,
   requestQuickGet(url){
       return new Promise((resolve, reject) =>{        
        Axios.get(url).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
   } ,
   requestPost(url,params={},callback){
       Axios.post(url).then(callback);
   },
   requestPut(url,params={},callback){
       Axios.put(url).then(callback);
   },
   requestDelete(url,params={},callback){
       Axios.put(url).then(callback);
   },
   requestQuickGet(url,callback){
       Axios.get(url).then(callback);
   } 
}