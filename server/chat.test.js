const checkUser = require("./chat.js");
const newUser = require("./chat.js");
const onlyLettersAndNumbers = require("./chat.js");
let user = {
	loginUsername: "testUsername",
	loginPassword: "testPassword",
};

//         TESTING IF THE USER IS CREATED IN DB
test("Checks if user is created in the db", async() => {
    const user = await newUser();
    expect(newUser(user)).toBe(true);
});

//         TESTING IF THE USER EXISTS
test("Checks if user exists", async() => {
    const user = await checkUser();
    expect(checkUser(user)).toBe(true);
});

//         TESTING IF ONLY LETTERS & NUMBERS ARE ACCEPTEDT
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("76473.djd")).toBe(false);
});
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("ThisIsOnlyLetters")).toBe(true);
});
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("12364752")).toBe(true);
});
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("LettersAnd736272")).toBe(true);
});
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("!@£$%^&*(")).toBe(false);
});
// TESTING IF SOMEONES INPUT WAS IN ANOTHER LANGUAGE e.g Arabic, Russian, French
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("أهلا")).toBe(false);
});
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("привет")).toBe(false);
});
test("Is it only a letter or number", () => {
    expect(onlyLettersAndNumbers("où")).toBe(false);
});