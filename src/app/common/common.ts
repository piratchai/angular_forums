import { DatePipe } from "@angular/common";

export class Common{

    static isStringEmpty(str = ""){
        return(!str || 0 === str.length);
    }

    static IsHasElementStrEmptyInObj(obj, exceptFields){
        /* ## Author : Piratchai ##
         example value to used in this function.
         parameter 1 : obj = { a: '', b: '', c: '' }
         parameter 2 : except fields  =  ['username', 'lastname']
        */

        // Object.keys(obj).forEach(key => {
        //     debugger
        //     if(this.isStringEmpty(obj[key])){

        //     }
        // })
        
        var objEntries = Object.entries(obj);

        if(objEntries.length == 0) return true;

        for(var i = 0; i < objEntries.length; i++){
            if(!(objEntries[i].length == 2))
                continue;

            if(exceptFields.includes(objEntries[i][0]))
                continue;

            var valueInObj = objEntries[i][1];
            var value: String;
            value = <String>(valueInObj == null || valueInObj == undefined ? "": valueInObj);

            if(this.isStringEmpty(value.toString())){
                return true ;
            }
        }

        return false;
    }

    static convertTimestampToDateTime(obj, dateFormat){
        /* 
            - Input Parameters
            obj : parameter ส่งเข้ามาแบบ obj array
                example : [ 
                        { 
                            firstname: 'peter', 
                            lastname: 'pops', 
                            create_time: [TimeStamp] 
                        }
                    ]
            dateFormat : parameter ส่งเข้ามาแบบ String format
                example : "dd/MM/yyyy"
            
            - Output Obj array
            obj parameter
                example : [ 
                        { 
                            firstname: 'peter', 
                            lastname: 'pops', 
                            create_time: [TimeStamp], 
                            create_timeStr: [following dateFormat parameter] 
                        }
                    ]
        */
        var objData = [];

        if(!Array.isArray(obj)){ // not array
            return;
        }

        

        objData = obj;

        for(var i = 0; i < objData.length; i++){
            var eachObj = objData[i];

            var objEntries = Object.entries(eachObj);

            for(var e = 0; e < objEntries.length; e++){
                var objKeyValue = objEntries[e];

                if(objKeyValue.length != 2)
                    continue;

                var key = objKeyValue[0];
                var value = <any>objKeyValue[1];

                if(typeof(value.toDate) == "function"){
                    var date = value.toDate();
                    var resultNewDate = new DatePipe("en-US").transform(date, dateFormat)
                    eachObj[key + "Str"] = resultNewDate;
                }
            }

            
        }
    }
}