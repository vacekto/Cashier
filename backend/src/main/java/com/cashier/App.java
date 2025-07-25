package com.cashier;

import io.github.cdimascio.dotenv.Dotenv;
import static spark.Spark.*;

public class App {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        int port = Integer.parseInt(dotenv.get("PORT", "3000"));
        port(port);

        staticFileLocation("/public");

        get("/", (req, res) -> {
            res.redirect("/index.html");
            return null;
        });

        get("/hello", (req, res) -> {
            res.type("text/plain");
            return "Hello from Spark Java!";
        });

        System.out.println("Server listening on port " + port);
    }
}
