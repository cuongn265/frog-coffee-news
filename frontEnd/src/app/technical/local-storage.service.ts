/**
 * Configure local storage to handle stuff on localstorage
 */


export class LocalStorageService {


    /** Check if the local storage has user logged in
     * Has profile => true
     * else => false
    */
    hasUserLoggedIn(): Boolean {
        let profile = localStorage.getItem('profile');
        if (profile != null) {
            return true;
        }
        else {
            return false;
        }
    }

    /** Get User Id */
    getUserId() {
        if (this.hasUserLoggedIn()) {
            let profile = JSON.parse(localStorage.getItem('profile'));
            let userId = profile.identities[0].user_id;
            return userId;
        }
        else {
            return null;
        }
    }
}