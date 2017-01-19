/**
 * Created by SEYONG on 2016-08-19.
 */
exports.isArray = function(value){
        return value.constructor.toString().indexOf("Array") > -1;
}