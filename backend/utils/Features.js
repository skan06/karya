class Features{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword ?{
            brand:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }
        :{}
        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr};

        //Remove 
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);
        this.query=this.query.find(queryCopy);
        return this;
    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports=Features;