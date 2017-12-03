export class MapHelper{
    map(T, data) {
        
            var myModel = new T();
            var keyList = Object.keys(data)
            for (var index = 0; index < keyList.length; index++) {
                var key = keyList[index];
        
                myModel[key] = data[key];
            }
            return myModel;
        }
}