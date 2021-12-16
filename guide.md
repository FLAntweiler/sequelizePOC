# Getting set up with Sequelize
## Installation

First install sequelize with: 

`npm install --save sequelize`  

If you have not already, you will also need to install the database driver npm package:

`npm install --save tedious # Microsoft SQL Server`


After installation, you are basically good to go! You will need to set up a database connection. An example of this (as well as defining a model and querying a table) can be found in `simpleExample.js`, or for a more robust example with wiring into express.js, check out `/simpleServer/`.

## Extra Documentation

### For setup/installation look here:
https://sequelize.org/master/manual/getting-started.html

### For documentation on models and datatypes:
https://sequelize.org/master/manual/model-basics.html

### For querying your database:
https://sequelize.org/master/manual/model-querying-basics.html

and

https://sequelize.org/master/manual/model-querying-finders.html


### For everything else (there are a lot of other things you can do) checkout the full docs at:
https://sequelize.org/master/



<br>
<br>
<br>

# Proposed Process for rolling out a db update
## For a new table:
1. Create a folder for the new model under `/models/typeDefinitions` with the name being that of your table/model.
2. Add a `typeDefinitionV1.js` file to the new folder. Define your model here, and export it.
   - If the base model options are not sufficient, you should also define them in your type definition file and export it as well.
3. In the same folder as your typeDefinitions, add a `baseModel` file. In here, you will actually connect to sequelize with `sequelize.define()`. Import your type definition, your model options, and provide them as arguments to this call, along with the name of your table/model. Export the result of this call. 
4. In `/models/migrations/` add a migration file for your new model. This file should import what you exported from the `baseModel` file you added in step 4, and wrap a call to `Model.sync()` in a function that you will export.
5. In `/models/migrations/runMigrations` import the function, and call it. 
6. Run `npm run dbRollout`, this will actually update your database with your changes.


## Updating an existing table:
1. Add a new `typeDefinition` file with the corresponding version to the appropriate folder in `/models/typeDefinitions/` 
2. Define what the model should look like here. If you are only adding new fields, you can import old definitions, and add those fields with a spread operator. After definining your updated model, export it.
   - again, if you need to change model definition options, you can do that here as well.
3. In the `baseModel` file in the same folder, update the imports and references to match the type definition you just defined.
4. Review the migration file in `/models/migrations/` to ensure that `alter` and `force` have the values you expect them to (or no value if doing a non-destructive update)
5. Run `npm run dbRollout` to enact your changes.
   - I added this script to the package.json here, all it does is run the `runMigrations.js` script with node. 

<br>
<br>
<br>

## Thoughts in regards to this process
The migrations are kept separate from the rest of the build / run process
- If necessary, this could be combined to run as part of the `start` step or somewhere else in the pipeline.
- Having it separate makes it ultimately flexible.

Nothing is enforcing that you don't change past definitions
- Keeping old definitions in tact is useful if problems arise, or if you want a record of when a db change happened.
- The filename could instead be a date and/or story number so you have an exact record without the necessity of git logs. 
- I would recommend adding a pre-commit hook that doesn't allow you to commit changes to old definitions


Rollbacks have not been looked into
- I have not determined how all of this will look with a rollback. Likely there will need to be some steps in this process to handle the eventual necessity of a rollback.
- Possible ideas include:
  -  copying to a temp table while tests are run (specifically for dropping rows or tables)
  -  adding a `rollback()` function to each migration script to handle the rollback
  -  possible built in functionality from sequelize itself.


Currently this process is all using Postgresql
- there may be slight differences for other database drivers
- this has NOT been tested on mssql. While some time was spent looking into how this would go, and ultimately it looks like it all should work, it has not been verified (pg was chosen for this POC because I'm working on a mac). 
- a general buffer might be a good idea when pointing stories to account for this. 