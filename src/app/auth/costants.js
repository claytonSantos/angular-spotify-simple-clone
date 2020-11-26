export const authEndpoint = "https://accounts.spotify.com/authorize";

export const redirect_uri = "http://localhost:4200/login";

export const my_client_id = "edda27b666594582bf5ac591448c9d78";

export const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

redirect_uri_encoded = encodeURIComponent(this.redirect_uri)

loginUrl = this.authEndpoint +
    "?client_id=" + this.my_client_id +
    "&redirect_uri=" + this.redirect_uri_encoded +
    "&scope=" + this.scopes.join("%20") +
    "&response_type=token" +
    "&show_dialog=true"
    ;