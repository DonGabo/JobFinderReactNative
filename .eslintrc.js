module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module",
        "ecmaFeatures": {
        "jsx": true
        }
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "consistent-return": [0],
        "react/prefer-stateless-function": [0],
        "no-use-before-define": 0,
        "no-irregular-whitespace": 0,
        "arrow-body-style": 0,
    }
};