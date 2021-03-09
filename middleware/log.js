const connection = require("../service/connection");
const {getFullTime} = require("../utils/common");

module.exports =  async (ctx,next) => {
    if(ctx.originalUrl.includes("/service/music/")){
        var startDate = new  Date();
        var startTime = getFullTime(startDate)
        await next();
        var endDate =  new Date()
        var endTime = getFullTime(endDate);
        var runtime = endDate.getTime() - startDate.getTime();
        var type = ctx.req.method;
        var url = ctx.req.headers.host + ctx.originalUrl;
        var headers = JSON.stringify(ctx.req.headers);
        var ip =ctx.req.connection.remoteAddress
        if(type == "GET"){
            var params = ctx.querystring
        }else{
            var params = JSON.stringify(ctx.params)
        }
        var result = ctx.body;
        var runTime = runtime;
        var userId = null;
        var {description=null,method=null,oparation=null} = ctx.state;
        connection.query(`INSERT INTO log(
            method,url,headers,ip,params,result,start_time,run_time,description,end_time,oparation,type,user_id)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [method,url,headers,ip,params,result,startTime,runTime,description,endTime,oparation,type,userId],
            (err,response)=>{
                console.log(err,response)
        })
    }else {
        await next();
    }
}