Generate the app using: `ng build --prod` ==> generates an AOT Javascript code.

Deploy the generated artefacts to a static host that can serve HTML / JS / CSS (o need for advanced server capabilities).

Don't forget to finalize environment variables that are defined in src/environments folder: make sure that prod variables are correct. 