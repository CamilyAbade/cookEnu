import {app} from "./app"
import { getUser } from "./endpoint/getUser";
import { getRecipe } from "./endpoint/getRecipe";
import { login } from "./endpoint/login";
import { signup } from "./endpoint/signup";
import { postRecipe } from "./endpoint/postRecipe";

app.get("/user/profile", getUser);
app.get("/recipe/:id", getRecipe);
app.post("/signup", signup);
app.post("/login", login);
app.post("/recipe", postRecipe);



