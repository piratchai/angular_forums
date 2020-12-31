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
}