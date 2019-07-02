import * as apiUrl from "@/common/apiUrl.js";
import http from "@/common/http.js";

export default{
    getList(page,size){
        http.requestQuickGet(apiUrl.api_online_url+"lnVideo/list/"+page+'/'+size)
        .then(res=>{
          console.log("http:"+JSON.stringify(res))
        });
    }
}