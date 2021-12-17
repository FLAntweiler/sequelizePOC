# Getting set up with Sequelize
## Installation

First install sequelize with: 

`npm install --save sequelize`  

If you have not already, you will also need to install the database driver npm package:

`npm install --save tedious # Microsoft SQL Server`


## Creating a sequelize instance:
After installation, to actually get going you need to instantiate sequelize, and provide it with information about your database. 
Here is a very simple setup, where I've got everything that sequel needs hardcoded here (though normally, connection, port, database, username, and password would all be read from environment variables)
```
const { Sequelize } = require('sequelize');

const connection = "http://localhost";
const port = 1433;
const database = "testDatabaseName";
const username = "louisAntweiler";
const password = "extremelySecure(!)Password1";

const handleLog = msg => {
    console.log(msg);
}

const sequelize = new Sequelize(database, username, password, {
    host: connection,
    port: port,
    dialect: "mssql",
    dialectOptions: {
        port: port,
    },
    logging: handleLog
})

module.exports = sequelize
```

You'll notice here that the dialect I've set is `mssql`. `mysql`, `postgres`, and `mariadb` are other options here, but they will also require the corresponding npm package installed. See the [sequelized docs](https://sequelize.org/master/manual/getting-started.html) for what the package name is.

Once you have your sequelize instance set up, you can immediately start using it. Some examples are:

- Running a raw query: `sequelize.query("SELECT * FROM ... ");`
- Defining a model: `sequelize.define("modelName", { ...modelTypeDefinition }, { ...modelOptions });`
- updating the database models: `sequelize.sync({ ...destructiveSyncOptions });`


A more fleshed out example of all of this running on a server can be found in `/simpleServer/` in [this repo](https://github.com/FLAntweiler/sequelizePOC).

## Extra Documentation

### For setup/installation look [here](https://sequelize.org/master/manual/getting-started.html).


### For documentation on models and datatypes, look [here](https://sequelize.org/master/manual/model-basics.html).


### For querying your database:
[basics](https://sequelize.org/master/manual/model-querying-basics.html)

and

[more advanced](https://sequelize.org/master/manual/model-querying-finders.html)


### For everything else (there are a lot of other things you can do) checkout the full docs [here](https://sequelize.org/master/).


<br>
<br>
<br>

# Generating Models from your Database

## Setup
Before actually being able to generate models, first you need to set up the command line tool `sequelize-auto`
1. Install sequelize-auto with `npm install -g sequelize-auto`
   - this will install this functionality globally so you can use it in the command line
2. In order for this to work (at least with mssql) you will also need to globally install npm's package for your database driver
   - `npm install -g tedious` 
   - You can attempt to skip this step, if you get an error like `"Please install tedious package manually"`, then you will know you need to do this.

## Generating the models
After doing this initial setup, you can run the following command to actually generate the models (replacing the variables in all caps with the correct value):
- `sequelize-auto -h "DATABASE_HOST" -d "DATABASE_NAME" -u "USER_NAME" -x "USER_PASSWORD" -p DATABASE_PORT --dialect "mssql" -o "PATH/TO/OUTPUT/FOLDER"`
- It's recommended that you don't actually pass sensitive arguments in here, but instead import them from a configuration file.

After doing this, you should notice that in the path you specified as the output folder, new models have been generated for every (non-system defined) table on your database, along with a helpful `init-models.js` file, which we'll get to in a moment.

## Using the generated models
These generated models now are functional sequelize models that can be modified, updated, and maintained by sequelize. To use them, all you need to do is import `initModels` from the `init-models.js` file mentioned previously. This is a function, that takes your sequelize instance as it's only parameter, and returns all the models. 

Here is an example of importing the models and then using one of them: 

```
const initModels = require('./init-models');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("testDB", "testUser", "securePassword(!)1", {
    host: "localhost",
    port: 1433,
    // dialect: "postgres",
    dialect: "mssql",
    dialectOptions: {
        port: 1433,
    }
});

const {
    Employee,
    EndUser,
    Other
} = initModels(sequelize);

Employee.findAll();
```

There is an example of the generated models in`/simpleServer/modelGenerationTest/` in [this repo](https://github.com/FLAntweiler/sequelizePOC).

<br>

## An important note about the generated models
I noticed when generating the models that if I generated model, then ran `sequelize.sync()` then generated the models again that an extra index was added with an additional entry for a primary key. When I look at my database, it still only has a single primary key, but this indicates that the generation process is not perfect. I even went so far as to run these steps multiple times, and each time I generated the model then ran `sequelize.sync()` again, a new pk index would show up.

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

A note about types
- Be as specific as possible with your types. `DataTypes.STRING` defaults to `NVARCHAR(255)`, so if you were hoping for a longer character count then you should specify it with `DataTypes.STRING(1000)` etc.
- If you are running an update on an existing table, and you have specified the type to be `VARCHAR(30)`, if the type on the model you're overriding it with is `DataTypes.String` the new dataType will be `NVARCHAR(255)` (assuming `alter` is set to `true`);
- See more about types [here](https://sequelize.org/master/manual/model-basics.html#data-types)

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