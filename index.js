/**
 * Struktur table
------------------------+--------------+------+
| parent_organization_id | admission_id | id   |
+------------------------+--------------+------+
|                    104 |            7 |    1 |
|                    104 |            7 |    2 |
|                    103 |            7 |    3 |
|                    103 |            7 |    4 |
|                    103 |            7 |    5 |
|                    104 |            7 |    6 |
|                    105 |            7 |    7 |
|                    109 |            8 |    8 |
|                    104 |            8 |    9 |
|                    104 |            8 |   10 |
|                    104 |            8 |   11 |
|                    109 |            8 |   12 |
+------------------------+--------------+------+
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'master',
  database : 'app'
});

connection.connect();

// order records by id :)
const query = 'select parent_organization_id, admission_id, id from cintrung order by id';

// execute the query and do the logic to set the grouping id
connection.query(query, function (error, records = [], fields) {
  if (error) throw error;
  const result = records.reduce( 
    (acc = [], currentValue) => { 
        if(acc.length > 1){
            const prevValue = acc[acc.length - 1]
            if(prevValue.admission_id === currentValue.admission_id){
                if(prevValue.parent_organization_id === currentValue.parent_organization_id){
                    currentValue.grouping_id = prevValue.grouping_id;
                }else{
                    currentValue.grouping_id = prevValue.grouping_id + 1;
                }
            }else{
                currentValue.grouping_id = 1;
            }
        } else {
            currentValue.grouping_id = 1;
        }
        acc.push(currentValue); 
        return acc;
    }, 
    []
   );

   result.map(res => console.log(JSON.stringify(res)));

});


connection.end();