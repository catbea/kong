export default val=>{
    if(val instanceof Array){
        return val.join("、");
      }else{
        return val;
      }
}