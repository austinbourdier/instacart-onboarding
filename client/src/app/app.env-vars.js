angular.module("app.env", [])
.constant("ENV_VARS", {
    "appName": "Instacart Onboarding",
    "appDesc": "Changing the way incident reporting and building management are handled.",
    "apiUrl": "http://localhost:9002/",
    "debug": "true",
    "version": "0.1.0"
});
