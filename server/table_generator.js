/**
 * Author: Martin
 *
 * Procedurally generates a table for use in a handlebars template.
 * The data is formatted in such a way that the handlebar syntax easily generates the table
 *
 *
 * .fields    - headers for the table
 * .rowCount  - incrementing integer to define the row
 * .rowData   - data in a particular row fetched from the db
 *
 *  Example Handlebar Usage:
 *  <table class="table">
 *   <thead class="thead-dark">
 *     <tr>
 *       {{#each fields}}
 *       <th scope="col">{{this}}</th>
 *       {{/each}}
 *     </tr>
 *   </thead>
 *   <tbody>
 *     {{#each rowData}}
 *     <tr>
 *       {{#each this}}
 *       <td>{{this}}</td>
 *       {{/each}}
 *       {{/each}}
 *     </tr>
 *   </tbody>
 * </table>
 *
 *
 *
 *
 * @param {object} context
 * @param {mysql_object} sql
 */
function generateTable(context, results, fields) {
  context.fields = [];
  context.rowCount = [];
  context.rowData = [];

  for (var i = 0; i < fields.length; i++) {
    context.fields.push(fields[i].name);
    context.rowCount.push(i);
  }

  if (results.length > 0) {
    context.results = results;
    for (var i = 0; i < results.length; i++) {
      context.rowData.push([]);
      for (var j = 0; j < fields.length; j++) {
        context.rowData[i].push(results[i][fields[j].name]);
      }
    }
  } else {
    context.results = null;
  }
  return context;
}

module.exports = generateTable;
