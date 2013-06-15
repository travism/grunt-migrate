# GRUNT-MIGRATE

There are a few handy small migration modules running around on npm. This module will let you interface with them using
grunt. I use grunt for build automation and like everything done in the same place.

Example usage
```grunt migrate:create --name <name of migration>```

Running the above task will create a migration folder and a file named 001-<name of migration>.js. Running this migration
is as simple as

```grunt migration:up```

migration:up without an argument will run all migration files to the HEAD. You can also optionally specify a specific
migration to use as a ceiling.
```grunt migration:up --name 002-somefile.js```

Specifying an argument means that it will stop when it reaches that file.

If you want to migrate down the syntax is the same
```grunt migration:down --name 001-somefile.js```


=====================================================================
This plugin is using the module: https://github.com/visionmedia/node-migrate

But there are many others that without much work would also easily integrate.