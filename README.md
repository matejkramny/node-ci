Node-CI Server
==========

This is a CI server for **node.js**. It depends on github to send a deploy request.

##Setup
 1. Download the source and install dependencies.
 2. Add repositories you want to use, along with scripts.

(see the *examples* folder for reference)

###Lanching the CI
Create a script to start your app on system boot, extensive about it [guide here][1].

 - Make sure you export `PORT` environment variable, such as `export PORT=8080`.
 - Launch the app `node app.js`.

###How to set up deploy hook on github
 1. Go to your *github* repository settings
 2. Click on **Service Hooks**
 3. Click on **WebHook URLs**
 4. Add your domain **e.g**. `http://ci.foo.bar/hook`
 5. Click save.

####How to test your hook
Repeat steps above 1-3. Then click **Test hook**.


  [1]: http://howtonode.org/deploying-node-upstart-monit